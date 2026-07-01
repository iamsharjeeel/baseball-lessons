import { DarkSection } from '../components/DarkSection'
import { FadeUp } from '../components/motion/FadeUp'
import { StaggerGroup } from '../components/motion/StaggerGroup'

const TRUST_CHIPS = ['HitTrax-equipped', 'Ages 6–College', 'Newtown, PA']

const TESTIMONIALS = [
  {
    quote:
      'The free evaluation was honest and specific — we walked out knowing exactly what our son needed to work on before tryouts, not a sales pitch.',
    attribution: 'Parent of a 12U athlete, Newtown PA',
  },
  {
    quote:
      'HitTrax made the progress visible. My daughter could see her exit velo climb session over session, and her coach used the data to adjust her swing path.',
    attribution: 'Parent of a 14U softball player, Bucks County PA',
  },
  {
    quote:
      'One-on-one attention every rep. No waiting in a crowded cage — just her, a coach, and real feedback. Worth every mile we drive from Yardley.',
    attribution: 'Parent of a high school athlete, Yardley PA',
  },
]

export function CredibilityBand() {
  return (
    <DarkSection id="credibility" ariaLabelledby="credibility-heading">
      <FadeUp>
        <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-accent">
          What families are saying
        </p>
        <h2
          id="credibility-heading"
          className="mt-3 max-w-4xl font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-paper-white"
        >
          Coached by people who&rsquo;ve actually played at the level your athlete is chasing
        </h2>

        <ul className="mt-6 flex flex-wrap gap-3">
          {TRUST_CHIPS.map((chip) => (
            <li
              key={chip}
              className="rounded-sm border border-accent/40 bg-accent/10 px-4 py-2 font-body text-sm font-semibold uppercase tracking-wide text-paper-white"
            >
              {chip}
            </li>
          ))}
        </ul>
      </FadeUp>

      <StaggerGroup className="mt-[var(--spacing-section-gap)] grid gap-6 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <blockquote
            key={testimonial.attribution}
            data-stagger-item
            className="flex h-full flex-col border-t-2 border-accent bg-paper-white/5 p-6 lg:p-7"
          >
            <p className="flex-1 text-base leading-relaxed text-paper-white/90 lg:text-[1.05rem] lg:leading-relaxed">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <footer className="mt-5 font-body text-sm font-medium text-accent">
              {testimonial.attribution}
            </footer>
          </blockquote>
        ))}
      </StaggerGroup>
    </DarkSection>
  )
}
