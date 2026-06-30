# Design System — NSEC Landing Page

## Design thesis
NSEC's real differentiator isn't "we teach baseball" — every cage in the region says that. It's that they coach with the same real-time data tech (HitTrax) pro and college programs use, delivered entirely 1-on-1. The page should feel like stepping into the facility at night with the lights on and the scoreboard live — not a stock-photo sports-academy template.

**Signature element — "The Lineup Card."** The customer journey (Evaluation → Plan → 1-on-1 Coaching → Data Tracking → Game-Ready) is a genuine, ordered sequence — close enough to a literal batting order that it's worth styling that way. It's used **once**, deliberately, as the structural device for the "How It Works" section. It is not reused as decorative numbering anywhere else on the page — that restraint is what keeps it feeling intentional instead of templated.

**Hero treatment.** The hero's stat panel shows a live-feeling HitTrax-style readout (exit velocity, launch angle, distance) that counts up on load. This is the single most characteristic image in NSEC's world — their actual technology differentiator — so it earns the hero's strongest real estate instead of a generic athlete stock photo.

> **Note on color sourcing:** the palette below is an original system built from the literal materials of the sport — clay, chalk, turf, stadium lights, scoreboard LEDs — not pulled from NSEC's existing brand kit, since exact hex values weren't confirmed at time of writing. Before final build, check nacsportscenter.com's logo files for their real brand hex and swap in if it conflicts. If there's no formal brand guide, this system stands on its own and should be treated as final.

## Color tokens

| Token | Hex | Use |
|---|---|---|
| `--night-black` | `#0B0E11` | Primary background — stadium-at-night base |
| `--chalk-white` | `#F5F3EC` | Primary text on dark backgrounds, foul-line accents |
| `--clay-red` | `#C9462C` | Primary CTA color and primary accent — infield dirt |
| `--turf-green` | `#2C6B4F` | Secondary accent — used only in the HitTrax section and form-success states |
| `--scoreboard-amber` | `#E8A23D` | Reserved exclusively for numbers/data: stats, prices, countdowns |
| `--steel-700` | `#1B2027` | Card surfaces, panel backgrounds on dark |
| `--steel-300` | `#838B94` | Muted/secondary text, hairline dividers |

**Rules, not suggestions:**
- Clay Red is the *only* color used for the primary CTA button, everywhere. Never amber, never green for "Book My Free Evaluation" — consistency is what makes the eye find it instantly on every scroll position.
- Scoreboard Amber only touches actual data (stat numbers, prices, a countdown). If you're tempted to use it as a decorative highlight on body text, don't — it dilutes the one place it means something.
- Turf Green's footprint stays small (HitTrax section + success states only) so it reads as intentional, not as a third competing accent.

## Typography

| Role | Typeface | Notes |
|---|---|---|
| Display (headlines) | Big Shoulders (or Archivo Expanded as fallback) | Condensed, bold, athletic — jersey-numbering feel. Large sizes only (H1/H2/H3), never body copy. |
| Body | Inter or Public Sans | Humanist, legible at small mobile sizes, used for all paragraph copy and UI labels |
| Data / stats | JetBrains Mono or IBM Plex Mono, `font-variant-numeric: tabular-nums` | Exclusively for numbers: HitTrax stats, prices, the lineup card's batting-order numbers |

**Type scale** (mobile base 16px, fluid `clamp()` to desktop):
- H1: `clamp(2.25rem, 5vw, 4rem)`, Big Shoulders, weight 800, letter-spacing -0.01em
- H2: `clamp(1.75rem, 3.5vw, 2.75rem)`, Big Shoulders, weight 700
- H3: `1.25rem`, Big Shoulders, weight 600
- Body: `1rem`–`1.125rem`, Inter, weight 400, line-height 1.6
- Data stat (hero / HitTrax section): `clamp(2.5rem, 6vw, 5rem)`, mono, weight 700, tabular-nums

Never substitute the data face for headline text, or vice versa. That mismatch is exactly what signals "this number is real, measured data" vs. "this is marketing copy" — it's doing real communicative work, not just decoration.

## Spacing & layout
- 8px base unit. Section vertical padding: 96px desktop / 56px mobile.
- Max content width: 1180px. Hero and stat panels are allowed to break full-bleed.
- Single column on mobile, always. Hero and the Lineup Card are the only sections that go 2-column, and only at ≥1024px.

## Components

**Primary CTA button**
- Clay Red background, Chalk White text, Big Shoulders semi-bold, padding 16px/32px
- 6px corner radius — not a pill. A pill reads as generic SaaS; a slightly-rounded rectangle reads closer to athletic equipment / structured gear.
- One hover state: background darkens ~8%. No scale or bounce — confident, not bouncy.
- Literal label everywhere: **"Book My Free Evaluation"**

**Lineup card** *(signature component — see Design thesis above)*
- Vertical stack. Each row: a large mono "batting order" number (1–5) in Scoreboard Amber on the left, a position-style eyebrow label (e.g. "LEAD-OFF") in Steel-300 above the row headline, then a 1-line description.
- Steel-700 card background, single 1px hairline divider between rows (Steel-300 at ~20% opacity). No per-row shadows — the whole stack reads as one card, not five.

**Stat readout panel** (hero + HitTrax section)
- Steel-700 panel styled like a monitor/scoreboard: 4px Scoreboard Amber border-top, 2–3 stats in mono/amber with small Chalk-White labels beneath each
- On load: numbers count up from 0 over ~900ms, ease-out, once only. If `prefers-reduced-motion: reduce` is set, show the final value immediately — no count-up.

**Program/package cards**
- Steel-700 surface. Clay Red top border on the featured/recommended package only. Price set in mono/amber. One CTA per card.

## Motion rules
- **One** orchestrated motion moment: the hero stat count-up on page load. That's the entire "wow" budget — don't spend it twice.
- Scroll-triggered reveals: simple fade-up (12px translate, 400ms), lightly staggered for the Lineup Card rows. No parallax, no rotation, no scroll-jacking.
- Everything respects `prefers-reduced-motion: reduce` — instant/no animation fallback, not optional.
- No autoplaying video with sound, ever. If a hero video replaces the stat panel in a future iteration, it's muted by default with a visible, user-controlled play/pause state.

## Accessibility floor (non-negotiable, not aspirational)
- Verify contrast: Chalk White on Night Black and Chalk White on Clay Red both need to clear WCAG AA at body text size. Scoreboard Amber on Steel-700 can fail AA at small sizes — that's exactly why amber is restricted to large stat numbers, not body text.
- Visible keyboard focus ring on every interactive element: 2px Clay Red outline, 2px offset.
- Real `<label>` elements on every form field — placeholder text is never a substitute for a label.
- Minimum tap target 44px on mobile, no exceptions for "but it looks cleaner small."
