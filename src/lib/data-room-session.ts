/**
 * Data-room session token — signed server-side, verified in middleware.
 *
 * Runs in BOTH the edge runtime (middleware) and node (route handler), so it
 * uses Web Crypto only — no `node:crypto`, no Buffer.
 *
 * The token carries nothing but an expiry. It is not a bearer of identity; it
 * is proof that the access code was presented to the server at some point
 * inside the session window.
 */

const ENC = new TextEncoder()

export const DATA_ROOM_COOKIE = 'dr_session'
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000 // 12 hours

/** The access code. Set DATA_ROOM_ACCESS_CODE in the environment. */
export function accessCode(): string {
  return process.env.DATA_ROOM_ACCESS_CODE || '7777'
}

/**
 * Signing key. Prefer an explicit secret; otherwise derive from the access
 * code so the key is at least as secret as the code itself. Never a constant
 * literal — this repo is public.
 */
function signingSecret(): string {
  return (
    process.env.DATA_ROOM_SESSION_SECRET ||
    `abundancia-dr:${accessCode()}`
  )
}

function b64url(bytes: Uint8Array): string {
  let s = ''
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i])
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function sign(msg: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    ENC.encode(signingSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, ENC.encode(msg))
  return b64url(new Uint8Array(sig))
}

/** Length-independent comparison. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function issueToken(now = Date.now()): Promise<string> {
  const exp = now + SESSION_TTL_MS
  return `${exp}.${await sign(String(exp))}`
}

export async function verifyToken(
  token: string | undefined,
  now = Date.now(),
): Promise<boolean> {
  if (!token) return false
  const dot = token.indexOf('.')
  if (dot < 1) return false
  const exp = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  if (!/^\d+$/.test(exp)) return false
  if (Number(exp) <= now) return false
  return safeEqual(sig, await sign(exp))
}
