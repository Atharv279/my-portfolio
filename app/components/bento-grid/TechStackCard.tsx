"use client";

import { motion } from "framer-motion";
import BentoCard from "./BentoCard";
import ExpandedSection from "./ExpandedSection";
import { TrendingUp, Layers } from "lucide-react";
import { DynamicIcon } from "@/lib/icon-map";
import type { TechStackData } from "@/lib/types";
import { fallbackTechStack } from "@/lib/fallback-data";

interface TechStackCardProps {
  id?: string;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
  data?: TechStackData;
}

const pillVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.6 + i * 0.06, duration: 0.3 },
  }),
};

export default function TechStackCard({
  id = "tech-stack",
  onExpand,
  isExpanded,
  data = fallbackTechStack,
}: TechStackCardProps) {
  return (
    <BentoCard
      id={id}
      index={1}
      glowColor={data.glowColor}
      className="flex flex-col md:col-span-1 md:row-span-1"
      onExpand={onExpand}
      isExpanded={isExpanded}
    >
      <div className="flex items-center gap-2">
        <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-amber-400">
          Top Skills
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
        {data.trending.map((tech, i) => (
            <motion.div
              key={tech.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={pillVariants}
              className="flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/[0.06] px-2.5 py-1.5 text-[11px] font-medium text-zinc-200 md:text-xs"
            >
              <DynamicIcon name={tech.icon} className="h-3 w-3 shrink-0 text-zinc-500" />
              <span>{tech.name}</span>
            </motion.div>
          ))}
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
                    <DynamicIcon name={category.icon} className="h-3.5 w-3.5 text-zinc-400" />
                    <span className="text-xs font-medium text-zinc-200">
                      {category.title}
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      &mdash; {category.subtitle}
                    </span>
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide sm:flex-wrap">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className={`shrink-0 rounded-md border ${category.accentBorder} bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-400 md:text-xs`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  {category.footnote && (
                    <p className="mt-1.5 text-[11px] text-zinc-500">
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
