# NSEC Landing Page Design Specification

> Generated from a `design` consultation with oiloil-ui-ux-guide (review-first overhaul, 2026-07-07).
> Style family: `brand-driven` (NSEC blue accent + sports editorial layout).
> Supersedes `DESIGN_SYSTEM.md` for implementation — keep `DESIGN_SYSTEM.md` as historical rationale only.

## 1. Design direction

- **Product**: Meta ad landing page for NSEC baseball/softball 1-on-1 coaching; parents book a free skills evaluation
- **Style family**: brand-driven — blue accent from NSEC brand, Big Shoulders display + Inter body
- **References**: Xovera (white-dominant, oversized type), NSEC reference page (athlete photography hero)
- **Tone**: confident, data-forward, athletic, conversion-focused
- **Hard constraints**: mobile-first, LCP < 2.5s, WCAG AA, `prefers-reduced-motion`, no site nav
- **Locale**: primary `en`

## 2. Color

### Brand
- `--color-accent`: `#388dd0` — CTAs, stat numbers, highlights, focus ring
- `--color-accent-deep`: `#266294` — hover states, gradient stat fill bottom stop, photo warm edge
- `--color-accent-tint`: `rgb(56 141 208 / 0.06)` — subtle background wash only

### Neutrals (warm-tinted)
- `--color-paper-white`: `#faf8f4` — primary background, text on dark
- `--color-ink-black`: `#0a0b0d` — primary text on light, dark section background
- `--color-steel-300`: `#838b94` — muted text, dividers
- `--color-steel-700`: `#1b2027` — form fields on dark modal only

## 3. Typography

| Role | Font | Weights | Source |
|---|---|---|---|
| Display | Big Shoulders | 800 | next/font/google |
| Body | Inter | 400, 600 | next/font/google |
| Data | JetBrains Mono | 700 | next/font/google |

### Type scale
- Hero H1: `clamp(3rem, 8vw, 6.5rem)`
- Section H2: `clamp(2.25rem, 5vw, 4rem)`
- Big stats: `clamp(3.5rem, 9vw, 7rem)` (Lineup numbers, HitTrax large)
- Body: `1rem`–`1.125rem`

## 4. Spacing

- Base unit: `4px`
- Section padding: `64px` mobile / `120px` desktop (via `Section` / `DarkSection`)
- Max content width: `1180px`

## 5. Radius

- `--radius-sm`: `6px` — buttons, cards, modal
- `--radius-md`: `8px` — reserved for larger panels if needed

## 6. Elevation / shadow

- Flat — use borders and dividers only (`containerStrategy: divider`)
- No glassmorphism, no heavy box-shadow on content panels
- Dark sections: `.grain-overlay` at 2.5% opacity

## 7. Motion

- GSAP scroll fade-ups via shared `lib/gsap.ts` tokens
- Hero load stagger ~0.96s total
- Stat count-up on scroll-into-view (except hero panel: mount)
- Dark section clip-path reveal via `DarkSection`
- All motion gated by `useReducedMotion()`

## 8. Container strategy

**Divider + accent hairline** — section separation by whitespace and `border-steel-300/20` or `border-t-2 border-accent` for stat readouts. Program cards use flat surfaces with top accent border on featured card.

## 9. Page rhythm

| Section | Background |
|---|---|
| Hero | Full-bleed photo + overlay |
| TrustBar | `paper-white` |
| Lineup, Coaches, HitTrax, Programs, FAQ | `paper-white` |
| Testimonials, Final CTA | `ink-black` (single dark beat) |

## 10. Hero (implemented: Variant A — photo)

- Full-bleed athlete photo (`/images/hero-1920.webp`, `priority`, `data-placeholder="true"`)
- `PhotoOverlay` with warm accent edge
- Stat readout: accent top border, no glass wrapper
- Mockup alternatives: `mockups/hero-variant-*.html`

## 11. Signature components

- **Lineup steps**: 5-column horizontal row on desktop (`lg:grid-cols-5`); swipeable snap cards on mobile. Large count-up numeral per step; `LEAD-OFF` / `CLEANUP` tags only on steps 1 and 5 (no redundant `#2`–`#4` labels).
- **StatReadoutPanel**: shared hero + HitTrax, gradient number fill
- **PrimaryButton**: single label "Book My Free Evaluation"; secondary variant = outline for non-featured program cards

## 12. Photography

- Hero, coach (`PhotoFrame`), facility slots use unified overlay treatment
- All placeholders tagged `data-placeholder="true"`

## 13. Implementation map

| Token / rule | File |
|---|---|
| CSS tokens | `src/styles/tokens.css` |
| Global utilities | `src/app/globals.css` |
| Sections | `src/sections/*.tsx` |
| Lead modal | `src/context/LeadModalContext.tsx` |

## 14. Open questions (content, not design)

- Trust bar stats 45+ / 800+ — placeholder until David confirms
- Program pricing — not on page yet
- `noindex` — confirm before launch
