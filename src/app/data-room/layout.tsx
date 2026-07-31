'use client'

import { VaultGate } from '@/components/auth/VaultGate'
import type { ReactNode } from 'react'

export default function DataRoomLayout({ children }: { children: ReactNode }) {
  // Single unlock code for the investor data room (VaultGate = 7777).
  // The prior AuthGate layer (password / admin PIN) was removed so investors
  // enter one code, not two.
  return <VaultGate>{children}</VaultGate>
}
