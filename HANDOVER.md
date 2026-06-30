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

## Session 2 — 2026-06-30
**Goal this session:** v2 stack migration (Next.js 15 + GSAP) and full-page build per updated `AGENT_INSTRUCTIONS.md` / `DESIGN_SYSTEM.md` v2 — all 10 content sections with layout choreography, motion system, and composition checks.

**What got done:**
- Migrated from Vite (PR #1) to **Next.js 15 App Router** + Tailwind v4 + GSAP/`@gsap/react`/`ScrollTrigger`.
- Archived v1 build to `/legacy-vite-build` (untouched reference).
- Built all sections in spec order: Hero (with integrated TrustBar), Lineup, Coaches, HitTrax, Programs, Testimonials, Faq, FinalCta, StickyMobileCta.
- Reused single `StatReadoutPanel` in Hero (mount-triggered count-up) and HitTrax (scroll-triggered, larger, with plain-language stat explanations).
- Wired UTM capture + Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`) on all conversion CTAs; Meet the coaches link excluded from Lead tracking.
- `npm run build` passes with zero errors.

**How each section actually looks (composition notes):**

- **Hero + TrustBar (one viewport unit):** `min-h-svh` column. Desktop: left-aligned copy hugs the `page-container` left edge at 4rem H1; stat panel sits right with clay-red radial glow + faint scoreboard grid texture behind it. Thin Steel-300 divider, then TrustBar grid (4 items with left accent borders) sits at the bottom of the hero — no scroll gap between hero CTA and trust facts. GSAP load sequence: eyebrow → H1 lines → subhead/CTA → delayed stat border draw + count-up.
- **TrustBar:** 2×2 mobile / 4-col desktop. First two slots show `[ ]` in amber with "Pending from client" sublabels. Last two are text-only with left border anchors. Composition check: **pass** — anchored to hero divider above and container edges.
- **Lineup:** Left column H2/subhead anchored to container left; Lineup Card fills right column at lg. Card rows stagger in 1–5 order on scroll. Composition check: **pass** — two-column anchor layout, not centered floating block.
- **Coaches:** Copy block left-aligned with secondary "Meet the coaches" link; dashed placeholder card right. Composition check: **pass**.
- **HitTrax:** Turf-green top border tint on section; copy left, reused StatReadoutPanel right with explanations under each stat. Composition check: **pass**.
- **Programs:** H2 anchored via left amber border accent; 3 cards in a row with featured package clay-red top border. Pricing placeholders are dashed `[ ] price` blocks. Composition check: **pass** — cards span full container width.
- **Testimonials:** Three dashed placeholder cards in a row — clearly not real quotes. Composition check: **pass**.
- **Faq:** Accordion spans left edge of container (`max-w-3xl`), bordered top/bottom. No invented section H2 (spec has none). Composition check: **pass**, though accordion is narrower than full container — intentional readable measure, anchored to left edge.
- **FinalCta:** Steel-700 band with clay-red left border accent; copy + phone/address left, CTA right at lg. Composition check: **pass**.
- **StickyMobileCta:** Fixed bottom bar, `lg:hidden`, slides up via ScrollTrigger when hero bottom crosses viewport top. Composition check: **pass**.

**Decisions made (and why):**
- Pinned **Next.js 15** (not 16 from latest create-next-app) per `AGENT_INSTRUCTIONS.md`.
- Hero includes TrustBar per layout choreography ("one composed unit") even though TrustBar is a separate component file.
- Big Shoulders loaded via CSS `@import` (next/font/google lacked override metrics); Inter + JetBrains Mono via `next/font`.
- FAQ section has no H2 in `CONTENT_SPEC.md` — used `aria-label` only, no invented heading.
- "Book a Lesson" uses `SecondaryButton` with Lead tracking; "Meet the coaches" has `trackConversion={false}` since it's the allowed exit link.

**Waiting on client / open questions:**
- `NEXT_PUBLIC_META_PIXEL_ID` for production Meta Pixel
- Trust bar stats, pricing, testimonials, coach bios — all still `[ ]` placeholders
- Lead capture handler still stubbed (`// TODO` on PrimaryButton)
- GSAP cleanup: all `useGSAP` calls use scoped refs; **moderately confident** cleanup is correct — not manually verified via route remount testing in dev

**Known issues / not done yet:**
- First Load JS ~153KB uncompressed per `next build` (Next.js framework overhead; page-specific chunk ~5.4KB gzipped). Higher than v1's ~62KB total gzipped — expected Next.js tax, not GSAP bloat, but worth monitoring.
- No `noindex` meta yet (CONTENT_SPEC says confirm with Sharjeel)
- Meta Pixel noscript fallback not added

**Next session should start with:** Visual QA at 375/768/1440px in browser; toggle `prefers-reduced-motion` in OS and verify every GSAP animation short-circuits. Wire lead capture once integration path is decided. Set `NEXT_PUBLIC_META_PIXEL_ID` and verify Pixel in Meta Events Manager.

## Session 3 — 2026-06-30
**Goal this session:** v3 full rebuild — single accent, white-dominant, photo-driven page per updated `DESIGN_SYSTEM.md` v3 and `AGENT_INSTRUCTIONS.md` v3. Rebuild every section fresh (no v2 component reuse).

**What got done:**
- Pulled v3 docs from `main` and rebuilt all section/UI components from scratch against v3 spec.
- Generated 3 AI placeholder photos (Cursor `GenerateImage`) using DESIGN_SYSTEM v3 prompts, saved to `/public/images/` (`hero.jpg`, `coach.jpg`, `facility.jpg`), all tagged `data-placeholder="true"`.
- Implemented v3 palette only: `--paper-white`, `--ink-black`, `--accent`, `--steel-300`, `--steel-700`.
- Built all 12 sections in AGENT_INSTRUCTIONS build order: Hero (photo + gradient overlay + highlighted "free."), TrustBar, Lineup, Coaches (+ facility photo), HitTrax, Programs, Testimonials (dark beat), FAQ, FinalCta (dark beat), StickyMobileCta.
- Fresh `StatReadout` component (not v2 `StatReadoutPanel`) used in HitTrax section only — v3 moves stats out of hero per design thesis.
- Lineup rebuilt as full-width rows (no bordered card, no `overflow:hidden`) with oversized accent numbers in dedicated column + `min-w-0` on content column.
- `npm run build` and `npm run lint` pass with zero errors.
- Grep confirmed no v2 color tokens in active codebase (only in `/legacy-vite-build`).

**Photography approach:** Cursor `GenerateImage` with verbatim v3 prompts (photojournalistic, desaturated, indoor cage/coach/facility). Images are placeholders until real NSEC photography arrives.

**Lineup / counter bug verification:**
- Checked Lineup markup: no `overflow-hidden` on section or parents; rows use `grid` with `min-w-0` on text column and `shrink-0` on number column; numbers live inside row grid, not absolutely positioned.
- Stat numbers in TrustBar, HitTrax, and Programs live inside normal document flow within `page-container` — no floating/absolute stat elements.
- Build compiles; responsive classes use single-column stack below `sm` for lineup numbers. **Not browser-tested at 1440/768/375 in this session** — layout structure is intentionally clip-safe but needs human spot-check on preview.

**Honest visual self-assessment vs. reference direction:**
- **Closer than v2 on:** real photography in hero/coaches/facility; white-dominant page with one dark beat (testimonials + final CTA); single accent color throughout; oversized H1 (`clamp(3rem, 8vw, 6.5rem)`) and stat scale (`clamp(3.5rem, 9vw, 7rem)`); highlighted-word treatment on "free."; fewer bordered cards (only programs + testimonial placeholders).
- **Still may drift:** AI placeholders may not match the drama/quality of real NSEC reference photography; trust bar `[ ]` placeholders at stat scale look intentionally unfinished (correct per spec but visually loud); hero doesn't yet have the exact "TRAIN LIKE A CHAMPION" gold-block density of the NSEC reference — our headline is longer and more copy-heavy; generous whitespace is improved but Programs/Coaches sections may still feel more "landing page template" than Xovera-level restraint without a live browser review.
- **Overall:** Directionally aligned with v3 brief (photo-driven, single accent, bigger type) — not confident it fully matches reference quality without stakeholder review on a deployed preview.

**Composition check (all sections):**
| Section | v3 palette | Photo | Oversized type | Card only where allowed | Clip-safe structure |
|---|---|---|---|---|---|
| Hero | ✓ | ✓ hero | ✓ H1 | ✓ no card | ✓ |
| TrustBar | ✓ | n/a | ✓ stat scale | ✓ no card | ✓ |
| Lineup | ✓ | n/a | ✓ numbers | ✓ rows not card | ✓ (needs browser QA) |
| Coaches | ✓ | ✓ coach + facility | ✓ H2 | ✓ no card | ✓ |
| HitTrax | ✓ | n/a | ✓ stats | ✓ no card | ✓ |
| Programs | ✓ | n/a | ✓ prices | ✓ cards allowed | ✓ |
| Testimonials | ✓ dark beat | n/a | ✓ H2 | ✓ inverted placeholders | ✓ |
| FAQ | ✓ | n/a | — | ✓ no card | ✓ |
| FinalCta | ✓ dark beat | n/a | ✓ H2 | ✓ no card | ✓ |
| StickyMobileCta | ✓ | n/a | — | ✓ | ✓ |

**Decisions made (and why):**
- Stats removed from hero per v3 design thesis (photo-dominant hero); HitTrax section owns the stat readout. CONTENT_SPEC still lists hero stats — v3 design system explicitly overrides.
- Used `brightness-90` hover on accent CTA instead of a second hex for hover darken — keeps single-accent rule.
- Facility photo placed in Coaches section (no separate CONTENT_SPEC section) per DESIGN_SYSTEM photography placement #3.

**Waiting on client / open questions:**
- Real NSEC photography to replace AI placeholders
- All prior `[ ]` content gaps (pricing, testimonials, trust stats, coach bios)
- `NEXT_PUBLIC_META_PIXEL_ID`, lead capture wiring, `noindex` confirmation

**Known issues / not done yet:**
- Browser responsive QA at 375/768/1440 not performed in this environment
- `prefers-reduced-motion` GSAP fallbacks implemented in code but not OS-toggled in dev
- First Load JS ~158KB (similar to v2; images add weight outside JS bundle)

**Next session should start with:** Deploy preview URL, browser QA at three breakpoints focusing on Lineup rows and stat sizing, swap AI placeholders when real photos arrive, wire lead capture.
