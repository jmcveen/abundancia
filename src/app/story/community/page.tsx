'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import {
  ArrowRight, Home, Users, Sparkles, ShoppingBag,
  Calendar
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const HOUSING_TYPES = [
  {
    image: '/images/website/15-residential-homes.jpeg',
    type: 'Residential Homes',
    units: '~100 Units',
    description: 'Single-family hempcrete homes with passive solar design, smart automation, and sacred geometry principles.',
  },
  {
    image: '/images/website/16-tiny-homes.jpeg',
    type: 'Tiny Homes',
    units: '~30 Units',
    description: 'Compact, efficient living spaces for minimalists and young professionals. Fully off-grid capable.',
  },
  {
    image: '/images/website/17-domes.jpeg',
    type: 'Domes',
    units: '~30 Units',
    description: 'Geodesic and monolithic dome structures — naturally resilient, energy-efficient, and architecturally striking.',
  },
  {
    image: '/images/website/18-rental-units.jpeg',
    type: 'Multifamily & Rentals',
    units: '~260 Units',
    description: 'Affordable condominiums and rental units providing attainable entry points into regenerative living.',
  },
  {
    image: '/images/website/10-affordable-condos.png',
    type: 'Affordable Condos',
    units: 'Included in Multi',
    description: 'Designed to address Austin\'s affordability crisis — premium quality at accessible price points.',
  },
  {
    image: '/images/website/08-homes.png',
    type: 'Custom Lots',
    units: 'Select Sites',
    description: 'Premium lots for custom builds within Abundancia\'s design guidelines — bring your vision to life.',
  },
]

const BIOHARMONIC_FEATURES = [
  {
    title: 'Long Lasting',
    description: 'Last 500+ years. Resistant to fire, floods, hurricanes, earthquakes, pests, and mold.',
  },
  {
    title: 'All Natural',
    description: 'Breathable, non-toxic, natural materials with low to no maintenance requirements.',
  },
  {
    title: 'Harmonic Design',
    description: 'Biophilic architecture, sacred geometry, 3D printing, and passive solar design.',
  },
  {
    title: 'Smart Automation',
    description: 'Smart home technology with security, temperature control, music, and more.',
  },
]

const COMMUNITY_SPACES = [
  { image: '/images/website/19-pyramid-ceremony-space.jpeg', name: 'Pyramid Ceremony Space' },
  { image: '/images/website/20-yoga-shala.jpeg', name: 'Yoga Shala & Meditation Center' },
  { image: '/images/website/21-resource-library.png', name: 'Resource Library' },
  { image: '/images/website/22-indoor-outdoor-gyms.jpeg', name: 'Indoor & Outdoor Gyms' },
  { image: '/images/website/23-research-center.png', name: 'Research Center' },
  { image: '/images/website/24-parks-gardens-food-forests.jpeg', name: 'Parks, Gardens & Food Forests' },
  { image: '/images/website/25-sacred-temple-complex.jpeg', name: 'Sacred Temple Complex' },
]

const CREATION_HUB = [
  { image: '/images/website/26-co-working-space.jpeg', name: 'Co-Working Space' },
  { image: '/images/website/27-crafts-workshop.jpeg', name: 'Crafts Workshop' },
  { image: '/images/website/28-yoga-studio.jpeg', name: 'Yoga Studio' },
  { image: '/images/website/29-gym-fitness-center.jpeg', name: 'Gym & Fitness Center' },
  { image: '/images/website/30-photography-videography-studio.jpeg', name: 'Photography & Video Studio' },
  { image: '/images/website/31-artist-studio.jpg', name: 'Artist Studio' },
  { image: '/images/website/32-music-recording-studio.png', name: 'Music Recording Studio' },
  { image: '/images/website/33-makerspace.jpg', name: 'Makerspace' },
]

const PUBLIC_SPACES = [
  { image: '/images/website/34-zero-waste-grocery.png', name: 'Zero Waste Grocery' },
  { image: '/images/website/35-entertainment-areas-parks.png', name: 'Entertainment Areas & Parks' },
  { image: '/images/website/36-organic-restaurants-cafes.jpg', name: 'Organic Restaurants & Cafes' },
  { image: '/images/website/37-amphitheater.jpeg', name: 'Amphitheater' },
  { image: '/images/website/38-sustainable-ethical-retail-shops.jpg', name: 'Sustainable & Ethical Retail' },
  { image: '/images/website/39-elixir-juice-tea-bar.jpeg', name: 'Elixir, Juice & Tea Bar' },
  { image: '/images/website/40-health-center.jpeg', name: 'Health Center' },
  { image: '/images/website/41-spa-massage.jpeg', name: 'Spa & Massage' },
]

// ═══════════════════════════════════════════════════════════════════════════
// Reusable Image Grid
// ═══════════════════════════════════════════════════════════════════════════

