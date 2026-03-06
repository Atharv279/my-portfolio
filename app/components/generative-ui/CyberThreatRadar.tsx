"use client";

import { motion } from "framer-motion";
import { radarPresets } from "@/lib/fallback-data";
import { polarToCartesian, SVG_COLORS } from "@/lib/svg-utils";

const CX = 140;
const CY = 140;
const R = 100;
const RINGS = [0.33, 0.66, 1];

function hexPoints(cx: number, cy: number, radius: number): string {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const { x, y } = polarToCartesian(cx, cy, radius, i * 60);
      return `${x},${y}`;
    })
    .join(" ");
}

function textAnchorFor(angleDeg: number): "start" | "middle" | "end" {
  const a = ((angleDeg % 360) + 360) % 360;
  if (a < 30 || a > 330) return "middle";
  if (a < 180) return "start";
  return "end";
}

export function CyberThreatRadar({
  preset,
}: {
  preset: "network-security" | "full-stack";
}) {
  const data = radarPresets[preset];
  if (!data) return null;

  const { axes, accentColor } = data;
  const fillColor = accentColor.replace("%OPACITY%", "0.12");
  const strokeColor = accentColor.replace("%OPACITY%", "0.50");
  const dotColor = accentColor.replace("%OPACITY%", "0.80");

  // Data polygon path
  const dataPoints = axes.map((a, i) => {
    const angle = i * 60;
    return polarToCartesian(CX, CY, R * a.value, angle);
  });
  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div className="my-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
      <p className="mb-2 text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
        {preset === "network-security" ? "Network Security Radar" : "Full-Stack Coverage"}
      </p>
      <svg
        viewBox="0 0 280 280"
        className="mx-auto w-full max-w-[280px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric hex rings */}
        {RINGS.map((scale) => (
          <polygon
            key={scale}
            points={hexPoints(CX, CY, R * scale)}
            fill="none"
            stroke={SVG_COLORS.stroke}
            strokeWidth="0.75"
          />
        ))}

        {/* Axis lines */}
        {axes.map((_, i) => {
          const outer = polarToCartesian(CX, CY, R, i * 60);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={outer.x}
              y2={outer.y}
              stroke="#ffffff08"
              strokeWidth="0.75"
            />
          );
        })}

        {/* Data polygon */}
        <motion.path
          d={dataPath}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Data dots */}
        {dataPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={3}
            fill={dotColor}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.5 + i * 0.08 }}
          />
        ))}

        {/* Labels */}
        {axes.map((a, i) => {
          const angle = i * 60;
          const labelR = R + 14;
          const { x, y } = polarToCartesian(CX, CY, labelR, angle);
          return (
            <text
              key={i}
              x={x}
              y={y + 3}
              textAnchor={textAnchorFor(angle)}
              fill={SVG_COLORS.textSecondary}
              fontSize="7.5"
              fontFamily="system-ui, sans-serif"
            >
              {a.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
