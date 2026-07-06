/**
 * DesignGuide — living style guide at /design (spec Part 8, step 3).
 * Renders the primitives from client/src/design so token or primitive
 * changes are reviewed against real output, not memory. Dev-facing,
 * not linked from site nav.
 */

import { useTitle } from "@/lib/useTitle";
import PageShell from "@/design/primitives/PageShell";
import Reveal from "@/design/primitives/Reveal";
import SectionShell from "@/design/primitives/SectionShell";
import { Type } from "@/design/primitives/Type";
import { dur, ease } from "@/design/motion";

const durations = Object.entries(dur) as [string, number][];
const eases = Object.entries(ease) as [string, number[]][];

export default function DesignGuide() {
  useTitle("Design System");

  return (
    <PageShell>
      <SectionShell beat={0}>
        <Type.Eyebrow className="text-terracotta">Design system</Type.Eyebrow>
        <Type.Display as="h1" className="mt-4">
          Living style guide
        </Type.Display>
        <Type.Lede className="mt-6 max-w-2xl">
          Every primitive on this page renders from client/src/design. If it
          looks wrong here, it ships wrong everywhere.
        </Type.Lede>
      </SectionShell>

      <SectionShell beat={0} tone="ink">
        <Type.Heading>Type roles</Type.Heading>
        <div className="mt-8 space-y-6">
          <Type.Display as="p">Display. The claim.</Type.Display>
          <Type.Heading as="p">Heading. The section argument.</Type.Heading>
          <Type.Subhead as="p">Subhead. The supporting move.</Type.Subhead>
          <Type.Lede>Lede. The paragraph that earns the scroll.</Type.Lede>
          <Type.Body>Body. Prose does the persuasion.</Type.Body>
          <Type.Eyebrow className="text-terracotta">
            Eyebrow. The wayfinding.
          </Type.Eyebrow>
          <div>
            <Type.Mono>mono: the artifacts, named as themselves</Type.Mono>
          </div>
          <div>
            <Type.Caption>Caption. The quiet note under a figure.</Type.Caption>
          </div>
        </div>
      </SectionShell>

      <SectionShell beat={0}>
        <Type.Heading>Reveal variants</Type.Heading>
        <Type.Caption>Scroll each into view; fires once per load.</Type.Caption>
        <div className="mt-8 space-y-12">
          <Reveal variant="rise">
            <Type.Body>rise — 24px up into rest. Default for text.</Type.Body>
          </Reveal>
          <Reveal variant="split">
            <Type.Eyebrow className="text-terracotta">
              split — section eyebrows only
            </Type.Eyebrow>
          </Reveal>
          <Reveal variant="uncover">
            <div className="bg-ink text-cream p-6">
              <Type.Mono>uncover — ConsoleBlock reveals only</Type.Mono>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell beat={0} tone="translucent-ink">
        <Type.Heading>Cursor states</Type.Heading>
        <div className="mt-8 space-y-4">
          <Type.Body>Over this prose the cursor hides.</Type.Body>
          <div>
            <a href="#cursor" className="text-terracotta underline-offset-4">
              Over this link it grows to 32px, terracotta.
            </a>
          </div>
          <div
            data-cursor="node"
            data-cursor-label="second_brain"
            className="inline-block border border-cream/40 px-6 py-4"
          >
            <Type.Mono>node target — 48px stroke + label</Type.Mono>
          </div>
        </div>
      </SectionShell>

      <SectionShell beat={0}>
        <Type.Heading>Motion tokens</Type.Heading>
        <div className="mt-8 grid gap-2 max-w-xl">
          {durations.map(([name, s]) => (
            <div key={name} className="flex items-baseline gap-4">
              <Type.Mono className="w-32">dur.{name}</Type.Mono>
              <Type.Caption>{s * 1000}ms</Type.Caption>
            </div>
          ))}
          {eases.map(([name, curve]) => (
            <div key={name} className="flex items-baseline gap-4">
              <Type.Mono className="w-32">ease.{name}</Type.Mono>
              <Type.Caption>cubic-bezier({curve.join(", ")})</Type.Caption>
            </div>
          ))}
        </div>
      </SectionShell>
    </PageShell>
  );
}
