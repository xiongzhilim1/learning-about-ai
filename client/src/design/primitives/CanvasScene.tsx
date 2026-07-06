/**
 * CanvasScene — the persistent R3F stage (spec P2: one continuous stage).
 * This is the ONLY module that imports three / @react-three/fiber, so the
 * lazy import in FixedCanvas.tsx makes it the code-split scene chunk
 * (budget: < 250KB gz, spec Part 6).
 *
 * Fixed behind the content at -z-10, pointer-events none (hover states
 * arrive via raycasting from CanvasDirector at step 6+), aria-hidden —
 * every scene has a text equivalent in prose (spec Part 6).
 *
 * frameloop="demand": the canvas renders only when the director
 * invalidates it. No idle animation, ever (P4: reveal, then rest).
 */

import { Canvas } from "@react-three/fiber";
import CanvasDirector from "@/design/primitives/CanvasDirector";
import { usePageScroll } from "@/design/primitives/PageShell";

export default function CanvasScene() {
  const { progress } = usePageScroll();

  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <CanvasDirector progress={progress} />
      </Canvas>
    </div>
  );
}
