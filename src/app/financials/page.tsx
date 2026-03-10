'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { VaultGate } from '@/components/auth/VaultGate'
import { ArrowRight } from 'lucide-react'
import {
  SCENARIOS,
  SCENARIO_LABELS,
  KEY_METRICS,
  REVENUE_BY_YEAR,
  USE_OF_FUNDS,
  WATERFALL,
  REVENUE_STREAMS,
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
  target: number; prefix?: string; suffix?: string; label: string; decimals?: number
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

// ═══════════════════════════════════════════════════════════════════════════
// Page Content (inside vault gate)
// ═══════════════════════════════════════════════════════════════════════════

function FinancialsContent() {
  const [scenario, setScenario] = useState<Scenario>('base')
  const metrics = KEY_METRICS[scenario]
  const yearData = REVENUE_BY_YEAR[scenario]

  return (
    <div>
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
            <ScenarioToggle scenario={scenario} setScenario={setScenario} />
          </FadeIn>
        </div>
      </section>

      {/* ═══ DASHBOARD METRICS ═══ */}
      <section className="py-12 bg-canvas">
        <div className="section-container">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StaggerItem>
              <MetricCard target={metrics.revenue10yr / 1_000_000} prefix="$" suffix="M" label="10-Year Revenue" />
            </StaggerItem>
            <StaggerItem>
              <MetricCard target={metrics.ebitda10yr / 1_000_000} prefix="$" suffix="M" label="10-Year EBITDA" />
            </StaggerItem>
            <StaggerItem>
              <MetricCard target={metrics.emx} suffix="x" label="LP Equity Multiple" decimals={2} />
            </StaggerItem>
            <StaggerItem>
              <MetricCard target={metrics.irr} suffix="%" label="LP IRR" decimals={1} />
            </StaggerItem>
          </StaggerContainer>
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
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-3 mb-8">
              {REVENUE_STREAMS.map((stream) => (
                <div key={stream.name} className="flex items-center gap-4">
                  <div className="w-44 flex-shrink-0">
                    <span className="font-accent text-sm text-neutral-700">{stream.name}</span>
                  </div>
                  <div className="flex-1 bg-neutral-100 rounded-full h-8 overflow-hidden">
                    <div
                      className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-700"
                      style={{
                        width: `${(stream.value / REVENUE_STREAMS[0].value) * 100}%`,
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
              <ScenarioToggle scenario={scenario} setScenario={setScenario} />
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
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            <FadeIn delay={0.2}>
              {USE_OF_FUNDS.map((fund) => (
                <div key={fund.name} className="flex items-center gap-4 mb-3">
                  <div className="w-40 flex-shrink-0">
                    <span className="font-accent text-sm text-neutral-700">{fund.name}</span>
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
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-2xl mx-auto space-y-3">
              {WATERFALL.map((tier) => (
                <div key={tier.tier} className="card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-accent text-sm font-semibold text-neutral-900">{tier.tier}</span>
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
    <VaultGate>
      <FinancialsContent />
    </VaultGate>
  )
}
