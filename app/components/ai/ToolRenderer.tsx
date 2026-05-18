"use client";

import { Component, type ReactNode } from "react";
import type { ParsedToolCall } from "@/lib/ai/tools";
import type { Project } from "@/lib/types";
import {
  MiniProjectCard,
  SkillChart,
  ArchitectureDiagram,
  PipelineVisualizer,
  CyberThreatRadar,
  AgentDAGViewer,
  ImpactDashboard,
} from "../generative-ui";
import {
  fallbackMarketingProject,
  fallbackNetworkProject,
  fallbackRAGifyProject,
  fallbackResearchAgentProject,
  fallbackInvoiceMasterProject,
  fallbackPneumoniaProject,
  fallbackMeetTranscriberProject,
} from "@/lib/fallback-data";

const projectsBySlug: Record<string, Project> = {
  "autonomous-marketing-engine": fallbackMarketingProject,
  "ai-research-agent": fallbackResearchAgentProject,
  "ragify-finance": fallbackRAGifyProject,
  "ai-invoice-master": fallbackInvoiceMasterProject,
  "pneumonia-xray": fallbackPneumoniaProject,
  "network-intelligence-dashboard": fallbackNetworkProject,
  "google-meet-transcriber": fallbackMeetTranscriberProject,
};

const TOOL_NAMES = new Set([
  "renderProjectCard",
  "renderSkillChart",
  "renderArchitectureDiagram",
  "renderPipelineVisualizer",
  "renderCyberRadar",
  "renderAgentDAG",
  "renderImpactDashboard",
]);

/** A segment of assistant message content — either plain text or a parsed tool call. */
export type ContentSegment =
  | { type: "text"; text: string }
  | { type: "tool"; toolCall: ParsedToolCall };

/**
 * Try to parse a single JSON value as one or more tool calls.
 * Accepts a single object `{ name, parameters }` or an array of them `[{…}, {…}]`.
 * Returns matched tool segments or null if nothing matched.
 */
function parseToolJson(raw: string): ContentSegment[] | null {
  try {
    const parsed = JSON.parse(raw);
    const items: unknown[] = Array.isArray(parsed) ? parsed : [parsed];
    const tools: ContentSegment[] = [];

    for (const item of items) {
      if (typeof item !== "object" || item === null) continue;
      const obj = item as Record<string, unknown>;
      const name = obj.name as string | undefined;
      const args = (obj.arguments ?? obj.parameters ?? {}) as Record<string, string>;

      if (!name || !TOOL_NAMES.has(name)) continue;
      tools.push({
        type: "tool",
        toolCall: { name: name as ParsedToolCall["name"], arguments: args },
      });
    }

    return tools.length > 0 ? tools : null;
  } catch {
    return null;
  }
}

/**
 * Parse a Llama-style inline function call tag into a tool segment.
 *
 * Handles all known variants:
 *   <function(renderFoo){"slug":"bar"}</function>
 *   <function.renderFoo {"slug":"bar"}></function>
 *   <function=renderFoo>{"slug":"bar"}</function>
 */
function parseFunctionTag(
  name: string,
  argsRaw: string
): ContentSegment | null {
  if (!TOOL_NAMES.has(name)) return null;
  try {
    const args = JSON.parse(argsRaw) as Record<string, string>;
    return {
      type: "tool",
      toolCall: { name: name as ParsedToolCall["name"], arguments: args },
    };
  } catch {
    return null;
  }
}

/**
 * Scan assistant message content for inline tool calls and return an array
 * of interleaved text + tool segments.
 *
 * Supports:
 * - Llama <function(NAME){JSON}</function>  (and .NAME / =NAME variants)
 * - Fenced ```json … ``` blocks with { name, parameters }
 * - Bare { … } JSON objects with { name, parameters }
 * - JSON arrays [ {…}, {…} ]
 */
