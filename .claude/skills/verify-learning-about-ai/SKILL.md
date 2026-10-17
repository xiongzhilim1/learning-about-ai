---
name: verify-learning-about-ai
description: Drive the real learning-about-ai site (Vite + React SPA, plus the R3F BrainMesh canvas on /digital-brain and /design) in an isolated headless Chrome and capture evidence for a PASS / PASS+NOTES / FAIL verdict. Use when verifying any user-facing change to this repo, reproducing a UI bug, checking the canvas frame budget or leaks, or when asked "does it actually work in the browser".
---

# Verify learning-about-ai

You drive the real site the way a user would and bring back evidence. All driving goes through `scripts/site` (Playwright over CDP, at the repo root). Run every command from the repo root.

Read `.claude/skills/verify-learning-about-ai/features/README.md` (and the feature files beside it) before driving. It is the maintained map of what to verify and how.

## The judge rule

- A verdict counts only when it comes from an agent that did not write the change under test. If you wrote it, collect evidence and hand off. Do not issue the verdict.
- Verdicts are exactly one of `PASS`, `PASS+NOTES`, `FAIL`, each tied to a commit (`scripts/site doctor` prints it). A dirty tree means the verdict is for "commit X + uncommitted diff", so say that.
- Inconclusive, blocked, or verified on the wrong surface (another checkout, a stale port, `npm run build` only) is **not a pass**. Report it as what it is.
- Green type-check or build is not a verdict.
- (Phase 3 will enforce this with a hook. For now it is the rule.)

## Proof bar

- **Real user path.** Click what a user clicks, from the page a user starts on. No `page.evaluate` setters, no reaching into React state. `window.__brain` is read-only observation, never a way to cause the result.
- **Trigger and result in the same capture.** Every `scripts/site` command appends `trigger -> result` to `commands.log` in the evidence dir. The proof is that log plus the snapshot/screenshot taken right after the trigger. A final screenshot alone is "look, it opens" and does not count.
- **Side effects checked.** This site persists nothing (no backend, no storage), so side effects are derived state: counters, progress text, sort order, the URL, `document.title`, console errors, and for the canvas, `brain-state` frames and renderer counts. Assert them.
- **No stale builds.** Doctor must show this checkout, this commit, a port owned by this run.
- **Skipped paths named, with the reason.** If a feature file lists an entry point you did not drive, list it under "Skipped" in the report with why.

## Launch

```bash
scripts/site launch            # optional: --run <id>
export SITE_RUN=<id printed by launch>
```

- Starts `vite` on a free port (`--strictPort`, bound to 127.0.0.1) and a headless Google Chrome with its own profile and CDP port, all under `.verify/runs/<id>/`.
- Ready means usable: launch returns only after `/src/main.tsx` transforms and Chrome answers CDP. It fails loudly with the vite log otherwise.
- No env vars, seed data, or auth exist. If `node_modules` is missing, run `npm install` first.
- Two verifiers can run side by side. Each must set its own `SITE_RUN`. With several live runs and no `SITE_RUN`, every command refuses to guess.

## Doctor

```bash
scripts/site doctor
```

Read-only. Run it first, and again whenever anything looks off. All of these must be `ok`:
vite pid alive · port owned by that pid · vite cwd is this repo · index served · `main.tsx` transforms · deep link falls back to index · Chrome answers CDP. It also prints the commit and always one tree line: `info tree clean` or `info tree dirty (N uncommitted files being served)`.

Never drive port 5173 or any server this run did not start. On this machine 5173 has been held by a vite from a different checkout (`~/orca/workspaces/...`), which serves different code.

## Drive

