declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: (...args: unknown[]) => void
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

export function initMetaPixel(): void {
  if (!PIXEL_ID || typeof window === 'undefined') return

  if (window.fbq) {
    window.fbq('track', 'PageView')
    return
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://connect.facebook.net/en_US/fbevents.js`
  document.head.appendChild(script)

  const n = (window.fbq = function (...args: unknown[]) {
    if (n.callMethod) {
      n.callMethod(...args)
    } else {
      n.queue.push(args)
    }
  }) as typeof window.fbq & {
    callMethod?: (...args: unknown[]) => void
    queue: unknown[][]
    loaded?: boolean
    version?: string
    push?: unknown
  }

  if (!window._fbq) window._fbq = n
  n.push = n
  n.loaded = true
  n.version = '2.0'
  n.queue = []

  window.fbq?.('init', PIXEL_ID)
  window.fbq?.('track', 'PageView')
}

export function trackLead(): void {
  window.fbq?.('track', 'Lead')
}
