import { Section } from '../components/Section'
import { PlaceholderTag } from '../components/PlaceholderTag'

const FACTS = [
  {
    value: '45+',
    label: 'years combined coaching experience',
    placeholderNote: 'PLACEHOLDER — confirm real number with David before launch',
  },
  {
    value: '800+',
    label: 'athletes trained',
    placeholderNote: 'PLACEHOLDER — confirm real number with David before launch',
  },
  {
    value: null,
    label: 'College & pro-level coaching staff',
    placeholderNote: null,
  },
  {
    value: null,
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
          <div key={fact.label}>
            {fact.value ? (
              <p className="font-data text-[clamp(2.5rem,6vw,3.5rem)] font-bold leading-none tabular-nums text-clay-red">
                {fact.value}
                {fact.placeholderNote && <PlaceholderTag note={fact.placeholderNote} />}
              </p>
            ) : null}
            <p
              className={`font-body text-sm uppercase tracking-wide text-night-black/70 ${fact.value ? 'mt-3' : 'text-base font-semibold normal-case tracking-normal text-night-black'}`}
            >
              {fact.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
