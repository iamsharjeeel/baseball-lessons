'use client'

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { trackLead } from '@/lib/metaPixel'
import { getStoredUtmParams } from '@/lib/utm'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
  fullWidth?: boolean
}

export function PrimaryButton({
  children = 'Book My Free Evaluation',
  onClick,
  className = '',
  fullWidth = false,
  ...props
}: PrimaryButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    trackLead()
    // TODO: wire up lead capture — see HANDOVER.md
    // UTM params available via getStoredUtmParams() when handler is wired
    void getStoredUtmParams()
    onClick?.(event)
  }

  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center rounded-md bg-clay-red px-8 py-4 font-display text-lg font-semibold text-chalk-white transition-colors hover:bg-[#b33d26] ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
