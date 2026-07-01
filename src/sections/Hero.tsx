'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { EvaluationForm } from '../components/EvaluationForm'
import { HitTraxStatGrid } from '../components/HitTraxStatGrid'
import { PhotoOverlay } from '../components/PhotoFrame'
import { gsap, EASE } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'

const HERO_STATS = [
  { value: 78, unit: 'MPH', label: 'Exit Velo' },
  { value: 19, unit: '°', label: 'Launch Angle' },
  { value: 212, unit: 'FT', label: 'Distance' },
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

      <div className="relative z-10 mx-auto max-w-[var(--max-width-content)] px-4 pb-10 pt-10 lg:px-10 lg:pb-12 lg:pt-14">
        <div data-hero-item className="mb-8 lg:mb-10">
          <Image
            src="https://nacsportscenter.com/wp-content/uploads/2026/01/NSEC-Primary-Logo-All-White-Web.png"
            alt="Newtown Sports & Events Center"
            width={220}
            height={48}
            className="h-10 w-auto lg:h-12"
            priority
          />
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_540px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_560px]">
          <div className="min-w-0">
            <p
              data-hero-item
              className="mb-4 font-body text-xs font-bold uppercase tracking-[0.22em] text-accent"
            >
              Elite Instruction · Ages 6–College
            </p>
            <h1
              id="hero-heading"
              data-hero-item
              className="max-w-4xl font-display text-[clamp(2.75rem,7.5vw,5.75rem)] font-extrabold leading-[0.9] tracking-[-0.03em] text-paper-white"
            >
              See exactly where your athlete{' '}
              <span className="inline-block bg-accent px-2 py-0.5 text-paper-white">stands.</span>
            </h1>
            <p
              data-hero-item
              className="mt-5 max-w-2xl text-base leading-relaxed text-paper-white/85 lg:text-lg"
            >
              Customized one-on-one baseball &amp; softball training in hitting, fielding,
              catching, and pitching — led by instructors with college and pro-level coaching
              insight.
            </p>

            <div data-hero-item className="mt-8 max-w-lg">
              <HitTraxStatGrid
                stats={HERO_STATS}
                variant="on-dark"
                trigger="mount"
                caption="Real HitTrax output from an NSEC training session"
              />
            </div>
          </div>

          <div data-hero-item className="w-full min-w-0 lg:sticky lg:top-8">
            <EvaluationForm variant="inline" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
