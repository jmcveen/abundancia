'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Modal } from '@/components/ui/Modal'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { useScenario } from '@/lib/context/scenario-context'
import { KEY_METRICS } from '@/lib/data/financials'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { ArrowRight, Leaf, Home, Droplets, Sun, ChevronDown } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Animated Stat Component
// ═══════════════════════════════════════════════════════════════════════════

function AnimatedStat({ target, suffix, prefix, label, decimals = 0, dark = false }: {
  target: number
  suffix?: string
  prefix?: string
  label: string
  decimals?: number
  dark?: boolean
}) {
  const { count, ref } = useAnimatedCounter({ target, decimals })

  return (
    <div ref={ref} className="text-center">
      <div className={`font-display text-2xl sm:text-3xl md:text-4xl mb-2 tracking-wider ${dark ? 'text-white' : 'text-neutral-900'}`}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className={`font-accent text-xs uppercase tracking-[0.2em] ${dark ? 'text-white/40' : 'text-neutral-400'}`}>
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
    image: '/images/generated/abundancia-06-organic_food_community.png',
    text: 'All of your basic needs are provided...',
    detail: 'Food forests, renewable energy, and water security systems ensure every resident has access to clean food, power, and water - without dependence on fragile supply chains.',
    link: '/story/regeneration',
  },
  {
    image: '/images/generated/abundancia-03-yoga_wellness.png',
    text: 'You have everything you need to thrive...',
    detail: 'From co-working spaces and maker labs to wellness centers and retreat facilities, Abundancia provides the infrastructure for creative and professional fulfillment.',
    link: '/story/vision',
  },
  {
    image: '/images/generated/abundancia-07-eco_living_spaces.png',
    text: 'Regenerative buildings are in harmony with nature...',
    detail: 'Hempcrete construction sequesters carbon, regulates humidity naturally, and creates the healthiest indoor air quality available - homes that heal the environment as they shelter you.',
    link: '/story/community',
  },
  {
    image: '/images/generated/abundancia-05-organic_food_community.png',
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
      {/* ═══ HERO — Full-screen cinematic ═══ */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <Image
          src="/images/generated/abundancia-01-hero.png"
          alt="Abundancia Austin - Regenerative Community"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />

        {/* Hero Content — Bottom-aligned like Apple */}
        <div className="relative z-10 w-full pb-20 md:pb-28">
          <div className="section-container">
            <FadeIn delay={0.3} direction="none">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-px h-4 bg-[#ceb78e]" />
                <span className="font-accent text-xs text-white uppercase tracking-[0.25em]">
                  380 Acres &middot; Greater Austin, TX
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-[0.04em] uppercase">
                Where Dreams<br />Become Reality
              </h1>
            </FadeIn>

            <FadeIn delay={0.7}>
              <p className="font-body text-lg sm:text-xl text-white mb-10 max-w-xl font-light">
                Regenerative Living in Harmony with Nature
              </p>
            </FadeIn>

            <FadeIn delay={0.9}>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/story/vision" className="btn-accent btn-lg group">
                  Explore the Vision
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/invest" className="btn-primary-light btn-lg">
                  Investor Overview
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-float">
          <ChevronDown className="w-5 h-5 text-white/30" />
        </div>
      </section>

      {/* ═══ KEY METRICS — Clean light strip ═══ */}
      <section className="bg-white border-b border-black/[0.04] py-16 md:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 md:gap-4">
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

      {/* ═══ IMAGINE A COMMUNITY WHERE... — Editorial grid ═══ */}
      <section className="py-28 md:py-40 bg-[#fafaf8]">
        <div className="section-container">
          <FadeIn>
            <div className="mb-20 max-w-3xl">
              <span className="eyebrow mb-6 block">The Vision</span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 tracking-[0.04em]">
                Imagine a Community Where...
              </h2>
            </div>
          </FadeIn>

          {/* Staggered editorial cards */}
          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
            {IMAGINE_CARDS.map((card, i) => (
              <FadeIn key={card.text} delay={i * 0.15}>
                <Link href={card.link} className="group block cursor-pointer">
                  <div className={`${i % 2 === 1 ? 'md:mt-16' : ''}`}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-6">
                      <Image
                        src={card.image}
                        alt={card.text}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo"
                      />
                    </div>
                    <p className="font-display text-lg md:text-xl text-neutral-900 tracking-wide uppercase mb-3">
                      {card.text}
                    </p>
                    <p className="font-body text-sm text-neutral-400 leading-relaxed mb-4 max-w-md">
                      {card.detail}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-accent font-medium text-[#a08a5e] uppercase tracking-[0.15em] group-hover:gap-3 transition-all duration-300">
                      Learn More
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMMUNITY AERIAL — Full-bleed immersive (dark section) ═══ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <Image
          src="/images/generated/abundancia-09-nature_landscape.png"
          alt="Abundancia regenerative community aerial view"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 section-container py-28 md:py-40">
          <FadeIn>
            <div className="max-w-4xl">
              <div className="w-12 h-px bg-[#ceb78e] mb-10" />
              <p className="font-display text-xl sm:text-2xl md:text-3xl text-white leading-relaxed tracking-wide uppercase">
                A regenerative community designed to secure all basic needs, enabling all to thrive in harmony with nature and each other, while regenerating the environment and showcasing global solutions.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-10 font-body text-base sm:text-lg text-white/40 max-w-2xl font-light">
              Abundancia prioritizes ecological regeneration, well-being, and supporting each person to reach their full creative potential.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ KEY HIGHLIGHTS — Minimal feature grid ═══ */}
      <section className="py-28 md:py-40 bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="mb-20 max-w-3xl">
              <span className="eyebrow mb-6 block">Why Abundancia</span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 tracking-[0.04em] mb-6">
                Built Different. By Design.
              </h2>
              <p className="font-body text-base text-neutral-400 max-w-2xl font-light">
                Every feature of Abundancia serves both ecological regeneration and financial performance.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/[0.04] rounded-2xl overflow-hidden">
            {HIGHLIGHTS.map((item) => (
              <StaggerItem key={item.title}>
                <div
                  onClick={() => setActiveModal(item.modalKey)}
                  className="bg-white p-8 md:p-10 h-full cursor-pointer group hover:bg-[#fafaf8] transition-colors duration-500"
                >
                  <div className="w-10 h-10 rounded-full border border-black/[0.08] flex items-center justify-center mb-8 group-hover:border-[#ceb78e]/40 transition-colors duration-500">
                    <item.icon className="w-5 h-5 text-[#a08a5e]" />
                  </div>
                  <h3 className="font-display text-base text-neutral-900 tracking-[0.1em] uppercase mb-4">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-6 text-xs font-accent text-[#a08a5e]/50 uppercase tracking-[0.15em] group-hover:text-[#a08a5e] transition-colors duration-300">
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
            <p className="text-neutral-500 leading-relaxed">{item.detail}</p>
            <div className="flex flex-wrap gap-2">
              {item.specs.map((spec) => (
                <span
                  key={spec}
                  className="inline-flex items-center px-3 py-2 rounded-full bg-neutral-50 border border-neutral-100 text-neutral-600 text-xs font-accent"
                >
                  {spec}
                </span>
              ))}
            </div>
            <Link
              href={item.link}
              className="inline-flex items-center gap-2 text-sm font-accent text-[#a08a5e] hover:text-[#8a7450] transition-colors mt-2"
              onClick={() => setActiveModal(null)}
            >
              View Full Report
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Modal>
      ))}

      {/* ═══ RESIDENTIAL PREVIEW — Cinematic grid ═══ */}
      <section className="py-28 md:py-40 bg-[#fafaf8]">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-20">
              <span className="eyebrow mb-6 block">Residential & Commercial</span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 tracking-[0.04em]">
                A Place to Call Home
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { image: '/images/generated/abundancia-08-eco_living_spaces.png', label: 'Outdoor Living' },
              { image: '/images/generated/abundancia-04-yoga_wellness.png', label: 'Wellness' },
              { image: '/images/generated/abundancia-10-nature_landscape.png', label: 'Conservation' },
              { image: '/images/generated/abundancia-02-hero.png', label: 'Community' },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <Link href="/story/community" className="block group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="font-display text-sm text-white tracking-[0.15em] uppercase">
                        {item.label}
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="text-center mt-14">
              <Link href="/story/community" className="btn-primary btn-md group">
                Explore All Spaces
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ INVESTMENT CTA — Dark luxury section ═══ */}
      <section className="py-28 md:py-40 bg-[#0f0f0f]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left — Text */}
            <FadeIn>
              <div>
                <span className="font-accent text-xs font-medium uppercase tracking-[0.2em] text-[#ceb78e] mb-6 block">
                  Investment Opportunity
                </span>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-white tracking-[0.04em] mb-8">
                  $12.5M Capital Raise
                </h2>
                <p className="font-body text-base text-white/40 max-w-lg mb-10 font-light leading-relaxed">
                  Join the movement toward the next generation of housing. Projected {metrics.irr}% IRR with {metrics.emx}x equity multiple over a 10-year hold. Accredited investors welcome.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Link href="/invest" className="btn-accent btn-lg group">
                    Investor Overview
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/model" className="btn-secondary-light btn-lg group">
                    View Business Model
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Right — Stats grid */}
            <FadeIn delay={0.2}>
              <Link href="/team" className="block group">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
                  {[
                    { stat: '$755M+', label: 'Raised for RE Projects' },
                    { stat: '200+', label: 'Successful Transactions' },
                    { stat: '70+', label: 'Eco Communities Analyzed' },
                    { stat: '21', label: 'Sustainable Projects' },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#0f0f0f] group-hover:bg-white/[0.02] transition-colors duration-500 p-8 text-center">
                      <div className="font-display text-2xl md:text-3xl text-[#ceb78e] tracking-wider mb-2">{item.stat}</div>
                      <div className="font-accent text-xs text-white/30 uppercase tracking-[0.15em]">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <span className="inline-flex items-center gap-2 text-xs font-accent text-[#ceb78e]/60 uppercase tracking-[0.15em] group-hover:text-[#ceb78e] transition-colors duration-300">
                    Meet the Team Behind the Numbers
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ WAITLIST CTA — Centered, minimal ═══ */}
      <section className="py-28 md:py-40 bg-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-12 h-px bg-[#ceb78e] mx-auto mb-10" />
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 tracking-[0.04em] mb-8">
                Be Part of the Future
              </h2>
              <p className="font-body text-base text-neutral-400 max-w-lg mx-auto mb-12 font-light leading-relaxed">
                Whether you&apos;re looking for a home, an investment, or a new way of living - your journey starts here.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/waitlist" className="btn-accent btn-lg group">
                  Join Resident Waitlist
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/overview" className="btn-secondary btn-lg">
                  Read Executive Summary
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
