"use client";

import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";

interface ParticleCanvasProps {
  particleCount: number;
}

export default function ParticleCanvas({ particleCount }: ParticleCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ParticleField count={particleCount} />
    </Canvas>
  );
}
