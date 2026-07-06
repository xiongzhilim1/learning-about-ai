/**
 * cameras.ts — named camera states, one per beat.
 * Only CanvasDirector reads these to drive the R3F camera. No component
 * writes to the scene directly. States are added as their beats land
 * (rule 4: extend the registry, not the scene).
 *
 * Spec: Part 5, scene/cameras.ts; Part 3 beat sheet for the moves.
 */

export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export type CameraStateName =
  | "canonical" // Beats 00, 01, 08, 10: three-quarter establishing shot
  | "overview" // Beat 02: pulled back and up ~15deg
  | "isolate" // Beat 03: dolly to the human node
  | "architecture" // Beat 04: pulled out, satellites visible
  | "map" // Beat 05: top-down
  | "session" // Beat 06: three-node framing
  | "spine" // Beat 07: lateral, five nodes in a line
  | "topology"; // Beat 09: very far back, instanced grid

/**
 * Beat 00: three-quarter view, mid-distance, slight downward tilt
 * (camera y sits above the graph center, looking down at it).
 */
export const canonical: CameraState = {
  position: [4.0, 2.4, 5.0],
  target: [0, 0, 0],
  fov: 38,
};

/** Registry, extended per beat. */
export const cameraStates: Partial<Record<CameraStateName, CameraState>> = {
  canonical,
};
