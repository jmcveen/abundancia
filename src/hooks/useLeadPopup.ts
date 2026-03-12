'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'

const TIMER_DELAY_MS = 10_000 // 10 seconds

function isAlreadyCaptured(): boolean {
  if (typeof window === 'undefined') return true
  return localStorage.getItem('abundancia_lead_captured') === 'true'
}

function isRecentlyDismissed(): boolean {
  if (typeof window === 'undefined') return true
  const expiry = localStorage.getItem('abundancia_lead_dismissed')
  if (!expiry) return false
  return Date.now() < Number(expiry)
}

function shouldSuppress(): boolean {
  return isAlreadyCaptured() || isRecentlyDismissed()
}

export function useLeadPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const hasTriggeredRef = useRef(false)
  const pathname = usePathname()
  const initialPathRef = useRef<string | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Track the initial landing page
  useEffect(() => {
    if (initialPathRef.current === null) {
      initialPathRef.current = pathname
    }
  }, [pathname])

  const show = useCallback(() => {
    if (shouldSuppress() || hasTriggeredRef.current) return
    hasTriggeredRef.current = true
    setIsVisible(true)
  }, [])

  const dismiss = useCallback(() => {
    setIsVisible(false)
  }, [])

  // ─── Trigger 1: 10-second timer on landing page ───
  useEffect(() => {
    if (shouldSuppress() || hasTriggeredRef.current) return

    timerRef.current = setTimeout(() => {
      show()
    }, TIMER_DELAY_MS)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [show])

  // ─── Trigger 2: Navigation to a different page ───
  useEffect(() => {
    if (shouldSuppress() || hasTriggeredRef.current) return
    if (initialPathRef.current === null) return

    // If pathname changed from the initial landing page, trigger
    if (pathname !== initialPathRef.current) {
      if (timerRef.current) clearTimeout(timerRef.current)
      show()
    }
  }, [pathname, show])

  // ─── Trigger 3: Exit intent (mouse leaves viewport top) ───
  useEffect(() => {
    if (shouldSuppress() || hasTriggeredRef.current) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        show()
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [show])

  return { isVisible, dismiss }
}
