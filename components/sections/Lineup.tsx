'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, registerGsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { SectionReveal } from '@/components/ui/SectionReveal'

const STEPS = [
  {
    number: '1',
    position: 'LEAD-OFF',
    title: 'Free Skills Evaluation',
    description:
      "A real coach watches your athlete hit, field, or throw and gives you an honest read on where they're at. No pitch, no pressure.",
  },
  {
    number: '2',
    position: '#2',
    title: 'A Plan Built for Them',
    description:
      'Based on the evaluation, your coach builds a training plan around what your athlete actually needs to improve — not a generic curriculum.',
  },
  {
    number: '3',
    position: '#3',
    title: '1-on-1 Coaching',
    description:
      'Every rep is coached individually. No 10-kid group cage sessions where your athlete gets two minutes of attention.',
  },
  {
    number: '4',
    position: '#4',
    title: 'HitTrax Data Tracking',
    description:
      'Swings, exit velocity, launch angle — every session adds to a real performance record so progress is measurable, not just felt.',
  },
  {
    number: '5',
    position: 'CLEANUP',
    title: 'Game Ready',
    description:
      'Walk into tryouts, fall ball, or the next season with real reps and real data behind your athlete.',
  },
]

export function Lineup() {
  const listRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      registerGsap()
      const list = listRef.current
      if (!list || reducedMotion) return

      const rows = list.querySelectorAll('[data-lineup-row]')
      gsap.from(rows, {
        y: 16,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: list,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: listRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      id="lineup"
      className="section-pad bg-paper-white"
      aria-labelledby="lineup-heading"
    >
      <SectionReveal className="page-container">
        <div className="max-w-4xl">
          <h2
            id="lineup-heading"
            data-reveal
            className="type-h2 font-display font-bold text-ink-black"
          >
            Here&apos;s the lineup
          </h2>
          <p
            data-reveal
            className="mt-4 max-w-2xl text-base leading-relaxed text-ink-black/80 lg:text-lg"
          >
            From first session to game-ready, here&apos;s exactly what happens.
          </p>
        </div>

        <div ref={listRef} className="mt-14 w-full">
          {STEPS.map((step, index) => (
            <article
              key={step.number}
              data-lineup-row
              className={`grid w-full grid-cols-1 gap-4 py-12 sm:grid-cols-[minmax(4rem,auto)_1fr] sm:gap-8 lg:grid-cols-[minmax(5rem,auto)_1fr] lg:gap-12 ${
                index < STEPS.length - 1 ? 'border-b border-steel-300/30' : ''
              }`}
            >
              <div className="font-data type-stat shrink-0 font-bold leading-none text-accent tabular-nums">
                {step.number}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-widest text-steel-300">
                  {step.position}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink-black lg:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-black/80">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
