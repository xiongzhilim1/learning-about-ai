/**
 * palette.ts — 3D-scene color values. Must mirror tokens.css.
 * Read via a JS bridge at module load so tokens.css stays the single
 * source of truth. Values land with the R3F work (step 5+).
 *
 * Spec: Part 5, color tokens.
 */

export type PaletteKey =
  | "cream"
  | "parchment"
  | "ink"
  | "terracotta"
  | "sage"
  | "canvasVoid"
  | "canvasGlow"
  | "canvasFog";

export type ScenePalette = Record<PaletteKey, string>;
