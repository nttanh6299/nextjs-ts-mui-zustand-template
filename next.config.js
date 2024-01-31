const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// @ts-nocheck
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
    minimumCacheTTL: 604800,
  },
  output: 'standalone',
};

module.exports = withBundleAnalyzer(nextConfig);