```bash
scripts/site open <path>                       # prints url, title, console errors (favicon 404 filtered)
scripts/site click <role> "<name>"             # exact accessible name
scripts/site click <role> "/<regex>/"          # regex name; must match exactly 1 element
scripts/site expect-text "<text>"              # waits ≤5s for visible text; exit 1 on failure
scripts/site expect-text "<text>" --absent
scripts/site expect-aria '/<regex>/'           # regex over the page's ARIA snapshot (multi-line); pins structure
scripts/site page-state                        # url, title, viewport
scripts/site viewport 390x844                  # phone viewport until `viewport reset` or `stop`
scripts/site viewport reset                    # back to 1280x813
scripts/site snapshot <name>                   # ARIA snapshot → <name>.aria.yml
scripts/site screenshot <name> [--full]        # → <name>.png
```

- Selectors are ARIA role + accessible name. The markup has few aria-labels or data attributes, so the name is the visible text (emoji included: `button "🧠 CoT"`).
- `click` fails if the name matches 0 or 2+ elements. Use an anchored regex to disambiguate. Never fall back to coordinates or nth-child.
- The tab persists between commands (one Chrome per run), so in-app state survives across `click` calls. `open` is a full page load and resets all React state.
- The Chrome window is 1280×900. The page viewport is 1280×813, which is what `page-state` reports. The width is what the canvas gate checks.
- `viewport <W>x<H>` overrides that and the override persists across commands and reloads. Emulation dies with the CDP session that set it, so the command starts a small holder process (pid in `state.json`, killed by `reset` and `stop`) that keeps one session open. It returns only once the page reports the new size. `doctor` prints the current viewport. Always `viewport reset` before a desktop recipe.
- Assert what you claim. `expect-text` proves only that the text is somewhere on the page. When the claim is about structure ("Classic RAG is first at 14/18"), use `expect-aria` with a regex that pins the value to its row. A number that appears anywhere is not a ranking.
- zsh does not word-split variables. A loop over `"open /"` passes one argument. Write each command out, or use arrays. The 3D canvas gate needs >768px width and WebGL2. Both hold here.

### Canvas instruments (BrainMesh pages only)

```bash
scripts/site brain-state [--save <name>] [--expect-frames N]   # canvas, webgl2, window.__brain.state; exit 1 if frames != N
scripts/site cpu-trace <seconds> [--scroll] [--expect-rest]     # Chrome trace JSON; --expect-rest exits 1 if any frame rendered
scripts/site heap-snapshot <name>              # forces GC, writes .heapsnapshot, prints JS heap used
```

- `window.__brain.state` (dev-only, `CanvasDirector.tsx`): `beat`, `nodes[{name, position}]`, `frames` rendered since mount, `camera`, `renderer{geometries, textures, programs, calls}`. It exists only in `vite` dev. Production builds strip it.
- Open trace JSON in `ui.perfetto.dev` or DevTools → Performance → Load profile. Open `.heapsnapshot` in DevTools → Memory → Load, and compare two snapshots.
- Both instruments refuse to run on pages without the canvas.

## Evidence

- Location: `.verify/evidence/<run>/` (gitignored). `commands.log` there is the ordered trigger→result record of the run.
- A report names: the commit (and dirty state), the run id, each feature/sub-feature ID driven, the evidence files per ID, anything skipped with the reason, and the verdict (only if you are not the author).
- Heap snapshots are 70–140MB each. Take only the ones the recipe asks for.

## Cleanup

```bash
scripts/site stop
```

Kills only this run's vite and Chrome pids (from `.verify/runs/<id>/state.json`) and deletes `.verify/runs/<id>/`. Evidence in `.verify/evidence/<id>/` is kept. Never `pkill vite` or `pkill Chrome`. Other runs and the user's own servers share those names. Run `stop` after failed attempts too, so broken runs don't strand ports.
Confirm: `ps -ax -o pid,command | grep '[.]verify/runs/<id>'` prints nothing (a plain `pgrep -f` matches its own shell), and the evidence dir still lists its files.

## Maintenance

When the app changes, keep `features/` honest with `/pstack:maintain-verification-skill`. If a journey breaks because the app regressed, report the regression. Never edit the map to match broken behavior.
