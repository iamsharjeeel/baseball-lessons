'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE, SCROLL_TRIGGER_START } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'

type DarkSectionProps = {
  id: string
  ariaLabelledby?: string
  className?: string
  contentClassName?: string
  children: ReactNode
}

/**
 * The one dark-beat variant of Section — used only by Testimonials and
 * Final CTA. Adds the v5 light-to-dark boundary motion (the dark
 * background rises/reveals via ScrollTrigger instead of just appearing at
 * a hard scroll boundary) on top of the same full-bleed shell and grain
 * texture as the rest of the dark sections.
 */
export function DarkSection({
  id,
  ariaLabelledby,
  className = '',
  contentClassName = '',
  children,
}: DarkSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      if (reducedMotion) {
        gsap.set(el, { clipPath: 'inset(0% 0 0 0)', y: 0 })
        return
      }

      gsap.set(el, { clipPath: 'inset(8% 0 0 0)', y: 24 })
      gsap.to(el, {
        clipPath: 'inset(0% 0 0 0)',
        y: 0,
        duration: 1,
        ease: EASE,
        scrollTrigger: {
          trigger: el,
          start: SCROLL_TRIGGER_START,
          once: true,
        },
      })
    },
    { dependencies: [reducedMotion] },
  )

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={ariaLabelledby}
      className={`relative w-full overflow-hidden bg-ink-black py-16 text-paper-white lg:py-[120px] ${className}`}
    >
      <div aria-hidden="true" className="grain-overlay" />
      <div
        className={`relative mx-auto w-full max-w-[var(--max-width-content)] px-4 lg:px-8 ${contentClassName}`}
      >
        {children}
      </div>
    </section>
  )
}
