# Migration Brief v5 — Vite → Next.js 15 + GSAP + Three.js, Premium/Luxury Pass

Read this fully before writing any code. This supersedes the stack lines in
`AGENT_INSTRUCTIONS.md` and `DESIGN_SYSTEM.md` (those docs say "Next.js 15 +
GSAP" but the actual shipped app has always been React 19 + Vite 6 — confirmed
by reading the source directly, not assumed. `HANDOVER.md` Session 1 already
flagged this exact discrepancy and asked someone to reconcile it; this brief
is that reconciliation, plus the actual luxury/Three.js overhaul on top.

## What this session is

A full replacement, in place on `main`, of the current Vite SPA with a Next.js
15 App Router app. Same single-purpose conversion page, same copy, same core
identity (clay-red accent, white-dominant background, one dark beat) — but
rebuilt with real motion (GSAP + ScrollTrigger), a decorative Three.js layer
in the hero only, and a v5 visual refinement pass described below. This is
not a redesign from zero — `DESIGN_SYSTEM.md` v3/v4's thesis (oversized type,
single accent, real photography, generous whitespace, mostly-light with one
dark beat) is correct and tested; v5 deepens the material quality of that
system rather than replacing it.

**Do not re-litigate content.** `CONTENT_SPEC.md` copy is unchanged and still
used verbatim, including the placeholder rules (numeric placeholders get a
visible `PLACEHOLDER` tag; testimonials stay an empty flagged slot, never
fabricated).

## Reading order

