// =============================================================================
// Shared SVG helpers for Phase 5 interactive visualizers
// =============================================================================

/** Convert polar coordinates to Cartesian (for radar hexagons). */
export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
): { x: number; y: number } {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

/** Glassmorphic SVG color palette (hex with alpha). */
export const SVG_COLORS = {
  stroke: "#ffffff14",       // white/8%
  fill: "#ffffff0f",         // white/6%
  textPrimary: "#d4d4d8",   // zinc-300
  textSecondary: "#71717a",  // zinc-500
  textMuted: "#52525b",      // zinc-600
} as const;
