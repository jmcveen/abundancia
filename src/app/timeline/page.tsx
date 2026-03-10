'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/animation'
import { ArrowRight, CheckCircle2, Circle, Clock } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const MILESTONES = [
  {
    period: 'Now',
    title: 'Due Diligence Underway',
    status: 'active' as const,
    items: [
      'Team assembled and operational',
      'Land identified — 376 acres in Cedar Creek',
      '$12.5M capital raise in progress',
      'Investor outreach at SXSW 2026',
    ],
  },
  {
    period: 'Months 1-6',
    title: 'Land Acquisition & Planning',
    status: 'upcoming' as const,
    items: [
      'Land acquisition closes ($6.5M)',
      'Hydrology study and water resource assessment',
      'Houston toad habitat compliance (LPHCP)',
      'Master site planning with Symbiosis TX',
      'Entity formation — Texas Series LLC',
      'MUD petition filed',
    ],
  },
  {
    period: 'Months 6-12',
    title: 'Phase 1 Construction Begins',
    status: 'upcoming' as const,
    items: [
      'Retreat center operations launch using existing structures',
      'First 10-15 tiny homes and domes for guest capacity',
      'Hempcrete model home construction (15 units)',
      'Infrastructure — roads, water, septic, solar',
    ],
  },
  {
    period: 'Year 1-2',
    title: 'Phase 1 Revenue Generation',
    status: 'upcoming' as const,
    items: [
      'Retreat and event center fully operational',
      'First home sales ($8.25M-$11.25M projected)',
      'Community gardens and food forest planting',
      'Marketing and buyer pipeline established',
    ],
  },
  {
    period: 'Year 2-4',
    title: 'Phase 2 — Community Core',
    status: 'upcoming' as const,
    items: [
      'Creation Hub and education center built',
      'Multifamily construction begins (260 units)',
      'Commercial spaces open — grocery, restaurants, retail',
      'Expand to 100+ residential units',
    ],
  },
  {
    period: 'Year 4-7',
    title: 'Phase 3 — Full Buildout',
    status: 'upcoming' as const,
    items: [
      'Complete residential buildout — all 420+ units',
      'All commercial spaces fully operational',
      'Full renewable energy grid — net-positive',
      'Permaculture food forests reach maturity',
    ],
  },
  {
    period: 'Year 7-10',
    title: 'Phase 4 — Giveback & Replicate',
    status: 'upcoming' as const,
    items: [
      'Regenerative Community Documentary production',
      'Online courses and education platform',
      'Template sharing for global replication',
      'Investor distributions and exit planning',
    ],
  },
]

function StatusIcon({ status }: { status: 'active' | 'upcoming' }) {
  if (status === 'active') return <Clock className="w-5 h-5 text-secondary-500" />
  return <Circle className="w-5 h-5 text-primary-300" />
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function TimelinePage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Roadmap</span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-neutral-900 mb-6 max-w-4xl">
              Development Timeline
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
              A 10-year development roadmap from land acquisition through full community buildout to global replication. Revenue generation begins in Phase 1.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {MILESTONES.map((milestone, index) => (
              <FadeIn key={milestone.period} delay={index * 0.08}>
                <div className="relative pl-12 pb-10 last:pb-0">
                  {index < MILESTONES.length - 1 && (
                    <div className="absolute left-[18px] top-8 bottom-0 w-0.5 bg-primary-200" />
                  )}

                  <div className="absolute left-[7px] top-1">
                    <StatusIcon status={milestone.status} />
                  </div>

                  <div className={`card p-6 ${milestone.status === 'active' ? 'border-l-4 border-l-secondary-500' : ''}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                      <h3 className="font-display text-xl text-neutral-900">
                        {milestone.title}
                      </h3>
                      <span className={`font-accent text-sm px-3 py-1 rounded-full whitespace-nowrap ${
                        milestone.status === 'active'
                          ? 'text-secondary-700 bg-secondary-50 font-semibold'
                          : 'text-primary-600 bg-primary-50'
                      }`}>
                        {milestone.period}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {milestone.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-neutral-600 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-primary-800 py-20 md:py-28">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
              Be Part of the Journey
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              The capital raise is in progress. Join as an investor or future resident.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/invest/apply" className="btn-accent btn-lg rounded-2xl text-base">
                Join Investor Waitlist
              </Link>
              <Link href="/overview" className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 btn-lg rounded-2xl text-base group">
                Read Executive Summary
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
