'use client'

import { useState } from 'react'
import { Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function UnlockForm({ from }: { from: string }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/data-room/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      if (res.ok) {
        // Full navigation so middleware re-evaluates with the new cookie.
        window.location.href = from
        return
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      setError(data.error || 'Invalid code.')
      setCode('')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-canvas px-6">
      <div className="max-w-md w-full text-center">
        <div className="card p-8">
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
              type="password"
              inputMode="numeric"
              autoComplete="off"
              maxLength={64}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter access code"
              className="w-full px-4 py-3 text-center text-2xl tracking-[0.35em] font-mono border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              autoFocus
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={busy || code.length < 4}
              className="btn-primary btn-lg rounded-xl w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busy ? 'Checking…' : 'Unlock'}
            </button>
          </form>

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
