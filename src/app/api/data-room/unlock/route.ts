import { NextResponse, type NextRequest } from 'next/server'
import {
  DATA_ROOM_COOKIE,
  SESSION_TTL_MS,
  accessCode,
  issueToken,
} from '@/lib/data-room-session'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Best-effort per-instance throttle. Serverless instances are not shared, so
// this slows an attacker down rather than stopping them outright; the real
// protection is that the code never leaves the server.
const MAX_ATTEMPTS = 5
const WINDOW_MS = 10 * 60 * 1000
const attempts = new Map<string, { n: number; first: number }>()

function throttled(ip: string): boolean {
  const now = Date.now()
  const rec = attempts.get(ip)
  if (!rec || now - rec.first > WINDOW_MS) {
    attempts.set(ip, { n: 1, first: now })
    return false
  }
  rec.n += 1
  return rec.n > MAX_ATTEMPTS
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  if (throttled(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many attempts. Please try again later.' },
      { status: 429 },
    )
  }

  let code = ''
  try {
    code = String(((await req.json()) as { code?: unknown })?.code ?? '')
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400 })
  }

  if (code !== accessCode()) {
    return NextResponse.json(
      { ok: false, error: 'Invalid code.' },
      { status: 401 },
    )
  }

  attempts.delete(ip)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(DATA_ROOM_COOKIE, await issueToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  })
  return res
}
