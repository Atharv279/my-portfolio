"use client";

import BentoCard from "./BentoCard";
import { useBento } from "./BentoGrid";
import { Globe } from "../magicui/globe";
import { AnimatedList } from "../magicui/animated-list";
import {
  Activity,
  AlertTriangle,
  Database,
  Gauge,
  Monitor,
  Network,
  Router,
  Server,
  Shield,
  ShieldCheck,
} from "lucide-react";

interface NioStarsDashboardCardProps {
  id?: string;
}

type StatusTone = "healthy" | "warning";

const STATUS_STYLES: Record<StatusTone, { dot: string; label: string; text: string }> = {
  healthy: { dot: "bg-emerald-500", label: "OK", text: "text-emerald-300" },
  warning: { dot: "bg-amber-500", label: "Investigating", text: "text-amber-300" },
};

const telemetryEvents = [
  {
    id: "e1",
    time: "JUST NOW",
    title: "Fortinet: Threat Blocked",
    description: "IP 192.168.1.14 suppressed via ACL",
    icon: Shield,
    color: "text-emerald-400",
  },
  {
    id: "e2",
    time: "2M AGO",
    title: "Cisco IOS: Config Updated",
    description: "Switch-04: VLAN 20 port mapping updated",
    icon: Network,
    color: "text-blue-400",
  },
  {
    id: "e3",
    time: "5M AGO",
    title: "Endpoint: Agent Sync",
    description: "124 nodes reporting healthy status",
    icon: Monitor,
    color: "text-sky-400",
  },
  {
    id: "e4",
    time: "8M AGO",
    title: "SNMP: Polling Complete",
    description: "Full telemetry sweep successful",
    icon: Activity,
    color: "text-emerald-400",
  },
];

const kpis = [
  { icon: Server, value: "247", label: "Devices monitored" },
  { icon: AlertTriangle, value: "8", label: "Alerts · 24h" },
  { icon: Gauge, value: "99.94%", label: "Uptime · 30d" },
];

const deviceClasses: Array<{
  icon: typeof Shield;
  iconColor: string;
  name: string;
  count: number;
  status: StatusTone;
}> = [
  { icon: Shield, iconColor: "text-blue-400", name: "Fortinet Firewalls", count: 14, status: "healthy" },
  { icon: Network, iconColor: "text-sky-400", name: "Switches", count: 86, status: "healthy" },
  { icon: Router, iconColor: "text-blue-400", name: "Routers", count: 23, status: "warning" },
  { icon: Monitor, iconColor: "text-sky-400", name: "Endpoints", count: 124, status: "healthy" },
];

const stackTags = ["FortiGate", "Cisco IOS", "SNMP v3", "Syslog", "Grafana"];

