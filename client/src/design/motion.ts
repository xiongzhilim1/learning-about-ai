/**
 * motion.ts — duration and easing tokens for Framer Motion consumption.
 * Mirrors the CSS custom properties in tokens.css. One source of truth,
 * two surfaces (CSS + JS). Values land in step 3.
 *
 * Spec: Immersive Transformation Spec, Part 1 (lexicons) + Part 5 (tokens).
 */

/** Duration roles. tick=120ms, micro=240ms, reveal=400ms, transition=800ms, assembly=1600ms. */
export type DurationToken = "tick" | "micro" | "reveal" | "transition" | "assembly";

/** The three easing curves. A fourth requires written justification in docs/DESIGN_SYSTEM.md. */
export type EaseToken = "editorial" | "instrument" | "mechanical";

export type DurationMap = Record<DurationToken, number>;
export type EaseMap = Record<EaseToken, [number, number, number, number]>;
