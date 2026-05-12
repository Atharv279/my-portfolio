"use client";

import { motion } from "framer-motion";
import BentoCard from "./BentoCard";
import { Briefcase, MapPin } from "lucide-react";
import type { Profile } from "@/lib/types";
import { fallbackProfile } from "@/lib/fallback-data";

interface HeroStatusProps {
  id?: string;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
  profile?: Profile;
}

const statVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.5 + i * 0.1, duration: 0.35 },
  }),
};

export default function HeroStatus({
  id = "hero-status",
  onExpand,
  isExpanded,
  profile = fallbackProfile,
}: HeroStatusProps) {
  const stats = profile.stats ?? [];

  return (
    <BentoCard
      id={id}
      index={1}
      glowColor="rgba(52, 211, 153, 0.15)"
      className="flex flex-col items-center justify-center text-center md:col-span-1 md:row-span-1"
      onExpand={onExpand}
      isExpanded={isExpanded}
    >
      {/* Pulsing status badge */}
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
        </span>
        <span className="font-mono text-sm font-medium text-emerald-400">
          {profile.status}
        </span>
      </div>

      {/* Role + Location */}
      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-center gap-2 text-xs text-ink-muted">
          <Briefcase className="h-3.5 w-3.5 shrink-0" />
          <span>{profile.currentRole}</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-ink-subtle">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span>{profile.location}</span>
        </div>
      </div>

      {/* Stats strip */}
      {stats.length > 0 && (
        <div className="mt-5 flex w-full items-center justify-center gap-4 border-t border-white/[0.06] pt-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={statVariants}
              className="flex flex-col items-center"
            >
              <span className="font-mono text-lg font-bold text-emerald-400">
                {stat.value}
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-widest text-ink-disabled">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Decorative accent */}
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-emerald-500/[0.06] blur-3xl" />
    </BentoCard>
  );
}
