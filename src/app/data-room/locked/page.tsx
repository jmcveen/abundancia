import type { Metadata } from 'next'
import { UnlockForm } from './UnlockForm'

export const metadata: Metadata = {
  title: 'Abundancia — Investor Access',
  robots: { index: false, follow: false },
}

/**
 * `from` is supplied by the middleware rewrite. Reading it here (server side)
 * rather than with useSearchParams keeps the whole card server-rendered —
 * useSearchParams would force this subtree to bail out to client-only
 * rendering and the visitor would see a blank panel until hydration.
 */
export default function DataRoomLockedPage({
  searchParams,
}: {
  searchParams?: { from?: string }
}) {
  const raw = searchParams?.from
  // Only ever redirect back to an internal data-room path.
  const from =
    raw && raw.startsWith('/data-room') && !raw.startsWith('//')
      ? raw
      : '/data-room'
  return <UnlockForm from={from} />
}
