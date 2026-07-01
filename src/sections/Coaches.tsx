import Image from 'next/image'
import { PhotoOverlay } from '../components/PhotoFrame'
import { PrimaryButton } from '../components/PrimaryButton'
import { FadeUp } from '../components/motion/FadeUp'

export function Coaches() {
  return (
    <section
      id="coaches"
      aria-labelledby="coaches-heading"
      className="overflow-hidden bg-paper-white py-[var(--spacing-section-y)]"
    >
      <div className="grid items-center lg:grid-cols-2">
        <FadeUp>
          <div className="relative min-h-[380px] w-full lg:min-h-[560px]">
            <Image
              src="/images/coach-960.webp"
              alt="An NSEC coach giving hands-on batting instruction to a baseball athlete"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              data-placeholder="true"
            />
            <PhotoOverlay />
          </div>
        </FadeUp>

        <FadeUp delay={0.08} className="px-4 py-10 lg:px-14 lg:py-0">
          <div className="mx-auto max-w-xl lg:mx-0">
            <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-accent">
              Train with the Elite
            </p>
            <h2
              id="coaches-heading"
              className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-ink-black"
            >
              Coaches who&rsquo;ve played at the level your athlete is chasing.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-black/75 lg:text-lg">
              Our coaches are the core of the program — diverse playing histories, years of coaching
              experience, and specialized skill sets, committed to helping each athlete make
              meaningful progress.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryButton />
              <a
                href="https://nacsportscenter.com/coaches/"
                className="inline-flex min-h-11 items-center font-body text-base font-semibold text-ink-black underline underline-offset-4 hover:text-accent"
              >
                Meet the coaches
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
