'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

const AUTH_PASSWORD = 'SXSW2026'

interface AuthUser {
  name: string
  email: string
}

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (name: string, email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === 'undefined') return null
    const stored = sessionStorage.getItem('auth_user')
    return stored ? JSON.parse(stored) : null
  })

  const isAuthenticated = user !== null

  const login = useCallback((name: string, email: string, password: string): boolean => {
    if (password !== AUTH_PASSWORD) return false

    const authUser = { name, email }
    setUser(authUser)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('auth_user', JSON.stringify(authUser))
    }
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('auth_user')
      sessionStorage.removeItem('vault_unlocked')
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
