import { useEffect, useState } from 'react'

/**
 * Single source of truth for `prefers-reduced-motion` — every GSAP timeline
 * gates against this hook.
 *
 * Always initializes to `false` (matching the server-rendered default,
 * since `window` doesn't exist during SSR) and corrects itself in an
 * effect. Reading `matchMedia` directly in the state initializer would run
 * during the client's first render and could disagree with the
 * server-rendered HTML whenever the real preference is `reduce`, which
 * React reports as a hydration mismatch (#418) even though the page then
 * self-heals — this avoids that error entirely.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mediaQuery.matches)

    const onChange = () => setReduced(mediaQuery.matches)
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  return reduced
}
