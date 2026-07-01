import Image from 'next/image'
import { FullBleedBreakout } from '../components/FullBleedBreakout'
import { HitTraxStatGrid } from '../components/HitTraxStatGrid'
import { PhotoOverlay } from '../components/PhotoFrame'
import { Section } from '../components/Section'
import { FadeUp } from '../components/motion/FadeUp'
import { ParallaxWrap } from '../components/motion/ParallaxWrap'
import { StaggerGroup } from '../components/motion/StaggerGroup'

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
      <FadeUp>
        <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-accent">
          HitTrax Technology
        </p>
        <h2
          id="hittrax-heading"
          className="mt-3 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.25rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-ink-black"
        >
          Most cages give reps. We give data.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-black/75 lg:text-lg">
          With real-time data and instant feedback, HitTrax turns every swing into actionable data
          — game-like scenarios and measurable results that help players refine their skills while
          giving coaches the insight to individualize instruction and track development over time.
        </p>
      </FadeUp>

      <FadeUp delay={0.06} className="mt-[var(--spacing-section-gap)]">
        <FullBleedBreakout>
          <ParallaxWrap>
            <div className="relative aspect-[21/9] min-h-[280px] w-full overflow-hidden lg:min-h-[420px]">
              <Image
                src="/images/facility-1600.webp"
                alt="NSEC's HitTrax-equipped indoor baseball and softball training cages"
                fill
                sizes="100vw"
                className="object-cover"
                data-placeholder="true"
              />
              <PhotoOverlay />
            </div>
          </ParallaxWrap>
        </FullBleedBreakout>
      </FadeUp>

      <div className="mt-[var(--spacing-section-gap)]">
        <HitTraxStatGrid
          stats={HITTRAX_STATS}
          variant="on-light"
          trigger="inview"
          showDescriptions
        />
      </div>

      <FadeUp className="mt-[var(--spacing-section-gap)]">
        <h3 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-ink-black">
          The Power of HitTrax
        </h3>
      </FadeUp>

      <StaggerGroup className="mt-6 grid gap-5 sm:grid-cols-2 lg:gap-6">
        {HITTRAX_FEATURES.map((feature) => (
          <div
            key={feature.title}
            data-stagger-item
            className="flex h-full min-h-[140px] flex-col border-t-2 border-accent bg-accent-tint px-6 py-5"
          >
            <h4 className="font-display text-lg font-bold text-ink-black lg:text-xl">
              {feature.title}
            </h4>
            <p className="mt-2 flex-1 text-base leading-relaxed text-ink-black/75">
              {feature.description}
            </p>
          </div>
        ))}
      </StaggerGroup>

      <FadeUp className="mt-[var(--spacing-section-gap)] max-w-3xl">
        <h3 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-ink-black">
          Who is HitTrax for?
        </h3>
        <p className="mt-4 text-base leading-relaxed text-ink-black/75 lg:text-lg">
          Elevates performance at every level — young players learning fundamentals, high school
          and travel athletes, and even Major League players benefit from the same industry-leading
          data capture and simulation technology.
        </p>
      </FadeUp>
    </Section>
  )
}