export default function NioStarsDashboardCard({
  id = "project-niostars-dashboard",
}: NioStarsDashboardCardProps) {
  const { expandedId } = useBento();
  const isExpanded = expandedId === id;

  return (
    <BentoCard
      id={id}
      index={0}
      // Static blue glow — sharp, steady, enterprise. No breathing pulse.
      glowColor="rgba(59, 130, 246, 0.18)"
      ariaLabel="Network Intelligence Dashboard — unified monitoring for Fortinet, switches, routers, and endpoints"
      className="flex flex-col justify-between sm:col-span-2 md:col-span-3 md:row-span-1 lg:col-span-4 !border-blue-500/30"
    >
      {/* Globe — decorative background layer; radial mask fades into bg-surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-60 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)]"
      >
        <Globe className="!relative !inset-auto !mx-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Header row */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-blue-400">
            <Shield className="h-3 w-3" aria-hidden="true" />
            Enterprise Monitoring
          </span>
          <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-ink md:mt-2 md:text-xl">
            Network Intelligence Dashboard
          </h2>
          <p className="mt-1 font-mono text-xs text-ink-muted md:text-sm">
            Nio Stars Technologies
          </p>
        </div>
        <div
          className="hidden shrink-0 items-center gap-1.5 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 sm:inline-flex"
          aria-label="All systems operational"
        >
          <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-300">
            All systems operational
          </span>
        </div>
      </div>

      {/* Description (verbatim per spec) */}
      <p className="relative z-10 mt-3 text-[13px] leading-relaxed text-ink-muted md:mt-4 md:max-w-3xl md:text-sm">
        A unified monitoring tool aggregating real-time data from Fortinet
        Firewalls, Switches, Routers, and Endpoints.
      </p>

      {/* KPI strip — high-density, tabular */}
      <dl className="relative z-10 mt-4 grid grid-cols-3 gap-2 md:mt-5 md:gap-3">
        {kpis.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="rounded-lg border border-hairline bg-surface px-3 py-2.5"
          >
            <div className="flex items-center gap-1.5 text-ink-subtle">
              <Icon className="h-3 w-3" aria-hidden="true" />
              <dt className="font-mono text-[10px] uppercase tracking-wider">
                {label}
              </dt>
            </div>
            <dd className="mt-1 font-mono text-lg font-semibold tabular-nums text-ink md:text-xl">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Live Telemetry Feed */}
      <div className="relative z-10 mt-4 overflow-hidden rounded-xl border border-hairline bg-black/20 p-2 md:mt-5">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-disabled">
            Live Telemetry Feed
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[9px] uppercase text-emerald-500/70">STREAMING</span>
          </span>
        </div>
        <AnimatedList delay={3000}>
          {telemetryEvents.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-lg border border-hairline bg-surface p-2.5"
            >
              <div className={`rounded-md bg-white/[0.03] p-1.5 ${item.color}`}>
                <item.icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[11px] font-medium text-ink-secondary">
                    {item.title}
                  </span>
                  <span className="shrink-0 font-mono text-[9px] text-ink-disabled">
                    {item.time}
                  </span>
                </div>
                <p className="truncate text-[10px] text-ink-subtle">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </AnimatedList>
      </div>

      {/* Device-class status grid — color + label per WCAG color-not-only */}
      <ul
        aria-label="Device class status"
        className="relative z-10 mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2 md:mt-5"
      >
        {deviceClasses.map(({ icon: Icon, iconColor, name, count, status }) => {
          const tone = STATUS_STYLES[status];
          return (
            <li
              key={name}
              className="flex items-center gap-2.5 rounded-lg border border-hairline bg-surface px-2.5 py-2"
            >
              <Icon className={`h-3.5 w-3.5 shrink-0 ${iconColor}`} aria-hidden="true" />
              <span className="flex-1 truncate text-xs text-ink-secondary">
                {name}
              </span>
              <span className="font-mono text-xs tabular-nums text-ink">
                {count}
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                <span className={`font-mono text-[10px] uppercase tracking-wider ${tone.text}`}>
                  {tone.label}
                </span>
              </span>
            </li>
          );
        })}
      </ul>

      {/* Stack tags */}
      <div className="relative z-10 mt-4 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
        {stackTags.map((label) => (
          <div
            key={label}
            className="flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-secondary md:px-2.5"
          >
            {label}
          </div>
        ))}
      </div>

      {/* === EXPANDED CONTENT === */}
      {isExpanded && (
        <div className="relative z-10 mt-5 border-t border-hairline pt-5">
          <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-secondary">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
            Architecture
          </h3>
          <ul className="space-y-2 text-[13px] leading-relaxed text-ink-muted">
            <li className="flex gap-2">
              <Activity aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" />
              <span>
                Collectors poll FortiGate, Cisco, and downstream switches over SNMP v3 and Syslog every 30 seconds; results are normalised into a single device-state schema.
              </span>
            </li>
            <li className="flex gap-2">
              <Activity aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" />
              <span>
                Endpoint telemetry is pushed via lightweight agents; mismatches between firewall logs and endpoint observations trigger correlation rules.
              </span>
            </li>
            <li className="flex gap-2">
              <Activity aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" />
              <span>
                Operator views are rendered in Grafana with drill-down to per-device sessions, ACL hits, and link saturation — built for NOC shifts, not dashboards-for-dashboards.
              </span>
            </li>
          </ul>
        </div>
      )}

      {/* Decorative blue accent */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-blue-500/[0.06] blur-3xl" />
    </BentoCard>
  );
}
