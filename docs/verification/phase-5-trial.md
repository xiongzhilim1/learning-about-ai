# Verification Phase 5 trial: 2–3 agents on real tasks

Date 2026-10-17. Base: `main` at `4618f2c`. Verify skill: `.claude/skills/verify-learning-about-ai/` (recipe-alone catch rate 5/5 in Phase 2-lite).

## Shape

1. One worktree per task (`~/learning-about-ai-trial/<slug>`, branch `trial/<slug>`), with `node_modules` cloned.
2. **Implementer agent** per task. It gets the brief below, does the work, self-checks with the verify skill, and commits on its branch. It does not issue a verdict.
3. **Verifier agent** per branch. It is fresh and did not write the change. It gets the acceptance criteria below (not the implementer's claims), runs the task checks plus a full regression sweep, and returns PASS / PASS+NOTES / FAIL tied to the commit.
4. **Sean merges** after reading the verdict. For this first trial he also reads the diff and notes where verdict and diff disagree. That disagreement count is the trust signal.

Tasks were picked to be user-visible or measurable, small, independent (disjoint files), and free of open product decisions. Not picked:
- localStorage module progress: deferred by D-002 / D-012, and the courses' fate is still open in #8.
- Copy and naming items #15–#18: these need Sean's judgment on wording and facts.

## Shared rules for implementers

- Work only in your worktree. Read `CLAUDE.md` first. It applies: think before coding, simplest diff, surgical changes, match existing style.
- Static site only. No new runtime dependencies.
- If your change alters user-visible behavior or a selector the feature map uses, update `.claude/skills/verify-learning-about-ai/features/` **in the same commit**. Never weaken an existing assertion to make it pass.
- Do **not** edit `docs/log.md`, `docs/todo.md` or `docs/decision_log.md`. Three branches appending to them would conflict. Put log lines and any decision (with alternatives) in your final report instead, and they get logged at merge.
- Self-check with `scripts/site` (`launch`, `doctor`, the relevant recipes, `stop`) and keep the evidence. You are the author, so you collect evidence but do not issue a verdict.
- Run `npm run build` before committing. It must succeed.
- Commit on your branch with a clear message ending in the Co-Authored-By line. Don't push, merge, or touch `main`.

## T1 · `fix-webgl-leak`

**Brief.** Each visit to `/digital-brain` leaves its WebGL renderer and context alive. After 5 in-app round trips (AI Education ↔ Digital Brain) the page holds 6 live WebGL2 contexts instead of 1. This reproduces in the production build too, so it's not the dev-only `window.__brain` hook. Find the root cause and fix it. Evidence of the original finding: `docs/todo.md` (WebGL item). Relevant code: `client/src/design/primitives/{FixedCanvas,CanvasScene,CanvasDirector}.tsx`, `client/src/design/scene/BrainMesh.tsx`. Update the "Known open regression" gotcha in `features/digital-brain.md` once fixed.

**Acceptance (verifier).**
- `db-canvas-leak` passes as written: `PASS live contexts == 1` after 5 round trips.
- `db-canvas-mount` (`--expect-frames 1`) and `db-canvas-rest` (`--expect-rest`) still pass. The fix must not change the frame budget.
- Full sweep of all feature files has no new failures.
- `npm run build` succeeds, and `__brain` is absent from `dist/assets/*.js`.

## T2 · `code-split-routes`

**Brief.** `npm run build` warns about chunks over 500 kB. Baseline at `82ba85c`: `index-*.js` 1,117.77 kB (340 kB gz) holds all three course volumes plus the essay pages; `CanvasScene-*.js` 891.87 kB (240.5 kB gz) is three.js, already lazy, and within its spec budget (< 250 kB gz). Split by route so the **entry chunk** drops under 500 kB, using lazy-loaded route components with a minimal fallback. Keep wouter, keep the existing `CanvasScene` lazy chunk, and add no dependencies. Every route, redirect, deep link and the in-app 404 must keep working. Report chunk sizes before and after.

**Acceptance (verifier).**
- In `npm run build` output, the entry chunk (`index-*.js`) is under 500 kB, and no chunk other than `CanvasScene-*.js` exceeds 500 kB. The warning may still print because of `CanvasScene`. That chunk is out of scope and must not have grown. `chunkSizeWarningLimit` must not be changed. Record the chunk list.
- Full sweep of all feature files has no failures (routing is the blast radius: redirects, header, volumes, deep links, 404, sub-nav entries).
- No console errors on any `open`.

## T3 · `mobile-nav-a11y`

**Brief.** Below 768px the header links collapse into a menu button with no accessible name. Screen readers announce an unlabeled button, and the verifier can't drive it (the map lists it as unmapped). Give the toggle an accessible name that reflects its state, plus `aria-expanded`, without changing the visuals. Then make it verifiable: extend `scripts/site` with a way to set the viewport, document it in `SKILL.md`, add a `nav-mobile` sub-feature with a recipe to `features/site-navigation.md` (open the menu, follow a link, confirm the menu closes and the route changes), and remove the "unmapped" gotcha. Note for `scripts/site`: each command reconnects over CDP, so a viewport override has to survive across commands. Prove that it does.

**Acceptance (verifier).**
- At a phone-size viewport, the `nav-mobile` recipe passes as written. The toggle's accessible name and `aria-expanded` change between the closed and open states, a menu link routes correctly, and the menu closes afterwards.
- The viewport override persists across separate `scripts/site` commands. After resetting to desktop width, the desktop header recipe passes.
- Full sweep at desktop width has no failures.
