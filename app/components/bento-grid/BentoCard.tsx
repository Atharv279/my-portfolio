"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useMotionTemplate,
} from "framer-motion";
import {
  useSyncExternalStore,
  useRef,
  useCallback,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useMagneticMotion } from "./useMagneticMotion";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
  id: string;
  glowColor?: string;
  isExpanded?: boolean;
  onExpand?: (id: string) => void;
  /** Screen-reader label for the card-as-button. Falls back to "Open <id>". */
  ariaLabel?: string;
  /**
   * Renders a breathing border-glow using the `--focus-ring` token. Intended
   * for cards that should signal background/local activity (e.g. local model
   * running, live pipeline). Auto-degrades to a static glow under
   * prefers-reduced-motion.
   */
  pulse?: boolean;
}

// Terminal-init feel: tighter stagger (50ms per item, MD-sequence range),
// snappier duration, an "expo-out" curve that snaps each tile into place.
const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const emptySubscribe = () => () => {};
const getIsTouch = () => window.matchMedia("(pointer: coarse)").matches;
const getIsTouchServer = () => false;

const tiltSpringConfig = { stiffness: 260, damping: 24, mass: 0.6 };

export default function BentoCard({
  children,
  className = "",
  index = 0,
  id,
  glowColor = "rgba(255,255,255,0.06)",
  isExpanded = false,
  onExpand,
  ariaLabel,
  pulse = false,
}: BentoCardProps) {
  const prefersReduced = useReducedMotion();
  const isTouch = useSyncExternalStore(emptySubscribe, getIsTouch, getIsTouchServer);
  const cardRef = useRef<HTMLDivElement>(null);

  const disablePhysics = isTouch || !!prefersReduced;
  // A card is "interactive" only when it can expand. Once expanded it becomes
  // passive content inside the dialog overlay (the overlay clone has
  // onExpand={undefined}), so button semantics + tab-stop are removed.
  const isInteractive = !isExpanded && !!onExpand;

  // 3D tilt values (outer card)
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, tiltSpringConfig);
  const springRotateY = useSpring(rotateY, tiltSpringConfig);

  // Flashlight glow position
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const flashlightBg = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor} 0%, transparent 60%)`;

  // Magnetic offset for the inner content layer
  const {
    x: magneticX,
    y: magneticY,
    onMouseMove: onMagneticMove,
    onMouseLeave: onMagneticLeave,
  } = useMagneticMotion({
    containerRef: cardRef,
    radius: 12,
    disabled: disablePhysics || isExpanded,
  });

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

      onMagneticMove(e);
    },
    [isTouch, prefersReduced, isExpanded, glowX, glowY, rotateX, rotateY, onMagneticMove],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
    onMagneticLeave();
  }, [rotateX, rotateY, glowX, glowY, onMagneticLeave]);

  const handleActivate = useCallback(() => {
    if (!isExpanded && onExpand) onExpand(id);
  }, [onExpand, id, isExpanded]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (isExpanded) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleActivate();
      }
    },
    [handleActivate, isExpanded],
  );

  return (
    <motion.div
      id={id}
      ref={cardRef}
      layoutId={id}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={isInteractive && !disablePhysics ? { scale: 1.015 } : undefined}
      whileTap={isInteractive && !disablePhysics ? { scale: 0.985 } : undefined}
      transition={disablePhysics ? undefined : { type: "spring", stiffness: 400, damping: 25 }}
      onClick={isInteractive ? handleActivate : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : -1}
      aria-expanded={isInteractive ? false : undefined}
      aria-label={isInteractive ? (ariaLabel ?? `Open ${id}`) : undefined}
      style={{
        rotateX: disablePhysics ? 0 : springRotateX,
        rotateY: disablePhysics ? 0 : springRotateY,
        transformPerspective: 800,
        "--glow-color": glowColor,
      } as React.CSSProperties}
      className={`group relative ${isInteractive ? "cursor-pointer" : ""} overflow-hidden rounded-2xl border border-hairline bg-surface p-5 md:p-6 backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hover:border-hairline-strong md:hover:shadow-lg md:hover:shadow-black/20 ${className}`}
    >
      {/* Cursor-tracking flashlight glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 md:group-hover:opacity-100"
        style={{ background: flashlightBg }}
      />

      {/* Static fallback glow for touch / reduced-motion */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 md:group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 30px -12px var(--glow-color), 0 0 40px -20px var(--glow-color)`,
        }}
      />

      {/* Inner gradient for depth */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />

      {/* "Local AI Pulse" — opt-in breathing border using --focus-ring */}
      {pulse && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            boxShadow:
              "inset 0 0 0 1px var(--focus-ring), 0 0 28px -8px var(--focus-ring)",
          }}
          initial={{ opacity: prefersReduced ? 0.5 : 0.35 }}
          animate={
            prefersReduced
              ? { opacity: 0.5 }
              : { opacity: [0.35, 0.9, 0.35] }
          }
          transition={
            prefersReduced
              ? undefined
              : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          }
        />
      )}

      {/* Content layer — magnetically translates toward the cursor */}
      <motion.div
        className="relative z-10"
        style={{ x: magneticX, y: magneticY }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
