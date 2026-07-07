# NSEC Baseball & Softball Lessons — Landing Page

## What this is
A single-purpose, paid-traffic landing page for Newtown Sports and Events Center's (NSEC) baseball & softball lesson program. This page exists to do **one thing**: turn Meta ad clicks into booked Free Skills Evaluations.

This is **not** a rebuild of nacsportscenter.com. No nav, no distractions, no competing CTAs. One job, done well.

## Source brief
Built from a live Meta ads campaign. Primary offer: **Free Skills Evaluation**, with a "Fall Ball Ready" seasonal urgency angle and HitTrax (real-time hitting data) as the core differentiator vs. generic batting cages. Full approved copy lives in `CONTENT_SPEC.md`. Visual system lives in **`design-spec.md`** (supersedes `DESIGN_SYSTEM.md`).

## Read these in order, every single session
1. **`HANDOVER.md`** — read this *first*, always. It tells you what's already built and exactly where to pick up.
2. `README.md` (this file) — orientation if you're new to the project
3. **`design-spec.md`** — locked colors, type, components, motion rules. Don't invent outside this. (`DESIGN_SYSTEM.md` is historical.)
4. `CONTENT_SPEC.md` — every word that goes on the page, section by section, in build order
5. `AGENT_INSTRUCTIONS.md` — stack, conversion/tracking requirements, definition of done, hard rules

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript + Tailwind v4 — see `MIGRATION_BRIEF_V5.md` for the full rationale and the session that migrated off Vite
- `gsap` + `@gsap/react` for scroll-triggered motion (`lib/gsap.ts` is the single source of shared easing/timing)
- Deployed to Vercel

This is one conversion-focused page, not a multi-page site. Resist adding routing, a CMS, or extra dependencies unless a `HANDOVER.md` entry explicitly calls for it.

## Conversion goal
Primary event: clicking/submitting "Book My Free Evaluation" → Meta Pixel `Lead` event fires → routes to booking (exact integration path is still TBD, see `HANDOVER.md` open questions).

## Non-negotiables
- **Mobile-first.** Most of this traffic arrives from the Instagram/Facebook in-app browser on a phone.
- **LCP under 2.5s.** The hero cannot be blocked by heavy JS or an unoptimized image.
- **No site navigation.** No links off this page except the phone number and one secondary "Meet the coaches" link. This page has one job — don't give people an exit.
- **One CTA label.** Every primary button says "Book My Free Evaluation," every time, with no wording drift across sections.

## Expected folder structure
```
/src
  /app             <- Next.js App Router entry (layout.tsx, page.tsx, globals.css)
  /components      <- shared components, incl. /components/motion GSAP primitives
  /sections        <- one component per CONTENT_SPEC.md section, same order
  /hooks
  /lib             <- gsap.ts, useReducedMotion.ts, metaPixel.ts, utm.ts
  /styles          <- design tokens from design-spec.md (CSS variables / Tailwind @theme)
README.md
design-spec.md
design-review.md
mockups/           <- hero variant HTML mockups for comparison
DESIGN_SYSTEM.md   <- historical; superseded by design-spec.md
CONTENT_SPEC.md
AGENT_INSTRUCTIONS.md
MIGRATION_BRIEF_V5.md
HANDOVER.md
```

## For the AI agent working in this repo
Start with `HANDOVER.md`. If it only has a Session 0 entry, this is a fresh build — read every doc top to bottom before writing code. If later sessions are logged, the page is already in progress — read the most recent 2-3 entries to know exactly where the last session left off, then continue from there. **Always append a new entry to `HANDOVER.md` before ending a session**, even if you didn't finish what you set out to do. See `AGENT_INSTRUCTIONS.md` for the full handover protocol.
