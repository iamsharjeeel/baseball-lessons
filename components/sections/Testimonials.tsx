import { SectionReveal } from '@/components/ui/SectionReveal'
import { ClientPlaceholder } from '@/components/ui/ClientPlaceholder'

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-pad border-t border-steel-300/10"
      aria-labelledby="testimonials-heading"
    >
      <SectionReveal className="page-container">
        <div className="text-left">
          <h2
            id="testimonials-heading"
            data-reveal
            className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-chalk-white"
          >
            What parents are saying
          </h2>
        </div>

        <div data-reveal className="mt-10 grid gap-6 lg:grid-cols-3">
          <ClientPlaceholder label="Needs real testimonial: quote + parent first name + athlete age/sport" />
          <ClientPlaceholder label="Needs real testimonial: quote + parent first name + athlete age/sport" />
          <ClientPlaceholder label="Needs real testimonial: quote + parent first name + athlete age/sport" />
        </div>
      </SectionReveal>
    </section>
  )
}
