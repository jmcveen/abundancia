'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { Modal } from '@/components/ui/Modal'
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
    detail: [
      'Austin has been the fastest-growing large metro in the US for most of the past decade, adding over 150 people per day at its peak. The population of the Austin-Round Rock-Georgetown MSA surpassed 2.4 million in 2024, with projections to exceed 3 million by 2030.',
      'This growth is driven primarily by corporate relocations (Tesla, Oracle, Apple, Samsung) and remote workers from higher-cost metros like San Francisco and New York. The median household income of in-migrants is 20-30% higher than the existing Austin median, creating sustained demand for premium housing.',
      'The growth corridor east of Austin — where Abundancia is located — is the primary expansion vector. Population growth in the surrounding county has outpaced even Austin proper in recent years, as buyers seek affordability while maintaining access to Austin\'s economy.',
    ],
    source: 'US Census Bureau, Austin Chamber of Commerce, Texas Demographic Center (2024)',
  },
  {
    icon: Sprout,
    title: 'Sustainability Culture',
    description: 'Whisper Valley (zero-energy) and Colony Park (208-acre sustainable dev) prove Austin\'s deep appetite for eco-conscious living.',
    detail: [
      'Austin has the strongest sustainability culture of any major Texas city. The Austin Climate Equity Plan targets net-zero community-wide greenhouse gas emissions by 2040. The city\'s Green Building program — the first in the nation when launched in 1991 — has rated over 15,000 projects.',
      'Market proof points are compelling. Whisper Valley, Texas\'s first zero-energy community, has sold out multiple phases with premium pricing. Mueller, the 700-acre mixed-use development on the former airport site, commands significant price premiums over comparable neighborhoods. Colony Park, a 208-acre city-led sustainable development, was approved with broad community support.',
      'Abundancia represents the next evolution beyond these projects — not just zero-energy or sustainable, but actively regenerative. The Austin market has been educated by these predecessors and is ready for a development that goes further: carbon-negative construction, food sovereignty, water independence, and community governance.',
    ],
    source: 'City of Austin Climate Equity Plan, Whisper Valley Sales Data, Mueller Development Authority (2024)',
  },
  {
    icon: Building2,
    title: 'Tech & Innovation Hub',
    description: 'Tesla, Apple, Google, Oracle, Samsung — the world\'s most innovative companies are here, creating demand for progressive housing.',
    detail: [
      'Austin is home to Tesla\'s Gigafactory (employing 20,000+), Apple\'s $1B campus, Google\'s expanding downtown office, Oracle\'s relocated headquarters, Samsung\'s $17B chip fab, and hundreds of venture-backed startups. The tech sector accounts for approximately 18% of Austin\'s GDP.',
      'Tech professionals represent the ideal buyer demographic for Abundancia: high income, values-driven, early adopters of sustainable living, and accustomed to premium pricing for quality and innovation. Many are relocating from the Bay Area where regenerative and sustainable communities command significant premiums.',
      'The remote work revolution has further expanded the addressable market. Professionals no longer need to live within commuting distance of downtown offices — a 30-minute drive to Austin is well within acceptable range, especially for hybrid workers who commute 2-3 days per week.',
    ],
    source: 'Austin Economic Development Department, LinkedIn Workforce Report, Bureau of Labor Statistics (2024)',
  },
  {
    icon: CloudSun,
    title: 'Year-Round Growing',
    description: 'USDA Zone 8b with 250+ growing days, 300+ sunny days, and 37" annual rainfall — perfect for permaculture and solar.',
    detail: [
      'Central Texas USDA Zone 8b provides one of the longest growing seasons in the continental US — 250+ frost-free days per year. This enables year-round food production through succession planting, food forests, and season-extending techniques like cold frames and hoop houses.',
      'Solar irradiance in the Austin area averages 4.7-5.5 kWh/m²/day, among the highest in the US east of the Rockies. With 300+ sunny days annually, rooftop solar arrays achieve exceptional efficiency — a typical residential system produces 20-30% more energy than the same system in the Northeast.',
      'The 37 inches of annual rainfall, while requiring supplemental irrigation during summer months, provides significant rainwater harvesting potential. A 2,500 SF rooftop captures approximately 58,000 gallons annually — enough for substantial household and garden use. Combined with Abundancia\'s seven retention ponds, the property has water resources that far exceed typical Texas developments.',
    ],
    source: 'USDA Plant Hardiness Zone Map, NREL Solar Radiation Data, NOAA Climate Normals (2024)',
  },
]

