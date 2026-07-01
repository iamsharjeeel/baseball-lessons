'use client'

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { trackLead } from '../lib/metaPixel'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
}

export function PrimaryButton({
  children = 'Book My Free Evaluation',
  onClick,
  className = '',
  ...props
}: PrimaryButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    trackLead()
    // TODO: wire up lead capture — see HANDOVER.md
    onClick?.(event)
  }

  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-8 py-4 font-display text-lg font-semibold text-paper-white transition-colors hover:bg-accent-deep ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
