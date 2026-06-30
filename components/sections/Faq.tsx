'use client'

import { useId, useState } from 'react'
import { SectionReveal } from '@/components/ui/SectionReveal'

const FAQ_ITEMS = [
  {
    question: 'What age does my athlete need to be?',
    answer:
      'We coach athletes from age 6 through college, at every skill level.',
  },
  {
    question: 'What happens during the free evaluation?',
    answer:
      'A coach spends about 30 minutes watching your athlete hit, field, throw, or pitch and gives you a direct, honest assessment — no obligation to book anything after.',
  },
  {
    question: 'Do we need to bring our own equipment?',
    answer:
      "No — just come ready to move. We'll let you know if anything specific is helpful for your athlete's focus area.",
  },
  {
    question:
      'What is HitTrax, and do we need it for the first session?',
    answer:
      "HitTrax is real-time hitting data technology. It's not required for the free evaluation — your coach will recommend it if it fits your athlete's goals.",
  },
  {
    question: 'Where are you located?',
    answer: '207 Penns Trail, Newtown, PA 18940.',
  },
]

export function Faq() {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="section-pad border-t border-steel-300/10"
      aria-label="Frequently asked questions"
    >
      <SectionReveal className="page-container">
        <div className="max-w-3xl">
          <div
            data-reveal
            className="divide-y divide-steel-300/20 border-y border-steel-300/20"
          >
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index
              const panelId = `${baseId}-panel-${index}`
              const buttonId = `${baseId}-button-${index}`

              return (
                <div key={item.question}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      className="flex min-h-11 w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold text-chalk-white"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenIndex(isOpen ? null : index)
                      }
                    >
                      <span>{item.question}</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-scoreboard-amber"
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="pb-5 text-base leading-relaxed text-chalk-white/85"
                  >
                    {item.answer}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}
