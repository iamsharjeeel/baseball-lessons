import { CountUpNumber } from '../components/CountUpNumber'
import { FadeUp } from '../components/motion/FadeUp'

const FACTS = [
  {
    value: 45,
    suffix: '+',
    label: 'years combined coaching experience',
    placeholder: true,
  },
  {
    value: 800,
    suffix: '+',
    label: 'athletes trained',
    placeholder: true,
  },
  {
    value: 100,
    suffix: '%',
    label: 'College & pro-level coaching staff',
    placeholder: false,
  },
  {
    value: 1,
    suffix: '',
    label: 'HitTrax-equipped facility',
    placeholder: false,
  },
]

export function TrustBar() {
  return (
    <section
      id="trust-bar"
      aria-labelledby="trust-bar-heading"
      className="w-full bg-paper-white py-16 lg:py-[120px]"
    >
      <div className="mx-auto w-full max-w-[var(--max-width-content)] px-4 lg:px-8">
        <h2 id="trust-bar-heading" className="sr-only">
          NSEC at a glance
        </h2>
        <div className="grid grid-cols-2 divide-x divide-steel-300/25 lg:grid-cols-4">
          {FACTS.map((fact) => (
            <FadeUp key={fact.label}>
              <div className="flex flex-col items-center px-4 py-8 text-center lg:px-8">
                <p
                  className="stat-gradient-text font-data text-[clamp(2.5rem,6vw,3.5rem)] font-bold leading-none tabular-nums"
                  {...(fact.placeholder ? { 'data-placeholder': 'true' } : {})}
                >
                  <CountUpNumber value={fact.value} suffix={fact.suffix} trigger="inview" />
                </p>
                <p className="mt-3 font-body text-sm uppercase tracking-wide text-ink-black/60">
                  {fact.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
