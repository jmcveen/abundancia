'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Leaf, Sprout, Home, TrendingUp, Handshake } from 'lucide-react'
import { useLeadPopup } from '@/hooks/useLeadPopup'

// ═══════════════════════════════════════════════════════════════════════════
// Interest Options
// ═══════════════════════════════════════════════════════════════════════════
const INTERESTS = [
  { id: 'buying', label: 'Buying a Home', icon: Home },
  { id: 'investing', label: 'Investing in the Project', icon: TrendingUp },
  { id: 'collaborating', label: 'Collaborating with the Project', icon: Handshake },
] as const

type InterestId = (typeof INTERESTS)[number]['id']

// ═══════════════════════════════════════════════════════════════════════════
// Interest Chip Component
// ═══════════════════════════════════════════════════════════════════════════
function InterestChip({
  interest,
  selected,
  onToggle,
}: {
  interest: (typeof INTERESTS)[number]
  selected: boolean
  onToggle: () => void
}) {
  const Icon = interest.icon
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.97 }}
      className={`
        flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-accent font-medium
        transition-all duration-200 cursor-pointer select-none
        ${selected
          ? 'bg-primary-50 border-primary-300 text-primary-800 shadow-glow-primary'
          : 'bg-canvas-subtle border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-canvas-muted'
        }
      `}
    >
      <Icon className={`w-4 h-4 flex-shrink-0 ${selected ? 'text-primary-600' : 'text-neutral-400'}`} />
      <span>{interest.label}</span>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
          <Sprout className="w-3.5 h-3.5 text-primary-500" />
        </motion.div>
      )}
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Popup Component
// ═══════════════════════════════════════════════════════════════════════════
export function LeadCapturePopup() {
  const { isVisible, dismiss } = useLeadPopup()
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState<Set<InterestId>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleInterest = useCallback((id: InterestId) => {
    setInterests(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          interests: Array.from(interests),
          source: window.location.pathname,
          capturedAt: new Date().toISOString(),
        }),
      })

      if (!res.ok) throw new Error('Submission failed')

      // Mark as captured (permanent)
      localStorage.setItem('abundancia_lead_captured', 'true')
      setIsSubmitted(true)

      // Auto-close after 3 seconds
      setTimeout(() => dismiss(), 3000)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDismiss = () => {
    // Mark as dismissed (expires in 7 days)
    const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000
    localStorage.setItem('abundancia_lead_dismissed', String(expiry))
    dismiss()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-primary-950/50 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden"
          >
            {/* Accent gradient line at top */}
            <div
              className="h-[3px] w-full"
              style={{
                background: 'linear-gradient(90deg, #C4956A 0%, #C9A227 50%, #1E4528 100%)',
              }}
            />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                /* ═══ FORM STATE ═══ */
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8"
                >
                  {/* Close button */}
                  <button
                    onClick={handleDismiss}
                    className="absolute top-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center
                               text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors z-10"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Header */}
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="pr-8">
                      <h3 className="font-display text-xl sm:text-2xl text-neutral-900 mb-1">
                        Join the Abundancia Community
                      </h3>
                      <p className="font-accent text-sm text-neutral-500 leading-relaxed">
                        Be the first to know about homes, investment opportunities, and community updates.
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name */}
                    <div>
                      <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Your first name"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl
                                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                                   text-sm font-accent placeholder:text-neutral-300
                                   bg-canvas-subtle hover:bg-white transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl
                                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                                   text-sm font-accent placeholder:text-neutral-300
                                   bg-canvas-subtle hover:bg-white transition-colors"
                      />
                    </div>

                    {/* Interests */}
                    <div>
                      <label className="font-accent text-sm font-semibold text-neutral-700 mb-2 block">
                        What interests you?{' '}
                        <span className="font-normal text-neutral-400">Select all that apply</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {INTERESTS.map((interest) => (
                          <InterestChip
                            key={interest.id}
                            interest={interest}
                            selected={interests.has(interest.id)}
                            onToggle={() => toggleInterest(interest.id)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Error */}
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-error-600 font-accent"
                      >
                        {error}
                      </motion.p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary btn-md rounded-xl w-full group disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Leaf className="w-4 h-4" />
                          </motion.div>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Sprout className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          Get Involved
                        </span>
                      )}
                    </button>

                    {/* Privacy note */}
                    <p className="text-xs text-neutral-400 text-center font-accent">
                      We respect your privacy. Unsubscribe anytime.
                    </p>
                  </form>
                </motion.div>
              ) : (
                /* ═══ THANK YOU STATE ═══ */
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="px-6 py-12 sm:px-8 sm:py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6"
                  >
                    <Leaf className="w-8 h-8 text-primary-600" />
                  </motion.div>
                  <h3 className="font-display text-2xl text-neutral-900 mb-2">
                    Welcome to the Journey
                  </h3>
                  <p className="font-accent text-sm text-neutral-500">
                    We&apos;ll be in touch with updates about Abundancia.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
