'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight, FileText, Loader2 } from 'lucide-react'
import { isValidEmail } from '@/lib/utils'

const PAGES = 24

export function DeckGate({
  label = 'View the Investment Deck',
  variant = 'primary',
}: {
  label?: string
  variant?: 'primary' | 'ghost'
}) {
  const [open, setOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [viewer, setViewer] = useState<{ name: string; email: string } | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [mounted, setMounted] = useState(false)
  const hp = useRef<HTMLInputElement>(null)

  useEffect(() => setMounted(true), [])

  const submit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name.trim()) { setError('Please enter your full name.'); return }
    if (!isValidEmail(email)) { setError('Please enter a valid email address.'); return }
    setBusy(true)
    try {
      const res = await fetch('/api/deck/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), _hp: hp.current?.value || '' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setViewer({ name: name.trim(), email: email.trim() })
      setUnlocked(true)
      setPage(1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }, [name, email])

  useEffect(() => {
    if (!open || !unlocked) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setPage(p => Math.min(PAGES, p + 1))
      if (e.key === 'ArrowLeft') setPage(p => Math.max(1, p - 1))
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, unlocked])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const btnCls =
    variant === 'primary'
      ? 'inline-flex items-center gap-2 rounded-full bg-primary-700 px-7 py-3.5 font-accent text-sm uppercase tracking-wide text-white shadow-lg transition-all hover:bg-primary-800 hover:shadow-xl'
      : 'inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-3.5 font-accent text-sm uppercase tracking-wide text-white transition-all hover:border-white hover:bg-white/10'

  const stamp = viewer ? `${viewer.name} · ${viewer.email} · ${new Date().toLocaleDateString()}` : ''

  const modal = !open ? null : (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-6">
      <button
        onClick={() => setOpen(false)}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      {!unlocked ? (
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50">
              <FileText className="h-7 w-7 text-primary-600" />
            </div>
            <h3 className="font-display text-2xl text-neutral-900">Investment Deck</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Enter your full name and email to view the Abundancia investment deck.
            </p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <input
              ref={hp} type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true"
              className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0"
            />
            <div>
              <label className="mb-1.5 block font-accent text-xs uppercase tracking-wide text-neutral-600">Full Name</label>
              <input
                type="text" required value={name} onChange={e => setName(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-[15px] outline-none transition-colors focus:border-primary-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-accent text-xs uppercase tracking-wide text-neutral-600">Email</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-[15px] outline-none transition-colors focus:border-primary-500"
                placeholder="your@email.com"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit" disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-700 py-3.5 font-accent text-sm uppercase tracking-wide text-white transition-colors hover:bg-primary-800 disabled:opacity-60"
            >
              {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Opening&hellip;</> : 'View the Deck'}
            </button>
            <p className="pt-1 text-center text-xs leading-relaxed text-neutral-500">
              For viewing only. Please do not redistribute.
            </p>
          </form>
        </div>
      ) : (
        <div className="flex h-full w-full max-w-6xl flex-col items-center justify-center">
          <div
            className="relative w-full select-none overflow-hidden rounded-lg bg-black shadow-2xl"
            onContextMenu={e => e.preventDefault()}
            style={{ aspectRatio: '1500 / 844' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/deck/${page}`}
              alt={`Slide ${page}`}
              draggable={false}
              className="pointer-events-none h-full w-full object-contain"
            />
            {/* Per-viewer watermark — deliberately faint and small */}
            <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-2">
              <span className="font-mono text-[7px] leading-none text-white/25 mix-blend-difference">
                {stamp}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-6 text-white">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white/20 disabled:opacity-30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="font-accent text-sm tabular-nums tracking-wide">{page} / {PAGES}</span>
            <button
              onClick={() => setPage(p => Math.min(PAGES, p + 1))}
              disabled={page === PAGES}
              className="rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white/20 disabled:opacity-30"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      <button onClick={() => setOpen(true)} className={btnCls}>
        <FileText className="h-4 w-4" />
        {label}
      </button>
      {mounted && createPortal(modal, document.body)}
    </>
  )
}
