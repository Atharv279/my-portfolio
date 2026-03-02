"use client";

import BentoCard from "./BentoCard";
import ExpandedSection from "./ExpandedSection";
import { Eye, Brain, Play, RotateCcw, Compass } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Phase {
  label: string;
  icon: LucideIcon;
  brief: string;
  detail: string;
}

interface MethodologyCardProps {
  id?: string;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
}

const phases: Phase[] = [
  {
    label: "Perceive",
    icon: Eye,
    brief: "Observe & ingest",
    detail:
      "Map the full system landscape before writing a single line. Ingest requirements, audit existing codebases, profile infrastructure, and identify data sources. For the Network Dashboard this meant cataloguing every SNMP MIB and SSH command tree across Cisco and Fortinet devices.",
  },
  {
    label: "Reason",
    icon: Brain,
    brief: "Analyze & evaluate",
    detail:
      "Evaluate trade-offs against constraints. Choose architectures by measuring latency, cost, and maintainability. For the Marketing Engine this meant benchmarking quantized LLM models on the RTX 4060 to find the optimal accuracy-to-VRAM ratio before committing to a pipeline design.",
  },
  {
    label: "Act",
    icon: Play,
    brief: "Build & deploy",
    detail:
      "Execute with modular, testable components. Every system ships with clean separation of concerns: collectors are decoupled from storage, inference is decoupled from orchestration. CI pipelines validate each module independently before integration.",
  },
  {
    label: "Refine",
    icon: RotateCcw,
    brief: "Measure & iterate",
    detail:
      "Post-deployment, instrument everything. Monitor inference latency, track content engagement scores, and alert on anomaly thresholds. Feed metrics back into the Perceive phase to close the loop, ensuring each iteration produces measurably better outputs.",
  },
];

export default function MethodologyCard({ id = "methodology", onExpand, isExpanded }: MethodologyCardProps) {
  return (
    <BentoCard
      id={id}
      index={2}
      glowColor="rgba(251, 146, 60, 0.15)"
      className="flex flex-col md:col-span-1 md:row-span-1"
      onExpand={onExpand}
      isExpanded={isExpanded}
    >
      <span className="font-mono text-[11px] uppercase tracking-widest text-orange-400">
        Methodology
      </span>

      {/* Vertical timeline */}
      <div className="mt-4 flex flex-col gap-0 md:mt-5">
        {phases.map((phase, i) => (
          <div key={phase.label} className="relative flex items-start gap-3 pb-4 last:pb-0">
            {/* Timeline connector line */}
            {i < phases.length - 1 && (
              <div className="absolute left-[11px] top-7 h-[calc(100%-16px)] w-px bg-white/[0.08]" />
            )}

            {/* Icon node */}
            <div className="relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border border-orange-500/25 bg-orange-500/[0.08]">
              <phase.icon className="h-3 w-3 text-orange-400" />
            </div>

            {/* Text */}
            <div className="min-w-0 pt-px">
              <span className="text-[13px] font-medium text-zinc-200 md:text-sm">
                {phase.label}
              </span>
              <p className="mt-0.5 text-[11px] text-zinc-500 md:text-xs">
                {phase.brief}
              </p>
              {/* Expanded detail visible only in modal */}
              {isExpanded && (
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
                  {phase.detail}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* === EXPANDED CONTENT === */}
      {isExpanded && (
        <ExpandedSection
          icon={Compass}
          title="Why This Works"
          accentColor="text-orange-400"
        >
          <div className="flex flex-col gap-2.5">
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
              <span className="text-xs font-medium text-zinc-300">Enterprise Reliability</span>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
                The loop eliminates assumptions. Every architectural decision
                is backed by data gathered in Perceive and validated in Refine.
                Production systems built this way consistently achieve higher
                uptime because failure modes are mapped before deployment, not
                discovered after.
              </p>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
              <span className="text-xs font-medium text-zinc-300">Codebase Maintainability</span>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
                Act mandates modular separation. Collectors, models, services,
                and orchestration layers live in isolated directories with clean
                interfaces. This means any component can be swapped, scaled, or
                refactored without touching the rest of the system.
              </p>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
              <span className="text-xs font-medium text-zinc-300">Continuous Improvement</span>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
                Refine closes the loop by feeding production metrics back into
                the next Perceive cycle. This is not theoretical &mdash; the
                Marketing Engine&apos;s engagement scores improved 40% over three
                iterations of this exact loop.
              </p>
            </div>
          </div>
        </ExpandedSection>
      )}

      {/* Decorative accent */}
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-orange-500/[0.06] blur-3xl" />
    </BentoCard>
  );
}
