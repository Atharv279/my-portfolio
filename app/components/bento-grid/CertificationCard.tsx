"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { portfolioCertifications } from "@/lib/portfolio-data";

export default function CertificationCard({ id }: { id: string }) {
  return (
    <div
      id={id}
      className="col-span-full rounded-2xl border border-white/[0.12] bg-white/[0.05] p-5 md:p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="h-0.5 w-6 rounded-full bg-gradient-to-r from-amber-400/80 to-amber-400/0" />
        <Award className="h-4 w-4 text-amber-400" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-amber-400">
          Certifications
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioCertifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 transition-all duration-200 md:hover:border-white/[0.14] md:hover:bg-white/[0.05]"
          >
            <p className="text-[13px] font-medium text-ink-secondary">
              {cert.title}
            </p>
            {cert.issuer && (
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-400/70">
                {cert.issuer}
              </p>
            )}
            <p className="mt-1.5 text-[11px] leading-relaxed text-ink-muted">
              {cert.relevance}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
