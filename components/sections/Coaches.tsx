import Image from 'next/image'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { ClientPlaceholder } from '@/components/ui/ClientPlaceholder'

export function Coaches() {
  return (
    <section
      id="coaches"
      className="section-pad bg-paper-white"
      aria-labelledby="coaches-heading"
    >
      <SectionReveal className="page-container">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-left">
            <h2
              id="coaches-heading"
              data-reveal
              className="type-h2 font-display font-bold text-ink-black"
            >
              Coached by people who&apos;ve actually played at the level your
              athlete is chasing
            </h2>
            <p
              data-reveal
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-black/80 lg:text-lg"
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

          <div data-reveal className="relative aspect-[4/5] w-full max-w-lg lg:ml-auto">
            <Image
              src="/images/coach.jpg"
              alt=""
              fill
              className="object-cover"
              data-placeholder="true"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div data-reveal className="mt-16">
          <div className="relative aspect-[21/9] w-full">
            <Image
              src="/images/facility.jpg"
              alt=""
              fill
              className="object-cover"
              data-placeholder="true"
              sizes="100vw"
            />
            <div className="photo-gradient absolute inset-0" aria-hidden="true" />
          </div>
          <ClientPlaceholder
            className="mt-6"
            label="Pull 2–3 real coach names/bios/photos from nacsportscenter.com/coaches/ if David approves reusing them here"
          />
        </div>
      </SectionReveal>
    </section>
  )
}
