"use client";

import { useReducer, useRef, useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { streamChat, type ChatMessage } from "@/lib/ai/ollamaClient";
import type { ParsedToolCall } from "@/lib/ai/tools";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { ThinkingPanel } from "./ThinkingPanel";
import { KittuAvatar } from "./KittuAvatar";
import ToolInspector, { type ToolEvent } from "../dev/ToolInspector";
import PromptSandbox, { getSandboxParams } from "./PromptSandbox";

interface UIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolCalls?: ParsedToolCall[];
}

interface State {
  messages: UIMessage[];
  isStreaming: boolean;
  isOpen: boolean;
  isTourActive: boolean;
  thinkingStage: number | null;
}

type Action =
  | { type: "TOGGLE" }
  | { type: "ADD_USER_MESSAGE"; content: string }
  | { type: "START_STREAMING" }
  | { type: "APPEND_CONTENT"; content: string }
  | { type: "SET_TOOL_CALLS"; toolCalls: ParsedToolCall[] }
  | { type: "FINISH_STREAMING" }
  | { type: "ADD_TOUR_MESSAGE"; message: UIMessage }
  | { type: "START_TOUR" }
  | { type: "END_TOUR" }
  | { type: "SET_THINKING_STAGE"; stage: number | null }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen };
    case "ADD_USER_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: crypto.randomUUID(), role: "user", content: action.content },
        ],
      };
    case "START_STREAMING":
      return {
        ...state,
        isStreaming: true,
        thinkingStage: 0,
        messages: [
          ...state.messages,
          { id: crypto.randomUUID(), role: "assistant", content: "" },
        ],
      };
    case "APPEND_CONTENT": {
      const msgs = [...state.messages];
      const last = msgs[msgs.length - 1];
      if (last?.role === "assistant") {
        msgs[msgs.length - 1] = { ...last, content: last.content + action.content };
      }
      return { ...state, messages: msgs, thinkingStage: null };
    }
    case "SET_TOOL_CALLS": {
      const msgs = [...state.messages];
      const last = msgs[msgs.length - 1];
      if (last?.role === "assistant") {
        msgs[msgs.length - 1] = { ...last, toolCalls: action.toolCalls };
      }
      return { ...state, messages: msgs };
    }
    case "FINISH_STREAMING":
      return { ...state, isStreaming: false };
    case "ADD_TOUR_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case "START_TOUR":
      return { ...state, isTourActive: true };
    case "END_TOUR":
      return { ...state, isTourActive: false };
    case "SET_THINKING_STAGE":
      return { ...state, thinkingStage: action.stage };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

const initialState: State = {
  messages: [],
  isStreaming: false,
  isOpen: false,
  isTourActive: false,
  thinkingStage: null,
};

// ---------------------------------------------------------------------------
// Tour steps — each is a pre-built assistant message with optional tool calls
// ---------------------------------------------------------------------------

interface TourStep {
  content: string;
  toolCalls?: ParsedToolCall[];
}

const TOUR_STEPS: TourStep[] = [
  {
    content:
      "I\u2019m Atharv Patil \u2014 a Python developer and AI engineer specializing in autonomous agents, RAG systems, and enterprise networking. I build production-grade AI that runs on local hardware with zero cloud API costs. Let me walk you through my systems.",
  },
  {
    content:
      "Here\u2019s an overview of my core technical domains \u2014 from AI/ML pipelines to enterprise networking and backend infrastructure.",
    toolCalls: [
      {
        name: "renderSkillChart",
        arguments: { category: "all" },
      },
    ],
  },
  {
    content:
      "My flagship system is the Autonomous Marketing Engine \u2014 a fully autonomous pipeline that researches cybersecurity feeds, evaluates relevance, and publishes LinkedIn posts using local LLMs on an RTX 4060.",
    toolCalls: [
      {
        name: "renderPipelineVisualizer",
        arguments: { slug: "autonomous-marketing-engine" },
      },
    ],
  },
  {
    content:
      "Under the hood, it\u2019s a multi-agent DAG where each agent has a single responsibility. A refinement loop feeds content back for revision before publishing.",
    toolCalls: [
      {
        name: "renderAgentDAG",
        arguments: { variant: "marketing-engine" },
      },
    ],
  },
  {
    content:
      "On the networking side, I monitor Cisco switches and Fortinet firewalls using custom SNMP/SSH collectors. Here\u2019s my security coverage radar.",
    toolCalls: [
      {
        name: "renderCyberRadar",
        arguments: { preset: "network-security" },
      },
    ],
  },
  {
    content:
      "These capabilities come together across seven projects spanning autonomous systems, applied AI, and systems engineering. Here are a few highlights \u2014 feel free to ask about any of them!",
    toolCalls: [
      {
        name: "renderProjectCard",
        arguments: { slug: "autonomous-marketing-engine" },
      },
      {
        name: "renderProjectCard",
        arguments: { slug: "ai-research-agent" },
      },
      {
        name: "renderProjectCard",
        arguments: { slug: "ragify-finance" },
      },
      {
        name: "renderProjectCard",
        arguments: { slug: "pneumonia-xray" },
      },
    ],
  },
];

