import type { NextConfig } from 'next'

const productionAssetPrefix =
  process.env.NEXT_PUBLIC_ASSET_PREFIX ||
  (process.env.VERCEL_ENV === 'production'
    ? 'https://baseball-lessons-neon.vercel.app'
    : undefined)

const nextConfig: NextConfig = {
  reactStrictMode: true,
  assetPrefix: productionAssetPrefix,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
