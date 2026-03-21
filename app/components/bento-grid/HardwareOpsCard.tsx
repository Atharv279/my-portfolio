"use client";

import BentoCard from "./BentoCard";
import ExpandedSection, { DetailItem } from "./ExpandedSection";
import { Award } from "lucide-react";
import { getIcon, DynamicIcon } from "@/lib/icon-map";
import type { HardwareOpsData } from "@/lib/types";
import { fallbackHardwareOps } from "@/lib/fallback-data";

interface HardwareOpsCardProps {
  id?: string;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
  data?: HardwareOpsData;
}

export default function HardwareOpsCard({
  id = "hardware-ops",
  onExpand,
  isExpanded,
  data = fallbackHardwareOps,
}: HardwareOpsCardProps) {
  return (
    <BentoCard
      id={id}
      index={1}
      glowColor={data.glowColor}
      className="flex flex-col justify-between md:col-span-2 md:row-span-1"
      onExpand={onExpand}
      isExpanded={isExpanded}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <DynamicIcon name={data.headerIcon} className="h-4 w-4 text-rose-400" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-rose-400">
          {data.headerLabel}
        </span>
      </div>

      {/* Capability list */}
      <div className="mt-4 flex flex-col gap-2 md:mt-5">
        {data.capabilities.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-zinc-300 md:text-xs"
            >
              <DynamicIcon name={item.icon} className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
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
                      <span className="text-xs font-medium text-zinc-300">{card.title}</span>
                      <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
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
