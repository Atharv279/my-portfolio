"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { ParsedToolCall } from "@/lib/ai/tools";
import { ToolRenderer, extractInlineToolCalls } from "./ToolRenderer";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  toolCalls?: ParsedToolCall[];
  isStreaming?: boolean;
}

export function MessageBubble({
  role,
  content,
  toolCalls,
  isStreaming,
}: MessageBubbleProps) {
  const isUser = role === "user";

  // Parse inline JSON tool calls from assistant content (skip while streaming)
  const segments = useMemo(() => {
    if (isUser || isStreaming || !content) return null;
    const parsed = extractInlineToolCalls(content);
    // Only use segments if at least one tool was found
    const hasTool = parsed.some((s) => s.type === "tool");
    return hasTool ? parsed : null;
  }, [content, isUser, isStreaming]);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-relaxed ${
          isUser ? "bg-white/[0.06] text-zinc-200" : "text-zinc-400"
        }`}
      >
        {/* If inline tool calls were detected, render interleaved text + components */}
        {segments
          ? segments.map((seg, i) =>
              seg.type === "text" ? (
                <span key={i}>{seg.text}</span>
              ) : (
                <ToolRenderer key={`inline-${i}`} toolCall={seg.toolCall} />
              )
            )
          : content && (
              <span>
                {content}
                {isStreaming && (
                  <motion.span
                    className="ml-0.5 inline-block h-3.5 w-[2px] bg-zinc-400"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </span>
            )}

        {/* Explicit tool_calls from Ollama (original format) */}
        {toolCalls?.map((tc, i) => (
          <ToolRenderer key={`${tc.name}-${i}`} toolCall={tc} />
        ))}
      </div>
    </div>
  );
}
