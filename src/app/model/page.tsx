'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { Modal } from '@/components/ui/Modal'
import { ScenarioToggle } from '@/components/ui/ScenarioToggle'
import { useScenario } from '@/lib/context/scenario-context'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { ArrowRight, ExternalLink } from 'lucide-react'
import {
  KEY_METRICS,
  UNIT_MIX,
  REVENUE_STREAMS,
  REVENUE_BY_YEAR,
  USE_OF_FUNDS,
  WATERFALL,
} from '@/lib/data/financials'

// ═══════════════════════════════════════════════════════════════════════════
// Extended Data for Modals
// ═══════════════════════════════════════════════════════════════════════════

const REVENUE_STREAM_DETAILS: Record<string, string> = {
  'Residential Sales': 'Residential sales represent 84% of total 10-year revenue at $362M. The product mix includes: 100 Single-Family Homes (1-7 bedrooms), 350 Multifamily Condos, and 60 Special Residential Units (tiny homes, domes, and other distinctive structures). All structures use hempcrete or other approved regenerative materials such as rammed earth. Absorption is concentrated in years 2-5, with the full buildout completing by year 5. Risk factors: interest rate sensitivity, Austin market correction, construction cost inflation (mitigated by hempcrete\'s stable material costs).',
  'Rental Income': 'Rental income totals $43.6M over 10 years from 75 rental multifamily condos ($90/night avg, $11M), 50 special rental units ($200/night avg, $23M), and 1 event center ($4,000/night avg, $9M). The retreat center — combining the event center and special rental units — generates $33M over 10 years. Additionally, 60 STR units are investor-owned. This is a recurring revenue stream that continues beyond the 10-year model. Risk factors: short-term rental regulation changes (mitigated by Bastrop County\'s permissive STR policies), occupancy rate assumptions.',
  'Lot Sales': 'Lot sales contribute $15.4M from 100 improved lots sold to qualified builders and individual owners. Lots range from .25 to 1 acre with full infrastructure (roads, water, power, fiber). Lot sales serve two strategic purposes: (1) immediate capital recycling — lots can be sold before homes are built, accelerating cash flow; (2) expanding the community without proportional construction capital. Buyers must comply with Abundancia\'s architectural guidelines and sustainability standards, ensuring hempcrete or approved regenerative building methods, renewable energy, and design harmony.',
  'Commercial Leasing': 'Commercial leasing generates $7.8M over 10 years from 10 commercial units and 11 community amenity spaces within the community. Planned tenants: organic grocery/market, farm-to-table restaurant(s), wellness retail, coworking space, childcare center, and professional services. Additionally, 8 park and recreation areas provide community value. Revenue ramps from year 5 as commercial spaces are built and the residential population reaches critical mass. The village center is designed to be a destination — not just for residents but for the broader Bastrop County community.',
}

const UNIT_DETAILS: Record<string, string> = {
  'Single-Family Homes': 'Target buyer: established families and professionals (35-55, HHI $150K+) seeking a primary residence in a regenerative community. 100 single-family residential homes ranging from 1-bedroom to 7-bedroom configurations, with an average of 2,475 SF on .25-1 acre lots. Construction uses hempcrete or other approved regenerative materials such as rammed earth. Hempcrete homes offer R-30+ insulation, fire resistance, carbon-negative material footprint, and superior indoor air quality — premium features that command premium pricing.',
  'Multifamily': 'Target buyer: young families, couples, and individuals (28-45, HHI $80K-$120K) seeking community-oriented living at attainable price points. 350 multifamily condo units averaging 986 SF each. Multifamily represents the highest unit count and the bulk of residential revenue. Buildings feature shared amenities (rooftop gardens, communal kitchens, play areas), hempcrete construction throughout, and solar-standard energy. This product type enables density that supports commercial viability while maintaining the regenerative ethos.',
  'Special Residential': '60 special residential units — unique, compact living spaces including tiny homes, domes, and other distinctive structures averaging 324 SF. These are architecturally adventurous designs that serve as signature elements of Abundancia — visually distinctive and highly energy efficient. They generate significant social media and press attention, serving as both homes and marketing assets.',
  'Rental Multifamily': '75 rental multifamily condo units held by the development for recurring income. These units averaging 997 SF provide stable recurring revenue through both short-term and long-term rentals. Target guests: wellness retreat attendees, corporate retreat groups, and long-term renters who want to "try before they buy." Rental units serve as the community\'s accommodation infrastructure.',
  'Special Rental': '50 special rental units — unique stays including regenerative tiny homes and domes designed for the retreat and short-term rental market at an average of $200/night. These development-owned units, along with 60 STR investor-owned units, form the guest accommodation backbone of Abundancia\'s retreat center. Combined with the event center, the retreat center generates $33M over 10 years.',
  'Event Center': 'The event center is a 6,000 SF venue generating $9M over 10 years at $4,000/night average. It hosts weddings, corporate retreats, music events, wellness workshops, and community festivals. Together with the 50 special rental units, this forms the retreat center — generating $33M over 10 years and serving as the community\'s front door for potential buyers and brand awareness.',
  'Lots': 'Target buyer: custom home builders and individuals who want to design their own home within the community framework using hempcrete or other approved regenerative materials. 100 lots ranging from .25 to 1 acre with all infrastructure (roads, water/septic, electricity, solar hookup, fiber internet). Buyers must comply with Abundancia architectural guidelines. Lot sales are capital-efficient — no construction required — and generate $15M+ over the 10-year model.',
}

