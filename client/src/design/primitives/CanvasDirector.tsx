/**
 * CanvasDirector — the orchestrator (spec Part 5). Lives once, inside the
 * R3F canvas. Given the beat registry, it interpolates between the named
 * camera and lighting states in scene/cameras.ts and scene/lighting.ts,
 * driven by page scroll progress (P3: scroll is a scrubber, not a trigger).
 *
 * Rule 3 (spec Part 5): only CanvasDirector writes to the 3D scene.
 * Components communicate with it via bindings, never directly.
 *
 * Step 5 skeleton: receives the scroll MotionValue and renders nothing.
 * Interpolation logic lands with BrainMesh and the beat work (steps 6+).
 */

import type { MotionValue } from "framer-motion";

export interface CanvasDirectorProps {
  /** Whole-page scroll progress (0 → 1) from PageShell. */
  progress: MotionValue<number>;
}

export default function CanvasDirector({ progress }: CanvasDirectorProps) {
  void progress; // consumed from step 6 — drives camera/lighting interpolation
  return null;
}
