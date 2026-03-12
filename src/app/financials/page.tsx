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
  KEY_METRICS,
  REVENUE_BY_YEAR,
  USE_OF_FUNDS,
  WATERFALL,
  REVENUE_STREAMS,
} from '@/lib/data/financials'

// ═══════════════════════════════════════════════════════════════════════════
// Modal Content Data
// ═══════════════════════════════════════════════════════════════════════════

const METRIC_EXPLANATIONS: Record<string, { title: string; body: string; methodology: string }> = {
  revenue10yr: {
    title: '10-Year Cumulative Revenue',
    body: 'Total gross revenue generated across all four revenue streams over the 5-10 year term, including residential sales, rental income, lot sales, and commercial leasing.',
    methodology: 'Calculated by summing annual revenue projections from the financial model, which uses absorption-rate assumptions for unit sales, occupancy rates for rentals, and market-rate escalators for pricing.',
  },
  ebitda10yr: {
    title: '10-Year Cumulative EBITDA',
    body: 'Earnings Before Interest, Taxes, Depreciation, and Amortization over the full hold period. This represents the project\'s core operating profitability before capital structure considerations.',
    methodology: 'Derived from revenue minus operating expenses (construction costs, staffing, marketing, property management, insurance, and maintenance). Does not include debt service or depreciation.',
  },
  emx: {
    title: 'LP Equity Multiple (EMx)',
    body: 'The total return on invested capital for Limited Partners. An EMx of 4.42x means every $1 invested returns $4.42 in total distributions over the life of the investment.',
    methodology: 'Calculated as total LP distributions divided by total LP capital contributions, using the IRR-based waterfall distribution structure with tiered profit splits (80/20 → 70/30 → 60/40 → 50/50).',
  },
  irr: {
    title: 'LP Internal Rate of Return (IRR)',
    body: 'The annualized rate of return for Limited Partners, accounting for the timing of cash flows. IRR captures not just how much you earn, but how quickly capital is returned.',
    methodology: 'Computed using discounted cash flow analysis on projected LP distributions by quarter, reflecting the waterfall structure, construction timeline, and phased unit delivery.',
  },
}

const FUND_DETAILS: Record<string, { description: string; lineItems: { item: string; amount: string }[] }> = {
  'Land Acquisition': {
    description: 'Securing the primary 150-acre site in East Austin, including due diligence, title insurance, and closing costs.',
    lineItems: [
      { item: 'Land Purchase Price', amount: '$3,600,000' },
      { item: 'Due Diligence & Surveys', amount: '$180,000' },
      { item: 'Title Insurance & Closing', amount: '$120,000' },
      { item: 'Environmental Assessment', amount: '$100,000' },
    ],
  },
  'Hard Costs': {
    description: 'Physical construction costs for Phase 1 infrastructure and model units, including hempcrete demonstration homes.',
    lineItems: [
      { item: 'Model Home Construction (3 units)', amount: '$750,000' },
      { item: 'Community Center Shell', amount: '$500,000' },
      { item: 'Hempcrete Production Facility', amount: '$300,000' },
      { item: 'Materials & Equipment', amount: '$200,000' },
    ],
  },
  'Site Work': {
    description: 'Grading, utilities, roads, and regenerative infrastructure for the initial community phase.',
    lineItems: [
      { item: 'Grading & Earthwork', amount: '$450,000' },
      { item: 'Utility Infrastructure', amount: '$550,000' },
      { item: 'Roads & Access', amount: '$400,000' },
      { item: 'Regenerative Systems (Water/Solar)', amount: '$350,000' },
    ],
  },
  'Master Planning & Architecture': {
    description: 'Architecture, engineering, permitting, and land-use planning for the full community buildout.',
    lineItems: [
      { item: 'Master Site Plan (Symbiosis TX)', amount: '$400,000' },
      { item: 'Architectural Design (Inphinity Design)', amount: '$400,000' },
      { item: 'Civil Engineering & MEP', amount: '$300,000' },
      { item: 'Permitting, Entitlements & Legal', amount: '$240,596' },
    ],
  },
  'Staffing, Ops & Marketing': {
    description: 'Core team, operations, and go-to-market strategy through initial revenue generation.',
    lineItems: [
      { item: 'Executive Team & Project Management', amount: '$600,000' },
      { item: 'Operations & Office', amount: '$200,000' },
      { item: 'Brand, Digital Marketing & PR', amount: '$350,000' },
      { item: 'Sales Center, Events & Outreach', amount: '$250,771' },
    ],
  },
  'Contingency & Carry Costs': {
    description: '18% reserve for cost overruns, market shifts, carry costs, and unforeseen development challenges. Industry standard is 10-15%.',
    lineItems: [
      { item: 'Construction Contingency', amount: '$1,000,000' },
      { item: 'Market/Timing Contingency', amount: '$600,000' },
      { item: 'Carry Costs & Debt Service', amount: '$627,007' },
    ],
  },
}

