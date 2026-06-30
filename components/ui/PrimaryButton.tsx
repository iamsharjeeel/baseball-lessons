'use client'

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { trackLead } from '@/lib/metaPixel'
import { getStoredUtmParams } from '@/lib/utm'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  fullWidth?: boolean
}

export function PrimaryButton({
  children = 'Book My Free Evaluation',
  onClick,
  className = '',
  fullWidth = false,
  ...props
}: Props) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    trackLead()
    void getStoredUtmParams()
    // TODO: wire up lead capture — see HANDOVER.md
    onClick?.(event)
  }

  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-8 py-4 font-display text-lg font-semibold text-paper-white transition-[filter] hover:brightness-90 ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
