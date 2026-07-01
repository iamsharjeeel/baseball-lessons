import { CountUpNumber } from './CountUpNumber'

export type HitTraxStat = {
  value: number
  unit: string
  label: string
  description?: string
}

type HitTraxStatGridProps = {
  stats: HitTraxStat[]
  variant?: 'on-dark' | 'on-light'
  trigger?: 'mount' | 'inview'
  showDescriptions?: boolean
  caption?: string
}

/**
 * Shared HitTrax stat readout — identical treatment in hero and mid-page.
 * Numbers + units share one baseline via flex items-baseline; labels align beneath.
 */
export function HitTraxStatGrid({
  stats,
  variant = 'on-light',
  trigger = 'inview',
  showDescriptions = false,
  caption,
}: HitTraxStatGridProps) {
  const labelClass = variant === 'on-dark' ? 'text-paper-white/80' : 'text-ink-black/70'
  const descClass = variant === 'on-dark' ? 'text-paper-white/65' : 'text-ink-black/60'
  const captionClass = variant === 'on-dark' ? 'text-paper-white/50' : 'text-ink-black/50'

  return (
    <figure className="w-full">
      <div className="border-t-2 border-accent pt-6 lg:pt-8">
        <div
          className="grid grid-cols-3 gap-3 sm:gap-6"
          aria-label="HitTrax performance readout"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="min-w-0">
              <div className="flex items-baseline justify-start">
                <span className="stat-gradient-text font-data text-[clamp(2.75rem,7vw,4.5rem)] font-bold leading-none tabular-nums">
                  <CountUpNumber value={stat.value} trigger={trigger} />
                </span>
                <span className="stat-unit">{stat.unit}</span>
              </div>
              <p
                className={`mt-2 font-body text-[0.65rem] font-bold uppercase leading-tight tracking-[0.14em] sm:mt-3 sm:text-xs sm:tracking-[0.15em] ${labelClass}`}
              >
                {stat.label}
              </p>
              {showDescriptions && stat.description && (
                <p className={`mt-2 min-h-[3.25rem] text-sm leading-relaxed ${descClass}`}>
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      {caption && (
        <figcaption className={`mt-3 text-sm ${captionClass}`}>{caption}</figcaption>
      )}
    </figure>
  )
}
