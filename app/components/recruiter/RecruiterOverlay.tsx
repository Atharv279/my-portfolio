"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { X, Github, Linkedin, MapPin } from "lucide-react";
import {
  portfolioSkills,
  portfolioDomains,
  portfolioCertifications,
  portfolioProjects,
  portfolioExperience,
} from "@/lib/portfolio-data";

const topSkills = [...portfolioSkills]
  .sort((a, b) => b.proficiency - a.proficiency)
  .slice(0, 6);

const metrics = [
  { label: "Experience", value: `${portfolioExperience.length} Roles` },
  { label: "Projects", value: `${portfolioProjects.length}` },
  { label: "Certifications", value: `${portfolioCertifications.length}` },
  { label: "Skills", value: `${portfolioSkills.length}+` },
];

interface RecruiterOverlayProps {
  onClose: () => void;
}

const NAV_SECTIONS = [
  { label: "Projects", targetId: "projects" },
  { label: "Skills", targetId: "skills" },
  { label: "Certifications", targetId: "certifications" },
  { label: "Timeline", targetId: "timeline" },
];

export default function RecruiterOverlay({ onClose }: RecruiterOverlayProps) {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-black/90 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-5xl px-4 py-4 md:px-8">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-400">
              Recruiter Quick View
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-ink-subtle transition-colors hover:bg-white/[0.06] hover:text-ink-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Metrics row */}
        <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-center"
            >
              <div className="text-base font-semibold text-ink-secondary">{m.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-ink-subtle">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quick nav */}
        <div className="mb-4 flex flex-wrap gap-2">
          {NAV_SECTIONS.map((s) => (
            <button
              key={s.targetId}
              onClick={() => scrollTo(s.targetId)}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] text-ink-muted transition-colors hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-ink-secondary"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Two columns: skills + info */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Top skills */}
          <div>
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-ink-subtle">
              Top Skills
            </span>
            <div className="flex flex-wrap gap-1.5">
              {topSkills.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-1.5 rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-1 text-[11px] text-violet-300"
                >
                  <span>{s.name}</span>
                  <span className="text-violet-500">
                    {Math.round(s.proficiency * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Domains + links */}
          <div>
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-ink-subtle">
              Domains
            </span>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {portfolioDomains.map((d) => (
                <span
                  key={d.name}
                  className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 text-[11px] text-ink-muted"
                >
                  {d.name}
                </span>
              ))}
            </div>

            {/* Availability + links */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                <MapPin className="h-3 w-3" />
                <span>Nio Stars Technologies</span>
              </div>
              <a
                href="https://github.com/Atharv279"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-ink-muted transition-colors hover:text-ink-secondary"
              >
                <Github className="h-3 w-3" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/atharv-patil-bab53a284"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-ink-muted transition-colors hover:text-ink-secondary"
              >
                <Linkedin className="h-3 w-3" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
