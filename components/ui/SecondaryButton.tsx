'use client'

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { trackLead } from '@/lib/metaPixel'
import { getStoredUtmParams } from '@/lib/utm'

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
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
}: SecondaryButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (trackConversion) {
      trackLead()
      void getStoredUtmParams()
    }
    onClick?.(event)
  }

  const classes = `inline-flex min-h-11 items-center justify-center rounded-md border border-steel-300/30 bg-transparent px-6 py-3 font-display text-base font-semibold text-chalk-white transition-colors hover:border-steel-300/60 hover:bg-steel-700/50 ${className}`

  if (asLink && href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          if (trackConversion) {
            trackLead()
            void getStoredUtmParams()
          }
        }}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
