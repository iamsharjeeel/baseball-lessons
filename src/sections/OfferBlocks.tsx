import { PrimaryButton } from '../components/PrimaryButton'
import { Section } from '../components/Section'
import { StaggerGroup } from '../components/motion/StaggerGroup'
import { FadeUp } from '../components/motion/FadeUp'

const OFFERS = [
  {
    index: '01',
    name: 'Individual Sessions',
    description:
      'Focused swing work with data tracking — ideal for athletes improving mechanics and power.',
  },
  {
    index: '02',
    name: 'Small Group Training',
    description:
      '2–4 athletes using HitTrax to build technical skills, confidence, timing, and compete in fun competitions.',
  },
  {
    index: '03',
    name: 'Team Sessions',
    description:
      'Coaches: bring your team, access their data sessions, and improve metrics, technique, and performance.',
  },
]

export function OfferBlocks() {
  return (
    <Section id="offers" background="light" ariaLabelledby="offers-heading">
      <FadeUp>
        <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-accent">
          Training options
        </p>
        <h2
          id="offers-heading"
          className="mt-3 max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-ink-black"
        >
          Training built for every athlete
        </h2>
      </FadeUp>

      <StaggerGroup className="mt-[var(--spacing-section-gap)] grid gap-5 lg:grid-cols-3 lg:gap-6">
        {OFFERS.map((offer) => (
          <div key={offer.name} data-stagger-item className="h-full">
            <div className="editorial-card h-full">
            <p className="font-data text-sm font-bold uppercase tracking-widest text-accent">
              {offer.index}
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-ink-black">
              {offer.name}
            </h3>
            <p className="mt-4 flex-1 text-base leading-relaxed text-ink-black/75">
              {offer.description}
            </p>
            <div className="mt-auto pt-8">
              <PrimaryButton className="w-full" />
            </div>
          </div>
          </div>
        ))}
      </StaggerGroup>
    </Section>
  )
}
