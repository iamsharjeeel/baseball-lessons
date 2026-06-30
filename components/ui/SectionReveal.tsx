'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, registerGsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  stagger?: number
}

export function SectionReveal({
  children,
  className = '',
  stagger = 0,
}: SectionRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      registerGsap()
      const section = sectionRef.current
      if (!section || reducedMotion) return

      const targets = section.querySelectorAll('[data-reveal]')
      if (!targets.length) return

      gsap.from(targets, {
        y: 16,
        opacity: 0,
        duration: 0.4,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: sectionRef, dependencies: [reducedMotion, stagger] },
  )

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}
