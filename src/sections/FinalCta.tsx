import { PrimaryButton } from '../components/PrimaryButton'
import { DarkSection } from '../components/DarkSection'
import { FadeUp } from '../components/motion/FadeUp'

export function FinalCta() {
  return (
    <DarkSection id="final-cta" ariaLabelledby="final-cta-heading" contentClassName="text-center">
      <FadeUp>
        <div className="mb-6 flex justify-center">
          <div className="h-1 w-12 rounded-full bg-accent" />
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

        <div className="mt-12 flex justify-center opacity-85 transition-opacity hover:opacity-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://nacsportscenter.com/wp-content/uploads/2026/01/NSEC-Primary-Logo-All-White-Web.png"
            alt="Newtown Sports & Events Center Logo"
            className="h-10 w-auto object-contain lg:h-12"
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-2 text-sm text-steel-300">
          <div className="flex items-center gap-2">
            <a href="tel:+12672887053" className="font-medium transition-colors hover:text-paper-white/80">(267) 288-7053</a>
            <span>&middot;</span>
            <a href="https://nacsportscenter.com/" target="_blank" rel="noopener noreferrer" className="font-medium transition-colors hover:text-paper-white/80">nacsportscenter.com</a>
          </div>
          <span>207 Penns Trail, Newtown, PA 18940</span>
        </div>
      </FadeUp>
    </DarkSection>
  )
}
