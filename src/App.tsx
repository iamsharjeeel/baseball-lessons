import { useEffect } from 'react'
import { Hero } from './sections/Hero'
import { captureUtmParams } from './lib/utm'
import { initMetaPixel } from './lib/metaPixel'

function App() {
  useEffect(() => {
    captureUtmParams()
    initMetaPixel()
  }, [])

  return (
    <main className="min-h-svh bg-night-black">
      <Hero />
    </main>
  )
}

export default App