const USE_OF_FUNDS_DETAILS: Record<string, string> = {
  'Land Acquisition': 'The land acquisition budget of $3,945,000 (32%) covers the purchase of 380 acres in Bastrop County, Texas — approximately 30 minutes from downtown Austin. Due diligence costs include environmental assessments, ALTA survey, hydrology study and water resource assessment, habitat compliance study, geotechnical borings, and legal/closing costs. The property includes existing structures that will be repurposed for Phase 1 retreat operations.',
  'Hard Costs': 'Hard costs of $1,798,304 (14%) cover Phase 1 construction. Hempcrete and other approved regenerative material construction costs provide a margin advantage over conventional construction in the Austin market. This cost advantage is a key margin driver. Construction financing for subsequent phases is self-funded from sales revenue.',
  'Site Work': 'Site work of $1,761,323 (14%) covers the foundational infrastructure that enables Phase 1 and sets up Phase 2: internal road network, water well drilling and distribution, septic systems, electrical grid connection and solar array installation, fiber optic backbone, and grading/drainage. The MUD (Municipal Utility District) petition, once approved, enables bond financing for future infrastructure — meaning this initial investment unlocks significantly larger infrastructure capacity without additional equity capital.',
  'Master Planning & Architecture': 'Master planning and architecture of $1,340,596 (11%) covers the comprehensive design and permitting work: master site plan by Symbiosis TX, permaculture design and food forest layout, architectural design for all housing types by Inphinity Design Architects, MEP engineering, landscape architecture, MUD petition and entitlement legal work, and municipal permitting. This investment produces the IP — the replicable design templates that are part of Abundancia\'s long-term value as a model for regenerative communities worldwide.',
  'Staffing, Ops & Marketing': 'Staffing, operations, and marketing of $1,400,771 (11%) funds the team and go-to-market efforts. The team includes the New Earth Development leadership, construction management, sales and marketing, retreat center operations, and community management. Marketing covers pre-sales, brand building, social media, PR, events, and real estate partnerships. The retreat center provides organic marketing — every guest is a potential buyer or referral source.',
  'Contingency & Carry Costs': 'The $2,227,007 contingency and carry costs reserve (18% of total raise) provides a substantial buffer against cost overruns, market shifts, and timeline delays. Industry standard for development projects is 10-15% contingency; Abundancia\'s 18% reflects conservative underwriting. Additionally, we have $10M in equity left in the round to be placed in a secured interest credit account for debt servicing. If contingency is not used, it converts to additional construction capital, accelerating the buildout timeline.',
}

