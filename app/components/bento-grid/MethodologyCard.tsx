"use client";

import BentoCard from "./BentoCard";
import ExpandedSection from "./ExpandedSection";
import { Compass } from "lucide-react";
import { DynamicIcon } from "@/lib/icon-map";
import type { MethodologyData } from "@/lib/types";
import { fallbackMethodology } from "@/lib/fallback-data";

interface MethodologyCardProps {
  id?: string;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
  data?: MethodologyData;
}

export default function MethodologyCard({
  id = "methodology",
  onExpand,
  isExpanded,
  data = fallbackMethodology,
}: MethodologyCardProps) {
  return (
    <BentoCard
      id={id}
      index={0}
      glowColor={data.glowColor}
      className="flex flex-col md:col-span-2 md:row-span-1"
      onExpand={onExpand}
      isExpanded={isExpanded}
    >
      <span className="font-mono text-[11px] uppercase tracking-widest text-orange-400">
        Methodology
      </span>

      {/* Vertical timeline */}
      <div className="mt-4 flex flex-col gap-0 md:mt-5">
        {data.phases.map((phase, i) => (
            <div key={phase.label} className="relative flex items-start gap-3 pb-4 last:pb-0">
              {/* Timeline connector line */}
              {i < data.phases.length - 1 && (
                <div className="absolute left-[11px] top-7 h-[calc(100%-16px)] w-px bg-white/[0.08]" />
              )}

              {/* Icon node */}
              <div className="relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border border-orange-500/25 bg-orange-500/[0.08]">
                <DynamicIcon name={phase.icon} className="h-3 w-3 text-orange-400" />
              </div>

              {/* Text */}
              <div className="min-w-0 pt-px">
                <span className="text-[13px] font-medium text-ink-secondary md:text-sm">
                  {phase.label}
                </span>
                <p className="mt-0.5 text-[11px] text-ink-subtle md:text-xs">
                  {phase.brief}
                </p>
                {/* Expanded detail visible only in modal */}
                {isExpanded && (
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
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
            {data.whyItWorks.map((card) => (
              <div key={card.title} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                <span className="text-xs font-medium text-ink-secondary">{card.title}</span>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-subtle">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </ExpandedSection>
      )}

      {/* Decorative accent */}
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-orange-500/[0.06] blur-3xl" />
    </BentoCard>
  );
}
