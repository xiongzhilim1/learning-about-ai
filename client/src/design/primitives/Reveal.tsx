/**
 * Reveal — the standard reveal motion. Three variants, no section invents a fourth:
 *   rise    — translates from 24px below to rest, fading in. Default for text blocks.
 *   split   — a horizontal line divides and separates. Section eyebrows only.
 *   uncover — content behind a rising cream mask. ConsoleBlock reveals only.
 *
 * Respects prefers-reduced-motion as a first-class path (static wrapper).
 * Implementation lands in step 3. Spec: Part 4, section transitions.
 */

import type { ReactNode } from "react";

export type RevealVariant = "rise" | "split" | "uncover";

export interface RevealProps {
  variant?: RevealVariant;
  /** Stagger delay in seconds. Reference motion.ts durations for steps. */
  delay?: number;
  children: ReactNode;
}

export default function Reveal({ children }: RevealProps) {
  // Skeleton: renders children statically until step 3.
  return <>{children}</>;
}
