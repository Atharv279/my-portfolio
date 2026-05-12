"use client";

import { useState, useEffect } from "react";
import type { Project } from "@/lib/types";
import { SVG_COLORS } from "@/lib/svg-utils";

interface PipelineNode {
  step: string;
  title: string;
}

function extractNodes(project: Project): PipelineNode[] {
  for (const section of project.expandedSections) {
    if (section.pipelineSteps?.length) {
      return section.pipelineSteps.map((s) => ({
        step: s.step,
        title: s.title,
      }));
    }
  }
  for (const section of project.expandedSections) {
    if (section.detailItems?.length) {
      return section.detailItems.map((d, i) => ({
        step: String(i + 1).padStart(2, "0"),
        title: d.label,
      }));
    }
  }
  return [];
}

/** Truncate label to fit inside SVG node. */
function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max - 1) + "\u2026" : text;
}

const NODE_W = 200;
const NODE_H = 36;
const GAP_Y = 40;
const PAD_X = 24;
const PAD_Y = 16;
const ACTIVATION_DELAY = 400;

export function PipelineVisualizer({ project }: { project: Project }) {
  const nodes = extractNodes(project);
  const [activeStep, setActiveStep] = useState(-1);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  // Sequential node activation
  useEffect(() => {
    if (nodes.length === 0) return;
    let step = -1;
    const timer = setInterval(() => {
      step++;
      if (step >= nodes.length) {
        clearInterval(timer);
        return;
      }
      setActiveStep(step);
    }, ACTIVATION_DELAY);
    return () => clearInterval(timer);
  }, [nodes.length]);

  if (nodes.length === 0) return null;

  const totalW = NODE_W + PAD_X * 2;
  const totalH = nodes.length * NODE_H + (nodes.length - 1) * GAP_Y + PAD_Y * 2;

  return (
    <div className="my-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
      <p className="mb-3 text-xs font-medium tracking-wide text-ink-muted uppercase">
        {project.title} — Pipeline
      </p>
      <svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id="pipe-arrow"
            viewBox="0 0 10 8"
            refX="10"
            refY="4"
            markerWidth="10"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <polygon
              points="0 0, 10 4, 0 8"
              fill={SVG_COLORS.textSecondary}
            />
          </marker>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Animated particle gradient */}
          <radialGradient id="particle-grad">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </radialGradient>
        </defs>

        {nodes.map((node, i) => {
          const x = PAD_X;
          const y = PAD_Y + i * (NODE_H + GAP_Y);
          const cx = x + NODE_W / 2;
          const cy = y + NODE_H / 2;
          const isActive = i <= activeStep;
          const isSelected = selectedNode === i;

          return (
            <g key={i}>
              {/* Down-arrow connector from previous node */}
              {i > 0 && (
                <>
                  <line
                    x1={cx}
                    y1={y - GAP_Y}
                    x2={cx}
                    y2={y}
                    stroke={SVG_COLORS.textSecondary}
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    markerEnd="url(#pipe-arrow)"
                  />
                  {/* Animated particle along edge */}
                  {isActive && (
                    <circle r="2.5" fill="url(#particle-grad)">
                      <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        path={`M${cx},${y - GAP_Y} L${cx},${y}`}
                      />
                    </circle>
                  )}
                </>
              )}

              {/* Node rect */}
              <rect
                x={x}
                y={y}
                width={NODE_W}
                height={NODE_H}
                rx={8}
                fill={isActive ? "#ffffff14" : SVG_COLORS.fill}
                stroke={isActive ? "#34d39966" : SVG_COLORS.stroke}
                strokeWidth={isActive ? 1.5 : 1}
                filter={isActive ? "url(#node-glow)" : undefined}
                cursor="pointer"
                onClick={() => setSelectedNode(isSelected ? null : i)}
              />

              {/* Step badge */}
              <text
                x={x + 14}
                y={cy + 4}
                textAnchor="middle"
                fill={isActive ? "#34d399" : SVG_COLORS.textMuted}
                fontSize="10"
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
                pointerEvents="none"
              >
                {node.step}
              </text>

              {/* Label */}
              <text
                x={x + 30}
                y={cy + 4}
                textAnchor="start"
                fill={isActive ? "#e4e4e7" : SVG_COLORS.textPrimary}
                fontSize="12"
                fontFamily="system-ui, sans-serif"
                pointerEvents="none"
              >
                {truncate(node.title, 22)}
              </text>

              {/* Tooltip on click */}
              {isSelected && (
                <foreignObject
                  x={x}
                  y={y + NODE_H + 4}
                  width={NODE_W}
                  height={40}
                >
                  <div className="rounded-md border border-white/[0.1] bg-zinc-900/95 px-2.5 py-1.5 text-[11px] leading-relaxed text-ink-secondary shadow-lg">
                    {node.title}
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
