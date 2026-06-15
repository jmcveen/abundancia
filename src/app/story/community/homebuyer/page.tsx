'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/animation'
import { CheckCircle2, Home } from 'lucide-react'

const inputCls = 'w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-neutral-800'
const labelCls = 'font-accent text-sm font-semibold text-neutral-700 mb-1.5 block'
const sectionHeaderCls = 'font-display text-lg text-neutral-900 mb-5 pb-2 border-b border-neutral-100'

const HOME_TYPES = [
  'Dome',
  'Tiny Home',
  '1 Bed / 1 Bath',
  '2 Bed / 2 Bath',
  '3 Bed / 2 Bath',
  '4 Bed / 3 Bath',
  '5 Bed / 4.5 Bath',
  '5 Bed / 5 Bath',
  '6 Bed / 6 Bath',
  'Other / Custom',
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

export default function ResidentApplyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Section 1 — Contact
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [currentLocation, setCurrentLocation] = useState('')

  // Section 2 — Interest
  const [whyLive, setWhyLive] = useState('')
  const [fullOrPartTime, setFullOrPartTime] = useState('')
  const [monthsPerYear, setMonthsPerYear] = useState('')
  const [austinExperience, setAustinExperience] = useState('')

  // Section 3 — Lifestyle
  const [lifestyleDesc, setLifestyleDesc] = useState('')
  const [values, setValues] = useState('')
  const [dreamCommunity, setDreamCommunity] = useState('')
  const [mustHaves, setMustHaves] = useState('')
  const [howContribute, setHowContribute] = useState('')
  const [dream, setDream] = useState('')

  // Section 4 — Home Preferences
  const [homeTypes, setHomeTypes] = useState<string[]>([])
  const [homeSize, setHomeSize] = useState('')

  // Section 5 — Budget
  const [purchaseRange, setPurchaseRange] = useState('')
  const [downPaymentRange, setDownPaymentRange] = useState('')
  const [monthlyPayment, setMonthlyPayment] = useState('')
  const [purchaseTimeline, setPurchaseTimeline] = useState('')

  // Section 6 — Final
  const [questionsForTeam, setQuestionsForTeam] = useState('')
  const [socialLinks, setSocialLinks] = useState('')
  const [anythingElse, setAnythingElse] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'homebuyer',
          firstName, lastName, phone, email, currentLocation,
          whyLive, fullOrPartTime, monthsPerYear, austinExperience,
          lifestyleDesc, values, dreamCommunity, mustHaves, howContribute, dream,
          homeTypes, homeSize,
          purchaseRange, downPaymentRange, monthlyPayment, purchaseTimeline,
          questionsForTeam, socialLinks, anythingElse,
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
            <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="font-display text-3xl text-neutral-900 mb-3">Application Received</h2>
            <p className="text-neutral-600 mb-6">
              Thank you, {firstName}. Our community team will review your application and reach out within 2–3 business days to share more about homes, pricing, and life at Abundancia.
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-6">
                  <Home className="w-4 h-4 text-primary-600" />
                  <span className="font-accent text-sm text-primary-700">Homebuyer Application</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                  Abundancia Homebuyer Interest Form
                </h1>
                <p className="text-lg text-neutral-600">
                  Tell us about yourself, your lifestyle, and your vision for life at Abundancia. Our community team reviews every application personally.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <form onSubmit={handleSubmit} className="card p-8 space-y-8">

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
                    <div>
                      <label className={labelCls}>Where do you currently live?</label>
                      <input type="text" value={currentLocation} onChange={e => setCurrentLocation(e.target.value)} className={inputCls} placeholder="City, State / Country" />
                    </div>
                  </div>
                </div>

                {/* ── Section 2: Interest ── */}
                <div>
                  <h2 className={sectionHeaderCls}>2. Interest in Abundancia</h2>
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Why do you want to live at Abundancia?</label>
                      <textarea rows={4} value={whyLive} onChange={e => setWhyLive(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="What draws you to this community and this vision?" />
                    </div>
                    <div>
                      <label className={labelCls}>Are you interested in living at Abundancia full-time or part-time?</label>
                      <select value={fullOrPartTime} onChange={e => setFullOrPartTime(e.target.value)} className={inputCls}>
                        <option value="">Select one</option>
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Seasonal</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                    {(fullOrPartTime === 'Part-time' || fullOrPartTime === 'Seasonal') && (
                      <div>
                        <label className={labelCls}>How many months per year would you want to live there?</label>
                        <input type="text" value={monthsPerYear} onChange={e => setMonthsPerYear(e.target.value)} className={inputCls} placeholder="e.g., 3–4 months in spring/fall" />
                      </div>
                    )}
                    <div>
                      <label className={labelCls}>What has your experience with Austin, Texas or Central Texas been so far?</label>
                      <textarea rows={3} value={austinExperience} onChange={e => setAustinExperience(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="Have you visited, lived there, or is it new to you?" />
                    </div>
                  </div>
                </div>

                {/* ── Section 3: Lifestyle ── */}
                <div>
                  <h2 className={sectionHeaderCls}>3. Lifestyle & Community Fit</h2>
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Tell us a little about your lifestyle and how you live day to day.</label>
                      <textarea rows={4} value={lifestyleDesc} onChange={e => setLifestyleDesc(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="Morning routines, how you spend your time, work/life balance..." />
                    </div>
                    <div>
                      <label className={labelCls}>What are your most important values?</label>
                      <textarea rows={3} value={values} onChange={e => setValues(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="What matters most to you in life?" />
                    </div>
                    <div>
                      <label className={labelCls}>What does your dream community feel like?</label>
                      <textarea rows={3} value={dreamCommunity} onChange={e => setDreamCommunity(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="Describe the feeling, the people, the pace..." />
                    </div>
                    <div>
                      <label className={labelCls}>What are your must-haves or non-negotiables in a community?</label>
                      <textarea rows={3} value={mustHaves} onChange={e => setMustHaves(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="Things that matter most to your daily life..." />
                    </div>
                    <div>
                      <label className={labelCls}>How do you most love to contribute to the greater good of humanity, community, or the planet?</label>
                      <textarea rows={3} value={howContribute} onChange={e => setHowContribute(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="Your gifts, your passions, your way of giving..." />
                    </div>
                    <div>
                      <label className={labelCls}>What is your dream?</label>
                      <textarea rows={3} value={dream} onChange={e => setDream(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="The life you're building toward..." />
                    </div>
                  </div>
                </div>

                {/* ── Section 4: Home Preferences ── */}
                <div>
                  <h2 className={sectionHeaderCls}>4. Home Preferences</h2>
                  <div className="space-y-5">
                    <CheckboxGroup
                      label="What type of home are you most interested in? (select all that apply)"
                      options={HOME_TYPES}
                      selected={homeTypes}
                      onChange={setHomeTypes}
                    />
                    <div>
                      <label className={labelCls}>Are you more interested in:</label>
                      <select value={homeSize} onChange={e => setHomeSize(e.target.value)} className={inputCls}>
                        <option value="">Select one</option>
                        <option>A smaller, simpler home</option>
                        <option>A mid-sized family home</option>
                        <option>A larger estate home</option>
                        <option>A custom home</option>
                        <option>I&apos;m not sure yet</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ── Section 5: Budget & Readiness ── */}
                <div>
                  <h2 className={sectionHeaderCls}>5. Budget & Readiness</h2>
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>If you were purchasing without a mortgage, what home and lot price range would feel realistic for you?</label>
                      <select value={purchaseRange} onChange={e => setPurchaseRange(e.target.value)} className={inputCls}>
                        <option value="">Select range</option>
                        <option>Under $250,000</option>
                        <option>$250,000 to $500,000</option>
                        <option>$500,000 to $750,000</option>
                        <option>$750,000 to $1M</option>
                        <option>$1M to $2M</option>
                        <option>$2M+</option>
                        <option>I&apos;m not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>If mortgage financing were available, what down payment range would feel realistic for you?</label>
                      <select value={downPaymentRange} onChange={e => setDownPaymentRange(e.target.value)} className={inputCls}>
                        <option value="">Select range</option>
                        <option>Under $50,000</option>
                        <option>$50,000 to $100,000</option>
                        <option>$100,000 to $250,000</option>
                        <option>$250,000 to $500,000</option>
                        <option>$500,000+</option>
                        <option>I&apos;m not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>If mortgage financing were available, what monthly payment range would feel comfortable for you?</label>
                      <select value={monthlyPayment} onChange={e => setMonthlyPayment(e.target.value)} className={inputCls}>
                        <option value="">Select range</option>
                        <option>Under $2,500 / month</option>
                        <option>$2,500 to $5,000 / month</option>
                        <option>$5,000 to $7,500 / month</option>
                        <option>$7,500 to $10,000 / month</option>
                        <option>$10,000+ / month</option>
                        <option>I&apos;m not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>What is your ideal timeline for purchasing or moving?</label>
                      <select value={purchaseTimeline} onChange={e => setPurchaseTimeline(e.target.value)} className={inputCls}>
                        <option value="">Select timeline</option>
                        <option>As soon as possible</option>
                        <option>Within 6 months</option>
                        <option>6 to 12 months</option>
                        <option>1 to 2 years</option>
                        <option>2+ years</option>
                        <option>I&apos;m just exploring for now</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ── Section 6: Final ── */}
                <div>
                  <h2 className={sectionHeaderCls}>6. Final Questions</h2>
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>What questions do you have for our team about Abundancia?</label>
                      <textarea rows={3} value={questionsForTeam} onChange={e => setQuestionsForTeam(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="Anything you'd like to know..." />
                    </div>
                    <div>
                      <label className={labelCls}>Please share your social links here if you&apos;d like us to get to know you more.</label>
                      <input type="text" value={socialLinks} onChange={e => setSocialLinks(e.target.value)} className={inputCls} placeholder="Instagram, LinkedIn, website..." />
                    </div>
                    <div>
                      <label className={labelCls}>Is there anything else you&apos;d like us to know?</label>
                      <textarea rows={3} value={anythingElse} onChange={e => setAnythingElse(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="Anything that feels important to share..." />
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
                  This is an expression of interest. Our team will reach out within 2–3 business days.
                </p>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
