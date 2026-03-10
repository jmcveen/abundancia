'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const PHASES = [
  {
    number: 0,
    name: 'Due Diligence & Securing the Land',
    timeline: 'Months 1-6',
    color: 'bg-primary-600',
    milestones: [
      'Land acquisition — $6.5M for 376 acres in Cedar Creek',
      'Hydrology study and water resource assessment',
      'Houston toad habitat compliance (LPHCP alignment)',
      'Master site planning with Symbiosis TX',
      'Entity formation — Texas Series LLC',
      'MUD (Municipal Utility District) petition',
    ],
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
      'Infrastructure — roads, water, septic, solar arrays',
      'Revenue target: $500K-$1M retreat + $8.25M-$11.25M home sales',
    ],
  },
  {
    number: 2,
    name: 'Community Core',
    timeline: 'Years 2-4',
    color: 'bg-primary-800',
    milestones: [
      'Community spaces — Creation Hub, education center, yoga shala',
      'Multifamily construction begins (260 units)',
      'Commercial spaces open — grocery, restaurants, retail',
      'Expand to 100+ residential units',
      'Permaculture food forests reach initial maturity',
    ],
  },
  {
    number: 3,
    name: 'Full Buildout',
    timeline: 'Years 4-8',
    color: 'bg-primary-900',
    milestones: [
      'Complete residential buildout — all 420+ owned units',
      'All commercial spaces fully operational',
      'Full renewable energy grid — net-positive',
      'Complete permaculture food forest maturity',
      'Community governance fully operational',
    ],
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
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function ExpansionPage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Development Phases</span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-neutral-900 mb-6 max-w-4xl">
              Five Phases — From Due Diligence to Global Replication
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

                    <ul className="space-y-2">
                      {phase.milestones.map((milestone) => (
                        <li key={milestone} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-neutral-600 leading-relaxed">{milestone}</span>
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

      {/* ═══ REPLICABLE MODEL ═══ */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <Image
          src="/images/website/71-replicable-model-architecture.jpeg"
          alt="Abundancia — a replicable model for regenerative communities worldwide"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-950/75" />

        <div className="relative z-10 section-container text-center">
          <FadeIn>
            <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-4 block">
              The First, Not the Only
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6 max-w-3xl mx-auto">
              A Model for the World
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Abundancia is designed to be replicated. Every system, every process, every lesson is documented and shared — so that regenerative communities can be built everywhere.
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
        </div>
      </section>

      {/* ═══ LOCAL IMPACT ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Community Impact</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Lifting the Entire Region
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { image: '/images/website/66-affordable-homes.jpeg', label: 'Affordable Homes' },
              { image: '/images/website/67-healthy-food.jpeg', label: 'Healthy Food' },
              { image: '/images/website/68-job-creation.jpeg', label: 'Job Creation' },
              { image: '/images/website/69-farmers-market.jpg', label: "Farmer's Market" },
              { image: '/images/website/70-regenerative-education.jpeg', label: 'Regenerative Education' },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="card-hover overflow-hidden group">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="font-accent text-sm font-semibold text-white">{item.label}</span>
                    </div>
                  </div>
                </div>
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
              Meet the Team
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              The leadership, partners, and advisors executing this vision — with $755M+ in real estate experience across 200+ transactions.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/team" className="btn-primary btn-lg rounded-2xl text-base group">
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
    </div>
  )
}
