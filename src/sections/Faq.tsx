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
      'No — just come ready to move. We’ll let you know if anything specific is helpful for your athlete’s focus area.',
  },
  {
    question: 'What is HitTrax, and do we need it for the first session?',
    answer:
      'HitTrax is real-time hitting data technology. It’s not required for the free evaluation — your coach will recommend it if it fits your athlete’s goals.',
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
        <h2
          id="faq-heading"
          className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-ink-black"
        >
          Frequently asked questions
        </h2>

        <div className="mt-10 divide-y divide-steel-300/30 lg:mt-14">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group py-6">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-ink-black lg:text-xl">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-data text-xl text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-black/70">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </FadeUp>
    </Section>
  )
}
