'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { ArrowRight } from 'lucide-react'
import {
  SCENARIOS,
  SCENARIO_LABELS,
  KEY_METRICS,
  UNIT_MIX,
  REVENUE_STREAMS,
  REVENUE_BY_YEAR,
  USE_OF_FUNDS,
  WATERFALL,
  type Scenario,
} from '@/lib/data/financials'

// ═══════════════════════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════════════════════

function ScenarioToggle({ scenario, setScenario }: { scenario: Scenario; setScenario: (s: Scenario) => void }) {
  return (
    <div className="inline-flex bg-primary-50 rounded-xl p-1">
      {SCENARIOS.map((s) => (
        <button
          key={s}
          onClick={() => setScenario(s)}
          className={`font-accent text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${
            scenario === s
              ? 'bg-primary-800 text-white shadow-sm'
              : 'text-neutral-600 hover:text-primary-800'
          }`}
        >
          {SCENARIO_LABELS[s]}
        </button>
      ))}
    </div>
  )
}

function MetricCard({ target, prefix, suffix, label, decimals = 0 }: {
  target: number
  prefix?: string
  suffix?: string
  label: string
  decimals?: number
}) {
  const { count, ref } = useAnimatedCounter({ target, decimals })

  return (
    <div ref={ref} className="card p-6 text-center">
      <div className="font-display text-3xl md:text-4xl font-bold text-primary-800 mb-1">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="font-accent text-sm text-neutral-600">{label}</div>
    </div>
  )
}

function RevenueBar({ name, value, maxValue, color }: {
  name: string
  value: number
  maxValue: number
  color: string
}) {
  const percentage = (value / maxValue) * 100
  return (
    <div className="flex items-center gap-4">
      <div className="w-40 flex-shrink-0">
        <span className="font-accent text-sm text-neutral-700">{name}</span>
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
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function ModelPage() {
  const [scenario, setScenario] = useState<Scenario>('base')
  const metrics = KEY_METRICS[scenario]
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
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-neutral-900 mb-6 max-w-4xl">
              Regenerative Is Profitable
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed mb-8">
              $12.5M capital raise targeting 37% IRR with a 4.42x equity multiple over a 10-year hold. Five diversified revenue streams. Conservation-forward design that improves — not compromises — returns.
            </p>
            <ScenarioToggle scenario={scenario} setScenario={setScenario} />
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
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Five Diversified Income Sources
              </h2>
              <p className="text-lg text-neutral-600">
                Revenue is not dependent on any single source. Residential sales drive the majority, with rental income, lot sales, commercial leasing, and the retreat center providing recurring and supplementary streams.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl space-y-4">
              {REVENUE_STREAMS.map((stream) => (
                <RevenueBar
                  key={stream.name}
                  name={stream.name}
                  value={stream.value}
                  maxValue={REVENUE_STREAMS[0].value}
                  color={stream.color}
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
              <h2 className="font-display text-4xl md:text-5xl mb-4">
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
                    <tr key={unit.type} className="border-b border-white/10">
                      <td className="font-accent text-sm text-white py-4 px-3">{unit.type}</td>
                      <td className="text-sm text-white/70 text-right py-4 px-3">{unit.count}</td>
                      <td className="text-sm text-white/70 text-right py-4 px-3">
                        {unit.avgPrice > 0
                          ? `$${(unit.avgPrice / 1000).toFixed(0)}K`
                          : `$${unit.avgNightly}/night`}
                      </td>
                      <td className="text-sm text-white/70 text-right py-4 px-3">
                        {unit.avgSF > 0 ? `${unit.avgSF.toLocaleString()} SF` : '—'}
                      </td>
                      <td className="font-accent text-sm font-semibold text-secondary-400 text-right py-4 px-3">
                        {unit.avgPrice > 0
                          ? `$${((unit.count * unit.avgPrice) / 1_000_000).toFixed(1)}M`
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
                <h2 className="font-display text-4xl md:text-5xl text-neutral-900">
                  Revenue & EBITDA
                </h2>
              </div>
              <ScenarioToggle scenario={scenario} setScenario={setScenario} />
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
        </div>
      </section>

      {/* ═══ USE OF FUNDS ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">$12.5M Capital Raise</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Use of Funds
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {USE_OF_FUNDS.map((fund) => (
              <StaggerItem key={fund.name}>
                <div className="card p-5 text-center">
                  <div className="font-display text-3xl font-bold mb-1" style={{ color: fund.color }}>
                    {fund.percentage}%
                  </div>
                  <h3 className="font-accent text-sm font-semibold text-neutral-900 mb-1">
                    {fund.name}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    ${(fund.value / 1_000_000).toFixed(2)}M
                  </p>
                </div>
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
              <h2 className="font-display text-4xl md:text-5xl mb-4">
                Waterfall Distribution
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                LP-favorable structure with 8% preferred return and progressive profit sharing. Investors recover their capital first.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-2xl mx-auto space-y-3">
              {WATERFALL.map((tier) => (
                <div key={tier.tier} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-accent text-sm font-semibold text-white">{tier.tier}</span>
                    <span className="font-accent text-xs text-white/50">{tier.threshold}</span>
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
                </div>
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
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
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
              <Link href="/expansion" className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 btn-lg rounded-2xl text-base group">
                View Development Phases
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
