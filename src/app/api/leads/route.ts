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

    // Send emails (best-effort — never block the response)
    try {
      await sendLeadNotification(lead)
    } catch (emailErr) {
      console.error('Lead internal notification failed:', emailErr)
    }
    try {
      await sendUserApplicationLinks(lead)
    } catch (emailErr) {
      console.error('Lead user email failed:', emailErr)
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

// ─── User email: application links based on interest selections ──────────────
async function sendUserApplicationLinks(lead: Lead) {
  const postmarkKey = process.env.POSTMARK_API_KEY
  if (!postmarkKey) {
    console.warn('POSTMARK_API_KEY not set — skipping user email')
    return
  }

  const LINKS: Record<string, { label: string; href: string }> = {
    buying: { label: 'Complete Your Homebuyer Application', href: 'https://abundancia.life/story/community/homebuyer' },
    investing: { label: 'Complete Your Investor Application', href: 'https://abundancia.life/invest/apply' },
    collaborating: { label: 'Complete Your Collaborator Application', href: 'https://abundancia.life/team/collaborate' },
  }

  const selectedLinks = lead.interests
    .filter(i => LINKS[i])
    .map(i => LINKS[i])

  if (selectedLinks.length === 0) return

  const linkButtons = selectedLinks.map(l =>
    `<a href="${l.href}" style="display:block;background:#1E4528;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:10px;font-weight:600;margin-bottom:10px;text-align:center">${l.label} →</a>`
  ).join('')

  const linkText = selectedLinks.map(l => `→ ${l.label}\n   ${l.href}`).join('\n\n')

  await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': postmarkKey,
    },
    body: JSON.stringify({
      From: process.env.POSTMARK_FROM_EMAIL || 'hello@abundancia.life',
      To: lead.email,
      Subject: `Welcome to the Abundancia community, ${lead.firstName} 🌿`,
      HtmlBody: `
        <div style="font-family:system-ui,sans-serif;max-width:500px;margin:0 auto;padding:24px">
          <div style="background:linear-gradient(90deg,#C4956A 0%,#C9A227 50%,#1E4528 100%);height:3px;border-radius:2px;margin-bottom:28px"></div>
          <h2 style="font-family:Georgia,serif;color:#1A2E0A;margin-bottom:8px">Welcome, ${lead.firstName}. 🌿</h2>
          <p style="color:#4a4540;line-height:1.7;margin-bottom:20px">
            Thank you for joining the Abundancia community. We're so glad you're here.
          </p>
          <p style="color:#4a4540;line-height:1.7;margin-bottom:20px">
            Based on your interests, here ${selectedLinks.length === 1 ? 'is your application link' : 'are your application links'}. Take your time — our team will also reach out within 2–3 business days.
          </p>
          <div style="margin-bottom:24px">${linkButtons}</div>
          <div style="background:#f7f4ef;border-radius:12px;padding:16px 20px;margin-bottom:24px">
            <p style="color:#1E4528;font-weight:600;margin:0 0 8px">While you explore:</p>
            <a href="https://abundancia.life/overview" style="color:#1E4528;display:block;margin-bottom:4px">→ Read the Executive Summary</a>
            <a href="https://abundancia.life/story/vision" style="color:#1E4528;display:block;margin-bottom:4px">→ Our Vision & Story</a>
            <a href="https://abundancia.life/team" style="color:#1E4528;display:block">→ Meet the Team</a>
          </div>
          <p style="color:#918b7e;font-size:13px;line-height:1.6">
            With gratitude,<br><strong style="color:#1A2E0A">The Abundancia Team</strong><br>
            New Earth Development · Austin, Texas
          </p>
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #E6DFD0;color:#b0a89a;font-size:12px">
            You're receiving this because you joined abundancia.life. Unsubscribe anytime by replying to this email.
          </div>
        </div>`,
      TextBody: [
        `Welcome, ${lead.firstName}.`,
        '',
        'Thank you for joining the Abundancia community.',
        '',
        'Here are your application links:',
        '',
        linkText,
        '',
        'Our team will also reach out within 2–3 business days.',
        '',
        'With gratitude,',
        'The Abundancia Team',
        'New Earth Development · Austin, Texas',
      ].join('\n'),
      MessageStream: 'outbound',
    }),
  })
}

// ─── Internal notification to Kelly + Joe ────────────────────────────────────
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
      To: process.env.LEADS_NOTIFICATION_EMAIL || 'kelly@newearthdevelopment.org, info@newearthdevelopment.org',
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
