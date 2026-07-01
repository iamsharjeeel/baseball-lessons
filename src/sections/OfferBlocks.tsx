import { PrimaryButton } from '../components/PrimaryButton'
import { Section } from '../components/Section'
import { FadeUp } from '../components/motion/FadeUp'

const OFFERS = [
  {
    name: 'Individual Sessions',
    description:
      'Focused swing work with data tracking — ideal for athletes improving mechanics and power.',
  },
  {
    name: 'Small Group Training',
    description:
      '2–4 athletes using HitTrax to build technical skills, confidence, timing, and compete in fun competitions.',
  },
  {
    name: 'Team Sessions',
    description:
      'Coaches: bring your team, access their data sessions, and improve metrics, technique, and performance.',
  },
]

export function OfferBlocks() {
  return (
    <Section id="offers" background="light" ariaLabelledby="offers-heading">
      <FadeUp>
        <h2
          id="offers-heading"
          className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-ink-black"
        >
          Training built for every athlete
        </h2>
      </FadeUp>

      <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        {OFFERS.map((offer, index) => (
          <FadeUp key={offer.name} delay={index * 0.08}>
            <div className="flex h-full flex-col border-t-2 border-accent bg-paper-white p-8 shadow-sm ring-1 ring-ink-black/6">
              <h3 className="font-display text-xl font-bold tracking-tight text-ink-black">
                {offer.name}
              </h3>
              <p className="mt-4 flex-1 text-base leading-relaxed text-ink-black/70">
                {offer.description}
              </p>
              <div className="mt-8">
                <PrimaryButton className="w-full" />
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  )
}
