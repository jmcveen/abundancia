/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/story/community/live',
        destination: '/story/community/homebuyer',
        permanent: true,
      },
      {
        source: '/whatsapp',
        destination:
          'https://chat.whatsapp.com/F8aoMpCrxCIKCxM0N68iQu?s=qt&p=i&mlu=4&ilr=4&iam=0',
        permanent: false,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
