'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, registerGsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'

type TrustBarProps = {
  className?: string
}

export function TrustBar({ className = '' }: TrustBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      registerGsap()
      const bar = barRef.current
      if (!bar || reducedMotion) return

      const statEls = bar.querySelectorAll('[data-trust-stat]')
      statEls.forEach((el) => {
        const isPlaceholder = el.getAttribute('data-placeholder') === 'true'
        if (isPlaceholder) return

        const target = Number(el.getAttribute('data-target') ?? 0)
        const suffix = el.getAttribute('data-suffix') ?? ''
        const counter = { val: 0 }
        gsap.to(counter, {
          val: target,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.val)}${suffix}`
          },
        })
      })
    },
    { scope: barRef, dependencies: [reducedMotion] },
  )

  return (
    <div
      ref={barRef}
      className={`grid grid-cols-2 gap-x-4 gap-y-6 border-t border-steel-300/15 py-6 lg:grid-cols-4 lg:gap-6 lg:py-8 ${className}`}
      aria-label="Facility credentials"
    >
      <div className="border-l-2 border-scoreboard-amber/40 pl-4">
        <p className="font-data text-2xl font-bold tabular-nums text-scoreboard-amber lg:text-3xl">
          <span data-trust-stat data-placeholder="true">[ ]</span>
        </p>
        <p className="mt-1 text-sm text-chalk-white">
          years combined coaching experience
        </p>
        <p className="mt-1 text-xs text-steel-300">Pending from client</p>
      </div>

      <div className="border-l-2 border-scoreboard-amber/40 pl-4">
        <p className="font-data text-2xl font-bold tabular-nums text-scoreboard-amber lg:text-3xl">
          <span data-trust-stat data-placeholder="true">[ ]</span>
        </p>
        <p className="mt-1 text-sm text-chalk-white">athletes trained</p>
        <p className="mt-1 text-xs text-steel-300">Pending from client</p>
      </div>

      <div className="border-l-2 border-steel-300/30 pl-4">
        <p className="font-display text-base font-semibold leading-snug text-chalk-white lg:text-lg">
          College &amp; pro-level coaching staff
        </p>
      </div>

      <div className="border-l-2 border-steel-300/30 pl-4">
        <p className="font-display text-base font-semibold leading-snug text-chalk-white lg:text-lg">
          HitTrax-equipped facility
        </p>
      </div>
    </div>
  )
}
