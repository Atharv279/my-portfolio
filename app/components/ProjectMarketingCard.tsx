"use client";

import BentoCard from "./BentoCard";
import ExpandedSection, { PipelineStep } from "./ExpandedSection";
import { ExternalLink, Bot, Workflow, Box, Cpu, Route } from "lucide-react";

interface ProjectMarketingCardProps {
  id?: string;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
}

const tags = [
  { label: "n8n", icon: Workflow },
  { label: "Ollama", icon: Box },
  { label: "Python", icon: Cpu },
  { label: "Agentic AI", icon: Bot },
];

export default function ProjectMarketingCard({ id = "project-marketing", onExpand, isExpanded }: ProjectMarketingCardProps) {
  return (
    <BentoCard
      id={id}
      index={3}
      glowColor="rgba(139, 92, 246, 0.15)"
      className="flex flex-col justify-between md:col-span-2 md:row-span-1"
      onExpand={onExpand}
      isExpanded={isExpanded}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="font-mono text-[11px] uppercase tracking-widest text-violet-400">
            Multi-Agent Systems
          </span>
          <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-zinc-50 md:mt-2 md:text-xl">
            Autonomous Marketing Engine
          </h2>
        </div>
        <span className="hidden shrink-0 rounded-md border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-violet-300 sm:inline-flex">
          Zero API Cost
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-[13px] leading-relaxed text-zinc-400 md:mt-4 md:max-w-lg md:text-sm">
        A fully autonomous pipeline that researches cybersecurity feeds,
        evaluates relevance, and publishes enterprise-grade LinkedIn
        posts&mdash;powered entirely by local LLM inference on an RTX&nbsp;4060
        via Ollama, orchestrated through n8n multi-agent workflows.
      </p>

      {/* Tags + CTA row */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between md:mt-5">
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {tags.map((tag) => (
            <div
              key={tag.label}
              className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-1 text-[11px] text-zinc-400 md:px-2.5 md:text-xs"
            >
              <tag.icon className="h-3 w-3 text-zinc-500" />
              {tag.label}
            </div>
          ))}
        </div>

        <a
          href="https://github.com/Atharv279"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="group inline-flex w-fit items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 font-mono text-xs text-zinc-300 transition-all active:bg-violet-500/10 md:hover:border-violet-500/40 md:hover:bg-violet-500/10 md:hover:text-violet-300 md:hover:shadow-[0_0_20px_-6px_rgba(139,92,246,0.3)]"
        >
          View Source
          <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* === EXPANDED CONTENT === */}
      {isExpanded && (
        <>
          <ExpandedSection
            icon={Route}
            title="Agentic Workflow"
            accentColor="text-violet-400"
          >
            <p className="mb-4 text-[13px] leading-relaxed text-zinc-500">
              The engine operates as a multi-agent DAG orchestrated through n8n,
              where each node is a specialized autonomous agent with a single
              responsibility. All LLM inference runs locally via Ollama, entirely
              eliminating cloud API token costs.
            </p>
            <div className="flex flex-col gap-0">
              <PipelineStep
                step="Agent 01"
                title="Research Agent"
                description="Scrapes live cybersecurity threat intelligence feeds using custom Python collectors. Aggregates raw articles, CVE disclosures, and vendor advisories into a structured JSON payload."
                accentColor="border-violet-500/40"
              />
              <PipelineStep
                step="Agent 02"
                title="Evaluation Agent"
                description="Receives the research payload and runs it through a local LLM (Ollama) to score relevance, novelty, and enterprise impact. Articles below the confidence threshold are discarded, preventing low-quality content from entering the pipeline."
                accentColor="border-violet-500/30"
              />
              <PipelineStep
                step="Agent 03"
                title="Generation Agent"
                description="Takes the highest-scored intel and generates a polished LinkedIn post. The prompt pipeline enforces enterprise tone, includes relevant hashtags, and structures the copy for maximum engagement. Output is formatted for the LinkedIn Publishing API."
                accentColor="border-violet-500/20"
              />
              <PipelineStep
                step="Agent 04"
                title="Refinement Loop"
                description="A self-critique pass re-evaluates the generated post against engagement heuristics. If the score falls below threshold, the content loops back to the Generation Agent for revision before final publish."
                accentColor="border-violet-500/10"
              />
            </div>
          </ExpandedSection>

          <ExpandedSection
            icon={Workflow}
            title="Infrastructure"
            accentColor="text-violet-400"
          >
            <div className="flex flex-col gap-2.5">
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                <span className="text-xs font-medium text-zinc-300">n8n Orchestration</span>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
                  Self-hosted n8n instance manages the entire DAG. Webhook triggers initiate the pipeline on a cron schedule. Error-handling nodes automatically retry failed steps with exponential backoff.
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                <span className="text-xs font-medium text-zinc-300">Local LLM (Ollama + RTX 4060)</span>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
                  All inference runs on a consumer RTX 4060 (8 GB VRAM). Model quantization (GGUF Q4_K_M) keeps memory usage under 6 GB, leaving headroom for concurrent evaluation and generation tasks.
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                <span className="text-xs font-medium text-zinc-300">LinkedIn API Integration</span>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
                  Direct OAuth2 integration with the LinkedIn Publishing API. Posts are auto-formatted with rich-text markup and scheduled for optimal engagement windows based on historical analytics.
                </p>
              </div>
            </div>
          </ExpandedSection>
        </>
      )}

      {/* Decorative accent */}
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet-500/[0.06] blur-3xl" />
    </BentoCard>
  );
}
