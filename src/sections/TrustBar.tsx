import { CountUpNumber } from '../components/CountUpNumber'
import { FadeUp } from '../components/motion/FadeUp'

const FACTS = [
  {
    value: 45,
    suffix: '+',
    label: 'years combined coaching experience',
  },
  {
    value: 800,
    suffix: '+',
    label: 'athletes trained',
  },
  {
    value: 100,
    suffix: '%',
    label: 'College & pro-level coaching staff',
  },
  {
    value: 1,
    suffix: '',
    label: 'HitTrax-equipped facility',
  },
]

export function TrustBar() {
  return (
    <section id="trust-bar" aria-labelledby="trust-bar-heading" className="w-full bg-ink-black py-16 lg:py-20">
      <div aria-hidden="true" className="grain-overlay absolute inset-0 pointer-events-none opacity-[0.025]" />
      <div className="relative mx-auto w-full max-w-[var(--max-width-content)] px-4 lg:px-8">
        <h2 id="trust-bar-heading" className="sr-only">
          NSEC at a glance
        </h2>
        <div className="grid grid-cols-2 divide-x divide-paper-white/10 lg:grid-cols-4">
          {FACTS.map((fact) => (
            <FadeUp key={fact.label}>
              <div className="flex flex-col items-center py-8 text-center px-4 lg:px-8">
                <p className="stat-gradient-text font-data text-[clamp(2.5rem,6vw,3.5rem)] font-bold leading-none tabular-nums">
                  <CountUpNumber value={fact.value} suffix={fact.suffix} trigger="inview" />
                </p>
                <p className="mt-3 font-body text-sm text-paper-white/60 uppercase tracking-wide">
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
