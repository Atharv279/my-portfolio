"use client";

import { motion } from "framer-motion";
import BentoCard from "./BentoCard";
import ExpandedSection from "./ExpandedSection";
import {
  Cpu,
  Zap,
  Box,
  Network,
  BrainCircuit,
  Container,
  Workflow,
  TrendingUp,
  Layers,
  Shield,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TechItem {
  name: string;
  icon: LucideIcon;
}

interface TechStackCardProps {
  id?: string;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
}

const trending: TechItem[] = [
  { name: "Python", icon: Cpu },
  { name: "FastAPI", icon: Zap },
  { name: "PyTorch", icon: BrainCircuit },
  { name: "Ollama", icon: Box },
  { name: "n8n", icon: Workflow },
  { name: "Node-RED", icon: Network },
  { name: "Docker", icon: Container },
];

const pillVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.6 + i * 0.06, duration: 0.3 },
  }),
};

interface ArsenalCategory {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accentBorder: string;
  items: string[];
}

const arsenal: ArsenalCategory[] = [
  {
    title: "AI / ML",
    subtitle: "Models, pipelines & inference",
    icon: BrainCircuit,
    accentBorder: "border-amber-500/25",
    items: [
      "RAG Pipelines",
      "Multi-Agent Systems",
      "GGUF Quantization",
      "Local LLM Optimization",
    ],
  },
  {
    title: "Networking",
    subtitle: "Enterprise telemetry & security",
    icon: Shield,
    accentBorder: "border-cyan-500/25",
    items: [
      "SNMP",
      "SSH Collectors",
      "Cisco Catalyst / Meraki",
      "Fortinet Firewalls",
    ],
  },
  {
    title: "Backend / Ops",
    subtitle: "Infrastructure & tooling",
    icon: Terminal,
    accentBorder: "border-violet-500/25",
    items: [
      "Python",
      "Node.js",
      "SQLite (Time-series)",
      "Linux / Kali",
      "Git",
      "CI/CD",
    ],
  },
];

export default function TechStackCard({ id = "tech-stack", onExpand, isExpanded }: TechStackCardProps) {
  return (
    <BentoCard
      id={id}
      index={1}
      glowColor="rgba(250, 204, 21, 0.12)"
      className="flex flex-col md:col-span-1 md:row-span-1"
      onExpand={onExpand}
      isExpanded={isExpanded}
    >
      <div className="flex items-center gap-2">
        <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-amber-400">
          Trending
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
        {trending.map((tech, i) => (
          <motion.div
            key={tech.name}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={pillVariants}
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-zinc-300 md:text-xs"
          >
            <tech.icon className="h-3 w-3 shrink-0 text-zinc-500" />
            <span>{tech.name}</span>
          </motion.div>
        ))}
      </div>

      {/* === EXPANDED CONTENT === */}
      {isExpanded && (
        <ExpandedSection
          icon={Layers}
          title="Full Arsenal"
          accentColor="text-amber-400"
        >
          <div className="flex flex-col gap-4">
            {arsenal.map((category) => (
              <div key={category.title}>
                <div className="mb-2 flex items-center gap-2">
                  <category.icon className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="text-xs font-medium text-zinc-200">
                    {category.title}
                  </span>
                  <span className="text-[11px] text-zinc-600">
                    &mdash; {category.subtitle}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className={`rounded-md border ${category.accentBorder} bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-400 md:text-xs`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                {category.title === "Networking" && (
                  <p className="mt-1.5 text-[11px] text-zinc-600">
                    Cisco Black Belt Certified
                  </p>
                )}
              </div>
            ))}
          </div>
        </ExpandedSection>
      )}
    </BentoCard>
  );
}
