/**
 * Visible markup tag for the realistic-but-unconfirmed numeric placeholders
 * (trust bar, pricing). `data-placeholder="true"` makes every instance
 * machine-findable; the visible "PLACEHOLDER" chip makes it impossible to
 * ship by accident.
 */
export function PlaceholderTag({ note }: { note: string }) {
  return (
    <span
      data-placeholder="true"
      data-placeholder-note={note}
      title={note}
      className="ml-2 inline-flex shrink-0 items-center rounded-sm border border-accent/50 bg-accent/10 px-1.5 py-0.5 align-middle font-body text-[0.625rem] font-bold uppercase leading-none tracking-wider text-accent"
    >
      Placeholder
    </span>
  )
}
