"use client";

import { Marquee } from "../magicui/marquee";

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
  return (
    <div className="relative col-span-full border-y border-white/[0.04] py-3 md:py-4 overflow-hidden">
      {/* Edge fading mask */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <Marquee pauseOnHover className="[--duration:30s]">
        {items.map((item) => (
          <span
            key={item}
            className="flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-disabled md:text-xs"
          >
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
