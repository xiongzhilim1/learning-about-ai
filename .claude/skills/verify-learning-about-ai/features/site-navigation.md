# Site navigation

The site shell: header links to the AI Education volumes, Digital Brain and About; redirects from `/` and `/ai`; the volume switcher and per-volume sub-nav; deep links that survive a reload; and an in-app 404 for unknown paths.

## Sub-features

- `nav-redirect` `/` and `/ai` land on `/ai/prompt-engineering`.
- `nav-header` header links `AI Education`, `Digital Brain`, `About` route in-app and set the page title.
- `nav-volumes` the volume bar switches between Prompt, Context and Harness Engineering.
- `nav-deeplink` a deep URL loads directly (SPA fallback) with the right page and title.
- `nav-404` unknown paths render the in-app "Page Not Found".
- `nav-mobile` below 768px the header links sit behind a menu toggle (`Open menu` / `Close menu`, with `aria-expanded`); a menu link routes and closes the menu.

## How to get to it (user POV)

- Type the root URL or a deep URL.
- Click header links (desktop width).
- Below 768px, tap the menu toggle in the header, then a link in the menu.
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

`nav-mobile` (run after the steps above; it changes the viewport and resets it at the end):

- **Phone viewport.** Run `scripts/site viewport 390x844`. It prints `ok viewport {"width":390,"height":844}`. Run `scripts/site open /` and `scripts/site page-state`. Viewport is still 390×844 after the reload.
- **Closed.** Run `scripts/site expect-aria '/button "Open menu":\n {4}- img\n- /'`. The toggle is named `Open menu`, is not expanded, and the banner ends after it (no menu).
- **Open.** Run `scripts/site click button "Open menu"`, then `scripts/site expect-aria '/button "Close menu" \[expanded\]:\n {4}- img\n {2}- navigation:\n {4}- link "AI Education"/'` and `scripts/site screenshot nav-mobile-open`. The name flips to `Close menu`, it is expanded, and the menu nav follows it inside the banner.
- **Close by toggle.** Run `scripts/site click button "Close menu"`, then the **Closed** `expect-aria` again.
- **Follow a link.** Run `scripts/site click button "Open menu"`, `scripts/site click link "About"`, `scripts/site page-state` (URL `/about`, title `About | Xiong Zhi Lim`, viewport 390×844), then the **Closed** `expect-aria` again. The menu closed itself on navigation.
- **Reset.** Run `scripts/site viewport reset`. It prints `ok viewport {"width":1280,"height":813} (default)`.
- **Proof.** Run `scripts/site snapshot nav-mobile` right after the follow-a-link step, before the reset.

## Gotchas

- The volume bar exists only on `/ai/*` pages. `/about` and `/digital-brain` have none, so the Volumes step must run from an `/ai/*` page (it follows "Header: AI Education" for that reason). Keep About after Volumes.
- `click link "Context Engineering"` can match more than one link on volume home pages (bar + body cards). If it reports 2+ matches, the page changed. Use an anchored regex and note it here, don't switch to coordinates.
- The 404 is in-app and HTTP 200 (Vercel rewrites everything to `index.html`). Never assert on status codes.
- Header links are `hidden` below 768px and the toggle is `hidden` at 768px and up, so each path exists at one width only. `click link "About"` at desktop width and `click button "Open menu"` at phone width never see the other.
- The viewport override lasts until `viewport reset` or `stop`, across every command and reload. A run that skips **Reset** leaves the next recipe at phone width (`doctor` prints `info viewport`).
- A closed toggle shows no `[expanded]` in the ARIA snapshot (`aria-expanded="false"` is omitted), so the **Closed** regex pins `":` straight after the name.
- At phone width, `/ai/*` pages have a second, unnamed menu `button` in the volume bar (beside the volume title). It is not the header toggle and is not mapped here.
- Doctor's deep-link check only proves vite's fallback. Vercel's fallback comes from `vercel.json`, which this harness does not exercise.
