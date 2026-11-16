"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";

import { FadeIn } from "@/components/site/fade-in";
import { RollingLinkButton } from "@/components/site/rolling-link-button";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, EASE_OUT_QUINT } from "@/lib/motion";

const PRODUCTS = [
  {
    slug: "deep-moisture",
    name: "Deep Moisture Treatment",
    tagline: "Lanolin, shea & cocoa butters · Simply Naked",
    description:
      "A rich, unscented balm that melts into dry, cracked skin and keeps it soft from morning to night. Made for hard-working hands, heels and elbows.",
    image: "/product-deep-moisture.png",
    alt: "Two amber jars of Julian Naturals Deep Moisture Treatment",
    ghost: "nourish.",
  },
  {
    slug: "desert-rain",
    name: "Desert Rain Deodorant",
    tagline: "Aluminum free · Extra strength",
    description:
      "Whole-body, all-natural protection that keeps you fresh for up to 48 hours, with a clean scent like rain on warm sage.",
    image: "/product-deo.png",
    alt: "Julian Naturals Desert Rain all-natural whole body deodorant stick",
    ghost: "fresh.",
  },
  {
    slug: "lavender-fields",
    name: "Lavender Fields Lip Balm",
    tagline: "All natural · Handcrafted in Julian, CA",
    description:
      "Our original lip balm, blended with lavender from the farm to soothe, soften and protect dry lips through every season.",
    image: "/product-lip-balm.png",
    alt: "Two tubes of Julian Naturals Lavender Fields all-natural lip balm",
    ghost: "soothe.",
  },
] as const;

type Product = (typeof PRODUCTS)[number];

/* ───────────────────────── Desktop: pinned showcase ───────────────────────── */

/** Scroll distance given to each product while the stage is pinned (svh). */
const SVH_PER_PRODUCT = 90;

// Slash: a clean diagonal band (parallelogram) running off the top and bottom
// of the stage, in % of the full stage width. Both edges share one slope;
// SLASH_WIDTH is the band's horizontal thickness.
// Hidden = collapsed onto its right edge, so it sweeps in leftwards.
// Both polygons have 4 points so they interpolate.
const SLASH_TOP_LEFT = 90;
const SLASH_BOTTOM_LEFT = 60;
const SLASH_WIDTH = 60;
const SLASH_SHOWN = `polygon(${SLASH_TOP_LEFT}% 0%, ${SLASH_TOP_LEFT + SLASH_WIDTH}% 0%, ${SLASH_BOTTOM_LEFT + SLASH_WIDTH}% 100%, ${SLASH_BOTTOM_LEFT}% 100%)`;
const SLASH_HIDDEN = `polygon(${SLASH_TOP_LEFT + SLASH_WIDTH}% 0%, ${SLASH_TOP_LEFT + SLASH_WIDTH}% 0%, ${SLASH_BOTTOM_LEFT + SLASH_WIDTH}% 100%, ${SLASH_BOTTOM_LEFT + SLASH_WIDTH}% 100%)`;

/** dir: +1 = scrolling down (enter from below, leave upward), -1 = inverse. */
const productVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? 280 : -280,
    rotate: dir > 0 ? -12 : 12,
    scale: 0.82,
  }),
  center: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: EASE_OUT_EXPO,
      opacity: { duration: 0.35 },
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? -280 : 280,
    rotate: dir > 0 ? 10 : -10,
    scale: 0.85,
    transition: { duration: 0.55, ease: [0.55, 0, 0.75, 0.2] },
  }),
};

const copyVariants: Variants = {
  enter: {},
  center: { transition: { delayChildren: 0.28, staggerChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};
const copyItemVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 28 : -28 }),
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_QUINT },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? -20 : 20,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

const ghostVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: EASE_OUT_EXPO },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -80 : 80,
    transition: { duration: 0.4 },
  }),
};

function DesktopShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // 0 → 1 while the stage is pinned: picks the active product.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // 0 → 1 while the section scrolls up to the pin: sweeps the slash in.
  const { scrollYProgress: approach } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const slashClip = useTransform(
    approach,
    [0.2, 0.95],
    [SLASH_HIDDEN, SLASH_SHOWN],
  );
  const slashZoom = useTransform(approach, [0.2, 1], [1.18, 1]);

  const [index, setIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIndex(Math.min(PRODUCTS.length - 1, Math.floor(v * PRODUCTS.length)));
  });

  // Products only show while the stage is on screen. Off-screen above the
  // section counts as -1, below it as PRODUCTS.length, so leaving / coming
  // back plays the right direction.
  const inView = useInView(stageRef, { amount: 0.55 });
  const position = inView
    ? index
    : scrollYProgress.get() > 0.5
      ? PRODUCTS.length
      : -1;

  const [prevPosition, setPrevPosition] = useState(position);
  const [dir, setDir] = useState(1);
  if (position !== prevPosition) {
    setDir(position > prevPosition ? 1 : -1);
    setPrevPosition(position);
  }
  const product: Product | undefined = PRODUCTS[position];

  const scrollToProduct = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + travel * ((i + 0.5) / PRODUCTS.length),
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${100 + PRODUCTS.length * SVH_PER_PRODUCT}svh` }}
    >
      <div ref={stageRef} className="sticky top-0 h-svh overflow-clip">
        {/* green leaf slash */}
        <motion.div
          aria-hidden
          data-featured-slash
          className="absolute inset-0"
          style={{ clipPath: slashClip }}
        >
          <motion.div className="absolute inset-0" style={{ scale: slashZoom }}>
            <Image
              src="/leaves-slash.jpeg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* oversized ghost word, as in the reference */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-[13%] left-[3vw] grid"
        >
          <AnimatePresence initial={false} custom={dir}>
            {product && (
              <motion.span
                key={product.slug}
                custom={dir}
                variants={ghostVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="[grid-area:1/1] font-serif text-[clamp(7rem,15vw,15rem)] leading-none font-semibold tracking-tight text-foreground/[0.045] select-none"
              >
                {product.ghost}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="relative mx-auto grid h-full max-w-7xl grid-cols-[0.95fr_1.05fr] items-center gap-8 px-10 pt-20">
          {/* copy (lifted slightly above true centre) */}
          <div className="max-w-md -translate-y-[7vh]">
            <p className="text-[13px] font-medium tracking-[0.28em] text-primary uppercase">
              Featured Products
            </p>
            <span aria-hidden className="mt-6 block h-px w-12 bg-primary" />

            {/* stacked in one grid cell so outgoing/incoming copy overlap */}
            <div className="mt-8 grid min-h-[22rem]" aria-live="polite">
              <AnimatePresence initial={false} custom={dir}>
                {product && (
                  <motion.div
                    key={product.slug}
                    className="[grid-area:1/1]"
                    custom={dir}
                    variants={copyVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <motion.p
                      custom={dir}
                      variants={copyItemVariants}
                      className="text-sm text-muted-foreground"
                    >
                      {product.tagline}
                    </motion.p>
                    <motion.h3
                      custom={dir}
                      variants={copyItemVariants}
                      className="mt-3 font-serif text-5xl leading-[1.05] font-medium tracking-tight text-foreground xl:text-6xl"
                    >
                      {product.name}
                    </motion.h3>
                    <motion.p
                      custom={dir}
                      variants={copyItemVariants}
                      className="mt-6 text-lg leading-relaxed font-light text-muted-foreground"
                    >
                      {product.description}
                    </motion.p>
                    <motion.div
                      custom={dir}
                      variants={copyItemVariants}
                      className="mt-9 w-fit"
                    >
                      <RollingLinkButton href="/shop">
                        Buy Now
                      </RollingLinkButton>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* product */}
          <div className="relative h-[62vh]">
            <AnimatePresence initial={false} custom={dir}>
              {product && (
                <motion.div
                  key={product.slug}
                  className="absolute inset-0 grid place-items-center"
                  custom={dir}
                  variants={productVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* gentle idle float once settled */}
                  <motion.div
                    className="w-full"
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.alt}
                      width={1536}
                      height={1024}
                      sizes="(min-width: 1680px) 680px, 52vw"
                      className="mx-auto h-auto max-h-[58vh] w-auto drop-shadow-[0_40px_45px_rgb(0_0_0/0.35)]"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* progress */}
        <div className="absolute bottom-10 left-1/2 flex w-full max-w-7xl -translate-x-1/2 items-center gap-5 px-10">
          <span className="font-serif text-sm text-foreground tabular-nums">
            {String(
              Math.max(0, Math.min(index, PRODUCTS.length - 1)) + 1,
            ).padStart(2, "0")}
            <span className="text-muted-foreground">
              {" "}
              / {String(PRODUCTS.length).padStart(2, "0")}
            </span>
          </span>
          <div className="flex gap-2">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                aria-label={`Show ${p.name}`}
                aria-current={i === index}
                onClick={() => scrollToProduct(i)}
                className="group grid h-6 place-items-center"
              >
                <span
                  className={cn(
                    "block h-0.5 rounded-full transition-all duration-500",
                    i === index
                      ? "w-10 bg-primary"
                      : "w-5 bg-olive/25 group-hover:bg-olive/50",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Mobile: swipe carousel ───────────────────────── */

const slideImageVariants: Variants = {
  hidden: { opacity: 0.25, x: 60 },
  shown: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_OUT_QUINT },
  },
};
const slideCopyVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  shown: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.18, duration: 0.8, ease: EASE_OUT_QUINT },
  },
};

function MobileCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const seen = useInView(sectionRef, { once: true, amount: 0.3 });
  // Cards reveal once (slide in) and then stay visible: hiding them again
  // when they leave made every card blank mid-swipe.
  const [revealed, setRevealed] = useState<number[]>([]);
  const [active, setActive] = useState(0);

  const goTo = (i: number) => {
    const scroller = scrollerRef.current;
    const card = scroller?.children[i] as HTMLElement | undefined;
    if (!scroller || !card) return;
    scroller.scrollTo({
      left: card.offsetLeft - (scroller.clientWidth - card.clientWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <div ref={sectionRef} className="py-20">
      <header className="px-4 text-center sm:px-6">
        <FadeIn>
          <p className="text-[11px] font-medium tracking-[0.18em] text-primary uppercase sm:text-[13px] sm:tracking-[0.28em]">
            Featured Products
          </p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <span
            aria-hidden
            className="mx-auto mt-6 block h-px w-12 bg-primary"
          />
        </FadeIn>
      </header>

      {/* A horizontal scroller also clips vertically: the extra top/bottom
          padding (cancelled by negative margins) leaves room for the product
          drop shadow and the button shadow. */}
      <div
        ref={scrollerRef}
        className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[7.5vw] pt-4 pb-12 -mb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PRODUCTS.map((p, i) => (
          <motion.article
            key={p.slug}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${PRODUCTS.length}: ${p.name}`}
            className="flex w-[85vw] max-w-md shrink-0 snap-center flex-col items-center text-center"
            viewport={{ root: scrollerRef, amount: 0.5 }}
            onViewportEnter={() => {
              setActive(i);
              setRevealed((v) => (v.includes(i) ? v : [...v, i]));
            }}
            initial="hidden"
            animate={seen && revealed.includes(i) ? "shown" : "hidden"}
          >
            <motion.div variants={slideImageVariants} className="w-full">
              <Image
                src={p.image}
                alt={p.alt}
                width={1536}
                height={1024}
                sizes="85vw"
                className="h-auto w-full drop-shadow-[0_24px_28px_rgb(0_0_0/0.25)]"
              />
            </motion.div>
            <motion.div
              variants={slideCopyVariants}
              className="mt-4 flex flex-col items-center"
            >
              <p className="text-xs text-muted-foreground">{p.tagline}</p>
              <h3 className="mt-2 font-serif text-3xl leading-tight font-medium text-foreground">
                {p.name}
              </h3>
              <p className="mt-3 text-base leading-relaxed font-light text-muted-foreground">
                {p.description}
              </p>
              <RollingLinkButton href="/shop" className="mt-7">
                Buy Now
              </RollingLinkButton>
            </motion.div>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {PRODUCTS.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            aria-label={`Show ${p.name}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className="grid h-6 place-items-center"
          >
            <span
              className={cn(
                "block h-0.5 rounded-full transition-all duration-500",
                i === active ? "w-10 bg-primary" : "w-5 bg-olive/25",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  return (
    <section
      id="products"
      data-featured-products
      aria-label="Featured products"
    >
      <div className="hidden lg:block">
        <DesktopShowcase />
      </div>
      <div className="lg:hidden">
        <MobileCarousel />
      </div>
    </section>
  );
}
