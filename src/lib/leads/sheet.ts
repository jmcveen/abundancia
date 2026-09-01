// ═══════════════════════════════════════════════════════════════════════════
// Shared lead recorder — appends a row to the "Abundancia — Pop-Up Leads"
// Google Sheet (Drive > Marketing - Abundancia > Forms).
//
// Used by BOTH /api/leads (pop-up capture) and /api/deck/access (investment
// deck gate), so every lead lands in the same tracker regardless of source.
// ═══════════════════════════════════════════════════════════════════════════

const LEADS_SHEET_ID = process.env.LEADS_SHEET_ID || '1uEpihMIbkIW84rz2ZKeGJBuW5XLprGCoxu2b_4SevRw'

export interface LeadRow {
  id: string
  firstName: string
  email: string
  interests: string[]
  source: string
  capturedAt: string
}

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

export async function appendLeadToSheet(lead: LeadRow, tab = 'Abundancia Pop Up') {
  if (!LEADS_SHEET_ID) { console.warn('No LEADS_SHEET_ID configured'); return }
  const token = await getAccessToken()
  const ts = new Date(lead.capturedAt).toLocaleString('en-US', { timeZone: 'America/Chicago' })
  // Deck Leads tab has its own, simpler shape
  const row = tab === 'Deck Leads'
    ? [lead.firstName, lead.email, `${ts} CT`, lead.id, 'New', '']
    : [
        lead.firstName,
        lead.email,
        (lead.interests || []).join(', '),
        lead.source,
        `${ts} CT`,
        lead.id,
        'New',
        '',
      ]
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${LEADS_SHEET_ID}/values/${encodeURIComponent(tab)}!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [row] }),
    }
  )
  if (!res.ok) console.error('Leads sheet append error:', await res.text())
}


export interface ApplicationRow {
  id: string
  type: string
  firstName: string
  lastName: string
  email: string
  phone: string
  submittedAt: string
}

// Appends to the combined "Applications" tab of the shared leads tracker.
export async function appendApplicationToLeadsSheet(app: ApplicationRow) {
  if (!LEADS_SHEET_ID) return
  const token = await getAccessToken()
  const ts = new Date(app.submittedAt).toLocaleString('en-US', { timeZone: 'America/Chicago' })
  const label = app.type.charAt(0).toUpperCase() + app.type.slice(1)
  const row = [label, app.firstName, app.lastName, app.email, app.phone, `${ts} CT`, app.id, 'New', '']
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${LEADS_SHEET_ID}/values/${encodeURIComponent('Applications')}!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [row] }),
    }
  )
  if (!res.ok) console.error('Applications tab append error:', await res.text())
}
