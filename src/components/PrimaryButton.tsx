'use client'

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { trackLead } from '../lib/metaPixel'

import { useLeadModal } from '../context/LeadModalContext'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
}

export function PrimaryButton({
  children = 'Book a free intro session',
  onClick,
  className = '',
  ...props
}: PrimaryButtonProps) {
  const { openModal } = useLeadModal()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    trackLead()
    openModal()
    onClick?.(event)
  }

  return (
    <button
      type="button"
      className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 font-display text-lg font-semibold text-paper-white shadow-lg shadow-accent/30 transition-all hover:bg-accent-deep hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5 active:translate-y-0 ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-0.5"
      >
        <path d="M3.75 9h10.5M10 5.25L13.75 9 10 12.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
