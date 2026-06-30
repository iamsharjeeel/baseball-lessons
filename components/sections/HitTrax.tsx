import { SectionReveal } from '@/components/ui/SectionReveal'
import { StatReadoutPanel } from '@/components/ui/StatReadoutPanel'

const HITTRAX_STATS = [
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
      className="section-pad border-t border-turf-green/30 bg-[linear-gradient(180deg,rgb(44_107_79/0.12)_0%,transparent_100%)]"
      aria-labelledby="hittrax-heading"
    >
      <SectionReveal className="page-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          <div className="text-left">
            <h2
              id="hittrax-heading"
              data-reveal
              className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-chalk-white"
            >
              Most cages give reps. We give data.
            </h2>
            <p
              data-reveal
              className="mt-4 max-w-xl text-base leading-relaxed text-chalk-white/85 lg:text-lg"
            >
              HitTrax is the same real-time performance capture system used by
              college and professional programs. Every swing becomes a number —
              exit velocity, launch angle, distance — so your athlete, and their
              coach, know exactly what to work on next.
            </p>
          </div>

          <div data-reveal className="w-full">
            <StatReadoutPanel
              stats={HITTRAX_STATS}
              size="large"
              trigger="scroll"
              showGlow
            />
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
