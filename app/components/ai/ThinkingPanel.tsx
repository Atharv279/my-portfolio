"use client";

import { motion } from "framer-motion";

const STEPS = [
  "Analyzing query",
  "Searching portfolio data",
  "Selecting visualization",
  "Generating response",
];

const NODES = [
  { x: 30, label: "Q" },
  { x: 100, label: "S" },
  { x: 170, label: "V" },
  { x: 240, label: "R" },
];

const NODE_Y = 30;
const NODE_R = 12;

interface ThinkingPanelProps {
  stage: number;
}

export function ThinkingPanel({ stage }: ThinkingPanelProps) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-3">
      <svg
        viewBox="0 0 270 60"
        className="mb-2 w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection paths */}
        {NODES.slice(0, -1).map((node, i) => {
          const next = NODES[i + 1];
          const isActive = stage > i;
          return (
            <g key={`path-${i}`}>
              {/* Background track */}
              <line
                x1={node.x + NODE_R}
                y1={NODE_Y}
                x2={next.x - NODE_R}
                y2={NODE_Y}
                stroke="#27272a"
                strokeWidth="2"
              />
              {/* Animated fill */}
              {isActive && (
                <motion.line
                  x1={node.x + NODE_R}
                  y1={NODE_Y}
                  x2={next.x - NODE_R}
                  y2={NODE_Y}
                  stroke="#34d399"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const isActive = stage >= i;
          const isCurrent = stage === i;
          return (
            <g key={`node-${i}`}>
              {/* Glow ring for current */}
              {isCurrent && (
                <motion.circle
                  cx={node.x}
                  cy={NODE_Y}
                  r={NODE_R + 4}
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              <circle
                cx={node.x}
                cy={NODE_Y}
                r={NODE_R}
                fill={isActive ? "#064e3b" : "#18181b"}
                stroke={isActive ? "#34d399" : "#3f3f46"}
                strokeWidth="1.5"
              />
              <text
                x={node.x}
                y={NODE_Y + 4}
                textAnchor="middle"
                fill={isActive ? "#6ee7b7" : "#52525b"}
                fontSize="10"
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Step labels */}
      <div className="flex items-center gap-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-emerald-500"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-[11px] text-emerald-400/80">
          {STEPS[Math.min(stage, STEPS.length - 1)]}...
        </span>
      </div>
    </div>
  );
}
