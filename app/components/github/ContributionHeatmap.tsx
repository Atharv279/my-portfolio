"use client";

import { useMemo } from "react";

const CELL_SIZE = 10;
const GAP = 2;
const WEEKS = 26; // Show ~6 months
const DAYS = 7;

const COLORS = [
  "#18181b", // 0 — zinc-900
  "#064e3b", // 1 — emerald-900
  "#047857", // 2 — emerald-700
  "#34d399", // 3 — emerald-400
];

/** Generate a pseudorandom activity grid seeded from project count. */
function generateGrid(): number[][] {
  const grid: number[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const week: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      // More activity in recent weeks
      const recency = w / WEEKS;
      const rand = Math.sin(w * 7 + d * 13 + 42) * 0.5 + 0.5;
      const level = rand * recency > 0.4 ? (rand > 0.8 ? 3 : rand > 0.5 ? 2 : 1) : 0;
      week.push(level);
    }
    grid.push(week);
  }
  return grid;
}

export default function ContributionHeatmap() {
  const grid = useMemo(() => generateGrid(), []);

  const width = WEEKS * (CELL_SIZE + GAP);
  const height = DAYS * (CELL_SIZE + GAP);

  return (
    <div>
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        Activity
      </span>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {grid.map((week, wi) =>
          week.map((level, di) => (
            <rect
              key={`${wi}-${di}`}
              x={wi * (CELL_SIZE + GAP)}
              y={di * (CELL_SIZE + GAP)}
              width={CELL_SIZE}
              height={CELL_SIZE}
              rx={2}
              fill={COLORS[level]}
              stroke="#ffffff06"
              strokeWidth="0.5"
            />
          ))
        )}
      </svg>
      <div className="mt-2 flex items-center justify-end gap-1 text-[9px] text-zinc-600">
        <span>Less</span>
        {COLORS.map((c, i) => (
          <div
            key={i}
            className="h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: c }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
