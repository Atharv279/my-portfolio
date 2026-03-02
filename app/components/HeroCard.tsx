"use client";

import BentoCard from "./BentoCard";
import ExpandedSection, { DetailItem } from "./ExpandedSection";
import { Github, Linkedin, MapPin, Briefcase, User, GraduationCap, Building2, ExternalLink } from "lucide-react";

interface HeroCardProps {
  id?: string;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
}

export default function HeroCard({ id = "hero", onExpand, isExpanded }: HeroCardProps) {
  return (
    <BentoCard
      id={id}
      index={0}
      glowColor="rgba(52, 211, 153, 0.15)"
      className="flex flex-col justify-between !p-6 md:!p-8 md:col-span-2 md:row-span-2"
      onExpand={onExpand}
      isExpanded={isExpanded}
    >
      {/* Status badge */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="font-mono text-[11px] text-emerald-400 md:text-xs">
          Available for opportunities
        </span>
      </div>

      {/* Main content */}
      <div className="mt-6 flex flex-1 flex-col justify-center md:mt-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-zinc-50 md:text-4xl lg:text-5xl">
          Atharv Patil
        </h1>
        <p className="mt-2 font-mono text-base text-zinc-400 md:mt-3 md:text-lg lg:text-xl">
          Python Developer &amp; AI Engineer
        </p>

        <div className="mt-4 flex flex-col gap-2 md:mt-6 md:gap-2.5">
          <div className="flex items-center gap-2 text-xs text-zinc-500 md:text-sm">
            <Briefcase className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
            <span>Junior Software Developer @ Nio Stars Technologies</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 md:text-sm">
            <MapPin className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
            <span>Pune, India</span>
          </div>
        </div>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 md:mt-6">
          B.Tech CS graduate bridging complex ML models and production-grade
          software. Specializing in autonomous agents, RAG systems, and
          enterprise AI workflows.
        </p>
      </div>

      {/* Social links */}
      <div className="mt-6 flex items-center gap-3 md:mt-8">
        <a
          href="https://github.com/Atharv279"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-zinc-400 transition-colors active:bg-white/10 md:hover:bg-white/10 md:hover:text-zinc-50"
        >
          <Github className="h-4 w-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/atharv-patil-bab53a284"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-zinc-400 transition-colors active:bg-white/10 md:hover:bg-white/10 md:hover:text-zinc-50"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>

      {/* === EXPANDED CONTENT === */}
      {isExpanded && (
        <>
          <ExpandedSection
            icon={User}
            title="Professional Summary"
            accentColor="text-emerald-400"
          >
            <p className="text-[13px] leading-relaxed text-zinc-400">
              As a Junior Software Developer and Team Lead at Nio Stars
              Technologies, I specialize in bridging the gap between complex
              machine learning models and production-grade software. My focus is
              centered on AI/ML Engineering and Intelligent Automation&mdash;specifically
              designing autonomous agents, RAG-based systems, and enterprise AI
              workflows that solve real-world business challenges.
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">
              I have led teams to develop high-impact AI tools, including custom
              RAG-based financial bots and automated document comparators that
              achieved an 83% accuracy rate. By combining a deep technical
              understanding of MLOps and Python with a leadership-driven
              approach, I ensure that every solution is not only innovative but
              also scalable and impactful for the modern enterprise.
            </p>
          </ExpandedSection>

          <ExpandedSection
            icon={GraduationCap}
            title="Education"
            accentColor="text-emerald-400"
          >
            <div className="flex flex-col gap-2.5">
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-zinc-300">
                    Bachelor of Technology &mdash; Computer Science
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-zinc-600">
                    2021 &ndash; 2024
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
                  Nagpur University. Core coursework in data structures,
                  algorithms, operating systems, and machine learning. Final-year
                  projects focused on applied AI and network systems engineering.
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-zinc-300">
                    Diploma &mdash; Computer Science
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-zinc-600">
                    2018 &ndash; 2021
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
                  Cusrow Wadia Institute of Technology. Foundation in
                  programming, networking fundamentals, and systems
                  administration that established early hands-on engineering
                  skills.
                </p>
              </div>
            </div>
          </ExpandedSection>

          <ExpandedSection
            icon={Building2}
            title="Career Context"
            accentColor="text-emerald-400"
          >
            <dl className="space-y-0">
              <DetailItem
                label="Nio Stars Technologies LLP — Junior Software Developer (Jan 2026 – Present)"
                text="Currently building real-time data acquisition systems and AI-driven automation pipelines. Leading development of intelligent internal tools that combine SNMP/SSH network telemetry with local LLM inference for autonomous monitoring and content generation workflows."
              />
              <DetailItem
                label="EOXS — AI Generalist (May 2025 – Oct 2025)"
                text="Developed LLM-powered internal tools for document automation and discrepancy detection. Designed prompt engineering pipelines for GenAI-driven ERP modules. Prototyped workflows for PDF parsing, email automation, and structured data extraction across enterprise operations."
              />
              <DetailItem
                label="Rubixe — AI & Data Science Consultant Intern (Sep 2024 – Apr 2025)"
                text="Developed Proof-of-Concept solutions integrating ML models and data pipelines. Applied data preprocessing, feature engineering, and model evaluation techniques to real-world business datasets for client consulting engagements."
              />
            </dl>
          </ExpandedSection>

          {/* Prominent Connect buttons */}
          <div className="mt-6 border-t border-white/[0.06] pt-5">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-300">
              Connect
            </h3>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <a
                href="https://github.com/Atharv279"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-5 py-3 font-mono text-sm text-zinc-300 transition-all active:bg-white/10 md:hover:border-emerald-500/40 md:hover:bg-emerald-500/10 md:hover:text-emerald-300 md:hover:shadow-[0_0_24px_-6px_rgba(52,211,153,0.3)]"
              >
                <Github className="h-4.5 w-4.5" />
                GitHub
                <ExternalLink className="ml-auto h-3 w-3 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-current" />
              </a>
              <a
                href="https://www.linkedin.com/in/atharv-patil-bab53a284"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/[0.08] px-5 py-3 font-mono text-sm text-emerald-300 transition-all active:bg-emerald-500/20 md:hover:border-emerald-500/50 md:hover:bg-emerald-500/15 md:hover:shadow-[0_0_24px_-6px_rgba(52,211,153,0.4)]"
              >
                <Linkedin className="h-4.5 w-4.5" />
                LinkedIn
                <ExternalLink className="ml-auto h-3 w-3 text-emerald-500/60 transition-transform group-hover:translate-x-0.5 group-hover:text-current" />
              </a>
            </div>
          </div>
        </>
      )}

      {/* Decorative gradient accent */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl md:h-60 md:w-60" />
    </BentoCard>
  );
}
