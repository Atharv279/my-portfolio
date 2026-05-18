"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DynamicIcon } from "@/lib/icon-map";
import type { Project } from "@/lib/types";
import { CanvasRevealEffect } from "../aceternity/canvas-reveal-effect";

interface MiniProjectCardProps {
  project: Project;
}

export function MiniProjectCard({ project }: MiniProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative my-2 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 transition-colors md:hover:border-emerald-500/30"
    >
      {/* WebGL Shader Background */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 h-full w-full"
          >
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent"
              colors={[
                [16, 185, 129], // emerald-500
                [5, 150, 105],  // emerald-600
              ]}
              opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 0.6]}
              dotSize={2}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col h-full">
        <motion.div 
          animate={hovered ? { y: -2 } : { y: 0 }}
          className="mb-1.5 flex items-center gap-2"
        >
          <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-subtle">
            {project.category}
          </span>
          {project.badge && (
            <span className="text-[10px] text-ink-disabled">{project.badge}</span>
          )}
        </motion.div>

        <motion.h4 
          animate={hovered ? { y: -4 } : { y: 0 }}
          className="mb-1 text-sm font-medium text-ink-secondary transition-colors group-hover:text-ink"
        >
          {project.title}
        </motion.h4>

        <motion.p 
          animate={hovered ? { y: -2 } : { y: 0 }}
          className="mb-2 line-clamp-2 text-xs leading-relaxed text-ink-subtle"
        >
          {project.description}
        </motion.p>

        <motion.div 
          animate={hovered ? { y: -2 } : { y: 0 }}
          className="mt-auto flex flex-wrap gap-1.5"
        >
          {project.tags.map((tag) => (
              <span
                key={tag.label}
                className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-ink-subtle"
              >
                <DynamicIcon name={tag.icon} className="h-2.5 w-2.5" />
                {tag.label}
              </span>
            ))}
        </motion.div>
      </div>
    </div>
  );
}
