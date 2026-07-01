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
    tag: '#2',
    title: 'A Plan Built for Them',
    description:
      'Based on the evaluation, your coach builds a training plan around what your athlete actually needs to improve — not a generic curriculum.',
  },
  {
    number: 3,
    tag: '#3',
    title: '1-on-1 Coaching',
    description:
      'Every rep is coached individually. No 10-kid group cage sessions where your athlete gets two minutes of attention.',
  },
  {
    number: 4,
    tag: '#4',
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
]

export function Lineup() {
  return (
    <Section id="lineup" background="light" ariaLabelledby="lineup-heading">
      <FadeUp className="max-w-2xl">
        <h2
          id="lineup-heading"
          className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-ink-black"
        >
          Here&rsquo;s the lineup
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-black/70 lg:text-lg">
          From first session to game-ready, here&rsquo;s exactly what happens.
        </p>
      </FadeUp>

      <StaggerGroup className="relative mt-12 lg:mt-16">
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-[clamp(1.5rem,4vw,3.5rem)] top-8 hidden w-px bg-accent/30 lg:block"
        />
        {LINEUP_STEPS.map((step, index) => (
          <div
            key={step.number}
            data-stagger-item
            className={`relative grid grid-cols-[auto_1fr] items-start gap-6 py-10 lg:grid-cols-[140px_1fr] lg:gap-12 lg:py-12 ${
              index !== 0 ? 'border-t border-ink-black/8' : ''
            }`}
          >
            <div className="relative z-10 pl-0 lg:pl-2">
              <p className="stat-gradient-text font-data text-[clamp(3rem,8vw,5.5rem)] font-bold leading-none tabular-nums">
                <CountUpNumber value={step.number} trigger="inview" duration={600} />
              </p>
              <p className="mt-1 font-body text-[0.65rem] font-bold uppercase tracking-[0.18em] text-steel-300 lg:text-xs">
                {step.tag}
              </p>
            </div>
            <div className="pt-1 lg:pt-3">
              <h3 className="font-display text-xl font-bold tracking-tight text-ink-black lg:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-black/70">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </StaggerGroup>

      <FadeUp className="mt-6 flex justify-start lg:mt-10">
        <PrimaryButton />
      </FadeUp>
    </Section>
  )
}
