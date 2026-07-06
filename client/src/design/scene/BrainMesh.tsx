/**
 * BrainMesh — the five-node graph, the page's core diagram (spec P2:
 * one continuous stage; the 3D IS the diagram). Owns the base geometry
 * and Beat 00 material state. Reads nothing from scroll; CanvasDirector
 * choreographs it (rule 3).
 *
 * Beat 00 state: five nodes suspended in near-symmetric arrangement,
 * edges present but faint, no motion.
 *
 * First-pass assumptions, flagged for review:
 * - Nodes are icosahedra (low-poly, flat-shaded) — the crafted-not-chrome
 *   read of "one geometry family". The wire diagram's 2D circles become
 *   faceted solids in depth.
 * - Edge topology is hub-and-spoke from second_brain: cross-brain reads
 *   flow through the working brain (PROTOCOL.md), so the wire mirrors
 *   the protocol, not an arbitrary mesh.
 * - second_brain is slightly larger: it is the brain the agent works in.
 */

import { useMemo } from "react";
import * as THREE from "three";
import { faintEdge, parchmentNode } from "@/design/scene/materials";

export type BrainName = "second" | "formation" | "craft" | "atlas" | "frontier";

export interface BrainNode {
  name: BrainName;
  position: [number, number, number];
  /** Node radius; second_brain reads slightly larger. */
  radius: number;
}

/** Near-symmetric suspension: a loose tetrahedron around the working brain. */
export const brainNodes: BrainNode[] = [
  { name: "second", position: [0, 0, 0], radius: 0.5 },
  { name: "formation", position: [-1.9, 0.55, -0.4], radius: 0.42 },
  { name: "craft", position: [1.8, 0.7, -0.7], radius: 0.42 },
  { name: "atlas", position: [-1.1, -0.8, 0.9], radius: 0.42 },
  { name: "frontier", position: [1.25, -0.6, 1.15], radius: 0.42 },
];

const hub = brainNodes[0];

export default function BrainMesh() {
  // Hub-and-spoke edge segments: second_brain to each satellite brain.
  const edgeGeometry = useMemo(() => {
    const positions: number[] = [];
    for (const node of brainNodes.slice(1)) {
      positions.push(...hub.position, ...node.position);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    return geometry;
  }, []);

  return (
    <group>
      {brainNodes.map((node) => (
        <mesh key={node.name} position={node.position}>
          <icosahedronGeometry args={[node.radius, 0]} />
          <meshStandardMaterial {...parchmentNode} />
        </mesh>
      ))}
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial {...faintEdge} />
      </lineSegments>
    </group>
  );
}
