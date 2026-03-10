'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import {
  ArrowRight, Leaf, Droplets, Sun, TreePine, Recycle,
  Flower2, Bug, Building2, Compass, Award, Car,
  FlaskConical, ShoppingBag, Heart, Vote, Coins, Stethoscope
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const PETALS = [
  { name: 'Place', description: 'Restoring a healthy interrelationship with nature.', color: 'bg-green-500' },
  { name: 'Water', description: 'Operating within the water balance of a given place and climate.', color: 'bg-blue-500' },
  { name: 'Energy', description: 'Relying only on current solar income.', color: 'bg-yellow-500' },
  { name: 'Health & Happiness', description: 'Optimizing physical and psychological health and well-being.', color: 'bg-rose-500' },
  { name: 'Materials', description: 'Endorsing products that are safe for all species through time.', color: 'bg-amber-600' },
  { name: 'Equity', description: 'Supporting a just and equitable world.', color: 'bg-purple-500' },
  { name: 'Beauty', description: 'Celebrating design that uplifts the human spirit.', color: 'bg-pink-500' },
]

const REGEN_FEATURES = [
  {
    image: '/images/website/42-ecological-preservation.jpeg',
    icon: TreePine,
    title: 'Ecological Preservation',
    description: '70-75% of the land conserved — Lost Pines ecosystem, wildlife corridors, native habitat restoration.',
  },
  {
    image: '/images/website/43-self-sufficiency.jpeg',
    icon: Leaf,
    title: 'Self-Sufficiency',
    description: '80-100% food production, 100% energy/water/waste independence. True community resilience.',
  },
  {
    image: '/images/website/44-biodiversity-regeneration.jpg',
    icon: Bug,
    title: 'Biodiversity Regeneration',
    description: 'Lost Pines restoration, Houston toad habitat enhancement, native pollinator gardens, wildlife corridors.',
  },
  {
    image: '/images/website/45-water-collection-efficiency-systems.jpeg',
    icon: Droplets,
    title: 'Water Collection & Efficiency',
    description: '7 retention ponds, rainwater harvesting, greywater recycling, ACWA backup, structured water systems.',
  },
  {
    image: '/images/website/46-renewable-energy-systems.jpeg',
    icon: Sun,
    title: 'Renewable Energy Systems',
    description: 'Solar arrays + battery storage providing net-positive energy. Grid-independent after Winter Storm Uri lessons.',
  },
  {
    image: '/images/website/47-permaculture-agriculture.jpeg',
    icon: Flower2,
    title: 'Permaculture & Agriculture',
    description: 'Food forests, community gardens, orchards. USDA Zone 8b provides 250+ growing days year-round.',
  },
  {
    image: '/images/website/48-waste-systems.jpeg',
    icon: Recycle,
    title: 'Waste Systems',
    description: 'Composting, biodigestion, material recovery. Zero-waste-to-landfill target across the community.',
  },
  {
    image: '/images/website/49-reforestation.jpeg',
    icon: TreePine,
    title: 'Reforestation',
    description: 'Native loblolly pine and post oak restoration — rebuilding the Lost Pines after the 2011 Bastrop wildfire.',
  },
  {
    image: '/images/website/50-carbon-sequestration.jpg',
    icon: Leaf,
    title: 'Carbon Sequestration',
    description: 'Each hempcrete home sequesters 20-40 tons of CO2. The community is carbon-negative from day one.',
  },
  {
    image: '/images/website/51-healthy-resilient-buildings.jpeg',
    icon: Building2,
    title: 'Healthy Resilient Buildings',
    description: 'Fire-resistant (2+ hour rating), storm-resistant, pest-resistant. Healthiest indoor air quality available.',
  },
  {
    image: '/images/website/52-efficient-site-design.jpeg',
    icon: Compass,
    title: 'Efficient Site Design',
    description: 'Clustered development pods around water features. Walkable, bikeable, and connected by trail networks.',
  },
  {
    image: '/images/website/53-living-building-certification.png',
    icon: Award,
    title: 'Living Building Certification',
    description: 'Pursuing the most rigorous green building standard in the world — the Living Building Challenge.',
  },
  {
    image: '/images/website/54-electric-vehicle-transportation.jpg',
    icon: Car,
    title: 'Electric Vehicle Transportation',
    description: 'EV charging infrastructure, community electric vehicles, and walkable design reducing car dependence.',
  },
  {
    image: '/images/website/55-material-life-cycle-analysis.jpg',
    icon: FlaskConical,
    title: 'Material Life Cycle Analysis',
    description: 'Every material evaluated for environmental impact from extraction through end-of-life. Red List free.',
  },
  {
    image: '/images/website/56-sustainable-ethical-products.jpg',
    icon: ShoppingBag,
    title: 'Sustainable & Ethical Products',
    description: 'On-site production and curation of ethical goods — supporting local makers and regenerative supply chains.',
  },
]

