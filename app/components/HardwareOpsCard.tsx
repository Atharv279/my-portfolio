"use client";

import BentoCard from "./BentoCard";
import ExpandedSection, { DetailItem } from "./ExpandedSection";
import { Server, Gpu, Award, Zap, Settings, ShieldCheck } from "lucide-react";

interface HardwareOpsCardProps {
  id?: string;
  onExpand?: (id: string) => void;
  isExpanded?: boolean;
}

const capabilities = [
  { label: "RTX 4060 Local Inference", icon: Gpu },
  { label: "Zero Cloud API Costs", icon: Zap },
  { label: "Enterprise Deployments", icon: Server },
];

export default function HardwareOpsCard({ id = "hardware-ops", onExpand, isExpanded }: HardwareOpsCardProps) {
  return (
    <BentoCard
      id={id}
      index={5}
      glowColor="rgba(244, 63, 94, 0.15)"
      className="flex flex-col justify-between md:col-span-1 md:row-span-1"
      onExpand={onExpand}
      isExpanded={isExpanded}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Server className="h-4 w-4 text-rose-400" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-rose-400">
          Hardware &amp; Infrastructure
        </span>
      </div>

      {/* Capability list */}
      <div className="mt-4 flex flex-col gap-2 md:mt-5">
        {capabilities.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-zinc-300 md:text-xs"
          >
            <item.icon className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
            {item.label}
          </div>
        ))}
      </div>

      {/* Certification badge */}
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/[0.07] px-2.5 py-2 md:mt-5">
        <Award className="h-4 w-4 shrink-0 text-rose-400" />
        <span className="text-[11px] font-medium text-rose-300 md:text-xs">
          Cisco Black Belt Certified
        </span>
      </div>

      {/* === EXPANDED CONTENT === */}
      {isExpanded && (
        <>
          <ExpandedSection
            icon={Settings}
            title="RTX 4060 Optimizations"
            accentColor="text-rose-400"
          >
            <dl className="space-y-0">
              <DetailItem
                label="VRAM Management"
                text="All models quantized to GGUF Q4_K_M format, reducing the memory footprint to under 6 GB on the 8 GB RTX 4060. This leaves headroom for concurrent inference tasks and prevents OOM crashes during batch processing."
              />
              <DetailItem
                label="Batch Scheduling"
                text="Custom Python orchestration layer queues inference requests and processes them sequentially, preventing GPU context-switching overhead. Priority queuing ensures time-sensitive tasks (like anomaly detection) preempt batch content generation."
              />
              <DetailItem
                label="Ollama Configuration"
                text="Ollama runtime configured with num_gpu=1, num_thread=8, and context window tuned to 4096 tokens for the optimal throughput-to-quality ratio. GPU layer offloading set to maximum for fully GPU-accelerated inference."
              />
              <DetailItem
                label="Cost Impact"
                text="This local-first architecture eliminates cloud API spend entirely. At equivalent throughput, the setup replaces approximately $200-400/month in OpenAI API costs with a one-time hardware investment."
              />
            </dl>
          </ExpandedSection>

          <ExpandedSection
            icon={ShieldCheck}
            title="Cisco Black Belt Certification"
            accentColor="text-rose-400"
          >
            <dl className="space-y-0">
              <DetailItem
                label="Certification Scope"
                text="Cisco Black Belt certifications validate deep expertise in enterprise networking architecture, covering advanced switch configuration, VLAN segmentation, access control lists, and high-availability deployments across Catalyst and Nexus platforms."
              />
              <DetailItem
                label="Deployment Experience"
                text="Hands-on deployment of Cisco switching infrastructure in enterprise environments, including spanning-tree optimization, port-channel aggregation, and integration with Fortinet FortiGate firewalls for unified threat management."
              />
              <DetailItem
                label="Applied to Projects"
                text="This certification directly informed the Network Intelligence Dashboard design. Understanding the hardware at the protocol level (SNMP MIB structures, SSH command trees) enabled the building of purpose-built collectors that poll without overloading production switches."
              />
            </dl>
          </ExpandedSection>
        </>
      )}

      {/* Decorative accent */}
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-rose-500/[0.06] blur-3xl" />
    </BentoCard>
  );
}
