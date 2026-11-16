/** Shared easing + timeline for the hero entrance (seconds). */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

export const HERO_TIMELINE = {
  windLeaf: 0.2,
  image: 0.15,
  imageLeaves: 0.5,
  eyebrow: 0.7,
  heading: 0.9,
  description: 1.15,
  cta: 1.85,
  /** Feature strip starts once the hero sequence has played. */
  features: 2.1,
} as const;

/** Decorative leaf artwork (kept in a non-client module so server
 *  components can import it too). */
export const LEAF = { src: "/leaf.png", width: 1535, height: 1024 } as const;

/** Leaf PNG stem position, used as the pivot for wind sway. */
export const LEAF_STEM_ORIGIN = "75% 92%";
