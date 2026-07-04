/**
 * cameras.ts — named camera states, one per beat.
 * Only CanvasDirector reads these to drive the R3F camera. No component
 * writes to the scene directly. Implementations land with the beat work.
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
