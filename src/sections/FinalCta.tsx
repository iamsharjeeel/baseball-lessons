import { PrimaryButton } from '../components/PrimaryButton'
import { DarkSection } from '../components/DarkSection'
import { FadeUp } from '../components/motion/FadeUp'

export function FinalCta() {
  return (
    <DarkSection id="final-cta" ariaLabelledby="final-cta-heading" contentClassName="text-center">
      <FadeUp>
        <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-accent">
          Ready when you are
        </p>
        <h2
          id="final-cta-heading"
          className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-paper-white"
        >
          Fall ball and tryouts are closer than they look.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-paper-white/80 lg:text-lg">
          Book a free evaluation today and find out exactly what your athlete needs to walk in
          ready.
        </p>
        <div className="mt-8 flex justify-center">
          <PrimaryButton />
        </div>
      </FadeUp>
    </DarkSection>
  )
}
