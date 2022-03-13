/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
]

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders
      }
    ]
  },
 // Prefer loading of ES Modules over CommonJS
 experimental: {esmExternals: true},
 // Support MDX files as pages:
 pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
 // Support loading `.md`, `.mdx`:
 webpack(config, options) {
   config.module.rules.push({
     test: /\.mdx?$/,
     use: [
       // The default `babel-loader` used by Next:
       options.defaultLoaders.babel,
       {
         loader: '@mdx-js/loader',
         /** @type {import('@mdx-js/loader').Options} */
         options: {/* jsxImportSource: …, otherOptions… */}
       }
     ]
   })

   return config
 },
  compiler: {
    removeConsole: {
      exclude: ['error']
    }
  }
}

module.exports = nextConfig
