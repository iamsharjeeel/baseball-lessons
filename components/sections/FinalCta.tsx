import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SectionReveal } from '@/components/ui/SectionReveal'

export function FinalCta() {
  return (
    <section
      id="final-cta"
      className="section-pad border-t border-clay-red/30 bg-steel-700"
      aria-labelledby="final-cta-heading"
    >
      <SectionReveal className="page-container">
        <div className="grid gap-8 border-l-4 border-clay-red pl-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 lg:pl-6">
          <div className="text-left">
            <h2
              id="final-cta-heading"
              data-reveal
              className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-chalk-white"
            >
              Fall ball and tryouts are closer than they look.
            </h2>
            <p
              data-reveal
              className="mt-4 max-w-2xl text-base leading-relaxed text-chalk-white/85 lg:text-lg"
            >
              Book a free evaluation today and find out exactly what your
              athlete needs to walk in ready.
            </p>
            <p data-reveal className="mt-6 text-sm text-steel-300">
              <a
                href="tel:+12672887053"
                className="text-chalk-white underline-offset-4 hover:underline"
              >
                (267) 288-7053
              </a>
              {' · '}
              207 Penns Trail, Newtown, PA 18940
            </p>
          </div>

          <div data-reveal className="lg:pb-1">
            <PrimaryButton />
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
