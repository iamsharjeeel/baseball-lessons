import type { ReactNode } from 'react'

/**
 * v4 fix #4 — one gradient-overlay treatment, applied identically to
 * every photo on the page (hero, coach, facility) so none of them reads
 * as "untreated" next to the others.
 *
 * Two stacked layers:
 * 1. A flat 40% black tint across the whole photo. This is the part that
 *    deviates from a literal read of `DESIGN_SYSTEM.md` v3 (which only
 *    specifies the bottom-up gradient below) — measured contrast against
 *    the actual generated hero placeholder showed the top of the photo,
 *    where the eyebrow text sits, fails WCAG AA (~3.5:1) for `steel-300`
 *    with the gradient alone, since the gradient hits 0% opacity ~60% up.
 *    A uniform 40% tint brings that to ~4.7:1 while keeping the gradient's
 *    extra bottom-heavy darkening for headline legibility. Applied to all
 *    three photos identically, so the treatment is still one rule, not a
 *    hero-only patch.
 * 2. The bottom-to-top gradient specified in `DESIGN_SYSTEM.md`: ink-black
 *    at 70% opacity at the bottom, fading to 0% ~60% up the image.
 */
export const PHOTO_TINT_CLASS = 'pointer-events-none absolute inset-0 bg-night-black/40'
export const PHOTO_GRADIENT_CLASS =
  'pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(11,14,17,0.70)_0%,rgba(11,14,17,0)_60%)]'

export function PhotoOverlay() {
  return (
    <>
      <div aria-hidden="true" className={PHOTO_TINT_CLASS} />
      <div aria-hidden="true" className={PHOTO_GRADIENT_CLASS} />
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
