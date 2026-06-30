'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, registerGsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      registerGsap()
      const el = ref.current
      if (!el || reducedMotion) return

      const statEls = el.querySelectorAll('[data-count]')
      statEls.forEach((node) => {
        if (node.getAttribute('data-placeholder') === 'true') return
        const target = Number(node.getAttribute('data-target') ?? 0)
        const suffix = node.getAttribute('data-suffix') ?? ''
        const counter = { val: 0 }
        gsap.to(counter, {
          val: target,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            node.textContent = `${Math.round(counter.val)}${suffix}`
          },
        })
      })
    },
    { scope: ref, dependencies: [reducedMotion] },
  )

  return (
    <div
      ref={ref}
      className="page-container border-t border-steel-300/20 py-10 lg:py-12"
      aria-label="Facility credentials"
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-8">
        <div>
          <p className="font-data type-stat font-bold leading-none text-accent tabular-nums">
            <span data-count data-placeholder="true">[ ]</span>
          </p>
          <p className="mt-3 text-sm text-ink-black">
            years combined coaching experience
          </p>
          <p className="mt-1 text-xs text-steel-300">Pending from client</p>
        </div>

        <div>
          <p className="font-data type-stat font-bold leading-none text-accent tabular-nums">
            <span data-count data-placeholder="true">[ ]</span>
          </p>
          <p className="mt-3 text-sm text-ink-black">athletes trained</p>
          <p className="mt-1 text-xs text-steel-300">Pending from client</p>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <p className="font-display text-lg font-semibold leading-snug text-ink-black lg:text-xl">
            College &amp; pro-level coaching staff
          </p>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <p className="font-display text-lg font-semibold leading-snug text-ink-black lg:text-xl">
            HitTrax-equipped facility
          </p>
        </div>
      </div>
    </div>
  )
}
