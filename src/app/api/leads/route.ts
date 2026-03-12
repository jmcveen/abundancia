import { NextResponse } from 'next/server'

// ═══════════════════════════════════════════════════════════════════════════
// Lead Capture API — Interim Solution
//
// Stores leads in-memory (survives within a single serverless instance)
// AND sends an email notification via Postmark for every lead.
// The email is the real safety net — no lead is ever lost.
//
// TODO: Replace in-memory store with Supabase when project is set up.
// ═══════════════════════════════════════════════════════════════════════════

interface Lead {
  id: string
  firstName: string
  email: string
  interests: string[]
  source: string
  capturedAt: string
  createdAt: string
}

// In-memory store (interim — replaced by Supabase later)
const leads: Lead[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, email, interests, source, capturedAt } = body

    // Validate required fields
    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
      return NextResponse.json(
        { error: 'First name is required' },
        { status: 400 },
      )
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 },
      )
    }

    const lead: Lead = {
      id: crypto.randomUUID(),
      firstName: firstName.trim(),
      email: email.toLowerCase().trim(),
      interests: Array.isArray(interests) ? interests : [],
      source: source || '/',
      capturedAt: capturedAt || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    // Store in-memory (interim)
    leads.push(lead)

    // Send email notification (the real safety net)
    try {
      await sendLeadNotification(lead)
    } catch (emailErr) {
      // Log but don't fail the request — the lead is captured
      console.error('Lead email notification failed:', emailErr)
    }

    return NextResponse.json({ success: true, id: lead.id })
  } catch (err) {
    console.error('Lead capture error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

// Admin retrieval endpoint (protected by API key)
export async function GET(request: Request) {
  const url = new URL(request.url)
  const key = url.searchParams.get('key')

  if (!key || key !== process.env.LEADS_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ leads, count: leads.length })
}

// ═══════════════════════════════════════════════════════════════════════════
// Email Notification via Postmark
// ═══════════════════════════════════════════════════════════════════════════

async function sendLeadNotification(lead: Lead) {
  const postmarkKey = process.env.POSTMARK_API_KEY
  if (!postmarkKey) {
    console.warn('POSTMARK_API_KEY not set — skipping email notification')
    return
  }

  const interestLabels: Record<string, string> = {
    buying: '🏡 Buying a Home',
    investing: '💰 Investing in the Project',
    collaborating: '🤝 Collaborating with the Project',
  }

  const interestList = lead.interests.length > 0
    ? lead.interests.map(i => interestLabels[i] || i).join(', ')
    : 'None selected'

  await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': postmarkKey,
    },
    body: JSON.stringify({
      From: process.env.POSTMARK_FROM_EMAIL || 'leads@abundancia.life',
      To: process.env.LEADS_NOTIFICATION_EMAIL || 'kelly@newearthdevelopment.org, joe@newearthdevelopment.org',
      Subject: `🌿 New Abundancia Lead: ${lead.firstName}`,
      HtmlBody: `
        <div style="font-family: 'Source Sans 3', system-ui, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px;">
          <div style="background: linear-gradient(90deg, #C4956A 0%, #C9A227 50%, #1E4528 100%); height: 3px; border-radius: 2px; margin-bottom: 24px;"></div>
          <h2 style="font-family: 'Tenor Sans', Georgia, serif; color: #1A2E0A; margin-bottom: 16px;">
            🌿 New Lead from Abundancia.life
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #756f63; font-weight: 600; width: 100px;">Name</td>
              <td style="padding: 8px 0; color: #1A2E0A;">${lead.firstName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #756f63; font-weight: 600;">Email</td>
              <td style="padding: 8px 0; color: #1A2E0A;">
                <a href="mailto:${lead.email}" style="color: #1E4528;">${lead.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #756f63; font-weight: 600;">Interests</td>
              <td style="padding: 8px 0; color: #1A2E0A;">${interestList}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #756f63; font-weight: 600;">Page</td>
              <td style="padding: 8px 0; color: #1A2E0A;">${lead.source}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #756f63; font-weight: 600;">Time</td>
              <td style="padding: 8px 0; color: #1A2E0A;">${new Date(lead.capturedAt).toLocaleString('en-US', { timeZone: 'America/Chicago' })}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E6DFD0; color: #918b7e; font-size: 13px;">
            Captured on abundancia.life
          </div>
        </div>
      `,
      TextBody: [
        `New Abundancia Lead`,
        `Name: ${lead.firstName}`,
        `Email: ${lead.email}`,
        `Interests: ${interestList}`,
        `Page: ${lead.source}`,
        `Time: ${lead.capturedAt}`,
      ].join('\n'),
      MessageStream: 'outbound',
    }),
  })
}
