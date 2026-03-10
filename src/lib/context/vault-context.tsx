'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

const VAULT_CODE = '7777'
const MAX_ATTEMPTS = 3
const LOCKOUT_DURATION = 5 * 60 * 1000 // 5 minutes

interface VaultContextValue {
  isUnlocked: boolean
  attempts: number
  isLockedOut: boolean
  lockoutEnd: number | null
  unlock: (code: string) => boolean
}

const VaultContext = createContext<VaultContextValue>({
  isUnlocked: false,
  attempts: 0,
  isLockedOut: false,
  lockoutEnd: null,
  unlock: () => false,
})

export function VaultProvider({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem('vault_unlocked') === 'true'
  })
  const [attempts, setAttempts] = useState(0)
  const [lockoutEnd, setLockoutEnd] = useState<number | null>(() => {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem('vault_lockout_end')
    if (stored) {
      const end = parseInt(stored, 10)
      return end > Date.now() ? end : null
    }
    return null
  })

  const isLockedOut = lockoutEnd !== null && lockoutEnd > Date.now()

  const unlock = useCallback((code: string): boolean => {
    if (isLockedOut) return false

    if (code === VAULT_CODE) {
      setIsUnlocked(true)
      setAttempts(0)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('vault_unlocked', 'true')
      }
      return true
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (newAttempts >= MAX_ATTEMPTS) {
      const end = Date.now() + LOCKOUT_DURATION
      setLockoutEnd(end)
      if (typeof window !== 'undefined') {
        localStorage.setItem('vault_lockout_end', end.toString())
      }
    }

    return false
  }, [attempts, isLockedOut])

  return (
    <VaultContext.Provider value={{ isUnlocked, attempts, isLockedOut, lockoutEnd, unlock }}>
      {children}
    </VaultContext.Provider>
  )
}

export function useVault() {
  return useContext(VaultContext)
}
