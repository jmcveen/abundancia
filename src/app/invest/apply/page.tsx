'use client'

import { useState, useRef } from 'react'
import { FadeIn } from '@/components/animation'
import { isValidEmail } from '@/lib/utils'
import { INVESTMENT_DISCLAIMER } from '@/lib/data/financials'
import { CheckCircle2, TrendingUp } from 'lucide-react'

// ─── Field helpers ────────────────────────────────────────────────────────────
const inputCls = 'w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-neutral-800'
const labelCls = 'font-accent text-sm font-semibold text-neutral-700 mb-1.5 block'
const sectionHeaderCls = 'font-display text-lg text-neutral-900 mb-5 pb-2 border-b border-neutral-100'

const INVESTMENT_TYPES = [
  'Real estate development',
  'Land acquisition',
  'Homes / residential community',
  'Retreat center or hospitality',
  'Regenerative agriculture / food systems',
  'Community infrastructure',
  "I'm open and would like to learn more",
]

const PAST_EXPERIENCE = [
  'Real estate',
  'Startups / private companies',
  'Funds / syndications',
  'Public markets',
  'Regenerative / impact projects',
  'I am a newer investor',
  'Other',
]

function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string
  options: string[]
  selected: string[]
  onChange: (val: string[]) => void
}) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt])
  }
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
        {options.map(opt => (
          <label key={opt} className="flex items-start gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => toggle(opt)}
              className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer flex-shrink-0"
            />
            <span className="text-sm text-neutral-600 group-hover:text-neutral-800 leading-snug">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default function InvestorApplyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Bot protection: honeypot field + form-render timestamp
  const hpRef = useRef<HTMLInputElement>(null)
  const loadedAt = useRef<number>(Date.now())

  // Section 1 — Contact
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  // Section 2 — Investment Interest
  const [whyInterested, setWhyInterested] = useState('')
  const [investmentTypes, setInvestmentTypes] = useState<string[]>([])
  const [pastExperience, setPastExperience] = useState<string[]>([])

  // Section 3 — Investor Fit
  const [accreditedStatus, setAccreditedStatus] = useState('')
  const [investmentRange, setInvestmentRange] = useState('')
  const [timeline, setTimeline] = useState('')

  // Section 4 — Relationship
  const [livingInterest, setLivingInterest] = useState('')
  const [austinExperience, setAustinExperience] = useState('')
  const [questions, setQuestions] = useState('')
  const [anything, setAnything] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'investor',
          _hp: hpRef.current?.value || '',
          _t: loadedAt.current,
          firstName, lastName, phone, email,
          whyInterested, investmentTypes, pastExperience,
          accreditedStatus, investmentRange, timeline,
          livingInterest, austinExperience, questions, anything,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-canvas px-6">
        <FadeIn>
          <div className="max-w-md text-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-secondary-600" />
            </div>
            <h2 className="font-display text-3xl text-neutral-900 mb-3">Application Received</h2>
            <p className="text-neutral-600 mb-6">
              Thank you, {firstName}. Our capital markets team will review your application and be in touch within 48 hours.
            </p>
            <a href="/" className="btn-primary btn-md rounded-xl">Back to Home</a>
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
                  Abundancia Investor Interest Form
                </h1>
                <p className="text-lg text-neutral-600">
                  Tell us about yourself and your investment goals. Our capital markets team reviews every application personally.
                </p>
                <p className="mt-4 font-accent text-xs uppercase tracking-[0.14em] text-secondary-600">
                  {INVESTMENT_DISCLAIMER}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <form onSubmit={handleSubmit} className="card p-8 space-y-8">
                {/* Honeypot — hidden from real users; bots fill it and get silently dropped */}
                <input
                  ref={hpRef}
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0"
                />


                {/* ── Section 1: Contact ── */}
                <div>
                  <h2 className={sectionHeaderCls}>1. Contact Information</h2>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>First Name *</label>
                        <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Last Name *</label>
                        <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Phone Number *</label>
                      <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} placeholder="(512) 000-0000" />
                    </div>
                    <div>
                      <label className={labelCls}>Email Address *</label>
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className={inputCls} placeholder="your@email.com" />
                    </div>
                  </div>
                </div>

                {/* ── Section 2: Investment Interest ── */}
                <div>
                  <h2 className={sectionHeaderCls}>2. Investment Interest</h2>
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Why are you interested in investing in Abundancia?</label>
                      <textarea rows={4} value={whyInterested} onChange={e => setWhyInterested(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="Share what draws you to this project..." />
                    </div>
                    <CheckboxGroup
                      label="What type of investment opportunities are you most interested in?"
                      options={INVESTMENT_TYPES}
                      selected={investmentTypes}
                      onChange={setInvestmentTypes}
                    />
                    <CheckboxGroup
                      label="What types of projects or asset classes have you invested in before?"
                      options={PAST_EXPERIENCE}
                      selected={pastExperience}
                      onChange={setPastExperience}
                    />
                  </div>
                </div>

                {/* ── Section 3: Investor Fit ── */}
                <div>
                  <h2 className={sectionHeaderCls}>3. Investor Fit</h2>
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Which best describes you? *</label>
                      <select required value={accreditedStatus} onChange={e => setAccreditedStatus(e.target.value)} className={inputCls}>
                        <option value="">Select one</option>
                        <option>I am an accredited investor</option>
                        <option>I may be an accredited investor, but I&apos;m not sure</option>
                        <option>I am not an accredited investor</option>
                        <option>I am investing through an entity, LLC, company, trust, or family office</option>
                        <option>I would like to explore what options may be available to me</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>If the project, terms, and due diligence felt aligned, what investment range would you be interested in exploring?</label>
                      <select value={investmentRange} onChange={e => setInvestmentRange(e.target.value)} className={inputCls}>
                        <option value="">Select range</option>
                        <option>Under $25,000</option>
                        <option>$25,000 to $50,000</option>
                        <option>$50,000 to $100,000</option>
                        <option>$100,000 to $250,000</option>
                        <option>$250,000 to $500,000</option>
                        <option>$500,000 to $1M+</option>
                        <option>I&apos;m not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>What timeline are you considering for making an investment?</label>
                      <select value={timeline} onChange={e => setTimeline(e.target.value)} className={inputCls}>
                        <option value="">Select timeline</option>
                        <option>Immediately, within 30 days</option>
                        <option>1 to 3 months</option>
                        <option>3 to 6 months</option>
                        <option>6+ months</option>
                        <option>I&apos;m just exploring for now</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ── Section 4: Relationship ── */}
                <div>
                  <h2 className={sectionHeaderCls}>4. Relationship to Abundancia</h2>
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Are you also interested in living at Abundancia or purchasing a home in the community?</label>
                      <select value={livingInterest} onChange={e => setLivingInterest(e.target.value)} className={inputCls}>
                        <option value="">Select one</option>
                        <option>Yes, full-time</option>
                        <option>Yes, part-time</option>
                        <option>Maybe, I&apos;d like to learn more</option>
                        <option>No, I&apos;m only interested in investing</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>What has your experience with Austin, Texas or Central Texas been so far?</label>
                      <textarea rows={3} value={austinExperience} onChange={e => setAustinExperience(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="First time visiting, live nearby, have invested there before..." />
                    </div>
                    <div>
                      <label className={labelCls}>What questions do you have for our team about Abundancia?</label>
                      <textarea rows={3} value={questions} onChange={e => setQuestions(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="Anything you'd like to understand better..." />
                    </div>
                    <div>
                      <label className={labelCls}>Is there anything else you&apos;d like us to know about you, your investment goals, or your dream for the future?</label>
                      <textarea rows={3} value={anything} onChange={e => setAnything(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="Share anything else that feels relevant..." />
                    </div>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-600 font-accent">{error}</p>
                )}

                <button type="submit" disabled={isSubmitting} className="btn-accent btn-lg rounded-xl w-full disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>

                <p className="text-xs text-neutral-400 text-center">
                  This is an expression of interest, not a commitment. Securities offered under Reg D 506(c) to accredited investors only. Projected returns are forward-looking and not guaranteed.
                </p>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