const WHY_LOCATION = [
  {
    stat: 'Zero',
    label: 'Zoning Restrictions',
    description: 'No zoning means mixed-use, innovative design built by right — no years of rezoning hearings or political risk.',
    detail: [
      'The county where Abundancia is located has no zoning ordinances, which is increasingly rare even in Texas. This means Abundancia can build a true mixed-use community — residential, commercial, agricultural, and recreational uses integrated together — without requiring variances, special use permits, or rezoning approvals.',
      'In contrast, a comparable development within Austin city limits would require 18-24 months of entitlement work, public hearings, environmental reviews, and political negotiations. The risk of denial or significant design compromises is substantial. Our location\'s regulatory environment eliminates this entire layer of risk and cost.',
      'The county does require subdivision platting and compliance with building codes (including the newly adopted IRC 2024 hempcrete appendix), but these are predictable, non-discretionary processes with clear timelines.',
    ],
    link: '/data-room/view/property/site-assessment',
    linkLabel: 'View Site Assessment',
  },
  {
    stat: '6-12',
    label: 'Month Timeline',
    description: 'County permitting vs. 18-24 months in Austin. Faster to market, lower carrying costs, reduced risk.',
    detail: [
      'The county\'s streamlined permitting process enables a 6-12 month timeline from application to first building permits. This is less than half the 18-24 month timeline typical for Austin developments, and does not carry the political risk of discretionary approvals.',
      'Faster permitting translates directly to improved project economics: lower carrying costs on land, earlier revenue generation, and reduced exposure to market cycle risk. For a 380-acre development, the interest savings alone on a 12-month acceleration can exceed $1M.',
      'The county building department has also been proactive in preparing for hempcrete construction, with inspectors trained on the IRC 2024 Appendix BA standards. This removes what has historically been the biggest regulatory uncertainty for natural building materials.',
    ],
    link: '/data-room/view/property/site-assessment',
    linkLabel: 'View Permitting Timeline',
  },
  {
    stat: '$0.98',
    label: '/ $100 Property Tax',
    description: 'Agricultural exemption dramatically reduces holding costs during development. The 380-acre site qualifies.',
    detail: [
      'The 380-acre Abundancia property qualifies for Texas agricultural exemption, which values the land based on agricultural productivity rather than market value. This reduces the assessed value from approximately $15-20K per acre (market) to $200-400 per acre (agricultural), cutting annual property taxes by over 95% during the development period.',
      'The combined Bastrop County tax rate of approximately $0.98 per $100 of assessed value is also significantly lower than Austin\'s rate of $1.85-2.20. Even after development, Abundancia homeowners benefit from lower base tax rates — though the MUD bond overlay will add a special assessment for infrastructure debt service.',
      'The agricultural exemption can be maintained on the 90%+ of the site designated as conservation and agricultural land even after the development parcels are subdivided, providing ongoing tax benefits that enhance the long-term economics of the project.',
    ],
    link: '/data-room/view/investment/executive-summary',
    linkLabel: 'View Financial Model',
  },
  {
    stat: '30',
    label: 'Minutes to Austin',
    description: 'Direct highway access to downtown Austin, the airport, and the tech corridor.',
    detail: [
      'The Abundancia property has direct highway access to downtown Austin in approximately 30 minutes. Multiple major highways provide alternative routes and direct access to Austin-Bergstrom International Airport in under 25 minutes.',
      'The eastern growth corridor is the primary expansion vector for the Austin metro. TxDOT has invested billions in capacity improvements, and the corridor is planned for continued widening and improvement over the next decade. This infrastructure investment supports both commuter access and long-term property value appreciation.',
      'The property is positioned at the convergence of Austin\'s growth wave and Bastrop County regulatory advantages — close enough for daily commuting, but far enough to capture the benefits of unincorporated county land.',
    ],
    link: '/data-room/view/research/market-research-report',
    linkLabel: 'View Location Analysis',
  },
]

