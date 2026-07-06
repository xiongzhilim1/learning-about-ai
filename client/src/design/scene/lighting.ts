/**
 * lighting.ts — named lighting rigs, one per canvas mood.
 * CanvasDirector interpolates between rigs on scroll. Rigs are added
 * as their beats land (rule 4: extend the registry, not the scene).
 *
 * Spec: Part 5, scene/lighting.ts; Part 3 beat sheet for the rigs.
 */

import { palette } from "@/design/scene/palette";

export interface LightingRig {
  /** Key light intensity, bounded at 0.6 (photosensitivity budget, Part 6). */
  keyIntensity: number;
  /** Resolved palette color for the key light. */
  keyColor: string;
  /** Key light position; screen-top for the prelude rig. */
  keyPosition: [number, number, number];
  ambientIntensity: number;
}

export type LightingRigName =
  | "prelude" // Beats 00-01: single soft ambient key, warm 4000K
  | "focus" // Beat 03: depth-of-field isolation
  | "map" // Beat 05: top-down luminous
  | "actionable" // Beat 08: terracotta rim-light
  | "dim"; // Beat 10: lights down ~20% for exit

/**
 * Beat 00-01: single soft key from screen-top, warm 4000K.
 * Cream carries the warm temperature; intensity at the 0.6 ceiling
 * because it is the only key in the rig.
 */
export const prelude: LightingRig = {
  keyIntensity: 0.6,
  keyColor: palette.cream,
  keyPosition: [0, 6, 2],
  ambientIntensity: 0.55,
};

/** Registry, extended per beat. */
export const rigs: Partial<Record<LightingRigName, LightingRig>> = {
  prelude,
};
