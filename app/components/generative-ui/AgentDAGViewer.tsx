"use client";

import { SVG_COLORS } from "@/lib/svg-utils";

interface DagNode {
  id: string;
  label: string;
  col: number;
  row: number;
}

interface DagEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
  feedback?: boolean; // arc via Bezier
}

interface DagVariant {
  title: string;
  accent: string;
  nodes: DagNode[];
  edges: DagEdge[];
}

const VARIANTS: Record<string, DagVariant> = {
  "marketing-engine": {
    title: "Marketing Engine — Agent DAG",
    accent: "#8b5cf6",
    nodes: [
      { id: "research", label: "Research", col: 0, row: 0 },
      { id: "evaluate", label: "Evaluate", col: 1, row: 0 },
      { id: "generate", label: "Generate", col: 2, row: 0 },
      { id: "refine", label: "Refine", col: 3, row: 0 },
      { id: "publish", label: "Publish", col: 4, row: 0 },
    ],
    edges: [
      { from: "research", to: "evaluate", label: "data" },
      { from: "evaluate", to: "generate", label: "pass" },
      { from: "generate", to: "refine" },
      { from: "refine", to: "publish", label: "pass" },
      { from: "refine", to: "generate", label: "retry", dashed: true, feedback: true },
    ],
  },
  "ragify-pipeline": {
    title: "RAGify — Pipeline DAG",
    accent: "#f59e0b",
    nodes: [
      { id: "ingest", label: "Ingest", col: 0, row: 0 },
      { id: "embed", label: "Embed", col: 1, row: 0 },
      { id: "retrieve", label: "Retrieve", col: 2, row: 0 },
      { id: "generate", label: "Generate", col: 3, row: 0 },
    ],
    edges: [
      { from: "ingest", to: "embed" },
      { from: "embed", to: "retrieve" },
      { from: "retrieve", to: "generate", label: "context" },
    ],
  },
};

const COL_W = 72;
const NODE_W = 58;
const NODE_H = 30;
const PAD_X = 20;
const PAD_Y = 36;

export function AgentDAGViewer({
  variant,
}: {
  variant: "marketing-engine" | "ragify-pipeline";
}) {
  const dag = VARIANTS[variant];
  if (!dag) return null;

  const maxCol = Math.max(...dag.nodes.map((n) => n.col));
  const viewW = (maxCol + 1) * COL_W + PAD_X * 2;
  const viewH = NODE_H + PAD_Y * 2;

  const nodeMap = new Map(dag.nodes.map((n) => [n.id, n]));

  function nodeX(col: number) {
    return PAD_X + col * COL_W;
  }
  function nodeCX(col: number) {
    return nodeX(col) + NODE_W / 2;
  }
  function nodeCY() {
    return PAD_Y + NODE_H / 2;
  }

  return (
    <div className="my-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
      <p className="mb-2 text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
        {dag.title}
      </p>
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id={`dag-arrow-${variant}`}
            viewBox="0 0 10 8"
            refX="10"
            refY="4"
            markerWidth="7"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <polygon points="0 0, 10 4, 0 8" fill={SVG_COLORS.textSecondary} />
          </marker>
        </defs>

        {/* Edges */}
        {dag.edges.map((edge, i) => {
          const fromNode = nodeMap.get(edge.from);
          const toNode = nodeMap.get(edge.to);
          if (!fromNode || !toNode) return null;

          const markerEnd = `url(#dag-arrow-${variant})`;
          const strokeStyle = edge.dashed ? "4 2" : undefined;
          const cy = nodeCY();

          if (edge.feedback) {
            // Arc above: Bezier from right side of 'from' to left side of 'to' (going backwards)
            const x1 = nodeCX(fromNode.col);
            const x2 = nodeCX(toNode.col);
            const midX = (x1 + x2) / 2;
            const arcY = PAD_Y - 18;
            return (
              <g key={i}>
                <path
                  d={`M ${x1} ${PAD_Y} Q ${midX} ${arcY} ${x2} ${PAD_Y}`}
                  fill="none"
                  stroke={SVG_COLORS.textSecondary}
                  strokeWidth="1"
                  strokeDasharray={strokeStyle}
                  markerEnd={markerEnd}
                />
                {edge.label && (
                  <text
                    x={midX}
                    y={arcY + 6}
                    textAnchor="middle"
                    fill={SVG_COLORS.textMuted}
                    fontSize="7"
                    fontFamily="system-ui, sans-serif"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          }

          // Straight edge
          const x1 = nodeX(fromNode.col) + NODE_W;
          const x2 = nodeX(toNode.col);
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={cy}
                x2={x2}
                y2={cy}
                stroke={SVG_COLORS.stroke}
                strokeWidth="1.5"
                strokeDasharray={strokeStyle}
                markerEnd={markerEnd}
              />
              {edge.label && (
                <text
                  x={(x1 + x2) / 2}
                  y={cy - 6}
                  textAnchor="middle"
                  fill={SVG_COLORS.textMuted}
                  fontSize="7"
                  fontFamily="system-ui, sans-serif"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {dag.nodes.map((node) => {
          const x = nodeX(node.col);
          const y = PAD_Y;

          return (
            <g key={node.id}>
              <rect
                x={x}
                y={y}
                width={NODE_W}
                height={NODE_H}
                rx={6}
                fill={SVG_COLORS.fill}
                stroke={dag.accent + "40"}
                strokeWidth="1"
              />
              <text
                x={x + NODE_W / 2}
                y={y + NODE_H / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fill={SVG_COLORS.textPrimary}
                fontSize="8"
                fontFamily="system-ui, sans-serif"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
