'use client'

import { useId, useState } from 'react'
import { SectionReveal } from '@/components/ui/SectionReveal'

const ITEMS = [
  {
    q: 'What age does my athlete need to be?',
    a: 'We coach athletes from age 6 through college, at every skill level.',
  },
  {
    q: 'What happens during the free evaluation?',
    a: 'A coach spends about 30 minutes watching your athlete hit, field, throw, or pitch and gives you a direct, honest assessment — no obligation to book anything after.',
  },
  {
    q: 'Do we need to bring our own equipment?',
    a: "No — just come ready to move. We'll let you know if anything specific is helpful for your athlete's focus area.",
  },
  {
    q: 'What is HitTrax, and do we need it for the first session?',
    a: "HitTrax is real-time hitting data technology. It's not required for the free evaluation — your coach will recommend it if it fits your athlete's goals.",
  },
  {
    q: 'Where are you located?',
    a: '207 Penns Trail, Newtown, PA 18940.',
  },
]

export function Faq() {
  const baseId = useId()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="section-pad bg-paper-white"
      aria-label="Frequently asked questions"
    >
      <SectionReveal className="page-container">
        <div className="max-w-3xl divide-y divide-steel-300/30 border-y border-steel-300/30">
          {ITEMS.map((item, index) => {
            const isOpen = open === index
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-btn-${index}`

            return (
              <div key={item.q} data-reveal>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex min-h-11 w-full items-center justify-between gap-4 py-6 text-left font-display text-lg font-semibold text-ink-black"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    <span>{item.q}</span>
                    <span aria-hidden="true" className="shrink-0 text-accent">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-6 text-base leading-relaxed text-ink-black/80"
                >
                  {item.a}
                </div>
              </div>
            )
          })}
        </div>
      </SectionReveal>
    </section>
  )
}
