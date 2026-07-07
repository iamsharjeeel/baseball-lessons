import Image from 'next/image'
import { PhotoFrame } from '../components/PhotoFrame'
import { Section } from '../components/Section'
import { FadeUp } from '../components/motion/FadeUp'

export function Coaches() {
  return (
    <Section id="coaches" background="light" ariaLabelledby="coaches-heading">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <FadeUp>
          {/* Accent bar + image wrapper for visual punch */}
          <div className="relative flex gap-3 lg:gap-4">
            <div className="w-1 shrink-0 rounded-full bg-gradient-to-b from-accent to-accent-deep" />
            <PhotoFrame aspect="coach" className="flex-1 rounded-md overflow-hidden shadow-xl">
              <Image
                src="/images/ghost-kid.jpg"
                alt="A Ghost Baseball athlete in the indoor training facility holding a glove"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </PhotoFrame>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
            <span className="h-px w-6 bg-accent" />
            Pro-Level Staff
          </p>
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
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-body text-base font-semibold text-accent underline underline-offset-4 hover:text-accent-deep transition-colors"
          >
            Meet the coaches
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </FadeUp>
      </div>
    </Section>
  )
}