const WATERFALL_DETAILS: Record<string, string> = {
  'Tier 1 — Return of Capital': 'Initial sales will be used to fund development efforts up to the approved budget, plus a 10% reserve. Proceeds are distributed 80% to LP and 20% to GP until the investors\' principal has been fully repaid. This first tier ensures investor capital is protected from day one. In the base case model, return of capital is projected to begin in year 2 and complete by year 4-5. This is standard LP-favorable structuring for real estate private equity.',
  'Tier 2 — 12% IRR': 'Once Tier 1 is complete and investors have received their capital back, Tier 2 is reached at a 12% IRR to LP. At this level, profits are distributed 70% to LP and 30% to GP. The GP begins to participate more meaningfully in the upside. The base case projects a 37.12% IRR and 4.42x equity multiple, meaning this tier is reached relatively early in the distribution timeline.',
  'Tier 3 — 15% IRR': 'Tier 3 is reached at a 15% IRR to LP. At this level, profits are distributed 60% to LP and 40% to GP. The increasing GP share at higher return levels rewards the management team for outperformance while still ensuring the majority of profits flow to investors. In the base case (4.42x), this entire tier is distributed, with substantial profits flowing in years 5-8.',
  'Tier 4 — 18% IRR': 'Tier 4 is reached at an 18% IRR to LP. At this level, profits are distributed 50% to LP and 50% to GP until the agreed term is reached. The 50/50 split provides strong incentive for the GP to maximize long-term value creation. In the base case (4.42x), significant distributions fall in this tier. This is where the project\'s true upside is realized — and investors still receive 50 cents of every dollar. The 5-10 year term with projected $428M revenue and $328M pre-tax expenses underpins the projected 37.12% IRR.',
}

// ═══════════════════════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════════════════════

function MetricCard({ target, prefix, suffix, label, decimals = 0 }: {
  target: number
  prefix?: string
  suffix?: string
  label: string
  decimals?: number
}) {
  const { count, ref } = useAnimatedCounter({ target, decimals })

  return (
    <div ref={ref} className="card p-4 sm:p-6 text-center">
      <div className="font-display text-lg sm:text-2xl md:text-3xl font-bold text-primary-800 mb-1">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="font-accent text-sm text-neutral-600">{label}</div>
    </div>
  )
}

