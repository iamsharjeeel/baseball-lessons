import Image from 'next/image'
import { PhotoFrame } from '../components/PhotoFrame'
import { PrimaryButton } from '../components/PrimaryButton'
import { Section } from '../components/Section'
import { FadeUp } from '../components/motion/FadeUp'

export function Coaches() {
  return (
    <Section id="coaches" background="light" ariaLabelledby="coaches-heading">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeUp>
          <PhotoFrame aspect="coach" className="rounded-sm">
            <Image
              src="/images/coach-960.webp"
              alt="An NSEC coach giving hands-on batting instruction to a baseball athlete"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              data-placeholder="true"
            />
          </PhotoFrame>
        </FadeUp>

        <FadeUp delay={0.08}>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Train with the Elite
          </p>
          <h2
            id="coaches-heading"
            className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-ink-black"
          >
            Coaches who&rsquo;ve played at the level your athlete is chasing.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-black/70 lg:text-lg">
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
        </FadeUp>
      </div>
    </Section>
  )
}
