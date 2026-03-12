'use client'

import { AuthProvider } from '@/lib/context/auth-context'
import { VaultProvider } from '@/lib/context/vault-context'
import { ScenarioProvider } from '@/lib/context/scenario-context'
import { InvestTransitionProvider } from '@/lib/context/invest-transition-context'
import { InvestTransitionOverlay } from '@/components/layout/InvestTransitionOverlay'
import { LeadCapturePopup } from '@/components/lead-capture'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <VaultProvider>
        <ScenarioProvider>
          <InvestTransitionProvider>
            {children}
            <InvestTransitionOverlay />
            <LeadCapturePopup />
          </InvestTransitionProvider>
        </ScenarioProvider>
      </VaultProvider>
    </AuthProvider>
  )
}
