import { NextResponse } from 'next/server'

// abundancia.life/whatsapp → the Abundancia | ARCA WhatsApp group.
// A route handler, not a next.config redirect: this Vercel project does not
// apply next.config redirects. 307 keeps it changeable if the invite rotates.
const WHATSAPP_GROUP =
  'https://chat.whatsapp.com/F8aoMpCrxCIKCxM0N68iQu?s=qt&p=i&mlu=4&ilr=4&iam=0'

export function GET() {
  return NextResponse.redirect(WHATSAPP_GROUP, 307)
}
