import { NextResponse, type NextRequest } from 'next/server'
import { DATA_ROOM_COOKIE, verifyToken } from '@/lib/data-room-session'

/**
 * Server-side gate for the investor data room.
 *
 * Before this existed the gate was a client component: the document markdown
 * was rendered into the page payload and merely HIDDEN in the browser, so
 * `curl` returned the full text of every document without a code. This runs
 * before any data-room HTML is served, so unauthenticated requests never
 * receive document content at all.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // The lock screen itself must stay reachable, or there is no way in.
  if (pathname === '/data-room/locked') return NextResponse.next()

  const ok = await verifyToken(req.cookies.get(DATA_ROOM_COOKIE)?.value)
  if (ok) return NextResponse.next()

  // Rewrite (not redirect) so the URL is preserved — unlocking returns the
  // visitor to the document they asked for instead of dumping them at an index.
  const url = req.nextUrl.clone()
  url.pathname = '/data-room/locked'
  url.searchParams.set('from', pathname)
  const res = NextResponse.rewrite(url)
  res.headers.set('x-robots-tag', 'noindex, nofollow')
  return res
}

export const config = {
  matcher: ['/data-room', '/data-room/:path*'],
}
