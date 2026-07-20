import { NextResponse } from 'next/server'
import { isValidEmail } from '@/lib/utils'

// ═══════════════════════════════════════════════════════════════════════════
// Application Submissions API
//
// Handles all 3 form types:
//   homebuyer    → /story/community/homebuyer
//   investor     → /invest/apply
//   collaborator → /team/collaborate
//
// On every submission:
//  1. Appends a row to the matching Google Sheet (Drive > Abundancia > Marketing > Forms)
//  2. Sends internal notification to kelly@newearthdevelopment.org with all details
//  3. Sends a warm receipt email to the applicant
// ═══════════════════════════════════════════════════════════════════════════

type AppType = 'homebuyer' | 'investor' | 'collaborator'

interface Application {
  id: string
  type: AppType
  firstName: string
  lastName: string
  email: string
  phone: string
  data: Record<string, unknown>
  submittedAt: string
}

// In-memory safety net (replace with Supabase later if desired)
const applications: Application[] = []

const SHEET_IDS: Record<AppType, string> = {
  homebuyer:    process.env.HOMEBUYER_SHEET_ID    || '',
  investor:     process.env.INVESTOR_SHEET_ID     || '',
  collaborator: process.env.COLLABORATOR_SHEET_ID || '',
}

// ─── Access token cache ───────────────────────────────────────────────────────
let _accessToken = ''
let _tokenExpiry = 0

async function getAccessToken(): Promise<string> {
  if (_accessToken && Date.now() < _tokenExpiry - 30_000) return _accessToken
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id:     process.env.GOOGLE_CLIENT_ID     || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || '',
      grant_type:    'refresh_token',
    }),
  })
  const json = await res.json()
  _accessToken = json.access_token
  _tokenExpiry = Date.now() + (json.expires_in || 3600) * 1000
  return _accessToken
}

// ─── Google Sheets append ────────────────────────────────────────────────────
async function appendToSheet(type: AppType, row: string[]) {
  const sheetId = SHEET_IDS[type]
  if (!sheetId) { console.warn(`No sheet ID for type: ${type}`); return }
  const token = await getAccessToken()
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [row] }),
    }
  )
  if (!res.ok) {
    const err = await res.text()
    console.error('Sheets append error:', err)
  }
}

// ─── Row builders per form type ──────────────────────────────────────────────
function s(v: unknown): string { return Array.isArray(v) ? v.join(', ') : (v != null ? String(v) : '') }

function buildHomebuyerRow(app: Application): string[] {
  const d = app.data
  const ts = new Date(app.submittedAt).toLocaleString('en-US', { timeZone: 'America/Chicago' })
  return [
    ts, app.firstName, app.lastName, app.phone, app.email,
    s(d.currentLocation), s(d.whyLive), s(d.fullOrPartTime), s(d.monthsPerYear), s(d.austinExperience),
    s(d.lifestyleDesc), s(d.values), s(d.dreamCommunity), s(d.mustHaves), s(d.howContribute), s(d.dream),
    s(d.homeTypes), s(d.homeSize),
    s(d.purchaseRange), s(d.downPaymentRange), s(d.monthlyPayment), s(d.purchaseTimeline),
    s(d.questionsForTeam), s(d.socialLinks), s(d.anythingElse),
  ]
}

function buildInvestorRow(app: Application): string[] {
  const d = app.data
  const ts = new Date(app.submittedAt).toLocaleString('en-US', { timeZone: 'America/Chicago' })
  return [
    ts, app.firstName, app.lastName, app.phone, app.email,
    s(d.whyInterested), s(d.investmentTypes), s(d.pastExperience),
    s(d.accreditedStatus), s(d.investmentRange), s(d.timeline),
    s(d.livingInterest), s(d.austinExperience), s(d.questions), s(d.anything),
  ]
}

function buildCollaboratorRow(app: Application): string[] {
  const d = app.data
  const ts = new Date(app.submittedAt).toLocaleString('en-US', { timeZone: 'America/Chicago' })
  return [
    ts, app.firstName, app.lastName, app.phone, app.email,
    s(d.company), s(d.title), s(d.website), s(d.socialLinks), s(d.location),
    s(d.collabAreas), s(d.howContribute), s(d.skills),
    s(d.collabRole), s(d.hoursPerWeek), s(d.buildingCommunity), s(d.projectStage),
    s(d.whyCollab), s(d.successCriteria), s(d.anythingElse), s(d.dream),
  ]
}

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, firstName, lastName, email, phone, ...rest } = body

    if (!type || !['homebuyer', 'investor', 'collaborator'].includes(type)) {
      return NextResponse.json({ error: 'Invalid application type' }, { status: 400 })
    }
    if (!firstName?.trim()) return NextResponse.json({ error: 'First name is required' }, { status: 400 })
    if (!isValidEmail(email))   return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })

    const app: Application = {
      id: crypto.randomUUID(),
      type: type as AppType,
      firstName: firstName.trim(),
      lastName: (lastName || '').trim(),
      email: email.toLowerCase().trim(),
      phone: (phone || '').trim(),
      data: rest,
      submittedAt: new Date().toISOString(),
    }

    applications.push(app)

    // Build the row for the correct sheet
    const row =
      type === 'homebuyer'    ? buildHomebuyerRow(app) :
      type === 'investor'     ? buildInvestorRow(app)  :
                                buildCollaboratorRow(app)

    // Fire all side-effects concurrently, never block the response
    await Promise.allSettled([
      appendToSheet(type as AppType, row).catch(e => console.error('Sheet append failed:', e)),
      sendInternalNotification(app).catch(e => console.error('Internal email failed:', e)),
      sendUserReceipt(app).catch(e => console.error('User receipt failed:', e)),
    ])

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

