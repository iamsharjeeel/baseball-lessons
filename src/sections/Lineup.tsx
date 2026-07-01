import { PrimaryButton } from '../components/PrimaryButton'
import { Section } from '../components/Section'
import { FadeUp } from '../components/motion/FadeUp'
import { StaggerGroup } from '../components/motion/StaggerGroup'
import { CountUpNumber } from '../components/CountUpNumber'

const LINEUP_STEPS = [
  {
    number: 1,
    tag: 'LEAD-OFF',
    title: 'Free Skills Evaluation',
    description:
      'A real coach watches your athlete hit, field, or throw and gives you an honest read on where they’re at. No pitch, no pressure.',
  },
  {
    number: 2,
    title: 'A Plan Built for Them',
    description:
      'Based on the evaluation, your coach builds a training plan around what your athlete actually needs to improve — not a generic curriculum.',
  },
  {
    number: 3,
    title: '1-on-1 Coaching',
    description:
      'Every rep is coached individually. No 10-kid group cage sessions where your athlete gets two minutes of attention.',
  },
  {
    number: 4,
    title: 'HitTrax Data Tracking',
    description:
      'Swings, exit velocity, launch angle — every session adds to a real performance record so progress is measurable, not just felt.',
  },
  {
    number: 5,
    tag: 'CLEANUP',
    title: 'Game Ready',
    description:
      'Walk into tryouts, fall ball, or the next season with real reps and real data behind your athlete.',
  },
] as const

export function Lineup() {
  return (
    <Section id="lineup" background="light" ariaLabelledby="lineup-heading">
      <FadeUp>
        <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-accent">
          How it works
        </p>
        <h2
          id="lineup-heading"
          className="mt-3 max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-ink-black"
        >
          Here&rsquo;s the lineup
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-black/75">
          From first session to game-ready, here&rsquo;s exactly what happens.
        </p>
      </FadeUp>

      <StaggerGroup className="mt-[var(--spacing-section-gap)]">
        {LINEUP_STEPS.map((step, index) => (
          <div
            key={step.number}
            data-stagger-item
            className={`grid grid-cols-[auto_1fr] items-start gap-5 py-5 lg:grid-cols-[120px_1fr] lg:gap-10 lg:py-6 ${
              index !== 0 ? 'border-t border-ink-black/8' : ''
            }`}
          >
            <div>
              <p className="stat-gradient-text font-data text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-none tabular-nums">
                <CountUpNumber value={step.number} trigger="inview" duration={600} />
              </p>
              {'tag' in step && step.tag && (
                <p className="mt-0.5 font-body text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent lg:text-xs">
                  {step.tag}
                </p>
              )}
            </div>
            <div className="pt-1 lg:pt-2">
              <h3 className="font-display text-xl font-bold tracking-tight text-ink-black lg:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-black/75">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </StaggerGroup>

      <FadeUp className="mt-[var(--spacing-section-gap)] flex justify-start">
        <PrimaryButton />
      </FadeUp>
    </Section>
  )
}
