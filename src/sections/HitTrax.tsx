import { Section } from '../components/Section'
import { StatReadoutPanel } from '../components/StatReadoutPanel'
import { FadeUp } from '../components/motion/FadeUp'

const HITTRAX_STATS = [
  {
    label: 'Exit Velo',
    value: 78,
    suffix: ' MPH',
    explanation:
      'How fast the ball leaves the bat — the clearest single number for raw power.',
  },
  {
    label: 'Launch Angle',
    value: 19,
    suffix: '°',
    explanation:
      'The vertical angle of the ball off the bat — the difference between a line drive and a pop-up.',
  },
  {
    label: 'Distance',
    value: 212,
    suffix: ' FT',
    explanation:
      'How far a well-struck ball would travel — turns one swing into a measurable outcome.',
  },
]

export function HitTrax() {
  return (
    <Section id="hittrax" background="light" ariaLabelledby="hittrax-heading">
      <FadeUp className="max-w-2xl">
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
          <span className="h-px w-6 bg-accent" />
          Data Driven
        </p>
        <h2
          id="hittrax-heading"
          className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-ink-black"
        >
          Most cages give reps. We give data.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-black/70 lg:text-lg">
          HitTrax is the same real-time performance capture system used by
          college and professional programs. Every swing becomes a number —
          exit velocity, launch angle, distance — so your athlete, and their
          coach, know exactly what to work on next.
        </p>
      </FadeUp>

      <FadeUp delay={0.1} className="mt-10 lg:mt-12 flex justify-center">
        <div className="relative w-full max-w-[340px] overflow-hidden rounded-2xl border border-steel-300/10 shadow-2xl aspect-[9/16]">
          <video
            src="/images/ghost-hitting-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          {/* Subtle vignette */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,11,13,0.3)_0%,rgba(10,11,13,0)_25%)]" />
        </div>
      </FadeUp>

      <div className="mt-12 lg:mt-16">
        <StatReadoutPanel stats={HITTRAX_STATS} size="large" variant="on-light" trigger="inview" />
      </div>
    </Section>
  )
}
