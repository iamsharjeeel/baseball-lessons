'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { PrimaryButton } from '../components/PrimaryButton'
import { StatReadoutPanel } from '../components/StatReadoutPanel'
import { gsap, EASE } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'

const HERO_STATS = [
  { label: 'Exit Velo', value: 78, suffix: ' MPH' },
  { label: 'Launch Angle', value: 19, suffix: '°' },
  { label: 'Distance', value: 212, suffix: ' FT' },
]

export function Hero() {
  const reducedMotion = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const targets = root.querySelectorAll<HTMLElement>('[data-hero-item]')

      if (reducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 })
        return
      }

      // Chrome's LCP algorithm excludes elements at exactly opacity:0 from
      // candidacy — a hard 0 here risks the H1's delayed fade-in getting
      // measured as LCP instead of the hero photo, which is supposed to be
      // the anchor. 0.01 is visually indistinguishable but keeps every
      // hero-item paint-eligible from the first frame.
      gsap.set(targets, { opacity: 0.01, y: 20 })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: EASE,
        stagger: 0.09,
      })
    },
    { dependencies: [reducedMotion] },
  )

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative min-h-[640px] overflow-hidden px-4 py-16 lg:min-h-[760px] lg:px-8 lg:py-[120px]"
      aria-labelledby="hero-heading"
    >
      {/* Animated GIF background — must use <img> not Next/Image to preserve animation frames */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/ghost-logo-baseball.gif"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        {/* Two-layer overlay: flat tint + warm gradient edge */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-black/55" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,11,13,0.85)_0%,rgba(10,11,13,0.2)_55%,rgba(10,11,13,0)_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(38,98,148,0.40)_0%,rgba(38,98,148,0)_22%)]" />
      </div>

      {/* Subtle red glow from bottom-left accent */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/20 blur-[80px]" />

      <div className="relative z-10 mx-auto grid max-w-[var(--max-width-content)] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <p
            data-hero-item
            className="mb-4 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-steel-300"
          >
            <span className="h-px w-6 bg-accent" />
            Newtown, PA · Ages 6–College
          </p>
          <h1
            id="hero-heading"
            data-hero-item
            className="font-display text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.93] tracking-tight text-paper-white"
          >
            See exactly where your athlete{' '}
            <span className="text-accent">stands.</span>{' '}
            <span className="whitespace-nowrap">For free.</span>
          </h1>
          <p
            data-hero-item
            className="mt-6 max-w-lg text-base leading-relaxed text-paper-white/80 lg:text-lg"
          >
            One-on-one baseball &amp; softball coaching from college and
            pro-level instructors — backed by HitTrax, the same real-time data
            tech pro programs use.
          </p>
          <div data-hero-item className="mt-8 flex flex-col items-center gap-3 lg:items-start">
            <PrimaryButton />
            <p className="flex items-center gap-1.5 text-sm text-steel-300">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeOpacity="0.5"/>
                <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              No cost. No equipment needed. 30 minutes with a real coach.
            </p>
          </div>
        </div>

        <div data-hero-item className="w-full">
          {/* Glassmorphism stat panel */}
          <div className="rounded-xl border border-paper-white/10 bg-ink-black/40 p-6 backdrop-blur-sm lg:p-8">
            <StatReadoutPanel
              stats={HERO_STATS}
              caption="Real HitTrax output from an NSEC training session"
              size="hero"
              variant="on-dark"
              trigger="mount"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
