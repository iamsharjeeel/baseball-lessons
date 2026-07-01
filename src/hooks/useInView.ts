import { useEffect, useRef, useState, type RefObject } from 'react'
import { ScrollTrigger, SCROLL_TRIGGER_START } from '../lib/gsap'

/**
 * Gates a value (stat count-up, fade-up) behind scroll-into-view instead of
 * mount, via the same ScrollTrigger instance the rest of the motion system
 * uses — per MIGRATION_BRIEF_V5.md's "count up on scroll-into-view, not
 * just on mount" rule for Trust bar / HitTrax / Lineup.
 */
export function useInView<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: SCROLL_TRIGGER_START,
      once: true,
      onEnter: () => setInView(true),
    })

    return () => trigger.kill()
  }, [])

  return [ref, inView]
}
