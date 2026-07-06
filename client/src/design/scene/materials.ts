/**
 * materials.ts — named materials for the persistent canvas.
 * One geometry family, one material vocabulary. Props objects, not
 * THREE instances, so BrainMesh spreads them onto declarative R3F
 * materials. Colors come from palette.ts only (rule 1).
 *
 * Implemented as beats need them: parchment + faint edge land with
 * Beat 00 (step 6). Terracotta rim (Beat 08) and transmission
 * (Beat 06 agent glyph) land with their beats.
 *
 * Spec: Part 5, scene/materials.ts.
 */

import { palette } from "@/design/scene/palette";

export type MaterialName =
  | "parchment"
  | "ink"
  | "terracotta"
  | "sage"
  | "transmission";

/** Beat 00: matte parchment on nodes. Flat shading keeps the low-poly facets legible. */
export const parchmentNode = {
  color: palette.parchment,
  roughness: 0.95,
  metalness: 0,
  flatShading: true,
} as const;

/** Beat 00: single-color thin edges, present but faint. */
export const faintEdge = {
  color: palette.ink,
  transparent: true,
  opacity: 0.22,
} as const;
