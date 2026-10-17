# Site navigation

The site shell: header links to the AI Education volumes, Digital Brain and About; redirects from `/` and `/ai`; the volume switcher and per-volume sub-nav; deep links that survive a reload; and an in-app 404 for unknown paths.

## Sub-features

- `nav-redirect` `/` and `/ai` land on `/ai/prompt-engineering`.
- `nav-header` header links `AI Education`, `Digital Brain`, `About` route in-app and set the page title.
- `nav-volumes` the volume bar switches between Prompt, Context and Harness Engineering.
- `nav-deeplink` a deep URL loads directly (SPA fallback) with the right page and title.
- `nav-404` unknown paths render the in-app "Page Not Found".

## How to get to it (user POV)

- Type the root URL or a deep URL.
- Click header links (desktop width; below 768px they move into a hamburger menu).
- Click a volume name in the bar under the header.

## Driving it with scripts/site

Preconditions:

- Doctor is all `ok`.

- **Root redirect.** Run `scripts/site open /`. URL is `/ai/prompt-engineering`, title `Prompt Engineering | Xiong Zhi Lim`.
- **Volume redirect.** Run `scripts/site open /ai`. URL is `/ai/prompt-engineering`.
- **Header: Digital Brain.** Run `scripts/site click link "Digital Brain"` then `scripts/site expect-text "I built a brain my agent can read."` and `scripts/site page-state`. URL `/digital-brain`, title `A Brain You Can Fork | Xiong Zhi Lim`.
- **Header: AI Education.** Run `scripts/site click link "AI Education"` then `scripts/site page-state`. URL `/ai/prompt-engineering`.
- **Volumes.** Run `scripts/site click link "Context Engineering"` and `scripts/site page-state` (URL `/ai/context-engineering`), then `scripts/site click link "Harness Engineering"` and `scripts/site page-state` (URL `/ai/harness-engineering`).
- **Header: About.** Run `scripts/site click link "About"` then `scripts/site page-state`. URL `/about`, title `About | Xiong Zhi Lim`.
- **Deep link.** Run `scripts/site open /ai/context-engineering/checklist`. Title `Checklist — Context Engineering | Xiong Zhi Lim`, console errors 0. Run `scripts/site expect-text "Practitioner's Checklist"`.
- **404.** Run `scripts/site open /ai/nope` then `scripts/site expect-text "Page Not Found"`. Repeat for `/nope`.
- **Proof.** Run `scripts/site snapshot nav-404` after the 404 step and `scripts/site snapshot nav-deeplink` after the deep-link step.

## Gotchas

- The volume bar exists only on `/ai/*` pages. `/about` and `/digital-brain` have none, so the Volumes step must run from an `/ai/*` page (it follows "Header: AI Education" for that reason). Keep About after Volumes.
- `click link "Context Engineering"` can match more than one link on volume home pages (bar + body cards). If it reports 2+ matches, the page changed. Use an anchored regex and note it here, don't switch to coordinates.
- The 404 is in-app and HTTP 200 (Vercel rewrites everything to `index.html`). Never assert on status codes.
- Header links are `hidden` below 768px. At mobile width the path is the hamburger button, which has no accessible name. That path is unmapped until it gets one.
- Doctor's deep-link check only proves vite's fallback. Vercel's fallback comes from `vercel.json`, which this harness does not exercise.
