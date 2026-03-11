'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Modal } from '@/components/ui/Modal'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { useScenario } from '@/lib/context/scenario-context'
import { KEY_METRICS } from '@/lib/data/financials'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { ArrowRight, FileText, Layers, DollarSign, TreePine } from 'lucide-react'
import { UNIT_MIX } from '@/lib/data/financials'

// ═══════════════════════════════════════════════════════════════════════════
// Unit Mix Detail Data
// ═══════════════════════════════════════════════════════════════════════════

const UNIT_DETAILS: Record<string, {
  description: string
  targetBuyer: string
  priceRange: string
  timeline: string
}> = {
  'Single-Family Homes': {
    description: 'Premium hempcrete homes ranging from 1,600 to 2,400 sq ft, built with carbon-negative materials that last 500+ years. Each home features solar arrays, rainwater harvesting, and smart home integration in a community designed around walkability and nature.',
    targetBuyer: 'Families and professionals seeking premium, health-conscious living with Austin accessibility. Buyers who value sustainability, community, and long-term asset appreciation.',
    priceRange: '$500K – $750K',
    timeline: 'Phase 1–3 (Years 1–5)',
  },
  'Tiny Homes': {
    description: 'Efficient 400–800 sq ft hempcrete dwellings designed for minimalist living without compromise. Full kitchens, bathrooms, and living spaces with the same carbon-negative construction and health benefits as larger homes.',
    targetBuyer: 'Young professionals, remote workers, retirees, and sustainability-focused individuals seeking affordable entry into regenerative living.',
    priceRange: '$150K – $250K',
    timeline: 'Phase 1–2 (Years 1–3)',
  },
  'Domes': {
    description: 'Innovative geodesic dome structures averaging 600 sq ft, offering unique architectural character with exceptional structural strength. These homes are naturally energy-efficient due to their geometry and provide a distinctive living experience.',
    targetBuyer: 'Design-forward buyers, eco-tourism investors, and individuals seeking unique architectural living spaces with strong short-term rental potential.',
    priceRange: '$175K – $275K',
    timeline: 'Phase 2–3 (Years 2–5)',
  },
  'Multifamily': {
    description: 'Mid-density hempcrete condominiums averaging 1,100 sq ft in low-rise buildings of 4–12 units. Shared amenities include rooftop gardens, EV charging, community spaces, and direct access to trails and food forests.',
    targetBuyer: 'First-time buyers, investors seeking rental income, and professionals wanting community-oriented living at an accessible price point.',
    priceRange: '$325K – $500K',
    timeline: 'Phase 2–4 (Years 2–7)',
  },
  'Lots': {
    description: 'Prepared lots with full infrastructure — roads, utilities, water, and fiber internet — for owners who want to build custom hempcrete homes. All builds must comply with Abundancia design guidelines and regenerative building standards.',
    targetBuyer: 'Custom home builders, investors, and families who want full control over their home design within a regenerative community framework.',
    priceRange: '$250K – $450K',
    timeline: 'Phase 1–4 (Years 1–7)',
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// Investment Highlights Data
// ═══════════════════════════════════════════════════════════════════════════

const INVESTMENT_HIGHLIGHTS = [
  {
    icon: DollarSign,
    title: 'LP-Favorable Waterfall',
    modalKey: 'waterfall',
    brief: '8% preferred return with full capital return priority before GP participation.',
    detail: 'The operating agreement features an LP-favorable distribution waterfall: investors receive an 8% preferred return annually, followed by full return of capital, before the GP participates in profits. This structure ensures investor interests are protected and aligned with project success. The waterfall also includes a catch-up provision and promote structure that incentivizes strong GP performance.',
    link: '/data-room/view/investment/operating-agreement',
    linkLabel: 'View Operating Agreement',
  },
  {
    icon: Layers,
    title: 'Five Revenue Streams',
    modalKey: 'revenue',
    brief: 'Residential sales, rental income, lot sales, commercial leasing, and retreat center.',
    detail: 'Abundancia generates revenue through four diversified streams, reducing dependence on any single source:\n\n1. Residential Sales — $362M over 10 years from home and condo sales\n2. Rental Income — $43.6M from 125 rental units (75 condos + 50 special rentals)\n3. Lot Sales — $15.4M from 100 prepared lots\n4. Commercial Leasing — $7.8M from retail, co-working, and wellness spaces\n\nThis diversification provides financial resilience across market cycles.',
    link: '/model',
    linkLabel: 'Explore Business Model',
  },
  {
    icon: TreePine,
    title: 'Conservation Tax Benefits',
    modalKey: 'conservation-tax',
    brief: 'Permanent conservation easements provide significant tax deductions for investors.',
    detail: 'With a development footprint of only ~4% (16 acres), over 90% of the land (360 acres) is preserved under conservation and regenerative agriculture. Conservation easement donations are deductible up to 50% of adjusted gross income, with a 15-year carry-forward period. Combined with the existing agricultural exemption and Texas\'s lack of state income tax, investors benefit from a highly tax-efficient structure that simultaneously protects irreplaceable ecological habitat.',
    link: '/data-room/view/property/environmental-compliance',
    linkLabel: 'View Environmental Compliance',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════════════════════

function Stat({ target, prefix, suffix, label, decimals = 0 }: {
  target: number; prefix?: string; suffix?: string; label: string; decimals?: number
}) {
  const { count, ref } = useAnimatedCounter({ target, decimals })
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-lg sm:text-2xl md:text-3xl font-bold text-primary-800 mb-1">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="font-accent text-sm text-neutral-600">{label}</div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function OverviewPage() {
  const { scenario } = useScenario()
  const metrics = KEY_METRICS[scenario]
  const [activeModal, setActiveModal] = useState<string | null>(null)

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Executive Summary</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-6xl text-neutral-900 mb-6 max-w-4xl">
              Abundancia Austin at a Glance
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
              A 376-acre regenerative community in Cedar Creek, Bastrop County — 30 minutes from downtown Austin. $12.5M capital raise targeting {metrics.irr}% IRR with hempcrete homes, food forests, renewable energy, and sacred spaces.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ KEY METRICS ═══ */}
      <section className="py-12 md:py-16 bg-canvas">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-6">
            <Stat target={376} suffix=" Acres" label="Texas Ranchland" />
            <Stat target={12.5} suffix="M" prefix="$" label="Capital Raise" decimals={1} />
            <Stat target={metrics.irr} suffix="%" label="Projected IRR" decimals={1} />
            <Stat target={metrics.emx} suffix="x" label="Equity Multiple" decimals={2} />
            <div className="col-span-2 md:col-span-1">
              <Stat target={70} suffix="%" label="Land Preserved" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROJECT SNAPSHOT ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-6">
                Project Summary
              </h2>
              <div className="prose prose-lg text-neutral-600 space-y-4">
                <p>
                  <strong>Abundancia</strong> is a mixed-use regenerative community designed to prove that profitable real estate development and ecological regeneration amplify each other. Built with hempcrete — carbon-negative, fire-resistant homes that last 500+ years — the community integrates renewable energy, water security, food forests, and sacred spaces.
                </p>
                <p>
                  Located on 376 acres in Cedar Creek, Bastrop County, the project benefits from Austin&apos;s explosive growth (50-60K new residents/year), no zoning restrictions, agricultural exemption, and Texas hempcrete building codes. Four diversified revenue streams across residential sales, rental income, lot sales, and commercial leasing provide financial resilience.
                </p>
                <p>
                  The $12.5M capital raise funds the complete vision — land acquisition, Phase 1 construction, retreat center launch, and infrastructure. Revenue generation begins in Phase 1 through retreat operations and first home sales. LP-favorable waterfall with 8% preferred return and full capital return priority.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/data-room"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-50 text-primary-700 font-accent font-semibold text-sm hover:bg-primary-100 transition-colors group"
                >
                  <FileText className="w-4 h-4" />
                  Explore the Data Room
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ UNIT MIX ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
                Unit Mix
              </h2>
              <p className="text-sm text-neutral-500 font-accent">Click any row for details</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="font-accent text-sm font-semibold text-neutral-900 text-left py-3 px-3">Type</th>
                    <th className="font-accent text-sm font-semibold text-neutral-900 text-right py-3 px-3">Units</th>
                    <th className="font-accent text-sm font-semibold text-neutral-900 text-right py-3 px-3">Avg Price</th>
                    <th className="font-accent text-sm font-semibold text-neutral-900 text-right py-3 px-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {UNIT_MIX.filter((u) => u.avgPrice > 0).map((unit) => (
                    <tr
                      key={unit.type}
                      className="border-b border-neutral-100 cursor-pointer hover:bg-primary-50/50 transition-colors"
                      onClick={() => setActiveModal(`unit-${unit.type}`)}
                    >
                      <td className="font-accent text-sm text-neutral-900 py-3 px-3">
                        <span className="underline decoration-dotted decoration-neutral-300 underline-offset-4">
                          {unit.type}
                        </span>
                      </td>
                      <td className="text-sm text-neutral-600 text-right py-3 px-3">{unit.count}</td>
                      <td className="text-sm text-neutral-600 text-right py-3 px-3">
                        ${(unit.avgPrice / 1000).toFixed(0)}K
                      </td>
                      <td className="font-accent text-sm font-semibold text-primary-700 text-right py-3 px-3">
                        ${((unit.count * unit.avgPrice) / 1_000_000).toFixed(1)}M
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ UNIT MIX MODALS ═══ */}
      {UNIT_MIX.filter((u) => u.avgPrice > 0).map((unit) => {
        const details = UNIT_DETAILS[unit.type]
        if (!details) return null
        return (
          <Modal
            key={unit.type}
            open={activeModal === `unit-${unit.type}`}
            onClose={() => setActiveModal(null)}
            title={unit.type}
          >
            <div className="space-y-5">
              <p className="text-neutral-600 leading-relaxed">{details.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-canvas-subtle p-4">
                  <div className="font-accent text-xs text-neutral-500 uppercase tracking-wider mb-1">Price Range</div>
                  <div className="font-display text-lg font-bold text-primary-800">{details.priceRange}</div>
                </div>
                <div className="rounded-xl bg-canvas-subtle p-4">
                  <div className="font-accent text-xs text-neutral-500 uppercase tracking-wider mb-1">Timeline</div>
                  <div className="font-display text-lg font-bold text-primary-800">{details.timeline}</div>
                </div>
                <div className="rounded-xl bg-canvas-subtle p-4">
                  <div className="font-accent text-xs text-neutral-500 uppercase tracking-wider mb-1">Units</div>
                  <div className="font-display text-lg font-bold text-primary-800">{unit.count}</div>
                </div>
                <div className="rounded-xl bg-canvas-subtle p-4">
                  <div className="font-accent text-xs text-neutral-500 uppercase tracking-wider mb-1">Avg Size</div>
                  <div className="font-display text-lg font-bold text-primary-800">
                    {unit.avgSF > 0 ? `${unit.avgSF.toLocaleString()} sq ft` : 'Varies'}
                  </div>
                </div>
              </div>

              <div>
                <div className="font-accent text-sm font-semibold text-neutral-900 mb-2">Target Buyer</div>
                <p className="text-sm text-neutral-600 leading-relaxed">{details.targetBuyer}</p>
              </div>

              <Link
                href="/story/community"
                className="inline-flex items-center gap-2 text-sm font-accent font-semibold text-primary-700 hover:text-primary-500 transition-colors"
                onClick={() => setActiveModal(null)}
              >
                Explore Community Spaces
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Modal>
        )
      })}

      {/* ═══ KEY INVESTMENT HIGHLIGHTS ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">For Investors</span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
                Key Investment Highlights
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {INVESTMENT_HIGHLIGHTS.map((item) => (
              <StaggerItem key={item.modalKey}>
                <div
                  onClick={() => setActiveModal(item.modalKey)}
                  className="card p-6 h-full cursor-pointer hover:shadow-lg hover:border-primary-200 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary-50 flex items-center justify-center mb-4 group-hover:bg-secondary-100 transition-colors">
                    <item.icon className="w-6 h-6 text-secondary-600" />
                  </div>
                  <h3 className="font-accent text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.brief}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 text-xs font-accent font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ INVESTMENT HIGHLIGHT MODALS ═══ */}
      {INVESTMENT_HIGHLIGHTS.map((item) => (
        <Modal
          key={item.modalKey}
          open={activeModal === item.modalKey}
          onClose={() => setActiveModal(null)}
          title={item.title}
        >
          <div className="space-y-5">
            <p className="text-neutral-600 leading-relaxed whitespace-pre-line">{item.detail}</p>
            <Link
              href={item.link}
              className="inline-flex items-center gap-2 text-sm font-accent font-semibold text-primary-700 hover:text-primary-500 transition-colors"
              onClick={() => setActiveModal(null)}
            >
              {item.linkLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Modal>
      ))}

      {/* ═══ QUICK LINKS ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
                Explore Further
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { label: 'Vision & Story', href: '/story/vision', description: 'The thesis and guiding principles' },
              { label: 'The Land', href: '/story/land', description: '376 acres in Cedar Creek, TX' },
              { label: 'Business Model', href: '/model', description: 'Revenue streams and projections' },
              { label: 'Meet the Team', href: '/team', description: 'Leadership and partners' },
              { label: 'Data Room', href: '/data-room', description: 'Full documents and due diligence' },
              { label: 'FAQ', href: '/faq', description: 'Common questions answered' },
            ].map((link) => (
              <StaggerItem key={link.label}>
                <Link href={link.href} className="card p-5 block hover:shadow-lg transition-shadow group">
                  <h3 className="font-accent text-base font-semibold text-neutral-900 mb-1 group-hover:text-primary-700 transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-sm text-neutral-500">{link.description}</p>
                  <ArrowRight className="w-4 h-4 text-primary-500 mt-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-primary-800 py-20 md:py-28">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-white mb-6">
              Join the Movement
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Whether you&apos;re an investor, future resident, or simply believe in regenerative living — your journey starts here.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/invest/apply" className="btn-accent btn-lg rounded-2xl text-base">
                Join Investor Waitlist
              </Link>
              <Link href="/waitlist" className="btn-primary-light btn-lg rounded-2xl text-base group">
                Join Resident Waitlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
