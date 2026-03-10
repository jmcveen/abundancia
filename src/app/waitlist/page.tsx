'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { CheckCircle2, Leaf, Eye, Users, Sprout, BarChart3, ChevronDown, ArrowRight } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const EXPLORE_CARDS = [
  {
    icon: Eye,
    title: 'Explore the Vision',
    description: 'What we\'re building and why Austin is the perfect home for regenerative living.',
    href: '/story/vision',
    color: 'bg-primary-50 text-primary-700',
  },
  {
    icon: Users,
    title: 'See the Community',
    description: 'Meet the people, culture, and values that define life at Abundancia.',
    href: '/story/community',
    color: 'bg-accent-50 text-accent-700',
  },
  {
    icon: Sprout,
    title: 'Regenerative Systems',
    description: 'Hempcrete homes, greywater recycling, food forests, and net-positive design.',
    href: '/story/regeneration',
    color: 'bg-green-50 text-green-700',
  },
  {
    icon: BarChart3,
    title: 'View the Business Model',
    description: 'How Abundancia sustains itself through real estate, retreats, and membership.',
    href: '/model',
    color: 'bg-secondary-50 text-secondary-700',
  },
]

const FAQ_ITEMS = [
  {
    question: 'What does it cost to live at Abundancia?',
    answer: 'Homes range from $200K (tiny homes) to $625K+ (single-family). Rental options start around $1,800/month. Membership and retreat visits offer lower-commitment ways to experience the community.',
  },
  {
    question: 'When will homes be available?',
    answer: 'Phase 1 model homes are expected to break ground in 2026, with first move-ins projected for late 2027. Waitlist members will receive priority access and early pricing.',
  },
  {
    question: 'Do I need to buy, or can I rent?',
    answer: 'Both. Abundancia includes 60 rental units alongside homes for purchase. There are also retreat and membership options for those who want to visit or participate without relocating.',
  },
  {
    question: 'Where exactly is this in Austin?',
    answer: 'The 150-acre site is located in East Austin, offering proximity to the city while maintaining the space for a full regenerative community with food forests, trails, and gathering spaces.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// FAQ Accordion Item
// ═══════════════════════════════════════════════════════════════════════════

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-neutral-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-heading text-base text-neutral-900 group-hover:text-primary-800 transition-colors pr-4">
          {question}
        </span>
        <ChevronDown className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-4' : 'max-h-0'}`}>
        <p className="font-accent text-sm text-neutral-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

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
      {/* ═══ HERO + FORM ═══ */}
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

      {/* ═══ WHILE YOU WAIT — EXPLORE ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">While You Wait</span>
              <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">
                Explore Abundancia
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Learn more about the vision, community, and regenerative systems that make this unlike anything else in Austin.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {EXPLORE_CARDS.map((card) => (
              <StaggerItem key={card.title}>
                <Link href={card.href} className="block group">
                  <div className="card p-6 h-full hover:shadow-lg hover:border-primary-200 transition-all">
                    <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                      <card.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-neutral-900 mb-2 group-hover:text-primary-800 transition-colors">
                      {card.title}
                    </h3>
                    <p className="font-accent text-sm text-neutral-500 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ COMMON QUESTIONS ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              <div className="text-center mb-10">
                <span className="eyebrow mb-3 block">Common Questions</span>
                <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">
                  Quick Answers
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="card p-6 md:p-8">
                {FAQ_ITEMS.map((item) => (
                  <FaqItem key={item.question} question={item.question} answer={item.answer} />
                ))}
                <div className="pt-4 text-center">
                  <Link
                    href="/faq"
                    className="inline-flex items-center gap-1.5 font-accent text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors group"
                  >
                    View all FAQs
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ INVESTOR CALLOUT ═══ */}
      <section className="py-16 bg-primary-900">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h3 className="font-display text-2xl text-white mb-2">
                  Looking to Invest?
                </h3>
                <p className="font-accent text-sm text-white/60">
                  Accredited investors can access the data room, financial projections, and investment terms.
                </p>
              </div>
              <Link
                href="/invest/apply"
                className="btn-accent btn-lg rounded-2xl text-base whitespace-nowrap group flex-shrink-0"
              >
                Access the Investor Data Room
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
