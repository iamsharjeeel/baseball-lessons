# Agent Instructions (v3 — single accent, white-dominant, real photography)

Read this fully before writing any code.

## Read this first: what actually went wrong last time
The v2 build was reviewed against two references (a prior NSEC-style page with real photography and gold/black contrast, and a B2B SaaS page with oversized type and confident whitespace) and came out hideous by comparison, for three concrete, fixable reasons:

1. **Zero photography anywhere on the page.** A page selling in-person athletic coaching had no photos of athletes at all.
2. **Three accent colors (Clay Red, Turf Green, Scoreboard Amber) competing for attention** instead of one color doing all the work.
3. **Type and stats were undersized and over-boxed** — everything sat in small bordered `--steel-700` cards instead of being given real scale and room to breathe.

There were also two outright bugs in the v2 build: the Lineup Card section was visually cropped/cut off, and counter/stat numbers appeared stranded on the right side of the page with no layout container around them. Both are layout/CSS bugs, not design decisions — find and fix the root cause (likely an `overflow: hidden` or fixed-height container clipping content, and an absolutely-positioned element with no relative parent) rather than papering over them.

**Do not reuse any visual code from the v2 build.** Read `DESIGN_SYSTEM.md` v3 in full and build fresh against it. The v2 hero/section screenshots are the failure case, not a starting point.

## Reading order, every session
1. **`HANDOVER.md`** — most recent entries first
2. `README.md`
3. **`DESIGN_SYSTEM.md` v3 in full** — pay specific attention to "Background strategy," "Photography," and "Layout," since those are the three sections that fix the actual problems found in review
4. `CONTENT_SPEC.md` — copy is unchanged, still use it verbatim

## Stack (unchanged from v2)
- Next.js 15, App Router, TypeScript, Tailwind v4
- `gsap` + `@gsap/react`, no Three.js
- If the v2 Next.js scaffold already exists and is structurally sound, keep the scaffold (package.json, config, folder structure) but rebuild every section component from scratch against v3's spec — don't patch v2 component code with new colors.

## Photography — do this before building any section that needs an image
Per `DESIGN_SYSTEM.md` v3's "Photography" section, every image on this page is an AI-generated placeholder for now (real NSEC photos come later). Use the exact prompt directions given there for: hero shot, coach shot, facility shot. Whatever image generation tool is available in this environment, generate all required images first as a batch, save them to `/public/images/`, and tag every `<img>` or background-image usage with `data-placeholder="true"` so they're easy to find and swap later. Don't substitute generic stock photography or skip the photography layer — that's the single most important fix in this version.

## Color enforcement — this is a hard rule, not a guideline
`DESIGN_SYSTEM.md` v3 cuts the palette to one accent color (`--accent`, the clay red). If you find yourself reaching for a second accent color "just for this one element" — don't. Every emphasis need gets solved with `--accent`, oversized type, or whitespace, never a new color. Before finishing, grep the codebase for any hex values or color tokens outside the v3 palette (`--paper-white`, `--ink-black`, `--accent`, `--steel-300`, `--steel-700`) and remove them.

## Build order
1. Generate placeholder photography (see above) — do this first, sections depend on it
2. `lib/gsap.ts`, `lib/useReducedMotion.ts`
3. **Hero** — full-bleed photo, gradient overlay, oversized H1 with the highlighted-word treatment, CTA. This is the section that most directly needs to match the NSEC reference's composition (photo-dominant, text composited over it) — get this right before moving on.
4. **Trust bar** — white background, oversized stat numbers in `--accent`
5. **Lineup** — rebuilt full-width per v3 spec, not the cropped card from v2. Test this section specifically at 1440px, 768px, and 375px before moving on, since it's the section that broke last time.
6. **Coaches** — white background, real photo placeholder, credibility copy
7. **HitTrax section** — dedicated stat readout, oversized numbers, white background
8. **Programs/pricing** — the one section that keeps visible card surfaces
9. **Testimonials** — `--ink-black` background, `--paper-white` testimonial card (inverted), per v3 spec
10. **FAQ** — white background
11. **Final CTA** — `--ink-black` background, matching the testimonials section's dark beat
12. **Sticky mobile CTA**

## Composition check (apply to every section before calling it done)
- Does this section use only the v3 palette? (See "Color enforcement" above.)
- Is there a real photo (or AI placeholder) anywhere this section calls for one per `DESIGN_SYSTEM.md`?
- Are stat numbers and the H1 actually hitting the oversized scale specified in v3's Typography section, or did they default back to something smaller and "safer"? Check the actual rendered pixel size, don't assume the clamp() value is being respected.
- Is anything in a bordered card that doesn't need to be? (Only Programs/pricing and the dark-section testimonial should have visible card surfaces in v3.)
- At 1440px, 768px, and 375px — is anything clipped, cropped, or stranded outside its parent container? This check exists specifically because of the v2 Lineup Card and counter bugs — don't skip it.

## Rules that don't change from v2
- Every `[ ]` placeholder in `CONTENT_SPEC.md` (pricing, testimonials, trust bar stats) stays visibly flagged — never invent real-looking numbers or quotes. Note: photography placeholders are different from these — photos get generated now per the spec above; pricing/testimonial *text* stays flagged as missing.
- Every primary CTA says "Book My Free Evaluation," everywhere.
- No site navigation, no exit links except the phone number and the "Meet the coaches" secondary link.
- Reuse the stat-readout component between the hero and the dedicated HitTrax section — don't build it twice.
- UTM capture + Meta Pixel `Lead` event on every CTA.
- Every GSAP animation respects `prefers-reduced-motion`, verified by toggling the OS setting.

## Before finishing
- `npm run build` passes with zero errors
- No console errors/warnings
- Run the composition check above against all 12 sections, not just spot-checking a few
- Take a screenshot (or get a Vercel preview URL) of the full page at desktop width and describe in `HANDOVER.md` whether it actually resembles the NSEC/Xovera reference direction — confident, photo-driven, single accent color, generous whitespace — or whether it's drifted back toward the v1/v2 look. Be honest here; the last two handover entries reported sections as "done" without catching that the build looked nothing like the brief, so this self-check matters more than ticking boxes.

## End of session
Append a new dated entry to `HANDOVER.md`. Include: which sections are built, the photography generation approach used (tool/prompts), confirmation the Lineup Card and stranded-counter bugs are actually fixed (not just "should be" — describe what you checked), and an honest visual self-assessment against the references.
