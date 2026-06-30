'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, registerGsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { SectionReveal } from '@/components/ui/SectionReveal'

export function Programs() {
  const gridRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      registerGsap()
      const grid = gridRef.current
      if (!grid || reducedMotion) return

      gsap.from(grid.querySelectorAll('[data-program-card]'), {
        y: 16,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: gridRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      id="programs"
      className="section-pad bg-paper-white"
      aria-labelledby="programs-heading"
    >
      <SectionReveal className="page-container">
        <h2
          id="programs-heading"
          data-reveal
          className="type-h2 font-display font-bold text-ink-black"
        >
          Pick your starting point
        </h2>

        <div ref={gridRef} className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
          <article
            data-program-card
            className="flex flex-col border border-steel-300/30 bg-paper-white p-8"
          >
            <h3 className="font-display text-xl font-semibold text-ink-black">
              Free Evaluation
            </h3>
            <p className="mt-4 font-data type-stat font-bold leading-none text-accent tabular-nums">
              $0
            </p>
            <p className="mt-6 flex-1 text-sm leading-relaxed text-ink-black/80">
              Start here if you&apos;re not sure what your athlete needs yet.
            </p>
            <div className="mt-8">
              <PrimaryButton className="w-full" />
            </div>
          </article>

          <article
            data-program-card
            className="flex flex-col border border-steel-300/30 bg-paper-white p-8"
          >
            <h3 className="font-display text-xl font-semibold text-ink-black">
              Single Lesson
            </h3>
            <div className="mt-4 border border-dashed border-steel-300/50 px-3 py-3">
              <p className="text-xs uppercase tracking-widest text-steel-300">
                Pending from client
              </p>
              <p className="font-data text-2xl font-bold text-accent">[ ] price</p>
            </div>
            <p className="mt-6 flex-1 text-sm leading-relaxed text-ink-black/80">
              One-on-one session, any skill focus.
            </p>
            <div className="mt-8">
              <SecondaryButton className="w-full">Book a Lesson</SecondaryButton>
            </div>
          </article>

          <article
            data-program-card
            className="flex flex-col border border-steel-300/30 border-t-4 border-t-accent bg-paper-white p-8"
          >
            <h3 className="font-display text-xl font-semibold text-ink-black">
              4-Lesson Package
            </h3>
            <div className="mt-4 border border-dashed border-steel-300/50 px-3 py-3">
              <p className="text-xs uppercase tracking-widest text-steel-300">
                Pending from client
              </p>
              <p className="font-data text-2xl font-bold text-accent">[ ] price</p>
            </div>
            <p className="mt-6 flex-1 text-sm leading-relaxed text-ink-black/80">
              Buy 4, get 1 free. Best for consistent progress.
            </p>
            <div className="mt-8">
              <PrimaryButton className="w-full" />
            </div>
          </article>
        </div>
      </SectionReveal>
    </section>
  )
}
