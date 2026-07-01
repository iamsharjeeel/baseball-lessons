import { DarkSection } from '../components/DarkSection'
import { FadeUp } from '../components/motion/FadeUp'

const TRUST_CHIPS = ['HitTrax-equipped', 'Ages 6–College', 'Newtown, PA']

export function CredibilityBand() {
  return (
    <DarkSection id="credibility" ariaLabelledby="credibility-heading">
      <FadeUp>
        <h2
          id="credibility-heading"
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-paper-white"
        >
          Coached by people who&rsquo;ve actually played at the level your athlete is chasing
        </h2>

        <ul className="mt-8 flex flex-wrap gap-3">
          {TRUST_CHIPS.map((chip) => (
            <li
              key={chip}
              className="rounded-sm border border-paper-white/20 px-4 py-2 font-body text-sm font-medium uppercase tracking-wide text-paper-white/90"
            >
              {chip}
            </li>
          ))}
        </ul>

        {/* TESTIMONIALS: insert real client-supplied reviews here */}
        <div
          data-testimonial-slot="true"
          className="mt-12 border border-dashed border-paper-white/20 p-8 text-center lg:mt-16"
          aria-hidden="true"
        >
          <p className="text-sm uppercase tracking-widest text-paper-white/40">
            Client testimonials pending
          </p>
        </div>
      </FadeUp>
    </DarkSection>
  )
}