// ─── Internal notification ───────────────────────────────────────────────────
async function sendInternalNotification(app: Application) {
  const postmarkKey = process.env.POSTMARK_API_KEY
  if (!postmarkKey) return

  const typeLabel: Record<AppType, string> = {
    homebuyer:    '🏡 Homebuyer',
    investor:     '💰 Investor',
    collaborator: '🤝 Collaborator',
  }

  const sheetLinks: Record<AppType, string> = {
    homebuyer:    `https://docs.google.com/spreadsheets/d/${SHEET_IDS.homebuyer}`,
    investor:     `https://docs.google.com/spreadsheets/d/${SHEET_IDS.investor}`,
    collaborator: `https://docs.google.com/spreadsheets/d/${SHEET_IDS.collaborator}`,
  }

  const dataRows = Object.entries({ ...app.data })
    .filter(([, v]) => v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => {
      const val = Array.isArray(v) ? v.join(', ') : String(v)
      const label = k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
      return `<tr>
        <td style="padding:6px 0;color:#756f63;font-weight:600;width:200px;vertical-align:top">${label}</td>
        <td style="padding:6px 0;color:#1A2E0A">${val}</td>
      </tr>`
    }).join('')

  await postmark({
    To: 'kelly@newearthdevelopment.org',
    Subject: `🌿 New ${typeLabel[app.type]} Application: ${app.firstName} ${app.lastName}`,
    HtmlBody: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <div style="background:linear-gradient(90deg,#C4956A 0%,#C9A227 50%,#1E4528 100%);height:3px;border-radius:2px;margin-bottom:24px"></div>
        <h2 style="font-family:Georgia,serif;color:#1A2E0A;margin-bottom:4px">🌿 New ${typeLabel[app.type]} Application</h2>
        <p style="color:#756f63;margin-bottom:8px">
          <strong>${app.firstName} ${app.lastName}</strong> ·
          <a href="mailto:${app.email}">${app.email}</a> ·
          ${app.phone || 'no phone'}
        </p>
        <p style="margin-bottom:20px">
          <a href="${sheetLinks[app.type]}" style="color:#1E4528;font-weight:600">View in Google Sheet →</a>
        </p>
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #E6DFD0">
          ${dataRows}
        </table>
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #E6DFD0;color:#918b7e;font-size:13px">
          Submitted ${new Date(app.submittedAt).toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT · abundancia.life
        </div>
      </div>`,
    TextBody: `New ${typeLabel[app.type]} Application\n${app.firstName} ${app.lastName}\n${app.email}\n${app.phone}\n\n${JSON.stringify(app.data, null, 2)}`,
  })
}

// ─── User receipt email ──────────────────────────────────────────────────────
function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

async function sendUserReceipt(app: Application) {
  const postmarkKey = process.env.POSTMARK_API_KEY
  if (!postmarkKey) return

  const typeLabel: Record<AppType, string> = {
    homebuyer: 'Homebuyer', investor: 'Investor', collaborator: 'Collaborator',
  }

  const d = app.data
  const val = (v: unknown): string => (Array.isArray(v) ? v.join(', ') : (v != null ? String(v) : '')).trim()

  // Pull a standout answer to reflect back (graceful fallbacks), trimmed + escaped
  const rawHighlight =
    app.type === 'homebuyer'    ? (val(d.whyLive) || val(d.dream) || val(d.values)) :
    app.type === 'investor'     ? (val(d.whyInterested) || val(d.livingInterest)) :
                                  (val(d.collabAreas) || val(d.howContribute) || val(d.skills))
  const hl = rawHighlight ? escapeHtml(rawHighlight.length > 240 ? rawHighlight.slice(0, 237) + '…' : rawHighlight) : ''

  // Greeting + personalized note per type (no timing promises)
  const greeting: Record<AppType, string> = {
    homebuyer:    `Thank you for applying to live at Abundancia, ${escapeHtml(app.firstName)}. 🌿`,
    collaborator: `Thank you for reaching out to collaborate, ${escapeHtml(app.firstName)}. 🌿`,
    investor:     `Thank you for your interest in Abundancia, ${escapeHtml(app.firstName)}. 🌿`,
  }

  const note: Record<AppType, string> = {
    homebuyer:
      `We read every application personally, and yours moved us.${hl ? ` You shared that you&apos;re drawn here to <em>&ldquo;${hl}&rdquo;</em> — and that is exactly the life Abundancia is being built to make possible.` : ''} ` +
      `We&apos;ll keep you updated along the way, and we&apos;ll reach out as we get close to lot and home sales so you&apos;re among the first to know.`,
    collaborator:
      `${hl ? `We loved learning about your interest in <em>&ldquo;${hl}&rdquo;</em> — the community is being built by people who bring exactly this kind of gift.` : `We&apos;re grateful you want to help build something regenerative.`} ` +
      `Our team will review your application and be in touch to explore how we might work together.`,
    investor:
      `It means a great deal that you&apos;re considering being part of this.${hl ? ` You shared that you&apos;re drawn to <em>&ldquo;${hl}&rdquo;</em> — that alignment is exactly what we hope for in our earliest partners.` : ''} ` +
      `The best next step is a short call with Kelly to answer your questions and walk you through the opportunity and investor materials.`,
  }

  // Investor-only booking CTA
  const bookingBlock = app.type === 'investor' ? `
        <div style="margin:8px 0 28px">
          <a href="https://zcal.co/kellykrezek/25min" style="display:inline-block;background:#1E4528;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:10px;font-weight:600">Book your 25-minute call with Kelly →</a>
        </div>` : ''

  // Full record of their answers, appended below the note
  const answerRows = Object.entries({ ...app.data })
    .filter(([, v]) => v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => {
      const label = escapeHtml(k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()))
      const value = escapeHtml(val(v))
      return `<tr>
        <td style="padding:8px 12px 8px 0;color:#756f63;font-weight:600;width:190px;vertical-align:top;border-top:1px solid #EFEADF">${label}</td>
        <td style="padding:8px 0;color:#1A2E0A;vertical-align:top;border-top:1px solid #EFEADF">${value}</td>
      </tr>`
    }).join('')

  const answersHtml = answerRows ? `
        <p style="color:#1E4528;font-weight:600;margin:28px 0 6px">Your application</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr>
            <td style="padding:8px 12px 8px 0;color:#756f63;font-weight:600;width:190px">Name</td>
            <td style="padding:8px 0;color:#1A2E0A">${escapeHtml(app.firstName)} ${escapeHtml(app.lastName)}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px 8px 0;color:#756f63;font-weight:600">Email</td>
            <td style="padding:8px 0;color:#1A2E0A">${escapeHtml(app.email)}</td>
          </tr>
          ${app.phone ? `<tr><td style="padding:8px 12px 8px 0;color:#756f63;font-weight:600">Phone</td><td style="padding:8px 0;color:#1A2E0A">${escapeHtml(app.phone)}</td></tr>` : ''}
          ${answerRows}
        </table>` : ''

  // Plain-text answers
  const answerText = Object.entries({ ...app.data })
    .filter(([, v]) => v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}: ${val(v)}`)
    .join('\n')
  const bookingText = app.type === 'investor' ? `\n\nBook your 25-minute call with Kelly: https://zcal.co/kellykrezek/25min` : ''
  const plainNote = note[app.type].replace(/<[^>]+>/g, '').replace(/&ldquo;|&rdquo;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&')

  await postmark({
    To: app.email,
    Subject: `Your Abundancia ${typeLabel[app.type]} application was received 🌿`,
    HtmlBody: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px">
        <div style="background:linear-gradient(90deg,#C4956A 0%,#C9A227 50%,#1E4528 100%);height:3px;border-radius:2px;margin-bottom:28px"></div>
        <h2 style="font-family:Georgia,serif;color:#1A2E0A;margin-bottom:8px">${greeting[app.type]}</h2>
        <p style="color:#4a4540;line-height:1.7;margin-bottom:24px">${note[app.type]}</p>
        ${bookingBlock}
        <div style="background:#f7f4ef;border-radius:12px;padding:16px 20px;margin-bottom:8px">
          <p style="color:#1E4528;font-weight:600;margin:0 0 4px">In the meantime, explore Abundancia:</p>
          <a href="https://abundancia.life/overview" style="color:#1E4528;display:block;margin-top:8px">→ Read the Executive Summary</a>
          <a href="https://abundancia.life/story/vision" style="color:#1E4528;display:block;margin-top:4px">→ Our Vision &amp; Story</a>
        </div>
        ${answersHtml}
        <p style="color:#918b7e;font-size:13px;line-height:1.6;margin-top:28px">
          With gratitude,<br><strong style="color:#1A2E0A">Kelly Krezek &amp; the Abundancia Team</strong><br>
          New Earth Development · Austin, Texas
        </p>
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #E6DFD0;color:#b0a89a;font-size:12px">
          You&apos;re receiving this because you applied at abundancia.life.
        </div>
      </div>`,
    TextBody: `${greeting[app.type].replace(' 🌿','')}\n\n${plainNote}${bookingText}\n\n— Your application —\nName: ${app.firstName} ${app.lastName}\nEmail: ${app.email}${app.phone ? `\nPhone: ${app.phone}` : ''}\n${answerText}\n\nWith gratitude,\nKelly Krezek & the Abundancia Team\nNew Earth Development · Austin, Texas`,
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
