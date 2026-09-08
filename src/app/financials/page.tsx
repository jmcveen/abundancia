'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { AuthGate } from '@/components/auth/AuthGate'
import { Modal } from '@/components/ui/Modal'
import { ScenarioToggle } from '@/components/ui/ScenarioToggle'
import { useScenario } from '@/lib/context/scenario-context'
import { ArrowRight, ExternalLink, Info } from 'lucide-react'
import {
  INVESTMENT_DISCLAIMER,
  KEY_METRICS,
  REVENUE_BY_YEAR,
  SCENARIO_BASIS,
  USE_OF_FUNDS,
  ELECTIONS,
  NOTE_TERMS,
  type ElectionKey,
  WATERFALL,
  REVENUE_STREAMS,
} from '@/lib/data/financials'

// ═══════════════════════════════════════════════════════════════════════════
// Modal Content Data
// ═══════════════════════════════════════════════════════════════════════════

const METRIC_EXPLANATIONS: Record<string, { title: string; body: string; methodology: string }> = {
  revenue10yr: {
    title: '10-Year Cumulative Revenue',
    body: 'Total gross PHASE-1 revenue across the four revenue streams over the ten-year term: residential sales, rental and hospitality income, lot sales, and commercial leasing. Phase 1 is the scope funded by this offering and does not depend on later phases proceeding.',
    methodology: 'Calculated by summing annual revenue projections from the financial model, which uses absorption-rate assumptions for unit sales, occupancy rates for rentals, and market-rate escalators for pricing.',
  },
  ebitda10yr: {
    title: '10-Year Cumulative EBITDA',
    body: 'Phase-1 earnings before interest, taxes, depreciation and amortization over the ten-year hold. This is operating profitability before capital structure — it is identical under both Elections, which is why the Election choice changes returns without changing the underlying business.',
    methodology: 'Derived from revenue minus operating expenses (construction costs, staffing, marketing, property management, insurance, and maintenance). Does not include debt service or depreciation.',
  },
  emx: {
    title: 'LP Equity Multiple (EMx)',
    body: 'The total return on invested capital for Limited Partners. An EMx of 2.449x means every $1 invested returns $2.449 in total distributions over the life of the investment. Phase 1 models 2.449x under Election A and 3.655x under Election B.',
    methodology: 'Total LP distributions divided by total LP capital contributions, under a 10% cumulative preferred return plus return of capital, a GP catch-up, then a residual split that moves 90/10, 80/20, 70/30 and 60/40 as the LP IRR passes 12%, 15% and 18%.',
  },
  irr: {
    title: 'LP Internal Rate of Return (IRR)',
    body: 'The annualized rate of return for Limited Partners, accounting for the timing of cash flows. IRR captures not just how much you earn, but how quickly capital is returned.',
    methodology: 'Computed using discounted cash flow analysis on projected LP distributions by quarter, reflecting the waterfall structure, construction timeline, and phased unit delivery.',
  },
}

