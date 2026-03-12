'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FadeIn } from '@/components/animation'
import { Modal } from '@/components/ui/Modal'
import { ArrowRight, CheckCircle2, Circle, Clock, ExternalLink, FolderOpen, DollarSign } from 'lucide-react'

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
    detail: 'The due diligence phase is the foundation of the entire project. Our team has completed preliminary site assessments, environmental reviews, and market analysis. The 376-acre parcel in Cedar Creek was selected from 70+ eco-community analyses worldwide for its combination of location (30 min from downtown Austin), regulatory environment (no zoning in Bastrop County), natural features (mature trees, water features, rolling terrain), and price-to-value ratio.',
    investment: '$500K — Pre-development costs, legal, environmental studies, team operations',
    dataRoomLink: '/data-room/view/property/site-assessment',
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
    detail: 'Land acquisition is the single largest capital deployment event. The $6.5M purchase price includes the full 376-acre parcel. Simultaneously, we initiate the critical planning workstreams: hydrology studies to map water resources and retention pond locations, LPHCP compliance review with environmental consultants, master site planning with Symbiosis TX to define conservation corridors, building envelopes, and infrastructure routes. The Texas Series LLC entity is formed, and the MUD petition is filed to unlock tax-exempt bond financing for infrastructure.',
    investment: '$7.5M — Land acquisition ($6.5M) + planning, legal, entity formation ($1M)',
    dataRoomLink: '/data-room/view/property/construction-budget',
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
    detail: 'Phase 1 construction is designed for rapid revenue activation. Existing structures on the property are converted into a retreat and event center that begins generating cash flow immediately. Simultaneously, the first tiny homes and domes are built to expand guest capacity, and 15 hempcrete model homes begin construction as the flagship product. Infrastructure investment includes roads, water systems, septic, and the initial solar array. This phase proves the construction methodology and establishes market pricing.',
    investment: '$3.5M — Construction, infrastructure, retreat center activation',
    dataRoomLink: '/data-room/view/property/construction-budget',
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
    detail: 'Phase 1 revenue generation marks the transition from capital deployment to cash flow. The retreat center reaches full operational capacity with events, workshops, and wellness retreats. The first hempcrete homes sell at projected prices of $550K-$625K each, with the 10-15% sustainability premium validated by market response. Community gardens and food forests are planted to begin the long-term food self-sufficiency program. Marketing efforts establish a robust buyer pipeline for Phase 2.',
    investment: '$1M — Marketing, operations, food forest planting, community programming',
    dataRoomLink: '/data-room/view/financial/financial-projections',
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
    detail: 'Phase 2 builds the community\'s core amenity infrastructure and scales residential density. The Creation Hub — co-working spaces, artist studios, recording studio, makerspace — becomes the creative heart of the community. Multifamily construction begins, adding 260 units at more accessible price points (~$275K-$350K). Commercial tenants move in, creating the walkable village center with grocery, restaurants, and retail. This phase is largely self-funded from Phase 1 revenues and MUD bond reimbursements.',
    investment: 'Self-funded from Phase 1 revenues + MUD bond reimbursements',
    dataRoomLink: '/data-room/view/financial/financial-projections',
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
    detail: 'Phase 3 completes the full residential and commercial buildout. All 420+ units are constructed and sold or rented. The commercial village center is fully occupied with diverse tenants. The renewable energy grid reaches net-positive status — the community produces more energy than it consumes. Permaculture food forests planted in Phase 1 reach productive maturity, contributing to the 80-100% food self-sufficiency target. The community is fully self-sustaining.',
    investment: 'Self-funded from Phase 2 revenues + ongoing sales',
    dataRoomLink: '/data-room/view/financial/financial-projections',
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
    detail: 'Phase 4 transitions from development to legacy. The Regenerative Community Documentary captures the 10-year journey for global distribution. Online courses and an education platform package the methodology for communities worldwide. Templates, playbooks, and design guidelines are shared to enable replication. Investor distributions ramp to maximum levels as the final assets are monetized. Exit planning provides options for investors including ongoing cash flow, asset sale, or portfolio transfer.',
    investment: 'Funded from operational cash flows + content revenue',
    dataRoomLink: '/data-room/view/investment/executive-summary',
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
  const [activeMilestone, setActiveMilestone] = useState<typeof MILESTONES[number] | null>(null)

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Roadmap</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-6xl text-neutral-900 mb-6 max-w-4xl">
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

                  <div className={`card p-4 sm:p-6 ${milestone.status === 'active' ? 'border-l-4 border-l-secondary-500' : ''}`}>
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

                    <ul className="space-y-2 mb-4">
                      {milestone.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-neutral-600 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setActiveMilestone(milestone)}
                      className="font-accent text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DATA ROOM CALLOUT ═══ */}
      <section className="bg-primary-50 py-12 md:py-16 border-y border-primary-100">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <FolderOpen className="w-7 h-7 text-primary-700" />
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="font-accent text-lg font-semibold text-neutral-900 mb-1">
                  Explore the Complete Investor Data Room
                </h3>
                <p className="text-sm text-neutral-600">
                  29 documents across investment, financial, property, legal, regenerative, research, and compliance categories — full transparency for informed decision-making.
                </p>
              </div>
              <Link
                href="/data-room"
                className="btn-accent btn-lg rounded-2xl text-base whitespace-nowrap group"
              >
                Open Data Room
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-primary-800 py-20 md:py-28">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-white mb-6">
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
              <Link href="/overview" className="btn-secondary-light btn-lg rounded-2xl text-base group">
                Read Executive Summary
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ MILESTONE MODAL ═══ */}
      <Modal
        open={!!activeMilestone}
        onClose={() => setActiveMilestone(null)}
        title={activeMilestone?.title}
        size="md"
      >
        {activeMilestone && (
          <div>
            <span className={`inline-block font-accent text-sm px-3 py-1 rounded-full mb-4 ${
              activeMilestone.status === 'active'
                ? 'text-secondary-700 bg-secondary-50 font-semibold'
                : 'text-primary-600 bg-primary-50'
            }`}>
              {activeMilestone.period}
            </span>

            <p className="text-neutral-600 leading-relaxed mb-6">{activeMilestone.detail}</p>

            <div className="bg-primary-50 rounded-xl p-4 mb-6 flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-primary-700 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-accent text-sm font-semibold text-primary-800 mb-0.5">Capital Deployed</h4>
                <p className="text-sm text-primary-700">{activeMilestone.investment}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-accent text-sm font-semibold text-neutral-900 mb-3">Key Milestones</h4>
              <ul className="space-y-2">
                {activeMilestone.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={activeMilestone.dataRoomLink}
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              onClick={() => setActiveMilestone(null)}
            >
              <ExternalLink className="w-4 h-4" />
              View in Data Room
            </Link>
          </div>
        )}
      </Modal>
    </div>
  )
}
