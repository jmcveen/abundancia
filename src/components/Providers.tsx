'use client'

import { VaultProvider } from '@/lib/context/vault-context'
import { ScenarioProvider } from '@/lib/context/scenario-context'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <VaultProvider>
      <ScenarioProvider>
        {children}
      </ScenarioProvider>
    </VaultProvider>
  )
}
