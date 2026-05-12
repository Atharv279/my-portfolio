"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ExpandedSectionProps {
  icon: LucideIcon;
  title: string;
  accentColor?: string;
  children: ReactNode;
}

export default function ExpandedSection({
  icon: Icon,
  title,
  accentColor = "text-ink-muted",
  children,
}: ExpandedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="mt-6 border-t border-white/[0.06] pt-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`h-4 w-4 ${accentColor}`} />
        <h3 className="font-mono text-xs uppercase tracking-widest text-ink-secondary">
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}

export function DetailItem({ label, text }: { label: string; text: string }) {
  return (
    <div className="mb-3 last:mb-0">
      <dt className="text-xs font-medium text-ink-secondary">{label}</dt>
      <dd className="mt-1 text-[13px] leading-relaxed text-ink-subtle">
        {text}
      </dd>
    </div>
  );
}

export function PipelineStep({
  step,
  title,
  description,
  accentColor = "border-zinc-700",
}: {
  step: string;
  title: string;
  description: string;
  accentColor?: string;
}) {
  return (
    <div className={`relative border-l-2 ${accentColor} py-2 pl-4`}>
      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
        {step}
      </span>
      <p className="mt-0.5 text-sm font-medium text-ink-secondary">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-ink-subtle">
        {description}
      </p>
    </div>
  );
}
