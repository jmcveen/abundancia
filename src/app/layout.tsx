import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header, Footer } from '@/components/layout'
import { Providers } from '@/components/Providers'

export const viewport: Viewport = {
  themeColor: '#1E4528',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: {
    default: 'Abundancia Austin — Regenerative Living in Harmony with Nature',
    template: '%s | Abundancia Austin',
  },
  description: 'A 376-acre regenerative community in Cedar Creek, TX. Hempcrete homes, food forests, renewable energy, sacred spaces. $12.5M investment opportunity.',
  keywords: [
    'regenerative community',
    'Austin Texas',
    'hempcrete homes',
    'sustainable living',
    'regenerative development',
    'eco community',
    'permaculture',
    'Living Building Challenge',
    'Cedar Creek',
    'Bastrop County',
  ],
  metadataBase: new URL('https://abundancia.life'),
  applicationName: 'Abundancia Austin',
  openGraph: {
    title: 'Abundancia Austin — Regenerative Living in Harmony with Nature',
    description: 'A 376-acre regenerative community proving that profitable development and ecological regeneration amplify each other. $12.5M investment opportunity.',
    siteName: 'Abundancia Austin',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abundancia Austin — Regenerative Living in Harmony with Nature',
    description: 'A 376-acre regenerative community proving that profitable development and ecological regeneration amplify each other.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1 pt-24">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
