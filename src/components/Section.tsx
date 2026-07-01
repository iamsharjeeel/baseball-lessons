import type { ReactNode } from 'react'

type SectionBackground = 'light' | 'dark'
type SectionPadding = 'default' | 'compact'

type SectionProps = {
  id: string
  background?: SectionBackground
  padding?: SectionPadding
  ariaLabelledby?: string
  className?: string
  contentClassName?: string
  children: ReactNode
}

const PADDING_CLASS: Record<SectionPadding, string> = {
  default: 'py-[var(--spacing-section-y)]',
  compact: 'py-[var(--spacing-section-compact)]',
}

/**
 * Shared section shell — uniform vertical rhythm via spacing tokens.
 */
export function Section({
  id,
  background = 'light',
  padding = 'default',
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
      className={`w-full ${PADDING_CLASS[padding]} ${bgClass} ${className}`}
    >
      {background === 'dark' && <div aria-hidden="true" className="grain-overlay" />}
      <div
        className={`relative mx-auto w-full max-w-[var(--max-width-content)] px-4 lg:px-10 ${contentClassName}`}
      >
        {children}
      </div>
    </section>
  )
}
