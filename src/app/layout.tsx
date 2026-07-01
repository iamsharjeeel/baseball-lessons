import type { Metadata, Viewport } from 'next'
import { Big_Shoulders, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { AnalyticsInit } from '../components/AnalyticsInit'
import { FormModal } from '../components/FormModal'
import { FormModalProvider } from '../context/FormModalContext'
import { StickyCtaBar } from '../sections/StickyCtaBar'

const bigShoulders = Big_Shoulders({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-big-shoulders',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
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
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <FormModalProvider>
          {children}
          <FormModal />
          <StickyCtaBar />
        </FormModalProvider>
        <AnalyticsInit />
      </body>
    </html>
  )
}
