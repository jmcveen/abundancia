// Shared email validation — used by both client forms and API routes.
// Pragmatic RFC-5322-lite: one @, a dotted domain with a 2+ char TLD, no spaces.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(email: unknown): boolean {
  if (typeof email !== 'string') return false
  const e = email.trim()
  if (e.length < 6 || e.length > 254) return false
  return EMAIL_RE.test(e)
}
