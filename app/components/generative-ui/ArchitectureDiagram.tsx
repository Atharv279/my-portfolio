"use client";

import type { Project } from "@/lib/types";

interface ArchitectureDiagramProps {
  project: Project;
}

export function ArchitectureDiagram({ project }: ArchitectureDiagramProps) {
  // Find the first section with pipelineSteps, fallback to detailItems
  const pipelineSection = project.expandedSections.find(
    (s) => s.pipelineSteps && s.pipelineSteps.length > 0
  );
  const detailSection = project.expandedSections.find(
    (s) => s.detailItems && s.detailItems.length > 0
  );

  const steps = pipelineSection?.pipelineSteps;
  const details = detailSection?.detailItems;

  if (!steps && !details) return null;

  return (
    <div className="my-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
        {project.title} — Architecture
      </p>

      {steps ? (
        <div className="relative space-y-0">
          {steps.map((step, i) => (
            <div key={step.step} className="relative flex gap-3">
              {/* Vertical connector line */}
              <div className="flex flex-col items-center">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-[9px] font-mono text-zinc-500">
                  {step.step.replace(/\D/g, "") || String(i + 1)}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-white/[0.06]" />
                )}
              </div>

              <div className="pb-3">
                <p className="text-xs font-medium text-zinc-300">
                  {step.title}
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        details && (
          <div className="space-y-2">
            {details.map((item) => (
              <div key={item.label}>
                <p className="text-xs font-medium text-zinc-300">
                  {item.label}
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
