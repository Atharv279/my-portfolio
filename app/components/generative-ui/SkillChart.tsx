"use client";

import { DynamicIcon } from "@/lib/icon-map";
import { fallbackTechStack } from "@/lib/fallback-data";

interface SkillChartProps {
  category: "trending" | "ai-ml" | "networking" | "backend-ops" | "all";
}

export function SkillChart({ category }: SkillChartProps) {
  if (category === "trending" || category === "all") {
    return (
      <div className="my-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          {category === "all" ? "Tech Stack" : "Trending"}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {fallbackTechStack.trending.map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.05] px-2 py-1 text-xs text-zinc-300"
              >
                <DynamicIcon name={tech.icon} className="h-3 w-3 text-zinc-500" />
                {tech.name}
              </span>
            ))}
        </div>

        {category === "all" &&
          fallbackTechStack.arsenal.map((section) => (
            <div key={section.title} className="mt-3">
              <p className="mb-1.5 text-[11px] font-medium text-zinc-400">
                {section.title}
              </p>
              <div className="flex flex-wrap gap-1">
                {section.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-zinc-500"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>
    );
  }

  // Specific category
  const categoryMap: Record<string, string> = {
    "ai-ml": "AI / ML",
    networking: "Networking",
    "backend-ops": "Backend / Ops",
  };
  const section = fallbackTechStack.arsenal.find(
    (a) => a.title === categoryMap[category]
  );
  if (!section) return null;

  return (
    <div className="my-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
      <div className="mb-2 flex items-center gap-2">
        <DynamicIcon name={section.icon} className="h-3.5 w-3.5 text-zinc-500" />
        <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          {section.title}
        </p>
      </div>
      <p className="mb-2 text-[11px] text-zinc-600">{section.subtitle}</p>
      <div className="flex flex-wrap gap-1.5">
        {section.items.map((item) => (
          <span
            key={item}
            className="rounded-md bg-white/[0.05] px-2 py-1 text-xs text-zinc-400"
          >
            {item}
          </span>
        ))}
      </div>
      {section.footnote && (
        <p className="mt-2 text-[10px] italic text-zinc-600">
          {section.footnote}
        </p>
      )}
    </div>
  );
}
