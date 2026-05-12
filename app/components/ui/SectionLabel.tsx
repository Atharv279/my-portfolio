"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function SectionLabel({
  children,
  accentColor = "bg-violet-500/70",
}: {
  children: ReactNode;
  accentColor?: string;
}) {
  return (
    <motion.div
      className="col-span-full flex items-center gap-3 pt-6 pb-1.5 md:pt-10 md:pb-2"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2">
        <motion.span
          className={`inline-block h-1.5 w-1.5 rounded-full ${accentColor}`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
        />
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">
          {children}
        </h2>
      </div>
      <motion.div
        className="h-px flex-1 bg-white/[0.10]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}
