'use client'

import { useEffect } from 'react'
import { initMetaPixel } from '@/lib/metaPixel'
import { captureUtmParams } from '@/lib/utm'

export function TrackingInit() {
  useEffect(() => {
    captureUtmParams()
    initMetaPixel()
  }, [])

  return null
}
