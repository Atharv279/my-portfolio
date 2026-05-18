"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Target, DollarSign } from "lucide-react";
import { NumberTicker } from "../magicui/number-ticker";

interface Metric {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
}

const METRICS: Metric[] = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    value: 42,
    suffix: "%",
    label: "Latency Reduced",
    description: "API response time optimization across RAG and agent pipelines",
    color: "text-emerald-400",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    value: 120,
    suffix: " hrs/mo",
    label: "Manual Work Automated",
    description: "Content research, publishing, and network monitoring tasks",
    color: "text-violet-400",
  },
  {
    icon: <Target className="h-5 w-5" />,
    value: 18,
    suffix: "%",
    label: "Model Accuracy Gain",
    description: "RAG retrieval precision via iterative prompt tuning",
    color: "text-amber-400",
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    value: 30,
    suffix: "%",
    label: "Infra Cost Reduction",
    description: "Local LLM inference on RTX 4060 vs cloud API costs",
    color: "text-cyan-400",
  },
];

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all duration-200 md:hover:border-white/[0.14] md:hover:bg-white/[0.05]"
    >
      <div className={`mb-3 ${metric.color}`}>{metric.icon}</div>
      <div className="mb-1 flex items-baseline gap-1">
        <span className={`text-3xl font-bold tabular-nums ${metric.color}`}>
          {metric.suffix === "%" ? "+" : ""}
          <NumberTicker value={metric.value} className={metric.color} delay={index * 0.1} />
        </span>
        <span className={`text-lg font-medium ${metric.color}`}>
          {metric.suffix}
        </span>
      </div>
      <p className="text-[13px] font-medium text-ink-secondary">{metric.label}</p>
      <p className="mt-1 text-[11px] leading-relaxed text-ink-subtle">
        {metric.description}
      </p>
    </motion.div>
  );
}

export default function ImpactDashboard() {
  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-emerald-400" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-400">
          Business Impact
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((metric, i) => (
          <MetricCard key={metric.label} metric={metric} index={i} />
        ))}
      </div>
    </div>
  );
}
