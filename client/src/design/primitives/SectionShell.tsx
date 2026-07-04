/**
 * SectionShell — standard section container.
 * Provides vertical rhythm, the container max-width, and the
 * tone-appropriate background. From step 5 it also registers its beat
 * with CanvasDirector; until then the beat renders as a data attribute
 * so the registry contract is already in place.
 *
 * Tones (spec Part 5): cream (default), ink (opaque inverted),
 * translucent-ink (canvas peeks through at ~85% ink).
 */

import type { ReactNode } from "react";

export type SectionTone = "cream" | "ink" | "translucent-ink";

export interface SectionShellProps {
  /** Beat index 0-11 per the Part 3 beat sheet. */
  beat: number;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
}

const toneClasses: Record<SectionTone, string> = {
  cream: "bg-cream text-ink",
  ink: "bg-ink text-cream",
  "translucent-ink": "bg-ink/85 text-cream",
};

export default function SectionShell({
  beat,
  tone = "cream",
  className,
  children,
}: SectionShellProps) {
  const classes = ["py-24 md:py-32", toneClasses[tone], className]
    .filter(Boolean)
    .join(" ");
  return (
    <section data-beat={beat} className={classes}>
      <div className="container">{children}</div>
    </section>
  );
}
