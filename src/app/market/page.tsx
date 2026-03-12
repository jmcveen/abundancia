'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { Modal } from '@/components/ui/Modal'
import {
  ArrowRight, TrendingUp, Users, Home,
  Building2, Heart, BarChart3, ExternalLink
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const TAM_SAM_SOM = [
  {
    tier: 'TAM',
    label: 'Total Addressable Market',
    value: '$1.54T',
    description: 'Global wellness real estate market - the intersection of real estate and the wellness economy.',
    width: '100%',
    detail: 'The Global Wellness Institute values the wellness real estate sector at $1.54 trillion as of 2023, growing at 16.1% CAGR. This encompasses properties that intentionally incorporate elements of health and well-being into their design, materials, services, and programming. Key growth segments include residential wellness communities (+18% CAGR), wellness hospitality (+14% CAGR), and workplace wellness environments (+12% CAGR). By 2028, the market is projected to exceed $2.7 trillion.',
  },
  {
    tier: 'SAM',
    label: 'Serviceable Addressable Market',
    value: '$154B-$302B',
    description: 'US sustainable real estate and wellness residential developments in major metro areas.',
    width: '55%',
    detail: 'The US represents approximately 10-20% of the global wellness real estate market. This SAM includes sustainable residential developments, green-certified communities, and wellness-oriented master-planned developments in the top 25 US metro areas. Key drivers: ESG-mandated institutional capital ($8.4T AUM), federal IRA tax credits for renewable energy, and state-level green building incentives. Austin ranks #3 among US metros for wellness real estate demand growth.',
  },
  {
    tier: 'SOM',
    label: 'Serviceable Obtainable Market',
    value: '$3B-$7B',
    description: 'Austin-area wellness, sustainable, and intentional communities. Our direct competitive landscape.',
    width: '25%',
    detail: 'The Austin-San Antonio corridor represents one of the fastest-growing real estate markets in the US. Within this corridor, the addressable market for wellness, sustainable, and intentional community developments is estimated at $3-7 billion. This includes Whisper Valley ($2B+ total development value), Colony Park ($500M+), and emerging projects in the greater Austin area. Abundancia targets initial capture of $429M (base case 10-year revenue) - approximately 6-15% of the SOM.',
  },
]

const AUSTIN_DYNAMICS = [
  {
    icon: Users,
    stat: '2.4M+',
    label: 'MSA Population',
    detail: '50-60K new residents per year',
    modalDetail: 'The Austin-Round Rock-Georgetown MSA has grown from 1.2 million in 2005 to over 2.4 million today - a doubling in under two decades. Net migration averages 50,000-60,000 new residents annually, with the majority being high-income professionals (median income $86K vs. national $75K). Top source markets: California (28%), New York/New Jersey (12%), Chicago (8%). The MSA is projected to reach 3 million by 2030. Key employers driving growth: Tesla (Gigafactory, 20,000+ jobs), Apple ($1B campus, 15,000 jobs), Google, Oracle, Samsung, and a rapidly expanding startup ecosystem.',
  },
  {
    icon: TrendingUp,
    stat: '$86K',
    label: 'Median Income',
    detail: 'High-income professional migration',
    modalDetail: 'Austin household median income of $86K significantly exceeds both state ($67K) and national ($75K) medians. The tech sector drives this premium - Austin tech workers earn a median $115K. Remote work has accelerated high-income migration from coastal cities, with transplants from SF/LA earning 15-25% more than the Austin median. This income profile supports premium pricing for wellness and sustainability features, with studies showing Austin buyers are willing to pay 8-12% premiums for green-certified homes.',
  },
  {
    icon: Home,
    stat: '$435K+',
    label: 'Median Home Price',
    detail: 'Pricing families out of the core',
    modalDetail: 'Austin median home prices have risen from $210K in 2015 to $435K+ in 2025 - a 107% increase in a decade. Core Austin (78701-78704 zip codes) now averages $650K+, pushing buyers toward suburban and exurban communities. Bastrop County, at $300-400K median, represent a strong value proposition. This pricing dynamic is exactly what drives demand for master-planned communities on Austin\'s periphery. The 30-minute commute radius has expanded significantly with remote/hybrid work adoption (62% of Austin tech workers).',
  },
  {
    icon: Building2,
    stat: 'Tesla',
    label: '+ Apple, Google, Oracle',
    detail: 'Tech corridor job engine',
    modalDetail: 'Austin\'s tech corridor stretches from downtown to the eastern suburbs, anchored by Tesla\'s Gigafactory (5 million SF, 20,000+ employees), Apple\'s $1B campus in North Austin (15,000 employees), Google\'s downtown tower (5,000+), Oracle\'s relocated HQ (10,000+), and Samsung\'s $17B fab plant in Taylor. This corporate migration has created a self-reinforcing talent loop - companies follow talent, talent follows companies. Abundancia sits along the corridor connecting Austin to this eastern tech hub, making it an ideal commuter location for Gigafactory and Samsung workers.',
  },
]

const DEMAND_SIGNALS = [
  {
    stat: '68%',
    description: 'of homebuyers will pay more for sustainable features - and this premium is growing year over year.',
    modalDetail: 'Source: National Association of Realtors (NAR) 2024 Sustainability Report. The 68% figure represents buyers willing to pay an average 5-10% premium for sustainable features. In Austin specifically, Whisper Valley\'s zero-energy homes sell at a 12-15% premium to comparable conventional homes, with faster absorption rates (2.3x the metro average). Additional data: 73% of millennials and 62% of Gen-X buyers cite sustainability as a "very important" factor. Abundancia\'s hempcrete construction, solar arrays, and regenerative food systems go significantly beyond what any comparable project offers.',
  },
  {
    stat: '75%',
    description: 'of millennials prioritize sustainability in purchasing decisions. They are now the largest homebuying demographic.',
    modalDetail: 'Source: Deloitte Global 2024 Gen Z and Millennial Survey + NAR Generational Trends Report. Millennials (born 1981-1996) became the largest homebuying cohort in 2022 at 43% of all buyers, and now represent 38% of Austin\'s population. Their sustainability preferences are not aspirational - they are transactional. 75% report actively prioritizing sustainability in major purchases, and 64% have paid more for sustainable products in the past year. This demographic alignment is a structural tailwind for Abundancia: our target buyer profile (30-45, household income $100K+, values-driven) represents approximately 180,000 households in the Austin MSA.',
  },
  {
    stat: 'Sold Out',
    description: 'Whisper Valley - Austin\'s first zero-energy community - sold through multiple phases, proving deep market demand.',
    modalDetail: 'Whisper Valley, developed by Taurus Investment Holdings and located in East Austin, is the most relevant comparable for Abundancia. Key proof points: Phase 1 (200 homes) sold out 40% faster than projected. Phase 2 expanded to 600 homes with strong absorption. Total planned: 7,500+ homes across the full master plan. Pricing: $300-500K with 12-15% premiums over conventional. Their offering is energy-only (geothermal + solar) - no regenerative agriculture, no hempcrete, no community governance, no wellness programming. Abundancia offers a significantly more comprehensive product at a wider price range ($200K-$625K), suggesting we can capture premium buyers that Whisper Valley cannot reach.',
  },
  {
    stat: 'Remote',
    description: 'Remote work has permanently expanded the viable commute radius. A 30-minute distance from Austin is now mainstream.',
    modalDetail: 'Stanford\'s WFH Research (Nick Bloom, 2024) shows remote/hybrid work has stabilized at 28% of US workdays - down from the pandemic peak but 4x pre-pandemic levels. In Austin\'s tech sector specifically, 62% of workers are hybrid or fully remote. This has fundamentally expanded the acceptable "commute radius" from 20 minutes to 45+ minutes, making a 30-minute distance to downtown Austin not just viable but attractive. Comparable communities in the 25-35 minute range (Dripping Springs, Bee Cave, Lago Vista) have seen 35-50% price appreciation since 2020, validating this structural shift.',
  },
]

const COMPARABLES = [
  {
    name: 'Whisper Valley',
    type: 'Zero-Energy Community',
    location: 'East Austin',
    units: '7,500+',
    priceRange: '$300K-$500K',
    differentiator: 'Energy only. No regenerative systems, food, or community governance.',
    modalDetail: 'Whisper Valley is Austin\'s most successful sustainable community and Abundancia\'s closest comparable. Developed by Taurus Investment Holdings, it features geothermal heating/cooling and rooftop solar as standard. What they have: zero-energy homes, Google Fiber, organic community garden. What they lack: hempcrete or natural building materials (standard frame construction), food sovereignty systems, regenerative agriculture, wellness/retreat programming, community governance, commercial village center, workforce housing options. Their price floor of $300K excludes entry-level buyers. Abundancia\'s tiny homes and domes starting at $200K capture a segment Whisper Valley cannot serve, while our single-family homes at $625K capture the premium segment with superior sustainability features.',
    features: {
      has: ['Zero-energy homes', 'Geothermal HVAC', 'Solar standard', 'Google Fiber', 'Community garden'],
      lacks: ['Hempcrete construction', 'Food sovereignty', 'Retreat center', 'Community governance', 'Workforce housing', 'Commercial village', 'Wellness programming'],
    },
  },
  {
    name: 'Colony Park',
    type: 'Sustainable Development',
    location: 'NE Austin (City-Led)',
    units: '~2,000',
    priceRange: '$250K-$400K',
    differentiator: 'City project - slow timeline. No hempcrete, no food systems, no wellness.',
    modalDetail: 'Colony Park is a City of Austin-led sustainable master-planned community on 208 acres in Northeast Austin. It has been in planning since 2014 with construction beginning in 2023 - a nearly decade-long development timeline that illustrates the challenges of government-led development. What they have: affordable housing mandates, transit-oriented design, mixed-use zoning, LEED neighborhood certification. What they lack: natural building materials, food production systems, wellness amenities, retreat/hospitality revenue, community governance, renewable energy independence. Colony Park is constrained by city bureaucracy and political cycles. Abundancia, as a private development, can move at market speed while still prioritizing affordability and sustainability.',
    features: {
      has: ['Affordable housing mandates', 'Transit-oriented design', 'Mixed-use zoning', 'LEED certification', 'City backing'],
      lacks: ['Natural building materials', 'Food production', 'Wellness amenities', 'Retreat center', 'Energy independence', 'Private governance'],
    },
  },
  {
    name: 'Cosmos Ranch',
    type: 'Intentional Community',
    location: 'Bastrop County',
    units: '~50',
    priceRange: '$400K-$800K',
    differentiator: 'Small scale. No commercial amenities, no retreat center, limited infrastructure.',
    modalDetail: 'Cosmos Ranch is a small-scale intentional community approximately 40 minutes from Austin. It represents the "intentional community" end of the spectrum. What they have: strong community ethos, natural setting, shared values governance, organic gardens. What they lack: scale for commercial viability, professional management infrastructure, hospitality/retreat revenue, hempcrete construction, renewable energy grid, food sovereignty at community scale, affordable entry-level housing. At ~50 units and $400K-$800K pricing, Cosmos Ranch serves a niche audience. Abundancia operates at 8x the scale (665 structures) with a full commercial ecosystem, enabling amenities and infrastructure that small intentional communities cannot support.',
    features: {
      has: ['Community governance', 'Natural setting', 'Shared values', 'Organic gardens', 'Strong community bonds'],
      lacks: ['Commercial scale', 'Professional management', 'Retreat/hospitality', 'Hempcrete construction', 'Energy grid', 'Affordable housing', 'Food sovereignty at scale'],
    },
  },
]

const WELLNESS_TOURISM_STATS = [
  {
    stat: '$978B',
    label: 'Global Market Size',
    modalDetail: 'The Global Wellness Institute estimates the wellness tourism market at $978 billion (2023), making it one of the fastest-growing travel segments globally. This includes wellness-motivated travel (primary purpose) and wellness-incidental travel (wellness activities as part of a broader trip). The US represents approximately $293B of this market - the largest single country. Key subsectors: spa tourism ($128B), wellness resorts ($89B), thermal/mineral springs ($72B), and wellness retreats ($56B). Abundancia\'s retreat center targets the wellness retreat and spa tourism segments.',
  },
  {
    stat: '12%+',
    label: 'Annual Growth Rate',
    modalDetail: 'Wellness tourism is growing at 12.1% CAGR (2020-2028 projected), compared to 6.8% for overall tourism. Post-pandemic acceleration has been driven by increased health consciousness, remote work enabling "workation" travel, and a fundamental shift toward experiential over material spending among millennials and Gen-Z. In the US specifically, wellness travel grew 21% in 2023 vs. 2022. The Austin market is outperforming national trends - wellness-oriented Airbnb listings in the Austin area grew 34% YoY with average nightly rates 2.8x standard listings.',
  },
  {
    stat: '3.4x',
    label: 'Wellness vs. Regular Travel Spend',
    modalDetail: 'Wellness tourists spend an average of $1,601 per trip domestically vs. $465 for the average domestic tourist - a 3.4x premium. International wellness tourists spend $2,363 vs. $735. This spending premium flows through the entire local economy: restaurants, retail, experiences, and transportation. For Abundancia, this means the retreat and rental operations drive awareness, home sales, and commercial tenant demand while generating $5.5M annually by year 5. Retreat guests become potential residents and brand ambassadors.',
  },
  {
    stat: 'Austin',
    label: 'Emerging Wellness Hub',
    modalDetail: 'Austin is rapidly establishing itself as a wellness destination. Key indicators: 45+ yoga studios downtown (3x growth since 2018), 12 major wellness retreat venues within 60 miles, annual Austin Wellness Festival (15,000+ attendees), and a thriving organic/natural foods scene anchored by Whole Foods HQ (founded in Austin). Austin Convention & Visitors Bureau reports "wellness" as the #3 search term for Austin travel planning, behind "live music" and "food." Abundancia\'s proximity to Austin (30 min) positions it as both a destination retreat and an accessible day-trip wellness experience.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

type ModalContent = {
  title: string
  body: string
  link?: { href: string; label: string }
  features?: { has: string[]; lacks: string[] }
} | null

export default function MarketPage() {
  const [modal, setModal] = useState<ModalContent>(null)

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Market Opportunity</span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-neutral-900 mb-6 max-w-4xl">
              A $1.54 Trillion Market Opportunity
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
              Wellness real estate is the fastest-growing segment of the global property market. Austin is the epicenter of sustainable demand. Abundancia sits at the intersection.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ TAM / SAM / SOM ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">
                <BarChart3 className="w-4 h-4 inline mr-2 -mt-0.5" />
                Market Sizing
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                TAM / SAM / SOM
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-6">
            {TAM_SAM_SOM.map((tier, index) => (
              <FadeIn key={tier.tier} delay={index * 0.15}>
                <button
                  onClick={() => setModal({
                    title: `${tier.tier}: ${tier.label}`,
                    body: tier.detail,
                    link: { href: '/data-room/view/research/market-research-report', label: 'View Full Market Research Report' },
                  })}
                  className="card p-6 w-full text-left hover:shadow-lg hover:border-primary-200 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="font-accent text-xs font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                        {tier.tier}
                      </span>
                      <span className="font-accent text-sm text-neutral-500 ml-3">{tier.label}</span>
                    </div>
                    <span className="font-display text-2xl md:text-3xl font-bold text-primary-800">
                      {tier.value}
                    </span>
                  </div>
                  <div className="w-full bg-primary-50 rounded-full h-3 mb-3">
                    <div
                      className="bg-gradient-to-r from-primary-600 to-primary-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: tier.width }}
                    />
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {tier.description}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-3 font-accent text-xs font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click for deeper analysis <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AUSTIN MARKET DYNAMICS ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                Austin Market
              </span>
              <h2 className="font-display text-4xl md:text-5xl mb-6">
                The Fastest-Growing Metro in America
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Austin&apos;s population has doubled in two decades. The city adds 50-60,000 new residents annually - high-income professionals, tech workers, and entrepreneurs drawn by jobs, culture, and quality of life.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {AUSTIN_DYNAMICS.map((item) => (
              <StaggerItem key={item.label}>
                <button
                  onClick={() => setModal({
                    title: `${item.stat} - ${item.label}`,
                    body: item.modalDetail,
                    link: { href: '/data-room/view/research/market-research-report', label: 'View Full Market Research' },
                  })}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center w-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-secondary-400" />
                  </div>
                  <div className="font-display text-3xl font-bold text-white mb-1">
                    {item.stat}
                  </div>
                  <div className="font-accent text-sm font-semibold text-white/80 mb-1">
                    {item.label}
                  </div>
                  <p className="text-xs text-white/50">{item.detail}</p>
                  <span className="inline-flex items-center gap-1 mt-2 font-accent text-xs text-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Deep dive <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ DEMAND SIGNALS ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div>
                <span className="eyebrow mb-3 block">Demand Signals</span>
                <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-6">
                  The Market Is Asking for This
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Every trend points in the same direction - consumers want sustainable, wellness-oriented homes. Remote work has expanded the viable geography. And Austin&apos;s sustainability culture has already proven premium pricing for eco-conscious developments.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {DEMAND_SIGNALS.map((signal) => (
                  <button
                    key={signal.stat}
                    onClick={() => setModal({
                      title: `Demand Signal: ${signal.stat}`,
                      body: signal.modalDetail,
                      link: { href: '/data-room/view/research/competitive-landscape', label: 'View Competitive Landscape Analysis' },
                    })}
                    className="card p-5 text-left hover:shadow-lg hover:border-primary-200 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="font-display text-3xl font-bold text-primary-800 mb-2">
                      {signal.stat}
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {signal.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-2 font-accent text-xs font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      View source <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ COMPARABLE PROJECTS ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Competitive Landscape</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Nothing Like This Exists
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Existing projects address pieces of the puzzle. None combine hempcrete construction, food sovereignty, grid independence, and community governance at this scale.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="font-accent text-sm font-semibold text-neutral-900 text-left py-4 px-3">Project</th>
                    <th className="font-accent text-sm font-semibold text-neutral-900 text-left py-4 px-3">Type</th>
                    <th className="font-accent text-sm font-semibold text-neutral-900 text-left py-4 px-3">Location</th>
                    <th className="font-accent text-sm font-semibold text-neutral-900 text-left py-4 px-3">Units</th>
                    <th className="font-accent text-sm font-semibold text-neutral-900 text-left py-4 px-3">Price Range</th>
                    <th className="font-accent text-sm font-semibold text-neutral-900 text-left py-4 px-3">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARABLES.map((comp) => (
                    <tr
                      key={comp.name}
                      onClick={() => setModal({
                        title: `${comp.name} - Competitive Analysis`,
                        body: comp.modalDetail,
                        link: { href: '/data-room/view/research/competitive-landscape', label: 'View Full Competitive Landscape' },
                        features: comp.features,
                      })}
                      className="border-b border-neutral-100 hover:bg-primary-50/50 cursor-pointer transition-colors group"
                    >
                      <td className="font-accent text-sm font-semibold text-primary-700 py-4 px-3 underline decoration-primary-300 underline-offset-2 group-hover:text-primary-900">
                        {comp.name}
                      </td>
                      <td className="text-sm text-neutral-600 py-4 px-3">{comp.type}</td>
                      <td className="text-sm text-neutral-600 py-4 px-3">{comp.location}</td>
                      <td className="text-sm text-neutral-600 py-4 px-3">{comp.units}</td>
                      <td className="text-sm text-neutral-600 py-4 px-3">{comp.priceRange}</td>
                      <td className="text-sm text-neutral-500 py-4 px-3 italic">{comp.differentiator}</td>
                    </tr>
                  ))}
                  <tr className="bg-primary-50/50">
                    <td className="font-accent text-sm font-bold text-primary-800 py-4 px-3">Abundancia</td>
                    <td className="text-sm font-semibold text-primary-700 py-4 px-3">Regenerative Community</td>
                    <td className="text-sm text-primary-700 py-4 px-3">Greater Austin</td>
                    <td className="text-sm text-primary-700 py-4 px-3">420+</td>
                    <td className="text-sm text-primary-700 py-4 px-3">$200K-$625K</td>
                    <td className="text-sm font-semibold text-primary-800 py-4 px-3">Full ecosystem - first of its kind</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>

          {/* Deep Dive Callout */}
          <FadeIn delay={0.3}>
            <Link
              href="/data-room/view/research/competitive-landscape"
              className="mt-10 flex items-center justify-between p-6 rounded-2xl bg-primary-50 border border-primary-100 hover:border-primary-300 hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <h3 className="font-display text-lg text-primary-900 mb-1">Deep Dive: Competitive Landscape</h3>
                <p className="text-sm text-neutral-600">Read the full 800-line competitive landscape analysis in the Data Room</p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ WELLNESS TOURISM ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/website/41-spa-massage.jpeg"
                  alt="Wellness tourism - spa and retreat experiences"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <span className="eyebrow mb-3 block">
                  <Heart className="w-4 h-4 inline mr-2 -mt-0.5" />
                  Wellness Tourism
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-6">
                  A $978 Billion Industry
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  Global wellness tourism is growing at 12%+ CAGR - one of the fastest-growing travel segments. Austin is emerging as a wellness destination, and Abundancia&apos;s retreat center positions it to capture this demand from day one.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {WELLNESS_TOURISM_STATS.map((item) => (
                    <button
                      key={item.stat}
                      onClick={() => setModal({
                        title: `Wellness Tourism: ${item.label}`,
                        body: item.modalDetail,
                        link: { href: '/data-room/view/research/market-research-report', label: 'View Market Research Report' },
                      })}
                      className="card p-4 text-center hover:shadow-lg hover:border-primary-200 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="font-display text-2xl font-bold text-primary-800">{item.stat}</div>
                      <p className="text-xs text-neutral-500 mt-1">{item.label}</p>
                      <span className="inline-flex items-center gap-1 mt-1 font-accent text-[10px] font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        Details <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-primary-800 py-20 md:py-28">
        <div className="section-container text-center">
          <FadeIn>
            <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-4 block">
              The Numbers
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
              See the Business Model
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              The market demand is clear. Now explore the financial model - revenue streams, unit economics, and projected returns that make Abundancia a compelling investment.
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

      {/* ═══ MODAL ═══ */}
      <Modal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal?.title}
        size="md"
      >
        {modal && (
          <div>
            <p className="text-neutral-600 leading-relaxed mb-6">{modal.body}</p>

            {modal.features && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <h4 className="font-accent text-sm font-semibold text-green-800 mb-2">What They Have</h4>
                  <ul className="space-y-1">
                    {modal.features.has.map((f) => (
                      <li key={f} className="text-sm text-green-700 flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">+</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                  <h4 className="font-accent text-sm font-semibold text-red-800 mb-2">What They Lack</h4>
                  <ul className="space-y-1">
                    {modal.features.lacks.map((f) => (
                      <li key={f} className="text-sm text-red-700 flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">-</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {modal.link && (
              <Link
                href={modal.link.href}
                className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {modal.link.label}
              </Link>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
