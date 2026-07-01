import { Hero } from '../sections/Hero'
import { TrustBar } from '../sections/TrustBar'
import { ProgramsApart } from '../sections/ProgramsApart'
import { Lineup } from '../sections/Lineup'
import { Coaches } from '../sections/Coaches'
import { HitTrax } from '../sections/HitTrax'
import { OfferBlocks } from '../sections/OfferBlocks'
import { CredibilityBand } from '../sections/CredibilityBand'
import { Faq } from '../sections/Faq'
import { FinalCta } from '../sections/FinalCta'
import { Footer } from '../sections/Footer'

export default function Home() {
  return (
    <main className="min-h-svh bg-paper-white pb-20">
      <Hero />
      <TrustBar />
      <ProgramsApart />
      <Lineup />
      <Coaches />
      <HitTrax />
      <OfferBlocks />
      <CredibilityBand />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  )
}
