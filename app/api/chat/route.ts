// =============================================================================
// POST /api/chat — SSE proxy to Groq API
// =============================================================================

import { NextRequest } from "next/server";
import Groq from "groq-sdk";
import { buildSystemPrompt } from "@/lib/ai/systemPrompt";
import { TOOL_DEFINITIONS } from "@/lib/ai/tools";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";
const TIMEOUT_MS = 60_000;
const MAX_MESSAGES = 30;
const MAX_MESSAGE_LENGTH = 2000;
const VALID_ROLES = new Set(["user", "assistant"]);

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

interface SandboxOptions {
  temperature?: number;
  depth?: number;
  verbosity?: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function validateMessages(
  messages: unknown
): IncomingMessage[] | null {
  if (!Array.isArray(messages) || messages.length === 0) return null;
  if (messages.length > MAX_MESSAGES) return null;

  const validated: IncomingMessage[] = [];
  for (const msg of messages) {
    if (typeof msg !== "object" || msg === null) return null;
    const { role, content } = msg as Record<string, unknown>;
    if (typeof role !== "string" || !VALID_ROLES.has(role)) return null;
    if (typeof content !== "string") return null;
    if (content.length > MAX_MESSAGE_LENGTH) return null;
    validated.push({ role: role as "user" | "assistant", content });
  }
  return validated;
}

function validateSandbox(
  sandbox: unknown
): SandboxOptions | undefined {
  if (!sandbox || typeof sandbox !== "object") return undefined;
  const s = sandbox as Record<string, unknown>;
  return {
    temperature:
      typeof s.temperature === "number"
        ? clamp(s.temperature, 0, 1)
        : undefined,
    depth:
      typeof s.depth === "number" ? clamp(s.depth, 0, 1) : undefined,
    verbosity:
      typeof s.verbosity === "number"
        ? clamp(s.verbosity, 0, 1)
        : undefined,
  };
}

function buildDepthInstruction(depth: number): string {
  if (depth < 0.25) return "\n\nADAPT: Explain simply. Avoid jargon. Use analogies. Target a non-technical audience.";
  if (depth < 0.5) return "\n\nADAPT: Use moderate technical detail. Define specialized terms briefly.";
  if (depth < 0.75) return "\n\nADAPT: Use full technical detail. Include architecture patterns and implementation specifics.";
  return "\n\nADAPT: Maximum technical depth. Include system design rationale, performance tradeoffs, and implementation patterns.";
}

function buildVerbosityInstruction(verbosity: number): string {
  if (verbosity < 0.33) return " Keep responses under 80 words. Be extremely concise.";
  if (verbosity < 0.66) return " Keep responses under 200 words. Be concise.";
  return " Provide detailed explanations with examples when helpful.";
}

/**
 * Some Llama models emit tool calls as inline text instead of structured
 * tool_calls deltas. Detect and extract them.
 *
 * Handles two formats:
 *   <function.renderFoo {"slug":"bar"}></function>
 *   <function=renderFoo>{"slug":"bar"}</function>
 *   <function(renderFoo){"slug":"bar"}</function>
 */
function extractLlamaToolCalls(
  text: string
): { name: string; arguments: Record<string, string> }[] | null {
  // All known Llama inline function call patterns
  const patterns = [
    /<function\.(\w+)\s*(\{[^}]*\})\s*><\/function>/g,       // <function.NAME JSON></function>
    /<function=(\w+)>(\{[^}]*\})<\/function>/g,               // <function=NAME>JSON</function>
    /<function\((\w+)\)\s*(\{[^}]*\})\s*<\/function>/g,       // <function(NAME){JSON}</function>
    /<function\((\w+)\)>\s*(\{[^}]*\})\s*<\/function>/g,      // <function(NAME)>{JSON}</function>
  ];

  const calls: { name: string; arguments: Record<string, string> }[] = [];

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      try {
        calls.push({ name: match[1], arguments: JSON.parse(match[2]) });
      } catch { /* skip malformed */ }
    }
  }

  return calls.length > 0 ? calls : null;
}

