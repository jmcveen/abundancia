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
  INVESTMENT_DISCLAIMER,
  KEY_METRICS,
  RETURNS_RANGE,
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
  'Residential Sales': 'In Phase 1, residential sales are the 60 micro villas (about 324 SF each, averaging about $141,520), projected at $8.86M and sold in Year 2. The single-family homes, luxury estates and condominiums come in later phases and are not part of the Phase 1 offering.',
  'Rental & Hospitality': 'The largest Phase 1 stream: $41.49M over 10 years in the base case. It comes from 60 nature-stay units (20 glamping tents, 15 geodesic domes, 5 high-end domes, 10 creekside camping sites and 10 Regen Villas) plus the 6,000 SF retreat and event residence. Revenue starts in Year 2 and grows steadily after that.',
  'Lot Sales': '$10.82M from 80 estate lots in Phase 1, at about $150,000 each, sold across Years 2 and 3. Lots range from a quarter acre to one acre with roads, water, power and fiber in place. The remaining 20 lots come in Phase 2.',
  'Commercial Leasing': '$2.39M over 10 years from the Phase 1 commercial and community spaces, starting in Year 2 and rising each year as the community grows.',
}

const UNIT_DETAILS: Record<string, string> = {
  'Single-Family Homes (standard)': '90 homes from one to five bedrooms, 1,000 to 3,000 SF, priced at about $450 per SF (an average near $950,000). Built in Phase 2 in a strict cheapest-first order: entry homes, then family homes, then five-bedroom homes. Not part of the Phase 1 offering.',
  'Luxury Estate Homes': '10 estate homes of five to seven bedrooms, 3,500 to 5,500 SF, priced from about $2.1M to $3.3M. They are built last, against proven demand. Not part of the Phase 1 offering.',
  'Condominiums (for sale)': '200 condominiums averaging about 888 SF and about $399,000 each. Planned for Phase 3. Not part of the Phase 1 offering.',
  'Rental Condominiums': '75 condominiums kept as rentals for recurring income, about 997 SF each. Planned for Phase 3. Not part of the Phase 1 offering.',
  'Micro Villas (for sale)': '60 micro villas of about 324 SF, averaging about $141,520 each, for $8.86M in Year 2 sales. They are the first homes built and an attainable path to owning inside the community.',
  'Regen Villas, Domes & Glamping': '60 nature-stay units: 20 glamping tents, 15 geodesic domes, 5 high-end domes, 10 creekside camping sites and 10 Regen Villas. Each Regen Villa is built from a different natural building system through hands-on workshops. Together with the event residence they generate $41.49M over 10 years in the base case.',
  'Retreat & Event Center': 'A 6,000 SF retreat and event residence for weddings, retreats and gatherings, at about $4,000 per night (roughly $1.46M a year at stabilization).',
  'Residential Lots': '100 estate lots of a quarter acre to one acre, at about $150,000 each. 80 are sold in Phase 1 across Years 2 and 3, and 20 in Phase 2.',
}

const USE_OF_FUNDS_DETAILS: Record<string, string> = {
  'Land Acquisition': '$3,505,253: securing the 380-acre site in Bastrop County with 40% down on the $6.5M purchase price, closing costs, and the first year of payments on the $3.9M land loan.',
  'Amenities & Commercial': '$3,212,500: the community core that opens in Year 1, including the Community Center, the Wellness & Longevity Center, and the parks and recreation areas.',
  'Site Work': '$2,013,097: roads, water, power, fiber and the regenerative systems everything else depends on, front-loaded so later phases build onto finished ground.',
  'Operational Expenses': '$1,466,240: the team, the operating costs of a live site, and the marketing that turns the 10,000-person interest list into Phase 1 buyers.',
  'Rentals (construction)': '$1,416,574: building the nature-stay portfolio that opens in 2028, the Phase 1 revenue engine, including the ten Regen Villas built through natural-building workshops.',
  'Soft Costs': '$1,220,936: due diligence, master planning, architecture and engineering, and the permitting and legal work that clears the way to build.',
  'Contingency (10%)': '$1,283,460: a 10% contingency on the Year 1 program, held against cost overruns and delays.',
  'Construction Debt Carry (Yr 1 P&I)': '$1,173,539: the first year of principal and interest on the $7.7M construction loan, funded from the raise.',
  'Reserve carried into Year 2': '$647,473: what remains of the $15.9M after every Year 1 use, held as a cash reserve going into Year 2.',
}

const WATERFALL_DETAILS: Record<string, string> = {
  'Preferred Return + Return of Capital': 'All distributions go to the equity class until investors have received a 10% cumulative preferred return and their full capital back. In the base case, LP capital is fully returned by Year 3.',
  'Tier 1 — below 12% LP IRR': 'After a GP catch-up, remaining cash is split 90% to investors and 10% to the GP while the LP IRR is below 12%.',
  'Tier 2 — 12% to 15% LP IRR': 'Between a 12% and 15% LP IRR, cash is split 80% to investors and 20% to the GP.',
  'Tier 3 — 15% to 18% LP IRR': 'Between a 15% and 18% LP IRR, cash is split 70% to investors and 30% to the GP.',
  'Tier 4 — above 18% LP IRR': 'Above an 18% LP IRR, cash is split 60% to investors and 40% to the GP, uncapped. Both Elections reach this tier in the base case (26.0% LP IRR under Election A, 34.8% under Election B), and investors still keep the majority of all distributions: 70.3% under Election A and 61.2% under Election B.',
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
              $15.9M Phase 1 capitalization. Base-case LP returns over a 10-year hold: {RETURNS_RANGE.irrLow.toFixed(1)}% IRR and {RETURNS_RANGE.emxLow.toFixed(2)}x under Election A, {RETURNS_RANGE.irrHigh.toFixed(1)}% IRR and {RETURNS_RANGE.emxHigh.toFixed(2)}x under Election B. Four diversified revenue streams. Conservation-forward design that improves, not compromises, returns.
            </p>
            <p className="mb-8 font-accent text-xs uppercase tracking-[0.14em] text-secondary-600">
              {INVESTMENT_DISCLAIMER}
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
              <MetricCard target={metrics.irr} suffix="%" label="LP IRR (Election A)" decimals={1} />
            </StaggerItem>
            <StaggerItem>
              <MetricCard target={metrics.emx} suffix="x" label="Equity Multiple (Election A)" decimals={2} />
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
                  maxValue={Math.max(...streams.map((s) => s.value))}
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
              <span className="eyebrow mb-3 block">$15.9M Capital Raise</span>
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
                LP-favorable structure with IRR-based tier progression. Investors recover their capital first, with 100% of distributions going to the equity class until capital and the 10% preferred return are repaid.
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
              Join the $15.9M Capital Raise
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Accredited investors are invited to participate in a generational opportunity - regenerative development with institutional-grade returns.
            </p>
            <p className="font-accent text-xs uppercase tracking-[0.14em] text-secondary-300 mb-10">
              {INVESTMENT_DISCLAIMER}
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
