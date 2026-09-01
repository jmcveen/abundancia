import crypto from 'crypto'

const SECRET = process.env.DECK_SECRET || 'abundancia-deck-v1-fallback-secret'
const TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

export interface DeckSession {
  name: string
  email: string
  exp: number
}

export function signDeckToken(name: string, email: string): string {
  const payload: DeckSession = { name, email, exp: Date.now() + TTL_MS }
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = crypto.createHmac('sha256', SECRET).update(body).digest('base64url')
  return `${body}.${sig}`
}

export function verifyDeckToken(token: string | undefined): DeckSession | null {
  if (!token || !token.includes('.')) return null
  const [body, sig] = token.split('.')
  const expected = crypto.createHmac('sha256', SECRET).update(body).digest('base64url')
  const a = Buffer.from(sig || ''), b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null
  try {
    const s = JSON.parse(Buffer.from(body, 'base64url').toString()) as DeckSession
    return s.exp > Date.now() ? s : null
  } catch {
    return null
  }
}

export const DECK_COOKIE = 'abundancia_deck'
export const DECK_PAGE_COUNT = 24
