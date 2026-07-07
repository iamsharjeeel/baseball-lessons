import { Section } from '../components/Section'
import { FadeUp } from '../components/motion/FadeUp'
import { StaggerGroup } from '../components/motion/StaggerGroup'
import { CountUpNumber } from '../components/CountUpNumber'

type LineupStep = {
  number: number
  tag?: string
  title: string
  description: string
}

const LINEUP_STEPS: LineupStep[] = [
  {
    number: 1,
    tag: 'LEAD-OFF',
    title: 'Free Skills Evaluation',
    description:
      'A real coach watches your athlete hit, field, or throw and gives you an honest read on where they\'re at. No pitch, no pressure.',
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
]

function LineupStepCard({ step }: { step: LineupStep }) {
  return (
    <>
      <p className="stat-gradient-text font-data text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none tabular-nums">
        <CountUpNumber value={step.number} trigger="inview" duration={600} />
      </p>
      {step.tag && (
        <p className="mt-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {step.tag}
        </p>
      )}
      <h3
        className={`font-display text-lg font-bold tracking-tight text-ink-black lg:text-xl ${step.tag ? 'mt-2' : 'mt-3'}`}
      >
        {step.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-black/70 lg:text-base">
        {step.description}
      </p>
    </>
  )
}

export function Lineup() {
  return (
    <Section id="lineup" background="light" ariaLabelledby="lineup-heading">
      <FadeUp className="max-w-2xl">
        <p className="mb-4 flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          <span className="h-px w-6 bg-accent" />
          The Process
        </p>
        <h2
          id="lineup-heading"
          className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-ink-black"
        >
          Here&rsquo;s the lineup
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-black/70 lg:text-lg">
          From first session to game-ready, here&rsquo;s exactly what happens.
        </p>
      </FadeUp>

      <StaggerGroup
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-16 lg:grid lg:grid-cols-5 lg:gap-8 lg:overflow-visible lg:pb-0 lg:snap-none [&::-webkit-scrollbar]:hidden lg:divide-x lg:divide-steel-300/20"
      >
        {LINEUP_STEPS.map((step) => (
          <div
            key={step.number}
            data-stagger-item
            className="min-w-[85vw] shrink-0 snap-center rounded-md border border-steel-300/25 p-6 lg:min-w-0 lg:shrink lg:rounded-none lg:border-0 lg:px-6 lg:first:pl-0 lg:last:pr-0"
          >
            <LineupStepCard step={step} />
          </div>
        ))}
      </StaggerGroup>
      <p className="mt-3 text-center font-body text-xs text-steel-300 lg:hidden" aria-hidden="true">
        Swipe to see all 5 steps
      </p>
    </Section>
  )
}
