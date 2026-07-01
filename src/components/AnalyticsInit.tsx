'use client'

import { useEffect } from 'react'
import { captureUtmParams } from '../lib/utm'
import { initMetaPixel } from '../lib/metaPixel'

export function AnalyticsInit() {
  useEffect(() => {
    captureUtmParams()
    initMetaPixel()
  }, [])

  return null
}
