"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";

const degrees = [
  {
    title: "B.E. in Computer Science",
    institution: "Nagpur Institute of Technology",
    period: "2021 \u2013 2024",
    cgpa: "7.98",
    icon: GraduationCap,
  },
  {
    title: "Diploma in Computer Science",
    institution: "Cusrow Wadia Institute of Technology",
    period: "2018 \u2013 2021",
    cgpa: "8.7",
    icon: BookOpen,
  },
];

export default function EducationCard({ id }: { id: string }) {
  return (
    <div
      id={id}
      className="col-span-full rounded-2xl border border-white/[0.12] bg-white/[0.05] p-5 md:p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="h-0.5 w-6 rounded-full bg-gradient-to-r from-sky-400/80 to-sky-400/0" />
        <GraduationCap className="h-4 w-4 text-sky-400" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-sky-400">
          Education
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {degrees.map((deg, i) => {
          const Icon = deg.icon;
          return (
            <motion.div
              key={deg.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 transition-all duration-200 md:hover:border-white/[0.14] md:hover:bg-white/[0.05]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sky-400/20 bg-sky-400/10">
                  <Icon className="h-4 w-4 text-sky-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-zinc-200">
                    {deg.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-zinc-400">
                    {deg.institution}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-sky-400/70">
                      {deg.period}
                    </span>
                    <span className="text-[10px] font-semibold text-zinc-300">
                      CGPA: {deg.cgpa}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
