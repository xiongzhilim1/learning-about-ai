# Learning About AI — CLAUDE.md

A personal AI education site. First segment: an 8-module prompt engineering course ("Prompting Mastery"). Future segments: context engineering, harness engineering, and more. Built as a static site on Vercel.

## Stack

- React 19, TypeScript, Vite
- Tailwind CSS v4
- wouter (routing)
- No backend. No auth. No DB. Pure static.

## Design

- "The Workshop" aesthetic: terracotta `#C75B39`, sage `#7B9E87`, off-white canvas
- Fonts: Fraunces (headings), Source Sans 3 (body), Fira Code (code)

## Tracking files

Detailed work tracking lives in `docs/`:

- `docs/todo.md` — persistent backlog
- `docs/log.md` — session-level action log
- `docs/decision_log.md` — decisions with rationale + alternatives

After meaningful work: append to `log.md`. After a decision with tradeoffs: append to `decision_log.md`.

## Content source

All course content (modules, tenets, exercises, proficiency levels) lives in `courseData.ts` — single source of truth. Don't fork content into components; read from `courseData.ts`.

## Behavior

### 1. Think before coding
- State assumptions before implementing. If two interpretations exist, name both — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop and ask.

### 2. Simplicity first
- Minimum code that solves the problem. No speculative abstractions.
- No "configurability" unless asked.
- No error handling for impossible scenarios.
- If you wrote 200 lines and it could be 50, rewrite.

### 3. Surgical changes
- Touch only what the request names. Don't refactor adjacent code, comments, or formatting.
- Match existing style, even if you'd do it differently.
- Remove orphans your changes created. Don't delete pre-existing dead code unless asked.

### 4. Verify before claiming done
- For UI/visual changes: start the dev server and check in the browser. Type-checking is not proof the feature works.
- For content changes: read the rendered page, not just the source.
- If you can't verify visually, say so — don't claim success.

## Constraints

- Static site only. No backend, auth, or DB — this constraint holds even as the site evolves into a personal site down the line.
- Don't reintroduce server-side deps without an explicit ask.
- Deploy target: Vercel. Preview on every push.

---

**Working well if:** diffs are small and trace to the request, `decision_log.md` captures non-obvious choices, the site builds clean, and visual changes are verified in a browser before being called done.
