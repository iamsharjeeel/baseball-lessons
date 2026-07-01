import type { ReactNode } from 'react'

/**
 * One gradient-overlay treatment, applied identically to every photo on the
 * page (hero, coach, facility) so none of them reads as "untreated" next to
 * the others. Two stacked layers: a flat 40% black tint (measured contrast
 * fix — the gradient alone fails WCAG AA where it hits 0% opacity ~60% up
 * the image) plus the bottom-to-top gradient from DESIGN_SYSTEM.md.
 *
 * v5 adds a third, optional warm layer (`warm`) for the hero only — mixes
 * `--accent-deep` in at low opacity at the very bottom edge, tying the
 * photo treatment to the accent system instead of a purely neutral fade.
 */
export const PHOTO_TINT_CLASS = 'pointer-events-none absolute inset-0 bg-ink-black/40'
export const PHOTO_GRADIENT_CLASS =
  'pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,11,13,0.70)_0%,rgba(10,11,13,0)_60%)]'
export const PHOTO_WARM_EDGE_CLASS =
  'pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(155,53,32,0.35)_0%,rgba(155,53,32,0)_18%)]'

export function PhotoOverlay({ warm = false }: { warm?: boolean }) {
  return (
    <>
      <div aria-hidden="true" className={PHOTO_TINT_CLASS} />
      <div aria-hidden="true" className={PHOTO_GRADIENT_CLASS} />
      {warm && <div aria-hidden="true" className={PHOTO_WARM_EDGE_CLASS} />}
    </>
  )
}

type PhotoAspect = 'coach' | 'facility'

const ASPECT_CLASS: Record<PhotoAspect, string> = {
  coach: 'aspect-[4/5]',
  facility: 'aspect-[16/9]',
}

type PhotoFrameProps = {
  aspect: PhotoAspect
  className?: string
  children: ReactNode
}

/** Inline framed photo (coach, facility) — fixed aspect ratio per slot, same overlay as the hero. */
export function PhotoFrame({ aspect, className = '', children }: PhotoFrameProps) {
  return (
    <div className={`relative w-full overflow-hidden ${ASPECT_CLASS[aspect]} ${className}`}>
      {children}
      <PhotoOverlay />
    </div>
  )
}
