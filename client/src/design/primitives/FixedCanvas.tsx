/**
 * FixedCanvas — gate + lazy mount for the persistent 3D stage.
 * Imports nothing from three; CanvasScene is the code-split chunk,
 * loaded after first paint so the prose never waits on the GPU
 * (spec Part 6: mobile bundle never loads the canvas chunk).
 *
 * Progressive enhancement gate (spec Part 2): reduced motion, no WebGL2,
 * mobile viewport, or low device memory → render nothing. The StaticBrain
 * SVG fallback for these paths lands at step 8.
 *
 * No CLS: the canvas is position: fixed and starts absent; nothing
 * reflows when it mounts.
 */

import { lazy, Suspense, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CanvasScene = lazy(() => import("@/design/primitives/CanvasScene"));

function canRender3D(): boolean {
  if (window.matchMedia("(max-width: 768px)").matches) return false;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (mem !== undefined && mem < 4) return false;
  try {
    return document.createElement("canvas").getContext("webgl2") !== null;
  } catch {
    return false;
  }
}

export default function FixedCanvas() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  // Runs after first paint; the scene chunk is not requested before this.
  useEffect(() => {
    setReady(!reduced && canRender3D());
  }, [reduced]);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <CanvasScene />
    </Suspense>
  );
}
