import Image from 'next/image'
import { PhotoFrame } from '../components/PhotoFrame'
import { Section } from '../components/Section'
import { FadeUp } from '../components/motion/FadeUp'
import { ParallaxWrap } from '../components/motion/ParallaxWrap'
import { StaggerGroup } from '../components/motion/StaggerGroup'
import { CountUpNumber } from '../components/CountUpNumber'

const HITTRAX_STATS = [
  {
    value: 78,
    unit: 'MPH',
    label: 'Exit Velo',
    description:
      'How fast the ball leaves the bat — the clearest single number for raw power.',
  },
  {
    value: 19,
    unit: '°',
    label: 'Launch Angle',
    description:
      'The vertical angle off the bat — the difference between a line drive and a pop-up.',
  },
  {
    value: 212,
    unit: 'FT',
    label: 'Distance',
    description:
      'How far a well-struck ball would travel — one swing, one measurable outcome.',
  },
]

const HITTRAX_FEATURES = [
  {
    title: 'All-in-One System',
    description:
      'Capture metrics for hitting, pitching, and catching — even live at bats.',
  },
  {
    title: 'Video Analysis',
    description:
      'Integrated high-speed video unlocks new insights on player movement.',
  },
  {
    title: 'Player Buy-In',
    description:
      'An intuitive interface lets players see their performance and make adjustments.',
  },
  {
    title: 'In-Depth Reporting',
    description:
      'Advanced metrics enable review of individual sessions and trends over time.',
  },
]

export function HitTrax() {
  return (
    <Section id="hittrax" background="light" ariaLabelledby="hittrax-heading">
      <FadeUp className="max-w-3xl">
        <h2
          id="hittrax-heading"
          className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-ink-black"
        >
          Most cages give reps. We give data.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-black/70 lg:text-lg">
          With real-time data and instant feedback, HitTrax turns every swing into actionable data
          — game-like scenarios and measurable results that help players refine their skills while
          giving coaches the insight to individualize instruction and track development over time.
        </p>
      </FadeUp>

      <FadeUp delay={0.08}>
        <ParallaxWrap>
          <PhotoFrame aspect="facility" className="rounded-sm">
            <Image
              src="/images/facility-1600.webp"
              alt="NSEC's HitTrax-equipped indoor baseball and softball training cages"
              fill
              sizes="(min-width: 1024px) 1180px, 100vw"
              className="object-cover"
              data-placeholder="true"
            />
          </PhotoFrame>
        </ParallaxWrap>
      </FadeUp>

      <figure className="mt-12 lg:mt-16" aria-label="HitTrax performance metrics">
        <div className="border-t-2 border-accent pt-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            {HITTRAX_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col text-center sm:text-left">
                <div className="flex items-end justify-center gap-1 sm:justify-start">
                  <span className="stat-gradient-text font-data text-[clamp(3rem,8vw,5rem)] font-bold leading-none tabular-nums">
                    <CountUpNumber value={stat.value} trigger="inview" />
                  </span>
                  <span className="mb-1 font-data text-lg font-bold uppercase leading-none text-accent lg:text-xl">
                    {stat.unit}
                  </span>
                </div>
                <p className="mt-3 font-body text-xs font-bold uppercase tracking-[0.15em] text-ink-black/70">
                  {stat.label}
                </p>
                <p className="mt-2 min-h-[3.5rem] text-sm leading-relaxed text-ink-black/60">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </figure>

      <FadeUp className="mt-16 lg:mt-20">
        <h3 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-ink-black">
          The Power of HitTrax
        </h3>
      </FadeUp>

      <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-10 lg:gap-8">
        {HITTRAX_FEATURES.map((feature) => (
          <div
            key={feature.title}
            data-stagger-item
            className="border-t border-accent/40 pt-6"
          >
            <h4 className="font-display text-lg font-bold text-ink-black lg:text-xl">
              {feature.title}
            </h4>
            <p className="mt-2 text-base leading-relaxed text-ink-black/70">
              {feature.description}
            </p>
          </div>
        ))}
      </StaggerGroup>

      <FadeUp className="mt-14 max-w-3xl lg:mt-16">
        <h3 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-ink-black">
          Who is HitTrax for?
        </h3>
        <p className="mt-4 text-base leading-relaxed text-ink-black/70 lg:text-lg">
          Elevates performance at every level — young players learning fundamentals, high school
          and travel athletes, and even Major League players benefit from the same industry-leading
          data capture and simulation technology.
        </p>
      </FadeUp>
    </Section>
  )
}
