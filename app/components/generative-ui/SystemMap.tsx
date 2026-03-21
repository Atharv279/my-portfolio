"use client";

import { useCallback } from "react";

// ---------------------------------------------------------------------------
// Static data for the system map
// ---------------------------------------------------------------------------

interface SystemNode {
  id: string;
  label: string;
  subtitle: string;
  accent: string;     // glow color
  scrollTo: string;   // DOM id of the project card to scroll to
}

const PROJECTS: SystemNode[] = [
  {
    id: "marketing",
    label: "Marketing Engine",
    subtitle: "Multi-Agent AI",
    accent: "#8b5cf6",
    scrollTo: "project-marketing",
  },
  {
    id: "research-agent",
    label: "AI Research Agent",
    subtitle: "Daily CI/CD",
    accent: "#a855f7",
    scrollTo: "project-research-agent",
  },
  {
    id: "ragify",
    label: "RAGify Finance",
    subtitle: "RAG Benchmarking",
    accent: "#f59e0b",
    scrollTo: "project-ragify",
  },
  {
    id: "invoice",
    label: "Invoice Master",
    subtitle: "Document AI",
    accent: "#f59e0b",
    scrollTo: "project-invoice-master",
  },
  {
    id: "pneumonia",
    label: "Pneumonia X-Ray",
    subtitle: "Healthcare CNN",
    accent: "#10b981",
    scrollTo: "project-pneumonia",
  },
  {
    id: "network",
    label: "Network Dashboard",
    subtitle: "Enterprise Telemetry",
    accent: "#06b6d4",
    scrollTo: "project-network",
  },
  {
    id: "transcriber",
    label: "Meet Transcriber",
    subtitle: "Built in Rust",
    accent: "#fb923c",
    scrollTo: "project-meet-transcriber",
  },
];

// ---------------------------------------------------------------------------
// Layout constants — desktop radial SVG
// ---------------------------------------------------------------------------

const W = 800;
const H = 700;
const CX = W / 2;
const CY = H / 2;
const HUB_W = 150;
const HUB_H = 48;
const NODE_W = 145;
const NODE_H = 52;
const RADIUS = 260;

// 7 nodes evenly distributed around the hub, starting from top
const ANGLES = [-90, -38.6, 12.9, 64.3, 115.7, 167.1, 218.6];

function nodePos(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + RADIUS * Math.cos(rad) - NODE_W / 2,
    y: CY + RADIUS * Math.sin(rad) - NODE_H / 2,
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SystemMap() {
  const handleClick = useCallback((scrollTo: string) => {
    const el = document.getElementById(scrollTo);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      // Flash highlight on the target card
      el.style.transition = "box-shadow 0.3s ease";
      el.style.boxShadow = "0 0 30px -5px rgba(139, 92, 246, 0.4)";
      setTimeout(() => {
        el.style.boxShadow = "";
      }, 1200);
    }
  }, []);

  return (
    <div className="w-full">
      {/* Desktop: SVG radial map */}
      <div className="hidden md:block">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mx-auto w-full max-w-[800px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glow filters per accent color */}
            {PROJECTS.map((p) => (
              <filter key={p.id} id={`glow-${p.id}`} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feFlood floodColor={p.accent} floodOpacity="0.35" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          {/* Connection lines from hub to each node */}
          {PROJECTS.map((p, i) => {
            const pos = nodePos(ANGLES[i]);
            const nx = pos.x + NODE_W / 2;
            const ny = pos.y + NODE_H / 2;
            return (
              <line
                key={`line-${p.id}`}
                x1={CX}
                y1={CY}
                x2={nx}
                y2={ny}
                stroke={p.accent}
                strokeOpacity="0.25"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />
            );
          })}

          {/* Central hub node */}
          <g>
            <rect
              x={CX - HUB_W / 2}
              y={CY - HUB_H / 2}
              width={HUB_W}
              height={HUB_H}
              rx={12}
              fill="#ffffff10"
              stroke="#ffffff30"
              strokeWidth="1"
            />
            <text
              x={CX}
              y={CY - 4}
              textAnchor="middle"
              fill="#e4e4e7"
              fontSize="12"
              fontWeight="600"
              fontFamily="system-ui, sans-serif"
            >
              Atharv AI Systems
            </text>
            <text
              x={CX}
              y={CY + 12}
              textAnchor="middle"
              fill="#71717a"
              fontSize="9"
              fontFamily="system-ui, sans-serif"
            >
              Click a node to explore
            </text>
          </g>

          {/* Satellite project nodes */}
          {PROJECTS.map((p, i) => {
            const pos = nodePos(ANGLES[i]);
            return (
              <g
                key={p.id}
                className="system-map-node"
                style={{ "--node-accent": p.accent } as React.CSSProperties}
                onClick={() => handleClick(p.scrollTo)}
                cursor="pointer"
              >
                {/* Invisible hit area slightly larger */}
                <rect
                  x={pos.x - 4}
                  y={pos.y - 4}
                  width={NODE_W + 8}
                  height={NODE_H + 8}
                  fill="transparent"
                />
                {/* Visible node */}
                <rect
                  x={pos.x}
                  y={pos.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={10}
                  fill="#ffffff0d"
                  stroke={p.accent + "50"}
                  strokeWidth="1"
                  className="system-map-rect"
                />
                {/* Accent dot */}
                <circle
                  cx={pos.x + 14}
                  cy={pos.y + NODE_H / 2}
                  r={3.5}
                  fill={p.accent}
                  fillOpacity="0.85"
                />
                {/* Label */}
                <text
                  x={pos.x + 26}
                  y={pos.y + NODE_H / 2 - 5}
                  fill="#d4d4d8"
                  fontSize="11"
                  fontWeight="500"
                  fontFamily="system-ui, sans-serif"
                >
                  {p.label}
                </text>
                {/* Subtitle */}
                <text
                  x={pos.x + 26}
                  y={pos.y + NODE_H / 2 + 10}
                  fill="#71717a"
                  fontSize="9"
                  fontFamily="system-ui, sans-serif"
                >
                  {p.subtitle}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile: vertical stacked layout */}
      <div className="flex flex-col items-center gap-3 md:hidden">
        {/* Hub */}
        <div className="rounded-xl border border-white/[0.14] bg-white/[0.06] px-5 py-3 text-center">
          <p className="text-sm font-semibold text-zinc-200">Atharv AI Systems</p>
          <p className="mt-0.5 text-[10px] text-zinc-500">Tap a node to explore</p>
        </div>

        {/* Connector line */}
        <div className="h-6 w-px bg-white/[0.08]" />

        {/* Project nodes */}
        <div className="flex w-full flex-col gap-2">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleClick(p.scrollTo)}
              className="system-map-mobile-node flex items-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.05] px-4 py-3 text-left transition-all duration-200 active:scale-[0.98]"
              style={{ "--node-accent": p.accent } as React.CSSProperties}
            >
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: p.accent, opacity: 0.85 }}
              />
              <div>
                <p className="text-[13px] font-medium text-zinc-300">{p.label}</p>
                <p className="text-[10px] text-zinc-500">{p.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
