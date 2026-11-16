"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "motion/react";

import { Sway } from "@/components/site/leaves";
import { EASE_OUT_EXPO, EASE_OUT_QUINT, LEAF } from "@/lib/motion";

// The trigger lives on the static wrapper: the photo itself starts far
// off-screen and scaled up, so its own box would never register as in view.
const photoVariants: Variants = {
  hidden: { opacity: 0, x: "60vw", scale: 1.9, filter: "blur(28px)" },
  shown: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      x: { duration: 1.5, ease: EASE_OUT_EXPO },
      scale: { duration: 1.7, ease: EASE_OUT_EXPO },
      filter: { duration: 1.4, ease: EASE_OUT_QUINT, delay: 0.15 },
      opacity: { duration: 0.6 },
    },
  },
};

const leafVariants: Variants = {
  hidden: { opacity: 0, x: "70%", rotate: 20 },
  shown: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      delay: 0.55,
      duration: 1.8,
      ease: EASE_OUT_EXPO,
      opacity: { delay: 0.55, duration: 0.8 },
    },
  },
};

/**
 * Story photo: on scroll it arrives from off-screen right as if pressed
 * against the camera (huge + defocused), then pulls back into place and
 * sharpens. A blurred leaf sits in front of the bottom-right corner,
 * swaying, with scroll parallax.
 */
export function OurStoryPhoto({ src }: { src: string | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const leafY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <motion.div
      ref={ref}
      data-story-photo
      className="relative"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="relative" variants={photoVariants}>
        <div className="relative aspect-[715/585] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgb(43_42_38/0.35)] ring-1 ring-olive/15">
          {src ? (
            <Image
              src={src}
              alt="Farmer Josh leaning on a fence on the family farm in Julian, California"
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover object-[50%_30%]"
            />
          ) : (
            <div className="grid h-full place-items-center bg-linear-to-br from-olive-100 via-olive-50 to-white p-8 text-center">
              <p className="max-w-xs text-sm text-muted-foreground">
                Farmer photo goes here. Add{" "}
                <code className="rounded bg-white/70 px-1.5 py-0.5 text-foreground">
                  public/our-story.jpg
                </code>
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* blurred foreground leaf, slightly covering the photo's corner */}
      <motion.div
        aria-hidden
        data-story-leaf
        className="pointer-events-none absolute -right-[10%] -bottom-[22%] z-10 w-[52%] md:-right-[14%] md:w-[48%]"
        style={{ y: leafY }}
      >
        <motion.div variants={leafVariants}>
          {/* mirrored, so the stem sits bottom-left and leaves reach up-right */}
          <Sway amount={4} duration={7} drift={6} origin="25% 92%">
            <Image
              src={LEAF.src}
              alt=""
              width={LEAF.width}
              height={LEAF.height}
              sizes="(min-width: 768px) 320px, 50vw"
              className="h-auto w-full -scale-x-100 opacity-90 blur-[5px]"
            />
          </Sway>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
