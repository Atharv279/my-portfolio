"use client";

import BentoCard from "./BentoCard";
import { useBento } from "./BentoGrid";
import ExpandedSection, { DetailItem } from "./ExpandedSection";
import { Award, Cloud, Cpu } from "lucide-react";
import { getIcon, DynamicIcon } from "@/lib/icon-map";
import type { HardwareOpsData } from "@/lib/types";
import { fallbackHardwareOps } from "@/lib/fallback-data";
import { Compare } from "../aceternity/compare";
import { motion } from "framer-motion";

interface HardwareOpsCardProps {
  id?: string;
  data?: HardwareOpsData;
}

const CloudVisual = () => (
  <div className="relative flex h-full w-full flex-col items-center justify-center bg-zinc-900/40 p-4 text-center">
    <div className="absolute inset-0 bg-amber-500/5" />
    <div className="mb-2 rounded-full bg-amber-500/10 p-2">
      <Cloud className="h-6 w-6 text-amber-500" />
    </div>
    <div className="space-y-0.5">
      <p className="text-[13px] font-semibold text-ink">Cloud API</p>
      <p className="text-[10px] text-ink-subtle">Shared Compute • $0.04/req</p>
    </div>
    <div className="mt-4 w-full max-w-[140px] space-y-1.5">
      <div className="flex justify-between text-[9px] font-mono text-amber-500/70">
        <span>LATENCY</span>
        <span>2400ms</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-amber-500/20">
        <motion.div 
          className="h-full w-1/3 bg-amber-500"
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  </div>
);

const LocalVisual = () => (
  <div className="relative flex h-full w-full flex-col items-center justify-center bg-zinc-900/40 p-4 text-center">
    <div className="absolute inset-0 bg-emerald-500/10 animate-pulse" />
    <div className="mb-2 rounded-full bg-emerald-500/10 p-2">
      <Cpu className="h-6 w-6 text-emerald-500" />
    </div>
    <div className="space-y-0.5">
      <p className="text-[13px] font-semibold text-ink">Local RTX 4060</p>
      <p className="text-[10px] text-ink-subtle">Dedicated GPU • $0.00 Cost</p>
    </div>
    <div className="mt-4 w-full max-w-[140px] space-y-1.5">
      <div className="flex justify-between text-[9px] font-mono text-emerald-500/70">
        <span>LATENCY</span>
        <span>14ms</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-emerald-500/40">
        <div className="h-full w-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
      </div>
    </div>
  </div>
);

export default function HardwareOpsCard({
  id = "hardware-ops",
  data = fallbackHardwareOps,
}: HardwareOpsCardProps) {
  const { expandedId } = useBento();
  const isExpanded = expandedId === id;

  return (
    <BentoCard
      id={id}
      index={1}
      glowColor={data.glowColor}
      className="flex flex-col justify-between md:col-span-2 md:row-span-1"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <DynamicIcon name={data.headerIcon} className="h-4 w-4 text-rose-400" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-rose-400">
          {data.headerLabel}
        </span>
      </div>

      {/* Interactive Compare Slider */}
      <div className="mt-4 h-44 w-full overflow-hidden rounded-xl border border-white/[0.06] bg-black/20">
        <Compare 
          firstContent={<CloudVisual />}
          secondContent={<LocalVisual />}
          className="h-full w-full"
          slideMode="hover"
          autoplay={true}
          autoplayDuration={3000}
        />
      </div>

      {/* Capability list */}
      <div className="mt-4 flex flex-wrap gap-1.5 md:mt-5">
        {data.capabilities.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-ink-secondary md:text-xs"
            >
              <DynamicIcon name={item.icon} className="h-3.5 w-3.5 shrink-0 text-ink-subtle" />
              {item.label}
            </div>
          ))}
      </div>

      {/* Certification badge */}
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/[0.07] px-2.5 py-2 md:mt-5">
        <Award className="h-4 w-4 shrink-0 text-rose-400" />
        <span className="text-[11px] font-medium text-rose-300 md:text-xs">
          {data.certificationLabel}
        </span>
      </div>

      {/* === EXPANDED CONTENT === */}
      {isExpanded &&
        data.expandedSections.map((section) => (
            <ExpandedSection
              key={section.title}
              icon={getIcon(section.icon)}
              title={section.title}
              accentColor={section.accentColor}
            >
              {section.detailItems && (
                <dl className="space-y-0">
                  {section.detailItems.map((di) => (
                    <DetailItem key={di.label} label={di.label} text={di.text} />
                  ))}
                </dl>
              )}
              {section.infoCards && (
                <div className="flex flex-col gap-2.5">
                  {section.infoCards.map((card) => (
                    <div key={card.title} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                      <span className="text-xs font-medium text-ink-secondary">{card.title}</span>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-subtle">
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </ExpandedSection>
          ))}

      {/* Decorative accent */}
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-rose-500/[0.06] blur-3xl" />
    </BentoCard>
  );
}
