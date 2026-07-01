import { Section } from '../components/Section'
import { FadeUp } from '../components/motion/FadeUp'

export function ProgramsApart() {
  return (
    <Section id="programs-apart" background="light" ariaLabelledby="programs-apart-heading">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <FadeUp>
          <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-accent">
            What sets our programs apart?
          </p>
          <h2
            id="programs-apart-heading"
            className="mt-3 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-ink-black"
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
