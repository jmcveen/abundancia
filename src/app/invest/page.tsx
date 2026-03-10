'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { ScenarioToggle } from '@/components/ui/ScenarioToggle'
import { useInvestTransition } from '@/lib/context/invest-transition-context'
import { useScenario } from '@/lib/context/scenario-context'
import { KEY_METRICS, REVENUE_STREAMS as REVENUE_DATA } from '@/lib/data/financials'
import {
  ArrowRight, ArrowDown, Leaf, Home, Droplets, Sun, Shield,
  MapPin, Users, TreePine,
  CheckCircle2, FolderOpen, ChevronDown, ChevronUp,
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Smart CTA — Sticky header that appears on scroll
// ═══════════════════════════════════════════════════════════════════════════

function SmartCTA() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const { triggerTransition } = useInvestTransition()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setVisible(scrollY > 600)
      setProgress(Math.min((scrollY / docHeight) * 100, 100))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const label = progress < 30 ? 'Explore' : progress < 70 ? 'Keep Reading' : 'Enter Data Room'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[60]"
        >
          <div className="bg-white/90 backdrop-blur-xl border-b border-neutral-100 shadow-sm">
            <div className="section-container flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary-800 flex items-center justify-center">
                  <Leaf className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-accent text-sm font-semibold text-neutral-800 hidden sm:block">
                  Investor Overview
                </span>
              </div>
              <button
                onClick={() => triggerTransition('/data-room', 'to-light')}
                className="btn-primary btn-sm rounded-xl text-xs"
              >
                {label}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="h-0.5 bg-neutral-100">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Animated number — smooth transition when scenario changes
// ═══════════════════════════════════════════════════════════════════════════

function AnimatedValue({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      key={String(children)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Static Data (non-scenario-dependent)
// ═══════════════════════════════════════════════════════════════════════════

const PROBLEM_STATS = [
  { stat: '39%', label: 'of global CO\u2082 emissions come from buildings and construction' },
  { stat: '2.4M+', label: 'people in Austin MSA, growing 50-60K/year' },
  { stat: '0', label: 'regenerative communities available in Austin today' },
]

const SOLUTION_PILLARS = [
  {
    icon: Home,
    title: 'Hempcrete Construction',
    description: 'Carbon-negative homes that last 500+ years. R-30+ insulation, 2hr fire rating, zero off-gassing. Texas building codes adopted 2023.',
    stat: '500+',
    statLabel: 'Year Lifespan',
    color: 'bg-primary-50 text-primary-700',
  },
  {
    icon: Sun,
    title: 'Net-Positive Energy',
    description: 'Every structure generates more energy than it consumes. Solar arrays + battery storage = grid independence.',
    stat: '100%',
    statLabel: 'Renewable',
    color: 'bg-secondary-50 text-secondary-700',
  },
  {
    icon: Droplets,
    title: 'Water Security',
    description: 'Seven retention ponds, rainwater harvesting, greywater recycling. Designed to sustain through extended drought.',
    stat: '40%',
    statLabel: 'Water Reduction',
    color: 'bg-info-50 text-info-700',
  },
  {
    icon: TreePine,
    title: '70% Land Preserved',
    description: 'Conservation-forward design protects the Lost Pines ecosystem and enhances Houston toad habitat. Tax-advantaged easements.',
    stat: '263',
    statLabel: 'Acres Conserved',
    color: 'bg-success-50 text-success-700',
  },
]

const MARKET_POINTS = [
  { stat: '50-60K', label: 'New residents per year in Austin MSA' },
  { stat: '68%', label: 'Of homebuyers pay more for sustainable features' },
  { stat: '$755M+', label: 'Raised by our team for RE projects' },
  { stat: '10-25%', label: 'Pricing premium for green-certified homes' },
]

const REVENUE_STREAM_META: Record<string, { description: string; tailwindColor: string }> = {
  'Residential Sales': { description: 'Hempcrete homes, tiny homes, domes, multifamily \u2014 $200K to $625K', tailwindColor: 'bg-primary-700' },
  'Rental Income': { description: 'Long-term and short-term vacation rentals', tailwindColor: 'bg-primary-500' },
  'Lot Sales': { description: 'Custom lots within Abundancia design guidelines', tailwindColor: 'bg-primary-300' },
  'Commercial Leasing': { description: 'Grocery, restaurants, health center, co-working', tailwindColor: 'bg-accent-400' },
  'Retreat Center': { description: 'Phase 1 revenue engine \u2014 events, workshops, wellness', tailwindColor: 'bg-secondary-500' },
}

const CAPITAL_HIGHLIGHTS = [
  { label: 'Vehicle', value: 'Texas Series LLC (LP/GP)' },
  { label: 'Preferred Return', value: '8% annual to LPs' },
  { label: 'Hold Period', value: '10 years' },
  { label: 'Capital Return', value: 'LPs first, before GP promote' },
  { label: 'Waterfall', value: '80/20 \u2192 70/30 \u2192 60/40 \u2192 50/50' },
  { label: 'Reporting', value: 'Quarterly reports, annual K-1s' },
]

const MOAT_LAYERS = [
  { title: 'First Hempcrete Community in Austin', description: 'No comparable product exists in the fastest-growing metro in America.' },
  { title: '376 Acres in the Path of Growth', description: 'Bastrop County, 30 min from downtown Austin. Land at this scale cannot be replicated.' },
  { title: 'Regulatory Advantage', description: 'No zoning in Bastrop County. Hempcrete codes adopted in Texas. 6-12 month timeline vs 18-24 in Austin.' },
  { title: 'Conservation Ecosystem', description: '70% land preserved with tax-advantaged easements. Exceeds LPHCP environmental requirements.' },
  { title: 'Proven Team', description: '$755M+ raised for real estate projects. 200+ transactions. 70+ eco communities analyzed.' },
  { title: 'Diversified Revenue', description: 'Five streams across residential, commercial, rental, lots, and retreat operations.' },
  { title: 'MUD Bond Framework', description: 'Infrastructure costs reimbursed through tax-exempt municipal bonds. Proven Texas mechanism.' },
]

const ROADMAP_PHASES = [
  { phase: 'Phase 1', timeline: 'Months 1-18', title: 'Foundation', items: ['Land acquisition & master planning', 'Retreat center operations (cash flow)', 'Initial infrastructure & MUD formation', 'Model home construction'] },
  { phase: 'Phase 2', timeline: 'Year 2-4', title: 'Growth', items: ['First residential neighborhood (100 units)', 'Commercial village core', 'Food forests & permaculture systems', 'Solar + water infrastructure'] },
  { phase: 'Phase 3', timeline: 'Year 4-7', title: 'Expansion', items: ['Multifamily development (260 units)', 'Tiny home & dome neighborhoods', 'Full commercial activation', 'Lot sales program'] },
  { phase: 'Phase 4', timeline: 'Year 7-10', title: 'Maturity', items: ['Final buildout & optimization', 'Rental portfolio stabilization', 'Conservation easement finalization', 'Exit preparation & LP distributions'] },
]

const TEAM_MEMBERS = [
  { name: 'Kelly Krezek', title: 'Capital Markets Lead', credential: 'Leading the $12.5M raise' },
  { name: 'Joe McVeen', title: 'Managing Partner', credential: '$755M+ raised for RE projects' },
  { name: 'Advisory Board', title: 'Domain Experts', credential: '70+ eco communities analyzed' },
]

const FAQ_ITEMS = [
  {
    question: 'What is the offering structure?',
    answer: 'Reg D 506(c) offering through a Texas Series LLC. Accredited investors only. LP-favorable waterfall with 8% preferred return and capital return priority.',
  },
  {
    question: 'What are the projected returns?',
    answer: 'Base case: 37.1% IRR with 4.42x equity multiple over a 10-year hold. Conservative scenario: 24% IRR / 3.0x. Optimistic: 45% IRR / 5.5x. Use the scenario toggle on this page to explore all three projections.',
  },
  {
    question: 'What makes hempcrete special?',
    answer: 'Hempcrete is carbon-negative (sequesters CO\u2082), has R-30+ insulation, 2+ hour fire ratings, zero off-gassing, and 500+ year material lifespan. Texas adopted hempcrete building codes in 2023.',
  },
  {
    question: 'How does the MUD bond framework work?',
    answer: 'Municipal Utility Districts allow infrastructure costs to be financed through tax-exempt bonds, which are reimbursed to the developer. This dramatically improves project economics and is a well-established mechanism in Texas.',
  },
  {
    question: 'When does the project generate cash flow?',
    answer: 'Phase 1 retreat center operations generate revenue within 12-18 months. Home sales begin in Year 1-2. The phased model means later phases are funded by earlier phase revenues.',
  },
  {
    question: 'How do I get started?',
    answer: 'Access the data room below for full documentation including the PPM, financial model, and subscription agreement. Or apply directly through our investor application.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// FAQ Accordion Item
// ═══════════════════════════════════════════════════════════════════════════

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left border-b border-neutral-100 last:border-0"
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <h3 className="font-accent text-base font-semibold text-neutral-900">{question}</h3>
        {open ? (
          <ChevronUp className="w-5 h-5 text-neutral-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-neutral-600 leading-relaxed pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Helper: format dollars
// ═══════════════════════════════════════════════════════════════════════════

function formatRevenue(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`
  return `$${(value / 1_000).toFixed(0)}K`
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function InvestorOverviewPage() {
  const { triggerTransition } = useInvestTransition()
  const { scenario } = useScenario()
  const metrics = KEY_METRICS[scenario]

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Compute revenue stream percentages from scenario data
  const revenueStreams = REVENUE_DATA[scenario]
  const totalRevenue = revenueStreams.reduce((sum, s) => sum + s.value, 0)

  // All three scenarios for the return projections display
  const allScenarios = [
    { key: 'conservative' as const, label: 'Conservative', irr: KEY_METRICS.conservative.irr, emx: KEY_METRICS.conservative.emx },
    { key: 'base' as const, label: 'Base Case', irr: KEY_METRICS.base.irr, emx: KEY_METRICS.base.emx },
    { key: 'optimistic' as const, label: 'Optimistic', irr: KEY_METRICS.optimistic.irr, emx: KEY_METRICS.optimistic.emx },
  ]

  return (
    <div className="bg-canvas">
      <SmartCTA />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-8 pb-20 md:pt-12 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 via-canvas to-canvas" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary-50/30 to-transparent" />

        <div className="relative section-container">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-8">
              <MapPin className="w-3.5 h-3.5 text-primary-600" />
              <span className="font-accent text-sm font-medium text-primary-700">376 Acres &middot; Cedar Creek, TX &middot; 30 min from Austin</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-neutral-900 mb-6 max-w-5xl tracking-tight">
              New Age Development<br />
              <span className="text-primary-600">Comes to Austin</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl leading-relaxed mb-10">
              The first institutional-grade regenerative community in the Austin metro. Carbon-negative hempcrete homes, net-positive energy, food forests, and 70% land conservation — proving that profitable development and ecological regeneration amplify each other.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-16">
              <button
                onClick={() => scrollToSection('opportunity')}
                className="btn-primary btn-lg rounded-2xl text-base group"
              >
                Explore the Opportunity
                <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => triggerTransition('/data-room', 'to-light')}
                className="btn-secondary btn-lg rounded-2xl text-base group"
              >
                Access Data Room
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </FadeIn>

          {/* Key Stats Strip — IRR and EMx are scenario-reactive */}
          <FadeIn delay={0.6}>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-4 max-w-4xl">
              <div className="text-center sm:text-left">
                <div className="font-display text-3xl sm:text-2xl md:text-3xl font-bold text-primary-800">
                  376<span className="text-primary-500"> Acres</span>
                </div>
                <div className="font-accent text-xs text-neutral-500 mt-0.5 uppercase tracking-wider">Texas Ranchland</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="font-display text-3xl sm:text-2xl md:text-3xl font-bold text-primary-800">
                  $12.5<span className="text-primary-500">M</span>
                </div>
                <div className="font-accent text-xs text-neutral-500 mt-0.5 uppercase tracking-wider">Capital Raise</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="font-display text-3xl sm:text-2xl md:text-3xl font-bold text-primary-800">
                  <AnimatedValue>{metrics.irr}</AnimatedValue><span className="text-primary-500">% IRR</span>
                </div>
                <div className="font-accent text-xs text-neutral-500 mt-0.5 uppercase tracking-wider">Projected Return</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="font-display text-3xl sm:text-2xl md:text-3xl font-bold text-primary-800">
                  <AnimatedValue>{metrics.emx}</AnimatedValue><span className="text-primary-500">x</span>
                </div>
                <div className="font-accent text-xs text-neutral-500 mt-0.5 uppercase tracking-wider">Equity Multiple</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="font-display text-3xl sm:text-2xl md:text-3xl font-bold text-primary-800">
                  670<span className="text-primary-500">+</span>
                </div>
                <div className="font-accent text-xs text-neutral-500 mt-0.5 uppercase tracking-wider">Planned Units</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section id="opportunity" className="py-20 md:py-28 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div>
                <span className="eyebrow mb-4 block">The Problem</span>
                <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-6">
                  Traditional Development Is Broken
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  Conventional construction is the single largest contributor to global emissions.
                  Austin is the fastest-growing major metro in America — but every new subdivision
                  looks the same: energy-dependent, ecologically destructive, built to depreciate.
                  There is no regenerative community available for the hundreds of thousands of people
                  moving to Austin who want something fundamentally different.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed font-medium">
                  Until now.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 gap-4">
                {PROBLEM_STATS.map((item) => (
                  <div key={item.stat} className="bg-canvas rounded-2xl p-6 border border-neutral-100">
                    <div className="font-display text-4xl md:text-5xl font-bold text-primary-800 mb-2">
                      {item.stat}
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">{item.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ THE SOLUTION ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">The Solution</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Regenerative by Design
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Four technology pillars that make Abundancia the most advanced residential community in Texas.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SOLUTION_PILLARS.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div className="bg-white rounded-2xl p-6 h-full border border-neutral-100 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl ${pillar.color} flex items-center justify-center mb-4`}>
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-accent text-lg font-semibold text-neutral-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                  <div className="pt-4 border-t border-neutral-100">
                    <div className="font-display text-2xl font-bold text-primary-800">{pillar.stat}</div>
                    <div className="font-accent text-xs text-neutral-500 uppercase tracking-wider">{pillar.statLabel}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ MARKET OPPORTUNITY ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div>
                <span className="eyebrow mb-4 block">Market Opportunity</span>
                <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-6">
                  Austin Is Ready
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  Austin&apos;s population doubles every 20 years. Tesla, Apple, Google, Oracle, Samsung —
                  the world&apos;s most innovative companies are moving here. And yet there is zero
                  institutional-grade regenerative housing available for the people who work at them.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Whisper Valley — Austin&apos;s only comparable eco-community — has sold out every
                  released phase. Abundancia goes further: hempcrete construction, food forests,
                  conservation-forward design, and a fully regenerative ecosystem that Whisper Valley
                  doesn&apos;t offer.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {MARKET_POINTS.map((item) => (
                  <div key={item.label} className="bg-canvas rounded-2xl p-6 text-center border border-neutral-100">
                    <div className="font-display text-3xl font-bold text-primary-800 mb-2">{item.stat}</div>
                    <p className="text-xs text-neutral-500 leading-relaxed font-accent">{item.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ REVENUE MODEL — Scenario-reactive ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-6">
              <span className="eyebrow mb-3 block">Revenue Model</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Five Revenue Streams
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-6">
                No single-source dependency. Revenue diversification protects against market cycles.
              </p>
              <ScenarioToggle />
              <p className="font-accent text-xs text-neutral-400 mt-3">
                10-year cumulative: <AnimatedValue>{formatRevenue(totalRevenue)}</AnimatedValue>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl mx-auto space-y-4">
              {revenueStreams.map((stream) => {
                const percentage = Math.round((stream.value / totalRevenue) * 100)
                const meta = REVENUE_STREAM_META[stream.name]
                return (
                  <div key={stream.name} className="bg-white rounded-xl p-5 border border-neutral-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-accent text-base font-semibold text-neutral-900">{stream.name}</h3>
                      <span className="font-accent text-sm font-bold text-primary-700">
                        <AnimatedValue>{formatRevenue(stream.value)}</AnimatedValue>
                        <span className="text-neutral-400 font-normal ml-1">({percentage}%)</span>
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500 mb-3">{meta?.description}</p>
                    <div className="w-full bg-neutral-100 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${meta?.tailwindColor || 'bg-primary-500'}`}
                        initial={false}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FINANCIAL HIGHLIGHTS — Scenario-reactive ═══ */}
      <section className="py-20 md:py-28 bg-primary-800">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <FadeIn>
              <div>
                <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-4 block">
                  Financial Highlights
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-white mb-8">
                  The Numbers
                </h2>

                <div className="space-y-3">
                  {CAPITAL_HIGHLIGHTS.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-secondary-400 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-accent text-sm font-semibold text-white">{item.label}</span>
                        <span className="text-sm text-white/60"> &mdash; {item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="font-accent text-lg font-semibold text-white mb-6">
                  Return Projections
                </h3>
                <div className="space-y-6">
                  {allScenarios.map((item) => {
                    const isActive = item.key === scenario
                    return (
                      <div key={item.key} className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-accent text-sm text-white/70">
                            {item.label}
                            {isActive && (
                              <span className="ml-2 px-2 py-0.5 rounded-full bg-secondary-500/20 text-secondary-400 text-[10px] font-bold uppercase">
                                Active
                              </span>
                            )}
                          </span>
                          <div className="flex items-center gap-4">
                            <span className="font-accent text-sm font-semibold text-secondary-400">{item.irr}% IRR</span>
                            <span className="font-accent text-sm text-white/50">{item.emx}x EMx</span>
                          </div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-secondary-400 to-secondary-500 h-2 rounded-full"
                            initial={false}
                            animate={{ width: `${(item.irr / 50) * 100}%` }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-display text-2xl font-bold text-white">$12.5M</div>
                    <div className="font-accent text-xs text-white/50 mt-0.5">Raise</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-white">
                      <AnimatedValue>{formatRevenue(metrics.revenue10yr)}</AnimatedValue>
                    </div>
                    <div className="font-accent text-xs text-white/50 mt-0.5">10-Yr Revenue</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-white">
                      <AnimatedValue>{formatRevenue(metrics.ebitda10yr)}</AnimatedValue>
                    </div>
                    <div className="font-accent text-xs text-white/50 mt-0.5">10-Yr EBITDA</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ COMPETITIVE MOAT ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">
                <Shield className="w-4 h-4 inline mr-2 -mt-0.5" />
                Competitive Moat
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Seven Layers of Protection
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl mx-auto space-y-3">
              {MOAT_LAYERS.map((layer, i) => (
                <div key={layer.title} className="flex items-start gap-4 bg-canvas rounded-xl p-5 border border-neutral-100">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-accent text-sm font-bold text-primary-700">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-accent text-base font-semibold text-neutral-900 mb-1">{layer.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{layer.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ ROADMAP ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Development Roadmap</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                10-Year Vision. 4 Phases.
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {ROADMAP_PHASES.map((phase, i) => (
              <StaggerItem key={phase.phase}>
                <div className={`rounded-2xl p-6 h-full border ${i === 0 ? 'bg-primary-50 border-primary-200' : 'bg-white border-neutral-100'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-accent text-xs font-bold uppercase tracking-wider ${i === 0 ? 'text-primary-700' : 'text-neutral-400'}`}>
                      {phase.phase}
                    </span>
                    {i === 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-[10px] font-accent font-bold uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="font-accent text-xs text-neutral-500 mb-3">{phase.timeline}</div>
                  <h3 className="font-display text-xl text-neutral-900 mb-3">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${i === 0 ? 'bg-primary-500' : 'bg-neutral-300'}`} />
                        <span className="text-sm text-neutral-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Leadership</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Proven Operators
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                A team that has raised $755M+ for real estate projects and analyzed 70+ eco-communities worldwide.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
              {TEAM_MEMBERS.map((member) => (
                <div key={member.name} className="text-center bg-canvas rounded-2xl p-6 border border-neutral-100">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="font-accent text-base font-semibold text-neutral-900">{member.name}</h3>
                  <p className="text-sm text-neutral-500 mb-2">{member.title}</p>
                  <p className="text-xs text-primary-600 font-accent font-semibold">{member.credential}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="text-center">
              <Link href="/team" className="btn-ghost btn-md rounded-xl group">
                Meet the Full Team
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Investor FAQ</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Common Questions
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-neutral-100 px-6 sm:px-8">
              {FAQ_ITEMS.map((item) => (
                <FAQItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ PORTAL ENTRY CTA ═══ */}
      <section className="py-20 md:py-28 bg-primary-50 border-t border-primary-100">
        <div className="section-container text-center">
          <FadeIn>
            <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-8">
              <FolderOpen className="w-8 h-8 text-primary-700" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-6">
              Ready for the Full Picture?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-4">
              Access the complete investor data room — PPM, financial model, subscription agreement,
              and 29 institutional-grade documents across 7 categories.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex items-center justify-center gap-6 mb-10 font-accent text-sm text-neutral-500">
              <span>29 documents</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span>5-year financial model</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span>3 return scenarios</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => triggerTransition('/data-room', 'to-light')}
                className="btn-primary btn-lg rounded-2xl text-base group"
              >
                Enter the Data Room
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link href="/invest/apply" className="btn-accent btn-lg rounded-2xl text-base">
                Apply to Invest
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="bg-primary-800 py-16 md:py-20">
        <div className="section-container text-center">
          <FadeIn>
            <p className="font-display text-2xl md:text-3xl text-white max-w-3xl mx-auto leading-relaxed mb-6">
              &ldquo;The future of housing is regenerative. The future of Austin is Abundancia.&rdquo;
            </p>
            <p className="font-accent text-sm text-white/50 mb-8">
              $12.5M Capital Raise &middot; Reg D 506(c) &middot; Accredited Investors
            </p>
            <Link
              href="/invest/apply"
              className="btn bg-white text-primary-800 hover:bg-white/90 btn-lg rounded-2xl text-base font-semibold"
            >
              Start Your Investment Journey
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
