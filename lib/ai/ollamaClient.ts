// =============================================================================
// Client-side streaming chat via the same-origin /api/chat proxy
// =============================================================================

import type { ParsedToolCall } from "./tools";

export interface OllamaChunk {
  content: string;
  done: boolean;
  toolCalls?: ParsedToolCall[];
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  toolCalls?: ParsedToolCall[];
}

export interface SandboxOptions {
  temperature?: number;
  depth?: number;
  verbosity?: number;
}

export async function* streamChat(
  messages: ChatMessage[],
  signal?: AbortSignal,
  sandbox?: SandboxOptions
): AsyncGenerator<OllamaChunk> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: messages.map(({ role, content }) => ({ role, content })),
      ...(sandbox ? { sandbox } : {}),
    }),
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(`Chat API error ${res.status}: ${text}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6);
        if (data === "[DONE]") return;

        try {
          const parsed = JSON.parse(data);
          yield {
            content: parsed.content ?? "",
            done: parsed.done ?? false,
            toolCalls: parsed.tool_calls as ParsedToolCall[] | undefined,
          };
        } catch {
          // Skip malformed JSON lines
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