function SpaceGrid({ spaces }: { spaces: { image: string; name: string }[] }) {
  return (
    <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {spaces.map((space) => (
        <StaggerItem key={space.name}>
          <div className="card-hover overflow-hidden group">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={space.image}
                alt={space.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="font-accent text-sm font-semibold text-white leading-tight">
                  {space.name}
                </span>
              </div>
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function CommunityPage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image
          src="/images/website/09-commercial-areas.png"
          alt="Abundancia community — more than homes, a complete ecosystem"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary-950/65" />

        <div className="relative z-10 section-container">
          <FadeIn>
            <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-4 block">
              The Community
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6 max-w-4xl">
              More Than Homes — A Complete Ecosystem
            </h1>
            <p className="text-xl text-white/80 max-w-3xl leading-relaxed">
              Hempcrete residences, creative studios, wellness facilities, organic restaurants, sacred spaces, and commercial amenities — all designed for regenerative living.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ RESIDENTIAL ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">
                <Home className="w-4 h-4 inline mr-2 -mt-0.5" />
                Biophilic Housing
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Homes That Heal the Atmosphere
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Every home is built with hempcrete — carbon-negative, fire-resistant, and designed to last 500+ years. Multiple housing types ensure accessibility at every price point.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOUSING_TYPES.map((housing) => (
              <StaggerItem key={housing.type}>
                <div className="card-hover overflow-hidden h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={housing.image}
                      alt={housing.type}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="font-accent text-xs font-semibold bg-white/90 backdrop-blur-sm text-primary-800 px-2.5 py-1 rounded-full">
                        {housing.units}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1">
                    <h3 className="font-accent text-lg font-semibold text-neutral-900 mb-2">
                      {housing.type}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {housing.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ BIOHARMONIC BUILDINGS ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/website/14-bioharmonic-buildings.png"
                  alt="Bioharmonic building construction with hempcrete"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                  Building Technology
                </span>
                <h2 className="font-display text-4xl md:text-5xl mb-6">
                  Bioharmonic Buildings
                </h2>
                <p className="text-lg text-white/70 leading-relaxed mb-8">
                  These resilient buildings are made with healthy materials such as bioceramic, hemp, algae, and rammed earth — designed to harmonize with both the human body and the natural environment.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BIOHARMONIC_FEATURES.map((feature) => (
                    <div key={feature.title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <h3 className="font-accent text-sm font-semibold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {['R-30+ Insulation', '2hr Fire Rating', 'Carbon Negative', 'Non-Toxic', '500+ Year Lifespan'].map((spec) => (
                    <span key={spec} className="font-accent text-xs text-secondary-400 bg-secondary-500/10 border border-secondary-500/20 px-3 py-1.5 rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ COMMUNITY SPACES ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">
                <Users className="w-4 h-4 inline mr-2 -mt-0.5" />
                Community Spaces
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Spaces for Connection & Growth
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Sacred ceremony spaces, wellness facilities, libraries, and food forests — designed for the collective well-being of the community.
              </p>
            </div>
          </FadeIn>

          <SpaceGrid spaces={COMMUNITY_SPACES} />
        </div>
      </section>

      {/* ═══ CREATION HUB ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">
                <Sparkles className="w-4 h-4 inline mr-2 -mt-0.5" />
                Creation Hub & Wellness Hub
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Create, Build, Express
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Free for all residents, open to public paying members. Co-working spaces, artist studios, recording studios, makerspaces, and wellness facilities.
              </p>
            </div>
          </FadeIn>

          <SpaceGrid spaces={CREATION_HUB} />
        </div>
      </section>

      {/* ═══ PUBLIC SPACES ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">
                <ShoppingBag className="w-4 h-4 inline mr-2 -mt-0.5" />
                Public Spaces
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Open to the World
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Commercial spaces designed to inspire locals and tourists — demonstrating how zero-waste, eco-products, and a healthy lifestyle integrate with nature and connection.
              </p>
            </div>
          </FadeIn>

          <SpaceGrid spaces={PUBLIC_SPACES} />
        </div>
      </section>

      {/* ═══ RETREAT & EVENT CENTER ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                  <Calendar className="w-4 h-4 inline mr-2 -mt-0.5" />
                  Phase 1 Revenue Engine
                </span>
                <h2 className="font-display text-4xl md:text-5xl mb-6">
                  Retreat & Event Center
                </h2>
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  The existing 2,821 SF farmhouse, 2,000 SF historic guest house, and 2 barns form the nucleus of Abundancia&apos;s retreat and event center — generating revenue from day one while the broader community is built.
                </p>

                <div className="space-y-4">
                  {[
                    { label: 'Main Center', detail: '5,000 SF purpose-built wellness and event space' },
                    { label: 'Guest Accommodations', detail: '30 retreat units for immersive multi-day experiences' },
                    { label: 'Existing Structures', detail: 'Farmhouse + historic guest house operational immediately' },
                    { label: 'Performance Venue', detail: 'Barn with stage for concerts, ceremonies, and community events' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary-400 mt-2.5 flex-shrink-0" />
                      <div>
                        <span className="font-accent text-sm font-semibold text-white">{item.label}</span>
                        <span className="text-sm text-white/60"> — {item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="font-accent text-lg font-semibold text-white mb-6">
                  Projected Revenue (Stabilized)
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Retreats & Events</span>
                    <span className="font-accent text-sm font-semibold text-secondary-400">Primary</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Guest Accommodations</span>
                    <span className="font-accent text-sm font-semibold text-secondary-400">Secondary</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Membership Access</span>
                    <span className="font-accent text-sm font-semibold text-secondary-400">Recurring</span>
                  </div>
                  <div className="accent-line w-full my-4" />
                  <div className="flex items-center justify-between">
                    <span className="font-accent text-base font-semibold text-white">Annual Target</span>
                    <span className="font-display text-2xl font-bold text-secondary-400">$1.8M-$2.5M</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <Image
          src="/images/website/51-healthy-resilient-buildings.jpeg"
          alt="Regenerative building systems at Abundancia"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-950/75" />

        <div className="relative z-10 section-container text-center">
          <FadeIn>
            <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-4 block">
              Continue the Story
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6 max-w-3xl mx-auto">
              The Systems Behind the Vision
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Discover the regenerative infrastructure — energy, water, food, and waste systems — that make Abundancia a truly self-sustaining community.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/story/regeneration" className="btn-primary btn-lg rounded-2xl text-base group">
                Regenerative Systems
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/model" className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 btn-lg rounded-2xl text-base">
                View Business Model
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
