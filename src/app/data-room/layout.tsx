'use client'

import { AuthGate } from '@/components/auth/AuthGate'
import { VaultGate } from '@/components/auth/VaultGate'
import type { ReactNode } from 'react'

export default function DataRoomLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGate>
      <VaultGate>
        {children}
      </VaultGate>
    </AuthGate>
  )
}
