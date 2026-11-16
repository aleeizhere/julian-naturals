"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

import { FadeIn } from "@/components/site/fade-in";
import { cn } from "@/lib/utils";
import { EASE_OUT_QUINT } from "@/lib/motion";

const MILESTONES = [
  {
    year: "2010",
    title: "The first batch",
    text: "Josh pours his first lip balms on the farmhouse stove, made just for the family.",
  },
  {
    year: "2013",
    title: "Farmers’ market Saturdays",
    text: "A folding table at the Julian farmers’ market, and a line that kept coming back.",
  },
  {
    year: "2016",
    title: "Deep Moisture Treatment",
    text: "Our lanolin, shea and cocoa butter balm joins the line and becomes a farm-hand favorite.",
  },
  {
    year: "2020",
    title: "Shipping from the farm",
    text: "The online shop opens. Every order is still packed by hand in the barn.",
  },
  {
    year: "Today",
    title: "Still small, still family",
    text: "More products, the same kitchen-table standards, and the same family behind every jar.",
  },
] as const;

export function StoryTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  // the line draws itself as the list scrolls through the viewport
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section aria-labelledby="timeline-title" className="relative overflow-clip">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-28 lg:px-10">
        <header className="text-center">
          <FadeIn>
            <p className="text-[11px] font-medium tracking-[0.18em] text-primary uppercase sm:text-[13px] sm:tracking-[0.28em]">
              Our Journey
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <span aria-hidden className="mx-auto mt-6 block h-px w-12 bg-primary" />
          </FadeIn>
          <FadeIn delay={0.16}>
            <h2
              id="timeline-title"
              className="mt-6 font-serif text-4xl leading-[1.1] font-medium tracking-tight text-foreground sm:text-5xl"
            >
              Fifteen years, one kitchen table
            </h2>
          </FadeIn>
        </header>

        <ol ref={listRef} className="relative mt-16 md:mt-20">
          {/* track + drawn line */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-[11px] w-px bg-olive/15 md:left-1/2 md:-translate-x-1/2"
          >
            <motion.div
              className="h-full w-full origin-top bg-primary"
              style={{ scaleY: lineScale }}
            />
          </div>

          {MILESTONES.map((m, i) => {
            const right = i % 2 === 1;
            return (
              <li key={m.year} className="relative pb-14 pl-12 last:pb-0 md:grid md:grid-cols-2 md:pl-0">
                {/* dot on the line */}
                <motion.span
                  aria-hidden
                  className="absolute top-1.5 left-[3px] size-[17px] rounded-full border-2 border-primary bg-background md:left-1/2 md:-translate-x-1/2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                />
                <motion.div
                  className={cn(
                    right ? "md:col-start-2 md:pl-14" : "md:pr-14 md:text-right",
                  )}
                  initial={{ opacity: 0, x: right ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                  transition={{ duration: 0.9, ease: EASE_OUT_QUINT }}
                >
                  <p className="font-serif text-lg text-primary">{m.year}</p>
                  <h3 className="mt-1 font-serif text-2xl font-medium text-foreground sm:text-[1.7rem]">
                    {m.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 max-w-sm text-base leading-relaxed font-light text-muted-foreground",
                      !right && "md:ml-auto",
                    )}
                  >
                    {m.text}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