const COMMUNITY_OPS = [
  {
    image: '/images/website/57-co-governance.jpeg',
    icon: Vote,
    title: 'Co-Governance',
    description: 'Sociocratic decision-making where every resident has voice and vote. Structured onboarding ensures inclusive participation from day one.',
  },
  {
    image: '/images/website/58-alternative-currency.jpeg',
    icon: Coins,
    title: 'Alternative Currency',
    description: 'Community-backed digital currency enabling local economic sovereignty. Residents can trade skills, goods, and services within the ecosystem.',
  },
  {
    image: '/images/website/59-health-care.jpeg',
    icon: Stethoscope,
    title: 'Holistic Health Care',
    description: 'Nutrition counseling, health testing, on-site health center, preventive wellness programs. Health care designed around prevention, not crisis.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function RegenerationPage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image
          src="/images/website/12-rethinking-development.jpeg"
          alt="Rethinking development — regenerative building and design"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary-950/65" />

        <div className="relative z-10 section-container">
          <FadeIn>
            <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-4 block">
              Regenerative Systems
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6 max-w-4xl">
              Rethinking Development
            </h1>
            <p className="text-xl text-white/80 max-w-3xl leading-relaxed">
              Conventional development generates 40% of annual global CO2 emissions. Abundancia eliminates pollution, waste, and environmental destruction — replacing them with systems that regenerate the land.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ LIVING BUILDING CHALLENGE ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                <Image
                  src="/images/website/13-living-building-challenge-logo.png"
                  alt="Living Building Challenge Certification — the 7 Petals"
                  fill
                  className="object-contain"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <span className="eyebrow mb-3 block">Certification Standard</span>
                <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-6">
                  The Living Building Challenge
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  We are building with the most rigorous green building certification in the world — aligning with the 7 Petals to co-create a world we are proud to pass on to our grandchildren.
                </p>

                <div className="space-y-3">
                  {PETALS.map((petal) => (
                    <div key={petal.name} className="flex items-start gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${petal.color} mt-2 flex-shrink-0`} />
                      <div>
                        <span className="font-accent text-sm font-semibold text-neutral-900">{petal.name}</span>
                        <span className="text-sm text-neutral-600"> — {petal.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ 15 REGENERATIVE FEATURES ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                Regenerative Infrastructure
              </span>
              <h2 className="font-display text-4xl md:text-5xl mb-4">
                15 Integrated Systems
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Every system reinforces every other. Water feeds food. Food feeds soil. Soil sequesters carbon. Energy powers everything. Waste becomes resource.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REGEN_FEATURES.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-full group hover:bg-white/10 transition-colors duration-300">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <feature.icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="font-accent text-sm font-semibold text-white">
                        {feature.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-white/60 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ COMMUNITY OPERATIONS ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Community Operations</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                How We Live Together
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Governance, economics, and health care — designed for sovereignty, inclusion, and well-being.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMMUNITY_OPS.map((op) => (
              <StaggerItem key={op.title}>
                <div className="card-hover overflow-hidden h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={op.image}
                      alt={op.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <op.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex-1">
                    <h3 className="font-accent text-lg font-semibold text-neutral-900 mb-2">
                      {op.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {op.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ LOCAL IMPACT ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">
                <Heart className="w-4 h-4 inline mr-2 -mt-0.5" />
                Local Positive Impact
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Lifting the Entire Region
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Abundancia isn&apos;t just for residents — it creates affordable homes, healthy food access, jobs, education, and economic opportunity for the wider Bastrop County community.
              </p>
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
                      <span className="font-accent text-sm font-semibold text-white leading-tight">
                        {item.label}
                      </span>
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
            <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-4 block">
              The Opportunity
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
              From Vision to Investment
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              You&apos;ve seen the vision, the land, the community, and the systems. Now explore the market opportunity and business model that make it all possible.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/model" className="btn-primary btn-lg rounded-2xl text-base group">
                View Business Model
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
