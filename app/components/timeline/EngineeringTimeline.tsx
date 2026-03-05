"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import {
  portfolioExperience,
  portfolioProjects,
} from "@/lib/portfolio-data";

export default function EngineeringTimeline() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-violet-400" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-violet-400">
          Career Evolution
        </span>
      </div>

      <div className="relative ml-3 border-l border-white/[0.08] pl-6">
        {portfolioExperience.map((exp, i) => {
          const isExpanded = expandedIdx === i;
          const linkedProjects = exp.keyProjects
            .map((slug) => portfolioProjects.find((p) => p.slug === slug))
            .filter(Boolean);

          return (
            <motion.div
              key={exp.fallbackId}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative pb-8 last:pb-0"
            >
              {/* Dot on timeline */}
              <div
                className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-violet-500 bg-zinc-950"
                style={i === 0 ? { animation: "subtle-pulse 2.5s ease-in-out infinite" } : undefined}
              />

              {/* Period badge */}
              <span className="inline-block rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-zinc-500">
                {exp.period}
              </span>

              {/* Role & company */}
              <h3 className="mt-1.5 text-sm font-semibold text-zinc-200">
                {exp.role}
              </h3>
              <p className="text-[13px] text-zinc-500">{exp.company}</p>

              {/* Skill pills */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {exp.keySkills.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-400"
                  >
                    {skill}
                  </span>
                ))}
                {exp.keySkills.length > 5 && (
                  <span className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-500">
                    +{exp.keySkills.length - 5}
                  </span>
                )}
              </div>

              {/* Expand toggle for linked projects */}
              {linkedProjects.length > 0 && (
                <button
                  onClick={() => setExpandedIdx(isExpanded ? null : i)}
                  className="mt-2 flex items-center gap-1 text-[11px] text-violet-400 transition-colors hover:text-violet-300"
                >
                  {isExpanded ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                  {linkedProjects.length} project{linkedProjects.length > 1 ? "s" : ""}
                </button>
              )}

              {/* Expanded project details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="mt-2 flex flex-col gap-2 overflow-hidden"
                  >
                    {linkedProjects.map((proj) =>
                      proj ? (
                        <div
                          key={proj.slug}
                          className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2"
                        >
                          <span className="text-xs font-medium text-zinc-300">
                            {proj.title}
                          </span>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500">
                            {proj.oneLiner}
                          </p>
                        </div>
                      ) : null
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
