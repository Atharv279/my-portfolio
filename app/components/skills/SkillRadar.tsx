"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { polarToCartesian } from "@/lib/svg-utils";
import { portfolioDomains, portfolioSkills } from "@/lib/portfolio-data";
import { Radar } from "lucide-react";

const CX = 250;
const CY = 250;
const MAX_R = 175;
const RINGS = [0.33, 0.66, 1.0];
const AXES = portfolioDomains.length;
const ANGLE_STEP = 360 / AXES;

function getDomainAvgProficiency(domain: (typeof portfolioDomains)[number]): number {
  const skills = domain.keySkills
    .map((name) => portfolioSkills.find((s) => s.name === name))
    .filter(Boolean);
  if (skills.length === 0) return 0;
  return skills.reduce((sum, s) => sum + (s?.proficiency ?? 0), 0) / skills.length;
}

export default function SkillRadar() {
  const [hoveredDomain, setHoveredDomain] = useState<number | null>(null);

  const domainValues = useMemo(
    () => portfolioDomains.map(getDomainAvgProficiency),
    []
  );

  // Build polygon points
  const polygonPoints = useMemo(() => {
    return domainValues
      .map((val, i) => {
        const { x, y } = polarToCartesian(CX, CY, MAX_R * val, i * ANGLE_STEP);
        return `${x},${y}`;
      })
      .join(" ");
  }, [domainValues]);

  // Ring polygons
  const ringPaths = useMemo(() => {
    return RINGS.map((scale) => {
      const points = Array.from({ length: AXES }, (_, i) => {
        const { x, y } = polarToCartesian(CX, CY, MAX_R * scale, i * ANGLE_STEP);
        return `${x},${y}`;
      }).join(" ");
      return points;
    });
  }, []);

  // Axis endpoints
  const axisEndpoints = useMemo(() => {
    return Array.from({ length: AXES }, (_, i) =>
      polarToCartesian(CX, CY, MAX_R, i * ANGLE_STEP)
    );
  }, []);

  // Label positions (slightly beyond max radius)
  const labelPositions = useMemo(() => {
    return Array.from({ length: AXES }, (_, i) =>
      polarToCartesian(CX, CY, MAX_R + 30, i * ANGLE_STEP)
    );
  }, []);

  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <Radar className="h-4 w-4 text-violet-400" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-violet-400">
          Skill Radar
        </span>
      </div>

      <div className="relative mx-auto max-w-lg">
        <svg
          viewBox="0 0 500 500"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Concentric ring polygons */}
          {ringPaths.map((points, i) => (
            <polygon
              key={`ring-${i}`}
              points={points}
              fill="none"
              stroke="#ffffff0a"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines */}
          {axisEndpoints.map((ep, i) => (
            <line
              key={`axis-${i}`}
              x1={CX}
              y1={CY}
              x2={ep.x}
              y2={ep.y}
              stroke="#ffffff0a"
              strokeWidth="1"
            />
          ))}

          {/* Data polygon */}
          <motion.polygon
            points={polygonPoints}
            fill="rgba(139, 92, 246, 0.15)"
            stroke="rgba(139, 92, 246, 0.5)"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />

          {/* Data points */}
          {domainValues.map((val, i) => {
            const { x, y } = polarToCartesian(CX, CY, MAX_R * val, i * ANGLE_STEP);
            return (
              <motion.circle
                key={`point-${i}`}
                cx={x}
                cy={y}
                r={4}
                fill={hoveredDomain === i ? "#a78bfa" : "#8b5cf6"}
                stroke="#1e1b4b"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              />
            );
          })}

          {/* Domain labels */}
          {labelPositions.map((pos, i) => (
            <text
              key={`label-${i}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={hoveredDomain === i ? "#d4d4d8" : "#71717a"}
              fontSize="10"
              fontFamily="system-ui, sans-serif"
              fontWeight="500"
              cursor="pointer"
              onMouseEnter={() => setHoveredDomain(i)}
              onMouseLeave={() => setHoveredDomain(null)}
            >
              {portfolioDomains[i].name.length > 18
                ? portfolioDomains[i].name.slice(0, 17) + "…"
                : portfolioDomains[i].name}
            </text>
          ))}

          {/* Proficiency % at each data point */}
          {domainValues.map((val, i) => {
            const { x, y } = polarToCartesian(CX, CY, MAX_R * val - 16, i * ANGLE_STEP);
            return (
              <text
                key={`pct-${i}`}
                x={x}
                y={y}
                textAnchor="middle"
                fill="#a78bfa"
                fontSize="9"
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
              >
                {Math.round(val * 100)}%
              </text>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        {hoveredDomain !== null && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-1/2 w-64 -translate-x-1/2 rounded-xl border border-white/[0.08] bg-zinc-900/95 p-3 shadow-xl backdrop-blur-sm"
          >
            <span className="text-xs font-medium text-ink-secondary">
              {portfolioDomains[hoveredDomain].name}
            </span>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">
              {portfolioDomains[hoveredDomain].description}
            </p>
            <div className="mt-2 flex flex-col gap-1">
              {portfolioDomains[hoveredDomain].keySkills.slice(0, 5).map((skillName) => {
                const skill = portfolioSkills.find((s) => s.name === skillName);
                const pct = skill ? Math.round(skill.proficiency * 100) : 0;
                return (
                  <div key={skillName} className="flex items-center gap-2">
                    <span className="w-28 truncate text-[10px] text-ink-muted">
                      {skillName}
                    </span>
                    <div className="h-1 flex-1 rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-violet-500/60"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-7 text-right text-[9px] text-ink-subtle">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
