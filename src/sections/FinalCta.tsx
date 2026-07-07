import { PrimaryButton } from '../components/PrimaryButton'
import { DarkSection } from '../components/DarkSection'
import { FadeUp } from '../components/motion/FadeUp'

export function FinalCta() {
  return (
    <DarkSection id="final-cta" ariaLabelledby="final-cta-heading" contentClassName="text-center">
      {/* Background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[80px]" />
      <FadeUp>
        {/* Decorative accent line */}
        <div className="mb-6 flex justify-center">
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-accent to-accent-deep" />
        </div>
        <h2
          id="final-cta-heading"
          className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-paper-white"
        >
          Fall ball and tryouts are closer than they look.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-paper-white/80 lg:text-lg">
          Book a free evaluation today and find out exactly what your athlete
          needs to walk in ready.
        </p>
        <div className="mt-10 flex justify-center">
          <PrimaryButton />
        </div>
        <div className="mt-8 flex flex-col items-center gap-2 text-sm text-steel-300">
          <div className="flex items-center gap-2">
            <a href="tel:+12672887053" className="hover:text-paper-white/80 transition-colors font-medium">(267) 288-7053</a>
            <span>&middot;</span>
            <a href="https://nacsportscenter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-paper-white/80 transition-colors font-medium">nacsportscenter.com</a>
          </div>
          <span>207 Penns Trail, Newtown, PA 18940</span>
        </div>
      </FadeUp>
    </DarkSection>
  )
}
