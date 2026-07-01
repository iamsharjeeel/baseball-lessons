'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE, FADE_UP_DURATION, FADE_UP_DISTANCE, SCROLL_TRIGGER_START } from '../../lib/gsap'
import { useReducedMotion } from '../../lib/useReducedMotion'

type FadeUpProps = {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * The one scroll-triggered fade-up used everywhere — every section
 * heading + body block wraps its server-rendered content in this shared
 * client primitive instead of a bespoke per-section animation, per
 * MIGRATION_BRIEF_V5.md's "define once, import everywhere" rule.
 */
export function FadeUp({ children, className = '', delay = 0 }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      if (reducedMotion) {
        gsap.set(el, { opacity: 1, y: 0 })
        return
      }

      // GSAP defaults `immediateRender: false` for tweens with a
      // scrollTrigger, so `gsap.fromTo()` here would never actually apply
      // the "from" state before the trigger fires — set it explicitly,
      // then animate to the revealed state on scroll-into-view. Opacity
      // 0.01 rather than a hard 0 — Chrome's LCP algorithm excludes
      // opacity:0 elements from candidacy, which could matter for content
      // near the fold on shorter viewports.
      gsap.set(el, { opacity: 0.01, y: FADE_UP_DISTANCE })
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: FADE_UP_DURATION,
        delay,
        ease: EASE,
        scrollTrigger: {
          trigger: el,
          start: SCROLL_TRIGGER_START,
          once: true,
        },
      })
    },
    { dependencies: [reducedMotion, delay] },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
