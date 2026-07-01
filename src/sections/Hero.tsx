'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { EvaluationForm } from '../components/EvaluationForm'
import { StatReadoutPanel } from '../components/StatReadoutPanel'
import { PhotoOverlay } from '../components/PhotoFrame'
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
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const targets = root.querySelectorAll<HTMLElement>('[data-hero-item]')

      if (reducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 })
        return
      }

      gsap.set(targets, { opacity: 0.01, y: 24 })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: EASE,
        stagger: 0.09,
      })
    },
    { dependencies: [reducedMotion] },
  )

  useGSAP(
    () => {
      const image = imageRef.current
      if (!image || reducedMotion) return

      gsap.to(image, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { dependencies: [reducedMotion] },
  )

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative overflow-hidden bg-ink-black"
      aria-labelledby="hero-heading"
    >
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero-1920.webp"
          alt="A baseball player mid-swing and a softball athlete training at NSEC's indoor facility"
          priority
          fill
          sizes="100vw"
          className="object-cover"
          data-placeholder="true"
        />
        <PhotoOverlay warm />
      </div>

      <div className="relative z-10 mx-auto max-w-[var(--max-width-content)] px-4 py-10 lg:px-8 lg:py-16">
        <div data-hero-item className="mb-10 lg:mb-14">
          <Image
            src="https://nacsportscenter.com/wp-content/uploads/2026/01/NSEC-Primary-Logo-All-White-Web.png"
            alt="Newtown Sports & Events Center"
            width={220}
            height={48}
            className="h-10 w-auto lg:h-12"
            priority
          />
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_420px] lg:gap-16 xl:grid-cols-[1fr_440px]">
          <div>
            <p
              data-hero-item
              className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-paper-white/70"
            >
              Elite Instruction · Ages 6–College
            </p>
            <h1
              id="hero-heading"
              data-hero-item
              className="max-w-3xl font-display text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.02em] text-paper-white"
            >
              See exactly where your athlete{' '}
              <span className="inline-block bg-accent px-2 py-0.5 text-paper-white">stands.</span>
            </h1>
            <p
              data-hero-item
              className="mt-6 max-w-xl text-base leading-relaxed text-paper-white/85 lg:text-lg"
            >
              Customized one-on-one baseball &amp; softball training in hitting, fielding,
              catching, and pitching — led by instructors with college and pro-level coaching
              insight.
            </p>

            <div data-hero-item className="mt-10 max-w-xl">
              <StatReadoutPanel
                stats={HERO_STATS}
                caption="Real HitTrax output from an NSEC training session"
                size="hero"
                variant="on-dark"
                trigger="mount"
              />
            </div>
          </div>

          <div data-hero-item className="w-full lg:sticky lg:top-8">
            <EvaluationForm variant="inline" />
          </div>
        </div>
      </div>
    </section>
  )
}
