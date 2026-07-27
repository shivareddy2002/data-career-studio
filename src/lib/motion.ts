/** Motion tokens — the only source of durations/easings for JS animations. */
export const duration = {
  instant: 0.1,
  fast: 0.15,
  base: 0.25,
  slow: 0.35,
  slower: 0.5,
  slowest: 0.7,
} as const;

export const easing = {
  standard: [0.4, 0, 0.2, 1],
  entrance: [0, 0, 0.2, 1],
  exit: [0.4, 0, 1, 1],
} as const;

export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};