/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure the gated deck slides are bundled with the deck API route on Vercel.
  outputFileTracingIncludes: {
    '/api/deck/[page]': ['./deck-slides/**'],
  },
}
module.exports = nextConfig
