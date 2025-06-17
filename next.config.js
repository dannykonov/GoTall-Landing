/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    // Custom webpack config if needed
    return config
  },
}

module.exports = nextConfig 