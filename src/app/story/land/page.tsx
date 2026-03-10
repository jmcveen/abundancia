'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import {
  ArrowRight, MapPin, TrendingUp, Building2, TreePine,
  Droplets, Sun, Sprout, Shield, Scale,
  Fence, Home, Landmark, CloudSun
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const WHY_AUSTIN = [
  {
    icon: TrendingUp,
    title: 'Explosive Growth',
    description: 'Austin\'s population has doubled in two decades — sustained in-migration of high-income professionals, entrepreneurs, and creatives.',
  },
  {
    icon: Sprout,
    title: 'Sustainability Culture',
    description: 'Whisper Valley (zero-energy) and Colony Park (208-acre sustainable dev) prove Austin\'s deep appetite for eco-conscious living.',
  },
  {
    icon: Building2,
    title: 'Tech & Innovation Hub',
    description: 'Tesla, Apple, Google, Oracle, Samsung — the world\'s most innovative companies are here, creating demand for progressive housing.',
  },
  {
    icon: CloudSun,
    title: 'Year-Round Growing',
    description: 'USDA Zone 8b with 250+ growing days, 300+ sunny days, and 37" annual rainfall — perfect for permaculture and solar.',
  },
]

const WHY_BASTROP = [
  {
    stat: 'Zero',
    label: 'Zoning Restrictions',
    description: 'No zoning means mixed-use, innovative design built by right — no years of rezoning hearings or political risk.',
  },
  {
    stat: '6-12',
    label: 'Month Timeline',
    description: 'Bastrop County permitting vs. 18-24 months in Austin. Faster to market, lower carrying costs, reduced risk.',
  },
  {
    stat: '$0.98',
    label: '/ $100 Property Tax',
    description: 'Agricultural exemption dramatically reduces holding costs during development. The 376-acre site qualifies.',
  },
  {
    stat: '30',
    label: 'Minutes to Austin',
    description: 'SH 71 and SH 130 provide direct access to downtown Austin, the airport, and the tech corridor.',
  },
]

const PROPERTY_FEATURES = [
  {
    icon: Droplets,
    title: '7 Water Retention Ponds',
    description: 'Existing water infrastructure provides irrigation, wildlife habitat, recreation, and resilience during Texas droughts.',
  },
  {
    icon: TreePine,
    title: 'Lost Pines Ecoregion',
    description: 'A biological island of loblolly pines — the westernmost stand in North America. Unique ecological value enhances property premium.',
  },
  {
    icon: Home,
    title: '2,821 SF Farmhouse (2020)',
    description: 'Recently built main residence ready for immediate retreat/event use during Phase 1 development.',
  },
  {
    icon: Landmark,
    title: '1870 Historic Guest House',
    description: '2,000 SF historic structure — one of the oldest in the county. Character asset for events and heritage tourism.',
  },
  {
    icon: Fence,
    title: 'Completely Fenced',
    description: 'Full perimeter fencing with agricultural infrastructure. 2 barns — one with a performance stage for events.',
  },
  {
    icon: Sun,
    title: '2 Dry Creek Beds',
    description: 'Natural drainage corridors that become design features — walking trails, wildlife corridors, and bioswale systems.',
  },
]

const MASTER_PLAN = [
  {
    percentage: '25-30%',
    label: 'Development Footprint',
    acres: '94-113 acres',
    description: 'Clustered development pods around water features. Residential villages, commercial core, retreat center, community hub.',
  },
  {
    percentage: '70-75%',
    label: 'Conservation & Agriculture',
    acres: '263-282 acres',
    description: 'Preserved ecosystems, food forests, permaculture zones, wildlife corridors, Houston toad habitat, trail networks.',
  },
]

