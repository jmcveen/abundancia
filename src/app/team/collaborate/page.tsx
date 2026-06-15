'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/animation'
import { CheckCircle2, Handshake } from 'lucide-react'

const inputCls = 'w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-neutral-800'
const labelCls = 'font-accent text-sm font-semibold text-neutral-700 mb-1.5 block'
const sectionHeaderCls = 'font-display text-lg text-neutral-900 mb-5 pb-2 border-b border-neutral-100'

// ─── Collaboration areas, grouped ───────────────────────────────────────────
const COLLAB_AREAS = [
  {
    category: 'Physical Development',
    items: ['Construction', 'Architecture', 'Permaculture Design', 'Agriculture', 'Sustainable Building', 'Water Systems', 'Waste Systems', 'Energy Systems'],
  },
  {
    category: 'Governance & Community',
    items: ['Governance Models', 'Social Dynamics', 'Community Operations', 'Economic Models'],
  },
  {
    category: 'Finance & Business',
    items: ['Currency', 'Finance', 'Fundraising', 'Legal', 'Business Development', 'Technology & Automation'],
  },
  {
    category: 'Food, Retail & Amenities',
    items: ['Grocery', 'Retail', 'Restaurants', 'Cooperative Businesses'],
  },
  {
    category: 'Culture & Education',
    items: ['Education', 'Health & Wellness', 'Event Production', 'Artists & Musicians', 'Spirituality', 'Recreation', 'Entertainment'],
  },
  {
    category: 'Media & Networks',
    items: ['Public Relations, Marketing, Media', 'Global Community Connections & Networks'],
  },
]

const COLLAB_ROLES = [
  { value: 'Strategic Development', desc: 'Contribute to the vision, model, strategy, governance, systems, and operating framework.' },
  { value: 'Physical Development', desc: 'Contribute to land planning, design, construction, infrastructure, and project execution.' },
  { value: 'Ecosystem Growth', desc: 'Contribute through partnerships, introductions, referrals, community-building, and aligned network development.' },
  { value: 'Capital & Advisory Support', desc: 'Contribute through investment, fundraising, mentorship, professional expertise, or strategic guidance.' },
  { value: 'Other', desc: "I'd like to contribute in another way." },
]

