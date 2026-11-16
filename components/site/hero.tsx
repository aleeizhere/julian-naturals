"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { motion, type Transition } from "motion/react";

import { Button } from "@/components/ui/button";
import { FeatureStrip } from "@/components/site/feature-strip";
import { ImageLeaves, WindLeaf } from "@/components/site/leaves";
import { EASE_OUT_EXPO, EASE_OUT_QUINT, HERO_TIMELINE } from "@/lib/motion";

/**
 * "Lens pull": text starts huge and out of focus, then shrinks into place
 * while sharpening. Shared by the heading and the description.
 */
const lensInitial = { opacity: 0, scale: 2.4, filter: "blur(18px)" };
const lensAnimate = { opacity: 1, scale: 1, filter: "blur(0px)" };
const lensTransition = (delay: number): Transition => ({
  delay,
  scale: { delay, duration: 1.3, ease: EASE_OUT_EXPO },
  filter: { delay, duration: 1.1, ease: EASE_OUT_QUINT },
  opacity: { delay, duration: 0.5, ease: "easeOut" },
});

export function Hero() {
  return (
    <section
      data-hero
      aria-labelledby="hero-heading"
      // overflow-clip: animated decorations (wind leaf entrance/sway/parallax,
      // sprigs, lens-zoomed text) must never add scrollable height to the page.
      // Unlike overflow-hidden it doesn't create a scroll container.
      // min-h: one screen minus the navbar (h-18 / md:h-20 + 1px bottom border).
      className="relative isolate flex min-h-[calc(100svh-4.5rem-1px)] flex-col overflow-clip md:min-h-[calc(100svh-5rem-1px)]"
    >
      <WindLeaf />

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-4 pt-12 pb-10 sm:px-6 md:grid-cols-2 md:gap-6 md:py-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:px-10">
        {/* Product image — hidden on mobile */}
        <div data-hero-image className="relative isolate hidden md:block">
          <ImageLeaves />
          {/* soft glass halo behind the products */}
          <div
            aria-hidden
            className="absolute inset-x-[8%] top-[12%] bottom-[4%] rounded-[50%] bg-white/50 blur-3xl"
          />
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -160 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: HERO_TIMELINE.image,
              duration: 1.2,
              ease: EASE_OUT_QUINT,
              opacity: { delay: HERO_TIMELINE.image, duration: 0.6 },
            }}
          >
            <Image
              src="/hero-section.png"
              alt="Julian Naturals body care: Deep Moisture Treatment, Body Nourishing Oil, After Shave Balm and Caramel Apple lip balm arranged on a stone with coconut, shea butter and cocoa beans"
              width={1535}
              height={1024}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1280px) 680px, (min-width: 768px) 50vw, 0px"
              className="h-auto w-full drop-shadow-[0_30px_40px_rgb(63_90_42/0.12)]"
            />
          </motion.div>
        </div>

        {/* Copy */}
        <div data-hero-copy className="max-w-xl md:pl-2 lg:pl-6">
          <motion.p
            data-hero-eyebrow
            className="text-[11px] font-medium tracking-[0.18em] text-primary uppercase sm:text-[13px] sm:tracking-[0.28em]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: HERO_TIMELINE.eyebrow, duration: 0.8, ease: EASE_OUT_QUINT }}
          >
            From our farm to your daily routine
          </motion.p>
          <motion.span
            data-hero-rule
            aria-hidden
            className="mt-6 block h-px w-12 origin-left bg-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: HERO_TIMELINE.eyebrow + 0.1, duration: 0.9, ease: EASE_OUT_QUINT }}
          />
          <motion.h1
            id="hero-heading"
            data-hero-heading
            className="mt-6 font-serif text-5xl leading-[1.05] font-medium tracking-tight text-foreground will-change-[transform,filter] sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
            initial={lensInitial}
            animate={lensAnimate}
            transition={lensTransition(HERO_TIMELINE.heading)}
          >
            Truly Natural <br className="hidden sm:block" />
            Body Care
          </motion.h1>
          <motion.p
            data-hero-description
            className="mt-6 max-w-md text-lg leading-relaxed font-light text-muted-foreground will-change-[transform,filter] sm:text-xl"
            initial={lensInitial}
            animate={lensAnimate}
            transition={lensTransition(HERO_TIMELINE.description)}
          >
            Handcrafted in small batches using natural ingredients from our
            family farm in Julian, California.
          </motion.p>
          <motion.div
            data-hero-cta
            className="mt-9 w-full sm:w-fit"
            initial={{ opacity: 0, scale: 0.85, rotate: -9, y: 14 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            transition={{
              delay: HERO_TIMELINE.cta,
              type: "spring",
              stiffness: 420,
              damping: 14,
              mass: 0.8,
              opacity: { delay: HERO_TIMELINE.cta, duration: 0.2 },
            }}
          >
            <Button
              asChild
              size="lg"
              className="h-14 w-full rounded-full px-9 text-[17px] font-normal shadow-[0_10px_30px_-10px_rgb(63_90_42/0.6)] sm:w-auto"
            >
              <Link href="#products">
                Shop Our Products
                <ArrowRightIcon className="size-5" strokeWidth={1.5} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <FeatureStrip />
    </section>
  );
}
