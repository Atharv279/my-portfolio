"use client";

import BentoCard from "./BentoCard";
import {
  Code2,
  Cpu,
  Sparkles,
  Lock,
  Terminal,
  WifiOff,
  Zap,
} from "lucide-react";

interface AjaiCardProps {
  id?: string;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
}

const tags = [
  { icon: Cpu, label: "Local LLM" },
  { icon: Terminal, label: "VSCodium" },
  { icon: Lock, label: "No Telemetry" },
  { icon: WifiOff, label: "Offline" },
];

export default function AjaiCard({
  id = "project-ajai",
  onExpand,
  isExpanded,
}: AjaiCardProps) {
  return (
    <BentoCard
      id={id}
      index={0}
      glowColor="rgba(56, 189, 248, 0.18)"
      ariaLabel="AJAI — AtharvJoey AI, a local Copilot alternative for VSCodium"
      pulse
      className="flex flex-col justify-between md:col-span-2 md:row-span-1"
      onExpand={onExpand}
      isExpanded={isExpanded}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-sky-400">
            <Code2 className="h-3 w-3" aria-hidden="true" />
            Editor Extension
          </span>
          <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-ink md:mt-2 md:text-xl">
            AJAI
            <span className="ml-2 font-mono text-xs font-normal text-ink-muted md:text-sm">
              (AtharvJoey AI)
            </span>
          </h2>
        </div>
        <span className="hidden shrink-0 items-center gap-1 rounded-md border border-sky-500/25 bg-sky-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-sky-300 sm:inline-flex">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          Local Copilot
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-[13px] leading-relaxed text-ink-muted md:mt-4 md:max-w-lg md:text-sm">
        A VSCodium extension that delivers code completion, inline refactors,
        and chat against a local model — a fully sovereign alternative to
        GitHub Copilot. No API keys, no round-trips, no upload of source code.
      </p>

      {/* Code-editor motif — stylised completion preview */}
      <div
        aria-hidden="true"
        className="mt-4 overflow-hidden rounded-lg border border-hairline bg-surface font-mono text-[11px] leading-relaxed md:mt-5"
      >
        <div className="flex items-center gap-1.5 border-b border-hairline px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-sky-500/60" />
          <span className="h-2 w-2 rounded-full bg-ink-disabled" />
          <span className="h-2 w-2 rounded-full bg-ink-disabled" />
          <span className="ml-2 text-[10px] uppercase tracking-widest text-ink-subtle">
            ajai · suggest
          </span>
        </div>
        <pre className="overflow-x-auto px-3 py-2.5 text-ink-secondary">
          <span className="text-ink-subtle">{"// hover for "}</span>
          <span className="text-sky-300">ajai</span>
          <span className="text-ink-subtle">{" completion"}</span>
          {"\n"}
          <span className="text-sky-300">const</span>
          <span className="text-ink"> embedding </span>
          <span className="text-ink-subtle">=</span>
          <span className="text-ink"> await ajai.</span>
          <span className="text-sky-300">embed</span>
          <span className="text-ink-subtle">(</span>
          <span className="text-ink-muted">doc</span>
          <span className="text-ink-subtle">)</span>
          <span className="ml-0.5 inline-block h-3 w-1.5 -translate-y-px animate-pulse bg-sky-400 align-middle" />
        </pre>
      </div>

      {/* Tag pills */}
      <div className="mt-4 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
        {tags.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-2 py-1 text-[11px] text-ink-muted md:px-2.5 md:text-xs"
          >
            <Icon className="h-3 w-3 text-ink-subtle" aria-hidden="true" />
            {label}
          </div>
        ))}
      </div>

      {/* === EXPANDED CONTENT === */}
      {isExpanded && (
        <div className="mt-5 border-t border-hairline pt-5">
          <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-secondary">
            <Zap className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
            What it does
          </h3>
          <ul className="space-y-2 text-[13px] leading-relaxed text-ink-muted">
            <li className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
              <span>
                Inline completion driven by an Ollama-served code model — runs entirely on the developer&apos;s machine.
              </span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
              <span>
                Workspace-aware chat with retrieval over the open repository; no source leaves the host.
              </span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
              <span>
                Drop-in for teams that can&apos;t ship code to a hosted LLM for compliance or air-gapped reasons.
              </span>
            </li>
          </ul>
        </div>
      )}

      {/* Decorative accent */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-sky-500/[0.07] blur-3xl" />
    </BentoCard>
  );
}
