'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import {
  ArrowRight, TrendingUp, Users, Home,
  Building2, Heart, BarChart3
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const TAM_SAM_SOM = [
  {
    tier: 'TAM',
    label: 'Total Addressable Market',
    value: '$1.54T',
    description: 'Global wellness real estate market — the intersection of real estate and the wellness economy.',
    width: '100%',
  },
  {
    tier: 'SAM',
    label: 'Serviceable Addressable Market',
    value: '$154B-$302B',
    description: 'US sustainable real estate and wellness residential developments in major metro areas.',
    width: '55%',
  },
  {
    tier: 'SOM',
    label: 'Serviceable Obtainable Market',
    value: '$3B-$7B',
    description: 'Austin-area wellness, sustainable, and intentional communities. Our direct competitive landscape.',
    width: '25%',
  },
]

const AUSTIN_DYNAMICS = [
  { icon: Users, stat: '2.4M+', label: 'MSA Population', detail: '50-60K new residents per year' },
  { icon: TrendingUp, stat: '$86K', label: 'Median Income', detail: 'High-income professional migration' },
  { icon: Home, stat: '$435K+', label: 'Median Home Price', detail: 'Pricing families out of the core' },
  { icon: Building2, stat: 'Tesla', label: '+ Apple, Google, Oracle', detail: 'Tech corridor job engine' },
]

const DEMAND_SIGNALS = [
  {
    stat: '68%',
    description: 'of homebuyers will pay more for sustainable features — and this premium is growing year over year.',
  },
  {
    stat: '75%',
    description: 'of millennials prioritize sustainability in purchasing decisions. They are now the largest homebuying demographic.',
  },
  {
    stat: 'Sold Out',
    description: 'Whisper Valley — Austin\'s first zero-energy community — sold through multiple phases, proving deep market demand.',
  },
  {
    stat: 'Remote',
    description: 'Remote work has permanently expanded the viable commute radius. Cedar Creek\'s 30-minute distance is now mainstream.',
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
  },
  {
    name: 'Colony Park',
    type: 'Sustainable Development',
    location: 'NE Austin (City-Led)',
    units: '~2,000',
    priceRange: '$250K-$400K',
    differentiator: 'City project — slow timeline. No hempcrete, no food systems, no wellness.',
  },
  {
    name: 'Cosmos Ranch',
    type: 'Intentional Community',
    location: 'Bastrop',
    units: '~50',
    priceRange: '$400K-$800K',
    differentiator: 'Small scale. No commercial amenities, no retreat center, limited infrastructure.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function MarketPage() {
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
                <div className="card p-6">
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
                </div>
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
                Austin&apos;s population has doubled in two decades. The city adds 50-60,000 new residents annually — high-income professionals, tech workers, and entrepreneurs drawn by jobs, culture, and quality of life.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {AUSTIN_DYNAMICS.map((item) => (
              <StaggerItem key={item.label}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
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
                </div>
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
                  Every trend points in the same direction — consumers want sustainable, wellness-oriented homes. Remote work has expanded the viable geography. And Austin&apos;s sustainability culture has already proven premium pricing for eco-conscious developments.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {DEMAND_SIGNALS.map((signal) => (
                  <div key={signal.stat} className="card p-5">
                    <div className="font-display text-3xl font-bold text-primary-800 mb-2">
                      {signal.stat}
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {signal.description}
                    </p>
                  </div>
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
                    <tr key={comp.name} className="border-b border-neutral-100">
                      <td className="font-accent text-sm font-semibold text-neutral-900 py-4 px-3">{comp.name}</td>
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
                    <td className="text-sm text-primary-700 py-4 px-3">Cedar Creek</td>
                    <td className="text-sm text-primary-700 py-4 px-3">420+</td>
                    <td className="text-sm text-primary-700 py-4 px-3">$200K-$625K</td>
                    <td className="text-sm font-semibold text-primary-800 py-4 px-3">Full ecosystem — first of its kind</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
                  alt="Wellness tourism — spa and retreat experiences"
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
                  Global wellness tourism is growing at 12%+ CAGR — one of the fastest-growing travel segments. Austin is emerging as a wellness destination, and Abundancia&apos;s retreat center positions it to capture this demand from day one.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="card p-4 text-center">
                    <div className="font-display text-2xl font-bold text-primary-800">$978B</div>
                    <p className="text-xs text-neutral-500 mt-1">Global Market Size</p>
                  </div>
                  <div className="card p-4 text-center">
                    <div className="font-display text-2xl font-bold text-primary-800">12%+</div>
                    <p className="text-xs text-neutral-500 mt-1">Annual Growth Rate</p>
                  </div>
                  <div className="card p-4 text-center">
                    <div className="font-display text-2xl font-bold text-primary-800">3.4x</div>
                    <p className="text-xs text-neutral-500 mt-1">Wellness vs. Regular Travel Spend</p>
                  </div>
                  <div className="card p-4 text-center">
                    <div className="font-display text-2xl font-bold text-primary-800">Austin</div>
                    <p className="text-xs text-neutral-500 mt-1">Emerging Wellness Hub</p>
                  </div>
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
              The market demand is clear. Now explore the financial model — revenue streams, unit economics, and projected returns that make Abundancia a compelling investment.
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
