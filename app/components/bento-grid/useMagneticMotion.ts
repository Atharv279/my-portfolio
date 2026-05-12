"use client";

import { useCallback, type MouseEvent, type RefObject } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export interface UseMagneticMotionOptions {
  /** Element whose bounding box defines the cursor frame of reference. */
  containerRef: RefObject<HTMLElement | null>;
  /** Maximum translation in px at the corner of the container. 10–15 feels tactile. */
  radius?: number;
  /** Short-circuit (touch device, expanded card, reduced motion, etc.). */
  disabled?: boolean;
}

/**
 * Magnetic content motion — translates a child by a small offset toward the
 * cursor. Uses a stiff spring so the response feels mechanical rather than
 * floaty. Returns motion values you spread onto a `motion.*` element's `style`,
 * plus mouse handlers you wire onto the container (or compose with your own).
 *
 * Honours `prefers-reduced-motion`, returns to rest when `disabled` flips on,
 * and reads the bounding box per-event (no resize listener needed).
 */
export function useMagneticMotion({
  containerRef,
  radius = 12,
  disabled = false,
}: UseMagneticMotionOptions) {
  const prefersReduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Stiff + well-damped = tactile response, settles in ~120ms with no overshoot.
  const springX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.4 });

  const inactive = disabled || !!prefersReduced;

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (inactive) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Normalize cursor offset to [-1, 1] across the container, then scale by radius.
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      x.set(dx * radius);
      y.set(dy * radius);
    },
    [containerRef, inactive, radius, x, y],
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { x: springX, y: springY, onMouseMove, onMouseLeave };
}
