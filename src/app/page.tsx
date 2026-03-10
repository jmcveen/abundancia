'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
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
  },
  {
    image: '/images/website/03-everything-you-need-to-thrive.jpeg',
    text: 'You have everything you need to thrive...',
  },
  {
    image: '/images/website/04-regenerative-buildings-in-harmony.png',
    text: 'Regenerative buildings are in harmony with nature...',
  },
  {
    image: '/images/website/05-inclusive-governance-models.jpg',
    text: 'Inclusive governance models are easily accessible...',
  },
]

const HIGHLIGHTS = [
  {
    icon: Home,
    title: 'Hempcrete Homes',
    description: 'Carbon-negative, fire-resistant homes that last 500+ years with the healthiest indoor air quality available.',
  },
  {
    icon: Sun,
    title: 'Net-Positive Energy',
    description: 'Solar arrays with battery storage provide grid-independent renewable energy for every home and facility.',
  },
  {
    icon: Droplets,
    title: 'Water Security',
    description: 'Seven retention ponds, rainwater harvesting, and greywater recycling create redundant water systems.',
  },
  {
    icon: Leaf,
    title: '70% Land Preserved',
    description: 'Conservation-forward design preserves the Lost Pines ecosystem while enhancing Houston toad habitat.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function HomePage() {
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
              <span className="font-accent text-sm text-white/90">376 Acres &middot; Cedar Creek, TX &middot; 30 min from Austin</span>
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
              <Link href="/invest/apply" className="btn-accent btn-lg rounded-2xl text-base">
                Join Investor Waitlist
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
            <AnimatedStat target={376} suffix=" Acres" label="Texas Ranchland" />
            <AnimatedStat target={12.5} suffix="M" prefix="$" label="Capital Raise" decimals={1} />
            <AnimatedStat target={37} suffix="%" label="Projected IRR" />
            <AnimatedStat target={500} suffix="+" label="Year Building Lifespan" />
            <div className="col-span-2 md:col-span-1">
              <AnimatedStat target={70} suffix="%" label="Land Preserved" />
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
                <div className="card-hover overflow-hidden group">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.text}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-heading text-base text-neutral-800 italic leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                </div>
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
                <div className="card p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-accent text-lg font-semibold text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

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
                <div className="card-hover overflow-hidden group">
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
              Join the movement toward the next generation of housing. Projected 37% IRR with 4.42x equity multiple over a 10-year hold. Accredited investors welcome.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/invest/apply" className="btn-accent btn-lg rounded-2xl text-base">
                Join Investor Waitlist
              </Link>
              <Link href="/model" className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 btn-lg rounded-2xl text-base group">
                View Business Model
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
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
            </div>
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
