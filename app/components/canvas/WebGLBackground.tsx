"use client";

import { useRef, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

const LazyCanvas = dynamic(() => import("./ParticleCanvas"), { ssr: false });

type Capability = "desktop" | "mobile" | "low";

/** Detect device capability once on the client. */
function detectCapability(): Capability {
  if (typeof window === "undefined") return "desktop";
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  if (cores < 4) return "low";
  if (isCoarse) return "mobile";
  return "desktop";
}

function useDeviceCapability(): Capability {
  const capRef = useRef<Capability | null>(null);
  // useSyncExternalStore with getServerSnapshot returns "desktop" on SSR,
  // then on the client we detect once and cache via ref.
  return useSyncExternalStore(
    () => () => {},
    () => {
      if (!capRef.current) capRef.current = detectCapability();
      return capRef.current;
    },
    () => "desktop" as Capability
  );
}

export default function WebGLBackground() {
  const capability = useDeviceCapability();

  // Low-power devices get a CSS-only fallback (simplified static dots)
  if (capability === "low") {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute h-[50vmax] w-[50vmax] rounded-full bg-violet-600/[0.04] blur-[120px] animate-mesh-drift-1" />
        <div className="absolute right-0 bottom-0 h-[45vmax] w-[45vmax] rounded-full bg-cyan-500/[0.03] blur-[120px] animate-mesh-drift-2" />
      </div>
    );
  }

  const particleCount = capability === "mobile" ? 40 : 90;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <LazyCanvas particleCount={particleCount} />
    </div>
  );
}
