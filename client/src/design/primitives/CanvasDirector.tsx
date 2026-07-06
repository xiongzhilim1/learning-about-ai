/**
 * CanvasDirector — the orchestrator (spec Part 5). Lives once, inside the
 * R3F canvas. Given the beat registry, it interpolates between the named
 * camera and lighting states in scene/cameras.ts and scene/lighting.ts,
 * driven by page scroll progress (P3: scroll is a scrubber, not a trigger).
 *
 * Rule 3 (spec Part 5): only CanvasDirector writes to the 3D scene.
 * Components communicate with it via bindings, never directly.
 *
 * Step 6 state: holds the Beat 00 rest — canonical camera, prelude rig,
 * BrainMesh still. No scroll interpolation yet; that lands with the
 * beat choreography (step 7+). frameloop is "demand", so the scene
 * renders once on mount and then rests (P4: reveal, then rest).
 */

import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import type { PerspectiveCamera } from "three";
import type { MotionValue } from "framer-motion";
import { canonical } from "@/design/scene/cameras";
import { prelude } from "@/design/scene/lighting";
import BrainMesh from "@/design/scene/BrainMesh";

export interface CanvasDirectorProps {
  /** Whole-page scroll progress (0 → 1) from PageShell. */
  progress: MotionValue<number>;
}

export default function CanvasDirector({ progress }: CanvasDirectorProps) {
  void progress; // consumed from step 7+ — drives camera/lighting interpolation
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const invalidate = useThree((s) => s.invalidate);

  useLayoutEffect(() => {
    camera.position.set(...canonical.position);
    camera.lookAt(...canonical.target);
    camera.fov = canonical.fov;
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, invalidate]);

  return (
    <>
      <ambientLight intensity={prelude.ambientIntensity} />
      <directionalLight
        position={prelude.keyPosition}
        intensity={prelude.keyIntensity}
        color={prelude.keyColor}
      />
      <BrainMesh />
    </>
  );
}
