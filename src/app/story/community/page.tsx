'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { Modal } from '@/components/ui/Modal'
import {
  ArrowRight, Home, Users, Sparkles, ShoppingBag,
  Calendar
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const HOUSING_TYPES = [
  {
    image: '/images/website/15-residential-homes.png',
    type: 'Residential Homes',
    units: '~100 Units',
    description: 'Single-family hempcrete homes with passive solar design, smart automation, and sacred geometry principles.',
    detail: 'Hempcrete single-family homes ranging from 1,400 to 2,800 SF. Passive solar design orients living spaces to capture winter sun while shading in summer. Smart home automation controls lighting, temperature, security, and structured water systems. Sacred geometry principles inform proportions and spatial flow.',
    priceRange: '$350K-$625K',
    sqftRange: '1,400-2,800 SF',
    features: ['Passive Solar Design', 'Smart Home Automation', 'Structured Water System', 'Sacred Geometry Layout', 'Carbon-Negative Construction'],
  },
  {
    image: '/images/website/16-tiny-homes.png',
    type: 'Tiny Homes',
    units: '~30 Units',
    description: 'Compact, efficient living spaces for minimalists and young professionals. Fully off-grid capable.',
    detail: 'Thoughtfully designed compact homes for those who value simplicity and minimal footprint. Each unit is fully off-grid capable with integrated solar, rainwater collection, and composting systems. Open floor plans maximize every square foot while hempcrete walls provide superior insulation and indoor air quality.',
    priceRange: '$125K-$225K',
    sqftRange: '400-800 SF',
    features: ['Off-Grid Capable', 'Integrated Solar Panels', 'Rainwater Collection', 'Composting Systems', 'Open Floor Plan'],
  },
  {
    image: '/images/website/17-domes.png',
    type: 'Domes',
    units: '~30 Units',
    description: 'Geodesic and monolithic dome structures — naturally resilient, energy-efficient, and architecturally striking.',
    detail: 'Geodesic and monolithic dome structures represent the pinnacle of natural architecture. The dome shape distributes structural loads evenly, making them inherently resistant to wind, earthquakes, and storms. Their thermal efficiency reduces energy consumption by up to 50% compared to conventional homes, and the striking silhouettes create an iconic community aesthetic.',
    priceRange: '$200K-$450K',
    sqftRange: '800-2,200 SF',
    features: ['Superior Wind Resistance', 'Natural Thermal Efficiency', 'Earthquake Resilient', 'Iconic Architecture', 'Reduced Material Usage'],
  },
  {
    image: '/images/website/18-rental-units.png',
    type: 'Multifamily & Rentals',
    units: '~350 Units',
    description: 'Affordable condominiums and rental units providing attainable entry points into regenerative living.',
    detail: 'Multi-unit residential buildings designed to make regenerative living accessible to a broader population. These units maintain the same hempcrete construction, indoor air quality, and smart home features as single-family homes while achieving economies of scale that reduce per-unit costs. Shared amenities and community spaces are integrated into each building cluster.',
    priceRange: '$185K-$375K',
    sqftRange: '600-1,400 SF',
    features: ['Shared Community Amenities', 'Hempcrete Construction', 'Smart Home Features', 'Economies of Scale', 'Below-Market Pricing'],
  },
  {
    image: '/images/website/10-affordable-condos.png',
    type: 'Affordable Condos',
    units: 'Included in Multi',
    description: 'Designed to address Austin\'s affordability crisis — premium quality at accessible price points.',
    detail: 'Purpose-built to address the Austin-area affordability crisis without sacrificing quality. These condominiums use the same carbon-negative hempcrete construction and regenerative systems as premium units but optimize layouts and shared infrastructure to deliver price points accessible to working families. Subsidized by the community model\'s commercial revenue streams.',
    priceRange: '$150K-$275K',
    sqftRange: '500-1,100 SF',
    features: ['Below-Market Pricing', 'Same Premium Materials', 'Community-Subsidized', 'Working Family Friendly', 'Full Amenity Access'],
  },
  {
    image: '/images/website/08-homes.png',
    type: 'Custom Lots',
    units: 'Select Sites',
    description: 'Premium lots for custom builds within Abundancia\'s design guidelines — bring your vision to life.',
    detail: 'Premium homesites for buyers who want to design their own residence within Abundancia\'s regenerative building guidelines. Each lot is pre-assessed for solar orientation, water features, and native landscape integration. Owners work with Abundancia\'s approved builders to ensure hempcrete construction, Living Building Challenge compliance, and visual harmony with the community.',
    priceRange: '$175K-$400K (Lot)',
    sqftRange: 'Custom Design',
    features: ['Pre-Assessed Solar Orientation', 'Approved Builder Network', 'Design Flexibility', 'LBC Compliance Support', 'Premium Locations'],
  },
]

const BIOHARMONIC_FEATURES = [
  {
    title: 'Long Lasting',
    description: 'Last 500+ years. Resistant to fire, floods, hurricanes, earthquakes, pests, and mold.',
    detail: 'Hempcrete structures have been documented lasting over 500 years in European buildings. The material is naturally fire-resistant with a 2+ hour fire rating, impervious to pests and mold, and gains strength over time through continued petrification. Unlike conventional construction that degrades, hempcrete buildings improve with age — making them multi-generational assets.',
  },
  {
    title: 'All Natural',
    description: 'Breathable, non-toxic, natural materials with low to no maintenance requirements.',
    detail: 'Every material in a bioharmonic building is sourced from nature and returns safely to nature. Hempcrete walls breathe, actively regulating indoor humidity between 40-60% — the ideal range for human health. Zero VOCs, zero formaldehyde, zero toxic off-gassing. The result is the healthiest indoor air quality achievable in any building type, reducing respiratory illness and improving sleep quality.',
  },
  {
    title: 'Harmonic Design',
    description: 'Biophilic architecture, sacred geometry, 3D printing, and passive solar design.',
    detail: 'Biophilic design principles integrate nature into every living space — natural light, organic forms, living walls, and water features. Sacred geometry proportions (golden ratio, Fibonacci sequences) create spaces that feel intuitively harmonious. Passive solar orientation captures winter warmth and deflects summer heat, reducing energy demands by 60-80% compared to conventional homes.',
  },
  {
    title: 'Smart Automation',
    description: 'Smart home technology with security, temperature control, music, and more.',
    detail: 'Each home integrates a comprehensive smart automation system controlling lighting, climate, security, structured water filtration, and entertainment. Energy monitoring provides real-time feedback on consumption and solar generation. Automated greywater routing, composting system alerts, and community integration features connect each home to the broader Abundancia ecosystem.',
  },
]

const COMMUNITY_SPACES = [
  { image: '/images/website/19-pyramid-ceremony-space.png', name: 'Pyramid Ceremony Space', detail: 'A sacred gathering space designed with sacred geometry principles. The pyramid structure amplifies acoustic resonance and creates a container for ceremony, meditation, sound healing, and community ritual. Hosts weekly gatherings, solstice celebrations, and rites of passage.', link: '/story/vision' },
  { image: '/images/website/20-yoga-shala.png', name: 'Yoga Shala & Meditation Center', detail: 'A dedicated space for yoga, breathwork, and meditation practice with radiant-heated bamboo floors, floor-to-ceiling windows overlooking native gardens, and an outdoor practice deck. Daily classes are free for all residents.', link: '/story/vision' },
  { image: '/images/website/21-resource-library.png', name: 'Resource Library', detail: 'A community knowledge hub with physical and digital collections covering permaculture, regenerative design, holistic health, and conscious living. Includes quiet study rooms, a children\'s reading corner, and a seed library.', link: '/story/vision' },
  { image: '/images/website/22-indoor-outdoor-gyms.png', name: 'Indoor & Outdoor Gyms', detail: 'Full fitness facilities including functional training equipment, outdoor calisthenics park, climbing wall, and movement studio. Designed to support holistic fitness — strength, flexibility, and cardiovascular health in fresh air.', link: '/story/vision' },
  { image: '/images/website/23-research-center.png', name: 'Research Center', detail: 'An applied research facility focused on hempcrete construction innovation, regenerative agriculture methods, water purification systems, and renewable energy optimization. Partners with universities and publishes open-source findings.', link: '/data-room/view/regenerative/hempcrete-construction' },
  { image: '/images/website/24-parks-gardens-food-forests.png', name: 'Parks, Gardens & Food Forests', detail: 'Over 20 acres of permaculture food forests, community gardens, heritage orchards, and native wildflower meadows. Seven-layer food forests produce fruit, nuts, herbs, and vegetables year-round in USDA Zone 8b\'s 250+ growing days.', link: '/story/regeneration' },
  { image: '/images/website/25-sacred-temple-complex.png', name: 'Sacred Temple Complex', detail: 'A multi-faith contemplative space honoring diverse spiritual traditions. Includes an open-air temple, labyrinth walk, sacred grove, and quiet reflection gardens. Designed for personal practice and interfaith community gatherings.', link: '/story/vision' },
]

const CREATION_HUB = [
  { image: '/images/website/26-co-working-space.png', name: 'Co-Working Space', detail: 'Open-plan workspace with high-speed internet, private phone rooms, conference facilities, and standing desks. Designed for remote workers, entrepreneurs, and creative professionals. Free for residents, available to public members.', link: '/story/vision' },
  { image: '/images/website/27-crafts-workshop.png', name: 'Crafts Workshop', detail: 'A fully equipped workshop for woodworking, ceramics, textile arts, and mixed-media creation. Includes kilns, looms, hand tools, and workbenches. Regular workshops teach traditional crafts and sustainable making techniques.', link: '/story/vision' },
  { image: '/images/website/28-yoga-studio.png', name: 'Yoga Studio', detail: 'A versatile movement space for yoga, dance, martial arts, and body-centered practices. Sprung hardwood floor, full mirror wall, professional sound system, and adjustable lighting create an ideal practice environment.', link: '/story/vision' },
  { image: '/images/website/29-gym-fitness-center.png', name: 'Gym & Fitness Center', detail: 'State-of-the-art fitness equipment alongside functional training zones, recovery rooms with infrared saunas, and personal training services. Designed to support lifelong health and vitality for all ages and abilities.', link: '/story/vision' },
  { image: '/images/website/30-photography-videography-studio.png', name: 'Photography & Video Studio', detail: 'Professional production studio with cyclorama wall, lighting grid, and editing suites. Supports resident creators, community media production, and the Abundancia content team documenting the regenerative journey.', link: '/story/vision' },
  { image: '/images/website/31-artist-studio.png', name: 'Artist Studio', detail: 'Dedicated studio spaces with north-facing natural light, ventilation for paints and solvents, and generous wall space for large-format work. Resident artists contribute to the community\'s visual identity and public art installations.', link: '/story/vision' },
  { image: '/images/website/32-music-recording-studio.png', name: 'Music Recording Studio', detail: 'Professional-grade recording studio with isolation booths, mixing console, and acoustically treated live room. Available for resident musicians and visiting artists. Hosts community jam sessions and music education programs.', link: '/story/vision' },
  { image: '/images/website/33-makerspace.png', name: 'Makerspace', detail: 'A fabrication lab equipped with 3D printers, laser cutters, CNC routers, and electronics workbenches. Supports prototyping, repair culture, and STEM education. The community\'s innovation engine for sustainable product development.', link: '/story/vision' },
]

const PUBLIC_SPACES = [
  { image: '/images/website/34-zero-waste-grocery.png', name: 'Zero Waste Grocery', detail: 'Community-owned grocery featuring local, organic, zero-packaging goods sourced from Abundancia\'s own food forests, partner farms, and ethical supply chains. Bulk dispensers, reusable containers, and a commitment to eliminating food waste.', link: '/story/regeneration' },
  { image: '/images/website/35-entertainment-areas-parks.png', name: 'Entertainment Areas & Parks', detail: 'Outdoor entertainment zones including playgrounds, picnic areas, fire pit gathering circles, and open-air event lawns. Designed for festivals, movie nights, community celebrations, and spontaneous connection.', link: '/story/vision' },
  { image: '/images/website/36-organic-restaurants-cafes.png', name: 'Organic Restaurants & Cafes', detail: 'Farm-to-table dining featuring ingredients harvested from on-site food forests and gardens. Multiple concepts from casual cafes to fine dining, all committed to zero-waste operations and seasonal, regenerative menus.', link: '/story/regeneration' },
  { image: '/images/website/37-amphitheater.png', name: 'Amphitheater', detail: 'A natural hillside amphitheater seating 500+ for live music, theater, film screenings, and community assemblies. Acoustically optimized using natural terrain contours with a stage framed by native loblolly pines.', link: '/story/vision' },
  { image: '/images/website/38-sustainable-ethical-retail-shops.png', name: 'Sustainable & Ethical Retail', detail: 'Curated retail spaces featuring ethical fashion, zero-waste goods, locally-made crafts, and regenerative products. Each vendor is vetted for environmental and social impact. A destination for conscious consumers from across Central Texas.', link: '/story/regeneration' },
  { image: '/images/website/39-elixir-juice-tea-bar.png', name: 'Elixir, Juice & Tea Bar', detail: 'A wellness-focused beverage bar serving cold-pressed juices, herbal elixirs, adaptogenic tonics, and specialty teas. Ingredients sourced from on-site gardens and food forests. A daily gathering spot for health-conscious community members.', link: '/story/regeneration' },
  { image: '/images/website/40-health-center.png', name: 'Health Center', detail: 'An integrative health facility offering preventive care, naturopathic medicine, acupuncture, chiropractic, and health testing. Focused on proactive wellness rather than reactive treatment. Open to residents and the broader Bastrop community.', link: '/story/regeneration' },
  { image: '/images/website/41-spa-massage.png', name: 'Spa & Massage', detail: 'A full-service wellness spa with massage therapy, hydrotherapy, infrared sauna, cold plunge, and beauty treatments using organic, locally-made products. Revenue-generating amenity open to residents and the visiting public.', link: '/story/regeneration' },
]

// ═══════════════════════════════════════════════════════════════════════════
// Reusable Image Grid with Modal
// ═══════════════════════════════════════════════════════════════════════════

function SpaceGrid({ spaces }: { spaces: { image: string; name: string; detail: string; link: string }[] }) {
  const [activeSpace, setActiveSpace] = useState<typeof spaces[number] | null>(null)

  return (
    <>
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {spaces.map((space) => (
          <StaggerItem key={space.name}>
            <button
              onClick={() => setActiveSpace(space)}
              className="card-hover overflow-hidden group w-full text-left cursor-pointer"
            >
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
            </button>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <Modal open={!!activeSpace} onClose={() => setActiveSpace(null)} title={activeSpace?.name}>
        {activeSpace && (
          <div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-5">
              <Image
                src={activeSpace.image}
                alt={activeSpace.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-neutral-600 leading-relaxed mb-5">
              {activeSpace.detail}
            </p>
            <Link
              href={activeSpace.link}
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-800 hover:text-primary-900 transition-colors"
              onClick={() => setActiveSpace(null)}
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </Modal>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function CommunityPage() {
  const [activeHousing, setActiveHousing] = useState<typeof HOUSING_TYPES[number] | null>(null)
  const [activeBioFeature, setActiveBioFeature] = useState<typeof BIOHARMONIC_FEATURES[number] | null>(null)

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
            <h1 className="font-display text-3xl md:text-4xl lg:text-6xl text-white mb-6 max-w-4xl">
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
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
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
                <button
                  onClick={() => setActiveHousing(housing)}
                  className="card-hover overflow-hidden h-full flex flex-col w-full text-left cursor-pointer"
                >
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
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Housing Detail Modal */}
      <Modal open={!!activeHousing} onClose={() => setActiveHousing(null)} title={activeHousing?.type} size="lg">
        {activeHousing && (
          <div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6">
              <Image
                src={activeHousing.image}
                alt={activeHousing.type}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className="font-accent text-xs font-semibold bg-white/90 backdrop-blur-sm text-primary-800 px-2.5 py-1 rounded-full">
                  {activeHousing.units}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              <span className="font-accent text-xs font-semibold bg-primary-800/10 text-primary-800 px-3 py-1.5 rounded-full">
                {activeHousing.priceRange}
              </span>
              <span className="font-accent text-xs font-semibold bg-secondary-500/10 text-secondary-700 px-3 py-1.5 rounded-full">
                {activeHousing.sqftRange}
              </span>
              <span className="font-accent text-xs font-semibold bg-accent-500/10 text-accent-700 px-3 py-1.5 rounded-full">
                {activeHousing.units}
              </span>
            </div>

            <p className="text-neutral-600 leading-relaxed mb-6">
              {activeHousing.detail}
            </p>

            <h4 className="font-accent text-sm font-semibold text-neutral-900 mb-3">Key Features</h4>
            <ul className="space-y-2 mb-6">
              {activeHousing.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-neutral-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-800 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/model"
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-800 hover:text-primary-900 transition-colors"
              onClick={() => setActiveHousing(null)}
            >
              View Financial Model
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </Modal>

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
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-6">
                  Bioharmonic Buildings
                </h2>
                <p className="text-lg text-white/70 leading-relaxed mb-8">
                  These resilient buildings are made with healthy materials such as bioceramic, hemp, algae, and rammed earth — designed to harmonize with both the human body and the natural environment.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BIOHARMONIC_FEATURES.map((feature) => (
                    <button
                      key={feature.title}
                      onClick={() => setActiveBioFeature(feature)}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-left cursor-pointer hover:bg-white/10 transition-colors duration-300"
                    >
                      <h3 className="font-accent text-sm font-semibold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {feature.description}
                      </p>
                    </button>
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

      {/* Bioharmonic Feature Modal */}
      <Modal open={!!activeBioFeature} onClose={() => setActiveBioFeature(null)} title={activeBioFeature?.title}>
        {activeBioFeature && (
          <div>
            <p className="text-neutral-600 leading-relaxed mb-5">
              {activeBioFeature.detail}
            </p>
            <Link
              href="/data-room/view/regenerative/hempcrete-construction"
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-800 hover:text-primary-900 transition-colors"
              onClick={() => setActiveBioFeature(null)}
            >
              View Hempcrete Construction Report
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </Modal>

      {/* ═══ COMMUNITY SPACES ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">
                <Users className="w-4 h-4 inline mr-2 -mt-0.5" />
                Community Spaces
              </span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
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
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
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
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
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
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-6">
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

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/data-room/view/financial/unit-economics"
                    className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-secondary-400 hover:text-secondary-300 transition-colors"
                  >
                    View in Data Room
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/invest/apply"
                    className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
                  >
                    Apply to Invest
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
                    <span className="font-display text-2xl font-bold text-secondary-400">$5.5M</span>
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
          src="/images/website/51-healthy-resilient-buildings.png"
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
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-white mb-6 max-w-3xl mx-auto">
              The Systems Behind the Vision
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Discover the regenerative infrastructure — energy, water, food, and waste systems — that make Abundancia a truly self-sustaining community.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/story/regeneration" className="btn-primary-light btn-lg rounded-2xl text-base group">
                Regenerative Systems
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/model" className="btn-secondary-light btn-lg rounded-2xl text-base">
                View Business Model
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
