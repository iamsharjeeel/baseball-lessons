import { CountUpNumber } from './CountUpNumber'

type StatItem = {
  label: string
  value: number
  suffix: string
  /** One-sentence plain-language explanation, shown only in the HitTrax deep-dive. */
  explanation?: string
}

type StatReadoutPanelProps = {
  stats: StatItem[]
  caption?: string
  size?: 'hero' | 'large'
  /** Label/caption color register — 'on-dark' for the hero photo, 'on-light' for the dedicated HitTrax section. */
  variant?: 'on-dark' | 'on-light'
  /** 'mount' for the hero (already above the fold); 'inview' for every other instance. */
  trigger?: 'mount' | 'inview'
}

/**
 * Shared stat readout — used by both the hero panel and the dedicated
 * HitTrax section, per the "reuse the stat-readout component" rule. Numbers
 * get the v5 gradient-fill treatment (accent fading to accent-deep) instead
 * of a flat fill or the old steel-700/scoreboard-amber box.
 */
export function StatReadoutPanel({
  stats,
  caption,
  size = 'hero',
  variant = 'on-light',
  trigger = 'inview',
}: StatReadoutPanelProps) {
  const statSizeClass =
    size === 'hero' ? 'text-[clamp(2.5rem,6vw,5rem)]' : 'text-[clamp(3.5rem,9vw,7rem)]'
  const labelClass = variant === 'on-dark' ? 'text-paper-white/80' : 'text-ink-black/70'

  return (
    <figure className="w-full">
      <div
        className="grid grid-cols-3 gap-4 border-t-2 border-accent pt-6 text-center lg:gap-6 lg:pt-8"
        aria-label="HitTrax performance readout"
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className={`stat-gradient-text font-data font-bold leading-none ${statSizeClass}`}>
              <CountUpNumber value={stat.value} suffix={stat.suffix} trigger={trigger} />
            </p>
            <p className={`mt-2 font-body text-xs font-semibold uppercase tracking-wider lg:text-sm ${labelClass}`}>
              {stat.label}
            </p>
            {stat.explanation && (
              <p
                className={`mx-auto mt-2 max-w-xs text-sm leading-relaxed ${variant === 'on-dark' ? 'text-paper-white/70' : 'text-ink-black/70'}`}
              >
                {stat.explanation}
              </p>
            )}
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-steel-300">{caption}</figcaption>
      )}
    </figure>
  )
}
