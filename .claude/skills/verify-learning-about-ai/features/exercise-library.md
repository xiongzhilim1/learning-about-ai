# Exercise library

The Prompt Engineering exercise list. Users filter by tenet and by level, see a live count, and expand an exercise to read its scenario.

## Sub-features

- `ex-count` "Showing N exercises" reflects the active filters.
- `ex-filter-tenet` tenet chips (`🔍 ICL`, `🧠 CoT`, `🧩 DEC`, `🎭 ENS`, `🪞 SC`) filter, and clicking the active chip clears it.
- `ex-filter-level` level chips (`beginner`, `intermediate`, `advanced`) filter and combine with the tenet filter.
- `ex-expand` clicking an exercise card toggles its detail panel.

## How to get to it (user POV)

- Prompt Engineering sub-nav → Exercises.
- Direct URL `/ai/prompt-engineering/exercises`.

## Driving it with scripts/site

Preconditions:

- Doctor is all `ok`.

- **Sub-nav entry.** Run `scripts/site open /ai/prompt-engineering`, then `scripts/site click link "/^Exercises/"` and `scripts/site page-state`. URL is `/ai/prompt-engineering/exercises`. Run `scripts/site expect-text "Showing 15 exercises"`.
- **Tenet filter.** Run `scripts/site click button "🧠 CoT"` then `scripts/site expect-text "Showing 3 exercises"`.
- **Combine level.** Run `scripts/site click button "intermediate"` then `scripts/site expect-text "Showing 2 exercises"` and `scripts/site snapshot ex-filter-cot-intermediate`. Every listed card shows both `intermediate` and `🧠`.
- **Toggle off.** First prove the chip is on: `scripts/site click button "intermediate"` (clear the level filter) and `scripts/site expect-text "Showing 3 exercises"`. Then `scripts/site click button "🧠 CoT"` (active chip clears) and `scripts/site expect-text "Showing 15 exercises"`. Without the "Showing 3" assertion first, a dead chip passes this step.
- **Expand.** Run `scripts/site expect-text "Expected Outcome" --absent`, `scripts/site click button "/Few-Shot Email Builder/"`, then `scripts/site expect-text "Expected Outcome"` and `scripts/site snapshot ex-expanded`.
- **Collapse.** Run `scripts/site click button "/Few-Shot Email Builder/"` again, then `scripts/site expect-text "Expected Outcome" --absent` and `scripts/site snapshot ex-collapsed`.
- **Proof.** Run `scripts/site snapshot ex-filter-cot` right after the tenet filter. The expand/collapse and combine steps save their own snapshots.

## Gotchas

- There are two `All` buttons (tenet row and level row). `click button "All"` will refuse with 2 matches. Toggle the active chip off instead, or use the snapshot to confirm.
- The count text is singular at 1 ("Showing 1 exercise"). Use the regex form when the expected count could be 1.
- `courseData.ts` declares 16 `difficulty` strings, but one is the type definition. The page shows 15. Trust the page, then check `courseData.ts` if the number changes.
- Card buttons' accessible names are the whole card text (level, tenet, title, description). Match on the title with a regex.
