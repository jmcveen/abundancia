'use client'

import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { ArrowRight } from 'lucide-react'
import { UNIT_MIX } from '@/lib/data/financials'

// ═══════════════════════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════════════════════

function Stat({ target, prefix, suffix, label, decimals = 0 }: {
  target: number; prefix?: string; suffix?: string; label: string; decimals?: number
}) {
  const { count, ref } = useAnimatedCounter({ target, decimals })
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl md:text-4xl font-bold text-primary-800 mb-1">
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
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Executive Summary</span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-neutral-900 mb-6 max-w-4xl">
              Abundancia Austin at a Glance
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
              A 376-acre regenerative community in Cedar Creek, Bastrop County — 30 minutes from downtown Austin. $12.5M capital raise targeting 37% IRR with hempcrete homes, food forests, renewable energy, and sacred spaces.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ KEY METRICS ═══ */}
      <section className="py-12 md:py-16 bg-canvas">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <Stat target={376} suffix=" Acres" label="Texas Ranchland" />
            <Stat target={12.5} suffix="M" prefix="$" label="Capital Raise" decimals={1} />
            <Stat target={37} suffix="%" label="Projected IRR" />
            <Stat target={4.42} suffix="x" label="Equity Multiple" decimals={2} />
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
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-6">
                Project Summary
              </h2>
              <div className="prose prose-lg text-neutral-600 space-y-4">
                <p>
                  <strong>Abundancia</strong> is a mixed-use regenerative community designed to prove that profitable real estate development and ecological regeneration amplify each other. Built with hempcrete — carbon-negative, fire-resistant homes that last 500+ years — the community integrates renewable energy, water security, food forests, and sacred spaces.
                </p>
                <p>
                  Located on 376 acres in Cedar Creek, Bastrop County, the project benefits from Austin&apos;s explosive growth (50-60K new residents/year), no zoning restrictions, agricultural exemption, and Texas hempcrete building codes. Five diversified revenue streams across residential sales, rental income, lot sales, commercial leasing, and a retreat center provide financial resilience.
                </p>
                <p>
                  The $12.5M capital raise funds the complete vision — land acquisition, Phase 1 construction, retreat center launch, and infrastructure. Revenue generation begins in Phase 1 through retreat operations and first home sales. LP-favorable waterfall with 8% preferred return and full capital return priority.
                </p>
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
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Unit Mix
              </h2>
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
                    <tr key={unit.type} className="border-b border-neutral-100">
                      <td className="font-accent text-sm text-neutral-900 py-3 px-3">{unit.type}</td>
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

      {/* ═══ QUICK LINKS ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Explore Further
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Vision & Story', href: '/story/vision', description: 'The thesis and guiding principles' },
              { label: 'The Land', href: '/story/land', description: '376 acres in Cedar Creek, TX' },
              { label: 'Business Model', href: '/model', description: 'Revenue streams and projections' },
              { label: 'Meet the Team', href: '/team', description: 'Leadership and partners' },
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
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
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
              <Link href="/waitlist" className="btn-primary btn-lg rounded-2xl text-base group">
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
