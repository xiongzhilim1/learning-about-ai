# Digital brain

The long-form `/digital-brain` essay. It has three interactive widgets (console file tabs, an annotated-turn selector, a topology scaler) on top of the persistent R3F BrainMesh canvas: five nodes in a hub-and-spoke graph, held at Beat 00 rest. The canvas renders once on mount, then never again until beat choreography lands (step 7+).

## Sub-features

- `db-console-tabs` `INDEX.MD` / `LOG.MD` / `MEMORY.MD` swap the console block and its eyebrow.
- `db-turns` five annotated-turn buttons (`01T1 — NAMING AS UX` … `05T3 — APPEND-ONLY AUDIT TRAIL`) swap the annotation.
- `db-topology` `Solo` / `Small team` / `Mid-size` / `Enterprise` swap the topology diagram and spine sentence (default `Mid-size`).
- `db-canvas-mount` on desktop with WebGL2, one canvas mounts with five nodes at Beat 00.
- `db-canvas-rest` frame budget: no frames after mount, idle or scrolling (`frameloop="demand"`).
- `db-canvas-leak` leaving and returning in-app does not grow the JS heap without bound.

## How to get to it (user POV)

- Header → `Digital Brain`.
- Direct URL `/digital-brain`.

## Driving it with scripts/site

Preconditions:

- Doctor is all `ok`. The viewport is 1280 wide (the canvas gate needs >768px and WebGL2).

- **Open.** Run `scripts/site open /digital-brain`. Title `A Brain You Can Fork | Xiong Zhi Lim`, console errors 0. Run `scripts/site expect-text "I built a brain my agent can read."`.
- **Console tabs.** Run `scripts/site click button "LOG.MD"` then `scripts/site expect-text "SECOND_BRAIN / LOG.MD"`. Run `scripts/site click button "MEMORY.MD"` then `scripts/site expect-text "CLAUDE / MEMORY.MD"`.
- **Turns.** Run `scripts/site snapshot db-turns-t1` (T1 baseline), then `scripts/site click button "/T2 — SHOW YOUR WORK/"` and `scripts/site snapshot db-turns`. The annotation and code block differ from `db-turns-t1`.
- **Topology.** Run `scripts/site expect-text "Three layers. Cortex, chapters, squads."` (default). Then `scripts/site click button "Solo"` and `scripts/site expect-text "One brain, hybrid, all of it traversable."`. Then `scripts/site click button "Enterprise"` and `scripts/site expect-text "Five fractal layers. The same shape, all the way down."`.
- **Canvas mount.** Directly after a fresh `scripts/site open /digital-brain` (no clicks in between), run `scripts/site brain-state --save db-canvas-mount --expect-frames 1`. It must print `PASS frames == 1`. Also expect `canvas: 1`, `webgl2: true`, `hook: true`, `beat: 0`, five nodes named `second, formation, craft, atlas, frontier`, `renderer.geometries: 6` (5 icosahedra + 1 edge set).
- **Rest budget.** Run `scripts/site cpu-trace 3 --expect-rest` and `scripts/site cpu-trace 3 --scroll --expect-rest`. Both must print `PASS at rest` (`brain frames 1 -> 1`). Any increase means something is invalidating the scene at rest. That is a FAIL until step 7 introduces scroll-driven frames (then update this line).
- **Leak cycle.** From `/digital-brain` (fresh `open`), run `scripts/site heap-snapshot db-leak-base`. Then 5× in-app round trips: `scripts/site click link "AI Education"`, `scripts/site expect-text "Prompt Engineering"`, `scripts/site click link "Digital Brain"`, `scripts/site expect-text "I built a brain my agent can read."`. Then `scripts/site heap-snapshot db-leak-after-5`. Compare the printed `js-heap-used`. Report growth per cycle. Open both in DevTools → Memory → Comparison and look for retained `WebGLRenderer`, `BufferGeometry`, `Mesh`.
- **Proof.** Run `scripts/site snapshot db-topology` after the Enterprise step. Also keep the `commands.log` lines for `brain-state`, both `cpu-trace`s, and both `heap-snapshot`s, plus `db-turns-t1.aria.yml`, `db-turns.aria.yml` and the saved `db-canvas-mount.brain.json`.

## Gotchas

- The canvas is `aria-hidden` and invisible to snapshots. Only `brain-state`, traces, and screenshots see it. A screenshot of the canvas is decoration, not proof of state.
- `window.__brain` exists only in `vite` dev (`import.meta.env.DEV`). On a production build `hook: false` is correct, not a bug.
- `renderer.*` counts are per WebGL renderer, and each mount creates a new one. They reset on remount, so they **cannot** show a cross-mount leak. Use heap snapshots for that.
- Measure leaks with in-app clicks, not repeated `open`. Full loads leave old documents in the same heap (the bfcache is disabled by `launch`, but same-site renderer reuse still muddies the baseline). The first `open` baseline is the only full load allowed in the recipe.
- `frames` counts `useFrame` ticks since this mount. It resets on remount.
- Heap snapshots are 70–140MB. The leak recipe takes two, not more.
- In dev, React StrictMode is not enabled (`main.tsx`), so one mount = one renderer. If StrictMode is added, expect double mounts.
- **Known open regression (2026-10-17, commit `636726d`):** each mount retains one WebGL renderer and context. After 5 round trips: `WebGLRenderer` 1 → 6 in the heap snapshot, heap +~1.9MB per cycle. Reproduced on the production build (hook stripped): live WebGL2 contexts 1 → 6. Evidence: `.verify/evidence/20261017-143636/db-leak-finding.md`. Until it is fixed, `db-canvas-leak` is a FAIL. Don't weaken the recipe to make it pass.
- To count retained three.js objects, parse the snapshots with `heapcount.mjs` from that evidence dir (`node --max-old-space-size=4096 heapcount.mjs <file>.heapsnapshot`).
