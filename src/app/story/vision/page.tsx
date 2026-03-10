'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import {
  ArrowRight, Flame, Zap, Droplets, Home, Shield, TreePine,
  Scale, Heart, Users, Sparkles, HandHeart, Infinity
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const PROBLEMS = [
  {
    stat: '40%',
    description: 'of global CO2 emissions come from conventional construction and buildings.',
  },
  {
    stat: '600M+',
    description: 'tons of construction waste generated annually in the US alone.',
  },
  {
    stat: '34,000',
    description: 'acres burned in the 2011 Bastrop Complex Fire — the most destructive in Texas history.',
  },
  {
    stat: '$435K+',
    description: 'median home price in Austin, pricing families out of the market entirely.',
  },
]

const DIFFERENTIATORS = [
  {
    icon: Flame,
    title: 'Fire-Resistant Hempcrete',
    description: 'In a region scarred by the 2011 Bastrop Complex Fire, our homes have 2+ hour fire ratings. No other development in the Lost Pines offers this protection.',
  },
  {
    icon: Zap,
    title: 'Grid-Independent Resilience',
    description: 'After Winter Storm Uri, Texans understand energy independence. Solar + battery storage + passive design means Abundancia residents never lose power.',
  },
  {
    icon: Droplets,
    title: 'Water Security',
    description: 'Seven existing retention ponds, rainwater harvesting, ACWA water backup, and greywater recycling create redundant water systems in a drought-prone state.',
  },
  {
    icon: Home,
    title: "Austin's Culture, Not Its Prices",
    description: '30 minutes from downtown Austin — access the tech jobs, live music, and culture while living in a purpose-built community at lower price points.',
  },
  {
    icon: Shield,
    title: 'No Zoning Barriers',
    description: "Bastrop County's lack of zoning means mixed-use, innovative community design can be built by right — no years of rezoning hearings or political risk.",
  },
  {
    icon: Scale,
    title: 'MUD Bond Financing',
    description: 'Municipal Utility District bonds can reimburse infrastructure costs with tax-free municipal bonds, dramatically improving project economics.',
  },
]

const PRINCIPLES = [
  {
    icon: TreePine,
    title: 'Regeneration',
    image: '/images/website/60-regeneration.jpeg',
    description: 'Permaculture, zero pollution, zero waste, net-positive renewable energy, carbon sequestration, and abundant organic food. The earth is not harmed — only positive impact is made.',
  },
  {
    icon: Sparkles,
    title: 'Creative Expression & Full Potential',
    image: '/images/website/63-co-creation-collaboration.jpg',
    description: 'Spaces where people fully express their creativity with all the tools they need. Once basic needs are met, residents focus on creation and innovation.',
  },
  {
    icon: Heart,
    title: 'Well-Being',
    image: '/images/website/61-well-being.jpeg',
    description: "Human well-being comes first — people's ability to live a life they value, comprising cultural heritage, health, access to land and natural resources.",
  },
  {
    icon: Users,
    title: 'Co-Creation & Collaboration',
    image: '/images/website/63-co-creation-collaboration.jpg',
    description: 'Spaces to co-work and create businesses with positive impact. Sociocratic governance where everyone is included and all voices matter.',
  },
  {
    icon: HandHeart,
    title: 'Connection & Loving Kindness',
    image: '/images/website/62-connection-loving-kindness.jpg',
    description: 'Social gatherings, authentic relating, and entertainment connecting neighbors and the local community. Designed from the ground up for connection.',
  },
  {
    icon: Infinity,
    title: '7 Generations of Impact',
    image: '/images/website/64-seven-generations-of-impact.jpg',
    description: 'If everyone built the way we build, all major world problems could be eradicated. Hempcrete buildings last 500+ years — truly building for seven generations.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function VisionPage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Our Vision</span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-neutral-900 mb-6 max-w-4xl">
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
                <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-6">
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
                {PROBLEMS.map((item) => (
                  <div key={item.stat} className="card p-5">
                    <div className="font-display text-3xl md:text-4xl font-bold text-primary-800 mb-2">
                      {item.stat}
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ THE SOLUTION ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                The Solution
              </span>
              <h2 className="font-display text-4xl md:text-5xl mb-6">
                A Fundamentally Different Way of Living
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                When someone buys a home in Abundancia, they gain access to a complete ecosystem. Their hempcrete home is carbon-negative — it literally heals the atmosphere. They have free renewable energy, structured water, organic food from community gardens, holistic health care, and spaces for creation and connection.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((item) => (
              <StaggerItem key={item.title}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-secondary-400" />
                  </div>
                  <h3 className="font-accent text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ GUIDING PRINCIPLES ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Guiding Principles</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                What We Stand For
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Six principles guide every decision at Abundancia — from architectural design to governance to how we treat the land.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((principle) => (
              <StaggerItem key={principle.title}>
                <div className="card-hover overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={principle.image}
                      alt={principle.title}
                      fill
                      className="object-cover"
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
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ MASLOW'S HIERARCHY ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
                <Image
                  src="/images/website/65-maslows-hierarchy-human-potential.png"
                  alt="Maslow's Hierarchy of Needs — Liberating Human Potential"
                  fill
                  className="object-contain"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <span className="eyebrow mb-3 block">Human Potential</span>
                <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-6">
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
          src="/images/website/71-replicable-model-architecture.jpeg"
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
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6 max-w-3xl mx-auto">
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
            <Link href="/story/land" className="btn-primary btn-lg rounded-2xl text-base group">
              Explore the Land
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
