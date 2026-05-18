"use client";

import BentoCard from "./BentoCard";
import { useBento } from "./BentoGrid";
import ExpandedSection from "./ExpandedSection";
import { TrendingUp, Layers } from "lucide-react";
import { DynamicIcon } from "@/lib/icon-map";
import type { TechStackData } from "@/lib/types";
import { fallbackTechStack } from "@/lib/fallback-data";
import { IconCloud } from "../magicui/icon-cloud";

const slugs = [
  "python",
  "pytorch",
  "docker",
  "ubuntu",
  "nvidia",
  "nextdotjs",
  "typescript",
  "fastapi",
  "langchain",
];

interface TechStackCardProps {
  id?: string;
  data?: TechStackData;
}

export default function TechStackCard({
  id = "tech-stack",
  data = fallbackTechStack,
}: TechStackCardProps) {
  const { expandedId } = useBento();
  const isExpanded = expandedId === id;

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug === "nextdotjs" ? "white" : "white"}`
  );

  return (
    <BentoCard
      id={id}
      index={1}
      glowColor={data.glowColor}
      className="flex flex-col md:col-span-1 md:row-span-1"
    >
      <div className="flex items-center gap-2">
        <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-amber-400">
          Top Skills
        </span>
      </div>

      <div className="relative mt-4 flex h-full w-full items-center justify-center overflow-hidden bg-transparent md:mt-0">
        <IconCloud images={images} />
      </div>

      {/* === EXPANDED CONTENT === */}
      {isExpanded && (
        <ExpandedSection
          icon={Layers}
          title="Full Arsenal"
          accentColor="text-amber-400"
        >
          <div className="flex flex-col gap-4">
            {data.arsenal.map((category) => (
                <div key={category.title}>
                  <div className="mb-2 flex items-center gap-2">
                    <DynamicIcon name={category.icon} className="h-3.5 w-3.5 text-ink-muted" />
                    <span className="text-xs font-medium text-ink-secondary">
                      {category.title}
                    </span>
                    <span className="text-[11px] text-ink-subtle">
                      &mdash; {category.subtitle}
                    </span>
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide sm:flex-wrap">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className={`shrink-0 rounded-md border ${category.accentBorder} bg-white/[0.03] px-2.5 py-1 text-[11px] text-ink-muted md:text-xs`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  {category.footnote && (
                    <p className="mt-1.5 text-[11px] text-ink-subtle">
                      {category.footnote}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </ExpandedSection>
      )}
    </BentoCard>
  );
}
