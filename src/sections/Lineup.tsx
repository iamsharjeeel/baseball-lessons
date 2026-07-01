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

      <StaggerGroup className="lineup-grid mt-[var(--spacing-section-gap)]">
        {LINEUP_STEPS.map((step, index) => (
          <div
            key={step.number}
            data-stagger-item
            className={`lineup-step flex min-w-0 flex-col ${
              index < LINEUP_STEPS.length - 1 ? 'lineup-step--connected' : ''
            }`}
          >
            <div className="lineup-step__numeral">
              <p className="stat-gradient-text font-data text-[clamp(2.25rem,5vw,3.25rem)] font-bold leading-none tabular-nums lg:text-[clamp(2.5rem,3.5vw,3.5rem)]">
                <CountUpNumber value={step.number} trigger="inview" duration={600} />
              </p>
              <div className="mt-1 min-h-[1.125rem]">
                {'tag' in step && step.tag ? (
                  <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent lg:text-xs">
                    {step.tag}
                  </p>
                ) : null}
              </div>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold leading-tight tracking-tight text-ink-black lg:mt-5 lg:text-xl">
              {step.title}
            </h3>
            <p className="lineup-step__description mt-2 text-sm leading-relaxed text-ink-black/75 lg:mt-3 lg:text-[0.9375rem]">
              {step.description}
            </p>
          </div>
        ))}
      </StaggerGroup>

      <FadeUp className="mt-[var(--spacing-section-gap)] flex justify-start">
        <PrimaryButton />
      </FadeUp>
    </Section>
  )
}
