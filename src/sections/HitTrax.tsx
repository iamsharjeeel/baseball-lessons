import Image from 'next/image'
import { PhotoFrame } from '../components/PhotoFrame'
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

      <FadeUp delay={0.1}>
        <PhotoFrame aspect="facility" className="mt-10 rounded-md lg:mt-12">
          <Image
            src="/images/facility-1600.webp"
            alt="Wide view of NSEC's indoor baseball and softball training facility with batting cages and turf"
            fill
            sizes="(min-width: 1024px) 1180px, 100vw"
            className="object-cover"
            data-placeholder="true"
          />
        </PhotoFrame>
      </FadeUp>

      <div className="mt-12 lg:mt-16">
        <StatReadoutPanel stats={HITTRAX_STATS} size="large" variant="on-light" trigger="inview" />
      </div>
    </Section>
  )
}
