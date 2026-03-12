import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
export const alt = 'Abundancia Austin — Regenerative Living in Harmony with Nature'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const [bgData, logoData] = await Promise.all([
    readFile(path.join(process.cwd(), 'public/images/og-image.png')),
    readFile(path.join(process.cwd(), 'public/Abundancia Logo - words.png')),
  ])

  const bgBase64 = `data:image/png;base64,${bgData.toString('base64')}`
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background image */}
        <img
          src={bgBase64}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.45)',
          }}
        />

        {/* Logo */}
        <img
          src={logoBase64}
          style={{
            position: 'relative',
            width: 320,
            height: 'auto',
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
