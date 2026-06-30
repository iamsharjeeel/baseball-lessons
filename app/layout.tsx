import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { TrackingInit } from '@/components/TrackingInit'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['700'],
})

export const metadata: Metadata = {
  title: 'Free Baseball & Softball Skills Evaluation | NSEC Newtown, PA',
  description:
    '1-on-1 baseball & softball coaching for ages 6–college, powered by HitTrax data. Book a free skills evaluation at Newtown Sports and Events Center.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full">
        <TrackingInit />
        {children}
      </body>
    </html>
  )
}
