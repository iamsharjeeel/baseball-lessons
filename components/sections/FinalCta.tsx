import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SectionReveal } from '@/components/ui/SectionReveal'

export function FinalCta() {
  return (
    <section
      id="final-cta"
      className="section-pad bg-ink-black text-paper-white"
      aria-labelledby="final-cta-heading"
    >
      <SectionReveal className="page-container">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="text-left">
            <h2
              id="final-cta-heading"
              data-reveal
              className="type-h2 font-display font-bold text-paper-white"
            >
              Fall ball and tryouts are closer than they look.
            </h2>
            <p
              data-reveal
              className="mt-6 max-w-2xl text-base leading-relaxed text-paper-white/85 lg:text-lg"
            >
              Book a free evaluation today and find out exactly what your athlete
              needs to walk in ready.
            </p>
            <p data-reveal className="mt-6 text-sm text-steel-300">
              <a
                href="tel:+12672887053"
                className="text-paper-white underline-offset-4 hover:underline"
              >
                (267) 288-7053
              </a>
              {' · '}
              207 Penns Trail, Newtown, PA 18940
            </p>
          </div>

          <div data-reveal>
            <PrimaryButton />
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
