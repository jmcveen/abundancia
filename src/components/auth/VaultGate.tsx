'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { useVault } from '@/lib/context/vault-context'
import { Lock, ShieldAlert, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function VaultGate({ children }: { children: ReactNode }) {
  const { isUnlocked, attempts, isLockedOut, lockoutEnd, unlock } = useVault()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    if (!isLockedOut || !lockoutEnd) return

    const interval = setInterval(() => {
      const remaining = lockoutEnd - Date.now()
      if (remaining <= 0) {
        setCountdown('')
        return
      }
      const minutes = Math.floor(remaining / 60000)
      const seconds = Math.floor((remaining % 60000) / 1000)
      setCountdown(`${minutes}:${seconds.toString().padStart(2, '0')}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [isLockedOut, lockoutEnd])

  if (isUnlocked) return <>{children}</>

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (unlock(code)) {
      setError('')
    } else if (isLockedOut) {
      setError('Too many attempts. Please wait before trying again.')
    } else {
      setError(`Invalid code. ${3 - (attempts + 1)} attempts remaining.`)
      setCode('')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-canvas px-6">
      <div className="max-w-md w-full text-center">
        <div className="card p-8">
          {isLockedOut ? (
            <>
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6">
                <ShieldAlert className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="font-display text-2xl text-neutral-900 mb-3">
                Access Temporarily Locked
              </h2>
              <p className="text-neutral-600 mb-4">
                Too many incorrect attempts. Please try again in:
              </p>
              {countdown && (
                <div className="font-display text-4xl font-bold text-red-500 mb-6">
                  {countdown}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-primary-600" />
              </div>
              <h2 className="font-display text-2xl text-neutral-900 mb-3">
                Investor Access Required
              </h2>
              <p className="text-neutral-600 mb-6">
                This information is available to qualified investors. Enter your access code to continue.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 4-digit code"
                  className="w-full px-4 py-3 text-center text-2xl tracking-[0.5em] font-mono border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  autoFocus
                />

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={code.length < 4}
                  className="btn-primary btn-lg rounded-xl w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Unlock
                </button>
              </form>
            </>
          )}

          <div className="mt-6">
            <Link
              href="/invest/apply"
              className="font-accent text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              Don&apos;t have a code? Request investor access &rarr;
            </Link>
          </div>

          <div className="mt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1 font-accent text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
