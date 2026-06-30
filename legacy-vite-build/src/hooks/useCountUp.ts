import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useCountUp(
  target: number,
  duration = 900,
  enabled = true,
): number {
  const reducedMotion = useReducedMotion()
  const [value, setValue] = useState(() =>
    reducedMotion || !enabled ? target : 0,
  )

  useEffect(() => {
    if (reducedMotion || !enabled) {
      setValue(target)
      return
    }

    let start: number | null = null
    let frame = 0

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, enabled, reducedMotion])

  return value
}
