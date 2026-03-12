'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Modal } from '@/components/ui/Modal'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { useScenario } from '@/lib/context/scenario-context'
import { KEY_METRICS } from '@/lib/data/financials'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { ArrowRight, Leaf, Home, Droplets, Sun } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Animated Stat Component
// ═══════════════════════════════════════════════════════════════════════════

function AnimatedStat({ target, suffix, prefix, label, decimals = 0 }: {
  target: number
  suffix?: string
  prefix?: string
  label: string
  decimals?: number
}) {
  const { count, ref } = useAnimatedCounter({ target, decimals })

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="font-accent text-sm text-white/70 uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const IMAGINE_CARDS = [
  {
    image: '/images/website/02-basic-needs-provided.jpeg',
    text: 'All of your basic needs are provided...',
    detail: 'Food forests, renewable energy, and water security systems ensure every resident has access to clean food, power, and water — without dependence on fragile supply chains.',
    link: '/story/regeneration',
  },
  {
    image: '/images/website/03-everything-you-need-to-thrive.jpeg',
    text: 'You have everything you need to thrive...',
    detail: 'From co-working spaces and maker labs to wellness centers and retreat facilities, Abundancia provides the infrastructure for creative and professional fulfillment.',
    link: '/story/vision',
  },
  {
    image: '/images/website/04-regenerative-buildings-in-harmony.png',
    text: 'Regenerative buildings are in harmony with nature...',
    detail: 'Hempcrete construction sequesters carbon, regulates humidity naturally, and creates the healthiest indoor air quality available — homes that heal the environment as they shelter you.',
    link: '/story/community',
  },
  {
    image: '/images/website/05-inclusive-governance-models.jpg',
    text: 'Inclusive governance models are easily accessible...',
    detail: 'Community-driven decision making through transparent governance structures ensures every voice matters. Residents co-create the rules and culture of their shared home.',
    link: '/story/regeneration',
  },
]

