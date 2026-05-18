"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * React 19 / React compiler strictness: Math.random is "impure".
 * We move it into a factory function to satisfy the purity check.
 */
const generatePositions = (count: number) => {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 10;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  return pos;
};

const generateIndices = (pos: Float32Array, count: number) => {
  const indices = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = pos[i * 3] - pos[j * 3];
      const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
      const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < 2.5) {
        indices.push(i, j);
      }
    }
  }
  return new Uint16Array(indices);
};

function Particles({ count = 150 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => generatePositions(count), [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function Connections({ count = 80 }) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, lineIndices } = useMemo(() => {
    const pos = generatePositions(count);
    const indices = generateIndices(pos, count);
    return { positions: pos, lineIndices: indices };
  }, [count]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      linesRef.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="index"
          count={lineIndices.length}
          array={lineIndices}
          itemSize={1}
          args={[lineIndices, 1]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#8b5cf6"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export default function NeuralBackground({ capability }: { capability: string }) {
  const particleCount = capability === "mobile" ? 60 : 150;
  const connectionCount = capability === "mobile" ? 40 : 80;

  return (
    <div className="fixed inset-0 -z-10 bg-[#030303]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={["#030303"]} />
        <ambientLight intensity={0.5} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Particles count={particleCount} />
          <Connections count={connectionCount} />
        </Float>
      </Canvas>
      {/* Overlay gradient for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030303]" />
    </div>
  );
}
