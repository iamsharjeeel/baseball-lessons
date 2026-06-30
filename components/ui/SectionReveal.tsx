'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, registerGsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'

type Props = {
  children: ReactNode
  className?: string
}

export function SectionReveal({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      registerGsap()
      const el = ref.current
      if (!el || reducedMotion) return

      const targets = el.querySelectorAll('[data-reveal]')
      if (!targets.length) return

      gsap.from(targets, {
        y: 16,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: ref, dependencies: [reducedMotion] },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
