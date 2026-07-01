'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { PrimaryButton } from '../components/PrimaryButton'
import { StatReadoutPanel } from '../components/StatReadoutPanel'
import { PhotoOverlay } from '../components/PhotoFrame'
import { gsap, EASE } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'

const HeroScene = dynamic(() => import('../components/HeroScene').then((m) => m.HeroScene), {
  ssr: false,
})

const HERO_STATS = [
  { label: 'Exit Velo', value: 78, suffix: ' MPH' },
  { label: 'Launch Angle', value: 19, suffix: '°' },
  { label: 'Distance', value: 212, suffix: ' FT' },
]

function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function Hero() {
  const reducedMotion = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [canRender3D, setCanRender3D] = useState(false)
  const [mountScene, setMountScene] = useState(false)
  const [sceneVisible, setSceneVisible] = useState(false)

  // Three.js scope is decorative-only and must never compete with LCP —
  // feature-detect before even requesting the chunk, and mount only after
  // the hero's own load sequence has started painting.
  useEffect(() => {
    setCanRender3D(!reducedMotion && hasWebGL())
  }, [reducedMotion])

  useEffect(() => {
    if (!canRender3D) return
    const timeout = setTimeout(() => setMountScene(true), 500)
    return () => clearTimeout(timeout)
  }, [canRender3D])

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
      <div className="absolute inset-0">
        <Image
          src="/images/hero-1920.webp"
          alt="A young baseball player mid-swing at NSEC's indoor batting cage"
          priority
          fill
          sizes="100vw"
          className="object-cover"
          data-placeholder="true"
        />
        <PhotoOverlay warm />
      </div>

      {mountScene && (
        <div
          className={`transition-opacity duration-700 ${sceneVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <HeroScene onReady={() => setSceneVisible(true)} />
        </div>
      )}

      <div className="relative z-10 mx-auto grid max-w-[var(--max-width-content)] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <p
            data-hero-item
            className="mb-4 font-body text-sm uppercase tracking-widest text-steel-300"
          >
            Newtown, PA · Ages 6–College
          </p>
          <h1
            id="hero-heading"
            data-hero-item
            className="font-display text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight text-paper-white"
          >
            See exactly where your athlete stands. For free.
          </h1>
          <p
            data-hero-item
            className="mt-6 max-w-xl text-base leading-relaxed text-paper-white/90 lg:text-lg"
          >
            One-on-one baseball &amp; softball coaching from college and
            pro-level instructors — backed by HitTrax, the same real-time data
            tech pro programs use.
          </p>
          <div data-hero-item className="mt-8 flex flex-col items-center gap-3 lg:items-start">
            <PrimaryButton />
            <p className="text-sm text-steel-300">
              No cost. No equipment needed. 30 minutes with a real coach.
            </p>
          </div>
        </div>

        <div data-hero-item className="w-full">
          <StatReadoutPanel
            stats={HERO_STATS}
            caption="Real HitTrax output from an NSEC training session"
            size="hero"
            variant="on-dark"
            trigger="mount"
          />
        </div>
      </div>
    </section>
  )
}
