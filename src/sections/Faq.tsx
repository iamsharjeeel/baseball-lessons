'use client'

import { useState } from 'react'
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
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section id="faq" background="light" ariaLabelledby="faq-heading">
      <FadeUp>
        <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-accent">
          FAQ
        </p>
        <h2
          id="faq-heading"
          className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-ink-black"
        >
          Frequently asked questions
        </h2>

        <div className="mt-[var(--spacing-section-gap)] divide-y divide-ink-black/10">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <div key={faq.question} className="py-6">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 text-left font-display text-lg font-semibold text-ink-black lg:text-xl"
                  >
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className={`shrink-0 font-data text-xl text-accent transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="mt-4 max-w-2xl text-base leading-relaxed text-ink-black/70"
                >
                  {faq.answer}
                </div>
              </div>
            )
          })}
        </div>
      </FadeUp>
    </Section>
  )
}
