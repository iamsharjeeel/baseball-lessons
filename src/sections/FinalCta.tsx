import { PrimaryButton } from '../components/PrimaryButton'
import { Section } from '../components/Section'

export function FinalCta() {
  return (
    <Section
      id="final-cta"
      background="dark"
      ariaLabelledby="final-cta-heading"
      contentClassName="text-center"
    >
      <h2
        id="final-cta-heading"
        className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-chalk-white"
      >
        Fall ball and tryouts are closer than they look.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-chalk-white/80 lg:text-lg">
        Book a free evaluation today and find out exactly what your athlete
        needs to walk in ready.
      </p>
      <div className="mt-8 flex justify-center">
        <PrimaryButton />
      </div>
      <p className="mt-6 text-sm text-steel-300">
        (267) 288-7053 &middot; 207 Penns Trail, Newtown, PA 18940
      </p>
    </Section>
  )
}
