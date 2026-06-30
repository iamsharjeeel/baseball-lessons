const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

export type UtmParams = Partial<Record<(typeof UTM_PARAMS)[number], string>>

export function captureUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const utm: UtmParams = {}

  for (const key of UTM_PARAMS) {
    const value = params.get(key)
    if (value) utm[key] = value
  }

  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem('nsec_utm', JSON.stringify(utm))
  }

  return utm
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {}

  try {
    const stored = sessionStorage.getItem('nsec_utm')
    return stored ? (JSON.parse(stored) as UtmParams) : {}
  } catch {
    return {}
  }
}
