import type { ReactNode } from 'react'

type ClientPlaceholderProps = {
  label: string
  children?: ReactNode
  className?: string
}

export function ClientPlaceholder({
  label,
  children,
  className = '',
}: ClientPlaceholderProps) {
  return (
    <div
      className={`border border-dashed border-steel-300/40 bg-steel-700/40 px-6 py-6 ${className}`}
    >
      <p className="text-xs uppercase tracking-widest text-steel-300">
        Pending from client
      </p>
      {children ?? (
        <p className="mt-2 font-data text-2xl font-bold text-scoreboard-amber">
          [ ]
        </p>
      )}
      <p className="mt-2 text-sm text-steel-300">{label}</p>
    </div>
  )
}
