import { PrimaryButton } from '../components/PrimaryButton'
import { Section } from '../components/Section'
import { FadeUp } from '../components/motion/FadeUp'

const PROGRAMS = [
  {
    name: 'Free Evaluation',
    description: 'Start here if you\'re not sure what your athlete needs yet.',
    featured: false,
    badge: null,
  },
  {
    name: 'Single Lesson',
    description: 'One-on-one session, any skill focus.',
    featured: false,
    badge: null,
  },
  {
    name: '4-Lesson Package',
    description: 'Buy 4, get 1 free. Best for consistent progress.',
    featured: true,
    badge: 'Most Popular',
  },
]

export function Programs() {
  return (
    <Section id="programs" background="light" ariaLabelledby="programs-heading">
      <FadeUp>
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
          <span className="h-px w-6 bg-accent" />
          Training Built for Every Athlete
        </p>
        <h2
          id="programs-heading"
          className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-ink-black"
        >
          Pick your starting point
        </h2>
      </FadeUp>

      <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        {PROGRAMS.map((program, index) => (
          <FadeUp key={program.name} delay={index * 0.08}>
            {program.featured ? (
              /* Featured card — dark premium treatment */
              <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-ink-black p-8 shadow-2xl ring-1 ring-accent/30">
                {/* Glow effect */}
                <div aria-hidden="true" className="pointer-events-none absolute -top-16 left-1/2 h-32 w-48 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
                {/* Badge */}
                {program.badge && (
                  <span className="mb-6 inline-block self-start rounded-sm bg-accent px-3 py-1 font-body text-xs font-bold uppercase tracking-widest text-paper-white">
                    {program.badge}
                  </span>
                )}
                <h3 className="font-display text-xl font-bold tracking-tight text-paper-white">
                  {program.name}
                </h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-paper-white/70">
                  {program.description}
                </p>
                <div className="mt-8">
                  <PrimaryButton className="w-full" />
                </div>
              </div>
            ) : (
              /* Standard card */
              <div className="flex h-full flex-col rounded-xl bg-paper-white p-8 shadow-sm ring-1 ring-steel-300/25 border-t-4 border-steel-300/20 hover:border-accent/60 transition-colors">
                <h3 className="font-display text-xl font-bold tracking-tight text-ink-black">
                  {program.name}
                </h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-ink-black/70">
                  {program.description}
                </p>
                <div className="mt-8">
                  <PrimaryButton className="w-full" />
                </div>
              </div>
            )}
          </FadeUp>
        ))}
      </div>
    </Section>
  )
}
