"use client";

import { DynamicIcon } from "@/lib/icon-map";
import type { Project } from "@/lib/types";

interface MiniProjectCardProps {
  project: Project;
}

export function MiniProjectCard({ project }: MiniProjectCardProps) {
  return (
    <div className="my-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          {project.category}
        </span>
        {project.badge && (
          <span className="text-[10px] text-zinc-600">{project.badge}</span>
        )}
      </div>

      <h4 className="mb-1 text-sm font-medium text-zinc-200">
        {project.title}
      </h4>

      <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-zinc-500">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
            <span
              key={tag.label}
              className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-zinc-500"
            >
              <DynamicIcon name={tag.icon} className="h-2.5 w-2.5" />
              {tag.label}
            </span>
          ))}
      </div>
    </div>
  );
}
