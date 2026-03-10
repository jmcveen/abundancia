'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/animation'
import { useScenario } from '@/lib/context/scenario-context'
import { KEY_METRICS } from '@/lib/data/financials'
import { CheckCircle2, TrendingUp } from 'lucide-react'

export default function InvestorApplyPage() {
  const { scenario } = useScenario()
  const metrics = KEY_METRICS[scenario]
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
            <div className="w-16 h-16 rounded-2xl bg-secondary-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-secondary-600" />
            </div>
            <h2 className="font-display text-3xl text-neutral-900 mb-3">
              Application Received
            </h2>
            <p className="text-neutral-600 mb-6">
              Thank you for your interest in investing in Abundancia. Our capital markets team will review your application and be in touch within 48 hours.
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 border border-secondary-100 mb-6">
                  <TrendingUp className="w-4 h-4 text-secondary-600" />
                  <span className="font-accent text-sm text-secondary-700">Investor Application</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                  Join the $12.5M Capital Raise
                </h1>
                <p className="text-lg text-neutral-600">
                  Accredited investors are invited to participate in a regenerative development opportunity targeting {metrics.irr}% IRR.
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
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                    Accredited Investor Status *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-neutral-700"
                  >
                    <option value="">Select status</option>
                    <option value="yes">Yes — I am an accredited investor</option>
                    <option value="no">No — I am not accredited</option>
                    <option value="unsure">Unsure — I need to verify</option>
                  </select>
                </div>

                <div>
                  <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                    Investment Range *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-neutral-700"
                  >
                    <option value="">Select range</option>
                    <option value="50-100k">$50,000 - $100,000</option>
                    <option value="100-250k">$100,000 - $250,000</option>
                    <option value="250-500k">$250,000 - $500,000</option>
                    <option value="500k+">$500,000+</option>
                  </select>
                </div>

                <div>
                  <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                    Real Estate Investment Experience
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-neutral-700"
                  >
                    <option value="">Select experience level</option>
                    <option value="none">First-time real estate investor</option>
                    <option value="some">Some experience (1-5 investments)</option>
                    <option value="experienced">Experienced (5+ investments)</option>
                    <option value="professional">Professional/institutional investor</option>
                  </select>
                </div>

                <div>
                  <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                    How did you hear about us?
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="e.g., SXSW, referral, LinkedIn..."
                  />
                </div>

                <div>
                  <label className="font-accent text-sm font-semibold text-neutral-700 mb-1.5 block">
                    Message (optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none"
                    placeholder="Questions, goals, or anything you'd like us to know..."
                  />
                </div>

                <button type="submit" className="btn-accent btn-lg rounded-xl w-full">
                  Submit Application
                </button>

                <p className="text-xs text-neutral-400 text-center">
                  This is an expression of interest, not a commitment. Securities offered under Reg D 506(c) to accredited investors only.
                </p>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
