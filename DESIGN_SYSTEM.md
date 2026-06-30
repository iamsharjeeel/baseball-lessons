# Design System — NSEC Landing Page (v2)

## What changed in v2 and why
The v1 build (PR #1) implemented the tokens correctly but the page still read flat — centered hero text floating in empty space, no scale contrast, no motion, awkward dead space below the fold. That's not a token problem, it's a **layout choreography and motion** problem. v2 keeps the v1 color/type system (it was right) and adds two things that were missing: explicit spatial/scale rules per section, and a real motion system (GSAP). Stack also moves from Vite to **Next.js App Router** for native Vercel support.

If you only read one thing in this file, read **"Layout choreography"** below — that's what was actually missing, not the colors.

## Design thesis (unchanged from v1)
NSEC's differentiator is real-time coaching data (HitTrax) delivered entirely 1-on-1 — not "we teach baseball." The page should feel like the facility at night with the lights on and the scoreboard live.

**Signature element — "The Lineup Card."** The customer journey (Evaluation → Plan → 1-on-1 Coaching → Data Tracking → Game-Ready) is styled as a literal batting order. Used once, in the "How It Works" section only.

**Hero treatment.** A live-feeling HitTrax-style stat readout (exit velocity, launch angle, distance) is the hero's visual anchor — NSEC's real technology differentiator, not a stock photo.

## Stack
- **Next.js 15, App Router**, TypeScript, Tailwind v4
- **GSAP + `@gsap/react`'s `useGSAP` hook** for all motion (scroll triggers via `ScrollTrigger` plugin)
- No Three.js, no WebGL — motion budget is GSAP-only. See "Motion system" below; it's louder than v1's was, but still disciplined.
- Deployed to Vercel using the **Next.js** framework preset (not the Vite preset used in PR #1 — this is a different preset in Vercel project settings if reconfiguring the same project)

## Color tokens (unchanged from v1 — these were correct)

| Token | Hex | Use |
|---|---|---|
| `--night-black` | `#0B0E11` | Primary background |
| `--chalk-white` | `#F5F3EC` | Primary text on dark, foul-line accents |
| `--clay-red` | `#C9462C` | Primary CTA, primary accent |
| `--turf-green` | `#2C6B4F` | Secondary accent — HitTrax section + success states only |
| `--scoreboard-amber` | `#E8A23D` | Numbers/data only: stats, prices, countdowns |
| `--steel-700` | `#1B2027` | Card/panel surfaces |
| `--steel-300` | `#838B94` | Muted text, hairline dividers |

Rules unchanged: Clay Red is the only CTA color, Scoreboard Amber touches numbers only, Turf Green stays small-footprint.

## Typography (unchanged from v1)

| Role | Typeface | Notes |
|---|---|---|
| Display | Big Shoulders (fallback Archivo Expanded) | Headlines only, never body |
| Body | Inter or Public Sans | All paragraph copy and UI labels |
| Data/stats | JetBrains Mono or IBM Plex Mono, tabular-nums | Numbers only |

**v2 addition — scale contrast rule:** v1's hero H1 (`clamp(2.25rem, 5vw, 4rem)`) was too conservative relative to the empty space around it. At desktop widths ≥1280px, the hero H1 should hit the **top of its clamp range** (4rem / 64px) by default, not scale down to fill available width gracefully — oversized, slightly-too-big-for-comfort headlines are what make a hero feel confident instead of polite. Keep the clamp() for responsiveness, but don't let the implementation undershoot it on desktop.

## Layout choreography — read this section carefully, this is what v1 got wrong

v1's hero was correct on every individual spec (right copy, right button, right stat panel) but the **composition** was flat: everything vertically centered in the viewport with no anchor to the edges, leaving roughly 60% of the viewport empty below the fold-line content. Fix this with explicit rules, not vibes:

**Hero section, desktop (≥1024px):**
- Full viewport height (`min-height: 100svh`), not auto-height content floating in a taller empty container
- Left column (copy + CTA): vertically centered within the hero, **left-aligned to the page's max-width container edge**, not centered in its own column — text blocks that hug a hard left edge read more confident than centered-in-a-box text
- Right column (stat panel): vertically centered, but **offset visually** — give it a subtle background treatment behind it (a faint radial glow in Clay Red at ~8% opacity, or a thin grid/scoreboard-line texture at ~4% opacity) so it doesn't read as a card floating in pure black. This is the fix for "stat panel looks like it's lost in space."
- Below the two-column row: a thin horizontal divider (Steel-300 at 15% opacity) followed by the **trust bar (Section 2)**, pulled up so it sits in the hero's viewport rather than requiring a scroll — the hero and trust bar should feel like one composed unit, not hero-then-big-gap-then-next-section.
- Net effect: nothing in the hero viewport should be "centered with empty space around it." Every element anchors to an edge (left edge, right edge, bottom divider) or to another element.

**Hero section, mobile (<1024px):**
- Stat panel moves below the CTA, full-width, no side margins beyond the standard page gutter
- Trust bar sits directly beneath with no extra gap — same "one composed unit" rule as desktop

**General rule for every subsequent section:** before building a section, decide what it anchors to — page edge, a divider line, an adjacent section's element. "Centered in the section with padding around it" is the default to actively avoid; it's what produced the floaty feeling in v1.

## Motion system (new in v2 — GSAP)

This is the headline change from v1. v1 had almost no motion beyond the hero count-up; that's a real contributor to it feeling flat and unfinished, not just a missing nice-to-have.

**Setup:**
- `gsap` + `@gsap/react` (`useGSAP` hook) + `ScrollTrigger` plugin, registered once in a shared `lib/gsap.ts`
- All animations defined inside `useGSAP()` calls scoped to a ref, with a `gsap.context()` cleanup — required for Next.js App Router to avoid animation leaks across route/component remounts
- Every animation respects `prefers-reduced-motion: reduce` — check via `window.matchMedia` and short-circuit to setting final state instantly, no exceptions

**Hero load sequence** (runs once, on mount, ~1.4s total):
1. Eyebrow text fades up (20px → 0, opacity 0 → 1), 0.4s
2. H1 fades up, slightly staggered word-by-word OR line-by-line (not character-by-character — that reads gimmicky), starts 0.1s after eyebrow, 0.5s
3. Subhead + CTA fade up together, starts 0.15s after H1 finishes, 0.4s
4. Stat panel's border-top draws in (scaleX 0 → 1, left-to-right), then the three stat numbers count up from 0 simultaneously, 900ms, ease `power2.out` — this is the v1 behavior, kept as-is, just now sequenced relative to the rest of the hero instead of running in isolation

**Scroll-triggered reveals (every section after the hero):**
- Each section's heading + intro fades up (16px → 0) as it crosses ~75% of the viewport height, using `ScrollTrigger` with `start: "top 75%"`, `toggleActions: "play none none none"` (plays once, doesn't reverse on scroll-up — reversing reads jittery on a page people scroll quickly on mobile)
- Lineup Card rows: stagger in sequentially, 0.08s apart, as the whole card crosses into view — this reinforces the "batting order" concept, since they visually arrive in order 1 through 5
- Program/package cards: fade up with a very slight stagger (0.06s), no rotation or scale tricks
- Numbers anywhere outside the hero (trust bar stats, package prices once added) get the same count-up treatment as the hero stat panel, triggered on scroll-into-view rather than on page load

**Sticky mobile CTA bar:**
- Slides up from `translateY(100%)` to `translateY(0)` once the hero's bottom edge scrolls past the viewport top — use `ScrollTrigger` with `start: "bottom top"` on the hero, not a manual scroll-position listener
- No bounce easing here — `power1.out`, fast (0.25s), this is a utility element, not a moment

**What NOT to do (boundaries, not suggestions):**
- No parallax background layers
- No scroll-jacking / hijacked scroll speed
- No infinite/looping ambient animation anywhere (no floating particles, no pulsing glows that never stop) — motion has a start and an end, always
- No animation on hover for anything except the CTA button's existing color-darken (still no scale/bounce per v1 rule)
- Total: at most **one** new "moment" beyond what's listed above. If you think a section needs something not specified here, note it as a proposal in `HANDOVER.md` rather than adding it — don't free-style new GSAP timelines into sections without a spec.

## Components

**Primary CTA button** — unchanged from v1: Clay Red, Chalk White text, Big Shoulders semi-bold, 16px/32px padding, 6px radius, single hover state (darken ~8%, no scale), label always "Book My Free Evaluation."

**Lineup card** — unchanged from v1 spec, see Design thesis. Add: rows animate in via the stagger rule above.

**Stat readout panel** — unchanged from v1 spec. Add: sits against the subtle background glow/texture described in Layout choreography, not floating on pure `--night-black`.

**Program/package cards** — unchanged from v1 spec. Add: fade-up stagger per Motion system above.

## Spacing & layout (unchanged from v1, still correct)
- 8px base unit. Section vertical padding: 96px desktop / 56px mobile.
- Max content width: 1180px. Hero and stat panels may break full-bleed.
- Single column on mobile always.

## Accessibility floor (unchanged, still non-negotiable)
- WCAG AA contrast for Chalk White on Night Black / Clay Red. Scoreboard Amber restricted to large stat numbers, never body text.
- Visible 2px Clay Red keyboard focus ring, 2px offset, on every interactive element.
- Real `<label>` elements on all form fields.
- 44px minimum tap targets on mobile.
- **v2 addition:** every GSAP animation has a `prefers-reduced-motion` fallback that is tested, not assumed — verify in dev tools by toggling the OS-level reduced-motion setting, not just by reading the code.