const PROPERTY_FEATURES = [
  {
    icon: Droplets,
    title: '7 Water Retention Ponds',
    description: 'Existing water infrastructure provides irrigation, wildlife habitat, recreation, and resilience during Texas droughts.',
    detail: 'The seven retention ponds range from 0.5 to 3 acres in size, with a combined surface area of approximately 12 acres and an estimated total capacity of 15-20 million gallons. These ponds serve multiple functions: irrigation supply for permaculture zones, wildlife habitat (particularly for the endangered Houston toad), passive recreation, fire suppression reserve, and microclimate cooling. The ponds are fed by natural drainage and two dry creek beds that channel rainfall across the property. During typical years, the ponds maintain adequate levels year-round. During drought years, they serve as a critical buffer alongside rainwater harvesting and ACWA municipal supply.',
    link: '/data-room/view/regenerative/water-systems',
    linkLabel: 'Water Systems Plan',
  },
  {
    icon: TreePine,
    title: 'Lost Pines Ecoregion',
    description: 'A biological island of loblolly pines — the westernmost stand in North America. Unique ecological value enhances property premium.',
    detail: 'The Lost Pines is a 70-square-mile island of loblolly pine forest separated from the main East Texas pine belt by over 100 miles of blackland prairie. This biological anomaly — the westernmost naturally occurring pine stand in North America — creates a unique ecological character that is both a conservation responsibility and a significant property value driver. The ecoregion supports dozens of species not found elsewhere in Central Texas, including the endangered Houston toad. Abundancia\'s conservation-forward design (over 90% preserved land) actively enhances this habitat through native planting, water management, and corridor connectivity.',
    link: '/data-room/view/property/environmental-compliance',
    linkLabel: 'Environmental Compliance',
  },
  {
    icon: Home,
    title: '2,821 SF Farmhouse (2020)',
    description: 'Recently built main residence ready for immediate retreat/event use during Phase 1 development.',
    detail: 'The 2020-built farmhouse is a modern 3-bedroom, 2.5-bathroom residence with open-concept living, a professional kitchen, and expansive porches overlooking the property\'s ponds and tree lines. During Phase 1 development, this structure serves as an operations headquarters, model experience center for prospective buyers, and revenue-generating retreat rental. The farmhouse is in excellent condition with updated systems, requiring no capital expenditure to activate for immediate use.',
    link: '/data-room/view/property/site-assessment',
    linkLabel: 'Property Assessment',
  },
  {
    icon: Landmark,
    title: '1870 Historic Guest House',
    description: '2,000 SF historic structure — one of the oldest in the county. Character asset for events and heritage tourism.',
    detail: 'Dating to approximately 1870, this 2,000 SF structure is one of the oldest surviving buildings in Bastrop County. The historic guest house provides irreplaceable character and authenticity — a tangible connection to the region\'s heritage that cannot be replicated by new construction. Planned uses include a boutique event venue, heritage tourism attraction, and community gathering space. The structure may qualify for historic preservation tax credits, and its story adds marketing value that differentiates Abundancia from generic new developments.',
    link: '/data-room/view/property/site-assessment',
    linkLabel: 'Historic Structures',
  },
  {
    icon: Fence,
    title: 'Completely Fenced',
    description: 'Full perimeter fencing with agricultural infrastructure. 2 barns — one with a performance stage for events.',
    detail: 'The entire 380-acre property is enclosed with maintained perimeter fencing — a significant existing asset that provides immediate security, livestock management capability, and a defined community boundary. The two barns include a traditional agricultural barn suitable for equipment storage and workshop conversion, and a larger event barn featuring an existing performance stage that has been used for concerts and gatherings. This event infrastructure provides immediate revenue potential from Phase 1, hosting weddings, corporate retreats, music events, and community festivals while residential development progresses.',
    link: '/data-room/view/property/site-assessment',
    linkLabel: 'Infrastructure Assessment',
  },
  {
    icon: Sun,
    title: '2 Dry Creek Beds',
    description: 'Natural drainage corridors that become design features — walking trails, wildlife corridors, and bioswale systems.',
    detail: 'The two dry creek beds are natural drainage corridors that channel rainfall across the property into the retention ponds. Rather than treating these as obstacles to development, Abundancia\'s master plan integrates them as premium design features: linear parks with walking and cycling trails, wildlife movement corridors connecting habitat patches, and engineered bioswale systems that filter stormwater naturally before it reaches the ponds. These corridors also serve as natural fire breaks and contribute to the property\'s microclimate by channeling cool air through developed areas.',
    link: '/data-room/view/property/master-plan',
    linkLabel: 'Master Plan Details',
  },
]

