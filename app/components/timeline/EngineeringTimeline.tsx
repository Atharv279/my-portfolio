"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import {
  portfolioExperience,
  portfolioProjects,
} from "@/lib/portfolio-data";
import { Timeline } from "../aceternity/timeline";

export default function EngineeringTimeline() {
  const timelineData = portfolioExperience.map((exp) => {
    const linkedProjects = exp.keyProjects
      .map((slug) => portfolioProjects.find((p) => p.slug === slug))
      .filter(Boolean);

    return {
      title: exp.period,
      content: (
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-ink">
                {exp.role}
              </h3>
              <span className="text-sm font-medium text-ink-muted">·</span>
              <span className="text-sm font-medium text-violet-400">
                {exp.company}
              </span>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
              {exp.description}
            </p>
          </div>

          {/* Skill pills */}
          <div className="flex flex-wrap gap-1.5">
            {exp.keySkills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-hairline bg-surface px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-ink-secondary"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Linked projects */}
          {linkedProjects.length > 0 && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {linkedProjects.map((proj) =>
                proj ? (
                  <div
                    key={proj.slug}
                    className="rounded-xl border border-hairline bg-surface p-3 transition-colors md:hover:border-violet-500/30"
                  >
                    <span className="text-xs font-semibold text-ink">
                      {proj.title}
                    </span>
                    <p className="mt-1 text-[11px] leading-relaxed text-ink-subtle">
                      {proj.oneLiner}
                    </p>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
      ),
    };
  });

  return (
    <div>
      <div className="mb-8 flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-violet-400" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-violet-400">
          Career Evolution
        </span>
      </div>

      <Timeline data={timelineData} />
    </div>
  );
}
