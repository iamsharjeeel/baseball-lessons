import { SectionReveal } from '@/components/ui/SectionReveal'
import { LineupCard, type LineupRow } from '@/components/ui/LineupCard'

const LINEUP_ROWS: LineupRow[] = [
  {
    number: '1',
    position: 'LEAD-OFF',
    title: 'Free Skills Evaluation',
    description:
      'A real coach watches your athlete hit, field, or throw and gives you an honest read on where they\'re at. No pitch, no pressure.',
  },
  {
    number: '2',
    position: '#2',
    title: 'A Plan Built for Them',
    description:
      'Based on the evaluation, your coach builds a training plan around what your athlete actually needs to improve — not a generic curriculum.',
  },
  {
    number: '3',
    position: '#3',
    title: '1-on-1 Coaching',
    description:
      'Every rep is coached individually. No 10-kid group cage sessions where your athlete gets two minutes of attention.',
  },
  {
    number: '4',
    position: '#4',
    title: 'HitTrax Data Tracking',
    description:
      'Swings, exit velocity, launch angle — every session adds to a real performance record so progress is measurable, not just felt.',
  },
  {
    number: '5',
    position: 'CLEANUP',
    title: 'Game Ready',
    description:
      'Walk into tryouts, fall ball, or the next season with real reps and real data behind your athlete.',
  },
]

export function Lineup() {
  return (
    <section
      id="lineup"
      className="section-pad border-t border-steel-300/10"
      aria-labelledby="lineup-heading"
    >
      <SectionReveal className="page-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <div className="text-left">
            <h2
              id="lineup-heading"
              data-reveal
              className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-chalk-white"
            >
              Here&apos;s the lineup
            </h2>
            <p
              data-reveal
              className="mt-4 max-w-md text-base leading-relaxed text-chalk-white/85 lg:text-lg"
            >
              From first session to game-ready, here&apos;s exactly what happens.
            </p>
          </div>

          <LineupCard rows={LINEUP_ROWS} />
        </div>
      </SectionReveal>
    </section>
  )
}
