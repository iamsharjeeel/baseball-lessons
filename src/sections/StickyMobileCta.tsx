import { useEffect, useState } from 'react'
import { PrimaryButton } from '../components/PrimaryButton'

/** Section 10 — persistent bottom bar, mobile only, appears once the hero is scrolled past. */
export function StickyMobileCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '0px' },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-steel-300/20 bg-night-black p-3 transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <PrimaryButton className="w-full" tabIndex={visible ? 0 : -1} />
    </div>
  )
}
