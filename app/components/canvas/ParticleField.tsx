"use client";

/* eslint-disable react-hooks/purity, react-hooks/immutability */
// R3F (React Three Fiber) requires buffer data to be created/accessed during
// render and mutated imperatively in useFrame. These patterns are standard R3F
// practice and intentionally violate React purity rules for the Three.js bridge.

import { useRef, useMemo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const DESKTOP_COUNT = 90;
const SPREAD_X = 8;
const SPREAD_Y = 4;
const SPREAD_Z = 8;
const CONNECTION_THRESHOLD = 2.5;
const MAX_CONNECTIONS = 24;
const MOUSE_RADIUS = 3;
const MOUSE_PUSH = 0.3;
const RETURN_SPEED = 0.02;
const PARTICLE_COLOR = new THREE.Color("#e4e4e7");
const LINE_COLOR = new THREE.Color(0.894, 0.894, 0.906);

interface ParticleFieldProps {
  count?: number;
}

export default function ParticleField({ count }: ParticleFieldProps) {
  const reducedMotion = useReducedMotion();
  const particleCount = count ?? DESKTOP_COUNT;

  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const frameCount = useRef(0);

  // Generate initial positions once
  const { positions, basePositions, sizes } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const base = new Float32Array(particleCount * 3);
    const sz = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 2 * SPREAD_X;
      const y = (Math.random() - 0.5) * 2 * SPREAD_Y;
      const z = (Math.random() - 0.5) * 2 * SPREAD_Z;
      const idx = i * 3;
      pos[idx] = x;
      pos[idx + 1] = y;
      pos[idx + 2] = z;
      base[idx] = x;
      base[idx + 1] = y;
      base[idx + 2] = z;
      sz[i] = 1.5 + Math.random();
    }

    return { positions: pos, basePositions: base, sizes: sz };
  }, [particleCount]);

  // Pre-allocate line geometry buffers
  const { linePositions, lineOpacities } = useMemo(() => {
    const lp = new Float32Array(MAX_CONNECTIONS * 6);
    const lo = new Float32Array(MAX_CONNECTIONS * 2);
    return { linePositions: lp, lineOpacities: lo };
  }, []);

  const { pointer } = useThree();

  const updateConnections = useCallback(
    (currentPositions: Float32Array) => {
      let lineCount = 0;

      for (let i = 0; i < particleCount && lineCount < MAX_CONNECTIONS; i++) {
        for (
          let j = i + 1;
          j < particleCount && lineCount < MAX_CONNECTIONS;
          j++
        ) {
          const ix = i * 3,
            jx = j * 3;
          const dx = currentPositions[ix] - currentPositions[jx];
          const dy = currentPositions[ix + 1] - currentPositions[jx + 1];
          const dz = currentPositions[ix + 2] - currentPositions[jx + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECTION_THRESHOLD) {
            const offset = lineCount * 6;
            linePositions[offset] = currentPositions[ix];
            linePositions[offset + 1] = currentPositions[ix + 1];
            linePositions[offset + 2] = currentPositions[ix + 2];
            linePositions[offset + 3] = currentPositions[jx];
            linePositions[offset + 4] = currentPositions[jx + 1];
            linePositions[offset + 5] = currentPositions[jx + 2];

            const opacity = 0.025 * (1 - dist / CONNECTION_THRESHOLD);
            lineOpacities[lineCount * 2] = opacity;
            lineOpacities[lineCount * 2 + 1] = opacity;
            lineCount++;
          }
        }
      }

      // Zero out remaining line positions
      for (let i = lineCount * 6; i < MAX_CONNECTIONS * 6; i++) {
        linePositions[i] = 0;
      }
      for (let i = lineCount * 2; i < MAX_CONNECTIONS * 2; i++) {
        lineOpacities[i] = 0;
      }

      return lineCount;
    },
    [particleCount, linePositions, lineOpacities]
  );

  useFrame((state) => {
    if (reducedMotion) return;
    if (!pointsRef.current) return;

    frameCount.current++;
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const currentPositions = posAttr.array as Float32Array;

    // Project mouse into world space (on z=0 plane)
    const mouseX = pointer.x * 8;
    const mouseY = pointer.y * 4;

    // Update particle positions with mouse repulsion + spring return
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const dx = currentPositions[idx] - mouseX;
      const dy = currentPositions[idx + 1] - mouseY;
      const dist2D = Math.sqrt(dx * dx + dy * dy);

      if (dist2D < MOUSE_RADIUS && dist2D > 0.01) {
        const force = (1 - dist2D / MOUSE_RADIUS) * MOUSE_PUSH;
        currentPositions[idx] += (dx / dist2D) * force;
        currentPositions[idx + 1] += (dy / dist2D) * force;
      }

      // Spring return to base position
      currentPositions[idx] += (basePositions[idx] - currentPositions[idx]) * RETURN_SPEED;
      currentPositions[idx + 1] +=
        (basePositions[idx + 1] - currentPositions[idx + 1]) * RETURN_SPEED;
      currentPositions[idx + 2] +=
        (basePositions[idx + 2] - currentPositions[idx + 2]) * RETURN_SPEED;

      // Gentle ambient drift
      const time = state.clock.elapsedTime;
      currentPositions[idx + 1] +=
        Math.sin(time * 0.3 + i * 0.5) * 0.001;
    }

    posAttr.needsUpdate = true;

    // Update connection lines every 2nd frame
    if (frameCount.current % 2 === 0 && lineRef.current) {
      updateConnections(currentPositions);
      const linePosAttr = lineRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      const lineOpacityAttr = lineRef.current.geometry.attributes
        .opacity as THREE.BufferAttribute;
      (linePosAttr.array as Float32Array).set(linePositions);
      (lineOpacityAttr.array as Float32Array).set(lineOpacities);
      linePosAttr.needsUpdate = true;
      lineOpacityAttr.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={PARTICLE_COLOR}
          size={2}
          sizeAttenuation
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-opacity"
            args={[lineOpacities, 1]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={LINE_COLOR}
          transparent
          opacity={0.03}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}
