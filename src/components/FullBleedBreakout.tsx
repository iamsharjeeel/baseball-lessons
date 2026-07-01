import type { ReactNode } from 'react'

type FullBleedBreakoutProps = {
  children: ReactNode
  className?: string
}

/** Breaks child content out to full viewport width from inside a constrained column. */
export function FullBleedBreakout({ children, className = '' }: FullBleedBreakoutProps) {
  return (
    <div
      className={`relative left-1/2 w-screen max-w-none -translate-x-1/2 ${className}`}
    >
      {children}
    </div>
  )
}