function RevenueBar({ name, value, maxValue, color, onClick }: {
  name: string
  value: number
  maxValue: number
  color: string
  onClick: () => void
}) {
  const percentage = (value / maxValue) * 100
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 w-full hover:bg-primary-50/50 rounded-lg px-2 py-1 -mx-2 transition-colors cursor-pointer group"
    >
      <div className="w-40 flex-shrink-0 text-left">
        <span className="font-accent text-sm text-neutral-700 group-hover:text-primary-800 underline decoration-neutral-300 underline-offset-2 group-hover:decoration-primary-400 transition-colors">{name}</span>
      </div>
      <div className="flex-1 bg-neutral-100 rounded-full h-6 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        >
          {percentage > 15 && (
            <span className="font-accent text-xs font-semibold text-white">
              ${(value / 1_000_000).toFixed(1)}M
            </span>
          )}
        </div>
      </div>
      {percentage <= 15 && (
        <span className="font-accent text-xs text-neutral-500">
          ${(value / 1_000_000).toFixed(1)}M
        </span>
      )}
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

type ModalContent = {
  title: string
  body: string
  link?: { href: string; label: string }
} | null

export default function ModelPage() {
  const { scenario } = useScenario()
  const [modal, setModal] = useState<ModalContent>(null)
  const metrics = KEY_METRICS[scenario]
  const streams = REVENUE_STREAMS[scenario]
  const yearData = REVENUE_BY_YEAR[scenario]
  const maxRevenue = Math.max(...yearData.map((d) => d.revenue))

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Business Model</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-6xl text-neutral-900 mb-6 max-w-4xl">
              Regenerative Is Profitable
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed mb-8">
              $12.5M capital raise targeting {metrics.irr}% IRR with a {metrics.emx}x equity multiple over a 5-10 year term. Four diversified revenue streams. Conservation-forward design that improves — not compromises — returns.
            </p>
            <ScenarioToggle />
          </FadeIn>
        </div>
      </section>

      {/* ═══ KEY METRICS ═══ */}
      <section className="py-12 md:py-16 bg-canvas">
        <div className="section-container">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StaggerItem>
              <MetricCard target={metrics.irr} suffix="%" label="Projected IRR" decimals={1} />
            </StaggerItem>
            <StaggerItem>
              <MetricCard target={metrics.emx} suffix="x" label="Equity Multiple" decimals={2} />
            </StaggerItem>
            <StaggerItem>
              <MetricCard target={metrics.revenue10yr / 1_000_000} prefix="$" suffix="M" label="10-Year Revenue" />
            </StaggerItem>
            <StaggerItem>
              <MetricCard target={metrics.ebitda10yr / 1_000_000} prefix="$" suffix="M" label="10-Year EBITDA" />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ REVENUE STREAMS ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <span className="eyebrow mb-3 block">Revenue Streams</span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
                Four Diversified Income Sources
              </h2>
              <p className="text-lg text-neutral-600">
                Revenue is not dependent on any single source. Residential sales drive the majority, with rental income, lot sales, and commercial leasing providing recurring and supplementary streams.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl space-y-4">
              {streams.map((stream) => (
                <RevenueBar
                  key={stream.name}
                  name={stream.name}
                  value={stream.value}
                  maxValue={streams[0].value}
                  color={stream.color}
                  onClick={() => setModal({
                    title: stream.name,
                    body: REVENUE_STREAM_DETAILS[stream.name] || '',
                    link: { href: '/data-room/view/financial/financial-projections', label: 'View Full Financial Projections' },
                  })}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ UNIT ECONOMICS ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <FadeIn>
            <div className="mb-14">
              <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                Unit Economics
              </span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-4">
                Product Mix & Pricing
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="font-accent text-sm font-semibold text-white/80 text-left py-4 px-3">Type</th>
                    <th className="font-accent text-sm font-semibold text-white/80 text-right py-4 px-3">Units</th>
                    <th className="font-accent text-sm font-semibold text-white/80 text-right py-4 px-3">Avg Price</th>
                    <th className="font-accent text-sm font-semibold text-white/80 text-right py-4 px-3">Avg SF</th>
                    <th className="font-accent text-sm font-semibold text-white/80 text-right py-4 px-3">Total Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {UNIT_MIX.map((unit) => (
                    <tr
                      key={unit.type}
                      onClick={() => setModal({
                        title: unit.type,
                        body: UNIT_DETAILS[unit.type] || '',
                        link: { href: '/data-room/view/financial/unit-economics', label: 'View Full Unit Economics' },
                      })}
                      className="border-b border-white/10 hover:bg-white/5 cursor-pointer transition-colors group"
                    >
                      <td className="font-accent text-sm text-white py-4 px-3 underline decoration-white/30 underline-offset-2 group-hover:decoration-secondary-400 transition-colors">{unit.type}</td>
                      <td className="text-sm text-white/70 text-right py-4 px-3">{unit.count}</td>
                      <td className="text-sm text-white/70 text-right py-4 px-3">
                        {unit.avgPrice > 0
                          ? `$${(unit.avgPrice / 1000).toFixed(0)}K`
                          : unit.avgNightly > 0
                            ? `$${unit.avgNightly.toLocaleString()}/night`
                            : '—'}
                      </td>
                      <td className="text-sm text-white/70 text-right py-4 px-3">
                        {unit.avgSF > 0 ? `${unit.avgSF.toLocaleString()} SF` : '—'}
                      </td>
                      <td className="font-accent text-sm font-semibold text-secondary-400 text-right py-4 px-3">
                        {unit.avgPrice > 0
                          ? `$${((unit.count * unit.avgPrice) / 1_000_000).toFixed(1)}M`
                          : unit.revenue10yr > 0
                            ? `$${(unit.revenue10yr / 1_000_000).toFixed(1)}M`
                            : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ REVENUE BY YEAR ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
              <div>
                <span className="eyebrow mb-3 block">10-Year Projection</span>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900">
                  Revenue & EBITDA
                </h2>
              </div>
              <ScenarioToggle />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-3">
              {yearData.map((d) => (
                <div key={d.year} className="flex items-center gap-4">
                  <div className="w-12 flex-shrink-0 font-accent text-sm font-semibold text-neutral-500">
                    Yr {d.year}
                  </div>
                  <div className="flex-1 flex gap-1">
                    <div
                      className="bg-primary-600 h-8 rounded-l-lg flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${(d.revenue / maxRevenue) * 70}%` }}
                    >
                      <span className="font-accent text-xs text-white font-semibold">
                        ${(d.revenue / 1_000_000).toFixed(0)}M
                      </span>
                    </div>
                    <div
                      className={`h-8 rounded-r-lg flex items-center justify-center transition-all duration-500 ${
                        d.ebitda >= 0 ? 'bg-secondary-500' : 'bg-red-400'
                      }`}
                      style={{ width: `${Math.max(Math.abs(d.ebitda) / maxRevenue * 70, 5)}%` }}
                    >
                      <span className="font-accent text-xs text-white font-semibold">
                        {d.ebitda >= 0 ? '' : '-'}${Math.abs(d.ebitda / 1_000_000).toFixed(0)}M
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-primary-600" />
                <span className="font-accent text-xs text-neutral-500">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-secondary-500" />
                <span className="font-accent text-xs text-neutral-500">EBITDA</span>
              </div>
            </div>
          </FadeIn>

          {/* Data Room Callout */}
          <FadeIn delay={0.3}>
            <Link
              href="/data-room/view/financial/financial-projections"
              className="mt-10 flex items-center justify-between p-6 rounded-2xl bg-primary-50 border border-primary-100 hover:border-primary-300 hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <h3 className="font-display text-lg text-primary-900 mb-1">Complete Financial Model</h3>
                <p className="text-sm text-neutral-600">View the complete 10-year financial model with detailed assumptions in the Data Room</p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ USE OF FUNDS ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">$12.5M Capital Raise</span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
                Use of Funds
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {USE_OF_FUNDS.map((fund) => (
              <StaggerItem key={fund.name}>
                <button
                  onClick={() => setModal({
                    title: `Use of Funds: ${fund.name}`,
                    body: USE_OF_FUNDS_DETAILS[fund.name] || '',
                    link: { href: '/data-room/view/property/construction-budget', label: 'View Construction Budget' },
                  })}
                  className="card p-5 text-center w-full hover:shadow-lg hover:border-primary-200 transition-all duration-300 cursor-pointer group"
                >
                  <div className="font-display text-3xl font-bold mb-1" style={{ color: fund.color }}>
                    {fund.percentage}%
                  </div>
                  <h3 className="font-accent text-sm font-semibold text-neutral-900 mb-1">
                    {fund.name}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    ${(fund.value / 1_000_000).toFixed(2)}M
                  </p>
                  <span className="inline-flex items-center gap-1 mt-2 font-accent text-[10px] font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    View breakdown <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ WATERFALL DISTRIBUTION ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                Investor Returns
              </span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-4">
                Waterfall Distribution
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                LP-favorable structure with IRR-based tier progression. Investors recover their capital first, with proceeds distributed 80/20 until principal is repaid.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-2xl mx-auto space-y-3">
              {WATERFALL.map((tier) => (
                <button
                  key={tier.tier}
                  onClick={() => setModal({
                    title: `Waterfall: ${tier.tier}`,
                    body: WATERFALL_DETAILS[tier.tier] || '',
                    link: { href: '/data-room/view/investment/operating-agreement', label: 'View Operating Agreement' },
                  })}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 w-full text-left hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-accent text-sm font-semibold text-white">{tier.tier}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-accent text-xs text-white/50">{tier.threshold}</span>
                      <ArrowRight className="w-3 h-3 text-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="flex h-6 rounded-full overflow-hidden">
                    <div
                      className="bg-secondary-500 flex items-center justify-center transition-all duration-500"
                      style={{ width: `${tier.lpSplit}%` }}
                    >
                      <span className="font-accent text-xs font-semibold text-white">
                        LP {tier.lpSplit}%
                      </span>
                    </div>
                    {tier.gpSplit > 0 && (
                      <div
                        className="bg-primary-600 flex items-center justify-center transition-all duration-500"
                        style={{ width: `${tier.gpSplit}%` }}
                      >
                        <span className="font-accent text-xs font-semibold text-white">
                          GP {tier.gpSplit}%
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-primary-800 py-20 md:py-28">
        <div className="section-container text-center">
          <FadeIn>
            <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-4 block">
              Take the Next Step
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-white mb-6">
              Join the $12.5M Capital Raise
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Accredited investors are invited to participate in a generational opportunity — regenerative development with institutional-grade returns.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/invest/apply" className="btn-accent btn-lg rounded-2xl text-base">
                Join Investor Waitlist
              </Link>
              <Link href="/expansion" className="btn-secondary-light btn-lg rounded-2xl text-base group">
                View Development Phases
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ MODAL ═══ */}
      <Modal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal?.title}
        size="md"
      >
        {modal && (
          <div>
            <p className="text-neutral-600 leading-relaxed mb-6">{modal.body}</p>
            {modal.link && (
              <Link
                href={modal.link.href}
                className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {modal.link.label}
              </Link>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
