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

type StatReadoutPanelProps = {
  stats: StatItem[]
  caption?: string
  size?: 'hero' | 'large'
  trigger?: 'mount' | 'scroll'
  showGlow?: boolean
  mountDelay?: number
}

export function StatReadoutPanel({
  stats,
  caption,
  size = 'hero',
  trigger = 'mount',
  showGlow = false,
  mountDelay = 0,
}: StatReadoutPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const statSizeClass =
    size === 'hero'
      ? 'text-[clamp(2.5rem,6vw,5rem)]'
      : 'text-[clamp(2rem,5vw,4rem)]'

  useGSAP(
    () => {
      registerGsap()
      const panelEl = panelRef.current
      const borderEl = borderRef.current
      if (!panelEl) return

      const valueEls = panelEl.querySelectorAll('[data-stat-value]')

      const setFinalValues = () => {
        valueEls.forEach((el) => {
          const target = Number(el.getAttribute('data-target') ?? 0)
          const suffix = el.getAttribute('data-suffix') ?? ''
          el.textContent = `${target}${suffix}`
        })
        if (borderEl) gsap.set(borderEl, { scaleX: 1 })
      }

      const animateValues = () => {
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
        setFinalValues()
        return
      }

      if (trigger === 'mount') {
        const run = () => {
          if (borderEl) {
            gsap.fromTo(
              borderEl,
              { scaleX: 0, transformOrigin: 'left center' },
              {
                scaleX: 1,
                duration: 0.4,
                ease: 'power2.out',
                onComplete: animateValues,
              },
            )
          } else {
            animateValues()
          }
        }
        if (mountDelay > 0) {
          gsap.delayedCall(mountDelay, run)
        } else {
          run()
        }
      } else {
        gsap.fromTo(
          panelEl,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panelEl,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
            onComplete: () => {
              if (borderEl) gsap.set(borderEl, { scaleX: 1 })
              animateValues()
            },
          },
        )
      }
    },
    {
      scope: panelRef,
      dependencies: [reducedMotion, trigger, mountDelay],
    },
  )

  return (
    <figure className="w-full" ref={panelRef}>
      <div className={showGlow ? 'stat-glow rounded-sm p-1' : ''}>
        <div
          className="relative bg-steel-700 px-6 py-8 lg:px-10 lg:py-10"
          aria-label="HitTrax performance readout"
        >
          <div
            ref={borderRef}
            className="absolute left-0 top-0 h-1 w-full origin-left bg-scoreboard-amber"
            aria-hidden="true"
          />
          <div
            className={`grid gap-6 ${stats.some((s) => s.explanation) ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-3 gap-4'}`}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={stat.explanation ? 'text-left' : 'text-center'}
              >
                <p
                  className={`font-data font-bold leading-none text-scoreboard-amber ${statSizeClass}`}
                >
                  <span
                    data-stat-value
                    data-target={stat.value}
                    data-suffix={stat.suffix}
                  >
                    {reducedMotion ? `${stat.value}${stat.suffix}` : `0${stat.suffix}`}
                  </span>
                </p>
                <p className="mt-2 font-body text-xs uppercase tracking-wider text-chalk-white lg:text-sm">
                  {stat.label}
                </p>
                {stat.explanation && (
                  <p className="mt-3 text-sm leading-relaxed text-steel-300">
                    {stat.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-steel-300 lg:text-left">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