export async function POST(req: NextRequest) {
  if (!GROQ_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Service temporarily unavailable" }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // Reject oversized payloads (64KB limit)
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 65536) {
    return new Response(
      JSON.stringify({ error: "Payload too large" }),
      { status: 413, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const messages = validateMessages(body.messages);
  if (!messages) {
    return new Response(
      JSON.stringify({ error: "Invalid messages format" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const sandbox = validateSandbox(body.sandbox);

  let systemContent = buildSystemPrompt();
  if (sandbox) {
    if (typeof sandbox.depth === "number") {
      systemContent += buildDepthInstruction(sandbox.depth);
    }
    if (typeof sandbox.verbosity === "number") {
      systemContent += buildVerbosityInstruction(sandbox.verbosity);
    }
  }
  const temperature = sandbox?.temperature ?? 0.7;

  const fullMessages: Groq.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: systemContent },
    ...messages.map(
      ({ role, content }) =>
        ({ role, content }) as Groq.Chat.ChatCompletionMessageParam
    ),
  ];

  const groq = new Groq({ apiKey: GROQ_API_KEY });
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(ctrl) {
      const abortController = new AbortController();
      const timeout = setTimeout(() => abortController.abort(), TIMEOUT_MS);

      try {
        const completion = await groq.chat.completions.create(
          {
            model: GROQ_MODEL,
            messages: fullMessages,
            tools: TOOL_DEFINITIONS,
            temperature,
            stream: true,
          },
          { signal: abortController.signal }
        );

        // Accumulate tool call deltas AND full text (for Llama inline fallback)
        const toolCallAccumulator: Record<
          number,
          { name: string; arguments: string }
        > = {};
        let fullText = "";
        let structuredToolCallsSent = false;

        for await (const chunk of completion) {
          const delta = chunk.choices?.[0]?.delta;
          if (!delta) continue;

          // Stream text content
          if (delta.content) {
            fullText += delta.content;
            ctrl.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ content: delta.content, done: false })}\n\n`
              )
            );
          }

          // Accumulate structured tool call deltas
          if (delta.tool_calls) {
            for (const tc of delta.tool_calls) {
              const idx = tc.index;
              if (!toolCallAccumulator[idx]) {
                toolCallAccumulator[idx] = { name: "", arguments: "" };
              }
              if (tc.function?.name) {
                toolCallAccumulator[idx].name += tc.function.name;
              }
              if (tc.function?.arguments) {
                toolCallAccumulator[idx].arguments += tc.function.arguments;
              }
            }
          }

          // On finish, flush accumulated structured tool calls
          const finishReason = chunk.choices?.[0]?.finish_reason;
          if (finishReason && Object.keys(toolCallAccumulator).length > 0) {
            const toolCalls = Object.values(toolCallAccumulator).map((tc) => {
              let args: Record<string, string> = {};
              try {
                args = JSON.parse(tc.arguments);
              } catch { /* pass raw */ }
              return { name: tc.name, arguments: args };
            });

            ctrl.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ content: "", done: false, tool_calls: toolCalls })}\n\n`
              )
            );
            structuredToolCallsSent = true;
          }
        }

        // Fallback: if no structured tool_calls were sent, check for
        // Llama-style inline function calls in the text
        if (!structuredToolCallsSent && fullText.includes("<function")) {
          const inlineCalls = extractLlamaToolCalls(fullText);
          if (inlineCalls) {
            ctrl.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ content: "", done: false, tool_calls: inlineCalls })}\n\n`
              )
            );
          }
        }

        ctrl.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ content: "", done: true })}\n\n`
          )
        );
        ctrl.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          ctrl.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Stream interrupted", done: true })}\n\n`
            )
          );
        }
      } finally {
        clearTimeout(timeout);
        ctrl.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
