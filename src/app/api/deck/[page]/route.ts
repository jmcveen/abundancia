import { NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { verifyDeckToken, DECK_COOKIE, DECK_PAGE_COUNT } from '@/lib/deck-token'

// Serves one gated deck slide. The underlying PDF is never exposed — only
// per-page images, and only to a viewer holding a valid signed cookie.
export async function GET(
  request: Request,
  { params }: { params: { page: string } }
) {
  const cookie = request.headers.get('cookie') || ''
  const token = cookie.split(';').map(c => c.trim()).find(c => c.startsWith(`${DECK_COOKIE}=`))?.split('=')[1]
  if (!verifyDeckToken(token)) {
    return NextResponse.json({ error: 'Access required' }, { status: 401 })
  }

  const n = parseInt(params.page, 10)
  if (!Number.isFinite(n) || n < 1 || n > DECK_PAGE_COUNT) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const file = join(process.cwd(), 'deck-slides', `slide-${String(n).padStart(2, '0')}.webp`)
    const buf = await readFile(file)
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'private, no-store',
        'Content-Disposition': 'inline',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
