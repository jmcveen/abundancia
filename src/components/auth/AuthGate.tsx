'use client'

import { useState, type ReactNode } from 'react'
import { useAuth } from '@/lib/context/auth-context'
import { Shield, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export function AuthGate({ children }: { children: ReactNode }) {
  const { isAuthenticated, login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  if (isAuthenticated) return <>{children}</>

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    if (!password) {
      setError('Please enter the access password.')
      return
    }

    if (login(name.trim(), email.trim(), password)) {
      setError('')
    } else {
      setError('Invalid password. Please contact us for access credentials.')
      setPassword('')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-canvas px-6">
      <div className="max-w-md w-full">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="font-display text-2xl text-neutral-900 mb-2">
              Investor Access
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              This section contains confidential investment materials. Please sign in with your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                autoFocus
              />
            </div>

            <div>
              <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                Access Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 pr-12 text-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              className="btn-primary btn-lg rounded-xl w-full mt-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <Link
              href="/invest/apply"
              className="block font-accent text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              Don&apos;t have credentials? Request investor access &rarr;
            </Link>
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
