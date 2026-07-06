# Design System — /digital-brain immersive

Code-first design system for the Restrained Cinema direction. Source spec lives in the second brain (`1-projects/personal-site/page-digital-brain-immersive-spec.md`); this file records what shipped.

North star: the brain assembles itself as you read. If a motion doesn't help a reader understand the system, it doesn't ship.

## Tokens

Single source of truth: `design/tokens.css`, imported by `index.css`. Mirrored for Framer Motion in `design/motion.ts`. Change both together.

### Durations

| Token | Value | Use |
|---|---|---|
| `--dur-tick` | 120ms | cursor and hover primitives |
| `--dur-micro` | 240ms | micro-reveals (text lines, icons, chevrons) |
| `--dur-reveal` | 400ms | component reveals and settles |
| `--dur-transition` | 800ms | section transitions and camera arcs |
| `--dur-assembly` | 1600ms | the hero assembly, once per session |

Longer than 1600ms requires justification. Shorter than 120ms is likely invisible.

### Easing

| Token | Curve | Use |
|---|---|---|
| `--ease-editorial` | `cubic-bezier(0.22, 1, 0.36, 1)` | the default; reveals, camera moves, section transitions |
| `--ease-instrument` | `cubic-bezier(0.65, 0, 0.35, 1)` | reversible bindings; cursor follow, hover in/out, scroll scrub |
| `--ease-mechanical` | `cubic-bezier(0.4, 0, 0.6, 1)` | structural moves; rare |

Adding a fourth curve requires a written justification appended to this file.

## Primitives

| Primitive | Contract |
|---|---|
| `Reveal` | `variant="rise" \| "split" \| "uncover"`, optional `delay`. Rise is the default for text blocks; split is for section eyebrows only; uncover is for ConsoleBlock reveals only. `whileInView`, fires once, `-15%` viewport margin. |
| `Type.*` | `Display, Heading, Subhead, Body, Lede, Eyebrow, Mono, Caption`. Encapsulates font, weight, tracking, leading. No inline font decisions in components. |
| `SectionShell` | `beat` (0-11) + `tone="cream" \| "ink" \| "translucent-ink"`. Renders the beat as `data-beat` until CanvasDirector lands (step 5), then registers with it. |
| `Cursor` | Additive 12px cream circle, 120ms lerp. States: idle / link (32px terracotta) / node (48px terracotta stroke + mono label via `data-cursor="node"` + `data-cursor-label`) / text (hidden). Coarse pointer: not rendered. |
| `PageShell` | Scroll pipeline: Lenis (lerp 0.1) + `useScroll` progress via context. `canvas` prop mounts `FixedCanvas`. Immersive pages only; other routes keep native scroll. |
| `FixedCanvas` | Gate + lazy mount for the 3D stage. Imports nothing from three; `CanvasScene` is the code-split chunk (< 250KB gz), requested after first paint. Gate: reduced motion, no WebGL2, ≤768px viewport, or `deviceMemory < 4` → renders nothing (StaticBrain fallback lands step 8). |
| `CanvasScene` | The persistent R3F stage. `fixed inset-0 -z-10`, `pointer-events: none`, `aria-hidden`, `frameloop="demand"` — renders only when invalidated, no idle animation (P4). The only module that imports three/fiber. |
| `CanvasDirector` | The orchestrator. Only writer to the 3D scene (rule 3). Receives page scroll progress; interpolates named camera/lighting states from `scene/*`. Step 6: holds Beat 00 rest (canonical camera + prelude rig + BrainMesh), no scroll interpolation yet. |
| `BrainMesh` | The five-node graph (`scene/BrainMesh.tsx`). Beat 00: flat-shaded icosahedra in parchment, hub-and-spoke faint edges from `second`. Exposes `brainNodes` registry for satellites/beams at later beats. Choreographed only by CanvasDirector. |

## Scene tokens

`scene/palette.ts` resolves CSS custom properties (including the three `--canvas-*` tokens, spec Part 5 verbatim) to hex at module load via a 1x1 2D-canvas parse — three.js cannot read `oklch()`, the browser's `fillStyle` parser can. One source of truth (`tokens.css`), one propagation. `materials.ts`, `lighting.ts`, `cameras.ts` are registries extended per beat (rule 4); Beat 00 ships `parchmentNode`, `faintEdge`, the `prelude` rig, and the `canonical` camera.

## Canvas visibility

The site cream (`#F5F0E8`) is painted on `<body>` (propagates behind the `-z-10` fixed canvas), not on SiteShell's wrapper (which would paint over it). Sections control canvas visibility with their own backgrounds: opaque hides, absent/translucent reveals. All `/digital-brain` sections are currently opaque; windows open with the beat work (step 7+). `/design` has one transparent window section showing the Beat 00 rest.

## Reduced motion

First-class path, not degradation:

- Every `Reveal` variant collapses to an opacity-only 240ms fade (spec Part 6).
- `Cursor` drops the lerp and tracks 1:1.
- Lenis smooth interpolation is disabled; native scroll only.
- (From step 5+) the canvas collapses to a static SVG frame.

## Rules

1. No inline motion values. Durations, delays, easings, and reveal distances reference `motion.ts` or the CSS custom properties.
2. No new easing curves without a written justification here.
3. Only `CanvasDirector` writes to the 3D scene (applies from step 5).
4. New sections extend the beat registry, not the scene.
5. Every animated component has a reduced-motion path.
6. Enforcement is by code review; the repo has no ESLint setup, so rule 1 is checked at review time.

## Decisions

- 2026-07-04: Motion tokens live in `design/tokens.css` and are `@import`ed by `index.css` — reconciles the spec (tokens.css as source of truth) with the session brief (extend index.css). One source, one propagation.
- 2026-07-04: Reduced-motion reveals implement Part 6's 240ms opacity fade rather than Part 5's static wrapper; Part 6 is the stricter, tested budget.
