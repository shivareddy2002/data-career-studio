import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { duration, easing, fadeInUp, staggerContainer } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Scroll-triggered reveal. Respects prefers-reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: duration.slow, ease: easing.standard, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct <Reveal>-like children on enter. */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}