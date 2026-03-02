"use client";

import BentoCard from "./BentoCard";
import ExpandedSection, { DetailItem, PipelineStep } from "./ExpandedSection";
import { ExternalLink, Activity, Network, Database, Shield, Layers } from "lucide-react";

interface ProjectNetworkCardProps {
  id?: string;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
}

const tags = [
  { label: "SNMP/SSH", icon: Shield },
  { label: "Python", icon: Activity },
  { label: "Cisco", icon: Network },
  { label: "SQLite", icon: Database },
];

export default function ProjectNetworkCard({ id = "project-network", onExpand, isExpanded }: ProjectNetworkCardProps) {
  return (
    <BentoCard
      id={id}
      index={4}
      glowColor="rgba(6, 182, 212, 0.15)"
      className="flex flex-col justify-between md:col-span-2 md:row-span-1"
      onExpand={onExpand}
      isExpanded={isExpanded}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="font-mono text-[11px] uppercase tracking-widest text-cyan-400">
            Enterprise Networking
          </span>
          <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-zinc-50 md:mt-2 md:text-xl">
            Network Intelligence Dashboard
          </h2>
        </div>
        <span className="hidden shrink-0 rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-300 sm:inline-flex">
          Real-Time Telemetry
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-[13px] leading-relaxed text-zinc-400 md:mt-4 md:max-w-lg md:text-sm">
        Enterprise-grade monitoring platform polling Cisco switches and Fortinet
        firewalls via custom SNMP/SSH collectors. Aggregates high-frequency
        time-series data into a unified dashboard, architected to feed local LLMs
        for autonomous anomaly detection.
      </p>

      {/* Tags + CTA row */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between md:mt-5">
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {tags.map((tag) => (
            <div
              key={tag.label}
              className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-1 text-[11px] text-zinc-400 md:px-2.5 md:text-xs"
            >
              <tag.icon className="h-3 w-3 text-zinc-500" />
              {tag.label}
            </div>
          ))}
        </div>

        <a
          href="https://github.com/Atharv279"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="group inline-flex w-fit items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 font-mono text-xs text-zinc-300 transition-all active:bg-cyan-500/10 md:hover:border-cyan-500/40 md:hover:bg-cyan-500/10 md:hover:text-cyan-300 md:hover:shadow-[0_0_20px_-6px_rgba(6,182,212,0.3)]"
        >
          View Source
          <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* === EXPANDED CONTENT === */}
      {isExpanded && (
        <>
          <ExpandedSection
            icon={Layers}
            title="Architecture"
            accentColor="text-cyan-400"
          >
            <dl className="space-y-0">
              <DetailItem
                label="Collector Layer"
                text="Modular collectors/ directory with dedicated SNMP and SSH adapter modules. Each collector implements a standardized polling interface, querying Cisco IOS-XE switches and Fortinet FortiGate firewalls on configurable intervals. Rate-limiting logic prevents device overload during high-frequency polling cycles."
              />
              <DetailItem
                label="Data Ingestion Pipeline"
                text="Raw telemetry flows into a Python backend (app.py) that normalizes SNMP MIB responses and SSH command outputs into structured ORM models (models.py). A custom SQLite schema optimized for time-series ingestion handles high-write throughput, storing interface counters, CPU/memory utilization, and security event logs."
              />
              <DetailItem
                label="Aggregation & Visualization"
                text="The backend exposes REST endpoints consumed by a JavaScript frontend. Real-time charts render throughput, latency, and error-rate metrics. Threshold-based alerting flags anomalies before they cascade into outages."
              />
              <DetailItem
                label="AIOps Integration Path"
                text="The ORM-structured telemetry data is designed to pipe directly into local LLMs served via Ollama on consumer RTX GPUs. This enables autonomous anomaly detection without sending sensitive network data to external cloud APIs."
              />
            </dl>
          </ExpandedSection>

          <ExpandedSection
            icon={Network}
            title="Data Flow"
            accentColor="text-cyan-400"
          >
            <div className="flex flex-col gap-0">
              <PipelineStep
                step="01"
                title="Poll"
                description="SNMP GET/WALK and SSH exec commands issued to Cisco and Fortinet hardware on 30-second intervals."
                accentColor="border-cyan-500/40"
              />
              <PipelineStep
                step="02"
                title="Normalize"
                description="Raw MIB OIDs and CLI output parsed into typed Python dataclasses via the ORM layer."
                accentColor="border-cyan-500/30"
              />
              <PipelineStep
                step="03"
                title="Store"
                description="Time-series records written to SQLite with indexed timestamps for sub-millisecond range queries."
                accentColor="border-cyan-500/20"
              />
              <PipelineStep
                step="04"
                title="Visualize & Alert"
                description="Frontend renders live dashboards. Threshold breaches trigger alerts; data exports feed the local anomaly detection pipeline."
                accentColor="border-cyan-500/10"
              />
            </div>
          </ExpandedSection>
        </>
      )}

      {/* Decorative accent */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-cyan-500/[0.06] blur-3xl" />
    </BentoCard>
  );
}
