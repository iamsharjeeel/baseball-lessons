'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, registerGsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'

export type LineupRow = {
  number: string
  position: string
  title: string
  description: string
}

type LineupCardProps = {
  rows: LineupRow[]
}

export function LineupCard({ rows }: LineupCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      registerGsap()
      const card = cardRef.current
      if (!card || reducedMotion) return

      const rowEls = card.querySelectorAll('[data-lineup-row]')
      gsap.from(rowEls, {
        y: 16,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: cardRef, dependencies: [reducedMotion] },
  )

  return (
    <div
      ref={cardRef}
      className="overflow-hidden rounded-sm bg-steel-700"
      aria-label="Training lineup steps"
    >
      {rows.map((row, index) => (
        <div
          key={row.number}
          data-lineup-row
          className={`flex gap-4 px-5 py-6 lg:gap-6 lg:px-8 lg:py-7 ${index < rows.length - 1 ? 'border-b border-steel-300/20' : ''}`}
        >
          <div className="shrink-0 pt-1 font-data text-3xl font-bold tabular-nums text-scoreboard-amber lg:text-4xl">
            {row.number}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-widest text-steel-300">
              {row.position}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-chalk-white">
              {row.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-chalk-white/85">
              {row.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