1. This file
2. `HANDOVER.md` — most recent 2-3 entries, for history/context only (the app
   they describe is the Vite app being replaced — useful for "why," not "what
   to build")
3. `DESIGN_SYSTEM.md` v3/v4 in full — still the base thesis, see v5 deltas
   below for what changes
4. `CONTENT_SPEC.md` — copy, unchanged
5. Current `src/` — read every section component before rebuilding it. The
   data shape (steps, stats, pricing tiers, FAQ entries) is sound, reuse it
   directly. The JSX/styling is what's being rebuilt.

## Stack

- Next.js 15, App Router, TypeScript, Tailwind v4
- `gsap` + `@gsap/react` (`useGSAP` hook), ScrollTrigger registered once in a
  shared lib file
- `three` + `@react-three/fiber` + `@react-three/drei`, **hero only**, see
  "Three.js scope" below — this is the one new dependency class, treat it as
  expensive and budget accordingly
- `next/image` for every photo, replacing the hand-rolled `Image.tsx` —
  this was already flagged as the "honest equivalent, not the real thing" in
  HANDOVER.md Session 1; now that it's actually Next.js, use the real thing
- Vercel deployment target unchanged

## Why Next.js now, concretely (not just "because the docs said so")

- `next/image` gives real automatic responsive `srcset` + format negotiation
  (AVIF/WebP) + lazy loading, replacing the manually-generated 3-width WebP
  sets and custom `Image.tsx` component — less to maintain, better actual
  output.
- App Router + React Server Components let the static sections (FAQ, Lineup,
  Programs, Trust bar — anything with no client interactivity) ship zero JS,
  which matters more than usual here because GSAP + Three.js are about to add
  real client bundle weight elsewhere. Every section that doesn't need
  `'use client'` should not have it.
- Font optimization via `next/font` for Big Shoulders / Inter / JetBrains
  Mono — self-hosted, no render-blocking Google Fonts request, which directly
  helps the LCP budget below.

## Three.js scope — read this before writing any Three.js code

Decorative only, hero section only, decided deliberately for a paid-traffic
conversion page where LCP and mobile performance are launch blockers, not
optional polish (this has been a stated non-negotiable since `README.md`
v0 and was an explicit, measured launch criterion in HANDOVER.md Session 1).

**Concept:** a subtle ambient particle field behind/around the hero photo and
headline — not a literal 3D baseball/bat/stadium model, not an interactive
scene, not anything that competes with the headline or CTA for attention.
Think: a slow, low-density field of soft points or thin lines with gentle
parallax drift, reading as depth and atmosphere rather than as "a 3D thing
happening." If it were turned off, a visitor should still get the full
message and full CTA with no missing information — that's the test for
whether it's staying decorative.

**Hard implementation rules:**
- The Three.js canvas is a separate client component (`HeroScene.tsx`),
  dynamically imported with `next/dynamic`, `ssr: false`.
- It mounts **after** the hero photo and text have painted — don't let it
  block or compete with LCP. The hero photo (via `next/image`, `priority`)
  remains the actual LCP element; the canvas is a layered enhancement on top,
  given a brief opacity fade-in once mounted so it doesn't pop in jarringly.
- Respect `prefers-reduced-motion`: render zero canvas, fall back to the
  static photo + gradient overlay only, same as the no-WebGL fallback below.
- Feature-detect WebGL availability and skip rendering entirely on
  unsupported/low-end devices rather than erroring or degrading silently —
  fail to "just the photo," which is already a complete, good-looking hero.
- Low particle count (think low hundreds, not thousands), no postprocessing
  passes, no shadows, capped pixel ratio (`Math.min(devicePixelRatio, 1.5)`),
  pause the render loop (`frameloop="demand"` or a manual RAF gate) when the
  hero scrolls out of the viewport — this is a decorative layer on an ads
  landing page, not a showcase piece, treat every frame as a cost.
- Do not add Three.js anywhere else on the page. If a later session wants to
  extend it (e.g. to the HitTrax data section), that's a deliberate new
  decision with its own perf budget, not a default extension of "we already
  have the dependency."
- Bundle-check before calling this done: confirm the Three.js chunk is
  code-split away from the main bundle (it will be, via `next/dynamic`, but
  verify in the build output) and isn't loaded on any route/section other
  than the hero.

## v5 design system deltas — premium/luxury material pass

The existing thesis (white-dominant, single clay-red accent, oversized type,
real photography, one dark beat) is correct and stays. What v3/v4 never had
is *material* depth — everything is flat color blocks. v5 adds richness
without adding new competing colors, so it doesn't undo the "five colors
fighting" lesson that v3 already learned the hard way.

**Color refinements (evolve, don't replace):**
| Token | Old | New | Why |
|---|---|---|---|
| `--ink-black` | `#0B0E11` | `#0A0B0D` | Slightly warmer/richer near-black — true `#000` and flat near-blacks read cheap at this brightness range; a hair of warmth reads expensive |
| `--paper-white` | `#FAFAF8` | `#FAF8F4` | Slightly warmer off-white, same logic |
| `--accent` (clay red) | `#C9462C` | keep `#C9462C` as the interactive/CTA accent; add `--accent-deep: #9B3520` for large flat fills (e.g. a section's top border at scale, or a background tint) where the original is too saturated at large area | Keeps the tested, distinctive color but gives it a second register for "large surface" vs. "small interactive element" use, which is what was actually missing — not a new color family |
| new: `--accent-tint` | — | `#C9462C` at 6% opacity, used only as a background wash (e.g. behind the HitTrax stat row, or a hero gradient warm-up) — never as text or a border | Adds depth/warmth to white sections without introducing a new hue |

Grep rule still applies: no hex values outside this table plus the existing
`--steel-300`/`--steel-700` should appear anywhere in the codebase.

**Material/texture additions:**
- Subtle grain/noise overlay (a tiny tiled SVG or CSS `background-image` data
  URI, ~2-3% opacity) on dark sections only (`--ink-black` testimonial and
  final-CTA bands) — this is the single cheapest way to make a flat dark
  color read as a designed surface instead of a CSS default. No grain on
  light sections.
- Hero photo gradient overlay gets a slight warm tint blended into the
  existing black-to-transparent gradient (mix in `--accent-deep` at low
  opacity at the very bottom edge only) rather than a neutral black fade —
  ties the photo treatment to the accent system instead of being purely
  neutral.
- Big stat numbers (Lineup, HitTrax, Trust bar) keep their oversized scale
  per `DESIGN_SYSTEM.md` but gain a very subtle text-shadow or gradient-fill
  treatment (e.g. `--accent` at top fading slightly toward `--accent-deep`
  at the bottom of the glyph) — small move, reads noticeably more refined
  than flat fill at this size. Test contrast/legibility before committing.

**Typography — fix the gap, don't just restate it:**
The current Hero.tsx ships the H1 at `clamp(2.25rem,5vw,4rem)` — this is the
v1/v2 undersized scale, not the v3 spec's own stated
`clamp(3rem, 8vw, 6.5rem)`. This is a real regression to fix, not a new
decision: every H1 and big-stat instance must be audited against actual
rendered pixel size at 1440/768/375, the same composition check
`AGENT_INSTRUCTIONS.md` already specifies — confirm the clamp() value is
actually being hit, don't assume it from the CSS.

**Layout — one addition:**
- Section transitions get a deliberate GSAP-driven moment at the
  light-to-dark boundaries (entering the testimonial band, entering the
  final CTA band) — e.g. the dark background subtly rises/reveals via
  ScrollTrigger rather than just appearing at a hard scroll boundary. Keep
  this restrained — one clear motion idea at each of the two dark-section
  boundaries, not a different transition gimmick every time.

## Motion system (GSAP) — this is mostly net-new, current build has almost none

Per `HANDOVER.md` Session 1's own "known issues" note: no real GSAP
scroll-triggered motion exists yet anywhere in the current build — only
count-up numbers and a sticky-CTA slide-in. This session is building the
actual motion system the docs have described since v2, not refining an
existing one.

Build, all gated behind a single shared `prefers-reduced-motion` check
(`useReducedMotion` hook already exists, port it forward, make it the single
source of truth — every GSAP timeline and the Three.js mount check against
the same hook):

1. **Hero load sequence** — staggered fade/rise-in of eyebrow → H1 → subhead
   → CTA → trust line, plus the Three.js canvas fade-in once mounted (see
   above). Keep this under ~1s total, this is an ads page, don't make people
   wait to read the offer.
2. **Scroll-triggered fade-ups** — every section heading + body block, one
   consistent timing/easing curve reused everywhere (define once in
   `lib/gsap.ts`, import everywhere — don't hand-tune per section).
3. **Lineup stagger** — the 5 rows reveal with a slight stagger as the
   section enters view, oversized numbers count up simultaneously (reuse the
   existing `useCountUp` hook, trigger via ScrollTrigger instead of mount).
4. **Stat count-ups** — Trust bar, hero stat panel, HitTrax section: all
   count up on scroll-into-view, not just on mount (current hero panel
   counts up immediately on load — fine for the hero since it's
   above-the-fold immediately, but Trust bar/HitTrax should wait for
   scroll-into-view per `DESIGN_SYSTEM.md`'s existing v3 rule).
5. **Dark-section reveal** — the light-to-dark transitions described above.
6. **Sticky mobile CTA** — keep the existing slide-in-on-scroll-past-hero
   behavior, rebuild with GSAP for consistency with the rest of the motion
   system rather than mixing a CSS transition approach with everything else
   being GSAP.

Every single one of the above needs a verified `prefers-reduced-motion`
fallback (instant, final-state render, no animation) — toggle the OS setting
and confirm, the same verification standard `AGENT_INSTRUCTIONS.md` already
sets and HANDOVER.md Session 1 confirmed for the simpler current motion.

## Build order

1. Scaffold Next.js 15 App Router project in place at repo root (replace
   Vite config/entry files; keep `public/images` photo assets, they're
   reusable as-is)
2. Port design tokens into Tailwind v4 `@theme`, apply v5 color deltas above
3. `next/font` setup for the three typefaces
4. `lib/gsap.ts` (ScrollTrigger registration, shared easing/timing constants),
   `lib/useReducedMotion.ts` (ported from current hook)
5. Shared components first: `Section`, `PrimaryButton`, `StatReadoutPanel`
   (with count-up-on-scroll), photo treatment component (port `PhotoFrame.tsx`
   logic, using `next/image` instead of the custom `Image.tsx`)
6. **Hero** — get the H1 to actually hit the corrected oversized scale, port
   the photo + gradient (with v5 warm-tint addition), build `HeroScene.tsx`
   (Three.js, dynamically imported, all hard rules above), wire the load
   sequence. This is the section every reference point (NSEC photo-dominant
   composition, oversized type) is judged against — get it right before
   moving on.
7. Trust bar → Lineup → Coaches → HitTrax → Programs, in that order, porting
   each section's existing data/content directly, rebuilding the JSX/motion
8. Testimonials + Final CTA — dark bands, full-bleed verified at all three
   breakpoints, grain texture added, dark-section reveal motion
9. FAQ
10. Sticky mobile CTA (GSAP version)
11. Meta Pixel + UTM capture wiring — port `lib/metaPixel.ts` and `lib/utm.ts`
    logic directly, these aren't part of the visual overhaul

## Composition check (run against every section before calling it done)

Same checklist `AGENT_INSTRUCTIONS.md` already specifies, plus three v5
additions:
- Single-accent rule still holds, now against the v5 table (accent, accent-
  deep, accent-tint — no hex outside that set plus existing neutrals)
- H1 and every big-stat instance verified at actual rendered pixel size
  against the corrected `clamp(3rem, 8vw, 6.5rem)` scale, not assumed
- Three.js canvas: confirmed code-split (check build output), confirmed it
  doesn't render when `prefers-reduced-motion` is on or WebGL is unavailable,
  confirmed it pauses when the hero scrolls out of view
- All existing checks: no clipping/cropping at 1440/768/375, no card-ifying
  sections that shouldn't have visible card surfaces, full-bleed dark
  sections, consistent photo treatment, real `<label>`s, 44px tap targets,
  visible focus rings

## Performance — still the launch blocker, now with a Three.js-specific risk

The LCP < 2.5s target is unchanged and non-negotiable. Three.js is new risk
specifically against this target — verify, don't assume:
- Hero photo (via `next/image`, `priority`) is still the measured LCP
  element, with the canvas layered on top and excluded from LCP timing by
  mounting after initial paint
- Re-run the same throttled-network + PerformanceObserver measurement
  approach HANDOVER.md Session 1 used (Fast-3G-ish mobile profile + 4x CPU
  slowdown), confirm LCP is still under 2.5s with the Three.js layer active,
  not just with it disabled
- Confirm via build output that the Three.js/`@react-three` chunk is genuinely
  separate from the main bundle and not pulled into the initial JS payload
- Test actual frame rate / CPU usage on a mid-range mobile device profile
  (Chrome DevTools mobile CPU throttle, 4x-6x slowdown) — if the particle
  field causes janky scroll or noticeably drains battery/heat on a throttled
  profile, cut particle count further or simplify before calling this done;
  don't ship a decorative effect that makes the page feel slow

## End of session

Append a new dated entry to `HANDOVER.md` (don't edit/delete prior entries,
this log is append-only). Include: confirmation the Next.js migration is
complete and the Vite scaffold is fully removed, the Three.js implementation
approach and the specific perf numbers measured, which v5 color/material
deltas were applied, an honest visual self-assessment of whether this
actually reads as "premium/luxury" against the prior build or whether it's
drifted into looking busier without looking better, and any open questions
carried forward (pricing/testimonials/trust-bar numbers from David are still
unconfirmed real-world data, unrelated to this technical migration).
