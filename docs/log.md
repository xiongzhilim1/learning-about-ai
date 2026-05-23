# Project Log

Append-only record of actions taken on this project. Most recent first.

---

## 2026-05-23

### Session 4 — About Me page

**New page + nav + route:**
- Created `client/src/pages/AboutMe.tsx` — four-section page after iteration: Hero / 01 · Who I am / 02 · How I got here / 03 · What I keep returning to / Let's swap insights (CTA).
- Added `/about` route in `App.tsx`.
- Added "About" link to `SiteShell.tsx` desktop + mobile nav with `isAbout` location check, matching existing terracotta active-state styling.
- Fixed pre-existing wouter base-concatenation bug in `sections/ai/routes.tsx` — the inner `<Router base="/ai">` was prepending `/ai` to its redirect target, causing `/ai` to redirect to `/ai/ai/prompt-engineering`. Latent before; exposed when the new nav let users click "AI Education" from `/about`.

**Editorial design:**
- Each content section gets a small caps numbered eyebrow ("01 · WHO I AM"), a lucide icon in a tinted square (Anchor / Route / Flame), and a larger lead paragraph for magazine-style hierarchy.
- Formation section sits on dark `#2D2A26` with sage `#7B9E87` accents (icon, eyebrow, principle headers in peach `#F5C4A1`).
- Thesis is a left-bordered pull-quote in the Who I am section, with a separate "Where I'm leaning, for now:" stake line underneath.

**Voice rules (per user feedback, iterated through session):**
- Zero em-dashes anywhere on the page (user reads them as AI tell).
- Zero ellipses (user reads them as weak/uncertain).
- Long flowing comma-rich sentences over chopped staccato. Match user's LinkedIn synthesis cadence, not produced essay cadence.
- Voice intentionally avoids concrete numbers, shipped projects, or named moments/people — identity-first, CV proof lives on the LinkedIn link. Saved as `feedback_personal_writing_no_facts` memory.

**Content sources:**
- User-pasted LinkedIn synthesis + age-19 Air Force opener + thesis HMW.
- `~/Downloads/Resume_Lim Xiong Zhi_CA260428.pdf` for journey beats.
- `~/formation_brain/wiki/` (index, beauty, productive-tension, beholding, purpose, work-theology, intentional-living) for the formation voice — content paraphrased into user's register, credited inline via a link to Karpathy's LLM Wiki gist.

**Critical-lens audit applied** (Shreyas Doshi / Tim Keller / tech leaders) — landed: thesis ends with `?`, "I love life" paragraph closes on "That is what makes a small life beautiful", 2 Corinthians 3:18 + Shreyas credit added to "Transformation follows attention", "watching" → "building toward" in agentic-economy line, added spike sentence on second-brains ("only feels alive when it has opinions"), added "Where I'm leaning, for now:" stake under thesis, removed duplicate "I'm a Christian" from work-as-co-creation, cut "That, honestly, is part of why this site exists" from Beauty principle.

**Verified** in browser at 1280×900 and 390×844, multiple iterations through the session. Type check clean.

---

## 2026-05-21

### Session 3 — Context Engineering + Harness Engineering integration

**Phase 0 — Setup:**
- Added `text-sienna` and `bg-parchment` CSS custom color tokens to `index.css` (@theme block)
- framer-motion already present as dependency

**Phase 1 — Registry + routing scaffold:**
- Added Context Engineering and Harness Engineering sections to `siteConfig.ts` (3 sections total)
- Created `context-engineering/routes.tsx` + `ContextEngineeringLayout.tsx` (10 nav items, sienna accent, Compass icon)
- Created `harness-engineering/routes.tsx` + `HarnessEngineeringLayout.tsx` (8 nav items, sage accent, Network icon)
- Updated `sections/ai/routes.tsx` with 2 new route entries
- Updated `AiLanding.tsx` with section icons (MessageSquare, Compass, Network)

