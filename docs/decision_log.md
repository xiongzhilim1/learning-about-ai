# Decision Log

Records architectural and product decisions with rationale and alternatives considered.

Format: **Decision** / **Why** / **Alternatives considered** / **Sean's call**

---

## D-001: Separate repo, second brain tracks meta
- **Date**: 2026-05-19
- **Decision**: Prompting mastery lives in its own repo (`~/prompting-mastery`), not inside the second brain. The second brain project folder tracks decisions and status only.
- **Why**: PARA pattern — artifacts live outside, project folder tracks decisions. Keeps the brain lightweight.
- **Alternatives**: Monorepo inside second brain; git submodule
- **Sean's call**: Confirmed — separate repo

## D-002: Strip auth entirely (no localStorage replacement)
- **Date**: 2026-05-19
- **Decision**: Remove all auth without replacing it with localStorage-based progress tracking.
- **Why**: Public educational site doesn't need per-user progress initially. Simplest path to ship.
- **Alternatives**: localStorage progress tracking; anonymous sessions
- **Sean's call**: Confirmed — strip completely, revisit later

## D-003: Remove AI chat playground
- **Date**: 2026-05-19
- **Decision**: Remove the interactive AI chat/playground feature entirely.
- **Why**: Requires LLM API key and backend proxy — incompatible with static site. Can add back later with edge functions.
- **Alternatives**: Client-side with user's own API key; Vercel edge function proxy
- **Sean's call**: Confirmed — remove for now

## D-004: Pure static Vite build (no backend)
- **Date**: 2026-05-19
- **Decision**: Ship as a pure static Vite build with no backend.
- **Why**: Simplest path to Vercel deploy. All content is static (134KB courseData.ts). No dynamic data.
- **Alternatives**: Vercel serverless functions; edge runtime
- **Sean's call**: Confirmed

## D-005: Parent site scaffold with three-tier navigation
- **Date**: 2026-05-19
- **Decision**: Restructure into a personal site with hierarchical routing (`/` > `/ai` > `/ai/prompt-engineering`) and three-tier navigation (SiteShell > SectionLayout > ContentLayout).
- **Why**: Sean wants a personal site with AI education (frontier_brain), life/formation topics (formation_brain), and a journal. Scaffold should absorb new sections without restructuring.
- **Alternatives**: Keep as standalone prompt engineering site; subdomain per section; flat route structure
- **Sean's call**: Confirmed — scaffold now, don't need placeholders, just be ready to bring sections in

## D-006: Section registry pattern for extensibility
- **Date**: 2026-05-19
- **Decision**: Navigation components read from a `siteConfig.ts` registry rather than hardcoded nav items. Adding a section = registry entry + folder + routes file.
- **Why**: Three more modules coming (context engineering, harness engineering). Need to add sections without touching navigation components.
- **Alternatives**: Hardcoded nav with comments for future additions
- **Sean's call**: Confirmed (implicit — approved the plan)

## D-007: Deploy on Vercel (not GitHub Pages or Cloudflare)
- **Date**: 2026-05-20
- **Decision**: Deploy to Vercel free tier.
- **Why**: Zero-config for Vite, built-in SPA routing, preview deploys per PR. All three options (Vercel, GitHub Pages, Cloudflare Pages) are free — Vercel has the least friction for this stack.
- **Alternatives**: GitHub Pages (needs Actions workflow + 404.html hack for SPA); Cloudflare Pages (unlimited bandwidth but overkill)
- **Sean's call**: Confirmed — "stick with vercel plan"

## D-008: Project tracking files live in the repo, not the second brain
- **Date**: 2026-05-20
- **Decision**: `docs/log.md`, `docs/decision_log.md`, `docs/todo.md` live in `~/prompting-mastery/docs/`. Second brain project note stays high-level and links here.
- **Why**: Travels with the code, survives context resets, git gives free timestamps. Second brain project note was getting stale and embedded tracking was too sparse.
- **Alternatives**: Keep everything in the second brain project note; use GitHub Issues
- **Sean's call**: Confirmed — "the brain captures the summary and provides linkages over"