export function extractInlineToolCalls(content: string): ContentSegment[] {
  // --- Pass 1: Llama-style <function...> tags ---
  // Unified pattern matching all variants:
  //   <function(NAME) JSON</function>
  //   <function(NAME)>JSON</function>
  //   <function.NAME JSON></function>
  //   <function=NAME>JSON</function>
  const llamaTagRe =
    /<function(?:\((\w+)\)|\.(\w+)|=(\w+))>?\s*(\{[^}]*\})\s*>?<\/function>/g;

  const segments: ContentSegment[] = [];
  let lastIndex = 0;
  let hadLlamaTags = false;

  for (const match of content.matchAll(llamaTagRe)) {
    const name = match[1] ?? match[2] ?? match[3]; // whichever group matched
    const argsRaw = match[4];
    const matchStart = match.index!;

    const tool = parseFunctionTag(name, argsRaw);
    if (!tool) continue;

    hadLlamaTags = true;

    // Push preceding text (stripped of whitespace)
    const before = content.slice(lastIndex, matchStart).trim();
    if (before) segments.push({ type: "text", text: before });

    segments.push(tool);
    lastIndex = matchStart + match[0].length;
  }

  if (hadLlamaTags) {
    const trailing = content.slice(lastIndex).trim();
    if (trailing) segments.push({ type: "text", text: trailing });
    return segments;
  }

  // --- Pass 2: JSON blocks (fenced, bare objects, arrays) ---
  const jsonBlockRe =
    /```(?:json)?\s*\n?([\s\S]*?)```|\[[\s\S]*?\n\]|\{[\s\S]*?\n\}/g;

  lastIndex = 0;

  for (const match of content.matchAll(jsonBlockRe)) {
    const rawJson = match[1] ?? match[0];
    const matchStart = match.index!;

    const tools = parseToolJson(rawJson);
    if (!tools) continue;

    const before = content.slice(lastIndex, matchStart).trim();
    if (before) segments.push({ type: "text", text: before });

    segments.push(...tools);
    lastIndex = matchStart + match[0].length;
  }

  const trailing = content.slice(lastIndex).trim();
  if (trailing) segments.push({ type: "text", text: trailing });

  return segments;
}

class ToolErrorBoundary extends Component<
  { children: ReactNode; toolName: string },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; toolName: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="my-1 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-[11px] text-red-400/70">
          Failed to render {this.props.toolName}
        </div>
      );
    }
    return this.props.children;
  }
}

function ToolRendererInner({ toolCall }: { toolCall: ParsedToolCall }) {
  switch (toolCall.name) {
    case "renderProjectCard": {
      const project = projectsBySlug[toolCall.arguments.slug];
      if (!project) return null;
      return <MiniProjectCard project={project} />;
    }
    case "renderSkillChart": {
      const category = toolCall.arguments.category as
        | "trending"
        | "ai-ml"
        | "networking"
        | "backend-ops"
        | "all";
      return <SkillChart category={category} />;
    }
    case "renderArchitectureDiagram": {
      const project = projectsBySlug[toolCall.arguments.slug];
      if (!project) return null;
      return <ArchitectureDiagram project={project} />;
    }
    case "renderPipelineVisualizer": {
      const project = projectsBySlug[toolCall.arguments.slug];
      if (!project) return null;
      return <PipelineVisualizer project={project} />;
    }
    case "renderCyberRadar": {
      const preset = toolCall.arguments.preset as
        | "network-security"
        | "full-stack";
      return <CyberThreatRadar preset={preset} />;
    }
    case "renderAgentDAG": {
      const variant = toolCall.arguments.variant as
        | "marketing-engine"
        | "ragify-pipeline";
      return <AgentDAGViewer variant={variant} />;
    }
    case "renderImpactDashboard": {
      return <ImpactDashboard />;
    }
    default:
      return null;
  }
}

export function ToolRenderer({ toolCall }: { toolCall: ParsedToolCall }) {
  return (
    <ToolErrorBoundary toolName={toolCall.name}>
      <ToolRendererInner toolCall={toolCall} />
    </ToolErrorBoundary>
  );
}
