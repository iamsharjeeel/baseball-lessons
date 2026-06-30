'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, registerGsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { TrustBar } from '@/components/sections/TrustBar'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      registerGsap()
      const section = sectionRef.current
      if (!section || reducedMotion) return

      const eyebrow = section.querySelector('[data-hero-eyebrow]')
      const lines = section.querySelectorAll('[data-hero-line]')
      const sub = section.querySelector('[data-hero-sub]')
      const cta = section.querySelector('[data-hero-cta]')

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
        )
      }

      tl.from(eyebrow, { y: 20, opacity: 0, duration: 0.4 })
        .from(lines, { y: 20, opacity: 0, duration: 0.5, stagger: 0.12 }, '+=0.1')
        .from([sub, cta], { y: 16, opacity: 0, duration: 0.4, stagger: 0.08 }, '+=0.15')
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  )

  return (
    <section id="hero" ref={sectionRef} className="relative bg-ink-black">
      <div className="relative min-h-svh w-full">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          data-placeholder="true"
          sizes="100vw"
        />
        <div
          ref={overlayRef}
          className="photo-gradient absolute inset-0"
          aria-hidden="true"
        />

        <div className="relative z-10 flex min-h-svh flex-col">
          <div className="page-container flex flex-1 flex-col justify-end pb-8 pt-24 lg:justify-center lg:pb-16 lg:pt-0">
            <div className="max-w-4xl text-left text-paper-white">
              <p
                data-hero-eyebrow
                className="mb-6 text-sm uppercase tracking-widest text-paper-white/80"
              >
                Newtown, PA · Ages 6–College
              </p>
              <h1 className="type-hero font-display font-extrabold leading-[0.95] tracking-tight">
                <span data-hero-line className="block">
                  See exactly where your athlete stands.
                </span>
                <span data-hero-line className="mt-2 block">
                  For{' '}
                  <span className="bg-accent px-2 py-0.5 text-paper-white">
                    free.
                  </span>
                </span>
              </h1>
              <p
                data-hero-sub
                className="mt-8 max-w-xl text-base leading-relaxed text-paper-white/90 lg:text-lg"
              >
                One-on-one baseball &amp; softball coaching from college and
                pro-level instructors — backed by HitTrax, the same real-time data
                tech pro programs use.
              </p>
              <div data-hero-cta className="mt-10 flex flex-col items-start gap-3">
                <PrimaryButton />
                <p className="text-sm text-paper-white/75">
                  No cost. No equipment needed. 30 minutes with a real coach.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 bg-paper-white">
            <TrustBar />
          </div>
        </div>
      </div>
    </section>
  )
}
