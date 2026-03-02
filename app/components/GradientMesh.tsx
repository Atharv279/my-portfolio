"use client";

export default function GradientMesh() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Primary orb — violet, drifts top-left ↔ center */}
      <div className="absolute h-[50vmax] w-[50vmax] rounded-full bg-violet-600/[0.04] blur-[120px] animate-mesh-drift-1" />

      {/* Secondary orb — cyan, drifts bottom-right ↔ center */}
      <div className="absolute right-0 bottom-0 h-[45vmax] w-[45vmax] rounded-full bg-cyan-500/[0.03] blur-[120px] animate-mesh-drift-2" />

      {/* Tertiary orb — emerald, slow pulse center */}
      <div className="absolute left-1/2 top-1/2 h-[35vmax] w-[35vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.02] blur-[100px] animate-mesh-drift-3" />
    </div>
  );
}
