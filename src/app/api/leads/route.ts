import { NextResponse } from 'next/server'

// ═══════════════════════════════════════════════════════════════════════════
// Lead Capture API
//
// Stores every lead in THREE places for zero data loss:
//  1. Google Sheets  — live spreadsheet Kelly can view anytime
//  2. Supabase       — persistent database (set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)
//  3. Postmark email — notification to kelly@ + joe@ on every lead
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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, email, interests, source, capturedAt } = body

    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
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

    // Fire all three persistence methods in parallel — any failure is non-blocking
    const results = await Promise.allSettled([
      saveToGoogleSheets(lead),
      saveToSupabase(lead),
      sendLeadNotification(lead),
    ])

    results.forEach((r, i) => {
      const labels = ['Google Sheets', 'Supabase', 'Postmark email']
      if (r.status === 'rejected') {
        console.error(`Lead ${labels[i]} failed:`, r.reason)
      }
    })

    return NextResponse.json({ success: true, id: lead.id })
  } catch (err) {
    console.error('Lead capture error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. Google Sheets — Live lead tracker
// ═══════════════════════════════════════════════════════════════════════════

async function saveToGoogleSheets(lead: Lead) {
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  const sheetId = process.env.LEADS_GOOGLE_SHEET_ID

  if (!serviceAccountKey || !sheetId) {
    console.warn('Google Sheets not configured — skipping')
    return
  }

  // Get OAuth token via service account JWT
  const accessToken = await getGoogleAccessToken(serviceAccountKey)

  const interestLabels: Record<string, string> = {
    buying: 'Buying a Home',
    investing: 'Investing',
    collaborating: 'Collaborating',
  }
  const interestText = lead.interests.length > 0
    ? lead.interests.map(i => interestLabels[i] || i).join(', ')
    : 'None selected'

  const ctTime = new Date(lead.capturedAt).toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })

  const row = [
    lead.firstName,
    lead.email,
    interestText,
    lead.source,
    ctTime,
    lead.id,
    'New',
    '',
  ]

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Leads!A:H:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [row] }),
    }
  )
}

async function getGoogleAccessToken(serviceAccountKeyJson: string): Promise<string> {
  const key = JSON.parse(serviceAccountKeyJson)

  // Build JWT
  const header = { alg: 'RS256', typ: 'JWT' }
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString('base64url')

  const unsigned = `${encode(header)}.${encode(payload)}`

  // Sign with RSA private key using Web Crypto
  const pemKey = key.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\n/g, '')

  const binaryKey = Uint8Array.from(atob(pemKey), c => c.charCodeAt(0))
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8', binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['sign']
  )

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(unsigned)
  )

  const jwt = `${unsigned}.${Buffer.from(signature).toString('base64url')}`

  // Exchange JWT for access token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  })

  const tokenData = await tokenRes.json() as { access_token: string }
  return tokenData.access_token
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. Supabase — Persistent database
// ═══════════════════════════════════════════════════════════════════════════

async function saveToSupabase(lead: Lead) {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase not configured — skipping')
    return
  }

  await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({
      id: lead.id,
      first_name: lead.firstName,
      email: lead.email,
      interests: lead.interests,
      source: lead.source,
      captured_at: lead.capturedAt,
      created_at: lead.createdAt,
    }),
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. Postmark — Email notification
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

  const sheetId = process.env.LEADS_GOOGLE_SHEET_ID
  const sheetLink = sheetId
    ? `<a href="https://docs.google.com/spreadsheets/d/${sheetId}/edit" style="color:#1E4528;">View all leads →</a>`
    : ''

  await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': postmarkKey,
    },
    body: JSON.stringify({
      From: process.env.POSTMARK_FROM_EMAIL || 'leads@abundancia.life',
      To: process.env.LEADS_NOTIFICATION_EMAIL || 'kelly@newearthdevelopment.org',
      Subject: `🌿 New Abundancia Lead: ${lead.firstName}`,
      HtmlBody: `
        <div style="font-family:system-ui,sans-serif;max-width:500px;margin:0 auto;padding:24px;">
          <div style="background:linear-gradient(90deg,#C4956A,#C9A227,#1E4528);height:3px;border-radius:2px;margin-bottom:24px;"></div>
          <h2 style="color:#1A2E0A;margin-bottom:16px;">🌿 New Lead from Abundancia.life</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#756f63;font-weight:600;width:100px;">Name</td><td style="padding:8px 0;">${lead.firstName}</td></tr>
            <tr><td style="padding:8px 0;color:#756f63;font-weight:600;">Email</td><td style="padding:8px 0;"><a href="mailto:${lead.email}" style="color:#1E4528;">${lead.email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#756f63;font-weight:600;">Interests</td><td style="padding:8px 0;">${interestList}</td></tr>
            <tr><td style="padding:8px 0;color:#756f63;font-weight:600;">Page</td><td style="padding:8px 0;">${lead.source}</td></tr>
            <tr><td style="padding:8px 0;color:#756f63;font-weight:600;">Time</td><td style="padding:8px 0;">${new Date(lead.capturedAt).toLocaleString('en-US', { timeZone: 'America/Chicago' })}</td></tr>
          </table>
          <div style="margin-top:20px;">${sheetLink}</div>
          <div style="margin-top:16px;padding-top:16px;border-top:1px solid #E6DFD0;color:#918b7e;font-size:13px;">Captured on abundancia.life</div>
        </div>
      `,
      TextBody: `New Abundancia Lead\nName: ${lead.firstName}\nEmail: ${lead.email}\nInterests: ${interestList}\nPage: ${lead.source}\nTime: ${lead.capturedAt}`,
      MessageStream: 'outbound',
    }),
  })
}
