import { PrimaryButton } from '../components/PrimaryButton'
import { StatReadoutPanel } from '../components/StatReadoutPanel'
import { Image } from '../components/Image'
import { PhotoOverlay } from '../components/PhotoFrame'

const HERO_STATS = [
  { label: 'Exit Velo', value: 78, suffix: ' MPH' },
  { label: 'Launch Angle', value: 19, suffix: '°' },
  { label: 'Distance', value: 212, suffix: ' FT' },
]

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[640px] overflow-hidden px-4 py-16 lg:min-h-[760px] lg:px-8 lg:py-[120px]"
      aria-labelledby="hero-heading"
    >
      {/* v4 fix #5: real hero photography, eager/priority-loaded since this is the LCP element. */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero"
          widths={[768, 1280, 1920]}
          width={1920}
          height={1080}
          alt="A young baseball player mid-swing at NSEC's indoor batting cage"
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <PhotoOverlay />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[var(--max-width-content)] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <p className="mb-4 font-body text-sm uppercase tracking-widest text-steel-300">
            Newtown, PA · Ages 6–College
          </p>
          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-chalk-white"
          >
            See exactly where your athlete stands. For free.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-chalk-white/90 lg:text-lg">
            One-on-one baseball &amp; softball coaching from college and
            pro-level instructors — backed by HitTrax, the same real-time data
            tech pro programs use.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
            <PrimaryButton />
            <p className="text-sm text-steel-300">
              No cost. No equipment needed. 30 minutes with a real coach.
            </p>
          </div>
        </div>

        <div className="w-full">
          <StatReadoutPanel
            stats={HERO_STATS}
            caption="Real HitTrax output from an NSEC training session"
            size="hero"
          />
        </div>
      </div>
    </section>
  )
}
