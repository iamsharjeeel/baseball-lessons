# Handover Log

**How to use this file — read this part every time:**
- This is the single source of truth for what has actually happened in this repo across sessions. Code comments and git history are not a substitute — write the *why* here, not just the *what*.
- **Start of a session:** read the most recent 2–3 entries (newest is at the bottom) before doing anything else.
- **End of a session:** append a new entry below using the template. Never edit or delete a previous entry — this log is append-only. If something earlier turns out to have been wrong, say so in a *new* entry; don't rewrite history.
- If you stop mid-task — ran out of context, hit a blocker, anything — log it anyway. A half-finished entry is far more useful than no entry.

**Entry template:**
```
## Session N — [date]
**Goal this session:**
**What got done:**
**Decisions made (and why):**
**Waiting on client / open questions:**
**Known issues / not done yet:**
**Next session should start with:**
```

---

## Session 0 — 2026-07-01
**Goal this session:** Set up the repo's foundational docs (README, design system, content spec, agent instructions) before any code is written. No build yet — planning only.

**What got done:** Created `README.md`, `DESIGN_SYSTEM.md`, `CONTENT_SPEC.md`, `AGENT_INSTRUCTIONS.md`, and this file. Chose "The Lineup Card" (a literal batting-order metaphor for the customer journey) and a HitTrax-style live stat readout as the page's signature design elements, grounded in NSEC's actual differentiator — data-driven, 1-on-1 coaching — rather than a generic sports-academy template.

**Decisions made (and why):**
- Stack: React 19 + TypeScript + Vite 6 + Tailwind v4, no router, no CMS. This is one conversion-focused page, not a site — added complexity isn't justified.
- Palette: Night Black / Chalk White / Clay Red / Turf Green / Scoreboard Amber, built from the literal materials of the sport (clay, chalk, turf, scoreboard LEDs) rather than NSEC's existing brand kit, since exact brand hex values weren't confirmed at time of writing.
- Page has no navigation and no exit links except phone number and one secondary "Meet the coaches" link — this is a single-purpose ad landing page, not a microsite.

**Waiting on client / open questions:**
- Real pricing for the single-lesson and 4-lesson package options (`CONTENT_SPEC.md` Section 6)
- Real testimonials (Section 7) — do not fabricate placeholders that look real
- Real "years combined coaching experience" and "athletes trained" figures for the trust bar (Section 2)
- Lead capture integration path: embedded WellnessLiving booking widget vs. custom form vs. native Meta Lead Ad form
- Whether NSEC has an existing brand color/hex guide that should override the proposed palette in `DESIGN_SYSTEM.md`
- Whether coach names/photos/bios from nacsportscenter.com/coaches/ can be reused for Section 4

**Known issues / not done yet:** No code written yet — this session was docs and planning only.

**Next session should start with:** Scaffold the Vite + React + TS + Tailwind project per the folder structure in `README.md`, then build the hero section first (`CONTENT_SPEC.md` Section 1), including the stat count-up panel described in `DESIGN_SYSTEM.md`.

## Session 1 — 2026-06-30
**Goal this session:** Scaffold the Vite + React + TS + Tailwind v4 project and build the hero section (Section 1) per `HANDOVER.md` Session 0 handoff.

**What got done:**
- Scaffolded Vite 8 + React 19 + TypeScript + Tailwind v4 project with the folder structure from `README.md` (`/src/components`, `/src/sections`, `/src/styles`, `/src/hooks`, `/src/lib`).
- Implemented design tokens in `src/styles/tokens.css` mapped to Tailwind v4 `@theme` (Night Black, Chalk White, Clay Red, Turf Green, Scoreboard Amber, Steel-700, Steel-300).
- Loaded Google Fonts: Big Shoulders (display), Inter (body), JetBrains Mono (data).
- Built `Hero` section with approved copy from `CONTENT_SPEC.md` Section 1.
- Built `StatReadoutPanel` with 900ms ease-out count-up (78 MPH / 19° / 212 FT), respecting `prefers-reduced-motion`.
- Built `PrimaryButton` component — Clay Red, correct label, hover darken, 44px min tap target.
- Added Meta Pixel init stub (`src/lib/metaPixel.ts`) — loads async when `VITE_META_PIXEL_ID` is set, fires `PageView` on load and `Lead` on CTA click.
- Added UTM capture utility (`src/lib/utm.ts`) — stores params in sessionStorage for future lead submission.
- Set page `<title>` and meta description from `CONTENT_SPEC.md` Section 0.
- Production build passes; gzipped JS ~62KB.

**Decisions made (and why):**
- Used Vite 8 (latest from `create-vite@9`) rather than pinning Vite 6 — same stack intent, current tooling.
- Meta Pixel loads via JS after mount (async) rather than a blocking `<head>` script — satisfies the no-render-blocking-scripts rule while still firing `PageView` on load.
- Hand-rolled count-up with `requestAnimationFrame` instead of Framer Motion — keeps bundle lean (one motion moment, no extra dependency).
- CTA click fires `Lead` event immediately even though booking integration is TBD — conversion tracking should be in place before the handler is wired.

**Waiting on client / open questions:**
- `VITE_META_PIXEL_ID` env var needed before Meta Pixel will actually fire in production.
- All Session 0 open questions still apply (pricing, testimonials, trust bar stats, lead capture path, brand colors, coach bios).

**Known issues / not done yet:**
- Hero section only — Sections 2–10 not built yet.
- Sticky mobile CTA bar (Section 10) not built — should be early per `CONTENT_SPEC.md`.
- Lead capture handler is stubbed (`// TODO: wire up lead capture — see HANDOVER.md` on `PrimaryButton`).
- Meta Pixel noscript fallback omitted until a real pixel ID is confirmed.

**Next session should start with:** Build Section 2 (Trust bar) and Section 3 (The Lineup / How It Works with the Lineup Card component). Consider building the sticky mobile CTA bar (Section 10) in parallel since it's high-leverage for mobile ad traffic.
