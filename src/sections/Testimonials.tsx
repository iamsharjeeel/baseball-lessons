import { DarkSection } from '../components/DarkSection'
import { FadeUp } from '../components/motion/FadeUp'

/**
 * Section 7 per CONTENT_SPEC.md — testimonials are the one category of
 * gap that never gets a placeholder value, only a clearly-flagged empty
 * slot. Do not fill this with an invented quote.
 */
export function Testimonials() {
  return (
    <DarkSection id="testimonials" ariaLabelledby="testimonials-heading">
      <FadeUp>
        <h2
          id="testimonials-heading"
          className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-paper-white"
        >
          What parents are saying
        </h2>

        <div
          data-testimonial-pending="true"
          className="mt-12 rounded-md border border-dashed border-paper-white/30 bg-paper-white/5 p-10 text-center lg:mt-16"
        >
          <p className="font-body text-base font-semibold uppercase tracking-widest text-accent">
            Testimonials pending
          </p>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-paper-white/70">
            2–3 real parent testimonials go here once received. Per{' '}
            <code className="text-paper-white/90">CONTENT_SPEC.md</code>, this
            slot intentionally stays empty rather than using fabricated quotes.
          </p>
        </div>
      </FadeUp>
    </DarkSection>
  )
}
