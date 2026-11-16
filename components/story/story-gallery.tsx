"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

import { FadeIn } from "@/components/site/fade-in";

const PHOTOS = [
  { src: "/process-1.png", alt: "Lavender in bloom on the farm in Julian", tall: true },
  { src: "/process-2.png", alt: "Shea butter, cocoa beans and oil ready for a new batch" },
  { src: "/process-3.png", alt: "A freshly poured jar of balm on linen" },
  { src: "/process-4.png", alt: "An order being packed by hand in a kraft box", tall: true },
] as const;

export function StoryGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // columns drift at different speeds for a gentle parallax
  const colA = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const colB = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section aria-labelledby="gallery-title" className="relative overflow-clip">
      <div ref={ref} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeIn>
              <p className="text-[11px] font-medium tracking-[0.18em] text-primary uppercase sm:text-[13px] sm:tracking-[0.28em]">
                Life on the Farm
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2
                id="gallery-title"
                className="mt-6 font-serif text-4xl leading-[1.1] font-medium tracking-tight text-foreground sm:text-5xl"
              >
                Where every jar begins
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.16}>
            <p className="max-w-sm text-base font-light text-muted-foreground">
              From the lavender rows to the packing table in the barn, it all
              happens here.
            </p>
          </FadeIn>
        </header>

        <div className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:gap-6">
          {[PHOTOS.filter((_, i) => i % 2 === 0), PHOTOS.filter((_, i) => i % 2 === 1)].map((col, c) => (
            <motion.div
              key={c}
              className={c === 1 ? "mt-10 flex flex-col gap-4 md:mt-20 md:gap-6" : "flex flex-col gap-4 md:gap-6"}
              style={{ y: c === 0 ? colA : colB }}
            >
              {col.map((p, i) => (
                <FadeIn key={p.src} delay={0.1 * i}>
                  <div
                    className={
                      "group relative overflow-hidden rounded-3xl shadow-[0_24px_48px_-28px_rgb(43_42_38/0.35)] ring-1 ring-olive/10 " +
                      ("tall" in p && p.tall ? "aspect-[4/5]" : "aspect-square")
                    }
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1280px) 600px, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </FadeIn>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
