'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { Modal } from '@/components/ui/Modal'
import { ArrowRight, CheckCircle2, ExternalLink, DollarSign, Target } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const PHASE_DATA_ROOM_LINKS: Record<number, { href: string; label: string }> = {
  0: { href: '/data-room', label: 'View Data Room' },
  1: { href: '/data-room/view/property/construction-budget', label: 'View Construction Budget' },
  2: { href: '/data-room/view/financial/financial-projections', label: 'View Financial Projections' },
  3: { href: '/data-room/view/financial/financial-projections', label: 'View Financial Projections' },
  4: { href: '/data-room/view/investment/executive-summary', label: 'View Executive Summary' },
}

const PHASES = [
  {
    number: 0,
    name: 'Due Diligence & Securing the Land',
    timeline: 'Months 1-6',
    color: 'bg-primary-600',
    milestones: [
      'Land acquisition - $6.5M for 380 acres in Bastrop County, TX',
      'Hydrology study and water resource assessment',
      'Houston toad habitat compliance (LPHCP alignment)',
      'Master site planning with Symbiosis TX',
      'Entity formation - Texas Series LLC',
      'MUD (Municipal Utility District) petition',
    ],
    detail: 'Phase 0 is the foundation - securing the land and completing all due diligence required before breaking ground. The 380-acre property is approximately 30 minutes from downtown Austin, positioned in the path of growth. Due diligence includes environmental assessment, hydrology study (confirming water resources for 665 structures), habitat compliance, and geotechnical analysis. The Texas Series LLC structure enables each development phase to be legally isolated, protecting investor capital. The MUD petition, if approved, unlocks municipal bond financing for future infrastructure.',
    investment: '$4.0M',
    revenueTarget: null,
  },
  {
    number: 1,
    name: 'Revenue Launch',
    timeline: 'Months 6-18',
    color: 'bg-primary-700',
    milestones: [
      'Retreat center operations using existing farmhouse & guest house',
      '10-15 tiny homes and domes for guest capacity',
      'First hempcrete model homes (15 units)',
      'Infrastructure - roads, water, septic, solar arrays',
      'Revenue target: $500K-$1M retreat + $8.25M-$11.25M home sales',
    ],
    detail: 'Phase 1 is designed to generate revenue within 6 months of closing. The existing farmhouse and guest house on the property are repurposed as the retreat center, with 10-15 tiny homes and domes added for guest capacity. Simultaneously, 15 hempcrete model homes are constructed to launch residential sales. This phase proves the concept - demonstrating hempcrete construction, retreat demand, and buyer appetite. Infrastructure investment (roads, water wells, septic, initial solar array) supports both Phase 1 and sets up Phase 2. The retreat center serves as the community\'s "front door," introducing potential buyers to the Abundancia vision.',
    investment: '$5.5M',
    revenueTarget: '$8.75M - $12.25M',
  },
  {
    number: 2,
    name: 'Community Core',
    timeline: 'Years 2-4',
    color: 'bg-primary-800',
    milestones: [
      'Community spaces - Creation Hub, education center, yoga shala',
      'Multifamily construction begins (350 units)',
      'Commercial spaces open - grocery, restaurants, retail',
      'Expand to 100+ residential units',
      'Permaculture food forests reach initial maturity',
    ],
    detail: 'Phase 2 transforms Abundancia from a residential development into a living community. The commercial village center opens - organic grocery, farm-to-table dining, wellness retail, coworking. Community spaces (Creation Hub, education center, yoga shala) become the social fabric. Multifamily construction begins, bringing the unit count past 100 and generating the density needed for commercial viability. Permaculture food forests planted in Phase 1 begin producing, and the community governance structure is formalized. This phase is where the flywheel kicks in - amenities drive demand, demand funds more amenities.',
    investment: '$2.5M (from revenue)',
    revenueTarget: '$104M cumulative by year 4',
  },
  {
    number: 3,
    name: 'Full Buildout',
    timeline: 'Years 4-8',
    color: 'bg-primary-900',
    milestones: [
      'Complete residential buildout - all 665 structures',
      'All commercial spaces fully operational',
      'Full renewable energy grid - net-positive',
      'Complete permaculture food forest maturity',
      'Community governance fully operational',
    ],
    detail: 'Phase 3 completes the physical buildout of Abundancia. All residential units are delivered, commercial spaces are fully leased, and the renewable energy grid achieves net-positive status (producing more energy than consumed). The permaculture food forests reach full maturity, producing meaningful food yields for residents and the village grocery. Community governance - a resident-led cooperative structure - is fully operational. This phase generates peak revenue as the remaining residential inventory is absorbed and all four revenue streams are fully online.',
    investment: 'Self-funded from operations',
    revenueTarget: '$330M cumulative by year 8',
  },
  {
    number: 4,
    name: 'Giveback & Replicate',
    timeline: 'Years 8-10+',
    color: 'bg-primary-950',
    milestones: [
      'Regenerative Community Documentary production',
      'Online development courses launched',
      'Community Building TV shows',
      'Template and resource sharing for global replication',
      'Abundancia as a model for communities worldwide',
    ],
    detail: 'Phase 4 is where Abundancia transcends real estate and becomes a movement. The Regenerative Community Documentary captures the full journey - from bare land to thriving community - creating a blueprint for others. Online courses package the lessons learned: hempcrete construction methods, permaculture food system design, community governance frameworks, MUD formation, and regenerative business modeling. Community Building TV shows bring the vision to mainstream audiences. Every system, template, and process is open-sourced for global replication. Abundancia becomes not just a community, but a proof of concept for the world.',
    investment: '$500K (media production)',
    revenueTarget: '$435M cumulative (10-year total)',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

type ModalContent = {
  title: string
  body: string
  investment: string | null
  revenueTarget: string | null
  link?: { href: string; label: string }
} | null

export default function ExpansionPage() {
  const [modal, setModal] = useState<ModalContent>(null)

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Development Phases</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-6xl text-neutral-900 mb-6 max-w-4xl">
              Five Phases - From Due Diligence to Global Replication
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
              A disciplined development timeline that generates revenue from Phase 1 while building toward the complete vision. Each phase is financially self-supporting.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ PHASE TIMELINE ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {PHASES.map((phase, index) => (
              <FadeIn key={phase.number} delay={index * 0.1}>
                <div className="relative pl-12 pb-12 last:pb-0">
                  {/* Timeline line */}
                  {index < PHASES.length - 1 && (
                    <div className="absolute left-[18px] top-10 bottom-0 w-0.5 bg-primary-200" />
                  )}

                  {/* Phase number circle */}
                  <div className={`absolute left-0 top-0 w-9 h-9 rounded-full ${phase.color} flex items-center justify-center`}>
                    <span className="font-accent text-sm font-bold text-white">{phase.number}</span>
                  </div>

                  {/* Content */}
                  <div className="card p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                      <h3 className="font-display text-xl md:text-2xl text-neutral-900">
                        Phase {phase.number}: {phase.name}
                      </h3>
                      <span className="font-accent text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full whitespace-nowrap">
                        {phase.timeline}
                      </span>
                    </div>

                    {/* Investment & Revenue badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {phase.investment && (
                        <span className="inline-flex items-center gap-1.5 font-accent text-xs font-semibold bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                          <DollarSign className="w-3 h-3" />
                          Capital: {phase.investment}
                        </span>
                      )}
                      {phase.revenueTarget && (
                        <span className="inline-flex items-center gap-1.5 font-accent text-xs font-semibold bg-secondary-50 text-secondary-700 px-3 py-1 rounded-full">
                          <Target className="w-3 h-3" />
                          Revenue: {phase.revenueTarget}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-2">
                      {phase.milestones.map((milestone) => (
                        <li key={milestone} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-neutral-600 leading-relaxed">{milestone}</span>
                        </li>
                      ))}
                    </ul>

                    {/* View Details button */}
                    <button
                      onClick={() => setModal({
                        title: `Phase ${phase.number}: ${phase.name}`,
                        body: phase.detail,
                        investment: phase.investment,
                        revenueTarget: phase.revenueTarget,
                        link: PHASE_DATA_ROOM_LINKS[phase.number],
                      })}
                      className="mt-4 inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors group"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REPLICABLE MODEL ═══ */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <Image
          src="/images/website/71-replicable-model-architecture.png"
          alt="Abundancia - a replicable model for regenerative communities worldwide"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-950/75" />

        <div className="relative z-10 section-container text-center">
          <FadeIn>
            <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-4 block">
              The First, Not the Only
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-white mb-6 max-w-3xl mx-auto">
              A Model for the World
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Abundancia is designed to be replicated. Every system, every process, every lesson is documented and shared - so that regenerative communities can be built everywhere.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            {[
              'Regenerative Community Documentary',
              'Online Development Courses',
              'Community Building TV Shows',
              'Education & Workshops',
            ].map((item) => (
              <StaggerItem key={item}>
                <div className="bg-white/10 border border-white/10 rounded-xl p-4">
                  <span className="font-accent text-sm text-white/90">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <Link
              href="/story/vision"
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-secondary-400 hover:text-secondary-300 transition-colors group"
            >
              View the Vision
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ LOCAL IMPACT ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Community Impact</span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
                Lifting the Entire Region
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { image: '/images/website/66-affordable-homes.png', label: 'Affordable Homes' },
              { image: '/images/website/67-healthy-food.png', label: 'Healthy Food' },
              { image: '/images/website/68-job-creation.png', label: 'Job Creation' },
              { image: '/images/website/69-farmers-market.png', label: "Farmer's Market" },
              { image: '/images/website/70-regenerative-education.png', label: 'Regenerative Education' },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <Link href="/story/regeneration" className="card-hover overflow-hidden group block">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <span className="font-accent text-sm font-semibold text-white">{item.label}</span>
                      <ArrowRight className="w-4 h-4 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
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
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-white mb-6">
              Meet the Team
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              The leadership, partners, and advisors executing this vision - with $755M+ in real estate experience across 200+ transactions.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/team" className="btn-primary-light btn-lg rounded-2xl text-base group">
                Meet the Team
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/invest/apply" className="btn-accent btn-lg rounded-2xl text-base">
                Join Investor Waitlist
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
            {/* Investment & Revenue in modal */}
            {(modal.investment || modal.revenueTarget) && (
              <div className="flex flex-wrap gap-3 mb-5">
                {modal.investment && (
                  <div className="bg-primary-50 border border-primary-100 rounded-xl px-4 py-3">
                    <div className="font-accent text-xs font-semibold text-primary-600 uppercase tracking-wide mb-0.5">Capital Deployed</div>
                    <div className="font-display text-lg font-bold text-primary-800">{modal.investment}</div>
                  </div>
                )}
                {modal.revenueTarget && (
                  <div className="bg-secondary-50 border border-secondary-100 rounded-xl px-4 py-3">
                    <div className="font-accent text-xs font-semibold text-secondary-600 uppercase tracking-wide mb-0.5">Revenue Target</div>
                    <div className="font-display text-lg font-bold text-secondary-800">{modal.revenueTarget}</div>
                  </div>
                )}
              </div>
            )}

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
