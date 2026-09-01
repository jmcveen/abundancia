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

export async function appendLeadToSheet(lead: LeadRow) {
  if (!LEADS_SHEET_ID) { console.warn('No LEADS_SHEET_ID configured'); return }
  const token = await getAccessToken()
  const ts = new Date(lead.capturedAt).toLocaleString('en-US', { timeZone: 'America/Chicago' })
  const row = [
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
    `https://sheets.googleapis.com/v4/spreadsheets/${LEADS_SHEET_ID}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [row] }),
    }
  )
  if (!res.ok) console.error('Leads sheet append error:', await res.text())
}
