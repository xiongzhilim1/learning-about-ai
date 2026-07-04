/**
 * Cursor — additive custom cursor. The system cursor stays visible.
 * States (spec Part 4):
 *   idle — 12px cream circle at 40% opacity, 120ms lerp (ease-instrument)
 *   link — grows to 32px, terracotta tint
 *   node — 48px, terracotta stroke only, mono label under it
 *   text — hidden over prose
 * prefers-reduced-motion: lerp off, tracks 1:1. Coarse pointer: not rendered.
 *
 * Implementation lands in step 3.
 */

export type CursorState = "idle" | "link" | "node" | "text";

export default function Cursor() {
  // Skeleton: renders nothing until step 3.
  return null;
}
