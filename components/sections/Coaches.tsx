import { SectionReveal } from '@/components/ui/SectionReveal'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { ClientPlaceholder } from '@/components/ui/ClientPlaceholder'

export function Coaches() {
  return (
    <section
      id="coaches"
      className="section-pad border-t border-steel-300/10"
      aria-labelledby="coaches-heading"
    >
      <SectionReveal className="page-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
          <div className="text-left">
            <h2
              id="coaches-heading"
              data-reveal
              className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-chalk-white"
            >
              Coached by people who&apos;ve actually played at the level your
              athlete is chasing
            </h2>
            <p
              data-reveal
              className="mt-4 max-w-2xl text-base leading-relaxed text-chalk-white/85 lg:text-lg"
            >
              Our staff brings college and professional playing and coaching
              experience into every single lesson — not just drills out of a
              manual.
            </p>
            <div data-reveal className="mt-8">
              <SecondaryButton
                asLink
                href="https://nacsportscenter.com/coaches/"
                trackConversion={false}
              >
                Meet the coaches
              </SecondaryButton>
            </div>
          </div>

          <ClientPlaceholder
            label="Pull 2–3 real coach names/bios/photos from nacsportscenter.com/coaches/ if David approves reusing them here"
            className="h-full"
          />
        </div>
      </SectionReveal>
    </section>
  )
}
