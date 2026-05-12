"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

export interface SandboxParams {
  temperature: number;
  depth: number; // 0 = beginner, 1 = expert
  verbosity: number; // 0 = short, 1 = detailed
}

export const DEFAULT_SANDBOX_PARAMS: SandboxParams = {
  temperature: 0.7,
  depth: 0.6,
  verbosity: 0.5,
};

// Global store so ChatWindow can access current params
let _params: SandboxParams = { ...DEFAULT_SANDBOX_PARAMS };
const _listeners = new Set<() => void>();

export function getSandboxParams(): SandboxParams {
  return _params;
}

function setSandboxParams(p: SandboxParams) {
  _params = p;
  _listeners.forEach((cb) => cb());
}

export function subscribeSandbox(cb: () => void): () => void {
  _listeners.add(cb);
  return () => _listeners.delete(cb);
}

const DEPTH_LABELS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const VERBOSITY_LABELS = ["Short", "Medium", "Detailed"];

function getLabel(value: number, labels: string[]): string {
  const idx = Math.min(
    Math.floor(value * labels.length),
    labels.length - 1
  );
  return labels[idx];
}

export default function PromptSandbox({ isChatOpen = false }: { isChatOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState<SandboxParams>(DEFAULT_SANDBOX_PARAMS);

  function update(key: keyof SandboxParams, value: number) {
    const next = { ...params, [key]: value };
    setParams(next);
    setSandboxParams(next);
  }

  return (
    <div className={`fixed bottom-6 left-6 z-[38] ${isChatOpen ? "max-sm:hidden" : ""}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-12 left-0 w-[260px] rounded-xl border border-white/[0.08] bg-black/90 p-4 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5 text-violet-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-violet-400">
                  Prompt Controls
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-0.5 text-ink-disabled transition-colors md:hover:bg-white/[0.06] md:hover:text-ink-muted"
              >
                <X className="h-3 w-3" />
              </button>
            </div>

            {/* Temperature slider */}
            <div className="mb-4">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[11px] text-ink-muted">Temperature</span>
                <span className="font-mono text-[11px] text-ink-subtle">
                  {params.temperature.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={params.temperature}
                onChange={(e) => update("temperature", parseFloat(e.target.value))}
                className="sandbox-slider w-full"
              />
            </div>

            {/* Depth slider */}
            <div className="mb-4">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[11px] text-ink-muted">
                  Technical Depth
                </span>
                <span className="font-mono text-[11px] text-violet-400">
                  {getLabel(params.depth, DEPTH_LABELS)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={params.depth}
                onChange={(e) => update("depth", parseFloat(e.target.value))}
                className="sandbox-slider w-full"
              />
            </div>

            {/* Verbosity slider */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[11px] text-ink-muted">Verbosity</span>
                <span className="font-mono text-[11px] text-violet-400">
                  {getLabel(params.verbosity, VERBOSITY_LABELS)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={params.verbosity}
                onChange={(e) =>
                  update("verbosity", parseFloat(e.target.value))
                }
                className="sandbox-slider w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-9 items-center gap-2 rounded-full border border-white/[0.08] bg-black/80 px-3 backdrop-blur-xl transition-colors md:hover:border-violet-500/20"
      >
        <SlidersHorizontal className="h-3.5 w-3.5 text-violet-400" />
        <span className="font-mono text-[10px] text-ink-muted">Prompt</span>
      </motion.button>
    </div>
  );
}
