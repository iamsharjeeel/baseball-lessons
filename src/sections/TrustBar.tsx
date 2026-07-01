import { Section } from '../components/Section'
import { PlaceholderTag } from '../components/PlaceholderTag'
import { CountUpNumber } from '../components/CountUpNumber'
import { FadeUp } from '../components/motion/FadeUp'

const FACTS = [
  {
    value: 45,
    suffix: '+',
    label: 'years combined coaching experience',
    placeholderNote: 'PLACEHOLDER — confirm real number with David before launch',
  },
  {
    value: 800,
    suffix: '+',
    label: 'athletes trained',
    placeholderNote: 'PLACEHOLDER — confirm real number with David before launch',
  },
  {
    value: null,
    suffix: '',
    label: 'College & pro-level coaching staff',
    placeholderNote: null,
  },
  {
    value: null,
    suffix: '',
    label: 'HitTrax-equipped facility',
    placeholderNote: null,
  },
]

export function TrustBar() {
  return (
    <Section id="trust-bar" background="light" ariaLabelledby="trust-bar-heading">
      <h2 id="trust-bar-heading" className="sr-only">
        NSEC at a glance
      </h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4 lg:gap-x-8">
        {FACTS.map((fact) => (
          <FadeUp key={fact.label}>
            {fact.value !== null ? (
              <p className="stat-gradient-text font-data text-[clamp(2.5rem,6vw,3.5rem)] font-bold leading-none tabular-nums">
                <CountUpNumber value={fact.value} suffix={fact.suffix} trigger="inview" />
                {fact.placeholderNote && <PlaceholderTag note={fact.placeholderNote} />}
              </p>
            ) : null}
            <p
              className={`font-body text-sm uppercase tracking-wide text-ink-black/70 ${fact.value !== null ? 'mt-3' : 'text-base font-semibold normal-case tracking-normal text-ink-black'}`}
            >
              {fact.label}
            </p>
          </FadeUp>
        ))}
      </div>
    </Section>
  )
}
