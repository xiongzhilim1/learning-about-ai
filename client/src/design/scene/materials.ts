/**
 * materials.ts — named materials for the persistent canvas.
 * One geometry family, one material vocabulary. Implementations land
 * with BrainMesh (step 6).
 *
 * Spec: Part 5, scene/materials.ts.
 */

export type MaterialName =
  | "parchment"
  | "ink"
  | "terracotta"
  | "sage"
  | "transmission";
