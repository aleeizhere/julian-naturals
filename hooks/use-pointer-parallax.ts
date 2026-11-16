"use client";

import { useEffect } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * Smoothed pointer offset in px (−strength/2 … +strength/2) for parallax layers.
 * Stays at 0 on touch devices and when the user prefers reduced motion.
 */
export function usePointerParallax(strength: number) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 50, damping: 20, mass: 0.8 });
  const y = useSpring(rawY, { stiffness: 50, damping: 20, mass: 0.8 });

  useEffect(() => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * strength);
      rawY.set((e.clientY / window.innerHeight - 0.5) * strength);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, strength, rawX, rawY]);

  return { x, y };
}