const MASTER_PLAN = [
  {
    percentage: '25-30%',
    label: 'Development Footprint',
    acres: '94-113 acres',
    description: 'Clustered development pods around water features. Residential villages, commercial core, retreat center, community hub.',
    detail: 'The development footprint is organized into distinct pods, each clustered around water features and connected by a network of walking trails and greenways. Key zones include: 3-4 residential villages (each with 40-80 homes organized around shared courtyards), a mixed-use commercial village with co-working, retail, and dining, a retreat and wellness center, the community hub with event spaces and maker workshops, and the educational campus. Homes are positioned to maximize passive solar orientation, views of conservation land, and pedestrian connectivity to shared amenities. No home is more than a 5-minute walk from a community gathering space.',
    link: '/data-room/view/property/master-plan',
    linkLabel: 'Full Master Plan',
  },
  {
    percentage: '90%+',
    label: 'Conservation & Agriculture',
    acres: '340+ acres',
    description: 'Preserved ecosystems, food forests, permaculture zones, wildlife corridors, Houston toad habitat, trail networks.',
    detail: 'The conservation zone is not passive "preserved land" but an actively managed regenerative landscape. Key components include: 40+ acres of food forests and permaculture gardens producing year-round organic food for residents, 80+ acres of restored native Lost Pines habitat with Houston toad conservation corridors, 20+ acres of managed ponds and wetlands for water security and biodiversity, 15+ miles of trail networks for hiking, cycling, and equestrian use, and 100+ acres of managed grassland and savanna for carbon sequestration and livestock grazing. Conservation easements on this portion may qualify for significant federal and state tax benefits while permanently protecting the ecological character of the community.',
    link: '/data-room/view/property/master-plan',
    linkLabel: 'Conservation Plan',
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
  const [activeAustin, setActiveAustin] = useState<number | null>(null)
  const [activeLocation, setActiveLocation] = useState<number | null>(null)
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const [activeMasterPlan, setActiveMasterPlan] = useState<number | null>(null)
  const [mudModalOpen, setMudModalOpen] = useState(false)

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image
          src="/images/website/06-regenerative-community-aerial.png"
          alt="Abundancia — 380 acres near Austin, Texas"
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
            <h1 className="font-display text-3xl md:text-4xl lg:text-6xl text-white mb-6 max-w-4xl">
              380 Acres in Bastrop County
            </h1>
            <p className="text-xl text-white/80 max-w-3xl leading-relaxed">
              Bastrop County — 30 minutes from downtown Austin. A rare assemblage of water, mature trees, existing structures, and agricultural exemption in the fastest-growing metro in America.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-secondary-400" />
              <span className="font-accent text-sm text-white/70">Greater Austin, TX &middot; 30 Minutes from Downtown</span>
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
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-6">
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
                {WHY_AUSTIN.map((item, index) => (
                  <StaggerItem key={item.title}>
                    <button
                      onClick={() => setActiveAustin(index)}
                      className="card p-5 h-full text-left hover:border-primary-300 hover:shadow-md transition-all duration-300 cursor-pointer w-full group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-3">
                        <item.icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="font-accent text-base font-semibold text-neutral-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {item.description}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-3 text-xs font-accent font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View data <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Austin Modal */}
      <Modal
        open={activeAustin !== null}
        onClose={() => setActiveAustin(null)}
        title={activeAustin !== null ? WHY_AUSTIN[activeAustin].title : ''}
      >
        {activeAustin !== null && (
          <div>
            <div className="space-y-4 mb-4">
              {WHY_AUSTIN[activeAustin].detail.map((paragraph, i) => (
                <p key={i} className="text-sm text-neutral-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="bg-neutral-50 rounded-xl p-4 mb-6">
              <p className="text-xs text-neutral-500 italic">
                Source: {WHY_AUSTIN[activeAustin].source}
              </p>
            </div>
            <Link
              href="/data-room/view/research/market-research-report"
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors group"
            >
              Full Market Research Report
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </Modal>

      {/* ═══ WHY BASTROP COUNTY ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                The Micro Market
              </span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-6">
                Why This Location
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                This area sits in the Austin growth corridor — one of the fastest-appreciating land markets in Texas. But what makes it truly special for Abundancia is the regulatory environment: no zoning restrictions, streamlined permitting, and agricultural exemptions that make innovative, mixed-use development possible by right.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_LOCATION.map((item, index) => (
              <StaggerItem key={item.label}>
                <button
                  onClick={() => setActiveLocation(index)}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full text-left hover:bg-white/10 transition-colors duration-300 cursor-pointer w-full group"
                >
                  <div className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-400 mb-1">
                    {item.stat}
                  </div>
                  <div className="font-accent text-sm font-semibold text-white mb-3">
                    {item.label}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 text-xs font-accent font-semibold text-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Bastrop Modal */}
      <Modal
        open={activeLocation !== null}
        onClose={() => setActiveLocation(null)}
        title={activeLocation !== null ? `${WHY_LOCATION[activeLocation].stat} ${WHY_LOCATION[activeLocation].label}` : ''}
      >
        {activeLocation !== null && (
          <div>
            <div className="space-y-4 mb-6">
              {WHY_LOCATION[activeLocation].detail.map((paragraph, i) => (
                <p key={i} className="text-sm text-neutral-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href={WHY_LOCATION[activeLocation].link}
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors group"
            >
              {WHY_LOCATION[activeLocation].linkLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </Modal>

      {/* ═══ THE PROPERTY ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">The Property</span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
                A Rare Assemblage
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                380 acres of water-rich ranchland with existing structures, mature tree cover, and agricultural exemption — assembled and ready for development.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROPERTY_FEATURES.map((feature, index) => (
              <StaggerItem key={feature.title}>
                <button
                  onClick={() => setActiveFeature(index)}
                  className="card p-6 h-full text-left hover:border-primary-300 hover:shadow-md transition-all duration-300 cursor-pointer w-full group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-accent text-lg font-semibold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-3 text-xs font-accent font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View details <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Property Feature Modal */}
      <Modal
        open={activeFeature !== null}
        onClose={() => setActiveFeature(null)}
        title={activeFeature !== null ? PROPERTY_FEATURES[activeFeature].title : ''}
      >
        {activeFeature !== null && (
          <div>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              {PROPERTY_FEATURES[activeFeature].detail}
            </p>
            <Link
              href={PROPERTY_FEATURES[activeFeature].link}
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors group"
            >
              {PROPERTY_FEATURES[activeFeature].linkLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </Modal>

      {/* ═══ PROPERTY IMAGES ═══ */}
      <section className="py-0">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { image: '/images/website/24-parks-gardens-food-forests.png', label: 'Parks & Food Forests' },
            { image: '/images/website/42-ecological-preservation.png', label: 'Ecological Preservation' },
            { image: '/images/website/44-biodiversity-regeneration.png', label: 'Biodiversity' },
            { image: '/images/website/49-reforestation.png', label: 'Reforestation' },
          ].map((item) => (
            <Link key={item.label} href="/story/regeneration" className="relative aspect-square overflow-hidden group block">
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-accent text-sm font-semibold text-white">
                  {item.label}
                </span>
                <ArrowRight className="w-4 h-4 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
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
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-6">
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
                    <div className="font-display text-2xl md:text-3xl font-bold text-primary-800 mb-1">
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
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
                Conservation-Forward Design
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Less than 5% of the land is developed. The remaining 90%+ is preserved as conservation land, food forests, wildlife corridors, and community open space.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {MASTER_PLAN.map((zone, index) => (
              <FadeIn key={zone.label}>
                <button
                  onClick={() => setActiveMasterPlan(index)}
                  className="card p-8 h-full text-left hover:border-primary-300 hover:shadow-md transition-all duration-300 cursor-pointer w-full group"
                >
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
                  <span className="inline-flex items-center gap-1 mt-4 text-xs font-accent font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View breakdown <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              </FadeIn>
            ))}
          </div>

          {/* Master Plan Modal */}
          <Modal
            open={activeMasterPlan !== null}
            onClose={() => setActiveMasterPlan(null)}
            title={activeMasterPlan !== null ? `${MASTER_PLAN[activeMasterPlan].percentage} — ${MASTER_PLAN[activeMasterPlan].label}` : ''}
          >
            {activeMasterPlan !== null && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display text-3xl font-bold text-primary-800">
                    {MASTER_PLAN[activeMasterPlan].acres}
                  </span>
                  <span className="text-sm text-neutral-500">of 376 total acres</span>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  {MASTER_PLAN[activeMasterPlan].detail}
                </p>
                <Link
                  href={MASTER_PLAN[activeMasterPlan].link}
                  className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors group"
                >
                  {MASTER_PLAN[activeMasterPlan].linkLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </Modal>

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
                    <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                      The Lost Pines ecoregion is home to the endangered Houston toad. Abundancia&apos;s conservation-forward design not only protects existing habitat — it actively enhances it through native planting, water feature management, and corridor connectivity. This aligns with the Lost Pines Habitat Conservation Plan (LPHCP), potentially qualifying for conservation easement tax benefits.
                    </p>
                    <Link
                      href="/data-room/view/property/environmental-compliance"
                      className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors group"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
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
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-6">
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

                <button
                  onClick={() => setMudModalOpen(true)}
                  className="card p-5 border-l-4 border-l-secondary-500 w-full text-left hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-accent text-sm font-semibold text-neutral-900 mb-1">
                        MUD Bond Financing
                      </h4>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        Municipal Utility District bonds can reimburse infrastructure costs with tax-free municipal bonds — dramatically improving project economics and reducing capital requirements.
                      </p>
                      <span className="inline-flex items-center gap-1 mt-2 text-xs font-accent font-semibold text-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Learn more <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* MUD Bond Modal */}
      <Modal
        open={mudModalOpen}
        onClose={() => setMudModalOpen(false)}
        title="MUD Bond Financing"
      >
        <div>
          <p className="text-sm text-neutral-600 leading-relaxed mb-4">
            A Municipal Utility District (MUD) is a special-purpose political subdivision of the State of Texas that provides water, sewage, drainage, and other utility services within its boundaries. MUDs are authorized under Article XVI, Section 59 of the Texas Constitution and Chapter 54 of the Texas Water Code.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed mb-4">
            For Abundancia, a MUD allows the project to issue tax-free municipal bonds to finance infrastructure construction — roads, water distribution, wastewater treatment, drainage systems, and utility lines. Once the infrastructure is built and the bonds are issued, the MUD levies a property tax on residents within the district to service the debt. The developer is then reimbursed for infrastructure costs from bond proceeds.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed mb-6">
            This mechanism converts upfront capital expenditure into long-term, tax-supported municipal debt — dramatically improving project IRR, reducing the equity requirement, and aligning infrastructure costs with the timeline of home sales and resident occupancy. MUDs are a proven, widely-used structure in Texas real estate development, with hundreds of active districts across the state.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {['Tax-Free Bonds', 'Infrastructure Reimbursement', 'Texas Water Code Ch. 54', 'Improved IRR', 'Reduced Equity Need', 'Proven Structure'].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-accent font-semibold bg-secondary-50 text-secondary-700 border border-secondary-100"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href="/data-room/view/legal/mud-bond-framework"
            className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors group"
          >
            View MUD Bond Framework
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Modal>

      {/* ═══ CTA ═══ */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <Image
          src="/images/website/52-efficient-site-design.png"
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
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-white mb-6 max-w-3xl mx-auto">
              See What We&apos;re Building
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Explore the homes, community spaces, and regenerative infrastructure that make Abundancia more than a development — it&apos;s a complete ecosystem.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/story/community" className="btn-primary-light btn-lg rounded-2xl text-base group">
                Explore the Community
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/story/regeneration" className="btn-secondary-light btn-lg rounded-2xl text-base">
                Regenerative Systems
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
