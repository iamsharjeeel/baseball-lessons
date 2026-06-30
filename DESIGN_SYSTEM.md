# Design System — NSEC Landing Page (v3)

## What changed in v3 and why
v2's spec (Next.js + GSAP, layout choreography, motion system) was directionally right but Cursor's build came out hideous against the two references reviewed: a prior NSEC-style page (real photography, confident gold/black contrast) and a B2B SaaS reference (Xovera — oversized type, huge negative space, numbers given real visual weight, light section breaking up dark). v2's actual build also shipped with real bugs: a cropped Lineup Card and stranded counter numbers floating with no layout home.

v3 fixes three things specifically:
1. **No photography anywhere.** A baseball/softball lessons page with zero photos of athletes is the single biggest gap vs. the references. v3 adds a photography layer with an AI-placeholder generation spec (swap for real NSEC photos later).
2. **Five competing accent colors → one.** Clay Red, Turf Green, and Scoreboard Amber all doing different jobs is what made v1/v2 read like a token sheet instead of a designed page. v3 cuts to a single accent.
3. **Background flips to white-dominant, with one dark section for contrast** — not the all-black approach v1/v2 used. This is a direct, deliberate response to the Xovera reference, where the white sections carry most of the page and a black section is used once, as a beat, not as the default canvas.

If you're an agent picking this up fresh: **ignore the v1/v2 hero screenshots entirely, they are the failure case, not a reference.** Build from this file and the photography spec below.

## Design thesis (still true, restated)
NSEC's differentiator is real-time coaching data (HitTrax) delivered entirely 1-on-1. That's still the core idea. What v3 changes is *how confidently* the page says it — bigger type, real photography of athletes actually training, one color doing all the accent work instead of three fighting for attention, and a layout with the courage to leave space empty instead of filling it with bordered cards.

**Signature element — "The Lineup Card."** Unchanged concept (the 5-step journey as a literal batting order), but rebuilt as a full-bleed, generously-spaced section — not a small bordered card with five cramped rows. Give each step room. This was the section that visibly broke (cropped) in the last build; rebuilding it bigger and simpler also makes it less likely to break.

**Hero treatment.** A full-bleed photograph (real or AI-placeholder, see below) of an athlete mid-swing or mid-throw, with the headline and CTA composited over it — directly modeled on the NSEC reference page's hero, not the HitTrax-stat-panel-only approach from v1/v2. The HitTrax stat readout still exists, but moves to its own dedicated section lower on the page (where it can be the hero of that section) rather than trying to carry the page's hero on its own.

## Color tokens — v3: one accent, not five

| Token | Hex | Use |
|---|---|---|
| `--paper-white` | `#FAFAF8` | Primary background — most of the page lives here now, not black |
| `--ink-black` | `#0B0E11` | Text on white sections; also the background of the one dark contrast section |
| `--accent` | `#C9462C` (clay red — kept from v1/v2, it tested fine, the problem was never this color) | The **only** accent color on the page: every CTA, every stat number, every highlighted word, every featured-card border. One job, one color, everywhere. |
| `--steel-300` | `#838B94` | Muted/secondary text, hairline dividers, on both light and dark backgrounds |
| `--steel-700` | `#1B2027` | Card surfaces *only inside the dark section* — don't use this on the white sections |

**What got removed and why:** Turf Green and Scoreboard Amber are gone. Every job they were doing (data callouts, success states, secondary accents) now goes to `--accent`. A single accent color used everywhere is what makes a page feel like one decision instead of three — this is the single highest-leverage change in v3.

**Rules:**
- `--accent` appears on: primary CTA buttons, the big stat numbers, the Lineup Card's batting-order numbers, the featured pricing card's top border, and highlighted words within headlines (the "CHAMPION." gold-highlight treatment from the NSEC reference — do this with `--accent` as a highlight block behind key words in the H1, see Typography below).
- Don't introduce a second accent for "just this one thing." If something needs visual emphasis, it gets `--accent`, oversized type, or more whitespace around it — not a new color.

## Background strategy — white-dominant, one dark section

This is a structural change from v1/v2, modeled directly on the Xovera reference:

- **Sections 1–6** (Hero through Programs): `--paper-white` background, `--ink-black` text. The hero is the one exception — its background is the full-bleed photo, not white, with a dark gradient overlay (bottom-to-top, `--ink-black` at 70% opacity at the bottom fading to 0% at ~60% up the image) so white headline text stays readable over the photo.
- **Section 7 (Social proof / testimonials) and Section 9 (Final CTA)**: `--ink-black` background, `--paper-white` text, `--accent` for the CTA button and any stat numbers. This is the one dark beat in the page — modeled on Xovera's dark stat band — and it should feel like a deliberate gear-change, not a random section that happens to be dark.
- Everything else (Trust bar, Lineup, Coaches, HitTrax section, FAQ) stays on white.

