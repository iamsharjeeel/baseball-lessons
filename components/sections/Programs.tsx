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

      const cards = grid.querySelectorAll('[data-program-card]')
      gsap.from(cards, {
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
      className="section-pad border-t border-steel-300/10"
      aria-labelledby="programs-heading"
    >
      <SectionReveal className="page-container">
        <div className="border-l-4 border-scoreboard-amber/50 pl-5 lg:pl-6">
          <h2
            id="programs-heading"
            data-reveal
            className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-chalk-white"
          >
            Pick your starting point
          </h2>
        </div>

        <div
          ref={gridRef}
          className="mt-10 grid gap-6 lg:grid-cols-3 lg:gap-8"
        >
          <article
            data-program-card
            className="flex flex-col border-t border-steel-300/20 bg-steel-700 p-6 lg:p-8"
          >
            <h3 className="font-display text-xl font-semibold text-chalk-white">
              Free Evaluation
            </h3>
            <p className="mt-3 font-data text-3xl font-bold tabular-nums text-scoreboard-amber">
              $0
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-chalk-white/85">
              Start here if you&apos;re not sure what your athlete needs yet.
            </p>
            <div className="mt-6">
              <PrimaryButton className="w-full" />
            </div>
          </article>

          <article
            data-program-card
            className="flex flex-col border-t border-steel-300/20 bg-steel-700 p-6 lg:p-8"
          >
            <h3 className="font-display text-xl font-semibold text-chalk-white">
              Single Lesson
            </h3>
            <div className="mt-3 border border-dashed border-steel-300/40 px-3 py-2">
              <p className="text-xs uppercase tracking-widest text-steel-300">
                Pending from client
              </p>
              <p className="font-data text-2xl font-bold tabular-nums text-scoreboard-amber">
                [ ] price
              </p>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-chalk-white/85">
              One-on-one session, any skill focus.
            </p>
            <div className="mt-6">
              <SecondaryButton className="w-full">Book a Lesson</SecondaryButton>
            </div>
          </article>

          <article
            data-program-card
            className="flex flex-col border-t-4 border-clay-red bg-steel-700 p-6 lg:p-8"
          >
            <h3 className="font-display text-xl font-semibold text-chalk-white">
              4-Lesson Package
            </h3>
            <div className="mt-3 border border-dashed border-steel-300/40 px-3 py-2">
              <p className="text-xs uppercase tracking-widest text-steel-300">
                Pending from client
              </p>
              <p className="font-data text-2xl font-bold tabular-nums text-scoreboard-amber">
                [ ] price
              </p>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-chalk-white/85">
              Buy 4, get 1 free. Best for consistent progress.
            </p>
            <div className="mt-6">
              <PrimaryButton className="w-full" />
            </div>
          </article>
        </div>
      </SectionReveal>
    </section>
  )
}
