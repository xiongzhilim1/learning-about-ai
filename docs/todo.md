# To-Do

Persistent backlog for the project. Checked items stay for history. Organized by priority.

---

## Ship-blocking

- [x] Add per-page `<title>` tags (#3 from audit)
- [ ] Initial git commit + push to GitHub

## High impact, low effort

- [x] Add OG meta tags for social sharing (#4)
- [x] Fix breadcrumb on section home page (#7) — verified already correct
- [ ] Add `vercel.json` SPA rewrite rule — done, but verify after deploy

## High impact, medium effort

- [ ] Add "Try it now" copyable prompt boxes in each module (#19 from audit)
- [ ] Add a brief About section / author byline (#20)
- [ ] Restore contextual footer with learning path links in prompt engineering section (#6)
- [ ] Add hero images/illustrations to replace stripped Manus CDN images (#5)

## Content polish

- [ ] Resolve "Tenets" vs "Techniques" naming inconsistency (#15)
- [ ] Make CoT / "Thought Generation" naming consistent (#16)
- [ ] Update module durations to be realistic — 10 min reads are more like 20-30 min with practice (#17)
- [ ] Add "last updated" to context window data in Module 1 (#18)

## New content — Manus imports

- [x] Import Context Engineering module from Manus (10 pages, all interactive features working)
- [x] Import Harness Engineering module from Manus (8 pages + Simulator placeholder)
- [x] Add both as new sections under `/ai/` in siteConfig.ts
- [x] Progressive learning path: Prompt Engineering > Context Engineering > Harness Engineering
- [ ] Replace gradient placeholder images with proper hero illustrations (4 context engineering pages)

## Infrastructure

- [ ] Deploy to Vercel
- [ ] Set up custom domain (if desired)
- [ ] Consider code-splitting — 1MB JS bundle warning from Vite build (was 500KB with 1 section, now 1MB with 3)
- [ ] Consider localStorage-based module completion tracking (#8 from audit)

## Future sections (no timeline)

- [ ] Life/Formation domain (`/life`) — faith, career, relationships
- [ ] Journal domain (`/journal`) — AI journal, building journal
