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

import { useEffect, useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Mesh, PerspectiveCamera, Texture } from "three";
import type { MotionValue } from "framer-motion";
import { canonical } from "@/design/scene/cameras";
import { prelude } from "@/design/scene/lighting";
import BrainMesh, { brainNodes } from "@/design/scene/BrainMesh";

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

  // three keeps one DFG LUT texture for the whole page, shared by every
  // renderer's standard materials, and each renderer that uploads it adds a
  // dispose listener to it. R3F's unmount never disposes that texture, so the
  // listener kept each old renderer and its WebGL context alive: one more per
  // visit. Disposing it here drops the listener; the next renderer re-uploads
  // it on first use. Layout cleanup runs before R3F disposes the materials.
  const scene = useThree((s) => s.scene);
  const gl = useThree((s) => s.gl);
  useLayoutEffect(
    () => () => {
      scene.traverse((o) => {
        const material = (o as Mesh).material;
        if (!material || Array.isArray(material)) return;
        const props = gl.properties.get(material) as {
          uniforms?: { dfgLUT?: { value: Texture | null } };
        };
        props.uniforms?.dfgLUT?.value?.dispose();
      });
    },
    [gl, scene],
  );

  // Dev-only debug hook: the canvas is opaque to DOM selectors, so the
  // verifier reads scene state from window.__brain. Stripped from prod builds.
  const frames = useRef(0);
  useFrame(() => {
    frames.current += 1;
  });
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const w = window as Window & { __brain?: unknown };
    w.__brain = {
      get state() {
        return {
          beat: 0,
          nodes: brainNodes.map((n) => ({ name: n.name, position: n.position })),
          frames: frames.current,
          camera: camera.position.toArray(),
          renderer: {
            geometries: gl.info.memory.geometries,
            textures: gl.info.memory.textures,
            programs: gl.info.programs?.length ?? 0,
            calls: gl.info.render.calls,
          },
        };
      },
    };
    return () => {
      delete w.__brain;
    };
  }, [camera, gl]);

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
