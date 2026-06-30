import { useCountUp } from '../hooks/useCountUp'

type StatItem = {
  label: string
  value: number
  suffix: string
}

type StatReadoutPanelProps = {
  stats: StatItem[]
  caption?: string
  size?: 'hero' | 'large'
  animate?: boolean
}

function StatValue({
  value,
  suffix,
  animate,
}: {
  value: number
  suffix: string
  animate: boolean
}) {
  const count = useCountUp(value, 900, animate)
  return (
    <span className="font-data tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

export function StatReadoutPanel({
  stats,
  caption,
  size = 'hero',
  animate = true,
}: StatReadoutPanelProps) {
  const statSizeClass =
    size === 'hero'
      ? 'text-[clamp(2.5rem,6vw,5rem)]'
      : 'text-[clamp(2rem,5vw,4rem)]'

  return (
    <figure className="w-full">
      <div
        className="border-t-4 border-scoreboard-amber bg-steel-700 px-6 py-8 lg:px-10 lg:py-10"
        aria-label="HitTrax performance readout"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p
                className={`font-data font-bold leading-none text-scoreboard-amber ${statSizeClass}`}
              >
                <StatValue
                  value={stat.value}
                  suffix={stat.suffix}
                  animate={animate}
                />
              </p>
              <p className="mt-2 font-body text-xs uppercase tracking-wider text-chalk-white lg:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-steel-300">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
