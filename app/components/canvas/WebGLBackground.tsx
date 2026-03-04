"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const LazyCanvas = dynamic(() => import("./ParticleCanvas"), { ssr: false });

function useDeviceCapability() {
  const [capability, setCapability] = useState<"desktop" | "mobile" | "low">(
    "desktop"
  );

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;

    if (cores < 4) {
      setCapability("low");
    } else if (isCoarse) {
      setCapability("mobile");
    } else {
      setCapability("desktop");
    }
  }, []);

  return capability;
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

  const particleCount = capability === "mobile" ? 60 : 150;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <LazyCanvas particleCount={particleCount} />
    </div>
  );
}