const HIGHLIGHTS = [
  {
    icon: Home,
    title: 'Hempcrete Homes',
    description: 'Carbon-negative, fire-resistant homes that last 500+ years with the healthiest indoor air quality available.',
    detail: 'Hempcrete is a bio-composite material made from hemp hurds and lime that actually sequesters carbon as it cures. Each home removes CO2 from the atmosphere while providing superior thermal mass, natural humidity regulation, and zero off-gassing. Texas building codes now explicitly permit hempcrete construction, giving Abundancia a first-mover advantage in the Austin market.',
    specs: ['R-30+ insulation', '2hr fire rating', '500+ year lifespan', 'Carbon-negative', 'Zero off-gassing', 'Natural humidity control'],
    link: '/data-room/view/regenerative/hempcrete-construction',
    modalKey: 'hempcrete',
  },
  {
    icon: Sun,
    title: 'Net-Positive Energy',
    description: 'Solar arrays with battery storage provide grid-independent renewable energy for every home and facility.',
    detail: 'Every structure at Abundancia generates more energy than it consumes. Rooftop and community solar arrays paired with Tesla Powerwall battery storage create a resilient microgrid. During the 2021 Texas freeze, communities with independent energy systems were the only ones with power. Abundancia is designed to never face that vulnerability.',
    specs: ['100% solar-powered', 'Battery backup storage', 'Grid-independent microgrid', 'Net-positive generation', 'EV charging included'],
    link: '/data-room/view/regenerative/energy-independence',
    modalKey: 'energy',
  },
  {
    icon: Droplets,
    title: 'Water Security',
    description: 'Seven retention ponds, rainwater harvesting, and greywater recycling create redundant water systems.',
    detail: 'Abundancia\'s water infrastructure is designed for total resilience. Seven retention ponds capture stormwater, rainwater harvesting systems serve every building, and greywater recycling reduces consumption by up to 40%. The system is designed to sustain the community through extended drought conditions without reliance on municipal water supply.',
    specs: ['7 retention ponds', 'Rainwater harvesting', 'Greywater recycling', '40% water reduction', 'Drought-resilient design'],
    link: '/data-room/view/regenerative/water-systems',
    modalKey: 'water',
  },
  {
    icon: Leaf,
    title: '90%+ Land Preserved',
    description: 'Conservation-forward design preserves the Lost Pines ecosystem while enhancing Houston toad habitat.',
    detail: 'With a development footprint of only ~4%, over 90% of the 380-acre property is preserved as natural habitat, food forests, and regenerative agriculture. This conservation-forward approach preserves a unique ecosystem and enhances habitat for endangered species. Conservation easements provide significant tax benefits while permanently protecting the land.',
    specs: ['340+ acres preserved', 'Houston toad habitat', 'Lost Pines ecosystem', 'Conservation easements', 'Tax benefit eligible'],
    link: '/data-room/view/property/environmental-compliance',
    modalKey: 'conservation',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  const { scenario } = useScenario()
  const metrics = KEY_METRICS[scenario]
  const [activeModal, setActiveModal] = useState<string | null>(null)

  return (
    <div className="-mt-24">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/website/01-hero-where-dreams-become-reality.png"
          alt="Abundancia Austin — Regenerative Community"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <FadeIn delay={0.2} direction="none">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Leaf className="w-4 h-4 text-secondary-400" />
              <span className="font-accent text-sm text-white/90">380 Acres &middot; Greater Austin, TX</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
              Where Dreams<br />Become Reality
            </h1>
          </FadeIn>

          <FadeIn delay={0.6}>
            <p className="font-heading text-xl sm:text-2xl text-white/80 mb-10 italic max-w-2xl mx-auto">
              Regenerative Living in Harmony with Nature
            </p>
          </FadeIn>

          <FadeIn delay={0.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/story/vision" className="btn-primary btn-lg rounded-2xl text-base group">
                Explore the Vision
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/invest" className="btn-accent btn-lg rounded-2xl text-base">
                Investor Overview
              </Link>
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse-subtle" />
          </div>
        </div>
      </section>

      {/* ═══ KEY METRICS ═══ */}
      <section className="bg-primary-900 py-12 md:py-16">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
            <AnimatedStat target={380} suffix=" Acres" label="Texas Ranchland" />
            <AnimatedStat target={12.5} suffix="M" prefix="$" label="Capital Raise" decimals={1} />
            <AnimatedStat target={metrics.irr} suffix="%" label="Projected IRR" decimals={1} />
            <AnimatedStat target={500} suffix="+" label="Year Building Lifespan" />
            <div className="col-span-2 md:col-span-1">
              <AnimatedStat target={90} suffix="%+" label="Land Preserved" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ IMAGINE A COMMUNITY WHERE... ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">The Vision</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Imagine a Community Where...
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMAGINE_CARDS.map((card) => (
              <StaggerItem key={card.text}>
                <Link href={card.link} className="block">
                  <div className="card-hover overflow-hidden group cursor-pointer">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.text}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5">
                      <p className="font-heading text-base text-neutral-800 italic leading-relaxed mb-2">
                        {card.text}
                      </p>
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        {card.detail}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-3 text-sm font-accent font-semibold text-primary-700 group-hover:text-primary-500 transition-colors">
                        Learn More
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ COMMUNITY AERIAL TAGLINE ═══ */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        <Image
          src="/images/website/06-regenerative-community-aerial.png"
          alt="Abundancia regenerative community aerial view"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-950/70" />

        <div className="relative z-10 section-container text-center">
          <FadeIn>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed max-w-4xl mx-auto font-light">
              A regenerative community designed to secure all basic needs, enabling all to thrive in harmony with nature and each other, while regenerating the environment and showcasing global solutions.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-8 font-body text-lg text-secondary-300 max-w-2xl mx-auto">
              Abundancia prioritizes ecological regeneration, well-being, and supporting each person to reach their full creative potential.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ KEY HIGHLIGHTS ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Why Abundancia</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Built Different. By Design.
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Every feature of Abundancia serves both ecological regeneration and financial performance.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((item) => (
              <StaggerItem key={item.title}>
                <div
                  onClick={() => setActiveModal(item.modalKey)}
                  className="card p-6 h-full cursor-pointer hover:shadow-lg hover:border-primary-200 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                    <item.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-accent text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-3 text-xs font-accent font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ HIGHLIGHT MODALS ═══ */}
      {HIGHLIGHTS.map((item) => (
        <Modal
          key={item.modalKey}
          open={activeModal === item.modalKey}
          onClose={() => setActiveModal(null)}
          title={item.title}
        >
          <div className="space-y-5">
            <p className="text-neutral-600 leading-relaxed">{item.detail}</p>
            <div className="flex flex-wrap gap-2">
              {item.specs.map((spec) => (
                <span
                  key={spec}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-accent font-semibold"
                >
                  {spec}
                </span>
              ))}
            </div>
            <Link
              href={item.link}
              className="inline-flex items-center gap-2 text-sm font-accent font-semibold text-primary-700 hover:text-primary-500 transition-colors mt-2"
              onClick={() => setActiveModal(null)}
            >
              View Full Report
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Modal>
      ))}

      {/* ═══ RESIDENTIAL PREVIEW ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Residential & Commercial</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                A Place to Call Home
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { image: '/images/website/08-homes.png', label: 'Homes' },
              { image: '/images/website/09-commercial-areas.png', label: 'Commercial Areas' },
              { image: '/images/website/10-affordable-condos.png', label: 'Affordable Condos' },
              { image: '/images/website/11-tiny-homes-rendering.png', label: 'Tiny Homes' },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <Link href="/story/community" className="block">
                  <div className="card-hover overflow-hidden group cursor-pointer">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="font-accent text-sm font-semibold text-white">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="text-center mt-10">
              <Link href="/story/community" className="btn-secondary btn-md rounded-xl group">
                Explore All Spaces
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ INVESTMENT CTA ═══ */}
      <section className="bg-primary-800 py-20 md:py-28">
        <div className="section-container text-center">
          <FadeIn>
            <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-4 block">
              Investment Opportunity
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
              $12.5M Capital Raise
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Join the movement toward the next generation of housing. Projected {metrics.irr}% IRR with {metrics.emx}x equity multiple over a 10-year hold. Accredited investors welcome.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/invest" className="btn-accent btn-lg rounded-2xl text-base group">
                Investor Overview
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/model" className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 btn-lg rounded-2xl text-base group">
                View Business Model
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Link href="/team" className="block mt-14 group">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto cursor-pointer rounded-2xl p-6 hover:bg-white/5 transition-colors">
                {[
                  { stat: '$755M+', label: 'Raised for RE Projects' },
                  { stat: '200+', label: 'Successful Transactions' },
                  { stat: '70+', label: 'Eco Communities Analyzed' },
                  { stat: '21', label: 'Sustainable Projects' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="font-display text-2xl font-bold text-secondary-400">{item.stat}</div>
                    <div className="font-accent text-xs text-white/60 mt-1">{item.label}</div>
                  </div>
                ))}
                <div className="col-span-2 md:col-span-4 mt-2">
                  <span className="inline-flex items-center gap-1 text-sm font-accent font-semibold text-secondary-400 group-hover:text-secondary-300 transition-colors">
                    Meet the Team Behind the Numbers
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ WAITLIST CTA ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-6">
              Be Part of the Future
            </h2>
            <p className="text-lg text-neutral-600 max-w-xl mx-auto mb-8">
              Whether you&apos;re looking for a home, an investment, or a new way of living — your journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/waitlist" className="btn-primary btn-lg rounded-2xl text-base group">
                Join Resident Waitlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/overview" className="btn-secondary btn-lg rounded-2xl text-base">
                Read Executive Summary
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
