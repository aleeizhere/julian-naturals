"use client";

import { useEffect, useRef, useState, type SVGProps } from "react";
import { LeafIcon, MountainIcon, UsersIcon } from "lucide-react";
import { motion } from "motion/react";

import { HERO_TIMELINE } from "@/lib/motion";

/** Mortar & pestle line icon (lucide has none), matched to lucide's 24px / 1.5 stroke style. */
function MortarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M2.5 11h19" />
      <path d="M3.5 11a8.5 8.5 0 0 0 17 0" />
      <path d="M8.5 19.5 8 21.5h8l-.5-2" />
      <path d="M12.5 11 17.5 3.2a1.4 1.4 0 0 1 2.3 1.6L14.5 11" />
    </svg>
  );
}

const FEATURES = [
  { icon: LeafIcon, label: ["All-Natural", "Ingredients"] },
  { icon: MortarIcon, label: ["Handcrafted", "in Small Batches"] },
  { icon: UsersIcon, label: ["Family-", "Owned"] },
  { icon: MountainIcon, label: ["Julian,", "California"] },
] as const;

type Feature = (typeof FEATURES)[number];

/** How many decoy symbols spin past before each reel lands. */
const REEL_DECOYS = 7;
/** Delay between reels starting, left to right. */
const REEL_STAGGER = 0.18;
/** Delay between each feature's settle, once every reel has landed. */
const SETTLE_STAGGER = 0.12;
/** Scale while spinning; features settle down to 1. */
const SPIN_SCALE = 1.08;

function FeatureFace({ feature, hidden }: { feature: Feature; hidden?: boolean }) {
  const Icon = feature.icon;
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex h-full flex-col items-center gap-3 text-center"
    >
      <Icon className="size-9 shrink-0 text-primary md:size-10" strokeWidth={1.25} />
      <p className="text-[15px] leading-snug text-foreground md:text-[17px]">
        {feature.label[0]}
        <br />
        {feature.label[1]}
      </p>
    </div>
  );
}

/** Reel order: the real feature first (resting position), then decoys cycling the others. */
function reelFor(index: number): Feature[] {
  const decoys = Array.from(
    { length: REEL_DECOYS },
    (_, k) => FEATURES[(index + k + 1) % FEATURES.length],
  );
  return [FEATURES[index], ...decoys];
}

export function FeatureStrip() {
  const mountedAt = useRef(0);
  const landed = useRef(0);
  const [startDelay, setStartDelay] = useState<number | null>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  // Wait for the hero sequence when visible on load; spin right away when
  // scrolled into view later (e.g. on mobile).
  const handleEnter = () => {
    const elapsed = (performance.now() - mountedAt.current) / 1000;
    setStartDelay(Math.max(0, HERO_TIMELINE.features - elapsed));
  };

  const handleLanded = () => {
    landed.current += 1;
    if (landed.current === FEATURES.length) setSettled(true);
  };

  const playing = startDelay !== null;

  return (
    <div data-feature-strip className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
      <motion.ul
        className="grid grid-cols-2 gap-y-8 border-t border-olive/15 py-8 md:grid-cols-4 md:py-10"
        viewport={{ once: true, amount: 0.25 }}
        onViewportEnter={handleEnter}
      >
        {FEATURES.map((feature, i) => {
          const delay = (startDelay ?? 0) + i * REEL_STAGGER;
          const reel = reelFor(i);
          return (
            <li
              key={feature.label.join(" ")}
              data-feature-item
              className={i > 0 ? "md:border-l md:border-olive/15" : undefined}
            >
              <span className="sr-only">{feature.label.join(" ")}</span>
              {/* slot window: one feature tall, clips the spinning reel */}
              <motion.div
                data-feature-window
                className="relative w-full overflow-hidden"
                initial={{ opacity: 0, scale: SPIN_SCALE }}
                animate={{
                  opacity: playing ? 1 : 0,
                  scale: settled ? 1 : SPIN_SCALE,
                }}
                transition={{
                  opacity: { delay, duration: 0.5 },
                  scale: settled
                    ? { delay: i * SETTLE_STAGGER, type: "spring", stiffness: 260, damping: 16 }
                    : { duration: 0 },
                }}
              >
                {/* invisible copy sizes the window */}
                <div className="invisible">
                  <FeatureFace feature={feature} hidden />
                </div>
                <motion.div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-full"
                  initial={{ y: `-${REEL_DECOYS * 100}%`, filter: "blur(2.5px)" }}
                  animate={
                    playing
                      ? { y: "0%", filter: "blur(0px)" }
                      : { y: `-${REEL_DECOYS * 100}%`, filter: "blur(2.5px)" }
                  }
                  transition={{
                    y: { delay, type: "spring", visualDuration: 2.2, bounce: 0.25 },
                    filter: { delay: delay + 1.4, duration: 0.8, ease: "easeOut" },
                  }}
                  onAnimationComplete={playing ? handleLanded : undefined}
                >
                  {reel.map((face, k) => (
                    <div key={k} className="h-full px-2">
                      <FeatureFace feature={face} hidden />
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
}
