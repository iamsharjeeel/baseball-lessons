# Content Spec — NSEC Landing Page

This is the approved copy for every section, in build order. Use it verbatim — don't paraphrase or "improve" it without logging the change in `HANDOVER.md`.

**Two different kinds of gap in this doc — handle them differently:**

- **Numbers (trust-bar stats, pricing)** — fill these with a realistic placeholder number so the page looks and feels finished for design review. Every one of these still needs to render with a visible `PLACEHOLDER` tag in the markup (e.g. a data attribute or HTML comment right next to it, not just a mental note) so it's impossible to accidentally ship to production. Numbers below are provided — use them as-is.
- **Testimonials (Section 7)** — do NOT invent these, even as placeholders. A fabricated quote attributed to a fake parent name is a different category of risk than a made-up stat (it reads as a real claim from a real customer, which a client could accidentally publish as-is without realizing it's fiction). Leave this section as an empty, clearly-labeled "testimonial pending" slot — same as before.

Log every numeric placeholder under "Waiting on client" in `HANDOVER.md` so nothing here is forgotten before launch.

---

## 0. Page meta
- **Title tag:** Free Baseball & Softball Skills Evaluation | NSEC Newtown, PA
- **Meta description:** 1-on-1 baseball & softball coaching for ages 6–college, powered by HitTrax data. Book a free skills evaluation at Newtown Sports and Events Center.
- No indexable nav on this page. Consider `noindex` so this ads-only page doesn't compete with the main site in organic search — confirm with Sharjeel before launch.

## 1. Hero
- **Eyebrow:** Newtown, PA · Ages 6–College
- **H1:** See exactly where your athlete stands. For free.
- **Subhead:** One-on-one baseball & softball coaching from college and pro-level instructors — backed by HitTrax, the same real-time data tech pro programs use.
- **Primary CTA:** Book My Free Evaluation
- **Trust line beneath CTA:** No cost. No equipment needed. 30 minutes with a real coach.

**Hero stat panel** (right side desktop / stacked below CTA on mobile) — see `DESIGN_SYSTEM.md` stat readout component:
- EXIT VELO — `78 MPH`
- LAUNCH ANGLE — `19°`
- DISTANCE — `212 FT`
- Caption beneath panel: "Real HitTrax output from an NSEC training session"

## 2. Trust bar
Row of 3–4 quick facts directly under the hero, `--accent` numbers + dark/light text matching that section's background (see `DESIGN_SYSTEM.md` v3):
- **45+** years combined coaching experience `[PLACEHOLDER — confirm real number with David before launch]`
- **800+** athletes trained `[PLACEHOLDER — confirm real number with David before launch]`
- College & pro-level coaching staff
- HitTrax-equipped facility

## 3. The Lineup — How It Works
- **H2:** Here's the lineup
- **Subhead:** From first session to game-ready, here's exactly what happens.

Use the Lineup Card component (`DESIGN_SYSTEM.md`):

1. **LEAD-OFF — Free Skills Evaluation.** A real coach watches your athlete hit, field, or throw and gives you an honest read on where they're at. No pitch, no pressure.
2. **#2 — A Plan Built for Them.** Based on the evaluation, your coach builds a training plan around what your athlete actually needs to improve — not a generic curriculum.
3. **#3 — 1-on-1 Coaching.** Every rep is coached individually. No 10-kid group cage sessions where your athlete gets two minutes of attention.
4. **#4 — HitTrax Data Tracking.** Swings, exit velocity, launch angle — every session adds to a real performance record so progress is measurable, not just felt.
5. **CLEANUP — Game Ready.** Walk into tryouts, fall ball, or the next season with real reps and real data behind your athlete.

## 4. Coaches / credibility
- **H2:** Coached by people who've actually played at the level your athlete is chasing
- **Body:** Our staff brings college and professional playing and coaching experience into every single lesson — not just drills out of a manual.
- **Secondary CTA** (lower visual priority than the primary button): "Meet the coaches" — this is the one acceptable exit link on the page, can point to nacsportscenter.com/coaches/
- `[ ]` — pull 2–3 real coach names/bios/photos from nacsportscenter.com/coaches/ if David approves reusing them here

## 5. HitTrax deep-dive
- **H2:** Most cages give reps. We give data.
- **Body:** HitTrax is the same real-time performance capture system used by college and professional programs. Every swing becomes a number — exit velocity, launch angle, distance — so your athlete, and their coach, know exactly what to work on next.
- Visual: reuse the stat-readout component, larger than the hero version. Add a one-sentence plain-language explanation under each stat (exit velo / launch angle / distance) — useful both for parents unfamiliar with the terms and for accessibility/SEO.

## 6. Programs & packages
- **H2:** Pick your starting point

Three cards:
1. **Free Evaluation** — $0 — "Start here if you're not sure what your athlete needs yet." CTA: Book My Free Evaluation
2. **Single Lesson** — **$65** `[PLACEHOLDER — confirm real price with David before launch]` — "One-on-one session, any skill focus." CTA: Book a Lesson
3. **4-Lesson Package** *(featured — accent top border)* — **$240** `[PLACEHOLDER — confirm real price with David before launch]` *(shown as "$60/lesson, buy 4 get 1 free")* — "Buy 4, get 1 free. Best for consistent progress." CTA: Book My Free Evaluation

Keep funneling every card toward the free, lowest-friction CTA — don't make a first-time visitor commit to a price before they've talked to a coach.

Both prices above are realistic placeholders for design/review purposes only — render each with a visible `PLACEHOLDER` markup tag next to it. **Do not let these go live without confirming real numbers with David first.**

## 7. Social proof
- **H2:** What parents are saying
- `[ ]` — needs 2–3 real testimonials (quote + parent first name + athlete age/sport). Do not write fake testimonials. Leave this as a clearly flagged placeholder block in the build until real quotes arrive.

## 8. FAQ (accordion)
- **What age does my athlete need to be?** We coach athletes from age 6 through college, at every skill level.
- **What happens during the free evaluation?** A coach spends about 30 minutes watching your athlete hit, field, throw, or pitch and gives you a direct, honest assessment — no obligation to book anything after.
- **Do we need to bring our own equipment?** No — just come ready to move. We'll let you know if anything specific is helpful for your athlete's focus area.
- **What is HitTrax, and do we need it for the first session?** HitTrax is real-time hitting data technology. It's not required for the free evaluation — your coach will recommend it if it fits your athlete's goals.
- **Where are you located?** 207 Penns Trail, Newtown, PA 18940.

## 9. Final CTA band
- **H2:** Fall ball and tryouts are closer than they look.
- **Body:** Book a free evaluation today and find out exactly what your athlete needs to walk in ready.
- **CTA:** Book My Free Evaluation
- Small print beneath: (267) 288-7053 · 207 Penns Trail, Newtown, PA 18940

## 10. Sticky mobile CTA bar
Persistent bottom bar, mobile only, appears once the hero is scrolled past: full-width "Book My Free Evaluation" button, Clay Red. This is the single highest-leverage CRO element on a page that's mostly receiving mobile ad traffic — build it early, not as a finishing touch.

---

## Copy rules for anyone editing this later
- Every primary CTA button says **"Book My Free Evaluation,"** no exceptions, unless it's explicitly the secondary "Meet the coaches" link.
- Speak to the parent, not the athlete — "your athlete," not "you," throughout. The parent is almost always the one clicking the ad and filling out the form.
- No invented stats, testimonials, or pricing, ever. Every `[ ]` is a real, intentional gap. Flag it — don't quietly fill it with something plausible enough to accidentally ship.
