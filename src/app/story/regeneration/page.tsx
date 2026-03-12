'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { Modal } from '@/components/ui/Modal'
import {
  ArrowRight, Leaf, Droplets, Sun, TreePine, Recycle,
  Flower2, Bug, Building2, Compass, Award, Car,
  FlaskConical, ShoppingBag, Heart, Vote, Coins, Stethoscope
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const PETALS = [
  {
    name: 'Place',
    description: 'Restoring a healthy interrelationship with nature.',
    color: 'bg-green-500',
    detail: 'Abundancia preserves over 90% of its 380 acres as native Lost Pines ecosystem, wildlife corridors, and restored habitat. Development is clustered into pods that minimize land disturbance while maximizing connection to nature. Every resident lives within a 2-minute walk of preserved wilderness, food forests, or restored waterways.',
    link: '/data-room/view/property/site-assessment',
    linkLabel: 'View Site Assessment',
  },
  {
    name: 'Water',
    description: 'Operating within the water balance of a given place and climate.',
    color: 'bg-blue-500',
    detail: 'Seven retention ponds, comprehensive rainwater harvesting, greywater recycling, and structured water systems create a closed-loop water cycle. Abundancia targets 100% water independence from municipal supply, with ACWA backup for drought resilience. Permeable surfaces and bioswales ensure every drop that falls on site is captured, cleaned, and reused.',
    link: '/data-room/view/regenerative/water-systems',
    linkLabel: 'View Water Systems Report',
  },
  {
    name: 'Energy',
    description: 'Relying only on current solar income.',
    color: 'bg-yellow-500',
    detail: 'Community-scale solar arrays paired with battery storage provide net-positive energy generation. After Winter Storm Uri exposed Texas grid vulnerabilities, Abundancia designed for complete grid independence. Passive solar home design reduces heating and cooling loads by 60-80%, while hempcrete\'s thermal mass stores and releases heat naturally throughout the day.',
    link: '/data-room/view/regenerative/energy-independence',
    linkLabel: 'View Energy Independence Plan',
  },
  {
    name: 'Health & Happiness',
    description: 'Optimizing physical and psychological health and well-being.',
    color: 'bg-rose-500',
    detail: 'Every design decision at Abundancia is evaluated through its impact on human health and well-being. Hempcrete walls provide the healthiest indoor air quality of any building material. Biophilic design integrates nature into daily life. On-site wellness facilities, organic food systems, and community connection address the root causes of chronic disease and social isolation.',
    link: '/story/community',
    linkLabel: 'Explore Community Amenities',
  },
  {
    name: 'Materials',
    description: 'Endorsing products that are safe for all species through time.',
    color: 'bg-amber-600',
    detail: 'Abundancia is 100% Red List free - no toxic materials enter the building process. Hempcrete is the primary structural material: carbon-negative, non-toxic, and compostable at end of life. Every material undergoes full life cycle analysis from extraction through disposal. The result is buildings that are safe for occupants, builders, and the ecosystem from day one through century five.',
    link: '/data-room/view/regenerative/hempcrete-construction',
    linkLabel: 'View Hempcrete Construction Report',
  },
  {
    name: 'Equity',
    description: 'Supporting a just and equitable world.',
    color: 'bg-purple-500',
    detail: 'Abundancia\'s housing mix ensures regenerative living is not reserved for the wealthy. Affordable condominiums, subsidized by commercial revenue streams, provide entry points for working families. Sociocratic governance gives every resident an equal voice. A community currency enables local economic participation beyond traditional income levels. Bastrop County residents receive priority access.',
    link: '/story/community',
    linkLabel: 'Learn About Community Living',
  },
  {
    name: 'Beauty',
    description: 'Celebrating design that uplifts the human spirit.',
    color: 'bg-pink-500',
    detail: 'Beauty is not optional - it is a core performance metric. Sacred geometry informs architectural proportions. Public art installations by resident artists activate shared spaces. Native landscaping creates seasonal color and texture throughout the year. The amphitheater, temple complex, and ceremony spaces are designed as works of art that serve as gathering points for the community spirit.',
    link: '/story/community',
    linkLabel: 'See Community Spaces',
  },
]

const REGEN_FEATURES = [
  {
    image: '/images/website/42-ecological-preservation.jpg',
    icon: TreePine,
    title: 'Ecological Preservation',
    description: 'Over 90% of the land conserved - Lost Pines ecosystem, wildlife corridors, native habitat restoration.',
    detail: 'The property sits within the Lost Pines - an isolated pocket of loblolly pines 100 miles west of the main pine belt. After the devastating 2011 Bastrop wildfire, ecological restoration is both an environmental imperative and a community identity. Abundancia designates over 90% of its acreage as permanently conserved land, actively restoring native habitat for the endangered Houston toad and dozens of other species.',
    dataRoomLink: '/data-room/view/property/environmental-compliance',
    linkLabel: 'View Environmental Compliance',
  },
  {
    image: '/images/website/43-self-sufficiency.jpeg',
    icon: Leaf,
    title: 'Self-Sufficiency',
    description: '80-100% food production, 100% energy/water/waste independence. True community resilience.',
    detail: 'Abundancia targets radical self-sufficiency: 80-100% of food grown on-site through permaculture food forests and community gardens, 100% renewable energy with battery storage, closed-loop water systems, and zero-waste-to-landfill operations. After Winter Storm Uri revealed the fragility of centralized infrastructure, this resilience model has become an investment thesis, not just an ideal.',
    dataRoomLink: '/data-room/view/regenerative/energy-independence',
    linkLabel: 'View Energy Independence Plan',
  },
  {
    image: '/images/website/44-biodiversity-regeneration.jpg',
    icon: Bug,
    title: 'Biodiversity Regeneration',
    description: 'Lost Pines restoration, Houston toad habitat enhancement, native pollinator gardens, wildlife corridors.',
    detail: 'Active biodiversity programs include Houston toad habitat enhancement (a federally endangered species native to Bastrop County), native pollinator gardens spanning 5+ acres, wildlife corridor connectivity to adjacent conservation lands, and a comprehensive invasive species management plan. Annual biodiversity audits track ecosystem health as a core community metric.',
    dataRoomLink: '/data-room/view/property/environmental-compliance',
    linkLabel: 'View Environmental Compliance',
  },
  {
    image: '/images/website/45-water-collection-efficiency-systems.jpeg',
    icon: Droplets,
    title: 'Water Collection & Efficiency',
    description: '7 retention ponds, rainwater harvesting, greywater recycling, ACWA backup, structured water systems.',
    detail: 'The water system is designed for complete independence: seven retention ponds capture and store rainwater, rooftop collection feeds into filtration systems, greywater is recycled for irrigation, and structured water technology optimizes water quality for human consumption. ACWA municipal backup provides drought resilience. Every building achieves 60%+ water reduction versus conventional construction.',
    dataRoomLink: '/data-room/view/regenerative/water-systems',
    linkLabel: 'View Water Systems Report',
  },
  {
    image: '/images/website/46-renewable-energy-systems.jpeg',
    icon: Sun,
    title: 'Renewable Energy Systems',
    description: 'Solar arrays + battery storage providing net-positive energy. Grid-independent after Winter Storm Uri lessons.',
    detail: 'Community-scale solar installations paired with lithium-iron-phosphate battery storage provide net-positive energy generation - the community produces more energy than it consumes annually. Designed explicitly for grid independence after Winter Storm Uri left millions of Texans without power. Passive solar home design further reduces demand by 60-80%.',
    dataRoomLink: '/data-room/view/regenerative/energy-independence',
    linkLabel: 'View Energy Independence Plan',
  },
  {
    image: '/images/website/47-permaculture-agriculture.jpeg',
    icon: Flower2,
    title: 'Permaculture & Agriculture',
    description: 'Food forests, community gardens, orchards. USDA Zone 8b provides 250+ growing days year-round.',
    detail: 'Seven-layer permaculture food forests produce fruit, nuts, herbs, mushrooms, and vegetables across 20+ acres. USDA Zone 8b\'s 250+ growing days enable year-round production. Community gardens provide individual plots for residents. Heritage orchards preserve heirloom varieties. A commercial kitchen processes surplus into preserved goods for the zero-waste grocery and farmer\'s market.',
    dataRoomLink: '/data-room/view/regenerative/permaculture-design',
    linkLabel: 'View Permaculture Design',
  },
  {
    image: '/images/website/48-waste-systems.jpeg',
    icon: Recycle,
    title: 'Waste Systems',
    description: 'Composting, biodigestion, material recovery. Zero-waste-to-landfill target across the community.',
    detail: 'A comprehensive waste management system turns every output into an input: food scraps feed biodigesters producing methane for cooking and compost for gardens, construction waste is minimized through prefabrication and material recovery, and a community repair culture extends product lifespans. The zero-waste grocery eliminates packaging at the source.',
    dataRoomLink: '/data-room/view/regenerative/water-systems',
    linkLabel: 'View Regenerative Systems',
  },
  {
    image: '/images/website/49-reforestation.jpeg',
    icon: TreePine,
    title: 'Reforestation',
    description: 'Native loblolly pine and post oak restoration - rebuilding the Lost Pines after the 2011 Bastrop wildfire.',
    detail: 'The 2011 Complex wildfire burned 34,000 acres and destroyed 1,600 homes - the most destructive wildfire in Texas history. Abundancia\'s reforestation program plants thousands of native loblolly pines and post oaks annually, rebuilding the Lost Pines ecosystem that gives the region its identity. Fire-resistant hempcrete construction ensures the community itself is protected.',
    dataRoomLink: '/data-room/view/property/environmental-compliance',
    linkLabel: 'View Environmental Report',
  },
  {
    image: '/images/website/50-carbon-sequestration.jpg',
    icon: Leaf,
    title: 'Carbon Sequestration',
    description: 'Each hempcrete home sequesters 20-40 tons of CO2. The community is carbon-negative from day one.',
    detail: 'Hemp absorbs massive amounts of CO2 during growth - approximately 1.6 tons per ton of hemp. When locked into hempcrete walls, this carbon is permanently sequestered for the 500+ year lifespan of the building. Each Abundancia home sequesters 20-40 tons of CO2 at construction. Combined with reforestation and permaculture soil building, the community achieves measurable carbon-negative status from day one.',
    dataRoomLink: '/data-room/view/regenerative/hempcrete-construction',
    linkLabel: 'View Hempcrete Report',
  },
  {
    image: '/images/website/51-healthy-resilient-buildings.jpeg',
    icon: Building2,
    title: 'Healthy Resilient Buildings',
    description: 'Fire-resistant (2+ hour rating), storm-resistant, pest-resistant. Healthiest indoor air quality available.',
    detail: 'Hempcrete buildings achieve a 2+ hour fire rating without chemical fire retardants, resist hurricane-force winds, are naturally impervious to termites and pests, and provide R-30+ insulation. Indoor air quality is the healthiest achievable in any building type - zero VOCs, natural humidity regulation between 40-60%, and breathable wall systems that prevent mold. These buildings literally heal the people inside them.',
    dataRoomLink: '/data-room/view/regenerative/hempcrete-construction',
    linkLabel: 'View Hempcrete Report',
  },
  {
    image: '/images/website/52-efficient-site-design.jpeg',
    icon: Compass,
    title: 'Efficient Site Design',
    description: 'Clustered development pods around water features. Walkable, bikeable, and connected by trail networks.',
    detail: 'Development is organized into clustered pods that minimize land disturbance while maximizing community connection. Each pod is oriented around water features and gathering spaces. A network of walking and biking trails connects every neighborhood to amenities, reducing car dependence. Shared parking is located at pod perimeters, keeping the interior pedestrian-focused and child-friendly.',
    dataRoomLink: '/data-room/view/property/site-assessment',
    linkLabel: 'View Site Assessment',
  },
  {
    image: '/images/website/53-living-building-certification.png',
    icon: Award,
    title: 'Living Building Certification',
    description: 'Pursuing the most rigorous green building standard in the world - the Living Building Challenge.',
    detail: 'The Living Building Challenge is the most rigorous green building certification in existence - requiring actual performance data over 12 months of operation, not just design intent. Abundancia pursues full Living Building Certification across all seven petals: Place, Water, Energy, Health & Happiness, Materials, Equity, and Beauty. Only a handful of communities worldwide have achieved this standard.',
    dataRoomLink: '/story/regeneration',
    linkLabel: 'Learn About the 7 Petals',
  },
  {
    image: '/images/website/54-electric-vehicle-transportation.jpg',
    icon: Car,
    title: 'Electric Vehicle Transportation',
    description: 'EV charging infrastructure, community electric vehicles, and walkable design reducing car dependence.',
    detail: 'Every parking area is equipped with Level 2 EV chargers, with DC fast charging at community hubs. A fleet of shared community electric vehicles reduces the need for individual car ownership. The walkable, bikeable site design means most daily needs are met without any vehicle at all - the EV infrastructure serves trips to Austin and beyond.',
    dataRoomLink: '/data-room/view/regenerative/energy-independence',
    linkLabel: 'View Energy Systems',
  },
  {
    image: '/images/website/55-material-life-cycle-analysis.jpg',
    icon: FlaskConical,
    title: 'Material Life Cycle Analysis',
    description: 'Every material evaluated for environmental impact from extraction through end-of-life. Red List free.',
    detail: 'Every material used in Abundancia undergoes comprehensive life cycle analysis - evaluating environmental impact from raw material extraction, through manufacturing and transportation, to installation, maintenance, and eventual end-of-life. All materials are Red List free (no toxic chemicals). The research center publishes findings as open-source data to advance the regenerative building industry.',
    dataRoomLink: '/data-room/view/regenerative/hempcrete-construction',
    linkLabel: 'View Materials Report',
  },
  {
    image: '/images/website/56-sustainable-ethical-products.jpg',
    icon: ShoppingBag,
    title: 'Sustainable & Ethical Products',
    description: 'On-site production and curation of ethical goods - supporting local makers and regenerative supply chains.',
    detail: 'The community supports a local maker economy producing ethical goods: body care products from garden herbs, preserved foods from the permaculture harvest, artisan crafts from workshop studios, and curated retail featuring regenerative supply chains. Every product sold on-site meets sustainability and ethical sourcing standards. This creates both community revenue and a destination retail experience.',
    dataRoomLink: '/story/community',
    linkLabel: 'Explore Community Spaces',
  },
]

const COMMUNITY_OPS = [
  {
    image: '/images/website/57-co-governance.jpeg',
    icon: Vote,
    title: 'Co-Governance',
    description: 'Sociocratic decision-making where every resident has voice and vote. Structured onboarding ensures inclusive participation from day one.',
    detail: 'Abundancia operates on a sociocratic governance model where decisions are made by consent rather than majority vote. Nested circles - from household to neighborhood to community-wide - ensure that every voice is heard at the appropriate level. New residents complete a structured onboarding program that teaches the governance model, builds relationships, and ensures inclusive participation from day one. This is not a commune - it is a sophisticated, scalable governance structure proven in communities worldwide.',
  },
  {
    image: '/images/website/58-alternative-currency.jpeg',
    icon: Coins,
    title: 'Alternative Currency',
    description: 'Community-backed digital currency enabling local economic sovereignty. Residents can trade skills, goods, and services within the ecosystem.',
    detail: 'The Abundancia community currency is a blockchain-backed digital token that enables local economic sovereignty. Residents earn currency by contributing to community operations - teaching, gardening, mentoring, maintenance - and spend it at on-site businesses, the zero-waste grocery, and with fellow residents. The currency keeps economic value circulating within the community, creating a multiplier effect that strengthens local resilience independent of external economic conditions.',
  },
  {
    image: '/images/website/59-health-care.jpeg',
    icon: Stethoscope,
    title: 'Holistic Health Care',
    description: 'Nutrition counseling, health testing, on-site health center, preventive wellness programs. Health care designed around prevention, not crisis.',
    detail: 'The on-site integrative health center combines conventional and holistic modalities: naturopathic medicine, acupuncture, chiropractic, nutrition counseling, and comprehensive health testing. Preventive wellness programs address root causes rather than symptoms. The food forest and organic kitchens provide the nutritional foundation. Yoga, meditation, and fitness facilities support physical vitality. Mental health resources and community connection address the epidemic of isolation. This is healthcare redesigned from first principles.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function RegenerationPage() {
  const [activePetal, setActivePetal] = useState<typeof PETALS[number] | null>(null)
  const [activeFeature, setActiveFeature] = useState<typeof REGEN_FEATURES[number] | null>(null)
  const [activeOp, setActiveOp] = useState<typeof COMMUNITY_OPS[number] | null>(null)

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image
          src="/images/website/12-rethinking-development.jpeg"
          alt="Rethinking development - regenerative building and design"
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
              Conventional development generates 40% of annual global CO2 emissions. Abundancia eliminates pollution, waste, and environmental destruction - replacing them with systems that regenerate the land.
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
                  alt="Living Building Challenge Certification - the 7 Petals"
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
                  We are building with the most rigorous green building certification in the world - aligning with the 7 Petals to co-create a world we are proud to pass on to our grandchildren.
                </p>

                <div className="space-y-3">
                  {PETALS.map((petal) => (
                    <button
                      key={petal.name}
                      onClick={() => setActivePetal(petal)}
                      className="flex items-start gap-3 w-full text-left cursor-pointer hover:bg-neutral-50 rounded-lg px-2 py-1.5 -mx-2 transition-colors duration-200"
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${petal.color} mt-2 flex-shrink-0`} />
                      <div>
                        <span className="font-accent text-sm font-semibold text-neutral-900">{petal.name}</span>
                        <span className="text-sm text-neutral-600"> - {petal.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Petal Modal */}
      <Modal open={!!activePetal} onClose={() => setActivePetal(null)} title={activePetal?.name}>
        {activePetal && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${activePetal.color}`} />
              <span className="font-accent text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Living Building Challenge Petal
              </span>
            </div>
            <p className="text-neutral-600 leading-relaxed mb-5">
              {activePetal.detail}
            </p>
            <Link
              href={activePetal.link}
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-800 hover:text-primary-900 transition-colors"
              onClick={() => setActivePetal(null)}
            >
              {activePetal.linkLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </Modal>

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
                <button
                  onClick={() => setActiveFeature(feature)}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-full group hover:bg-white/10 transition-colors duration-300 w-full text-left cursor-pointer"
                >
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
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Regen Feature Modal */}
      <Modal open={!!activeFeature} onClose={() => setActiveFeature(null)} title={activeFeature?.title} size="lg">
        {activeFeature && (
          <div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-5">
              <Image
                src={activeFeature.image}
                alt={activeFeature.title}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-neutral-600 leading-relaxed mb-5">
              {activeFeature.detail}
            </p>
            <Link
              href={activeFeature.dataRoomLink}
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-800 hover:text-primary-900 transition-colors"
              onClick={() => setActiveFeature(null)}
            >
              {activeFeature.linkLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </Modal>

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
                Governance, economics, and health care - designed for sovereignty, inclusion, and well-being.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMMUNITY_OPS.map((op) => (
              <StaggerItem key={op.title}>
                <button
                  onClick={() => setActiveOp(op)}
                  className="card-hover overflow-hidden h-full flex flex-col w-full text-left cursor-pointer"
                >
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
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Community Ops Modal */}
      <Modal open={!!activeOp} onClose={() => setActiveOp(null)} title={activeOp?.title}>
        {activeOp && (
          <div>
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-5">
              <Image
                src={activeOp.image}
                alt={activeOp.title}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-neutral-600 leading-relaxed mb-5">
              {activeOp.detail}
            </p>
            <Link
              href="/story/community"
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-800 hover:text-primary-900 transition-colors"
              onClick={() => setActiveOp(null)}
            >
              Explore Community Living
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </Modal>

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
                Abundancia isn&apos;t just for residents - it creates affordable homes, healthy food access, jobs, education, and economic opportunity for the wider Bastrop County community.
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
                <Link href="/expansion" className="card-hover overflow-hidden group block">
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
                </Link>
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
