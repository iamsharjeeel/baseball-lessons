import { Section } from '../components/Section'

const TRUST_SIGNALS = [
  'Ages 6 – College',
  'College & Pro-Level Coaching Staff',
  'HitTrax-Equipped Facility',
  'Hitting',
  'Fielding',
  'Catching',
  'Pitching',
]

export function TrustBar() {
  return (
    <Section
      id="trust-bar"
      background="light"
      padding="compact"
      ariaLabelledby="trust-bar-heading"
      className="border-y border-accent/20 bg-accent-tint"
    >
      <h2 id="trust-bar-heading" className="sr-only">
        Why families choose NSEC
      </h2>
      <p className="text-center font-body text-sm font-semibold uppercase leading-relaxed tracking-wide text-ink-black/80 lg:text-base">
        {TRUST_SIGNALS.join(' · ')}
      </p>
    </Section>
  )
}