## D-009: Tracking file update rhythm — auto-write + /save-session safety net
- **Date**: 2026-05-20
- **Decision**: Claude auto-writes to tracking files throughout the session: decisions immediately when made, log + todo at natural milestones. `/save-session` command exists as a safety net before closing.
- **Why**: Decisions can't be reconstructed after context compaction (rationale, alternatives, sign-off are gone). Log and todo are lower risk (reconstructable from git). End-of-session-only saves would lose decision context to compaction in long sessions.
- **Alternatives**: Pure end-of-session save (risky for decisions); pure auto-write (no safety net if session ends abruptly); continuous write of everything (too disruptive)
- **Sean's call**: Confirmed — "you'll auto-write primarily, the /save-session skill is just a safety net before i close the session"

## D-010: Unified Workshop aesthetic with per-section accent colors
- **Date**: 2026-05-20
- **Decision**: All three sections share Fraunces/Source Sans 3/Fira Code/off-white canvas. Each gets its own accent: terracotta (prompt), sienna (context), sage (harness). Context Engineering's Cartographer aesthetic adapts easily. Harness Engineering's dark-mode blue-violet gets full light-mode conversion.
- **Why**: Three wildly different aesthetics would feel like three different sites. The Workshop identity is established and the context-engineering palette is already close. Harness is the outlier but must convert.
- **Alternatives**: Keep each section's original aesthetic; create a new shared neutral aesthetic
- **Sean's call**: Confirmed (approved plan)

## D-011: Defer Harness Simulator, ship everything else
- **Date**: 2026-05-20
- **Decision**: Ship all 10 context-engineering pages and 8 harness pages. Defer Simulator (show "Coming Soon") because it requires LLM backend. Add framer-motion as dependency (all 10 context pages use it).
- **Why**: Static site constraint. Simulator needs Claude API proxy. Everything else is pure client-side.
- **Alternatives**: Strip simulator entirely (no placeholder); build edge function proxy now; defer all of harness
- **Sean's call**: Confirmed (approved plan)

## D-012: Proficiency page — local state instead of tRPC/auth
- **Date**: 2026-05-21
- **Decision**: Rewrote Proficiency self-assessment from tRPC mutations + auth-gated queries to `useState` local state. Level selection works but doesn't persist across sessions.
- **Why**: Static site has no backend. tRPC and auth were the heaviest Manus deps. Self-assessment is still useful as a reading aid without persistence.
- **Alternatives**: localStorage persistence (viable, deferred to infra backlog); remove page entirely
- **Sean's call**: Pending review

## D-013: CloudFront images → gradient placeholders
- **Date**: 2026-05-21
- **Decision**: Replaced 4 CloudFront CDN image URLs (hero, mental-model, approaches, sources) with CSS gradient backgrounds + centered lucide icons. Same pattern used in prompt engineering section.
- **Why**: CloudFront URLs are Manus-hosted and will eventually expire. Gradients are zero-dependency and match the Workshop aesthetic.
- **Alternatives**: Download and self-host images; commission new illustrations; AI-generate replacements
- **Sean's call**: Pending review

## D-014: Dark-mode → light-mode color conversion for harness pages
- **Date**: 2026-05-21
- **Decision**: Converted all harness engineering pages from dark mode (oklch blue-violet, emerald-300/400, glow-border) to Workshop light mode (sage #5A7E66, emerald-600, border shadow-sm). Kept oklch accent colors in tenet content data (used at low alpha, subtle enough on light backgrounds).
- **Why**: Workshop design system is light-mode only. Dark mode colors on light background would be invisible or jarring.
- **Alternatives**: Support dark mode globally (scope creep); convert tenet accent colors to hex (76 occurrences, diminishing returns)
- **Sean's call**: Pending review
