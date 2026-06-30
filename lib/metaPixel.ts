declare global {
  interface Window {
    fbq?: FbqFunction
    _fbq?: FbqFunction
  }
}

type FbqFunction = {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  loaded?: boolean
  version?: string
  push?: unknown
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
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  const queue: unknown[][] = []
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args)
    } else {
      queue.push(args)
    }
  }) as FbqFunction

  fbq.queue = queue
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'

  window.fbq = fbq
  window._fbq = fbq

  window.fbq('init', PIXEL_ID)
  window.fbq('track', 'PageView')
}

export function trackLead(): void {
  window.fbq?.('track', 'Lead')
}