function AreaCheckboxGroup({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (val: string[]) => void
}) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt])
  }
  return (
    <div className="space-y-5">
      {COLLAB_AREAS.map(group => (
        <div key={group.category}>
          <p className="font-accent text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">{group.category}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {group.items.map(item => (
              <label key={item} className="flex items-start gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selected.includes(item)}
                  onChange={() => toggle(item)}
                  className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer flex-shrink-0"
                />
                <span className="text-sm text-neutral-600 group-hover:text-neutral-800 leading-snug">{item}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CollaboratorApplyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Section 1 — Contact
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [title, setTitle] = useState('')
  const [website, setWebsite] = useState('')
  const [socialLinks, setSocialLinks] = useState('')
  const [location, setLocation] = useState('')

  // Section 2 — Collaboration Interest
  const [collabAreas, setCollabAreas] = useState<string[]>([])
  const [howContribute, setHowContribute] = useState('')
  const [skills, setSkills] = useState('')

  // Section 3 — Role
  const [collabRole, setCollabRole] = useState('')
  const [hoursPerWeek, setHoursPerWeek] = useState('')
  const [buildingCommunity, setBuildingCommunity] = useState('')
  const [projectStage, setProjectStage] = useState('')

  // Section 4 — Alignment
  const [whyCollab, setWhyCollab] = useState('')
  const [successCriteria, setSuccessCriteria] = useState('')
  const [anythingElse, setAnythingElse] = useState('')
  const [dream, setDream] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'collaborator',
          firstName, lastName, phone, email,
          company, title, website, socialLinks, location,
          collabAreas, howContribute, skills,
          collabRole, hoursPerWeek, buildingCommunity, projectStage,
          whyCollab, successCriteria, anythingElse, dream,
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
              Thank you, {firstName}. Our team will review your application and reach out within 2–3 business days to explore how we might work together.
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
                  <Handshake className="w-4 h-4 text-primary-600" />
                  <span className="font-accent text-sm text-primary-700">Collaborator Application</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                  Abundancia Collaborator Interest Form
                </h1>
                <p className="text-lg text-neutral-600">
                  Tell us about yourself, your skills, and how you&apos;d like to contribute to the Abundancia vision. Our team reviews every application personally.
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
                      <label className={labelCls}>Company / Organization Name</label>
                      <input type="text" value={company} onChange={e => setCompany(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Title / Role</label>
                      <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Website Link</label>
                      <input type="url" value={website} onChange={e => setWebsite(e.target.value)} className={inputCls} placeholder="https://" />
                    </div>
                    <div>
                      <label className={labelCls}>Social Links</label>
                      <input type="text" value={socialLinks} onChange={e => setSocialLinks(e.target.value)} className={inputCls} placeholder="Instagram, LinkedIn, X..." />
                    </div>
                    <div>
                      <label className={labelCls}>Where are you generally located?</label>
                      <input type="text" value={location} onChange={e => setLocation(e.target.value)} className={inputCls} placeholder="City, State / Country" />
                    </div>
                  </div>
                </div>

                {/* ── Section 2: Collaboration Interest ── */}
                <div>
                  <h2 className={sectionHeaderCls}>2. Collaboration Interest</h2>
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>What areas are you interested in contributing to? (select all that apply)</label>
                      <div className="mt-2 border border-neutral-100 rounded-xl p-4 bg-canvas-subtle">
                        <AreaCheckboxGroup selected={collabAreas} onChange={setCollabAreas} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>More specifically, how would you like to contribute to Abundancia?</label>
                      <textarea rows={4} value={howContribute} onChange={e => setHowContribute(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="Describe the specific contribution you're envisioning..." />
                    </div>
                    <div>
                      <label className={labelCls}>What skills, knowledge, or experience do you have in the areas you selected?</label>
                      <textarea rows={4} value={skills} onChange={e => setSkills(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="Your background, credentials, and relevant experience..." />
                    </div>
                  </div>
                </div>

                {/* ── Section 3: Collaboration Role ── */}
                <div>
                  <h2 className={sectionHeaderCls}>3. Collaboration Role</h2>
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Which role best describes how you may want to collaborate?</label>
                      <div className="space-y-2 mt-1">
                        {COLLAB_ROLES.map(role => (
                          <label key={role.value} className="flex items-start gap-3 cursor-pointer group p-3 rounded-xl hover:bg-canvas-subtle transition-colors">
                            <input
                              type="radio"
                              name="collabRole"
                              value={role.value}
                              checked={collabRole === role.value}
                              onChange={() => setCollabRole(role.value)}
                              className="mt-0.5 w-4 h-4 border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer flex-shrink-0"
                            />
                            <span>
                              <span className="text-sm font-semibold text-neutral-800 font-accent">{role.value}</span>
                              <span className="text-sm text-neutral-500 ml-1">— {role.desc}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>How many hours per week would you realistically have available for regenerative community projects?</label>
                      <select value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} className={inputCls}>
                        <option value="">Select range</option>
                        <option>1 to 3 hours</option>
                        <option>3 to 5 hours</option>
                        <option>5 to 10 hours</option>
                        <option>10 to 20 hours</option>
                        <option>20+ hours</option>
                        <option>It depends on the opportunity</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Are you currently building, planning, or dreaming of a regenerative community project?</label>
                      <select value={buildingCommunity} onChange={e => setBuildingCommunity(e.target.value)} className={inputCls}>
                        <option value="">Select one</option>
                        <option>Yes, I am actively building one</option>
                        <option>Yes, I am in the planning stage</option>
                        <option>Yes, I am in the early visioning stage</option>
                        <option>Not currently, but I would like to someday</option>
                        <option>No, I&apos;m mainly interested in supporting Abundancia or other projects</option>
                      </select>
                    </div>
                    {buildingCommunity && buildingCommunity !== "No, I'm mainly interested in supporting Abundancia or other projects" && (
                      <div>
                        <label className={labelCls}>If you are building or planning a regenerative community, what stage are you currently in?</label>
                        <select value={projectStage} onChange={e => setProjectStage(e.target.value)} className={inputCls}>
                          <option value="">Select stage</option>
                          <option>Vision / concept</option>
                          <option>Land search</option>
                          <option>Land under contract</option>
                          <option>Land already owned</option>
                          <option>Design / planning</option>
                          <option>Entitlements / permitting</option>
                          <option>Fundraising</option>
                          <option>Construction</option>
                          <option>Operations</option>
                          <option>Not applicable</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Section 4: Alignment ── */}
                <div>
                  <h2 className={sectionHeaderCls}>4. Alignment & Final Questions</h2>
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Why are you interested in collaborating with Abundancia?</label>
                      <textarea rows={4} value={whyCollab} onChange={e => setWhyCollab(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="What drew you here? What excites you about this project?" />
                    </div>
                    <div>
                      <label className={labelCls}>What would make this collaboration feel successful for you?</label>
                      <textarea rows={3} value={successCriteria} onChange={e => setSuccessCriteria(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="What outcomes matter most to you?" />
                    </div>
                    <div>
                      <label className={labelCls}>Is there anything else you would like us to know?</label>
                      <textarea rows={3} value={anythingElse} onChange={e => setAnythingElse(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="Anything that feels important to share..." />
                    </div>
                    <div>
                      <label className={labelCls}>What is your dream?</label>
                      <textarea rows={3} value={dream} onChange={e => setDream(e.target.value)}
                        className={`${inputCls} resize-none`}
                        placeholder="The future you're working toward..." />
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
