/**
 * Reveal — the standard reveal motion. Three variants, no section invents a fourth:
 *   rise    — translates from 24px below to rest, fading in. Default for text blocks.
 *   split   — reveals from a center line outward. Section eyebrows only.
 *   uncover — content behind a rising cream mask. ConsoleBlock reveals only.
 *
 * prefers-reduced-motion is a first-class path: every variant collapses to an
 * opacity-only 240ms fade (spec Part 6). All motion values come from motion.ts.
 */

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  dur,
  ease,
  reducedVariants,
  revealViewport,
  riseVariants,
  splitVariants,
  uncoverMaskVariants,
} from "@/design/motion";

export type RevealVariant = "rise" | "split" | "uncover";

export interface RevealProps {
  variant?: RevealVariant;
  /** Stagger delay in seconds. Compose from motion.ts durations. */
  delay?: number;
  className?: string;
  children: ReactNode;
}

const variantMap = {
  rise: riseVariants,
  split: splitVariants,
  uncover: riseVariants, // the moving part of uncover is the mask below
};

export default function Reveal({
  variant = "rise",
  delay = 0,
  className,
  children,
}: RevealProps) {
  const reduced = useReducedMotion();
  const variants = reduced ? reducedVariants : variantMap[variant];

  if (!reduced && variant === "uncover") {
    return (
      <motion.div
        className={className}
        style={{ position: "relative", overflow: "hidden" }}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        transition={{ delay }}
      >
        {children}
        <motion.div
          aria-hidden
          variants={uncoverMaskVariants}
          transition={{ duration: dur.reveal, ease: ease.editorial, delay }}
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--color-cream)",
            pointerEvents: "none",
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