const CLIMATE_STATS = [
  { value: '8b', label: 'USDA Zone', sublabel: 'Year-round growing season' },
  { value: '250+', label: 'Growing Days', sublabel: 'Annual growing period' },
  { value: '300+', label: 'Sunny Days', sublabel: 'Solar energy potential' },
  { value: '37"', label: 'Annual Rainfall', sublabel: 'Natural irrigation' },
]

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function LandPage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image
          src="/images/website/06-regenerative-community-aerial.png"
          alt="Abundancia — 376 acres in Cedar Creek, Bastrop County, Texas"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary-950/65" />

        <div className="relative z-10 section-container">
          <FadeIn>
            <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-4 block">
              The Land
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6 max-w-4xl">
              376 Acres in the Heart of Texas
            </h1>
            <p className="text-xl text-white/80 max-w-3xl leading-relaxed">
              Cedar Creek, Bastrop County — 30 minutes from downtown Austin. A rare assemblage of water, mature trees, existing structures, and agricultural exemption in the fastest-growing metro in America.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-secondary-400" />
              <span className="font-accent text-sm text-white/70">Cedar Creek, TX 78612 &middot; SH 71 Corridor &middot; Bastrop County</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ WHY AUSTIN ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <FadeIn>
              <div>
                <span className="eyebrow mb-3 block">The Macro Market</span>
                <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-6">
                  Why Austin
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  Austin is one of the fastest-growing metropolitan areas in the United States. The city has doubled in population over the past two decades, driven by a sustained influx of high-income professionals, entrepreneurs, and creatives from both coasts.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  More importantly, Austin has the strongest sustainability culture in Texas. Developments like Whisper Valley (the state&apos;s first zero-energy community) and Colony Park (a 208-acre city-led sustainable development) prove deep market appetite for eco-conscious living.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  The convergence of tech wealth, sustainability values, and population growth creates the ideal market for a regenerative community positioned as the next evolution of conscious living.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHY_AUSTIN.map((item) => (
                  <StaggerItem key={item.title}>
                    <div className="card p-5 h-full">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-3">
                        <item.icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="font-accent text-base font-semibold text-neutral-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ WHY BASTROP COUNTY ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                The Micro Market
              </span>
              <h2 className="font-display text-4xl md:text-5xl mb-6">
                Why Bastrop County
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Bastrop County sits in the Austin growth corridor — one of the fastest-appreciating land markets in Texas. But what makes it truly special for Abundancia is the regulatory environment: no zoning restrictions, streamlined permitting, and agricultural exemptions that make innovative, mixed-use development possible by right.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_BASTROP.map((item) => (
              <StaggerItem key={item.label}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
                  <div className="font-display text-4xl md:text-5xl font-bold text-secondary-400 mb-1">
                    {item.stat}
                  </div>
                  <div className="font-accent text-sm font-semibold text-white mb-3">
                    {item.label}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ THE PROPERTY ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">The Property</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                A Rare Assemblage
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                376 acres of water-rich ranchland with existing structures, mature tree cover, and agricultural exemption — assembled and ready for development.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROPERTY_FEATURES.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="card p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-accent text-lg font-semibold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ PROPERTY IMAGES ═══ */}
      <section className="py-0">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { image: '/images/website/24-parks-gardens-food-forests.jpeg', label: 'Parks & Food Forests' },
            { image: '/images/website/42-ecological-preservation.jpeg', label: 'Ecological Preservation' },
            { image: '/images/website/44-biodiversity-regeneration.jpg', label: 'Biodiversity' },
            { image: '/images/website/49-reforestation.jpeg', label: 'Reforestation' },
          ].map((item) => (
            <div key={item.label} className="relative aspect-square overflow-hidden group">
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="font-accent text-sm font-semibold text-white">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CLIMATE & GROWING ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <span className="eyebrow mb-3 block">Climate & Growing</span>
                <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-6">
                  Built for Regeneration
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  Central Texas provides an exceptional climate for both solar energy production and year-round food cultivation. USDA Zone 8b means a 250+ day growing season — long enough to sustain permaculture food forests, community gardens, and orchard systems that feed residents year-round.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  With 300+ sunny days annually, solar arrays achieve maximum efficiency. Combined with passive solar building design and hempcrete&apos;s thermal mass, homes maintain comfortable temperatures with minimal energy input — a critical advantage in Texas summers.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {CLIMATE_STATS.map((stat) => (
                  <div key={stat.label} className="card p-5 text-center">
                    <div className="font-display text-3xl md:text-4xl font-bold text-primary-800 mb-1">
                      {stat.value}
                    </div>
                    <div className="font-accent text-sm font-semibold text-neutral-900 mb-1">
                      {stat.label}
                    </div>
                    <p className="text-xs text-neutral-500">
                      {stat.sublabel}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ MASTER PLAN LAYOUT ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Master Plan</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Conservation-Forward Design
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Only 25-30% of the land is developed. The remaining 70-75% is preserved as conservation land, food forests, wildlife corridors, and community open space.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {MASTER_PLAN.map((zone) => (
              <FadeIn key={zone.label}>
                <div className="card p-8 h-full">
                  <div className="font-display text-5xl md:text-6xl font-bold text-primary-800 mb-2">
                    {zone.percentage}
                  </div>
                  <h3 className="font-accent text-lg font-semibold text-neutral-900 mb-1">
                    {zone.label}
                  </h3>
                  <p className="font-accent text-sm text-primary-600 mb-3">{zone.acres}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {zone.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-10 max-w-4xl mx-auto">
              <div className="card p-6 bg-primary-50/50 border-primary-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-5 h-5 text-primary-700" />
                  </div>
                  <div>
                    <h4 className="font-accent text-base font-semibold text-primary-900 mb-1">
                      Houston Toad Habitat Enhancement
                    </h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      The Lost Pines ecoregion is home to the endangered Houston toad. Abundancia&apos;s conservation-forward design not only protects existing habitat — it actively enhances it through native planting, water feature management, and corridor connectivity. This aligns with the Bastrop County Lost Pines Habitat Conservation Plan (LPHCP), potentially qualifying for conservation easement tax benefits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ REGULATORY ADVANTAGE ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <span className="eyebrow mb-3 block">Regulatory Advantage</span>
                <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-6">
                  No Zoning. No Barriers.
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  Bastrop County&apos;s lack of zoning is a decisive competitive advantage. While conventional Austin developments spend 18-24 months navigating rezoning hearings, neighborhood opposition, and political risk, Abundancia can build innovative mixed-use design by right.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Texas has also adopted hempcrete building codes (IRC 2024, Appendix BA for hemp-lime construction and Appendix Q for tiny homes), removing what was historically the biggest regulatory barrier to natural building materials.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-4">
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-accent text-sm font-semibold text-neutral-900">Bastrop County</span>
                    <span className="font-accent text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full">Abundancia</span>
                  </div>
                  <div className="w-full bg-primary-100 rounded-full h-3 mb-2">
                    <div className="bg-primary-600 h-3 rounded-full" style={{ width: '35%' }} />
                  </div>
                  <p className="text-xs text-neutral-500">6-12 months to first permits</p>
                </div>

                <div className="card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-accent text-sm font-semibold text-neutral-900">City of Austin</span>
                    <span className="font-accent text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">Typical</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-3 mb-2">
                    <div className="bg-neutral-400 h-3 rounded-full" style={{ width: '75%' }} />
                  </div>
                  <p className="text-xs text-neutral-500">18-24 months with rezoning</p>
                </div>

                <div className="card p-5 border-l-4 border-l-secondary-500">
                  <div className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-accent text-sm font-semibold text-neutral-900 mb-1">
                        MUD Bond Financing
                      </h4>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        Municipal Utility District bonds can reimburse infrastructure costs with tax-free municipal bonds — dramatically improving project economics and reducing capital requirements.
                      </p>
                    </div>
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
          src="/images/website/52-efficient-site-design.jpeg"
          alt="Abundancia master plan site design"
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
              See What We&apos;re Building
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Explore the homes, community spaces, and regenerative infrastructure that make Abundancia more than a development — it&apos;s a complete ecosystem.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/story/community" className="btn-primary btn-lg rounded-2xl text-base group">
                Explore the Community
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/story/regeneration" className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 btn-lg rounded-2xl text-base">
                Regenerative Systems
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
