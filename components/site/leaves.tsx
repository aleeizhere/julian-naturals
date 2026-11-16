"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { EASE_OUT_EXPO, HERO_TIMELINE, LEAF_STEM_ORIGIN } from "@/lib/motion";

const LEAF = { src: "/leaf.png", width: 1535, height: 1024 } as const;

/** Endless, gentle to-and-fro around the stem, like a light breeze. */
function Sway({
  children,
  amount = 3,
  duration = 6,
  delay = 0,
  drift = 0,
  origin = LEAF_STEM_ORIGIN,
}: {
  children: React.ReactNode;
  amount?: number;
  duration?: number;
  delay?: number;
  drift?: number;
  origin?: string;
}) {
  return (
    <motion.div
      style={{ transformOrigin: origin }}
      animate={{
        rotate: [0, amount, -amount * 0.6, amount * 0.4, 0],
        x: [0, drift, -drift * 0.4, drift * 0.6, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Sprigs tucked behind the product photo, peeking out above the bottles.
 * Render inside the hero image wrapper, before the product image.
 */
export function ImageLeaves() {
  const pointer = usePointerParallax(14);
  const { scrollY } = useScroll();
  const scrollShift = useTransform(scrollY, [0, 800], [0, -40]);

  const sprigs = [
    // behind the jar, leaning out to the left (mirrored)
    {
      key: "left",
      className: "left-[-4%] top-[-6%] w-[46%] rotate-[-18deg] -scale-x-100",
      sway: { amount: 3.5, duration: 6.5, delay: 0, drift: 3 },
    },
    // behind the tall bottle, leaning out to the right
    {
      key: "right",
      className: "right-[2%] top-[10%] w-[44%] rotate-[-8deg]",
      sway: { amount: 3, duration: 7.5, delay: 0.8, drift: 4 },
    },
  ];

  return (
    <motion.div
      aria-hidden
      data-image-leaves
      className="pointer-events-none absolute inset-0"
      style={{ x: pointer.x, y: scrollShift }}
    >
      {sprigs.map((s, i) => (
        <motion.div
          key={s.key}
          className={`absolute ${s.className}`}
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: HERO_TIMELINE.imageLeaves + i * 0.15,
            duration: 1.4,
            ease: EASE_OUT_EXPO,
          }}
        >
          <Sway {...s.sway}>
            <Image
              src={LEAF.src}
              alt=""
              width={LEAF.width}
              height={LEAF.height}
              sizes="320px"
              className="h-auto w-full"
            />
          </Sway>
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * Large, out-of-focus leaf drifting in from the left edge. It enters from
 * off-screen on load, keeps swaying in the wind, and moves with scroll and
 * pointer at a stronger rate than the content (foreground parallax layer).
 * Render inside a `relative isolate` section.
 */
export function WindLeaf() {
  const pointer = usePointerParallax(36);
  const { scrollY } = useScroll();
  const scrollShift = useTransform(scrollY, [0, 800], [0, -180]);

  return (
    <motion.div
      aria-hidden
      data-wind-leaf
      className="pointer-events-none absolute top-[14%] left-0 -z-10 w-[78vw] max-w-[720px] -translate-x-[38%] md:top-[22%] md:w-[46vw]"
      style={{ y: scrollShift }}
    >
      <motion.div style={{ x: pointer.x, y: pointer.y }}>
        <motion.div
          initial={{ x: "-110%", opacity: 0, rotate: -25 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{
            delay: HERO_TIMELINE.windLeaf,
            duration: 2.2,
            ease: EASE_OUT_EXPO,
            opacity: { duration: 1.2, delay: HERO_TIMELINE.windLeaf },
          }}
        >
          {/* image is rotated ~180°, so the stem sits near the top-left */}
          <Sway amount={5} duration={8} drift={18} origin="22% 12%">
            <Image
              src={LEAF.src}
              alt=""
              width={LEAF.width}
              height={LEAF.height}
              sizes="(min-width: 768px) 46vw, 78vw"
              className="h-auto w-full rotate-[200deg] opacity-35 blur-[10px] md:opacity-60 md:blur-[12px]"
            />
          </Sway>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
