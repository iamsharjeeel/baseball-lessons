import type { ReactNode } from 'react'

type SectionBackground = 'light' | 'dark'

type SectionProps = {
  id: string
  background?: SectionBackground
  ariaLabelledby?: string
  className?: string
  contentClassName?: string
  children: ReactNode
}

/**
 * Shared section shell — v4 fix #1 (120px desktop / 64px mobile padding,
 * applied identically everywhere) and v4 fix #3 (the outer <section> is
 * always full-bleed; only this inner wrapper is constrained to the
 * 1180px max-width, so a dark section's background always reaches both
 * edges of the viewport with no exceptions).
 */
export function Section({
  id,
  background = 'light',
  ariaLabelledby,
  className = '',
  contentClassName = '',
  children,
}: SectionProps) {
  const bgClass =
    background === 'dark'
      ? 'bg-night-black text-chalk-white'
      : 'bg-paper-white text-night-black'

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`w-full py-16 lg:py-[120px] ${bgClass} ${className}`}
    >
      <div
        className={`mx-auto w-full max-w-[var(--max-width-content)] px-4 lg:px-8 ${contentClassName}`}
      >
        {children}
      </div>
    </section>
  )
}
