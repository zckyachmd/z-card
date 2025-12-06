import type { NextConfig } from 'next'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Standalone output for Docker (more efficient)
  // Only enable in Docker build environment
  ...(process.env.DOCKER_BUILD === 'true' && {
    output: 'standalone',
  }),
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withBundleAnalyzer(nextConfig)
