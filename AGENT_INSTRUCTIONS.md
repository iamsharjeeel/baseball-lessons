# Agent Instructions

Standing instructions for whoever — human or AI agent — builds in this repo. Read this fully before writing any code, every session.

## Reading order at the start of every session
1. **`HANDOVER.md`** — what's already built, what's already decided, what's next. This overrides your assumptions about the current state of the repo. Read it first, always.
2. `README.md` — orientation if you're unfamiliar with the project
3. `DESIGN_SYSTEM.md` — don't invent colors, fonts, or components that aren't listed here. If the system seems to be missing something you need, propose an addition in `HANDOVER.md` under "Open questions" rather than freelancing a new pattern straight into the code.
4. `CONTENT_SPEC.md` — use this copy as written. Don't paraphrase or "improve" it without flagging the change in `HANDOVER.md`.

## Stack
- React 19 + TypeScript + Vite 6 + Tailwind v4
- No router — this is a single page, don't add one
- No CMS, no backend, unless a later `HANDOVER.md` entry says otherwise
- Lead capture: native HTML form, submit handler TBD (Meta Lead Ad embed / WellnessLiving widget / custom endpoint — not yet decided). If undecided when you reach this, build the form UI, stub the handler with a clearly marked `// TODO: wire up lead capture — see HANDOVER.md` comment, and log the open question in `HANDOVER.md` rather than guessing at an integration.

## Conversion & tracking requirements
This is a paid-traffic landing page, not a portfolio piece — these aren't optional polish items:
- Meta Pixel base code in `<head>`, fire `PageView` on load
- Fire a `Lead` event on successful form submit / booking click
- Capture UTM parameters (`utm_source`, `utm_campaign`, `utm_content`, etc.) from the URL and forward them with the lead submission, so ad performance can be attributed back to the specific creative variant
- No render-blocking scripts above the fold — defer or async anything non-critical
- Lazy-load any image below the hero

## Performance budget
- Target LCP under 2.5s on mobile, 4G throttled
- Keep total gzipped JS for this page under ~150KB where reasonably achievable
- Images: WebP/AVIF, properly sized for their actual display dimensions — no unoptimized hero PNGs

## Definition of done, per section
Before marking a section complete in `HANDOVER.md`, confirm:
- [ ] Matches `DESIGN_SYSTEM.md` tokens — no off-system colors or fonts
- [ ] Matches `CONTENT_SPEC.md` copy exactly, or the deviation is flagged
- [ ] Responsive at 375px, 768px, and 1440px
- [ ] Keyboard accessible with visible focus states
- [ ] Respects `prefers-reduced-motion`
- [ ] No console errors or warnings

## Hard rules
- **No site navigation menu.** No links off this page except the phone number and the one secondary "Meet the coaches" link noted in `CONTENT_SPEC.md`. This page exists to do one thing — don't give visitors an exit from that job.
- **Don't invent placeholder content that looks real.** Pricing, testimonials, and stats marked `[ ]` in `CONTENT_SPEC.md` are real gaps waiting on the client, not blanks to fill creatively.
- **Don't change the stack, add a router, add a CMS, or restructure the component folder layout** without writing the reasoning in `HANDOVER.md` first.

## End of every session — this is the most important rule in this file
Before you finish, even if you're stopping mid-task, even if you ran low on context — append a new dated entry to `HANDOVER.md` using the template at the top of that file. This is not optional. The next session — which may be you with zero memory of this one, or a different agent entirely — depends completely on that entry to avoid redoing or undoing your own work.
