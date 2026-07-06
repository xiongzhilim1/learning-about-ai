/**
 * motion.ts — duration and easing tokens for Framer Motion consumption.
 * Mirrors the CSS custom properties in tokens.css. One source of truth,
 * two surfaces (CSS + JS). Change both together.
 *
 * Rule (spec Part 5): no inline motion values in components. Every
 * duration, delay, easing, or reveal distance references this module
 * or the CSS custom properties.
 */

import type { Variants } from "framer-motion";

export type DurationToken = "tick" | "micro" | "reveal" | "transition" | "assembly";
export type EaseToken = "editorial" | "instrument" | "mechanical";

/** Seconds. tick=cursor/hover, micro=text lines, reveal=components, transition=sections, assembly=hero. */
export const dur: Record<DurationToken, number> = {
  tick: 0.12,
  micro: 0.24,
  reveal: 0.4,
  transition: 0.8,
  assembly: 1.6,
};

/** The three curves. A fourth requires written justification in docs/DESIGN_SYSTEM.md. */
export const ease: Record<EaseToken, [number, number, number, number]> = {
  editorial: [0.22, 1, 0.36, 1],
  instrument: [0.65, 0, 0.35, 1],
  mechanical: [0.4, 0, 0.6, 1],
};

/** Rise reveal travel distance in px (spec Part 4: "24px below to rest"). */
export const riseOffset = 24;

/** Lenis smoothing factor (spec Part 2: "smooth: true, lerp: 0.1"). */
export const lenisLerp = 0.1;

/** Default whileInView viewport config for reveals (spec Part 5). */
export const revealViewport = { once: true, margin: "-15%" } as const;

/** Rise — default for text blocks. 400ms ease-editorial from 24px below. */
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: riseOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.reveal, ease: ease.editorial },
  },
};

/** Split — section eyebrows only. Content revealed from a center line outward. */
export const splitVariants: Variants = {
  hidden: { opacity: 0, clipPath: "inset(50% 0% 50% 0%)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: dur.reveal, ease: ease.editorial },
  },
};

/** Uncover mask — ConsoleBlock reveals only. The cream mask slides up. */
export const uncoverMaskVariants: Variants = {
  hidden: { y: "0%" },
  visible: {
    y: "-101%",
    transition: { duration: dur.reveal, ease: ease.editorial },
  },
};

/** Reduced motion — every reveal collapses to an opacity-only 240ms fade (spec Part 6). */
export const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: dur.micro, ease: ease.editorial } },
};