const FUND_DETAILS: Record<string, { description: string; lineItems: { item: string; amount: string }[] }> = {
  'Land Acquisition': {
    description: 'Securing the 376-acre site in Cedar Creek, Bastrop County: $6,500,000 purchase price at 40% down, closing costs, and the first year of land-loan service on the $3,900,000 balance.',
    lineItems: [
      { item: 'Down Payment (40% of $6,500,000)', amount: '$2,600,000' },
      { item: 'Closing Costs (5%)', amount: '$325,000' },
      { item: 'Year-1 Land Loan Service ($3.9M @ 8%)', amount: '$580,253' },
    ],
  },
  'Nature-Stay & Rental Build': {
    description: 'The 60-unit nature-stay portfolio that opens in 2028 — the Phase-1 revenue engine and the top of the ownership funnel, including the ten Regen Villas built through natural-building workshops.',
    lineItems: [
      { item: 'Glamping tents, domes & camping sites (50)', amount: 'included' },
      { item: 'Regen Villas — 10 material systems', amount: 'included' },
      { item: 'Total nature-stay build (14,946 SF)', amount: '$2,186,574' },
    ],
  },
  'Amenities & Commercial': {
    description: 'The community core that opens in Year 1: the Community Center, the Wellness & Longevity Center, and the parks and recreation areas woven through the site.',
    lineItems: [
      { item: 'Community Center (5,000 SF)', amount: '$1,537,500' },
      { item: 'Wellness / Longevity Center & Spa (5,000 SF)', amount: '$1,537,500' },
      { item: 'Parks & Recreation Areas (8)', amount: '$120,002' },
    ],
  },
  'Site Work & Infrastructure': {
    description: 'Roads, water, power, fiber and the regenerative systems that everything else depends on — front-loaded so later phases build onto finished ground.',
    lineItems: [
      { item: 'Earthworks, roads, paths & gutters', amount: 'included' },
      { item: 'Water, wells, storage & filtration', amount: 'included' },
      { item: 'Power, fiber, biodigester wastewater', amount: 'included' },
      { item: 'Total Year-1 site work', amount: '$1,621,762' },
    ],
  },
  'Soft Costs (A&E, permits, DD)': {
    description: 'Due diligence, master planning, architecture and engineering, and the permitting and legal work that clears the way to build.',
    lineItems: [
      { item: 'Due Diligence (incl. hydrology & water feasibility)', amount: '$142,080' },
      { item: 'Master Planning & Consultants', amount: '$576,058' },
      { item: 'Architecture & Engineering', amount: '$275,333' },
      { item: 'Legal & Permits', amount: '$125,573' },
    ],
  },
  'Staffing, Ops & Marketing': {
    description: 'The team, the operating costs of a live site, and the marketing that converts the existing 10,000-person interest list into Phase-1 buyers.',
    lineItems: [
      { item: 'Staffing', amount: '$416,910' },
      { item: 'Marketing', amount: '$295,000' },
      { item: 'Taxes & Insurance', amount: '$231,000' },
      { item: 'Utilities & Sanitation', amount: '$147,869' },
      { item: 'Accounting & Capital Expenses', amount: '$108,800' },
    ],
  },
  'Contingency (10%)': {
    description: 'A 10% contingency applied across the Phase-1 program for cost escalation, timing, and the unforeseen. Phase 1 carries $3,649,484 of contingency across the full ten years.',
    lineItems: [
      { item: 'Year-1 contingency (10%)', amount: '$1,282,721' },
      { item: 'Phase-1 contingency, 10-year total', amount: '$3,649,484' },
    ],
  },
}

const WATERFALL_EXPLANATIONS: Record<string, { plain: string; example: string }> = {
  'Preferred Return + Return of Capital': {
    plain: 'Before the sponsor shares in any profit, LPs receive a 10% cumulative preferred return and then their full capital back. Under both Elections the model returns LP capital by Year 3.',
    example: 'If you invest $250,000, distributions flow entirely to the equity class until your 10% preference and your full $250,000 have been paid.',
  },
  'Tier 1 — below 12% LP IRR': {
    plain: 'After the preference and return of capital, and a GP catch-up, residual profit splits 90% LP / 10% GP while the LP IRR is still below 12%.',
    example: 'At this stage 90 cents of every additional dollar distributed goes to LPs.',
  },
  'Tier 2 — 12% to 15% LP IRR': {
    plain: 'Once the LP IRR passes 12%, the residual splits 80% LP / 20% GP until 15% is reached.',
    example: 'Between a 12% and 15% LP IRR, 80% of additional distributions flow to you as LP.',
  },
  'Tier 3 — 15% to 18% LP IRR': {
    plain: 'Between a 15% and 18% LP IRR the split moves to 70% LP / 30% GP, increasing the sponsor share as performance improves.',
    example: 'Once your return passes 15% IRR, 70% of additional distributions flow to you as LP.',
  },
  'Tier 4 — above 18% LP IRR': {
    plain: 'Above an 18% LP IRR the residual splits 60% LP / 40% GP, uncapped. Both Elections model into this band, and the LP class still retains the majority of total distributions — 70.3% under Election A, 61.2% under Election B.',
    example: 'Above 18% IRR, 60% of additional distributions flow to you as LP.',
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Room Link Component
// ═══════════════════════════════════════════════════════════════════════════

function DataRoomLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 font-accent text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors group"
    >
      {children}
      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  )
}