Don't alternate light/dark section-by-section. The point of the Xovera reference is restraint: mostly light, one confident dark beat, done.

## Typography — bigger, fewer sizes, more contrast

| Role | Typeface | Notes |
|---|---|---|
| Display (headlines) | Big Shoulders (fallback Archivo Expanded) | Unchanged choice, but see scale rule below — it was undersized in v1/v2 |
| Body | Inter or Public Sans | Unchanged |
| Data/stats | JetBrains Mono or IBM Plex Mono, tabular-nums | Unchanged role, but now always rendered in `--accent`, never amber |

**v3 scale rule — go bigger than feels comfortable:**
- Hero H1: `clamp(3rem, 8vw, 6.5rem)` — this is roughly 60% larger than v2's spec. Reference point: the Xovera "booked. 4 weeks." headline and the NSEC reference's "TRAIN LIKE A CHAMPION" both fill most of the hero's horizontal space at desktop width. Match that scale, don't undershoot it.
- Big stat numbers (HitTrax readout, trust bar, final CTA section): `clamp(3.5rem, 9vw, 7rem)` — these should be the single loudest visual element wherever they appear, matching how "251" and "66" dominate the Xovera stat band. Bigger than the headlines around them, not smaller.
- H2 (section headers): `clamp(2.25rem, 5vw, 4rem)`
- Body copy stays modest by comparison — `1rem`–`1.125rem`. The contrast between huge display type and restrained body text is what makes the big type read as confident rather than just "everything is loud."

