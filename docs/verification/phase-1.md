# Verification Phase 1: verify skill + feature map

Plan and doctrine: `~/second_brain/3-resources/claude-workflows/verifier-playbook/verifier-playbook.md` (Digest §1, Phase 1 row).
Generator: pstack `create-verification-skill`, translated through pstack's `docs/harness/claude-code.md` (`.cursor/skills` → `.claude/skills`, Cursor control-ui → Playwright).

## Interview findings (from the repo, 2026-10-17, HEAD `08d3708`)

### Surface
- One surface: a static React 19 SPA in a browser. No API, no CLI, no backend.
- Routing is wouter, nested routers (`client/src/App.tsx`, `client/src/sections/ai/**/routes.tsx`).
- Live routes:
  - `/` → redirects to `/ai/prompt-engineering`; `/ai` → `/ai/prompt-engineering`
  - `/ai/prompt-engineering` `{/, /modules, /modules/:id, /tenets, /exercises, /resources}`
  - `/ai/context-engineering` `{/, /mental-model, /approaches, /tenets, /selector, /visualizer, /recipes, /case-studies, /checklist, /sources}`
  - `/ai/harness-engineering` `{/, /mental-model, /tenets, /modules, /modules/:slug, /exercises, /resources, /simulator}`
  - `/digital-brain` (canvas page), `/about`, `/design` (style guide, canvas page)
  - anything else → `NotFound` (in-app 404, HTTP 200)
- The portfolio pivot (CONTEXT.md, D-021) is planned, not live. The map covers only the routes above.

### Run
- `npm run dev` = `vite`, root `client/`, default port 5173, `server.host: true`.
- No env vars, no seed data, no auth. Dev server is ready when `/src/main.tsx` transforms, not just when the port answers.
- `npm run build` = `tsc --noEmit && vite build` (the only type gate).
- Port 5173 on this machine is already held by a vite from a different checkout (`~/orca/workspaces/learning-about-ai/proto-editorial`). A verifier that trusted "something answers on 5173" would verify the wrong code. Doctor must check port ownership and the server's working directory.

### Drive
- No existing test harness: no Playwright/Cypress specs, no test script.
- Playwright MCP is available in Claude Code sessions (`.playwright-mcp/` holds its logs).
- Google Chrome is installed, so `playwright-core` can drive it with `channel: "chrome"` and no browser download.
- Selectors: the markup has almost no ARIA labels or data attributes, but buttons and headings carry stable visible text, so role + accessible name works (`role=button[name="🧠 CoT"]`, `role=heading[name="Classic RAG"]`). Proven against the Approach Selector.
- The BrainMesh canvas (`/digital-brain`, `/design`) is opaque to DOM selectors: one `<canvas>`, `aria-hidden`. It needs a debug hook to be observable (proposal below).

### Observe
- DOM text, ARIA snapshots, screenshots, console errors, network (all via Playwright).
- Side effects: none persistent. All interactive state (selector scores, checklist ticks, exercise filters, module "Mark complete") is React `useState`; reload resets it. "Side effect" on this site means derived UI state (counters, progress bars, sorted results), URL changes, and `document.title`.
- Canvas: only via CDP (CPU trace, heap snapshot) and the proposed `window.__brain` hook.

### Isolate
- Two instances can run side by side: vite takes `--port --strictPort`, Chrome takes its own `--user-data-dir` and CDP port. No shared data dir exists.
- Each run gets a run ID, its own vite port, its own Chrome profile and CDP port, and its own evidence folder.

## Feature areas to map

1. **site-navigation**: header nav, redirects, section/volume nav, deep links, in-app 404.
2. **approach-selector**: `/ai/context-engineering/selector` six-question quiz, scoring, back, reset.
3. **exercise-library**: `/ai/prompt-engineering/exercises` tenet + level filters, count, expand.
4. **practitioner-checklist**: `/ai/context-engineering/checklist` toggles, counters, section completion.
5. **digital-brain**: `/digital-brain` console tabs, turn selector, topology scaler, and the BrainMesh canvas (gate, mount, rest-state, frame budget, leaks).

