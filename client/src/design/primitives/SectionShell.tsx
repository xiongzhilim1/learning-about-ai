/**
 * SectionShell — standard section container.
 * Provides max-width + vertical padding, the tone-appropriate background,
 * and (from step 5) registers its beat with CanvasDirector.
 *
 * Implementation lands in step 3. Spec: Part 5, primitives.
 */

import type { ReactNode } from "react";

export type SectionTone = "cream" | "ink" | "translucent-ink";

export interface SectionShellProps {
  /** Beat index 0-11 per the Part 3 beat sheet. */
  beat: number;
  tone?: SectionTone;
  children: ReactNode;
}

export default function SectionShell({ children }: SectionShellProps) {
  // Skeleton: renders children statically until step 3.
  return <section>{children}</section>;
}
