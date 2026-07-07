import { Section } from '../components/Section'
import { FadeUp } from '../components/motion/FadeUp'

const FAQS = [
  {
    question: 'What age does my athlete need to be?',
    answer: 'We coach athletes from age 6 through college, at every skill level.',
  },
  {
    question: 'What happens during the free evaluation?',
    answer:
      'A coach spends about 30 minutes watching your athlete hit, field, throw, or pitch and gives you a direct, honest assessment — no obligation to book anything after.',
  },
  {
    question: 'Do we need to bring our own equipment?',
    answer:
      'No — just come ready to move. We\'ll let you know if anything specific is helpful for your athlete\'s focus area.',
  },
  {
    question: 'What is HitTrax, and do we need it for the first session?',
    answer:
      'HitTrax is real-time hitting data technology. It\'s not required for the free evaluation — your coach will recommend it if it fits your athlete\'s goals.',
  },
  {
    question: 'Where are you located?',
    answer: '207 Penns Trail, Newtown, PA 18940.',
  },
]

export function Faq() {
  return (
    <Section id="faq" background="light" ariaLabelledby="faq-heading">
      <FadeUp>
        <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
          <span className="h-px w-6 bg-accent" />
          Got Questions?
        </p>
        <h2
          id="faq-heading"
          className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-ink-black"
        >
          Frequently asked questions
        </h2>

        <div className="mt-10 lg:mt-14">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group border-b border-steel-300/20 last:border-b-0">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-semibold text-ink-black transition-colors group-open:text-accent lg:text-xl">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-steel-300/40 font-data text-base text-steel-300 transition-all group-open:rotate-45 group-open:border-accent group-open:text-accent"
                >
                  +
                </span>
              </summary>
              <p className="mt-1 max-w-2xl pb-6 text-base leading-relaxed text-ink-black/70">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </FadeUp>
    </Section>
  )
}
