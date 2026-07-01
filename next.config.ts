import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nacsportscenter.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

export default nextConfig
