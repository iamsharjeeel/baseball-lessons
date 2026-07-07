'use client'

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { trackLead } from '../lib/metaPixel'
import { useLeadModal } from '../context/LeadModalContext'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  variant?: 'primary' | 'secondary'
}

export function PrimaryButton({
  children = 'Book My Free Evaluation',
  onClick,
  className = '',
  variant = 'primary',
  ...props
}: PrimaryButtonProps) {
  const { openModal } = useLeadModal()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    trackLead()
    openModal()
    onClick?.(event)
  }

  const base =
    'group inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-8 py-4 font-display text-lg font-semibold transition-colors'

  const styles =
    variant === 'primary'
      ? `${base} bg-accent text-paper-white hover:bg-accent-deep`
      : `${base} border-2 border-accent bg-transparent text-accent hover:bg-accent-tint`

  return (
    <button type="button" className={`${styles} ${className}`} onClick={handleClick} {...props}>
      {children}
      {variant === 'primary' && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        >
          <path d="M3.75 9h10.5M10 5.25L13.75 9 10 12.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}
