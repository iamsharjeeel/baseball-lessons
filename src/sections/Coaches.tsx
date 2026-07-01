import Image from 'next/image'
import { PhotoFrame } from '../components/PhotoFrame'
import { Section } from '../components/Section'
import { FadeUp } from '../components/motion/FadeUp'

export function Coaches() {
  return (
    <Section id="coaches" background="light" ariaLabelledby="coaches-heading">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <FadeUp>
          <PhotoFrame aspect="coach" className="rounded-md">
            <Image
              src="/images/coach-960.webp"
              alt="An NSEC coach giving hands-on batting stance instruction to a teenage athlete"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              data-placeholder="true"
            />
          </PhotoFrame>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            id="coaches-heading"
            className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-ink-black"
          >
            Coached by people who&rsquo;ve actually played at the level your
            athlete is chasing
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-black/70 lg:text-lg">
            Our staff brings college and professional playing and coaching
            experience into every single lesson — not just drills out of a
            manual.
          </p>
          <a
            href="https://nacsportscenter.com/coaches/"
            className="mt-8 inline-flex min-h-11 items-center font-body text-base font-semibold text-accent underline underline-offset-4 hover:text-accent-deep"
          >
            Meet the coaches
          </a>
        </FadeUp>
      </div>
    </Section>
  )
}
