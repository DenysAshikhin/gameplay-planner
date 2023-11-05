/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    minimumCacheTTL: 360,
  },

  distDir: 'new_build/.next',
  async headers() {
    return [

      {
        // This works, and returns appropriate Response headers:
        source: '/(.*).svg',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=31536000',
          },
        ],
      },
      {
        // This works, and returns appropriate Response headers:
        source: '/(.*).ico',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=31536000',
          },
        ],
      },
      {
        // This doesn't work for 'Cache-Control' key (works for others though):
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // Instead of this value:
            value: 'public, max-age=240, s-maxage=240, stale-while-revalidate=240',
            // Cache-Control response header is `public, max-age=60` in production
            // and `public, max-age=0, must-revalidate` in development
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

// async headers() {
//     return [
//       {
//         // This works, and returns appropriate Response headers:
//         source: '/(.*).png',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value:
//               'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
//           },
//         ],
//       },
//       {
//         // This works, and returns appropriate Response headers:
//         source: '/(.*).svg',
//         headers: [
//           {
//             key: 'Cache-Control',
//             value:
//               'public, max-age=240, s-maxage=240, stale-while-revalidate=240',
//           },
//         ],
//       },
//       {
//         // This doesn't work for 'Cache-Control' key (works for others though):
//         source: '/_next/image(.*)',
//         headers: [
//           {
//             key: 'Cache-Control',
//             // Instead of this value:
//             value: 'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
//             // Cache-Control response header is `public, max-age=60` in production
//             // and `public, max-age=0, must-revalidate` in development
//           },
//         ],
//       },
//     ]
//   },