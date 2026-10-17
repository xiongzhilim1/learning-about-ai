# learning-about-ai verification map

This directory is the maintained source for verifying the user-facing behavior of the site. Read this index before driving, then use the matching feature file as the recipe. It maps what is live in the code, not the planned portfolio pivot.

## Baseline preconditions

- A run launched with `scripts/site launch`, `SITE_RUN` exported, and `scripts/site doctor` all `ok`.
- Doctor's commit line matches the commit (or commit + diff) you were asked to verify.
- No seed data exists or is needed. Every page starts from React's initial state on `open`.
- Never drive an instance that this run did not start.

## Driving conventions

- Start every recipe with `scripts/site open <path>` unless its preconditions say otherwise.
- Prefer `click <role> "<accessible name>"`. Use an anchored regex (`"/^Small \(/"`) only when the full name is long or ambiguous.
- Treat every command as literal. Keep quoted names, emoji, and flags unchanged.
- After each trigger, assert the result with `expect-text` before moving on.
- Mutations are in-memory only. `open` resets them, so there is nothing to restore.

## Proof and skip reporting

- Capture the trigger and the resulting state: `commands.log` plus a `snapshot` (and a `screenshot` for visual changes) right after the last trigger.
- Assert derived side effects (counters, progress text, ordering, URL, title, console errors, `brain-state`), not only that something rendered.
- Record the feature ID and entry point with every artifact name (e.g. `snapshot selector-match`).
- Report an unreachable path with the attempted command and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Full sweep order

1. [site-navigation](./site-navigation.md): if routing is broken, nothing else is reachable.
2. [approach-selector](./approach-selector.md)
3. [exercise-library](./exercise-library.md)
4. [practitioner-checklist](./practitioner-checklist.md)
5. [digital-brain](./digital-brain.md): last, because its heap work is slow and the snapshots are large.

## Not yet mapped

Context Visualizer sliders/presets, harness ModuleDetail "Mark complete", prompt ModulePage content, `/about`, `/design` (canvas review surface). Add a file here when one of these changes.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior, then exactly four H2 sections in this order:

1. `Sub-features`: short IDs, one line each.
2. `How to get to it (user POV)`: every user entry point.
3. `Driving it with scripts/site`: `Preconditions:` then labeled bullets pairing each user action with an exact command and the observable result, ending with a **Proof** bullet.
4. `Gotchas`: what usually lies.
