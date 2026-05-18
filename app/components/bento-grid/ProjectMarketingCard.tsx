"use client";

import BentoCard from "./BentoCard";
import { useBento } from "./BentoGrid";
import ExpandedSection, { DetailItem, PipelineStep } from "./ExpandedSection";
import { ExternalLink } from "lucide-react";
import { getIcon, DynamicIcon } from "@/lib/icon-map";
import type { Project } from "@/lib/types";
import { fallbackMarketingProject } from "@/lib/fallback-data";

interface ProjectMarketingCardProps {
  id?: string;
  data?: Project;
}

export default function ProjectMarketingCard({
  id = "project-marketing",
  data = fallbackMarketingProject,
}: ProjectMarketingCardProps) {
  const { expandedId } = useBento();
  const isExpanded = expandedId === id;

  return (
    <BentoCard
      id={id}
      index={0}
      glowColor={data.glowColor}
      className="flex flex-col justify-between md:col-span-2 md:row-span-1"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="font-mono text-[11px] uppercase tracking-widest text-violet-400">
            {data.category}
          </span>
          <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-ink md:mt-2 md:text-xl">
            {data.title}
          </h2>
        </div>
        {data.badge && (
          <span className="hidden shrink-0 rounded-md border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-violet-300 sm:inline-flex">
            {data.badge}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-3 text-[13px] leading-relaxed text-ink-muted md:mt-4 md:max-w-lg md:text-sm">
        {data.description}
      </p>

      {/* Tags + CTA row */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between md:mt-5">
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {data.tags.map((tag) => (
              <div
                key={tag.label}
                className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-1 text-[11px] text-ink-muted md:px-2.5 md:text-xs"
              >
                <DynamicIcon name={tag.icon} className="h-3 w-3 text-ink-subtle" />
                {tag.label}
              </div>
            ))}
        </div>

        {data.sourceUrl && (
          <a
            href={data.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group inline-flex w-fit items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 font-mono text-xs text-ink-secondary transition-all active:bg-violet-500/10 md:hover:border-violet-500/40 md:hover:bg-violet-500/10 md:hover:text-violet-300 md:hover:shadow-[0_0_20px_-6px_rgba(139,92,246,0.3)]"
          >
            View Source
            <ExternalLink className="h-3 w-3 transition-transform md:group-hover:translate-x-0.5" />
          </a>
        )}
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
              {section.introText && (
                <p className="mb-4 text-[13px] leading-relaxed text-ink-subtle">
                  {section.introText}
                </p>
              )}
              {section.pipelineSteps && (
                <div className="flex flex-col gap-0">
                  {section.pipelineSteps.map((ps) => (
                    <PipelineStep
                      key={ps.step}
                      step={ps.step}
                      title={ps.title}
                      description={ps.description}
                      accentColor={ps.accentColor}
                    />
                  ))}
                </div>
              )}
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
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet-500/[0.06] blur-3xl" />
    </BentoCard>
  );
}
