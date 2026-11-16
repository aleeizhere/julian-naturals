"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { FadeIn } from "@/components/site/fade-in";
import { EASE_OUT_EXPO, EASE_OUT_QUINT } from "@/lib/motion";

const STEPS = [
  {
    title: "Grow & Source",
    text: "We cultivate and harvest high-quality, natural ingredients on our farm in Julian, California.",
    image: "/process-1.png",
    alt: "Lavender growing in a field below the hills of Julian, California",
    icon: "/process-icon-1.png",
  },
  {
    title: "Craft with Care",
    text: "We turn farm-grown and naturally sourced ingredients into effective, skin-loving formulas.",
    image: "/process-2.png",
    alt: "Shea butter, cocoa beans and a bottle of oil on a wooden table",
    icon: "/process-icon-2.png",
  },
  {
    title: "Small Batch Made",
    text: "Every product is handcrafted in small batches for freshness, quality, and consistency.",
    image: "/process-3.png",
    alt: "An open amber jar of freshly made balm resting on linen",
    icon: "/process-icon-3.png",
  },
  {
    title: "Straight to You",
    text: "Thoughtfully packaged and shipped from our family farm to your door.",
    image: "/process-4.png",
    alt: "Hands placing a Julian Naturals jar into a kraft shipping box",
    icon: "/process-icon-4.png",
  },
] as const;

/* Scroll choreography: each step has its own trigger and rises in; steps
   sharing a row are staggered left → right. Inside each step the photo eases
   out of a slight zoom, the icon badge pops, the arrow slides. */
const STEP_STAGGER = 0.16;
const stepVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  shown: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, delayChildren: delay, duration: 0.9, ease: EASE_OUT_QUINT },
  }),
};
const photoVariants: Variants = {
  hidden: { scale: 1.12 },
  shown: { scale: 1, transition: { duration: 1.4, ease: EASE_OUT_EXPO } },
};
const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  shown: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.35, type: "spring", stiffness: 320, damping: 18 },
  },
};
const arrowVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  shown: { opacity: 1, x: 0, transition: { delay: 0.6, duration: 0.6, ease: EASE_OUT_QUINT } },
};

/** Steps per row at the current breakpoint (matches the grid classes). */
function subscribe(onChange: () => void) {
  const queries = ["(min-width: 1024px)", "(min-width: 640px)"].map((q) => window.matchMedia(q));
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}
function useColumns() {
  return useSyncExternalStore(
    subscribe,
    () =>
      window.matchMedia("(min-width: 1024px)").matches
        ? 4
        : window.matchMedia("(min-width: 640px)").matches
          ? 2
          : 1,
    () => 4,
  );
}

export function OurProcess() {
  const columns = useColumns();

  return (
    <section
      id="process"
      data-our-process
      aria-labelledby="process-heading"
      className="relative overflow-clip"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-10">
        <header className="mx-auto max-w-5xl text-center">
          <FadeIn>
            <p className="text-[11px] font-medium tracking-[0.18em] text-primary uppercase sm:text-[13px] sm:tracking-[0.28em]">
              Our Process
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <span aria-hidden className="mx-auto mt-6 block h-px w-12 bg-primary" />
          </FadeIn>
          <FadeIn delay={0.16}>
            <h2
              id="process-heading"
              className="mt-6 font-serif text-4xl leading-[1.1] font-medium tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]"
            >
              From Our Farm to Your Routine
            </h2>
          </FadeIn>
          <FadeIn delay={0.26}>
            <p className="mt-5 text-lg font-light text-muted-foreground sm:text-xl">
              A simple, thoughtful process that keeps it natural from start to finish.
            </p>
          </FadeIn>
        </header>

        <ol className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              data-process-step
              className="group flex flex-col items-center text-center"
              variants={stepVariants}
              custom={(i % columns) * STEP_STAGGER}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* photo */}
              <div className="relative aspect-[345/308] w-full overflow-hidden rounded-3xl shadow-[0_24px_48px_-28px_rgb(43_42_38/0.35)] ring-1 ring-olive/10">
                <motion.div className="absolute inset-0" variants={photoVariants}>
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </motion.div>
              </div>

              {/* icon badge overlapping the photo, plus the arrow to the next step */}
              <div className="relative -mt-10 flex w-full justify-center">
                <motion.span
                  className="grid size-20 place-items-center rounded-full bg-olive-50 shadow-[0_8px_24px_-12px_rgb(63_90_42/0.45)] ring-4 ring-white/80 backdrop-blur-sm"
                  variants={badgeVariants}
                >
                  <Image
                    src={step.icon}
                    alt=""
                    width={96}
                    height={96}
                    sizes="40px"
                    className="size-12 object-contain"
                  />
                </motion.span>

                {i < STEPS.length - 1 && (
                  <motion.span
                    aria-hidden
                    className="absolute top-full -right-5 hidden translate-x-1/2 -translate-y-1/2 text-primary lg:block"
                    variants={arrowVariants}
                  >
                    <ArrowRightIcon className="size-6" strokeWidth={1.5} />
                  </motion.span>
                )}
              </div>

              <h3 className="mt-6 font-serif text-2xl font-medium text-foreground xl:text-[1.75rem]">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 max-w-[17rem] text-[15px] leading-relaxed text-muted-foreground md:text-base">
                {step.text}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
