'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import {
  gsap,
  EASE,
  FADE_UP_DURATION,
  FADE_UP_DISTANCE,
  FADE_UP_STAGGER,
  SCROLL_TRIGGER_START,
} from '../../lib/gsap'
import { useReducedMotion } from '../../lib/useReducedMotion'

type StaggerGroupProps = {
  children: ReactNode
  className?: string
  /** CSS selector for the items to stagger, default matches `data-stagger-item`. */
  itemSelector?: string
}

/** The Lineup's 5-row stagger reveal — reused anywhere a group of siblings should reveal in sequence. */
export function StaggerGroup({
  children,
  className = '',
  itemSelector = '[data-stagger-item]',
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const items = el.querySelectorAll(itemSelector)
      if (items.length === 0) return

      if (reducedMotion) {
        gsap.set(items, { opacity: 1, y: 0 })
        return
      }

      // See FadeUp.tsx — scrollTrigger tweens default immediateRender to
      // false, so the "from" state needs to be set explicitly up front.
      // 0.01 rather than 0 keeps these paint-eligible for LCP purposes.
      gsap.set(items, { opacity: 0.01, y: FADE_UP_DISTANCE })
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: FADE_UP_DURATION,
        ease: EASE,
        stagger: FADE_UP_STAGGER,
        scrollTrigger: {
          trigger: el,
          start: SCROLL_TRIGGER_START,
          once: true,
        },
      })
    },
    { dependencies: [reducedMotion, itemSelector] },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
