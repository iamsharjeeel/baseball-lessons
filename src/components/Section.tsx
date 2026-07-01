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
 * Shared section shell, server component (no client JS) — outer <section>
 * is always full-bleed, inner wrapper is constrained to the 1180px
 * max-width, 120px desktop / 64px mobile padding, identical everywhere.
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
      ? 'relative overflow-hidden bg-ink-black text-paper-white'
      : 'bg-paper-white text-ink-black'

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`w-full py-16 lg:py-[120px] ${bgClass} ${className}`}
    >
      {background === 'dark' && <div aria-hidden="true" className="grain-overlay" />}
      <div
        className={`relative mx-auto w-full max-w-[var(--max-width-content)] px-4 lg:px-8 ${contentClassName}`}
      >
        {children}
      </div>
    </section>
  )
}
