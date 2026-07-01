import { Hero } from '../sections/Hero'
import { TrustBar } from '../sections/TrustBar'
import { Lineup } from '../sections/Lineup'
import { Coaches } from '../sections/Coaches'
import { HitTrax } from '../sections/HitTrax'
import { Programs } from '../sections/Programs'
import { Testimonials } from '../sections/Testimonials'
import { Faq } from '../sections/Faq'
import { FinalCta } from '../sections/FinalCta'

export default function Home() {
  return (
    <main className="min-h-svh bg-paper-white">
      <Hero />
      <TrustBar />
      <Lineup />
      <Coaches />
      <HitTrax />
      <Programs />
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  )
}
