'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { Modal } from '@/components/ui/Modal'
import {
  ArrowRight, Flame, Zap, Droplets, Home, Shield, TreePine,
  Scale, Heart, Users, Sparkles, HandHeart, Infinity, ExternalLink
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const PROBLEMS = [
  {
    stat: '40%',
    description: 'of global CO2 emissions come from conventional construction and buildings.',
    detail: [
      'Buildings are the single largest contributor to climate change, responsible for approximately 40% of global CO2 emissions. This includes both the energy consumed during a building\'s lifetime (operational carbon) and the carbon embedded in construction materials like concrete, steel, and glass (embodied carbon).',
      'Hempcrete offers a revolutionary alternative. As a bio-composite material, hempcrete actually sequesters carbon — each cubic meter locks away approximately 110 kg of CO2 permanently. An average hempcrete home sequesters 20-30 tons of CO2 during construction alone, making it carbon-negative from day one.',
      'At Abundancia, every home is built with hempcrete, turning the biggest source of emissions into a tool for atmospheric healing. Over 250+ homes, this represents thousands of tons of CO2 permanently removed from the atmosphere.',
    ],
    link: '/data-room/view/regenerative/hempcrete-construction',
    linkLabel: 'Explore Hempcrete Construction',
  },
  {
    stat: '600M+',
    description: 'tons of construction waste generated annually in the US alone.',
    detail: [
      'The US construction industry generates over 600 million tons of waste per year — nearly twice the amount of municipal solid waste. Demolition alone accounts for over 90% of this figure, creating a cycle where buildings designed to last 30-50 years end up as landfill.',
      'Hempcrete buildings are designed to last 500+ years, fundamentally breaking the demolition-rebuild cycle. The material is fully biodegradable at end of life, returning nutrients to the soil rather than filling landfills. During construction, hempcrete generates virtually zero waste — offcuts can be composted or reused.',
      'Abundancia\'s zero-waste construction philosophy extends beyond hempcrete. Salvaged materials, modular design, and on-site composting of organic construction waste mean that our build process generates a fraction of the waste of a conventional development.',
    ],
    link: '/story/regeneration',
    linkLabel: 'Our Regenerative Approach',
  },
  {
    stat: '34,000',
    description: 'acres burned in the 2011 Bastrop Complex Fire — the most destructive in Texas history.',
    detail: [
      'The 2011 Bastrop Complex Fire was the most destructive wildfire in Texas history, burning 34,000 acres and destroying 1,673 homes over 55 days. The Lost Pines ecoregion — the same area where Abundancia is located — was devastated, and the scars are still visible today.',
      'This history makes fire resistance non-negotiable for any responsible development in the region. Hempcrete has been tested to achieve a 2+ hour fire rating, compared to 30-60 minutes for conventional wood-frame construction. The material does not ignite, does not spread flame, and does not produce toxic smoke.',
      'Abundancia\'s fire resilience strategy goes beyond building materials. Defensible space design, native fire-resistant landscaping, water retention ponds for emergency fire suppression, and community-wide fire response planning create multiple layers of protection that no other development in the Lost Pines can match.',
    ],
    link: '/data-room/view/regenerative/hempcrete-construction',
    linkLabel: 'Hempcrete Fire Ratings',
  },
  {
    stat: '$435K+',
    description: 'median home price in Austin, pricing families out of the market entirely.',
    detail: [
      'Austin\'s median home price has surged past $435,000, with many desirable neighborhoods well above $600,000. This has created a housing affordability crisis that prices out teachers, artists, service workers, and young professionals — the very people who make Austin\'s culture vibrant.',
      'Abundancia addresses affordability through multiple strategies. Hempcrete construction costs are competitive with conventional building when factoring in reduced HVAC requirements, minimal maintenance, and extreme longevity. Off-grid energy systems eliminate utility bills. Community food production reduces grocery costs. The result is a dramatically lower total cost of living.',
      'Located just 30 minutes from downtown Austin via SH 71, Abundancia offers access to Austin\'s tech jobs, live music scene, and cultural amenities at a significantly lower price point. Residents get the Austin lifestyle without the Austin price tag — and in a community designed for genuine human connection.',
    ],
    link: '/market',
    linkLabel: 'See Market Analysis',
  },
]

const DIFFERENTIATORS = [
  {
    icon: Flame,
    title: 'Fire-Resistant Hempcrete',
    description: 'In a region scarred by the 2011 Bastrop Complex Fire, our homes have 2+ hour fire ratings. No other development in the Lost Pines offers this protection.',
    detail: 'Hempcrete achieves a fire rating exceeding 2 hours — more than double the 30-60 minute rating of conventional wood-frame construction. The material does not ignite, does not spread flame, and produces no toxic smoke when exposed to extreme heat.',
    specs: ['2+ Hour Fire Rating', 'Zero Flame Spread', 'No Toxic Smoke', 'Non-Combustible Core', 'Tested to ASTM E119'],
    link: '/data-room/view/regenerative/hempcrete-construction',
  },
  {
    icon: Zap,
    title: 'Grid-Independent Resilience',
    description: 'After Winter Storm Uri, Texans understand energy independence. Solar + battery storage + passive design means Abundancia residents never lose power.',
    detail: 'Each home is equipped with rooftop solar arrays, battery storage systems, and passive solar design. Hempcrete\'s exceptional thermal mass maintains comfortable temperatures with minimal energy input, even during Texas summers or winter storms like Uri.',
    specs: ['100% Solar Powered', '48-Hour Battery Backup', 'Passive Solar Design', 'Net-Zero Energy', 'R-30+ Insulation Value'],
    link: '/data-room/view/regenerative/energy-independence',
  },
  {
    icon: Droplets,
    title: 'Water Security',
    description: 'Seven existing retention ponds, rainwater harvesting, ACWA water backup, and greywater recycling create redundant water systems in a drought-prone state.',
    detail: 'Abundancia\'s water strategy is built on redundancy. Seven retention ponds provide primary storage, supplemented by per-home rainwater harvesting, greywater recycling systems, and ACWA municipal water as a final backup. This multi-layer approach ensures water security even during severe Texas droughts.',
    specs: ['7 Retention Ponds', 'Rainwater Harvesting', 'Greywater Recycling', 'ACWA Backup Supply', 'Structured Water Systems'],
    link: '/data-room/view/regenerative/water-systems',
  },
  {
    icon: Home,
    title: "Austin's Culture, Not Its Prices",
    description: '30 minutes from downtown Austin — access the tech jobs, live music, and culture while living in a purpose-built community at lower price points.',
    detail: 'Cedar Creek sits in the sweet spot — close enough to Austin for daily commuting via SH 71 and SH 130, but far enough to benefit from Bastrop County\'s lower land costs, zero zoning restrictions, and agricultural tax exemptions. Residents access Austin\'s $400B economy while living in a regenerative community.',
    specs: ['30 Min to Downtown', 'SH 71 Direct Access', 'Austin-Bergstrom Airport Nearby', 'Tech Corridor Access', 'Lower Price Points'],
    link: '/data-room/view/research/market-research-report',
  },
  {
    icon: Shield,
    title: 'No Zoning Barriers',
    description: "Bastrop County's lack of zoning means mixed-use, innovative community design can be built by right — no years of rezoning hearings or political risk.",
    detail: 'While Austin developments spend 18-24 months navigating rezoning hearings and political opposition, Bastrop County allows mixed-use, innovative design by right. This eliminates political risk, accelerates timelines to 6-12 months, and enables the kind of integrated live-work-play community design that traditional zoning prohibits.',
    specs: ['Zero Zoning Restrictions', '6-12 Month Permitting', 'Mixed-Use by Right', 'No Rezoning Risk', 'IRC 2024 Hempcrete Codes'],
    link: '/data-room/view/property/site-assessment',
  },
  {
    icon: Scale,
    title: 'MUD Bond Financing',
    description: 'Municipal Utility District bonds can reimburse infrastructure costs with tax-free municipal bonds, dramatically improving project economics.',
    detail: 'A Municipal Utility District (MUD) allows Abundancia to issue tax-free municipal bonds to reimburse infrastructure costs — roads, water, sewer, drainage, and utilities. This converts upfront capital expenditure into long-term tax-supported debt, dramatically improving project IRR and reducing the equity requirement.',
    specs: ['Tax-Free Municipal Bonds', 'Infrastructure Reimbursement', 'Improved Project IRR', 'Reduced Equity Requirement', 'Texas-Proven Structure'],
    link: '/data-room/view/legal/mud-bond-framework',
  },
]

const PRINCIPLES = [
  {
    icon: TreePine,
    title: 'Regeneration',
    image: '/images/website/60-regeneration.png',
    description: 'Permaculture, zero pollution, zero waste, net-positive renewable energy, carbon sequestration, and abundant organic food. The earth is not harmed — only positive impact is made.',
    detail: 'Regeneration is the foundational principle of Abundancia. Every system is designed to give more than it takes — hempcrete sequesters carbon, food forests build topsoil, water systems recharge aquifers, and native plantings restore the Lost Pines ecosystem. This is not sustainability (maintaining the status quo) but active healing of damaged systems. Our permaculture design follows Holmgren\'s 12 principles, creating stacked functions where every element serves multiple purposes. The 70-75% conservation zone is not "undeveloped land" — it is an actively managed regenerative landscape.',
    relatedLink: '/story/regeneration',
    relatedLabel: 'Explore Regenerative Systems',
  },
  {
    icon: Sparkles,
    title: 'Creative Expression & Full Potential',
    image: '/images/website/63-co-creation-collaboration.png',
    description: 'Spaces where people fully express their creativity with all the tools they need. Once basic needs are met, residents focus on creation and innovation.',
    detail: 'When housing, food, water, and energy are handled, human energy is freed for higher pursuits. Abundancia includes dedicated maker spaces, art studios, music venues, co-working hubs, and outdoor amphitheaters designed to support creative expression at every scale. From the solo artist to the startup team, the built environment is calibrated to inspire creation. The barn with a performance stage already on the property will serve as a cultural anchor from Phase 1. Our programming includes artist residencies, innovation challenges, and community art installations.',
    relatedLink: '/story/community',
    relatedLabel: 'See Community Spaces',
  },
  {
    icon: Heart,
    title: 'Well-Being',
    image: '/images/website/61-well-being.png',
    description: "Human well-being comes first — people's ability to live a life they value, comprising cultural heritage, health, access to land and natural resources.",
    detail: 'Well-being at Abundancia is holistic — physical, mental, emotional, and spiritual. The community includes walking and cycling trails, a holistic health center, meditation gardens, organic food production, and structured water systems. Every home is built with non-toxic hempcrete that actively regulates humidity and temperature, creating the healthiest possible indoor environment. The US Surgeon General has declared loneliness a public health epidemic. Abundancia\'s design directly addresses this through walkable neighborhoods, communal gathering spaces, and programmed social activities that make authentic connection the default, not the exception.',
    relatedLink: '/story/community',
    relatedLabel: 'Community & Well-Being',
  },
  {
    icon: Users,
    title: 'Co-Creation & Collaboration',
    image: '/images/website/63-co-creation-collaboration.png',
    description: 'Spaces to co-work and create businesses with positive impact. Sociocratic governance where everyone is included and all voices matter.',
    detail: 'Abundancia uses sociocratic governance — a consent-based decision-making model where every resident has a voice and no one is excluded. This is not majority-rule democracy but a structured process that ensures all concerns are heard and integrated. The commercial village includes co-working spaces, shared workshops, and incubator facilities designed to support regenerative businesses. Residents can launch enterprises that serve both the community and the broader market, creating a circular local economy that keeps wealth within the community.',
    relatedLink: '/story/community',
    relatedLabel: 'Governance & Collaboration',
  },
  {
    icon: HandHeart,
    title: 'Connection & Loving Kindness',
    image: '/images/website/62-connection-loving-kindness.png',
    description: 'Social gatherings, authentic relating, and entertainment connecting neighbors and the local community. Designed from the ground up for connection.',
    detail: 'The physical design of Abundancia is intentionally calibrated for human connection. Front porches face shared courtyards. Walking paths converge at gathering nodes. The community hub, commercial village, and food forests are positioned to create natural encounter points throughout daily life. Programmed activities — community dinners, music nights, seasonal festivals, authentic relating circles, and skill-sharing workshops — create regular rhythms of connection. This is architecture and programming working together to solve the loneliness epidemic at its root.',
    relatedLink: '/story/community',
    relatedLabel: 'Connection by Design',
  },
  {
    icon: Infinity,
    title: '7 Generations of Impact',
    image: '/images/website/64-seven-generations-of-impact.png',
    description: 'If everyone built the way we build, all major world problems could be eradicated. Hempcrete buildings last 500+ years — truly building for seven generations.',
    detail: 'The Haudenosaunee (Iroquois) principle of Seven Generations teaches that every decision should consider its impact seven generations into the future — roughly 175 years. Hempcrete buildings last 500+ years, far exceeding this standard. Unlike conventional construction that degrades and requires demolition within 30-50 years, hempcrete actually strengthens over time as the lime binder continues to petrify. Abundancia is not just a development — it is a proof of concept. If replicated globally, regenerative building and community design could address climate change, housing affordability, food security, energy independence, and social isolation simultaneously. We are building the template.',
    relatedLink: '/expansion',
    relatedLabel: 'Expansion & Replication',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Maslow's Hierarchy Pyramid
// ═══════════════════════════════════════════════════════════════════════════

const PYRAMID_LEVELS = [
  {
    title: 'Self-Actualization',
    description: 'Creative expression in art, inventorship, entrepreneurship, education, music, and health and wellness',
    color: 'from-[#ceb78e] to-[#b8a274]',
    textColor: 'text-white',
    width: 'w-[45%]',
  },
  {
    title: 'Esteem & Accomplishment',
    description: 'Involvement in community decisions, environmental regeneration, and global initiatives',
    color: 'from-[#d4c49e] to-[#c4b48e]',
    textColor: 'text-neutral-800',
    width: 'w-[60%]',
  },
  {
    title: 'Belongingness & Love',
    description: 'Community events, authentic relations and recreation',
    color: 'from-[#e0d5b8] to-[#d5cab0]',
    textColor: 'text-neutral-800',
    width: 'w-[75%]',
  },
  {
    title: 'Safety Needs',
    description: 'Gated security protection and conflict resolution strategies',
    color: 'from-[#e8e0cc] to-[#ddd5c2]',
    textColor: 'text-neutral-700',
    width: 'w-[88%]',
  },
  {
    title: 'Physiological Needs',
    description: 'Food, energy, water, waste management are free',
    color: 'from-[#f0eadb] to-[#e8e2d4]',
    textColor: 'text-neutral-700',
    width: 'w-full',
  },
]

function MaslowPyramid() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* Apex cap */}
      <div className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[20px] border-l-transparent border-r-transparent border-b-[#ceb78e]" />

      {PYRAMID_LEVELS.map((level, i) => (
        <div
          key={level.title}
          className={`${level.width} bg-gradient-to-r ${level.color} ${level.textColor} text-center py-3 md:py-4 px-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}
          style={{
            clipPath: i === PYRAMID_LEVELS.length - 1
              ? 'none'
              : 'polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)',
            borderRadius: i === PYRAMID_LEVELS.length - 1 ? '0 0 4px 4px' : '0',
          }}
        >
          <p className="font-accent text-xs md:text-sm font-semibold tracking-wide uppercase leading-tight">
            {level.title}
          </p>
          <p className="text-xs md:text-sm opacity-75 mt-0.5 leading-snug max-w-[90%] mx-auto">
            {level.description}
          </p>
        </div>
      ))}

      {/* Label */}
      <p className="mt-3 font-accent text-xs tracking-[0.15em] uppercase text-neutral-400">
        Maslow&apos;s Hierarchy — Abundancia Model
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function VisionPage() {
  const [activeProblem, setActiveProblem] = useState<number | null>(null)
  const [activeDifferentiator, setActiveDifferentiator] = useState<number | null>(null)
  const [activePrinciple, setActivePrinciple] = useState<number | null>(null)

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Our Vision</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-6xl text-neutral-900 mb-6 max-w-4xl">
              Regenerative Development Is the Most Profitable Form of Real Estate
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
              Not despite preserving nature, but <em>because</em> of it. Abundancia exists to prove this thesis — and to create a replicable model for how humanity can build for the future of our planet while generating exceptional returns.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex items-center gap-3">
              <div className="accent-line w-16" />
              <span className="font-accent text-sm text-neutral-500">376 Acres &middot; Cedar Creek, Bastrop County, TX</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div>
                <span className="eyebrow mb-3 block">The Problem</span>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-6">
                  The Way We Build Is Broken
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  Conventional development generates pollution, waste, and environmental destruction. Buildings account for 40% of US energy consumption and 39% of CO2 emissions. Construction generates 600 million tons of waste annually.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  Texas faces acute challenges — the 2011 Bastrop wildfire destroyed 1,673 homes, Winter Storm Uri exposed grid fragility, and Austin&apos;s housing affordability crisis prices families out. Meanwhile, neighborhoods designed without gathering spaces, walkable amenities, or shared purpose create communities in name only.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  The mental health crisis — anxiety, depression, loneliness at epidemic levels — is directly connected to how we build. The US Surgeon General has declared loneliness a global health threat.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {PROBLEMS.map((item, index) => (
                  <button
                    key={item.stat}
                    onClick={() => setActiveProblem(index)}
                    className="card p-5 text-left hover:border-primary-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
                  >
                    <div className="font-display text-2xl md:text-3xl font-bold text-primary-800 mb-2">
                      {item.stat}
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs font-accent font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn more <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Problem Modal */}
      <Modal
        open={activeProblem !== null}
        onClose={() => setActiveProblem(null)}
        title={activeProblem !== null ? `${PROBLEMS[activeProblem].stat} — The Problem` : ''}
      >
        {activeProblem !== null && (
          <div>
            <p className="font-accent text-base font-semibold text-neutral-900 mb-4">
              {PROBLEMS[activeProblem].description}
            </p>
            <div className="space-y-4 mb-6">
              {PROBLEMS[activeProblem].detail.map((paragraph, i) => (
                <p key={i} className="text-sm text-neutral-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href={PROBLEMS[activeProblem].link}
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors"
            >
              {PROBLEMS[activeProblem].linkLabel}
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        )}
      </Modal>

      {/* ═══ THE SOLUTION ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                The Solution
              </span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-6">
                A Fundamentally Different Way of Living
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                When someone buys a home in Abundancia, they gain access to a complete ecosystem. Their hempcrete home is carbon-negative — it literally heals the atmosphere. They have free renewable energy, structured water, organic food from community gardens, holistic health care, and spaces for creation and connection.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((item, index) => (
              <StaggerItem key={item.title}>
                <button
                  onClick={() => setActiveDifferentiator(index)}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-colors duration-300 cursor-pointer text-left w-full group"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-secondary-400" />
                  </div>
                  <h3 className="font-accent text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 text-xs font-accent font-semibold text-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View details <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Differentiator Modal */}
      <Modal
        open={activeDifferentiator !== null}
        onClose={() => setActiveDifferentiator(null)}
        title={activeDifferentiator !== null ? DIFFERENTIATORS[activeDifferentiator].title : ''}
      >
        {activeDifferentiator !== null && (
          <div>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              {DIFFERENTIATORS[activeDifferentiator].detail}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {DIFFERENTIATORS[activeDifferentiator].specs.map((spec) => (
                <span
                  key={spec}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-accent font-semibold bg-primary-50 text-primary-700 border border-primary-100"
                >
                  {spec}
                </span>
              ))}
            </div>

            <Link
              href={DIFFERENTIATORS[activeDifferentiator].link}
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors group"
            >
              Explore in Data Room
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </Modal>

      {/* ═══ GUIDING PRINCIPLES ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Guiding Principles</span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
                What We Stand For
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Six principles guide every decision at Abundancia — from architectural design to governance to how we treat the land.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((principle, index) => (
              <StaggerItem key={principle.title}>
                <button
                  onClick={() => setActivePrinciple(index)}
                  className="card-hover overflow-hidden h-full flex flex-col text-left w-full cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={principle.image}
                      alt={principle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <principle.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-accent text-sm font-semibold text-white">
                        {principle.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1">
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {principle.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs font-accent font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore principle <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Principle Modal */}
      <Modal
        open={activePrinciple !== null}
        onClose={() => setActivePrinciple(null)}
        title={activePrinciple !== null ? PRINCIPLES[activePrinciple].title : ''}
      >
        {activePrinciple !== null && (
          <div>
            <div className="relative h-48 rounded-xl overflow-hidden mb-6">
              <Image
                src={PRINCIPLES[activePrinciple].image}
                alt={PRINCIPLES[activePrinciple].title}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-accent text-base font-semibold text-neutral-900 mb-3">
              {PRINCIPLES[activePrinciple].description}
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              {PRINCIPLES[activePrinciple].detail}
            </p>
            <Link
              href={PRINCIPLES[activePrinciple].relatedLink}
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors group"
            >
              {PRINCIPLES[activePrinciple].relatedLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </Modal>

      {/* ═══ MASLOW'S HIERARCHY ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="max-w-lg mx-auto lg:mx-0">
                <MaslowPyramid />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <span className="eyebrow mb-3 block">Human Potential</span>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-6">
                  Liberating Human Potential
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  Abundancia is designed to meet every level of Maslow&apos;s hierarchy — from physiological needs (clean water, organic food, healthy shelter) through safety, belonging, and esteem, all the way to self-actualization.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  When basic needs are met — food, water, energy, shelter, community — human potential is liberated. Residents don&apos;t have to rely on making money to meet survival needs. They can focus on creation, innovation, and living their dream lives.
                </p>
                <div className="accent-line w-full mb-6" />
                <p className="font-heading text-base text-neutral-800 italic">
                  &ldquo;When the environment supports our highest expression, the elevation of humanity can flourish.&rdquo;
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ REPLICABLE MODEL ═══ */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <Image
          src="/images/website/71-replicable-model-architecture.png"
          alt="Abundancia — a replicable model for regenerative communities"
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
              Abundancia will serve as a model for how to build regenerative communities around the world. We will share our templates and resources through:
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

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/story/land" className="btn-primary-light btn-lg rounded-2xl text-base group">
                Explore the Land
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/expansion" className="btn-secondary-light btn-lg rounded-2xl text-base group">
                Expansion Strategy
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/data-room/view/investment/executive-summary"
                className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-secondary-400 hover:text-secondary-300 transition-colors"
              >
                Executive Summary
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
