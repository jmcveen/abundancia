import { NextResponse } from 'next/server'

// ═══════════════════════════════════════════════════════════════════════════
// Application Submissions API
//
// Handles form submissions from all 3 application pages:
//   resident   → /story/community/live
//   investor   → /invest/apply
//   collaborator → /team/collaborate
//
// On submit:
//  1. Validates required fields
//  2. Stores in-memory (replace with Supabase later)
//  3. Sends internal notification to Kelly + Joe
//  4. Sends user confirmation / receipt email
// ═══════════════════════════════════════════════════════════════════════════

interface Application {
  id: string
  type: 'resident' | 'investor' | 'collaborator'
  firstName: string
  lastName: string
  email: string
  phone: string
  data: Record<string, unknown>
  submittedAt: string
}

const applications: Application[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, firstName, lastName, email, phone, ...rest } = body

    if (!type || !['resident', 'investor', 'collaborator'].includes(type)) {
      return NextResponse.json({ error: 'Invalid application type' }, { status: 400 })
    }
    if (!firstName?.trim()) return NextResponse.json({ error: 'First name is required' }, { status: 400 })
    if (!email?.includes('@')) return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })

    const app: Application = {
      id: crypto.randomUUID(),
      type,
      firstName: firstName.trim(),
      lastName: (lastName || '').trim(),
      email: email.toLowerCase().trim(),
      phone: (phone || '').trim(),
      data: rest,
      submittedAt: new Date().toISOString(),
    }

    applications.push(app)

    // Send emails (best-effort — never block form submission)
    try { await sendInternalNotification(app) } catch (e) { console.error('Internal notification failed:', e) }
    try { await sendUserReceipt(app) } catch (e) { console.error('User receipt email failed:', e) }

    return NextResponse.json({ success: true, id: app.id })
  } catch (err) {
    console.error('Application submit error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const key = url.searchParams.get('key')
  if (!key || key !== process.env.LEADS_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json({ applications, count: applications.length })
}

// ─── Internal notification to Kelly + Joe ───────────────────────────────────
async function sendInternalNotification(app: Application) {
  const postmarkKey = process.env.POSTMARK_API_KEY
  if (!postmarkKey) return

  const typeLabel = { resident: '🏡 Resident / Homebuyer', investor: '💰 Investor', collaborator: '🤝 Collaborator' }[app.type]
  const dataRows = Object.entries(app.data)
    .filter(([, v]) => v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => {
      const val = Array.isArray(v) ? v.join(', ') : String(v)
      const label = k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
      return `<tr><td style="padding:6px 0;color:#756f63;font-weight:600;width:180px;vertical-align:top">${label}</td><td style="padding:6px 0;color:#1A2E0A">${val}</td></tr>`
    }).join('')

  await postmark({
    To: process.env.LEADS_NOTIFICATION_EMAIL || 'kelly@newearthdevelopment.org, joe@newearthdevelopment.org',
    Subject: `🌿 New ${typeLabel} Application: ${app.firstName} ${app.lastName}`,
    HtmlBody: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <div style="background:linear-gradient(90deg,#C4956A 0%,#C9A227 50%,#1E4528 100%);height:3px;border-radius:2px;margin-bottom:24px"></div>
        <h2 style="font-family:Georgia,serif;color:#1A2E0A;margin-bottom:4px">🌿 New ${typeLabel} Application</h2>
        <p style="color:#756f63;margin-bottom:20px">${app.firstName} ${app.lastName} · <a href="mailto:${app.email}">${app.email}</a> · ${app.phone || 'no phone'}</p>
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #E6DFD0;padding-top:16px">
          ${dataRows}
        </table>
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #E6DFD0;color:#918b7e;font-size:13px">
          Submitted ${new Date(app.submittedAt).toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT · abundancia.life
        </div>
      </div>`,
    TextBody: `New ${typeLabel} Application\n${app.firstName} ${app.lastName}\n${app.email}\n${app.phone}\n\n${JSON.stringify(app.data, null, 2)}`,
  })
}

// ─── User receipt email ──────────────────────────────────────────────────────
async function sendUserReceipt(app: Application) {
  const postmarkKey = process.env.POSTMARK_API_KEY
  if (!postmarkKey) return

  const nextSteps: Record<Application['type'], string> = {
    resident: 'Our community team will review your application and reach out within 2–3 business days to share more about homes, pricing, and life at Abundancia.',
    investor: 'Our capital markets team will review your application and be in touch within 48 hours to answer questions and share the investor materials.',
    collaborator: 'Our team will review your application and reach out within 2–3 business days to explore how we might work together.',
  }

  const typeLabel: Record<Application['type'], string> = {
    resident: 'Resident / Homebuyer',
    investor: 'Investor',
    collaborator: 'Collaborator',
  }

  await postmark({
    To: app.email,
    Subject: `Your Abundancia ${typeLabel[app.type]} application was received 🌿`,
    HtmlBody: `
      <div style="font-family:system-ui,sans-serif;max-width:500px;margin:0 auto;padding:24px">
        <div style="background:linear-gradient(90deg,#C4956A 0%,#C9A227 50%,#1E4528 100%);height:3px;border-radius:2px;margin-bottom:28px"></div>
        <h2 style="font-family:Georgia,serif;color:#1A2E0A;margin-bottom:8px">Thank you, ${app.firstName}. 🌿</h2>
        <p style="color:#4a4540;line-height:1.7;margin-bottom:16px">
          We received your ${typeLabel[app.type]} application and we're excited to connect with you.
        </p>
        <p style="color:#4a4540;line-height:1.7;margin-bottom:24px">${nextSteps[app.type]}</p>
        <div style="background:#f7f4ef;border-radius:12px;padding:16px 20px;margin-bottom:24px">
          <p style="color:#1E4528;font-weight:600;margin:0 0 4px">In the meantime, explore Abundancia:</p>
          <a href="https://abundancia.life/overview" style="color:#1E4528;display:block;margin-top:8px">→ Read the Executive Summary</a>
          <a href="https://abundancia.life/story/vision" style="color:#1E4528;display:block;margin-top:4px">→ Our Vision & Story</a>
        </div>
        <p style="color:#918b7e;font-size:13px;line-height:1.6">
          With gratitude,<br><strong style="color:#1A2E0A">The Abundancia Team</strong><br>
          New Earth Development · Austin, Texas
        </p>
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #E6DFD0;color:#b0a89a;font-size:12px">
          You're receiving this because you applied at abundancia.life.
        </div>
      </div>`,
    TextBody: `Thank you, ${app.firstName}.\n\nWe received your ${typeLabel[app.type]} application.\n\n${nextSteps[app.type]}\n\nWith gratitude,\nThe Abundancia Team`,
  })
}

// ─── Postmark helper ─────────────────────────────────────────────────────────
async function postmark(payload: { To: string; Subject: string; HtmlBody: string; TextBody: string }) {
  await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': process.env.POSTMARK_API_KEY!,
    },
    body: JSON.stringify({
      From: process.env.POSTMARK_FROM_EMAIL || 'hello@abundancia.life',
      MessageStream: 'outbound',
      ...payload,
    }),
  })
}
