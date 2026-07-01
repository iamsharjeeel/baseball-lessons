import { Section } from '../components/Section'
import { FadeUp } from '../components/motion/FadeUp'

export function ProgramsApart() {
  return (
    <Section id="programs-apart" background="light" ariaLabelledby="programs-apart-heading">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
        <FadeUp>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            What sets our programs apart?
          </p>
          <h2
            id="programs-apart-heading"
            className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.02em] text-ink-black"
          >
            The region&rsquo;s most effective training — built one athlete at a time.
          </h2>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p className="text-base leading-relaxed text-ink-black/75 lg:text-lg lg:leading-relaxed">
            Our goal is simple: provide the region&rsquo;s most effective baseball and softball
            training for athletes ages 6 through college. Every lesson is led by experienced
            instructors who bring college and professional-level coaching insight into each
            session.
          </p>
        </FadeUp>
      </div>
    </Section>
  )
}
