'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, registerGsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'

export type StatItem = {
  label: string
  value: number
  suffix: string
  explanation?: string
}

type Props = {
  stats: StatItem[]
  caption?: string
  onDark?: boolean
  trigger?: 'mount' | 'scroll'
}

export function StatReadout({ stats, caption, onDark = false, trigger = 'scroll' }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const labelClass = onDark ? 'text-paper-white/80' : 'text-steel-300'
  const explanationClass = onDark ? 'text-paper-white/70' : 'text-steel-300'

  useGSAP(
    () => {
      registerGsap()
      const root = rootRef.current
      if (!root) return

      const valueEls = root.querySelectorAll('[data-stat-value]')

      const setFinal = () => {
        valueEls.forEach((el) => {
          const target = Number(el.getAttribute('data-target') ?? 0)
          const suffix = el.getAttribute('data-suffix') ?? ''
          el.textContent = `${target}${suffix}`
        })
      }

      const countUp = () => {
        valueEls.forEach((el) => {
          const target = Number(el.getAttribute('data-target') ?? 0)
          const suffix = el.getAttribute('data-suffix') ?? ''
          const counter = { val: 0 }
          gsap.to(counter, {
            val: target,
            duration: 0.9,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = `${Math.round(counter.val)}${suffix}`
            },
          })
        })
      }

      if (reducedMotion) {
        setFinal()
        return
      }

      const run = () => {
        gsap.from(root, {
          opacity: 0,
          y: 16,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: countUp,
        })
      }

      if (trigger === 'mount') {
        run()
      } else {
        gsap.from(root, {
          opacity: 0,
          y: 16,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          onComplete: countUp,
        })
      }
    },
    { scope: rootRef, dependencies: [reducedMotion, trigger] },
  )

  return (
    <div ref={rootRef} className="w-full">
      <div
        className={`grid gap-10 md:grid-cols-3 ${stats.some((s) => s.explanation) ? '' : 'text-center'}`}
        aria-label="HitTrax performance readout"
      >
        {stats.map((stat) => (
          <div key={stat.label} className={stat.explanation ? 'text-left' : ''}>
            <p className="font-data type-stat font-bold leading-none text-accent tabular-nums">
              <span
                data-stat-value
                data-target={stat.value}
                data-suffix={stat.suffix}
              >
                {reducedMotion ? `${stat.value}${stat.suffix}` : `0${stat.suffix}`}
              </span>
            </p>
            <p
              className={`mt-3 text-xs font-medium uppercase tracking-widest ${labelClass}`}
            >
              {stat.label}
            </p>
            {stat.explanation && (
              <p className={`mt-3 text-sm leading-relaxed ${explanationClass}`}>
                {stat.explanation}
              </p>
            )}
          </div>
        ))}
      </div>
      {caption && (
        <p className={`mt-6 text-sm ${labelClass}`}>{caption}</p>
      )}
    </div>
  )
}
