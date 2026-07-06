/**
 * palette.ts — 3D-scene color values. Must mirror tokens.css.
 * Read via a JS bridge at module load so tokens.css stays the single
 * source of truth: each CSS custom property is resolved through a 1x1
 * 2D canvas because three.js Color cannot parse oklch() strings, but
 * the browser's fillStyle parser can. One source, one propagation.
 *
 * This module lives in the scene chunk, which only loads in-browser
 * after the WebGL2 gate passes — document access is safe here.
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

const cssVars: Record<PaletteKey, string> = {
  cream: "--color-cream",
  parchment: "--color-parchment",
  ink: "--color-ink",
  terracotta: "--color-terracotta",
  sage: "--color-sage",
  canvasVoid: "--canvas-void",
  canvasGlow: "--canvas-glow",
  canvasFog: "--canvas-fog",
};

/** Resolve a CSS color string (incl. oklch) to #rrggbb via the 2D canvas parser. */
function toHex(cssColor: string): string {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return "#808080";
  ctx.fillStyle = cssColor;
  ctx.fillRect(0, 0, 1, 1);
  const data = ctx.getImageData(0, 0, 1, 1).data;
  return `#${[data[0], data[1], data[2]]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")}`;
}

function readPalette(): ScenePalette {
  const styles = getComputedStyle(document.documentElement);
  const out = {} as ScenePalette;
  for (const key of Object.keys(cssVars) as PaletteKey[]) {
    out[key] = toHex(styles.getPropertyValue(cssVars[key]).trim());
  }
  return out;
}

export const palette: ScenePalette = readPalette();
