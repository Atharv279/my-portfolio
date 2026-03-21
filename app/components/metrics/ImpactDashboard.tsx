"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Target, DollarSign } from "lucide-react";

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

function useCountUp(target: number, isVisible: boolean, duration = 1500): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isVisible) return;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, isVisible, duration]);

  return count;
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const count = useCountUp(metric.value, isVisible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all duration-200 md:hover:border-white/[0.14] md:hover:bg-white/[0.05]"
    >
      <div className={`mb-3 ${metric.color}`}>{metric.icon}</div>
      <div className="mb-1 flex items-baseline gap-1">
        <span className={`text-3xl font-bold tabular-nums ${metric.color}`}>
          {isVisible ? (metric.suffix === "%" ? "+" : "") : ""}
          {count}
        </span>
        <span className={`text-lg font-medium ${metric.color}`}>
          {metric.suffix}
        </span>
      </div>
      <p className="text-[13px] font-medium text-zinc-300">{metric.label}</p>
      <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
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
