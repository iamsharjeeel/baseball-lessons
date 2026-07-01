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
          className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-ink-black"
        >
          Here&rsquo;s the lineup
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-black/70 lg:text-lg">
          From first session to game-ready, here&rsquo;s exactly what happens.
        </p>
      </FadeUp>

      <StaggerGroup className="mt-12 lg:mt-16">
        {LINEUP_STEPS.map((step, index) => (
          <div
            key={step.number}
            data-stagger-item
            className={`grid grid-cols-[auto_1fr] items-start gap-6 py-12 lg:grid-cols-[200px_1fr] lg:gap-12 ${
              index !== 0 ? 'border-t border-steel-300/30' : ''
            }`}
          >
            <div>
              <p className="stat-gradient-text font-data text-[clamp(3.5rem,9vw,7rem)] font-bold leading-none">
                <CountUpNumber value={step.number} trigger="inview" duration={600} />
              </p>
              <p className="mt-1 font-body text-xs font-semibold uppercase tracking-widest text-steel-300">
                {step.tag}
              </p>
            </div>
            <div className="pt-2 lg:pt-4">
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink-black lg:text-3xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-black/70 lg:text-lg">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </StaggerGroup>
    </Section>
  )
}
