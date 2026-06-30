'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, registerGsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

export function StickyMobileCta() {
  const barRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      registerGsap()
      const bar = barRef.current
      const hero = document.getElementById('hero')
      if (!bar || !hero) return

      if (reducedMotion) {
        gsap.set(bar, { y: 0 })
        return
      }

      gsap.set(bar, { y: '100%' })
      gsap.to(bar, {
        y: 0,
        duration: 0.25,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: hero,
          start: 'bottom top',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: barRef, dependencies: [reducedMotion] },
  )

  return (
    <div
      ref={barRef}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-steel-300/20 bg-paper-white/95 p-3 backdrop-blur-sm lg:hidden"
      aria-label="Book evaluation"
    >
      <PrimaryButton fullWidth />
    </div>
  )
}
