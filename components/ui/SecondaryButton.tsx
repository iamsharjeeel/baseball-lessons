'use client'

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { trackLead } from '@/lib/metaPixel'
import { getStoredUtmParams } from '@/lib/utm'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  asLink?: boolean
  href?: string
  trackConversion?: boolean
}

export function SecondaryButton({
  children,
  onClick,
  className = '',
  asLink = false,
  href,
  trackConversion = true,
  ...props
}: Props) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-md border border-steel-300/40 bg-transparent px-6 py-3 font-display text-base font-semibold text-ink-black transition-colors hover:border-steel-300 ${className}`

  if (asLink && href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (trackConversion) {
      trackLead()
      void getStoredUtmParams()
    }
    onClick?.(event)
  }

  return (
    <button type="button" className={classes} onClick={handleClick} {...props}>
      {children}
    </button>
  )
}
