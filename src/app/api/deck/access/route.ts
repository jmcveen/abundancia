import { NextResponse } from 'next/server'
import { isValidEmail } from '@/lib/utils'
import { signDeckToken, DECK_COOKIE } from '@/lib/deck-token'
import { appendLeadToSheet } from '@/lib/leads/sheet'

// ═══════════════════════════════════════════════════════════════════════════
// Investment Deck — access gate
// Captures name + email, records the viewer in the SAME leads tracker as every
// other lead (tagged "Investment Deck Viewer"), then issues a signed, 24-hour
// httpOnly cookie that authorises /api/deck/[page] to serve the slides.
// ═══════════════════════════════════════════════════════════════════════════

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = (body.name || '').trim()
    const email = (body.email || '').trim().toLowerCase()

    if (typeof body._hp === 'string' && body._hp.trim() !== '') {
      return NextResponse.json({ ok: true }, { status: 200 })
    }
    if (!name) return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 })
    if (!isValidEmail(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })

    try {
      await appendLeadToSheet({
        id: crypto.randomUUID(),
        firstName: name,
        email,
        interests: ['Investment Deck Viewer'],
        source: 'investment-deck-gate',
        capturedAt: new Date().toISOString(),
      }, 'Deck Leads')
    } catch (e) {
      console.error('deck lead capture failed (access still granted):', e)
    }

    const res = NextResponse.json({ ok: true, name, email })
    res.cookies.set(DECK_COOKIE, signDeckToken(name, email), {
      httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24,
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
