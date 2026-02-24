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
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        bufferutil: false,
        'utf-8-validate': false,
      }
    }

    config.externals = config.externals || []
    if (isServer) {
      config.externals.push('bufferutil', 'utf-8-validate')
    }

    config.ignoreWarnings = [
      { module: /node_modules\/ws/ },
      { module: /node_modules\/@supabase\/realtime-js/ },
    ]

    return config
  },
}

module.exports = nextConfig 