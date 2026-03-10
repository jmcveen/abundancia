'use client'

import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

type TransitionMode = 'to-dark' | 'to-light'

interface InvestTransitionContextValue {
  isTransitioning: boolean
  transitionMode: TransitionMode
  triggerTransition: (href: string, mode?: TransitionMode) => void
}

const InvestTransitionContext = createContext<InvestTransitionContextValue | undefined>(undefined)

const NAVIGATE_DELAY_MS = 1200
const TOTAL_DURATION_MS = 2400

export function InvestTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionMode, setTransitionMode] = useState<TransitionMode>('to-light')
  const router = useRouter()
  const lockRef = useRef(false)

  const triggerTransition = useCallback(
    (href: string, mode: TransitionMode = 'to-light') => {
      if (lockRef.current) return
      lockRef.current = true
      setTransitionMode(mode)
      setIsTransitioning(true)

      setTimeout(() => {
        router.push(href)
      }, NAVIGATE_DELAY_MS)

      setTimeout(() => {
        setIsTransitioning(false)
        lockRef.current = false
      }, TOTAL_DURATION_MS)
    },
    [router],
  )

  return (
    <InvestTransitionContext.Provider value={{ isTransitioning, transitionMode, triggerTransition }}>
      {children}
    </InvestTransitionContext.Provider>
  )
}

export function useInvestTransition() {
  const context = useContext(InvestTransitionContext)
  if (context === undefined) {
    throw new Error('useInvestTransition must be used within an InvestTransitionProvider')
  }
  return context
}
