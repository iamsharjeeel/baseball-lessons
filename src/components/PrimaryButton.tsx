'use client'

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { useFormModal } from '../context/FormModalContext'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
}

export function PrimaryButton({
  children = 'Book My Free Evaluation',
  className = '',
  onClick,
  ...props
}: PrimaryButtonProps) {
  const { openModal } = useFormModal()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    openModal()
    onClick?.(event)
  }

  return (
    <button
      type="button"
      data-cta="open-evaluation-form"
      className={`inline-flex min-h-11 items-center justify-center rounded-sm bg-accent px-8 py-4 font-display text-lg font-semibold text-paper-white transition-colors hover:bg-accent-deep ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
