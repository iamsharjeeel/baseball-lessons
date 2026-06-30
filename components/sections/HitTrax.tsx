import { SectionReveal } from '@/components/ui/SectionReveal'
import { StatReadout } from '@/components/ui/StatReadout'

const STATS = [
  {
    label: 'Exit Velo',
    value: 78,
    suffix: ' MPH',
    explanation:
      'How fast the ball leaves the bat — a direct read on contact quality and power.',
  },
  {
    label: 'Launch Angle',
    value: 19,
    suffix: '°',
    explanation:
      'The vertical angle of the ball off the bat — shapes whether it stays low or carries.',
  },
  {
    label: 'Distance',
    value: 212,
    suffix: ' FT',
    explanation:
      'Projected carry based on the swing — combines exit velocity and launch angle into one number.',
  },
]

export function HitTrax() {
  return (
    <section
      id="hittrax"
      className="section-pad bg-paper-white"
      aria-labelledby="hittrax-heading"
    >
      <SectionReveal className="page-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          <div className="text-left">
            <h2
              id="hittrax-heading"
              data-reveal
              className="type-h2 font-display font-bold text-ink-black"
            >
              Most cages give reps. We give data.
            </h2>
            <p
              data-reveal
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-black/80 lg:text-lg"
            >
              HitTrax is the same real-time performance capture system used by
              college and professional programs. Every swing becomes a number —
              exit velocity, launch angle, distance — so your athlete, and their
              coach, know exactly what to work on next.
            </p>
          </div>

          <div data-reveal className="w-full min-w-0">
            <StatReadout
              stats={STATS}
              caption="Real HitTrax output from an NSEC training session"
              trigger="scroll"
            />
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
