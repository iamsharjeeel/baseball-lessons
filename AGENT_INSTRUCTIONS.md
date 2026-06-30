# Agent Instructions (v2 — Next.js + GSAP)

Read this fully before writing any code. This version is intentionally more explicit than v1's instructions were — v1 left too much layout/motion judgment to interpretation, which is most of why the first build came out flat. Don't fill gaps with your own judgment here; if something genuinely isn't covered, stop and log a question in `HANDOVER.md` instead of guessing.

## Reading order, every session, no exceptions
1. **`HANDOVER.md`** — read the most recent entries first. This tells you the actual current state of the repo, which may not match what you'd assume from the file tree alone.
2. `README.md`
3. `DESIGN_SYSTEM.md` v2 — **read "Layout choreography" and "Motion system" in full before touching any component.** These two sections are the entire reason this is a v2 rebuild.
4. `CONTENT_SPEC.md` — copy is unchanged from v1, still use it verbatim

## This is a stack migration, not a patch
PR #1 built a Vite + React project. This version is **Next.js 15, App Router**. Do not try to incrementally convert the Vite project — start a clean Next.js app and port over the hero section's logic/copy (it was content-correct, just composed flat), rather than retrofitting Vite config into Next.js config.

```
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

If the existing Vite files are still in the repo root when you start, move them to a `/legacy-vite-build` folder rather than deleting outright — don't destroy the working hero reference without a fallback.

## Dependencies to install
```
npm install gsap @gsap/react
```

Do not install any Three.js, react-three-fiber, or WebGL-related packages — explicitly out of scope per `DESIGN_SYSTEM.md` v2's "Stack" section.

## Folder structure
```
/app
  layout.tsx
  page.tsx
  globals.css            <- design tokens as CSS variables, from DESIGN_SYSTEM.md
/components
  /sections               <- one component per CONTENT_SPEC.md section, in build order
    Hero.tsx
    TrustBar.tsx
    Lineup.tsx
    Coaches.tsx
    HitTrax.tsx
    Programs.tsx
    Testimonials.tsx
    Faq.tsx
    FinalCta.tsx
  /ui                      <- shared components
    PrimaryButton.tsx
    StatReadoutPanel.tsx   <- reused by Hero.tsx and HitTrax.tsx, build once
    LineupCard.tsx
    StickyMobileCta.tsx
/lib
  gsap.ts                  <- GSAP + ScrollTrigger registration, shared across components
  useReducedMotion.ts      <- shared hook wrapping prefers-reduced-motion check
README.md
DESIGN_SYSTEM.md
CONTENT_SPEC.md
AGENT_INSTRUCTIONS.md
HANDOVER.md
```

## Build order for this session
Build and visually check each one **before** moving to the next — don't write all nine sections back-to-back without looking at them, that's exactly how v1 shipped with a composition problem nobody caught until a screenshot review.

1. `lib/gsap.ts` and `lib/useReducedMotion.ts` first — every section depends on these
2. `Hero.tsx` — this is the highest-stakes section, since it's what's visible without scrolling and what v1 got wrong. Follow `DESIGN_SYSTEM.md`'s "Layout choreography → Hero section" rules literally: left-aligned copy hugging the container edge (not centered-in-column), stat panel with the background glow treatment, trust bar pulled up into the same viewport. **Take a screenshot or describe the rendered layout in `HANDOVER.md` when this is done** so the next reviewer can sanity-check it against the spec without re-reading code.
3. `TrustBar.tsx`
4. `Lineup.tsx` (the Lineup Card signature component)
5. `Coaches.tsx`
6. `HitTrax.tsx` (reuse `StatReadoutPanel`, don't rebuild it)
7. `Programs.tsx`
8. `Testimonials.tsx` (placeholder slot, per `CONTENT_SPEC.md` — do not fabricate quotes)
9. `Faq.tsx`
10. `FinalCta.tsx`
11. `StickyMobileCta.tsx`

## Explicit rules this session (these are not optional / not up to your judgment)
- **Composition check before calling any section "done":** does every element anchor to a page edge, a divider, or another element — or is something just centered with padding floating around it? If the latter, it's not done. This is the literal failure mode from v1; checking for it explicitly is the whole point of this rebuild.
- **`[ ]` placeholders in `CONTENT_SPEC.md`** (pricing, testimonials, trust bar stats) stay visibly flagged placeholders. Never invent a real-looking number or quote.
- **One CTA label everywhere:** "Book My Free Evaluation." No variation.
- **No site navigation, no exit links** except the phone number and the one secondary "Meet the coaches" link in Section 4.
- **Reuse `StatReadoutPanel`** between Hero and HitTrax sections — don't build two versions of the same component.
- **GSAP cleanup:** every `useGSAP()` call needs proper context cleanup so animations don't leak or double-fire on Next.js navigation/remounts. If you're not confident a cleanup is correct, say so explicitly in `HANDOVER.md` rather than shipping it silently.

## Conversion & tracking (unchanged requirements from v1, still apply)
- Meta Pixel base code, `PageView` on load, `Lead` event on CTA click/form submit
- Capture UTM params from the URL, forward with lead submission
- No render-blocking scripts above the fold

## Performance budget
- LCP under 2.5s on mobile, 4G throttled — GSAP and ScrollTrigger are small, but verify bundle size hasn't crept past v1's ~62KB gzipped by a wide margin once Next.js's own overhead is accounted for
- Images: WebP/AVIF, properly sized
- Next.js App Router: use Server Components by default, only mark a component `"use client"` if it actually needs GSAP/interactivity (Hero, HitTrax, StickyMobileCta, Faq accordion, the lead form) — don't blanket the whole tree as client components out of convenience

## Definition of done, per section
- [ ] Passes the composition check above — nothing is "centered and floating," everything anchors to something
- [ ] Matches `DESIGN_SYSTEM.md` v2 tokens, layout choreography, and motion spec for that section
- [ ] Matches `CONTENT_SPEC.md` copy exactly, or deviation is flagged
- [ ] Responsive at 375px / 768px / 1440px
- [ ] Keyboard accessible, visible focus states
- [ ] GSAP animation has a verified (not assumed) `prefers-reduced-motion` fallback
- [ ] No console errors or warnings

## End of every session
Append a new dated entry to `HANDOVER.md` before stopping, even mid-task. Include a plain-language description of how each finished section actually looks (not just "built Hero.tsx") — v1's handover said sections were done without flagging that the composition was flat, which is exactly the gap this file exists to close. If you're not sure whether a section's composition is right, say that uncertainty out loud in the entry rather than marking it done.
