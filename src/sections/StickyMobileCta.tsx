'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { PrimaryButton } from '../components/PrimaryButton'
import { gsap, ScrollTrigger, EASE } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'

/** Persistent bottom bar, mobile only, appears once the hero is scrolled past. */
export function StickyMobileCta() {
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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-steel-300/20 bg-ink-black p-3 lg:hidden"
      aria-hidden={!visible}
    >
      <PrimaryButton className="w-full" tabIndex={visible ? 0 : -1} />
    </div>
  )
}
