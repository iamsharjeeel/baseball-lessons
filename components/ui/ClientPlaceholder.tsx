import type { ReactNode } from 'react'

type Props = {
  label: string
  children?: ReactNode
  inverted?: boolean
  className?: string
}

export function ClientPlaceholder({
  label,
  children,
  inverted = false,
  className = '',
}: Props) {
  return (
    <div
      className={`border border-dashed px-6 py-6 ${
        inverted
          ? 'border-steel-300/30 bg-paper-white text-ink-black'
          : 'border-steel-300/40 bg-paper-white text-ink-black'
      } ${className}`}
    >
      <p className="text-xs uppercase tracking-widest text-steel-300">
        Pending from client
      </p>
      {children ?? (
        <p className="mt-2 font-data type-stat font-bold leading-none text-accent">
          [ ]
        </p>
      )}
      <p className="mt-2 text-sm text-steel-300">{label}</p>
    </div>
  )
}
