'use client'

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

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
  const pathname = usePathname()
  const lockRef = useRef(false)
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Hide loader once the new page has rendered
  useEffect(() => {
    if (!isTransitioning) return
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current)
    dismissTimerRef.current = setTimeout(() => {
      setIsTransitioning(false)
      lockRef.current = false
    }, 600)
    return () => {
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Intercept all internal link clicks automatically
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('http') ||
        href.startsWith('mailto') ||
        href.startsWith('tel') ||
        anchor.target === '_blank'
      ) return
      if (lockRef.current) return
      lockRef.current = true
      setIsTransitioning(true)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

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
