"use client";

import { motion } from "motion/react";

import { EASE_OUT_QUINT } from "@/lib/motion";

/** Simple scroll-triggered fade-up, played once. */
export function FadeIn({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ delay, duration: 0.9, ease: EASE_OUT_QUINT }}
    >
      {children}
    </motion.div>
  );
}
