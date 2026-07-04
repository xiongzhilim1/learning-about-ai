/**
 * lighting.ts — named lighting rigs, one per canvas mood.
 * CanvasDirector interpolates between rigs on scroll. Implementations
 * land with the beat work (steps 6+).
 *
 * Spec: Part 5, scene/lighting.ts; Part 3 beat sheet for the rigs.
 */

export interface LightingRig {
  /** Key light intensity, bounded at 0.6 (photosensitivity budget, Part 6). */
  keyIntensity: number;
  /** Warm color temperature expressed as a palette key reference. */
  keyColor: string;
  ambientIntensity: number;
}

export type LightingRigName =
  | "prelude" // Beats 00-01: single soft ambient key, warm 4000K
  | "focus" // Beat 03: depth-of-field isolation
  | "map" // Beat 05: top-down luminous
  | "actionable" // Beat 08: terracotta rim-light
  | "dim"; // Beat 10: lights down ~20% for exit
