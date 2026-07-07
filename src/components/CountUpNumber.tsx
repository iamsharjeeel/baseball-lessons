'use client'

import { useCountUp } from '../hooks/useCountUp'
import { useInView } from '../hooks/useInView'

type CountUpNumberProps = {
  value: number
  suffix?: string
  duration?: number
  /** 'mount' counts up immediately (hero, above the fold); 'inview' waits for scroll-into-view. */
  trigger?: 'mount' | 'inview'
  className?: string
}

export function CountUpNumber({
  value,
  suffix = '',
  duration = 900,
  trigger = 'inview',
  className = '',
}: CountUpNumberProps) {
  const [ref, inView] = useInView<HTMLSpanElement>()
  const enabled = trigger === 'mount' || inView
  const count = useCountUp(value, duration, enabled)

  const trimmed = suffix.trim()
  const hasSpacing = suffix.startsWith(' ') || suffix.includes(' ')

  return (
    <span ref={ref} className={`whitespace-nowrap ${className}`}>
      {count}
      {suffix && (
        <span className={`inline-block pr-[0.3em] text-[0.55em] font-semibold tracking-normal uppercase ${hasSpacing ? 'ml-1' : ''}`}>
          {trimmed}
        </span>
      )}
    </span>
  )
}