**Phase 2 — Context Engineering migration (10 pages):**
- Copied `data.ts` (733 lines) — 7 concepts, 6 approaches, 12 tenets, 28 sources, checklist, recipes, metrics
- Copied and adapted 10 pages: Home, MentalModel, Approaches, Tenets, Selector, Visualizer, Recipes, CaseStudies, Checklist, Sources
- Fixed data imports (`@/lib/data` → `@/sections/ai/context-engineering/lib/data`)
- Fixed font references (`var(--font-display)` → `'Fraunces', serif`)
- Replaced 4 CloudFront image URLs with gradient placeholders (Home, MentalModel, Approaches, Sources)
- Added `useTitle()` to all 10 pages
- Zero type errors after migration

**Phase 3 — Harness Engineering migration (9 pages):**
- Copied 6 content files (modules.ts 2,052 lines, sources.ts 815 lines, tenets.ts 412 lines, exercises, mentalModel, proficiency)
- Copied and adapted Pieces.tsx (LevelBadge, TenetChip, PageHeader, CompletionDot) — fixed imports, converted primary→sage, label-mono→inline
- Migrated 8 pages + created SimulatorPlaceholder ("Coming Soon")
- Stripped all Manus deps: Layout wrapper (8 pages), useModuleProgress (3 uses), useExerciseProgress (1), useAuth (1), trpc (4 calls)
- Rewrote Proficiency.tsx — replaced tRPC/auth with local state self-assessment
- Converted dark-mode styling to Workshop light mode across all pages: oklch→hex, emerald-300→600, panel→border bg-card, glow-border→shadow-sm
- Added Fraunces serif headings and Source Sans 3 body fonts throughout
- Added `useTitle()` to all 9 pages

**Phase 4 — Build verification:**
- `npx tsc --noEmit` — zero type errors
- `npm run build` — clean build (1,041 KB JS, 72 KB CSS)
- Zero Manus remnants (no cloudfront, ManusDialog, useAuth, trpc, Layout references)
- 26 total pages across 3 sections

---

## 2026-05-20

### Session 2 — Parent site scaffold + audit fixes

- Added per-page `<title>` tags via `useTitle` hook across all 10 pages (e.g., "Module 3: Persona & Tone | Sean Lim")
- Added OG meta tags and Twitter Card tags in `index.html` for social sharing
- Verified breadcrumbs hide correctly on section home, show full path on inner pages
- Created `docs/log.md`, `docs/decision_log.md`, `docs/todo.md` for persistent project tracking

## 2026-05-19

### Session 1 — Strip Manus + scaffold parent site

**Manus stripping (early session):**
- Imported Manus export zip, set up as `~/prompting-mastery`
- Stripped all Manus dependencies: auth (OAuth, JWT, session cookies), backend (Express, tRPC, Drizzle ORM, MySQL), AI chat playground (LLM proxy), Manus CDN images (replaced with gradient backgrounds), dashboard/admin pages
- Deleted ~40 unused Radix UI components, kept only 7 actually used (button, card, label, separator, sonner, spinner, tooltip)
- Fixed `sonner.tsx` to use local ThemeContext instead of removed `next-themes`
- Trimmed `package.json` from ~60 to ~20 dependencies
- Confirmed builds and runs locally as pure static Vite app

**Parent site scaffold (later session):**
- Created three-tier navigation architecture: SiteShell (site chrome) > SectionLayout (domain tabs) > PromptEngineeringLayout (content nav)
- Created `lib/siteConfig.ts` — domain/section registry pattern for extensibility
- Rewrote `App.tsx` with hierarchical routing: `/` > `/ai` > `/ai/prompt-engineering/*`
- Moved 7 page files + `courseData.ts` into `sections/ai/prompt-engineering/` feature folder
- Adapted `Layout.tsx` into `PromptEngineeringLayout.tsx` (stripped footer/logo, kept content nav)
- Created `SiteLanding.tsx` and `AiLanding.tsx` landing pages
- Added `vercel.json` with SPA rewrite rule
- Fixed wouter nested `Router base` bug (bases concatenate — inner router must use relative base `/prompt-engineering` not `/ai/prompt-engineering`)
- Updated `index.html` title to "Sean Lim"

**Audit (end of session):**
- Conducted full visual + content audit across all pages
- Identified 20 issues across design/UX and content quality
- Categorized into ship-blocking, high-impact/low-effort, high-impact/medium-effort, and content polish
