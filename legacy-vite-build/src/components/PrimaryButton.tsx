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
      className={`inline-flex min-h-11 items-center justify-center rounded-md bg-clay-red px-8 py-4 font-display text-lg font-semibold text-chalk-white transition-colors hover:bg-[#b33d26] ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