Not mapped in phase 1 (named, not hidden): context Visualizer sliders, harness ModuleDetail "Mark complete", prompt ModulePage content, `/about`, `/design`. Candidates for the maintenance loop.

## What gets built

- `.claude/skills/verify-learning-about-ai/SKILL.md`: Launch, Doctor, Drive, Evidence, Cleanup, proof bar, judge rule.
- `.claude/skills/verify-learning-about-ai/features/`: README index + one file per area above, pstack four-section format.
- `scripts/site`: Playwright CLI. Commands: `launch`, `doctor`, `open`, `click`, `expect-text`, `screenshot`, `snapshot`, `brain-state`, `cpu-trace`, `heap-snapshot`, `stop`.
- `playwright-core` as a devDependency (drives installed Chrome; dev-only tooling, not a server dep).
- `.gitignore`: un-ignore `.claude/skills/` (today `.claude/` is ignored wholesale, so the skill would never reach the repo) and ignore `.verify/` (run state + evidence).

Proposed, separate commit, needs approval before touching product code:
- `window.__brain` dev-only hook in `CanvasDirector.tsx` (`import.meta.env.DEV` guarded, so it is stripped from production builds). Exposes beat, node names/positions, frames rendered, camera position, and `renderer.info` (geometries, textures, programs, draw calls). Until it lands, `brain-state` reports canvas presence and WebGL2 only, and says the hook is missing.

## Done criteria

- [x] `docs/verification/phase-1.md` (this file) shown before building.
- [x] Skill and feature map exist with no placeholders; `SKILL.md` has frontmatter and registered as a skill in-session.
- [x] `scripts/site` commands work and are shown in the skill.
- [x] Executed once end to end: launch → doctor → drive one mapped feature (approach-selector) → evidence → cleanup.
- [x] Evidence still exists after cleanup in `.verify/evidence/<run>/`, and `.verify/` is gitignored.
- [x] Canvas instruments (`cpu-trace`, `heap-snapshot`) run once against `/digital-brain` and save files.
- [x] Not done in phase 1: evals, hook enforcement, guardrails, parallel agents.

## Result (2026-10-17, run `20261017-143636`)

Executed at commit `636726d` (hook) plus the uncommitted verify tooling. Evidence: `.verify/evidence/20261017-143636/` (142MB, mostly two heap snapshots).

| Step | Outcome |
|---|---|
| Launch | Ready on a free port with its own Chrome/CDP port; ~3s |
| Doctor | All `ok`; correctly flagged the dirty tree |
| approach-selector | All sub-features driven: answer, result (Classic RAG 14/18, scores 14 9 9 8 3 2 as computed from the scoring table), reset, back, back-subtracts, deep-dive. Console errors 0 |
| digital-brain canvas | Mount: 1 canvas, WebGL2, hook on, 5 nodes, 6 geometries. Rest budget: frames 1 → 1 idle and scrolling |
| digital-brain leak | **Regression found**: one WebGL renderer/context retained per mount (`WebGLRenderer` 1 → 6 after 5 round trips; prod build without the hook: contexts 1 → 6). Pre-existing, not caused by the hook. Logged in `docs/todo.md` |
| Cleanup | Only this run's pids killed, ports released, `.verify/runs/<id>` removed, evidence intact |

Not driven in this run (mapped, for later runs): site-navigation, exercise-library, practitioner-checklist, digital-brain widgets (console tabs, turns, topology). Exercise counts (15, CoT → 3) were checked live during the interview, not in the official run.

Surfaces the proof did not cover: Vercel's own SPA rewrite (`vercel.json`); mobile widths (the canvas gate's off path and the hamburger nav); a headed, GPU-backed Chrome (headless uses SwiftShader, so frame timings in traces are not representative of real hardware, while frame counts and leaks are).

Verdict: none issued. The author of this tooling can't judge it (judge rule). Phase 2 measures it.
