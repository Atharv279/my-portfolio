"use client";

import { useReducedMotion } from "framer-motion";

interface InfiniteTickerProps {
  items?: string[];
}

const defaultItems = [
  "Python",
  "FastAPI",
  "PyTorch",
  "Ollama",
  "n8n",
  "Docker",
  "SNMP",
  "RAG",
  "FAISS",
  "LLM",
  "GGUF",
  "Cisco",
  "Fortinet",
  "NLP",
  "MLOps",
  "Streamlit",
  "RTX 4060",
  "SQLite",
  "Node-RED",
  "Gemini",
];

export default function InfiniteTicker({ items = defaultItems }: InfiniteTickerProps) {
  const prefersReduced = useReducedMotion();

  const content = items.map((item) => (
    <span
      key={item}
      className="mx-4 inline-flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-disabled md:mx-6 md:text-xs"
    >
      <span className="h-1 w-1 rounded-full bg-zinc-700" />
      {item}
    </span>
  ));

  return (
    <div className="col-span-full overflow-hidden border-y border-white/[0.04] py-3 md:py-4">
      <div
        className={`flex whitespace-nowrap ${prefersReduced ? "" : "animate-ticker-scroll"}`}
      >
        {/* Duplicate content for seamless loop */}
        <div className="flex shrink-0">{content}</div>
        <div className="flex shrink-0" aria-hidden>{content}</div>
      </div>
    </div>
  );
}
