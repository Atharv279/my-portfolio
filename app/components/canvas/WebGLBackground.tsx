"use client";

import { useRef, useSyncExternalStore, Suspense, lazy } from "react";

const NeuralBackground = lazy(() => import("./NeuralBackground"));

type Capability = "desktop" | "mobile" | "low";

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

  if (capability === "low") {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute h-[50vmax] w-[50vmax] rounded-full bg-violet-600/[0.04] blur-[120px] animate-mesh-drift-1" />
        <div className="absolute right-0 bottom-0 h-[45vmax] w-[45vmax] rounded-full bg-cyan-500/[0.03] blur-[120px] animate-mesh-drift-2" />
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="fixed inset-0 bg-[#030303]" />}>
      <NeuralBackground capability={capability} />
    </Suspense>
  );
}
