# Practitioner checklist

A pre-deployment checklist on the Context Engineering volume. Users tick items. A global "N of M items checked" counter, a progress bar, and per-section "k/n" badges update, and a fully ticked section turns green.

## Sub-features

- `check-toggle` clicking an item ticks it (strikethrough), and clicking again unticks it.
- `check-count` the global counter and the section badge track ticks.
- `check-section-complete` a section with every item ticked shows `n/n`.
- `check-print` the Print button opens the browser print dialog.

## How to get to it (user POV)

- Context Engineering sub-nav → Checklist.
- Direct URL `/ai/context-engineering/checklist`.

## Driving it with scripts/site

Preconditions:

- Doctor is all `ok`.

- **Sub-nav entry.** Run `scripts/site open /ai/context-engineering`, then `scripts/site click link "Checklist"` and `scripts/site page-state`. URL is `/ai/context-engineering/checklist`. Run `scripts/site expect-text "/^0 of 34 items checked$/"`.
- **Tick one.** Run `scripts/site click button "/^Have I identified which secondary approaches/"` then `scripts/site expect-text "/^1 of 34 items checked$/"` and `scripts/site expect-text "1/4"`.
- **Untick.** Click the same item again, then `scripts/site expect-text "/^0 of \d+ items checked$/"`.
- **Complete a section.** Tick all four Architecture Selection items: `/^Have I chosen my primary approach/`, `/^Have I identified which secondary approaches/`, `/^Have I benchmarked against the simplest/`, `/^Do I understand the cost\/latency/`. Then `scripts/site expect-text "4/4"` and `scripts/site expect-text "/^4 of \d+ items checked$/"`.
- **Proof.** Run `scripts/site snapshot check-section-complete` and `scripts/site screenshot check-section-complete` (the green section is visual-only, so the screenshot is the proof).

## Gotchas

- The volume home has two checklist links: sub-nav `Checklist` and a body card `Pre-Flight Checklist`. Use the exact name `"Checklist"`. The regex `/Checklist/` matches both and `click` refuses.
- Ticks are in-memory. `open` or a reload resets to 0. That is expected, not a regression.
- `expect-text "1/4"` can match other sections' badges once several are partly ticked. Assert the global counter too.
- `check-print` calls `window.print()`, which headless Chrome swallows. It is unverifiable here. Report it as skipped with that reason.
- Item text contains `/` and `?`. Escape them in regex names.
