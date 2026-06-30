import { useCountUp } from '../hooks/useCountUp'
import { Image } from '../components/Image'
import { PhotoFrame } from '../components/PhotoFrame'
import { Section } from '../components/Section'

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
    suffix: '\u00b0',
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

function HitTraxStat({
  label,
  value,
  suffix,
  explanation,
}: (typeof HITTRAX_STATS)[number]) {
  const count = useCountUp(value, 900)
  return (
    <div>
      <p className="font-data text-[clamp(3.5rem,9vw,7rem)] font-bold leading-none tabular-nums text-clay-red">
        {count}
        {suffix}
      </p>
      <p className="mt-3 font-body text-sm font-semibold uppercase tracking-widest text-night-black">
        {label}
      </p>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-night-black/70">
        {explanation}
      </p>
    </div>
  )
}

export function HitTrax() {
  return (
    <Section id="hittrax" background="light" ariaLabelledby="hittrax-heading">
      <div className="max-w-2xl">
        <h2
          id="hittrax-heading"
          className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-night-black"
        >
          Most cages give reps. We give data.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-night-black/70 lg:text-lg">
          HitTrax is the same real-time performance capture system used by
          college and professional programs. Every swing becomes a number —
          exit velocity, launch angle, distance — so your athlete, and their
          coach, know exactly what to work on next.
        </p>
      </div>

      <PhotoFrame aspect="facility" className="mt-10 rounded-md lg:mt-12">
        <Image
          src="/images/facility"
          widths={[800, 1200, 1600]}
          width={1600}
          height={900}
          alt="Wide view of NSEC's indoor baseball and softball training facility with batting cages and turf"
          sizes="(min-width: 1024px) 1180px, 100vw"
          className="h-full w-full object-cover"
        />
      </PhotoFrame>

      {/*
        v4 fix #2: the HitTrax stat row's only visual anchor is a single
        2px accent top border — matching the hero stat panel's top-border
        treatment without bringing back the v1/v2 heavy steel-700 box, so
        the three numbers read as one connected readout, not three
        floating elements.
      */}
      <div
        className="mt-12 grid grid-cols-1 gap-10 border-t-2 border-clay-red pt-10 sm:grid-cols-3 lg:mt-16 lg:gap-12 lg:pt-12"
        aria-label="HitTrax performance readout"
      >
        {HITTRAX_STATS.map((stat) => (
          <HitTraxStat key={stat.label} {...stat} />
        ))}
      </div>
    </Section>
  )
}
