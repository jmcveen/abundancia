import type { ReactNode } from 'react'

/**
 * Access to everything under /data-room is enforced in `src/middleware.ts`,
 * which verifies a signed httpOnly cookie BEFORE any document HTML is served.
 *
 * The previous client-side <VaultGate> wrapper was removed deliberately: it
 * rendered the documents into the payload and only hid them visually, so the
 * full text of every document was retrievable with `curl` and no access code.
 */
export default function DataRoomLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
