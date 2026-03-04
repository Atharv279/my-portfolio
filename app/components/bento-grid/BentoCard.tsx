"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useMotionTemplate,
} from "framer-motion";
import { useSyncExternalStore, useRef, useCallback, type ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
  id: string;
  glowColor?: string;
  isExpanded?: boolean;
  onExpand?: (id: string) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const emptySubscribe = () => () => {};
const getIsTouch = () => window.matchMedia("(pointer: coarse)").matches;
const getIsTouchServer = () => false;

const springConfig = { stiffness: 260, damping: 24, mass: 0.6 };

export default function BentoCard({
  children,
  className = "",
  index = 0,
  id,
  glowColor = "rgba(255,255,255,0.06)",
  isExpanded = false,
  onExpand,
}: BentoCardProps) {
  const prefersReduced = useReducedMotion();
  const isTouch = useSyncExternalStore(emptySubscribe, getIsTouch, getIsTouchServer);
  const cardRef = useRef<HTMLDivElement>(null);

  // --- 3D tilt values ---
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // --- Flashlight glow position ---
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const flashlightBg = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor} 0%, transparent 60%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch || prefersReduced || isExpanded) return;
      const el = cardRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      glowX.set(percentX);
      glowY.set(percentY);

      const tiltX = ((y / rect.height) - 0.5) * -8;
      const tiltY = ((x / rect.width) - 0.5) * 8;
      rotateX.set(tiltX);
      rotateY.set(tiltY);
    },
    [isTouch, prefersReduced, isExpanded, glowX, glowY, rotateX, rotateY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [rotateX, rotateY, glowX, glowY]);

  const handleClick = useCallback(() => {
    if (onExpand) onExpand(id);
  }, [onExpand, id]);

  const disablePhysics = isTouch || !!prefersReduced;

  return (
    <motion.div
      ref={cardRef}
      layoutId={id}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: disablePhysics ? 0 : springRotateX,
        rotateY: disablePhysics ? 0 : springRotateY,
        transformPerspective: 800,
        "--glow-color": glowColor,
      } as React.CSSProperties}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.15] ${className}`}
    >
      {/* Cursor-tracking flashlight glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: flashlightBg }}
      />

      {/* Static fallback glow for touch / reduced-motion */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 30px -12px var(--glow-color), 0 0 40px -20px var(--glow-color)`,
        }}
      />

      {/* Inner gradient for depth */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