const WATERFALL_EXPLANATIONS: Record<string, { plain: string; example: string }> = {
  'Tier 1 - Return of Capital': {
    plain: 'Initial sales fund development up to the approved budget plus a 10% reserve. Proceeds are distributed 80% LP / 20% GP until investor principal is fully repaid.',
    example: 'If you invest $250,000, proceeds are split 80/20 until you receive your full $250,000 back.',
  },
  'Tier 2 - 12% IRR': {
    plain: 'Once principal is repaid and a 12% IRR to LP is reached, profits are distributed 70% LP / 30% GP. The GP begins to participate more meaningfully in the upside.',
    example: 'After your capital is returned with a 12% IRR, 70% of additional distributions flow to you as LP.',
  },
  'Tier 3 - 15% IRR': {
    plain: 'At a 15% IRR to LP, the split shifts to 60% LP / 40% GP. The increasing GP share rewards the management team for outperformance.',
    example: 'Once your returns exceed 15% IRR, 60% of additional distributions flow to you as LP.',
  },
  'Tier 4 - 18% IRR': {
    plain: 'At an 18% IRR to LP, profits are split 50/50 until the agreed term is reached. At this level, the project has far exceeded expectations.',
    example: 'Above 18% IRR, LPs and GP split 50/50 for the remaining term.',
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
              Detailed financial projections for the $12.5M capital raise. Toggle between conservative, base, and optimistic scenarios to stress-test assumptions.
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
                label="10-Year Revenue"
                onClick={() => setMetricModal('revenue10yr')}
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                target={metrics.ebitda10yr / 1_000_000}
                prefix="$"
                suffix="M"
                label="10-Year EBITDA"
                onClick={() => setMetricModal('ebitda10yr')}
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                target={metrics.emx}
                suffix="x"
                label="LP Equity Multiple"
                decimals={2}
                onClick={() => setMetricModal('emx')}
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                target={metrics.irr}
                suffix="%"
                label="LP IRR"
                decimals={1}
                onClick={() => setMetricModal('irr')}
              />
            </StaggerItem>
          </StaggerContainer>

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
              {streams.map((stream) => (
                <div key={stream.name} className="flex items-center gap-4">
                  <div className="w-44 flex-shrink-0">
                    <span className="font-accent text-sm text-neutral-700">{stream.name}</span>
                  </div>
                  <div className="flex-1 bg-neutral-100 rounded-full h-8 overflow-hidden">
                    <div
                      className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-700"
                      style={{
                        width: `${(stream.value / streams[0].value) * 100}%`,
                        backgroundColor: stream.color,
                      }}
                    >
                      <span className="font-accent text-xs text-white font-semibold">
                        ${(stream.value / 1_000_000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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

      {/* ═══ USE OF FUNDS ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">$12.5M Capital Raise</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Use of Funds
              </h2>
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
                LP-favorable waterfall with 8% preferred return. Investors recover capital before any GP participation.
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