function DataRoomCallout({ href, label, description }: { href: string; label: string; description: string }) {
  return (
    <Link href={href} className="block">
      <div className="rounded-2xl border-2 border-dashed border-primary-200 bg-primary-50/50 hover:bg-primary-50 hover:border-primary-300 transition-all p-5 group cursor-pointer">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-accent text-sm font-semibold text-primary-800 mb-1">{label}</p>
            <p className="font-accent text-xs text-neutral-500">{description}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </div>
      </div>
    </Link>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════════════════════

function MetricCard({ target, prefix, suffix, label, decimals = 0, onClick }: {
  target: number; prefix?: string; suffix?: string; label: string; decimals?: number; onClick?: () => void
}) {
  const { count, ref } = useAnimatedCounter({ target, decimals })
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`card p-6 text-center ${onClick ? 'cursor-pointer hover:shadow-lg hover:border-primary-200 transition-all group' : ''}`}
    >
      <div className="font-display text-3xl md:text-4xl font-bold text-primary-800 mb-1">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="font-accent text-sm text-neutral-600 flex items-center justify-center gap-1">
        {label}
        {onClick && <Info className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary-600 transition-colors" />}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page Content (inside vault gate)
// ═══════════════════════════════════════════════════════════════════════════

function FinancialsContent() {
  const { scenario } = useScenario()
  const metrics = KEY_METRICS[scenario]
  const streams = REVENUE_STREAMS[scenario]
  const yearData = REVENUE_BY_YEAR[scenario]

  // Modal states
  const [metricModal, setMetricModal] = useState<string | null>(null)
  const [fundModal, setFundModal] = useState<string | null>(null)
  const [waterfallModal, setWaterfallModal] = useState<string | null>(null)

  return (
    <div>
      {/* ═══ Metric Modal ═══ */}
      <Modal
        open={metricModal !== null}
        onClose={() => setMetricModal(null)}
        title={metricModal ? METRIC_EXPLANATIONS[metricModal]?.title : ''}
        size="md"
      >
        {metricModal && METRIC_EXPLANATIONS[metricModal] && (
          <div className="space-y-5">
            <p className="text-neutral-700 leading-relaxed">
              {METRIC_EXPLANATIONS[metricModal].body}
            </p>
            <div className="bg-primary-50 rounded-xl p-4">
              <p className="font-accent text-xs font-semibold text-primary-800 uppercase tracking-wider mb-2">Methodology</p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {METRIC_EXPLANATIONS[metricModal].methodology}
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <DataRoomLink href="/data-room/view/financial/financial-projections">
                View Full Financial Model
              </DataRoomLink>
              <DataRoomLink href="/data-room/view/financial/sensitivity-analysis">
                View Sensitivity Analysis
              </DataRoomLink>
            </div>
          </div>
        )}
      </Modal>

      {/* ═══ Fund Modal ═══ */}
      <Modal
        open={fundModal !== null}
        onClose={() => setFundModal(null)}
        title={fundModal || ''}
        size="md"
      >
        {fundModal && FUND_DETAILS[fundModal] && (
          <div className="space-y-5">
            <p className="text-neutral-700 leading-relaxed">
              {FUND_DETAILS[fundModal].description}
            </p>
            <div className="space-y-2">
              <p className="font-accent text-xs font-semibold text-neutral-500 uppercase tracking-wider">Line-Item Breakdown</p>
              {FUND_DETAILS[fundModal].lineItems.map((li) => (
                <div key={li.item} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                  <span className="font-accent text-sm text-neutral-700">{li.item}</span>
                  <span className="font-accent text-sm font-semibold text-neutral-900">{li.amount}</span>
                </div>
              ))}
              <div className="flex items-center justify-between py-2 border-t-2 border-neutral-200">
                <span className="font-accent text-sm font-bold text-neutral-900">Total</span>
                <span className="font-accent text-sm font-bold text-primary-800">
                  ${(USE_OF_FUNDS.find(f => f.name === fundModal)!.value / 1_000_000).toFixed(2)}M
                </span>
              </div>
            </div>
            <div className="pt-2">
              <DataRoomLink href="/data-room/view/property/construction-budget">
                View Full Construction Budget
              </DataRoomLink>
            </div>
          </div>
        )}
      </Modal>

      {/* ═══ Waterfall Modal ═══ */}
      <Modal
        open={waterfallModal !== null}
        onClose={() => setWaterfallModal(null)}
        title={waterfallModal ? `${waterfallModal} - How It Works` : ''}
        size="md"
      >
        {waterfallModal && WATERFALL_EXPLANATIONS[waterfallModal] && (
          <div className="space-y-5">
            <p className="text-neutral-700 leading-relaxed">
              {WATERFALL_EXPLANATIONS[waterfallModal].plain}
            </p>
            <div className="bg-secondary-50 rounded-xl p-4">
              <p className="font-accent text-xs font-semibold text-secondary-700 uppercase tracking-wider mb-2">Example</p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {WATERFALL_EXPLANATIONS[waterfallModal].example}
              </p>
            </div>
            <div className="pt-2">
              <DataRoomLink href="/data-room/view/investment/operating-agreement">
                View Operating Agreement
              </DataRoomLink>
            </div>
          </div>
        )}
      </Modal>

      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Financial Analysis</span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-neutral-900 mb-6 max-w-4xl">
              Pro Forma & Returns
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed mb-8">
              Phase-1 projections for the $15,939,072 capital raise — the scope this offering funds. Toggle the scenarios to stress-test the operating assumptions, and compare the two Elections below.
            </p>
            <p className="mb-8 font-accent text-xs uppercase tracking-[0.14em] text-secondary-600">
              {INVESTMENT_DISCLAIMER}
            </p>
            <ScenarioToggle />
          </FadeIn>
        </div>
      </section>

      {/* ═══ DASHBOARD METRICS ═══ */}
      <section className="py-12 bg-canvas">
        <div className="section-container">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StaggerItem>
              <MetricCard
                target={metrics.revenue10yr / 1_000_000}
                prefix="$"
                suffix="M"
                label="Phase-1 10-Yr Revenue"
                onClick={() => setMetricModal('revenue10yr')}
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                target={metrics.ebitda10yr / 1_000_000}
                prefix="$"
                suffix="M"
                label="Phase-1 10-Yr EBITDA"
                onClick={() => setMetricModal('ebitda10yr')}
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                target={metrics.capitalization / 1_000_000}
                prefix="$"
                suffix="M"
                label="Phase-1 Capitalization"
                decimals={2}
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                target={metrics.capitalReturnedByYear}
                prefix="Yr "
                label="LP Capital Returned By"
              />
            </StaggerItem>
          </StaggerContainer>
          <p className="mt-6 font-accent text-xs uppercase tracking-[0.14em] text-secondary-600">
            {INVESTMENT_DISCLAIMER}
          </p>

          {/* Data Room Callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <DataRoomCallout
              href="/data-room/view/financial/financial-projections"
              label="View Full Financial Model →"
              description="Complete 10-year pro forma with detailed assumptions"
            />
            <DataRoomCallout
              href="/data-room/view/financial/sensitivity-analysis"
              label="View Sensitivity Analysis →"
              description="Stress tests across occupancy, pricing, and timing"
            />
          </div>
        </div>
      </section>

      {/* ═══ REVENUE PROJECTIONS ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
              <div>
                <span className="eyebrow mb-3 block">10-Year Revenue Streams</span>
                <h2 className="font-display text-4xl md:text-5xl text-neutral-900">
                  Revenue Breakdown
                </h2>
              </div>
              <DataRoomLink href="/data-room/view/financial/financial-projections">
                View Full Financial Model
              </DataRoomLink>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-3 mb-8">
              {streams.map((stream) => {
                // Scale against the LARGEST stream, not the first one. Scaling
                // against streams[0] made any stream bigger than the first
                // exceed 100% width; the bar clipped and its value label was
                // pushed outside the visible area entirely.
                const maxStream = Math.max(...streams.map((s) => s.value))
                const pct = maxStream > 0 ? (stream.value / maxStream) * 100 : 0
                return (
                  <div key={stream.name} className="flex items-center gap-4">
                    <div className="w-44 flex-shrink-0">
                      <span className="font-accent text-sm text-neutral-700">{stream.name}</span>
                    </div>
                    <div className="flex-1 bg-neutral-100 rounded-full h-8 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: stream.color }}
                      />
                    </div>
                    {/* Value sits outside the bar so a short stream can never hide it. */}
                    <div className="w-20 flex-shrink-0 text-right">
                      <span className="font-accent text-sm font-semibold text-neutral-800">
                        ${(stream.value / 1_000_000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ PRO FORMA TABLE ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
              <div>
                <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                  Pro Forma Summary
                </span>
                <h2 className="font-display text-4xl md:text-5xl">
                  Year-by-Year Projections
                </h2>
                <p className="mt-3 max-w-xl text-sm text-white/70">
                  {SCENARIO_BASIS[scenario]} Year 1 carries no revenue — it is construction
                  spend — so the Year-1 loss deepens in the conservative case and eases in the
                  optimistic one.
                </p>
              </div>
              <ScenarioToggle />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="font-accent text-sm font-semibold text-white/80 text-left py-3 px-3">Year</th>
                    <th className="font-accent text-sm font-semibold text-white/80 text-right py-3 px-3">Revenue</th>
                    <th className="font-accent text-sm font-semibold text-white/80 text-right py-3 px-3">Expenses</th>
                    <th className="font-accent text-sm font-semibold text-white/80 text-right py-3 px-3">EBITDA</th>
                    <th className="font-accent text-sm font-semibold text-white/80 text-right py-3 px-3">Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {yearData.map((d) => (
                    <tr key={d.year} className="border-b border-white/10">
                      <td className="font-accent text-sm text-white py-3 px-3">Year {d.year}</td>
                      <td className="text-sm text-white/70 text-right py-3 px-3">
                        ${(d.revenue / 1_000_000).toFixed(1)}M
                      </td>
                      <td className="text-sm text-white/70 text-right py-3 px-3">
                        ${(d.expenses / 1_000_000).toFixed(1)}M
                      </td>
                      <td className={`font-accent text-sm font-semibold text-right py-3 px-3 ${
                        d.ebitda >= 0 ? 'text-secondary-400' : 'text-red-400'
                      }`}>
                        ${(d.ebitda / 1_000_000).toFixed(1)}M
                      </td>
                      <td className="text-sm text-white/50 text-right py-3 px-3">
                        {d.revenue > 0 ? `${((d.ebitda / d.revenue) * 100).toFixed(0)}%` : '—'}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-white/30">
                    <td className="font-accent text-sm font-bold text-white py-3 px-3">Total</td>
                    <td className="font-accent text-sm font-bold text-white text-right py-3 px-3">
                      ${(yearData.reduce((s, d) => s + d.revenue, 0) / 1_000_000).toFixed(0)}M
                    </td>
                    <td className="font-accent text-sm font-bold text-white text-right py-3 px-3">
                      ${(yearData.reduce((s, d) => s + d.expenses, 0) / 1_000_000).toFixed(0)}M
                    </td>
                    <td className="font-accent text-sm font-bold text-secondary-400 text-right py-3 px-3">
                      ${(yearData.reduce((s, d) => s + d.ebitda, 0) / 1_000_000).toFixed(0)}M
                    </td>
                    <td className="text-sm text-white/50 text-right py-3 px-3">
                      {(() => {
                        const totalRev = yearData.reduce((s, d) => s + d.revenue, 0)
                        const totalEbitda = yearData.reduce((s, d) => s + d.ebitda, 0)
                        return `${((totalEbitda / totalRev) * 100).toFixed(0)}%`
                      })()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ THE ELECTION ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-4xl text-neutral-900 mb-4">
                The Election — Two Ways to Fund the Same Project
              </h2>
              <p className="max-w-3xl mx-auto text-neutral-600">
                Both Elections raise an identical <strong>$15,939,072</strong> and run on identical
                Phase-1 operating economics — the same revenue, the same EBITDA, the same build.
                Only the treatment of the $4,000,000 land tranche differs, and that alone changes
                the return profile. Figures below are the base case.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(['a', 'b'] as ElectionKey[]).map((key) => {
              const e = ELECTIONS[key]
              return (
                <StaggerItem key={key}>
                  <div className="card p-8 h-full flex flex-col">
                    <h3 className="font-display text-2xl text-neutral-900 mb-1">{e.name}</h3>
                    <p className="font-accent text-sm text-primary-600 mb-6">{e.tagline}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="font-display text-3xl text-primary-700">{e.irr10yr}%</div>
                        <div className="font-accent text-xs uppercase tracking-[0.14em] text-neutral-500">LP IRR · 10-Yr</div>
                      </div>
                      <div>
                        <div className="font-display text-3xl text-primary-700">{e.emx10yr}x</div>
                        <div className="font-accent text-xs uppercase tracking-[0.14em] text-neutral-500">Equity Multiple · 10-Yr</div>
                      </div>
                      <div>
                        <div className="font-display text-xl text-neutral-800">{e.irr5yr}%</div>
                        <div className="font-accent text-xs uppercase tracking-[0.14em] text-neutral-500">LP IRR · 5-Yr</div>
                      </div>
                      <div>
                        <div className="font-display text-xl text-neutral-800">{e.emx5yr}x</div>
                        <div className="font-accent text-xs uppercase tracking-[0.14em] text-neutral-500">Equity Multiple · 5-Yr</div>
                      </div>
                    </div>

                    <dl className="text-sm space-y-2 mb-6 border-t border-neutral-100 pt-5">
                      <div className="flex justify-between gap-4">
                        <dt className="text-neutral-500">LP equity</dt>
                        <dd className="text-neutral-900 font-mono">${e.lpEquity.toLocaleString()}</dd>
                      </div>
                      {e.landNotes > 0 && (
                        <div className="flex justify-between gap-4">
                          <dt className="text-neutral-500">Secured land notes</dt>
                          <dd className="text-neutral-900 font-mono">${e.landNotes.toLocaleString()}</dd>
                        </div>
                      )}
                      <div className="flex justify-between gap-4">
                        <dt className="text-neutral-500">GP co-investment</dt>
                        <dd className="text-neutral-900 font-mono">${e.gpCoInvest.toLocaleString()}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-neutral-500">Construction debt</dt>
                        <dd className="text-neutral-900 font-mono">${e.constructionDebt.toLocaleString()}</dd>
                      </div>
                      <div className="flex justify-between gap-4 border-t border-neutral-100 pt-2">
                        <dt className="text-neutral-700 font-medium">Total capital</dt>
                        <dd className="text-neutral-900 font-mono font-medium">${e.totalCapital.toLocaleString()}</dd>
                      </div>
                    </dl>

                    <div className="rounded-xl bg-primary-50 p-4 mb-5">
                      <div className="font-accent text-xs uppercase tracking-[0.14em] text-primary-700 mb-2">
                        $100,000 invested
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">by Year 5</span>
                        <span className="font-mono text-neutral-900">~${e.per100k5yr.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">by Year 10</span>
                        <span className="font-mono text-neutral-900">~${e.per100k10yr.toLocaleString()}</span>
                      </div>
                    </div>

                    <p className="text-sm text-neutral-600 leading-relaxed mt-auto">{e.tradeoff}</p>

                    <p className="mt-4 font-accent text-xs uppercase tracking-[0.14em] text-secondary-600">
                      LP share of total distributions: {e.lpShareOfDistributions}%
                    </p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>

          <FadeIn>
            <div className="card p-6 mt-6">
              <h4 className="font-display text-lg text-neutral-900 mb-3">
                Secured Note Terms — Election B only
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <div className="font-mono text-neutral-900">${NOTE_TERMS.principal.toLocaleString()}</div>
                  <div className="text-neutral-500 text-xs">Principal</div>
                </div>
                <div>
                  <div className="font-mono text-neutral-900">{NOTE_TERMS.interestRate}%</div>
                  <div className="text-neutral-500 text-xs">Interest, interest-only</div>
                </div>
                <div>
                  <div className="font-mono text-neutral-900">${NOTE_TERMS.totalRepayment.toLocaleString()}</div>
                  <div className="text-neutral-500 text-xs">Total repayment</div>
                </div>
                <div>
                  <div className="font-mono text-neutral-900">{NOTE_TERMS.holderMultiple}x</div>
                  <div className="text-neutral-500 text-xs">Note-holder multiple ({NOTE_TERMS.holderIrr}% IRR)</div>
                </div>
              </div>
              <p className="text-sm text-neutral-600">
                {NOTE_TERMS.structure}. {NOTE_TERMS.security} Note holders rank ahead of equity and
                take no share of project upside.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ USE OF FUNDS ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">$14.1M Year-1 Draw</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Use of Funds
              </h2>
              <p className="max-w-2xl mx-auto text-sm text-neutral-600 mb-2">
                The Year-1 construction and land draw. The balance of the $15,939,072 raised
                covers Year-1 debt service and the developer fee, leaving a working cushion.
              </p>
              <p className="font-accent text-sm text-neutral-500">Click any category for line-item detail</p>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            <FadeIn delay={0.2}>
              {USE_OF_FUNDS.map((fund) => (
                <div
                  key={fund.name}
                  onClick={() => setFundModal(fund.name)}
                  className="flex items-center gap-4 mb-3 cursor-pointer group rounded-xl hover:bg-primary-50/50 px-2 py-1 -mx-2 transition-colors"
                >
                  <div className="w-40 flex-shrink-0">
                    <span className="font-accent text-sm text-neutral-700 group-hover:text-primary-800 transition-colors flex items-center gap-1">
                      {fund.name}
                      <Info className="w-3 h-3 text-neutral-300 group-hover:text-primary-500 transition-colors" />
                    </span>
                  </div>
                  <div className="flex-1 bg-neutral-100 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${fund.percentage}%`, backgroundColor: fund.color }}
                    >
                      <span className="font-accent text-xs text-white font-semibold">
                        {fund.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="font-accent text-xs text-neutral-500">
                      ${(fund.value / 1_000_000).toFixed(2)}M
                    </span>
                  </div>
                </div>
              ))}
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8">
                <DataRoomCallout
                  href="/data-room/view/property/construction-budget"
                  label="View Full Construction Budget →"
                  description="Detailed cost breakdown with contractor bids and timelines"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ WATERFALL ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Distribution Structure</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Equity Waterfall
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                LP-favorable waterfall with 10% preferred return. Investors recover capital before any GP participation.
              </p>
              <p className="font-accent text-sm text-neutral-500 mt-2">Click any tier for a plain-language explanation</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-2xl mx-auto space-y-3">
              {WATERFALL.map((tier) => (
                <div
                  key={tier.tier}
                  onClick={() => setWaterfallModal(tier.tier)}
                  className="card p-5 cursor-pointer hover:shadow-lg hover:border-primary-200 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-accent text-sm font-semibold text-neutral-900 flex items-center gap-1.5">
                      {tier.tier}
                      <Info className="w-3.5 h-3.5 text-neutral-300 group-hover:text-primary-500 transition-colors" />
                    </span>
                    <span className="font-accent text-xs text-neutral-500">{tier.threshold}</span>
                  </div>
                  <div className="flex h-6 rounded-full overflow-hidden">
                    <div
                      className="bg-primary-600 flex items-center justify-center"
                      style={{ width: `${tier.lpSplit}%` }}
                    >
                      <span className="font-accent text-xs font-semibold text-white">LP {tier.lpSplit}%</span>
                    </div>
                    {tier.gpSplit > 0 && (
                      <div
                        className="bg-secondary-500 flex items-center justify-center"
                        style={{ width: `${tier.gpSplit}%` }}
                      >
                        <span className="font-accent text-xs font-semibold text-white">GP {tier.gpSplit}%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="max-w-2xl mx-auto mt-8">
              <DataRoomCallout
                href="/data-room/view/investment/operating-agreement"
                label="View Operating Agreement →"
                description="Full waterfall terms, clawback provisions, and GP commitments"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-primary-800 py-20 md:py-28">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
              Ready to Invest?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Review the investment thesis, risk mitigation, and next steps.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/invest" className="btn-primary btn-lg rounded-2xl text-base group">
                The Investment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/invest/apply" className="btn-accent btn-lg rounded-2xl text-base">
                Join Investor Waitlist
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page (Vault-Gated)
// ═══════════════════════════════════════════════════════════════════════════

export default function FinancialsPage() {
  return (
    <AuthGate>
      <FinancialsContent />
    </AuthGate>
  )
}
