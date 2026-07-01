import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }

/**
 * One timing/easing curve, defined once and reused everywhere per
 * MIGRATION_BRIEF_V5.md's motion system — every scroll fade-up, the Lineup
 * stagger, and the hero load sequence all pull from these constants instead
 * of being hand-tuned per section.
 */
export const EASE = 'power3.out'
export const FADE_UP_DURATION = 0.7
export const FADE_UP_DISTANCE = 28
export const FADE_UP_STAGGER = 0.09
export const SCROLL_TRIGGER_START = 'top 85%'
