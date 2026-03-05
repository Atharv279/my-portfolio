"use client";

import BentoCard from "./BentoCard";
import ExpandedSection, { DetailItem } from "./ExpandedSection";
import { Github, Linkedin, User, GraduationCap, Building2, ExternalLink } from "lucide-react";
import type { Profile, Education, Experience } from "@/lib/types";
import {
  fallbackProfile,
  fallbackEducation,
  fallbackExperiences,
} from "@/lib/fallback-data";

interface HeroIdentityProps {
  id?: string;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
  profile?: Profile;
  education?: Education[];
  experiences?: Experience[];
}

const platformIcons: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
};

export default function HeroIdentity({
  id = "hero-identity",
  onExpand,
  isExpanded,
  profile = fallbackProfile,
  education = fallbackEducation,
  experiences = fallbackExperiences,
}: HeroIdentityProps) {
  return (
    <BentoCard
      id={id}
      index={0}
      glowColor="rgba(52, 211, 153, 0.15)"
      className="flex flex-col justify-between !p-5 md:!p-6 lg:!p-8 md:col-span-2 md:row-span-1"
      onExpand={onExpand}
      isExpanded={isExpanded}
    >
      {/* Main content */}
      <div className="flex flex-1 flex-col justify-center">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-3xl md:text-4xl lg:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-2 font-mono text-sm text-zinc-400 sm:text-base md:mt-3 md:text-lg lg:text-xl">
          {profile.tagline}
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Currently building autonomous AI systems.
        </p>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 md:mt-5">
          {profile.bio}
        </p>
      </div>

      {/* Social links */}
      <div className="mt-5 flex items-center gap-3 md:mt-6">
        {profile.socialLinks.map((link) => {
          const Icon = platformIcons[link.platform];
          if (!Icon) return null;
          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-zinc-400 transition-colors active:bg-white/10 md:hover:bg-white/10 md:hover:text-zinc-50"
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}
      </div>

      {/* === EXPANDED CONTENT === */}
      {isExpanded && (
        <>
          <ExpandedSection
            icon={User}
            title="Professional Summary"
            accentColor="text-emerald-400"
          >
            {profile.professionalSummary.map((paragraph, i) => (
              <p key={i} className={`${i > 0 ? "mt-3" : ""} text-[13px] leading-relaxed text-zinc-400`}>
                {paragraph}
              </p>
            ))}
          </ExpandedSection>

          <ExpandedSection
            icon={GraduationCap}
            title="Education"
            accentColor="text-emerald-400"
          >
            <div className="flex flex-col gap-2.5">
              {education.map((edu) => (
                <div key={edu._id} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-zinc-300">
                      {edu.degree}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] text-zinc-500">
                      {edu.period}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
                    {edu.institution}. {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </ExpandedSection>

          <ExpandedSection
            icon={Building2}
            title="Career Context"
            accentColor="text-emerald-400"
          >
            <dl className="space-y-0">
              {experiences.map((exp) => (
                <DetailItem
                  key={exp._id}
                  label={`${exp.company} — ${exp.role} (${exp.period})`}
                  text={exp.description}
                />
              ))}
            </dl>
          </ExpandedSection>

          {/* Prominent Connect buttons */}
          <div className="mt-6 border-t border-white/[0.06] pt-5">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-300">
              Connect
            </h3>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              {profile.socialLinks.map((link) => {
                const Icon = platformIcons[link.platform];
                if (!Icon) return null;
                const isLinkedIn = link.platform === "linkedin";
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={
                      isLinkedIn
                        ? "group inline-flex flex-1 items-center justify-center gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/[0.08] px-5 py-3 font-mono text-sm text-emerald-300 transition-all active:bg-emerald-500/20 md:hover:border-emerald-500/50 md:hover:bg-emerald-500/15 md:hover:shadow-[0_0_24px_-6px_rgba(52,211,153,0.4)]"
                        : "group inline-flex flex-1 items-center justify-center gap-2.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-5 py-3 font-mono text-sm text-zinc-300 transition-all active:bg-white/10 md:hover:border-emerald-500/40 md:hover:bg-emerald-500/10 md:hover:text-emerald-300 md:hover:shadow-[0_0_24px_-6px_rgba(52,211,153,0.3)]"
                    }
                  >
                    <Icon className="h-4.5 w-4.5" />
                    {link.label}
                    <ExternalLink
                      className={`ml-auto h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:text-current ${
                        isLinkedIn ? "text-emerald-500/60" : "text-zinc-600"
                      }`}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Decorative gradient accent */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl md:h-60 md:w-60" />
    </BentoCard>
  );
}