const TOUR_STEP_DELAY = 1800; // ms between steps

// ---------------------------------------------------------------------------
// Suggestions
// ---------------------------------------------------------------------------

const SUGGESTIONS = [
  "Show AI systems",
  "Show cybersecurity expertise",
  "Show projects",
  "What technologies does Atharv use?",
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ChatWidget() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [toolEvents, setToolEvents] = useState<ToolEvent[]>([]);
  const streamStartRef = useRef<number>(0);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tourTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const thinkingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll on new content
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.messages]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (tourTimerRef.current) clearTimeout(tourTimerRef.current);
      if (thinkingTimerRef.current) clearInterval(thinkingTimerRef.current);
    };
  }, []);

  const handleSend = useCallback(
    async (content: string) => {
      dispatch({ type: "ADD_USER_MESSAGE", content });
      dispatch({ type: "START_STREAMING" });

      const chatHistory: ChatMessage[] = [
        ...state.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        { role: "user" as const, content },
      ];

      abortRef.current = new AbortController();
      streamStartRef.current = performance.now();

      // Advance thinking stages on interval
      let stage = 0;
      thinkingTimerRef.current = setInterval(() => {
        stage = Math.min(stage + 1, 3);
        dispatch({ type: "SET_THINKING_STAGE", stage });
      }, 700);

      try {
        const sandbox = getSandboxParams();
        for await (const chunk of streamChat(chatHistory, abortRef.current.signal, sandbox)) {
          if (chunk.content) {
            dispatch({ type: "APPEND_CONTENT", content: chunk.content });
          }
          if (chunk.toolCalls && chunk.toolCalls.length > 0) {
            dispatch({ type: "SET_TOOL_CALLS", toolCalls: chunk.toolCalls });
            const now = performance.now();
            const latencyMs = Math.round(now - streamStartRef.current);
            const newEvents = chunk.toolCalls.map((tc) => ({
              id: crypto.randomUUID(),
              name: tc.name,
              arguments: tc.arguments,
              timestamp: Date.now(),
              latencyMs,
            }));
            setToolEvents((prev) => [...prev, ...newEvents]);
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          dispatch({
            type: "APPEND_CONTENT",
            content: "\n\n*Connection error — please try again.*",
          });
        }
      } finally {
        if (thinkingTimerRef.current) {
          clearInterval(thinkingTimerRef.current);
          thinkingTimerRef.current = null;
        }
        dispatch({ type: "SET_THINKING_STAGE", stage: null });
        dispatch({ type: "FINISH_STREAMING" });
        abortRef.current = null;
      }
    },
    [state.messages]
  );

  // Guided tour — inject pre-built messages with delays
  const startTour = useCallback(() => {
    dispatch({ type: "START_TOUR" });

    let stepIndex = 0;

    function nextStep() {
      if (stepIndex >= TOUR_STEPS.length) {
        dispatch({ type: "END_TOUR" });
        return;
      }

      const step = TOUR_STEPS[stepIndex];
      dispatch({
        type: "ADD_TOUR_MESSAGE",
        message: {
          id: crypto.randomUUID(),
          role: "assistant",
          content: step.content,
          toolCalls: step.toolCalls,
        },
      });

      stepIndex++;
      tourTimerRef.current = setTimeout(nextStep, TOUR_STEP_DELAY);
    }

    // Kick off first step immediately
    nextStep();
  }, []);

  const handleToggle = useCallback(() => {
    if (state.isOpen) {
      // Closing: abort stream, cancel tour, reset conversation
      if (abortRef.current) abortRef.current.abort();
      if (state.isTourActive && tourTimerRef.current) clearTimeout(tourTimerRef.current);
      if (thinkingTimerRef.current) {
        clearInterval(thinkingTimerRef.current);
        thinkingTimerRef.current = null;
      }
      dispatch({ type: "RESET" });
    } else {
      dispatch({ type: "TOGGLE" });
    }
  }, [state.isOpen, state.isTourActive]);

  // Kittu quick actions — open chat and either send a message or start a tour
  const handleKittuAction = useCallback(
    (action: string) => {
      if (!state.isOpen) {
        dispatch({ type: "TOGGLE" });
      }
      // Use a microtask to ensure state.isOpen is true before acting
      setTimeout(() => {
        if (action === "tour") {
          startTour();
        } else {
          handleSend(action);
        }
      }, 100);
    },
    [state.isOpen, startTour, handleSend]
  );

  const handleKittuOpen = useCallback(() => {
    if (!state.isOpen) {
      dispatch({ type: "TOGGLE" });
    }
  }, [state.isOpen]);

  const isDisabled = state.isStreaming || state.isTourActive;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-black/80 backdrop-blur-xl max-sm:fixed max-sm:inset-0 max-sm:bottom-0 max-sm:right-0 max-sm:h-full max-sm:w-full max-sm:rounded-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-zinc-200">
                  Atharv&apos;s AI Clone
                </span>
              </div>
              <button
                onClick={handleToggle}
                className="rounded-lg p-1 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="expanded-scroll flex-1 space-y-3 overflow-y-auto p-4"
            >
              {state.messages.length === 0 && (
                <div className="flex flex-col gap-3">
                  {/* Greeting bubble */}
                  <div className="max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-relaxed text-zinc-400">
                    <p>
                      Hi — Atharv is currently busy building new AI systems.
                    </p>
                    <p className="mt-2">
                      I&apos;m his AI assistant and I can walk you through his projects, architecture, and technical work.
                    </p>
                    <p className="mt-2">
                      You can explore his AI pipelines, cybersecurity monitoring systems, and multi-agent architectures.
                    </p>
                    <p className="mt-2 font-medium text-zinc-300">
                      Ask me anything about Atharv.
                    </p>
                  </div>

                  {/* Suggestion chips */}
                  <div className="flex flex-wrap gap-2 px-1">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSend(s)}
                        disabled={isDisabled}
                        className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[11px] text-zinc-400 transition-colors hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-zinc-200 disabled:opacity-40"
                      >
                        {s}
                      </button>
                    ))}

                    {/* Tour chip — visually distinct */}
                    <button
                      data-tour-trigger
                      onClick={startTour}
                      disabled={isDisabled}
                      className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-[11px] font-medium text-violet-300 transition-colors hover:border-violet-500/40 hover:bg-violet-500/20 hover:text-violet-200 disabled:opacity-40"
                    >
                      Take a 60-second AI systems tour
                    </button>
                  </div>
                </div>
              )}

              {state.messages.map((msg, i) => (
                <MessageBubble
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                  toolCalls={msg.toolCalls}
                  isStreaming={
                    state.isStreaming &&
                    msg.role === "assistant" &&
                    i === state.messages.length - 1
                  }
                />
              ))}

              {state.isStreaming &&
                state.messages[state.messages.length - 1]?.content === "" &&
                (state.thinkingStage !== null ? (
                  <ThinkingPanel stage={state.thinkingStage} />
                ) : (
                  <TypingIndicator />
                ))}
            </div>

            {/* Input */}
            <div className="border-t border-white/[0.06]">
              <ChatInput onSend={handleSend} disabled={isDisabled} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kittu AI avatar */}
      <KittuAvatar
        isChatOpen={state.isOpen}
        onOpenChat={handleKittuOpen}
        onQuickAction={handleKittuAction}
      />

      {/* Trigger button */}
      <motion.button
        data-chat-toggle
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-black/80 text-zinc-400 shadow-2xl backdrop-blur-xl transition-colors hover:text-zinc-200"
      >
        {state.isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageSquare className="h-5 w-5" />
        )}
      </motion.button>

      {/* Prompt sandbox controls */}
      <PromptSandbox />

      {/* Tool Inspector dev panel */}
      <ToolInspector events={toolEvents} />
    </div>
  );
}
