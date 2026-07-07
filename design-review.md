# NSEC Landing Page — Design Review

> Generated from `review` mode (oiloil-ui-ux-guide). Assumptions locked at audit time.

## Context

- Surface: web marketing landing page (single scroll page, no nav)
- Primary user task: book a free skills evaluation for their athlete
- Primary CTA: Book My Free Evaluation → lead capture modal
- Constraints: Meta ad traffic, mobile-first, conversion-focused, no exit links except phone + coaches link

## Diagnosis labels used

- **Execution gulf**: user cannot find how to act
- **Evaluation gulf**: user cannot tell what happened after an action
- **Mistake**: mental model misled by labels or layout

## Findings (prioritized)

### P0 (blocker)

**1. Three-way spec drift — no single source of truth**

- Evidence: `DESIGN_SYSTEM.md` specifies clay red `#C9462C` and athlete photo hero; `tokens.css` uses blue `#388dd0`; `Hero.tsx` uses animated GIF + glass stat panel; `HeroScene.tsx` exists but is unwired
- Diagnosis: mistake — contributors cannot know which spec to follow
- Fix: lock palette + hero in `design-spec.md`, align `tokens.css` and all sections
- Acceptance: grep `src/` finds only token hex values; hero matches approved mockup variant

**2. Background rhythm contradicts white-dominant strategy**

- Evidence: `TrustBar.tsx` uses `bg-ink-black` immediately after hero; `Testimonials` + `FinalCta` also dark — two dark bands instead of one beat
- Diagnosis: mistake — page reads heavier than intended, CTA contrast diluted
- Fix: TrustBar on `paper-white`; dark beat only for Testimonials + Final CTA
- Acceptance: scroll flow is light sections 1–6, dark 7 + 9 per spec

**3. Signature Lineup Card lost**

- Evidence: `Lineup.tsx` uses 5-column grid; spec requires full-width rows with oversized left-column numbers
- Diagnosis: execution gulf — journey steps feel cramped on mobile, signature element not recognizable
- Fix: rebuild as horizontal rows with `clamp(3.5rem, 9vw, 7rem)` numbers
- Acceptance: each step readable at 375px without cropping; numbers dominate left column at 1440px

**4. Lead modal success copy broken**

- Evidence: `LeadModalContext.tsx` renders literal `**{formData.parentPhone}**`
- Diagnosis: evaluation gulf — success state looks broken/unprofessional
- Fix: render phone as styled inline text
- Acceptance: submitted phone displays without asterisks

**5. Lead modal error uses browser alert**

- Evidence: `catch` block calls `alert(...)`
- Diagnosis: evaluation gulf — no in-context recovery path
- Fix: inline error banner + visible phone fallback
- Acceptance: failed submit shows persistent error in modal, no `alert()`

### P1 (important)

**6. CTA hierarchy diluted in Programs**

- Evidence: three identical `PrimaryButton` instances in `Programs.tsx`
- Diagnosis: execution gulf — multiple equal-weight CTAs compete
- Fix: one primary on featured card; outline/secondary on others
- Acceptance: one visually dominant CTA in Programs section

**7. Mixed container strategy**

- Evidence: glass blur (hero stats, testimonials), `shadow-2xl` (Programs, HitTrax video), rings, borders coexist
- Diagnosis: mistake — page feels assembled from different UI kits
- Fix: adopt `divider` + accent hairline (`StatReadoutPanel` pattern) globally
- Acceptance: no `backdrop-blur` on content panels; cards use border or flat surface only

**8. Hero treatment misaligned with sports coaching conversion**

- Evidence: GIF logo background vs photojournalistic athlete photography in spec
- Diagnosis: mistake — parent cannot visualize their athlete training
- Fix: resolved via hero mockup phase (Variant A selected for implementation)
- Acceptance: full-bleed athlete photo with gradient overlay, `priority` load

**9. TrustBar grain overlay positioning bug**

- Evidence: `absolute inset-0` grain div on section without `relative`
- Fix: use light section shell without misplaced grain
- Acceptance: no orphaned absolute layers

**10. Modal accessibility gaps**

- Evidence: no Escape handler, no focus trap, no focus return
- Fix: trap focus, Escape closes, restore focus to trigger
- Acceptance: keyboard-only user can complete and dismiss form

### P2 (polish)

**11. Radius inconsistency** — `rounded-lg` vs `rounded-xl` vs spec 6px → normalize in tokens

**12. Accent glow stacking** — redundant blur orbs in hero, Programs, FinalCta, modal → remove where grain/gradient suffices

**13. Testimonials glass cards** — spec calls for white card on dark → invert surface colors

**14. `HeroScene.tsx` dead code** — remove Three.js deps (not used in photo hero)

**15. `DESIGN_SYSTEM.md` superseded** — merge into `design-spec.md` after lock

## Quick wins

- Fix modal success phone display (5 min, high trust impact)
- Move TrustBar to light background (immediate rhythm improvement)
- Remove hero glass wrapper — stat panel already has accent top border

## Verification checklist

- [ ] Primary CTA identifiable in <3s at 390px
- [ ] Loading / empty / error / success states on lead modal
- [ ] One accent color on all interactive emphasis
- [ ] Section padding 64px mobile / 120px desktop consistent
- [ ] `prefers-reduced-motion` respected
- [ ] Focus-visible 2px accent ring on interactives
- [ ] Hero LCP element loads with `priority`