**Highlighted-word treatment** (for the hero H1, modeled on the NSEC reference's gold-block-behind-text on "CHAMPION" and "ATHLETE"): wrap the key word(s) in a `--accent` background block with `--paper-white` (or `--ink-black`, whichever has contrast against the photo) text inside it, slight padding, no border-radius — a hard rectangle, not a pill. Use this once per headline, on the single most important word, not on every line.

## Photography — new in v3

**This is the change that matters most.** A page selling in-person athletic coaching with zero photos of athletes is the core problem with everything built so far.

**Placement (minimum, build all of these):**
1. Hero: full-bleed photo, athlete mid-action (swing, throw, or catch), shot low-angle if possible for drama, similar framing to the NSEC reference's boxing hero shot
2. Coaches section: one photo of a coach actively instructing (hands-on, mid-correction, not posed-and-smiling)
3. "Why train at NSEC" / facility credibility section: one wide photo of the actual training space/cage/field
4. Optional: a small circular coach headshot next to a "Led by [name]" credibility line, matching the NSEC reference's "LED BY UFC/BELLATOR LEGEND" treatment, if a flagship coach name is confirmed by David

**AI placeholder generation spec** (use these as literal prompts wherever the build tool generates placeholder imagery, until real NSEC photography is supplied):
- Style: photojournalistic sports photography, natural or stadium lighting, shallow depth of field, slightly desaturated/cool color grade — not bright, not stock-photo-smiling
- Hero shot prompt direction: "A young baseball player mid-swing at an indoor batting cage, dramatic side lighting, motion blur on the bat, shot from a low angle, photojournalistic style, desaturated color grade"
- Coach shot prompt direction: "A baseball coach in his 30s-40s giving hands-on instruction to a teenage athlete on batting stance, indoor training facility, natural light, candid not posed, photojournalistic style"
- Facility shot prompt direction: "Wide shot of an indoor baseball and softball training facility with batting cages and turf, empty or with one athlete training in the distance, moody stadium-style lighting"
- Every placeholder image gets a `data-placeholder="true"` attribute (or equivalent) in the markup so a future find-and-replace pass can locate every spot needing a real photo swap — this matters, don't skip it.
- Crop/treatment: every hero/section photo gets the same gradient-overlay treatment described in "Background strategy" above, so text stays legible regardless of the specific image's brightness.

## Layout — fewer, bigger, more spacious (the Xovera lesson)

- **Cut the bordered-card-everywhere pattern.** v1/v2 put almost everything in a `--steel-700` bordered box. In v3, only use a card surface where there's genuinely grouped, comparable data (the Programs/pricing cards, the dark-section testimonial card). Everything else — Lineup steps, FAQ, Coaches — sits directly on the page background with spacing doing the separation work, not borders.
- **Lineup Card rebuild:** full content-width (up to the 1180px max-width), each of the 5 steps gets its own full-width row with generous vertical padding (minimum 48px between rows), the batting-order number rendered at the new oversized stat scale (`clamp(3.5rem, 9vw, 7rem)`) to its own column on the left, headline + description in a wide column to the right. This is wider and roomier than v2's card — that's deliberate, it's the fix for the cropping bug and the cramped feel both at once.
- **Whitespace rule:** between major sections, default to *more* vertical space than feels necessary, not less — 120px desktop section padding minimum (up from v2's 96px). The Xovera reference's confidence comes partly from how much room things have to breathe.

## Components (v3 updates)

**Primary CTA button** — same shape/behavior as before (6px radius, not pill, single hover darken), now always `--accent` background — never any other color, full stop.

**Lineup row** (replaces "Lineup card" — no longer a bordered card, see Layout above) — full-width row, oversized accent number on the left, content on the right, hairline `--steel-300` divider between rows only (no card border, no shadow).

**Stat readout** (hero photo overlay version + dedicated HitTrax section version) — numbers at the new oversized scale, always `--accent`, label beneath in small `--paper-white` or `--ink-black` (whichever has contrast against that section's background) uppercase caps.

**Program/package cards** — only component that keeps a visible card surface, since these are genuinely comparable side-by-side options. Featured card gets a `--accent` top border, 4px.

**Dark-section testimonial card** — modeled on the Xovera reference's white card-on-dark testimonial: `--paper-white` card surface sitting on the `--ink-black` section background (i.e., inverted from the rest of the page), quote text in `--ink-black`, small `--accent` circular avatar initial.

## Motion (GSAP — mostly unchanged from v2, two additions)
- Keep all v2 motion rules (hero load sequence, scroll-triggered fade-ups, Lineup stagger, sticky CTA slide-in, `prefers-reduced-motion` respected throughout).
- **New:** the big stat numbers (wherever `clamp(3.5rem, 9vw, 7rem)` scale is used) always count up on scroll-into-view, not just in the hero — this is now a recurring motif across multiple sections, matching how Xovera's "251 / 66 / 88 / 16" all count up together as a unit.
- **New:** the hero's gradient overlay can have a very subtle, one-time fade-in (overlay opacity 0 → final value, ~600ms) alongside the existing text fade-up sequence, so the photo doesn't just snap to its final darkened state. This is the only new motion moment added in v3 — don't add others.

## v4 — fixing the "still incomplete" review pass
The v3 build was a real improvement (photography landed, single accent held, hero composition works, Lineup section fixed) but the latest review flagged specific remaining gaps. Fix each one precisely — these are not new design directions, they're finishing the v3 vision properly:

1. **Inconsistent vertical rhythm.** Trust bar reads cramped; the HitTrax stat row reads stranded with no container. Apply one rule everywhere: every section gets the same 120px desktop / 64px mobile padding top and bottom (per "Whitespace rule" above) — no exceptions, no section allowed to feel tighter or looser than its neighbors without a stated reason.
2. **HitTrax section stats need a home.** They went from over-boxed (v1/v2, inside a `--steel-700` panel) to under-boxed (v3, floating with no container at all) — the fix isn't a heavy bordered card again, it's a light visual anchor: a single hairline top border (`--accent`, 2px) above the stat row, matching the hero stat panel's treatment, so the numbers read as one connected readout instead of three separate floating elements.
3. **Dark testimonial section must be full-bleed.** No visible white gutters on either side at any viewport width — the `--ink-black` background extends edge-to-edge; only the content *inside* it respects the 1180px max-width.
4. **Photos need consistent treatment.** Every photo (hero, coach, facility) gets the same gradient-overlay treatment and a consistent aspect ratio per its slot (hero: full-bleed/wide, coach: portrait-ish, facility: wide). A photo with no overlay/treatment next to ones that have it is what makes the page look unfinished — apply the treatment uniformly or not at all.

## Performance — this is not optional polish, it's a launch blocker
The latest build took ~2 seconds for images to load in — on a paid-ad landing page targeting mobile traffic, that alone will hurt conversion rate and Meta's quality score before any design issue does. Every `AGENT_INSTRUCTIONS.md` version has had an LCP < 2.5s requirement; this build missed it. Fix:
- Use Next.js `<Image>` for every photo, never a raw `<img>` tag — this gets automatic responsive `srcset`, lazy-loading below the fold, and format optimization for free.
- The hero photo is the one exception to lazy-loading: mark it `priority` so it's eagerly loaded, since it's the LCP element.
- Generate placeholder photography at reasonable source resolution (roughly 2x the largest rendered size, not a huge unoptimized original) and export as WebP.
- Add an explicit `width`/`height` (or `fill` with a sized parent) on every image so there's no layout shift while it loads.
- After building, actually check Network tab timing for image load, not just "it looks done" — confirm hero photo paints in under 2.5s on a throttled connection before calling this finished.
- WCAG AA contrast: verify `--ink-black` on `--paper-white` (will pass easily) and `--paper-white` text over the hero photo's gradient overlay specifically — test against the darkest *and* lightest plausible placeholder image, since AI-generated photos vary in brightness.
- Visible 2px `--accent` keyboard focus ring, 2px offset, every interactive element.
- Real `<label>` elements on all form fields.
- 44px minimum tap targets on mobile.
- Every GSAP animation has a tested `prefers-reduced-motion` fallback.
