'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/animation'
import { CheckCircle2, Leaf } from 'lucide-react'

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Submit to Google Sheet via Apps Script webhook
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-canvas px-6">
        <FadeIn>
          <div className="max-w-md text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="font-display text-3xl text-neutral-900 mb-3">
              You&apos;re on the List
            </h2>
            <p className="text-neutral-600 mb-6">
              Thank you for your interest in Abundancia. We&apos;ll be in touch with updates on the community, availability, and next steps.
            </p>
            <a href="/" className="btn-primary btn-md rounded-xl">
              Back to Home
            </a>
          </div>
        </FadeIn>
      </div>
    )
  }

  return (
    <div>
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-6">
                  <Leaf className="w-4 h-4 text-primary-600" />
                  <span className="font-accent text-sm text-primary-700">Resident Waitlist</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                  Join the Waitlist
                </h1>
                <p className="text-lg text-neutral-600">
                  Be among the first to know about availability, pricing, and community updates.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                    I&apos;m interested in... *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-neutral-700"
                  >
                    <option value="">Select an option</option>
                    <option value="home">Purchasing a Home</option>
                    <option value="rental">Renting</option>
                    <option value="retreat">Retreat Visit</option>
                    <option value="membership">Membership</option>
                    <option value="exploring">Just Exploring</option>
                  </select>
                </div>

                <div>
                  <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                    How did you hear about us?
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="e.g., SXSW, social media, referral..."
                  />
                </div>

                <div>
                  <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                    Message (optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none"
                    placeholder="Tell us about your interest..."
                  />
                </div>

                <button type="submit" className="btn-primary btn-lg rounded-xl w-full">
                  Join the Waitlist
                </button>

                <p className="text-xs text-neutral-400 text-center">
                  By submitting, you agree to receive updates from Abundancia Austin. We respect your privacy.
                </p>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
