'use client'

import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { VaultGate } from '@/components/auth/VaultGate'
import {
  ArrowRight, TrendingUp, Shield, Leaf, Building2,
  Scale, AlertTriangle, CheckCircle2
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const THESIS_POINTS = [
  {
    icon: TrendingUp,
    title: 'Institutional-Grade Returns',
    description: '37% projected IRR with 4.42x equity multiple. LP-favorable waterfall with 8% preferred return and capital return priority.',
  },
  {
    icon: Leaf,
    title: 'Regenerative Premium',
    description: 'Sustainability features command 10-25% pricing premiums. Hempcrete reduces insurance, energy, and maintenance costs. Conservation easements provide tax benefits.',
  },
  {
    icon: Building2,
    title: 'Proven Market Demand',
    description: 'Austin\'s population doubles every 20 years. Whisper Valley sold out multiple phases. 68% of buyers pay more for sustainable features.',
  },
  {
    icon: Shield,
    title: 'Regulatory De-Risk',
    description: 'No zoning in Bastrop County. Texas hempcrete building codes adopted. MUD bond financing available. 6-12 month timeline vs 18-24 months in Austin.',
  },
  {
    icon: Scale,
    title: 'Diversified Revenue',
    description: 'Five revenue streams — residential sales, rental income, lot sales, commercial leasing, and retreat center. No single-source dependency.',
  },
]

const RISKS = [
  {
    risk: 'Construction Cost Overruns',
    mitigation: '18% contingency reserve. Fixed-price hempcrete contracts. Phased construction allows scope adjustment between phases.',
  },
  {
    risk: 'Market/Absorption Risk',
    mitigation: 'Austin population growth provides sustained demand. Multiple product types at varied price points. Retreat center generates Phase 1 revenue immediately.',
  },
  {
    risk: 'Regulatory Changes',
    mitigation: 'No zoning means no rezoning risk. Hempcrete is now code-compliant in Texas. Conservation-forward design exceeds environmental requirements.',
  },
  {
    risk: 'Environmental (Houston Toad)',
    mitigation: 'LPHCP compliance built into design. 70-75% land conservation exceeds requirements. Habitat enhancement creates positive relationship with regulators.',
  },
  {
    risk: 'Capital Call Risk',
    mitigation: 'Phased development model. Phase 1 is revenue-generating. No capital calls beyond initial commitment. MUD bonds reimburse infrastructure costs.',
  },
  {
    risk: 'Interest Rate / Financing Risk',
    mitigation: 'Conservative leverage assumptions. MUD bonds provide below-market infrastructure financing. Phase 1 cash flow reduces refinancing dependency.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Page Content
// ═══════════════════════════════════════════════════════════════════════════

function InvestContent() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">The Investment</span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-neutral-900 mb-6 max-w-4xl">
              $12.5M Capital Raise
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
              Accredited investors are invited to participate in a generational opportunity — the first institutional-grade regenerative community in the Austin metro. The full vision, one raise.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              {[
                { value: '$12.5M', label: 'Raise Amount' },
                { value: '37.1%', label: 'Projected IRR' },
                { value: '4.42x', label: 'Equity Multiple' },
                { value: '10 Year', label: 'Hold Period' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-display text-2xl font-bold text-primary-800">{item.value}</div>
                  <div className="font-accent text-xs text-neutral-500 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ INVESTMENT THESIS ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Investment Thesis</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Why This. Why Now. Why Us.
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {THESIS_POINTS.map((point) => (
              <StaggerItem key={point.title}>
                <div className="card p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                    <point.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-accent text-lg font-semibold text-neutral-900 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ CAPITAL STRUCTURE ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <FadeIn>
              <div>
                <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                  Capital Structure
                </span>
                <h2 className="font-display text-4xl md:text-5xl mb-6">
                  How It Works
                </h2>
                <div className="space-y-4">
                  {[
                    { label: 'Vehicle', detail: 'Texas Series LLC — LP/GP structure' },
                    { label: 'Minimum Investment', detail: 'Accredited investors only (Reg D 506(c))' },
                    { label: 'Preferred Return', detail: '8% annual preferred return to LPs' },
                    { label: 'Waterfall', detail: '80/20 → 70/30 → 60/40 → 50/50 at IRR hurdles' },
                    { label: 'Hold Period', detail: '10-year target with extensions available' },
                    { label: 'Capital Return', detail: 'LPs receive full capital back before any GP promote' },
                    { label: 'Reporting', detail: 'Quarterly investor reports, annual K-1s' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-secondary-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-accent text-sm font-semibold text-white">{item.label}</span>
                        <span className="text-sm text-white/60"> — {item.detail}</span>
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
                  {[
                    { scenario: 'Conservative', irr: '24%', emx: '3.0x' },
                    { scenario: 'Base Case', irr: '37.1%', emx: '4.42x' },
                    { scenario: 'Optimistic', irr: '45%', emx: '5.5x' },
                  ].map((item) => (
                    <div key={item.scenario}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-accent text-sm text-white/70">{item.scenario}</span>
                        <div className="flex items-center gap-4">
                          <span className="font-accent text-sm font-semibold text-secondary-400">{item.irr} IRR</span>
                          <span className="font-accent text-sm text-white/50">{item.emx} EMx</span>
                        </div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-secondary-400 to-secondary-500 h-2 rounded-full"
                          style={{ width: `${(parseFloat(item.irr) / 50) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ RISK MITIGATION ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">
                <AlertTriangle className="w-4 h-4 inline mr-2 -mt-0.5" />
                Risk Mitigation
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Key Risks & How We Address Them
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl mx-auto space-y-4">
              {RISKS.map((item) => (
                <div key={item.risk} className="card p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-accent text-base font-semibold text-neutral-900 mb-1">
                        {item.risk}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        <span className="font-semibold text-primary-700">Mitigation: </span>
                        {item.mitigation}
                      </p>
                    </div>
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
              Take the Next Step
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Schedule a conversation with our capital markets team or request access to the full data room.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/invest/apply" className="btn-accent btn-lg rounded-2xl text-base">
                Apply to Invest
              </Link>
              <Link href="/financials" className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 btn-lg rounded-2xl text-base group">
                View Full Financials
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

export default function InvestPage() {
  return (
    <VaultGate>
      <InvestContent />
    </VaultGate>
  )
}
