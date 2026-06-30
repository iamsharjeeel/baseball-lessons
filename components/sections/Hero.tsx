'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, registerGsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { StatReadoutPanel } from '@/components/ui/StatReadoutPanel'
import { TrustBar } from '@/components/sections/TrustBar'

const HERO_STATS = [
  { label: 'Exit Velo', value: 78, suffix: ' MPH' },
  { label: 'Launch Angle', value: 19, suffix: '°' },
  { label: 'Distance', value: 212, suffix: ' FT' },
]

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const h1Line1Ref = useRef<HTMLSpanElement>(null)
  const h1Line2Ref = useRef<HTMLSpanElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const ctaBlockRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      registerGsap()
      if (reducedMotion) {
        gsap.set(
          [
            eyebrowRef.current,
            h1Line1Ref.current,
            h1Line2Ref.current,
            subheadRef.current,
            ctaBlockRef.current,
          ],
          { opacity: 1, y: 0 },
        )
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.4 })
        .from(
          [h1Line1Ref.current, h1Line2Ref.current],
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.12 },
          '+=0.1',
        )
        .from(
          [subheadRef.current, ctaBlockRef.current],
          { y: 16, opacity: 0, duration: 0.4, stagger: 0.08 },
          '+=0.15',
        )
    },
    { scope: heroRef, dependencies: [reducedMotion] },
  )

  return (
    <section
      id="hero"
      ref={heroRef}
      className="flex min-h-svh flex-col"
      aria-labelledby="hero-heading"
    >
      <div className="page-container flex flex-1 flex-col justify-center">
        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14">
          <div className="text-left">
            <p
              ref={eyebrowRef}
              className="mb-4 text-sm uppercase tracking-widest text-steel-300"
            >
              Newtown, PA · Ages 6–College
            </p>
            <h1
              id="hero-heading"
              className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-tight text-chalk-white lg:text-[4rem]"
            >
              <span ref={h1Line1Ref} className="block">
                See exactly where your athlete stands.
              </span>
              <span ref={h1Line2Ref} className="block">
                For free.
              </span>
            </h1>
            <p
              ref={subheadRef}
              className="mt-6 max-w-xl text-base leading-relaxed text-chalk-white/90 lg:text-lg"
            >
              One-on-one baseball &amp; softball coaching from college and
              pro-level instructors — backed by HitTrax, the same real-time data
              tech pro programs use.
            </p>
            <div ref={ctaBlockRef} className="mt-8 flex flex-col gap-3">
              <PrimaryButton />
              <p className="text-sm text-steel-300">
                No cost. No equipment needed. 30 minutes with a real coach.
              </p>
            </div>
          </div>

          <div className="w-full lg:justify-self-end">
            <StatReadoutPanel
              stats={HERO_STATS}
              caption="Real HitTrax output from an NSEC training session"
              size="hero"
              trigger="mount"
              showGlow
              mountDelay={0.9}
            />
          </div>
        </div>

        <TrustBar />
      </div>
    </section>
  )
}
