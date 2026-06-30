/**
 * This project runs on Vite, not Next.js (see README.md / HANDOVER.md —
 * `AGENT_INSTRUCTIONS.md`'s "Next.js 15" stack line is stale and doesn't
 * match the actual scaffold). There is no `next/image` available here, so
 * this component reproduces the same contract and the same wins:
 * explicit width/height to stop layout shift, a real `srcset` generated
 * from pre-built responsive WebP files (no on-the-fly resizing, so no
 * server cost), eager + high fetch-priority loading for `priority`
 * images, and lazy-loading for everything else.
 */
type ImageProps = {
  /** Base path with no size suffix or extension, e.g. "/images/hero" */
  src: string
  /** Pre-generated source widths available at `${src}-${w}.webp` */
  widths: number[]
  alt: string
  width: number
  height: number
  sizes?: string
  priority?: boolean
  className?: string
  /** Tags this image as placeholder photography pending real NSEC photos */
  placeholder?: boolean
}

export function Image({
  src,
  widths,
  alt,
  width,
  height,
  sizes = '100vw',
  priority = false,
  className = '',
  placeholder = true,
}: ImageProps) {
  const sorted = [...widths].sort((a, b) => a - b)
  const largest = sorted[sorted.length - 1]
  const srcSet = sorted.map((w) => `${src}-${w}.webp ${w}w`).join(', ')

  return (
    <img
      src={`${src}-${largest}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      data-placeholder={placeholder ? 'true' : undefined}
      className={className}
    />
  )
}
