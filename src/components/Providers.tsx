'use client'

import { AuthProvider } from '@/lib/context/auth-context'
import { VaultProvider } from '@/lib/context/vault-context'
import { ScenarioProvider } from '@/lib/context/scenario-context'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <VaultProvider>
        <ScenarioProvider>
          {children}
        </ScenarioProvider>
      </VaultProvider>
    </AuthProvider>
  )
}
