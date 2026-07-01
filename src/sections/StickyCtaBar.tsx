'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { PrimaryButton } from '../components/PrimaryButton'
import { gsap, ScrollTrigger, EASE } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'

/** Slim sticky CTA bar — desktop + mobile, appears once hero scrolls out. */
export function StickyCtaBar() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useGSAP(
    () => {
      const el = ref.current
      const hero = document.getElementById('hero')
      if (!el || !hero) return

      gsap.set(el, { yPercent: 100 })

      const trigger = ScrollTrigger.create({
        trigger: hero,
        start: 'bottom top',
        onEnter: () => {
          setVisible(true)
          gsap.to(el, { yPercent: 0, duration: reducedMotion ? 0 : 0.4, ease: EASE })
        },
        onLeaveBack: () => {
          setVisible(false)
          gsap.to(el, { yPercent: 100, duration: reducedMotion ? 0 : 0.3, ease: EASE })
        },
      })

      return () => trigger.kill()
    },
    { dependencies: [reducedMotion] },
  )

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-black/20 bg-ink-black/95 backdrop-blur-sm"
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-[var(--max-width-content)] items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <p className="hidden font-display text-sm font-semibold uppercase tracking-wide text-paper-white lg:block">
          Book your free evaluation
        </p>
        <PrimaryButton className="w-full lg:w-auto" tabIndex={visible ? 0 : -1} />
      </div>
    </div>
  )
}
