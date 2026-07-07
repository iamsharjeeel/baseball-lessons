import type { Metadata, Viewport } from 'next'
import { Big_Shoulders, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { AnalyticsInit } from '../components/AnalyticsInit'
import { StickyMobileCta } from '../sections/StickyMobileCta'

const bigShoulders = Big_Shoulders({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-big-shoulders',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Free Baseball & Softball Skills Evaluation | NSEC Newtown, PA',
  description:
    '1-on-1 baseball & softball coaching for ages 6–college, powered by HitTrax data. Book a free skills evaluation at Newtown Sports and Events Center.',
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

import { LeadModalProvider } from '../context/LeadModalContext'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <LeadModalProvider>
          {children}
          <StickyMobileCta />
          <AnalyticsInit />
        </LeadModalProvider>
      </body>
    </html>
  )
}
