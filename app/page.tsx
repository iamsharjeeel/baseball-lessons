import { Hero } from '@/components/sections/Hero'
import { Lineup } from '@/components/sections/Lineup'
import { Coaches } from '@/components/sections/Coaches'
import { HitTrax } from '@/components/sections/HitTrax'
import { Programs } from '@/components/sections/Programs'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'
import { StickyMobileCta } from '@/components/ui/StickyMobileCta'

export default function Home() {
  return (
    <main className="bg-paper-white pb-20 lg:pb-0">
      <Hero />
      <Lineup />
      <Coaches />
      <HitTrax />
      <Programs />
      <Testimonials />
      <Faq />
      <FinalCta />
      <StickyMobileCta />
    </main>
  )
}
