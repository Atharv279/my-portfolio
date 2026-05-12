"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, ChevronDown, ChevronRight } from "lucide-react";

export interface ToolEvent {
  id: string;
  name: string;
  arguments: Record<string, string>;
  timestamp: number;
  latencyMs: number;
}

interface ToolInspectorProps {
  events: ToolEvent[];
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function EventRow({ event }: { event: ToolEvent }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-white/[0.04] last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-white/[0.04]"
      >
        {expanded ? (
          <ChevronDown className="h-3 w-3 shrink-0 text-ink-subtle" />
        ) : (
          <ChevronRight className="h-3 w-3 shrink-0 text-ink-subtle" />
        )}
        <span className="flex-1 truncate font-mono text-[11px] text-emerald-400">
          {event.name}
        </span>
        <span className="shrink-0 font-mono text-[10px] text-ink-disabled">
          {event.latencyMs}ms
        </span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 px-3 pb-3">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink-disabled">
                  Args
                </span>
                <pre className="mt-0.5 rounded-md bg-black/40 p-2 font-mono text-[10px] leading-relaxed text-violet-300">
                  {JSON.stringify(event.arguments, null, 2)}
                </pre>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-ink-disabled">
                    Latency
                  </span>
                  <p className="font-mono text-[11px] text-amber-400">
                    {event.latencyMs}ms
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-ink-disabled">
                    Timestamp
                  </span>
                  <p className="font-mono text-[11px] text-ink-muted">
                    {formatTime(event.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ToolInspector({ events }: ToolInspectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (events.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-12 left-0 w-[340px] overflow-hidden rounded-xl border border-white/[0.08] bg-black/90 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
              <div className="flex items-center gap-2">
                <Terminal className="h-3 w-3 text-emerald-500" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                  Tool Inspector
                </span>
                <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] text-emerald-400">
                  {events.length}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-0.5 text-ink-disabled transition-colors hover:bg-white/[0.06] hover:text-ink-muted"
              >
                <X className="h-3 w-3" />
              </button>
            </div>

            {/* Event list */}
            <div className="expanded-scroll max-h-[320px] overflow-y-auto">
              {events.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-9 items-center gap-2 rounded-full border border-white/[0.08] bg-black/80 px-3 backdrop-blur-xl transition-colors hover:border-emerald-500/20"
      >
        <Terminal className="h-3.5 w-3.5 text-emerald-500" />
        <span className="font-mono text-[10px] text-ink-muted">
          {events.length} calls
        </span>
      </motion.button>
    </div>
  );
}
