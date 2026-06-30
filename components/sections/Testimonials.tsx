import { SectionReveal } from '@/components/ui/SectionReveal'
import { ClientPlaceholder } from '@/components/ui/ClientPlaceholder'

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-pad bg-ink-black text-paper-white"
      aria-labelledby="testimonials-heading"
    >
      <SectionReveal className="page-container">
        <h2
          id="testimonials-heading"
          data-reveal
          className="type-h2 font-display font-bold text-paper-white"
        >
          What parents are saying
        </h2>

        <div data-reveal className="mt-12 grid gap-6 lg:grid-cols-3">
          <ClientPlaceholder
            inverted
            label="Needs real testimonial: quote + parent first name + athlete age/sport"
          />
          <ClientPlaceholder
            inverted
            label="Needs real testimonial: quote + parent first name + athlete age/sport"
          />
          <ClientPlaceholder
            inverted
            label="Needs real testimonial: quote + parent first name + athlete age/sport"
          />
        </div>
      </SectionReveal>
    </section>
  )
}
