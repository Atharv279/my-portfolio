"use client";

import { useRef } from "react";
import BentoCard from "./BentoCard";
import { useBento } from "./BentoGrid";
import { AnimatedBeam } from "../magicui/animated-beam";
import {
  Cpu,
  Film,
  Image as ImageIcon,
  Mic,
  Newspaper,
  ScrollText,
  Send,
  Workflow,
  Zap,
} from "lucide-react";

interface SovereignPipelineCardProps {
  id?: string;
}

// Pipeline stages, each maps to a local-only inference step.
const stages = [
  { icon: Newspaper, label: "Scrape" },
  { icon: ScrollText, label: "Script" },
  { icon: ImageIcon, label: "Frames" },
  { icon: Mic, label: "Voice" },
  { icon: Film, label: "Compose" },
  { icon: Send, label: "Publish" },
];

const tags = [
  { icon: Cpu, label: "Ollama" },
  { icon: ImageIcon, label: "Stable Diffusion" },
  { icon: Mic, label: "XTTS" },
  { icon: Film, label: "ffmpeg" },
  { icon: Zap, label: "RTX 4060 · 8 GB" },
];

export default function SovereignPipelineCard({
  id = "project-sovereign-pipeline",
}: SovereignPipelineCardProps) {
  const { expandedId } = useBento();
  const isExpanded = expandedId === id;

  // Refs for AnimatedBeam path computation. One container + one per stage.
  const railRef = useRef<HTMLDivElement>(null);
  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const s3 = useRef<HTMLDivElement>(null);
  const s4 = useRef<HTMLDivElement>(null);
  const s5 = useRef<HTMLDivElement>(null);
  const s6 = useRef<HTMLDivElement>(null);

  const stageRefs = [s1, s2, s3, s4, s5, s6];

  return (
    <BentoCard
      id={id}
      index={0}
      glowColor="rgba(245, 158, 11, 0.18)"
      ariaLabel="Sovereign Pipeline — local-AI YouTube Shorts automation"
      pulse
      className="flex flex-col justify-between md:col-span-2 md:row-span-1"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-amber-400">
            <Workflow className="h-3 w-3" aria-hidden="true" />
            Local Pipeline
          </span>
          <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-ink md:mt-2 md:text-xl">
            Sovereign Pipeline
          </h2>
          <p className="mt-1 font-mono text-xs text-ink-muted md:text-sm">
            Local AI → YouTube Shorts
          </p>
        </div>
        <span className="hidden shrink-0 items-center gap-1 rounded-md border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-amber-300 sm:inline-flex">
          <Zap className="h-3 w-3" aria-hidden="true" />
          Autonomous
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-[13px] leading-relaxed text-ink-muted md:mt-4 md:max-w-lg md:text-sm">
        End-to-end content generator that scrapes trending topics, drafts a
        short-form script, renders frames and voice-over from local models,
        and stitches a publish-ready Short — all on a single 8 GB GPU, with
        zero per-render API spend.
      </p>

      {/* Pipeline-stage rail — chevrons replaced by AnimatedBeam overlays.
          `relative` is required so the absolutely-positioned beam SVG aligns to this container. */}
      <div
        ref={railRef}
        aria-hidden="true"
        className="relative -mx-1 mt-4 flex items-stretch gap-4 overflow-x-auto md:mt-5 md:gap-6"
      >
        {stages.map(({ icon: Icon, label }, i) => (
          <div
            key={label}
            ref={stageRefs[i]}
            className="z-10 flex shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-hairline bg-surface px-2.5 py-2 min-w-[60px]"
          >
            <Icon className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-secondary">
              {label}
            </span>
          </div>
        ))}

        {/* Animated amber/yellow data-flow beams (5 between 6 stages). */}
        <AnimatedBeam
          key="beam-0"
          containerRef={railRef}
          fromRef={s1}
          toRef={s2}
          duration={3.5}
          delay={0 * 0.4}
          pathColor="#fbbf24"
          pathOpacity={0.18}
          gradientStartColor="#fbbf24"
          gradientStopColor="#fde047"
        />
        <AnimatedBeam
          key="beam-1"
          containerRef={railRef}
          fromRef={s2}
          toRef={s3}
          duration={3.5}
          delay={1 * 0.4}
          pathColor="#fbbf24"
          pathOpacity={0.18}
          gradientStartColor="#fbbf24"
          gradientStopColor="#fde047"
        />
        <AnimatedBeam
          key="beam-2"
          containerRef={railRef}
          fromRef={s3}
          toRef={s4}
          duration={3.5}
          delay={2 * 0.4}
          pathColor="#fbbf24"
          pathOpacity={0.18}
          gradientStartColor="#fbbf24"
          gradientStopColor="#fde047"
        />
        <AnimatedBeam
          key="beam-3"
          containerRef={railRef}
          fromRef={s4}
          toRef={s5}
          duration={3.5}
          delay={3 * 0.4}
          pathColor="#fbbf24"
          pathOpacity={0.18}
          gradientStartColor="#fbbf24"
          gradientStopColor="#fde047"
        />
        <AnimatedBeam
          key="beam-4"
          containerRef={railRef}
          fromRef={s5}
          toRef={s6}
          duration={3.5}
          delay={4 * 0.4}
          pathColor="#fbbf24"
          pathOpacity={0.18}
          gradientStartColor="#fbbf24"
          gradientStopColor="#fde047"
        />
      </div>

      {/* Tag pills (local-stack inventory) */}
      <div className="mt-4 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
        {tags.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-2 py-1 text-[11px] text-ink-muted md:px-2.5 md:text-xs"
          >
            <Icon className="h-3 w-3 text-ink-subtle" aria-hidden="true" />
            {label}
          </div>
        ))}
      </div>

      {/* === EXPANDED CONTENT === */}
      {isExpanded && (
        <div className="mt-5 border-t border-hairline pt-5">
          <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-secondary">
            <Workflow className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
            Stage details
          </h3>
          <ul className="space-y-2 text-[13px] leading-relaxed text-ink-muted">
            <li className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
              <span>
                Trend scraper polls AI/tech subreddits and news feeds; an Ollama-served LLM ranks and rewrites them into 45-second scripts with hooks and CTAs.
              </span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
              <span>
                Stable Diffusion produces themed B-roll frames; XTTS speaks the script in a consistent voice; ffmpeg stitches captions, ducking, and pacing.
              </span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
              <span>
                Every stage runs locally on an RTX 4060 (8 GB) — the per-Short marginal cost is electricity, not API tokens.
              </span>
            </li>
          </ul>
        </div>
      )}

      {/* Decorative accent */}
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-500/[0.07] blur-3xl" />
    </BentoCard>
  );
}
