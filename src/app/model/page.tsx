'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { Modal } from '@/components/ui/Modal'
import { ScenarioToggle } from '@/components/ui/ScenarioToggle'
import { useScenario } from '@/lib/context/scenario-context'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { ArrowRight, ExternalLink } from 'lucide-react'
import {
  KEY_METRICS,
  UNIT_MIX,
  REVENUE_STREAMS,
  REVENUE_BY_YEAR,
  USE_OF_FUNDS,
  WATERFALL,
} from '@/lib/data/financials'

// ═══════════════════════════════════════════════════════════════════════════
// Extended Data for Modals
// ═══════════════════════════════════════════════════════════════════════════

const REVENUE_STREAM_DETAILS: Record<string, string> = {
  'Residential Sales': 'Residential sales represent 83% of total 10-year revenue at $362M. The product mix spans four tiers: Single-Family Homes ($625K avg, 100 units), Multifamily ($408K avg, 260 units), Domes ($225K avg, 30 units), and Tiny Homes ($200K avg, 30 units). Pricing strategy is based on comparable sales in the Austin exurban market with a 10-15% premium for hempcrete construction, solar-standard, and community amenities. Absorption rates are modeled at 15-20 homes per quarter in the base case, accelerating to 25-30/quarter in years 3-5 as community amenities mature. Phase 1 delivers 15 model homes and 10-15 tiny homes/domes. Phase 2 begins multifamily construction. Full buildout completes by year 8. Risk factors: interest rate sensitivity, Austin market correction, construction cost inflation (mitigated by hempcrete\'s stable material costs).',
  'Rental Income': 'Rental income totals $43.6M over 10 years from 60 dedicated rental units (tiny homes, domes, and multifamily). Average nightly rate: $233 for short-term rentals, $1,800/month for long-term leases. The model assumes 65% occupancy in year 1, growing to 85% by year 3 as the retreat center and community amenities drive demand. Short-term rentals (Airbnb/VRBO) are projected at $200-$350/night depending on season and unit type. Long-term rentals provide stable baseline revenue. This is a recurring revenue stream that continues beyond the 10-year model. Risk factors: short-term rental regulation changes (mitigated by Bastrop County\'s permissive STR policies), occupancy rate assumptions.',
  'Lot Sales': 'Lot sales contribute $15.4M from 200 improved lots sold to qualified builders and individual owners. Average lot price: $350K for 1-2 acre parcels with infrastructure (roads, water, power, fiber). Lot sales serve two strategic purposes: (1) immediate capital recycling — lots can be sold before homes are built, accelerating cash flow; (2) expanding the community without proportional construction capital. Buyers must comply with Abundancia\'s architectural guidelines and sustainability standards. This ensures hempcrete or natural building methods, renewable energy, and design harmony. Timing: lot sales begin in year 2, with 30-40 lots/year through year 7.',
  'Commercial Leasing': 'Commercial leasing generates $7.8M over 10 years from the village center — a mixed-use commercial district within the community. Planned tenants: organic grocery/market, farm-to-table restaurant(s), wellness retail, coworking space, childcare center, and professional services. Lease rates are modeled at $18-$28/SF NNN, below Austin metro averages ($32-$45/SF) to attract quality tenants to a new community. Revenue ramps from year 3 as commercial spaces are built and the residential population reaches critical mass (100+ households). The village center is designed to be a destination — not just for residents but for the broader Cedar Creek/Bastrop community.',
  'Retreat Center': 'The retreat center generates $6.3M over 10 years, but its strategic value far exceeds its direct revenue contribution. Operations begin in Phase 1 using the existing farmhouse and guest house on the 376-acre property, with 10-15 tiny homes/domes added for capacity. Offerings: weekend wellness retreats ($800-$2,500/person), corporate team retreats ($5,000-$15,000/group), yoga teacher trainings, plant medicine ceremonies (legal modalities), and day-pass wellness experiences. Average revenue per guest night: $233. The retreat center serves as the community\'s front door — introducing potential homebuyers, generating media attention, building the Abundancia brand, and driving commercial tenant demand. Year 1 revenue target: $500K-$1M.',
}

const UNIT_DETAILS: Record<string, string> = {
  'Single-Family Homes': 'Target buyer: established families and professionals (35-55, HHI $150K+) seeking a primary residence in a regenerative community. Average price $625K for 1,900 SF of hempcrete construction on 1-2 acre lots. Construction timeline: 6-8 months per home using hempcrete panels (faster than traditional hemp-lime). Gross margin: 35-42% due to hempcrete\'s lower material costs vs. conventional framing ($85/SF vs. $110/SF build cost). Hempcrete homes offer R-30+ insulation, fire resistance, carbon-negative material footprint, and superior indoor air quality — premium features that command premium pricing.',
  'Tiny Homes': 'Target buyer: young professionals, remote workers, retirees, and sustainability enthusiasts (25-40 or 55+, HHI $60K+) seeking affordable entry into the community. Average price $200K for 600 SF — the most accessible price point in the Abundancia product mix. Construction timeline: 3-4 months. Gross margin: 40-48% at this price point. Tiny homes are clustered in "neighborhoods" with shared outdoor spaces, community gardens, and common facilities. They serve a dual purpose: providing workforce/affordable housing and generating early revenue in Phase 1 before larger homes are complete.',
  'Domes': 'Target buyer: architecturally adventurous buyers, retreat guests who become residents, and second-home owners (30-50, HHI $80K+). Average price $225K for 600 SF geodesic dome structures with hempcrete walls. Construction timeline: 4-5 months. Gross margin: 38-45%. Domes are a signature architectural element of Abundancia — visually distinctive, structurally superior (withstand 150+ mph winds), and highly energy efficient. They generate significant social media and press attention, serving as both homes and marketing assets. Several domes are designated for short-term rental, generating $200-$350/night.',
  'Multifamily': 'Target buyer: young families, couples, and individuals (28-45, HHI $80K-$120K) seeking community-oriented living at attainable price points. Average price $408K for 1,100 SF units in 4-8 unit buildings. Construction timeline: 10-14 months per building. Gross margin: 30-38%. Multifamily represents the highest unit count (260 of 420+ total units) and the bulk of residential revenue. Buildings feature shared amenities (rooftop gardens, communal kitchens, play areas), hempcrete construction throughout, and solar-standard energy. This product type enables density that supports commercial viability while maintaining the regenerative ethos.',
  'Lots': 'Target buyer: custom home builders and individuals who want to design their own hempcrete home within the community framework. Average price $350K for 1-2 acre improved lots with all infrastructure (roads, water/septic, electricity, solar hookup, fiber internet). Buyers must comply with Abundancia architectural guidelines requiring hempcrete or approved natural building methods, renewable energy, and native landscaping. Lot sales are capital-efficient — no construction required — and generate revenue 12-18 months before a home is completed on the lot, improving cash flow timing.',
  'Rental Units': 'Rental units (60 total) are a mix of tiny homes, domes, and multifamily units held by the LLC for recurring income. Average nightly rate $233 for short-term rentals. Long-term leases average $1,800/month. Target guests: wellness retreat attendees, Airbnb travelers seeking unique stays, corporate retreat groups, and long-term renters who want to "try before they buy." Occupancy modeled at 65% year 1, 75% year 2, 85% year 3+. Rental units provide stable recurring revenue and serve as the community\'s "hotel" — ensuring there is always availability for guests, media visits, and potential buyer stays.',
}

const USE_OF_FUNDS_DETAILS: Record<string, string> = {
  'Land Acquisition': 'The land acquisition budget of $4.0M covers the purchase of 376 acres in Cedar Creek, Texas — approximately 30 minutes southeast of downtown Austin along SH-71. The $6.5M total price is negotiated with $4.0M from the capital raise and the remainder structured as seller financing. Due diligence costs include: Phase I and Phase II environmental assessment ($25K), ALTA survey ($15K), hydrology study and water resource assessment ($35K), Houston toad habitat compliance study ($20K), geotechnical borings ($18K), and legal/closing costs ($50K). The property includes an existing farmhouse, guest house, and outbuildings that will be repurposed for Phase 1 retreat operations.',
  'Hard Costs': 'Hard costs of $1.75M cover Phase 1 construction: 15 hempcrete model homes and 10-15 tiny homes/domes. Hempcrete construction costs are approximately $85/SF for materials and $45/SF for labor — totaling $130/SF vs. $150-$180/SF for conventional construction in the Austin market. This cost advantage is a key margin driver. The $1.75M includes: hempcrete panel fabrication setup ($200K), model home construction ($1.1M for 15 units), tiny home/dome construction ($350K for 10-15 units), and material procurement for Phase 2 pre-orders ($100K). Construction financing for subsequent phases is self-funded from sales revenue.',
  'Site Work': 'Site work of $1.75M covers the foundational infrastructure that enables Phase 1 and sets up Phase 2: internal road network (2.5 miles of primary roads, $600K), water well drilling and distribution ($250K for 3 wells), septic systems ($200K), electrical grid connection and solar array installation ($350K for 500kW initial array), fiber optic backbone ($150K), and grading/drainage ($200K). The MUD (Municipal Utility District) petition, once approved, enables bond financing for future infrastructure — meaning this initial $1.75M investment unlocks significantly larger infrastructure capacity without additional equity capital.',
  'Master Planning': 'Master planning of $1.375M covers the comprehensive design and permitting work: master site plan by Symbiosis TX ($400K), permaculture design and food forest layout ($150K), architectural design for all housing types ($300K), MEP engineering ($125K), landscape architecture ($100K), MUD petition and entitlement legal work ($200K), and municipal permitting ($100K). This investment produces the IP — the replicable design templates that are part of Abundancia\'s long-term value as a model for regenerative communities worldwide.',
  'Staffing & Operations': 'Staffing and operations of $750K funds the team for the first 18 months: Project Director ($120K/yr), Construction Manager ($95K/yr), Sales & Marketing Director ($85K/yr), Retreat Center Manager ($70K/yr), Community Director ($65K/yr), and administrative support ($45K/yr). Additionally, $100K is allocated for retreat center startup operations (furnishing, supplies, initial programming), and $50K for insurance, accounting, and legal. The team is lean by design — Abundancia leverages local contractors and the partner ecosystem (Symbiosis TX, hempcrete suppliers) rather than building a large in-house construction team.',
  'Marketing': 'Marketing of $625K covers pre-sales, brand building, and community launch: website and digital platform ($75K), brand identity and collateral ($50K), pre-sales campaign and sales center ($100K), social media and content marketing ($120K/yr), PR and media outreach ($80K), events and open houses ($50K), and real estate agent partnerships ($50K). The retreat center provides organic marketing — every guest is a potential buyer or referral source. Social media content from the community (regenerative farming, hempcrete building, wellness programming) drives earned media that supplements paid marketing.',
  'Contingency': 'The $2.25M contingency reserve (18% of total raise) provides a substantial buffer against cost overruns, market shifts, and timeline delays. Industry standard for development projects is 10-15% contingency; Abundancia\'s 18% reflects conservative underwriting. Potential uses: construction cost inflation (hempcrete supply chain is nascent), extended permitting timelines, interest rate increases affecting buyer demand, unexpected environmental remediation, or additional infrastructure costs. If contingency is not used, it converts to additional construction capital in Phase 2, accelerating the buildout timeline.',
}

const WATERFALL_DETAILS: Record<string, string> = {
  'Return of Capital': 'Before any profits are split, investors receive 100% of distributions until their original $12.5M capital contribution is fully returned. This is the first priority in the waterfall — ensuring that investor principal is protected before the GP (managing partner) receives any profit participation. In the base case model, return of capital is projected to begin in year 2 and complete by year 4-5. During this phase, all available cash flow (after operating expenses and reserves) goes directly to investors. This is standard LP-favorable structuring for real estate private equity.',
  'Preferred Return': 'After capital is returned, investors receive an 8% annual preferred return on their contributed capital. This means investors earn 8% per year on their investment before the GP participates in profits. The preferred return is cumulative — if the project underperforms in any year and cannot pay the full 8%, the shortfall carries forward and must be paid before any GP profit share. At the 8% preferred level, the split is 80% to investors (LP) and 20% to the GP. This structure aligns incentives: the GP only profits meaningfully when investors have received their capital back plus a healthy annual return.',
  'Tier 2': 'Once investors have received their capital back and the 8% preferred return, profits from the 1.5x to 2.0x equity multiple range are split 70% LP / 30% GP. At a 1.5x multiple, investors have received $18.75M on a $12.5M investment (a 50% total return above their capital). At 2.0x, investors have received $25M. In this tier, the GP begins to participate more meaningfully in the upside. The base case projects a 4.42x equity multiple, meaning this tier is reached relatively early in the distribution timeline.',
  'Tier 3': 'Profits in the 2.0x to 3.0x equity multiple range are split 60% LP / 40% GP. At the 2.0x level, investors have doubled their money ($25M on $12.5M invested). At 3.0x, investors have tripled their money ($37.5M). The increasing GP share at higher multiples rewards the management team for outperformance while still ensuring the majority of profits flow to investors. In the base case (4.42x), this entire tier is distributed, with substantial profits flowing in years 5-8.',
  'Tier 4': 'Above the 3.0x equity multiple, profits are split 50/50 between LP and GP. At 3.0x+, investors have already received $37.5M+ on a $12.5M investment — a 200%+ return above their capital. The 50/50 split at this level provides strong incentive for the GP to maximize long-term value creation. In the base case (4.42x), approximately $17.75M of distributions fall in this tier. The optimistic case (5.5x) generates even more at this level. This is where the project\'s true upside is realized — and investors still receive 50 cents of every dollar.',
}

// ═══════════════════════════════════════════════════════════════════════════
// Components
// ═══════════════════════════════════════════════════════════════════════════

function MetricCard({ target, prefix, suffix, label, decimals = 0 }: {
  target: number
  prefix?: string
  suffix?: string
  label: string
  decimals?: number
}) {
  const { count, ref } = useAnimatedCounter({ target, decimals })

  return (
    <div ref={ref} className="card p-4 sm:p-6 text-center">
      <div className="font-display text-lg sm:text-2xl md:text-3xl font-bold text-primary-800 mb-1">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="font-accent text-sm text-neutral-600">{label}</div>
    </div>
  )
}

function RevenueBar({ name, value, maxValue, color, onClick }: {
  name: string
  value: number
  maxValue: number
  color: string
  onClick: () => void
}) {
  const percentage = (value / maxValue) * 100
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 w-full hover:bg-primary-50/50 rounded-lg px-2 py-1 -mx-2 transition-colors cursor-pointer group"
    >
      <div className="w-40 flex-shrink-0 text-left">
        <span className="font-accent text-sm text-neutral-700 group-hover:text-primary-800 underline decoration-neutral-300 underline-offset-2 group-hover:decoration-primary-400 transition-colors">{name}</span>
      </div>
      <div className="flex-1 bg-neutral-100 rounded-full h-6 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        >
          {percentage > 15 && (
            <span className="font-accent text-xs font-semibold text-white">
              ${(value / 1_000_000).toFixed(1)}M
            </span>
          )}
        </div>
      </div>
      {percentage <= 15 && (
        <span className="font-accent text-xs text-neutral-500">
          ${(value / 1_000_000).toFixed(1)}M
        </span>
      )}
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

type ModalContent = {
  title: string
  body: string
  link?: { href: string; label: string }
} | null

export default function ModelPage() {
  const { scenario } = useScenario()
  const [modal, setModal] = useState<ModalContent>(null)
  const metrics = KEY_METRICS[scenario]
  const streams = REVENUE_STREAMS[scenario]
  const yearData = REVENUE_BY_YEAR[scenario]
  const maxRevenue = Math.max(...yearData.map((d) => d.revenue))

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Business Model</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-6xl text-neutral-900 mb-6 max-w-4xl">
              Regenerative Is Profitable
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed mb-8">
              $12.5M capital raise targeting {metrics.irr}% IRR with a {metrics.emx}x equity multiple over a 10-year hold. Five diversified revenue streams. Conservation-forward design that improves — not compromises — returns.
            </p>
            <ScenarioToggle />
          </FadeIn>
        </div>
      </section>

      {/* ═══ KEY METRICS ═══ */}
      <section className="py-12 md:py-16 bg-canvas">
        <div className="section-container">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StaggerItem>
              <MetricCard target={metrics.irr} suffix="%" label="Projected IRR" decimals={1} />
            </StaggerItem>
            <StaggerItem>
              <MetricCard target={metrics.emx} suffix="x" label="Equity Multiple" decimals={2} />
            </StaggerItem>
            <StaggerItem>
              <MetricCard target={metrics.revenue10yr / 1_000_000} prefix="$" suffix="M" label="10-Year Revenue" />
            </StaggerItem>
            <StaggerItem>
              <MetricCard target={metrics.ebitda10yr / 1_000_000} prefix="$" suffix="M" label="10-Year EBITDA" />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ REVENUE STREAMS ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <span className="eyebrow mb-3 block">Revenue Streams</span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
                Five Diversified Income Sources
              </h2>
              <p className="text-lg text-neutral-600">
                Revenue is not dependent on any single source. Residential sales drive the majority, with rental income, lot sales, commercial leasing, and the retreat center providing recurring and supplementary streams.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl space-y-4">
              {streams.map((stream) => (
                <RevenueBar
                  key={stream.name}
                  name={stream.name}
                  value={stream.value}
                  maxValue={streams[0].value}
                  color={stream.color}
                  onClick={() => setModal({
                    title: stream.name,
                    body: REVENUE_STREAM_DETAILS[stream.name] || '',
                    link: { href: '/data-room/view/financial/financial-projections', label: 'View Full Financial Projections' },
                  })}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ UNIT ECONOMICS ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <FadeIn>
            <div className="mb-14">
              <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                Unit Economics
              </span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-4">
                Product Mix & Pricing
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="font-accent text-sm font-semibold text-white/80 text-left py-4 px-3">Type</th>
                    <th className="font-accent text-sm font-semibold text-white/80 text-right py-4 px-3">Units</th>
                    <th className="font-accent text-sm font-semibold text-white/80 text-right py-4 px-3">Avg Price</th>
                    <th className="font-accent text-sm font-semibold text-white/80 text-right py-4 px-3">Avg SF</th>
                    <th className="font-accent text-sm font-semibold text-white/80 text-right py-4 px-3">Total Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {UNIT_MIX.map((unit) => (
                    <tr
                      key={unit.type}
                      onClick={() => setModal({
                        title: unit.type,
                        body: UNIT_DETAILS[unit.type] || '',
                        link: { href: '/data-room/view/financial/unit-economics', label: 'View Full Unit Economics' },
                      })}
                      className="border-b border-white/10 hover:bg-white/5 cursor-pointer transition-colors group"
                    >
                      <td className="font-accent text-sm text-white py-4 px-3 underline decoration-white/30 underline-offset-2 group-hover:decoration-secondary-400 transition-colors">{unit.type}</td>
                      <td className="text-sm text-white/70 text-right py-4 px-3">{unit.count}</td>
                      <td className="text-sm text-white/70 text-right py-4 px-3">
                        {unit.avgPrice > 0
                          ? `$${(unit.avgPrice / 1000).toFixed(0)}K`
                          : `$${unit.avgNightly}/night`}
                      </td>
                      <td className="text-sm text-white/70 text-right py-4 px-3">
                        {unit.avgSF > 0 ? `${unit.avgSF.toLocaleString()} SF` : '—'}
                      </td>
                      <td className="font-accent text-sm font-semibold text-secondary-400 text-right py-4 px-3">
                        {unit.avgPrice > 0
                          ? `$${((unit.count * unit.avgPrice) / 1_000_000).toFixed(1)}M`
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ REVENUE BY YEAR ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
              <div>
                <span className="eyebrow mb-3 block">10-Year Projection</span>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900">
                  Revenue & EBITDA
                </h2>
              </div>
              <ScenarioToggle />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-3">
              {yearData.map((d) => (
                <div key={d.year} className="flex items-center gap-4">
                  <div className="w-12 flex-shrink-0 font-accent text-sm font-semibold text-neutral-500">
                    Yr {d.year}
                  </div>
                  <div className="flex-1 flex gap-1">
                    <div
                      className="bg-primary-600 h-8 rounded-l-lg flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${(d.revenue / maxRevenue) * 70}%` }}
                    >
                      <span className="font-accent text-xs text-white font-semibold">
                        ${(d.revenue / 1_000_000).toFixed(0)}M
                      </span>
                    </div>
                    <div
                      className={`h-8 rounded-r-lg flex items-center justify-center transition-all duration-500 ${
                        d.ebitda >= 0 ? 'bg-secondary-500' : 'bg-red-400'
                      }`}
                      style={{ width: `${Math.max(Math.abs(d.ebitda) / maxRevenue * 70, 5)}%` }}
                    >
                      <span className="font-accent text-xs text-white font-semibold">
                        {d.ebitda >= 0 ? '' : '-'}${Math.abs(d.ebitda / 1_000_000).toFixed(0)}M
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-primary-600" />
                <span className="font-accent text-xs text-neutral-500">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-secondary-500" />
                <span className="font-accent text-xs text-neutral-500">EBITDA</span>
              </div>
            </div>
          </FadeIn>

          {/* Data Room Callout */}
          <FadeIn delay={0.3}>
            <Link
              href="/data-room/view/financial/financial-projections"
              className="mt-10 flex items-center justify-between p-6 rounded-2xl bg-primary-50 border border-primary-100 hover:border-primary-300 hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <h3 className="font-display text-lg text-primary-900 mb-1">Complete Financial Model</h3>
                <p className="text-sm text-neutral-600">View the complete 10-year financial model with detailed assumptions in the Data Room</p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ USE OF FUNDS ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">$12.5M Capital Raise</span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
                Use of Funds
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {USE_OF_FUNDS.map((fund) => (
              <StaggerItem key={fund.name}>
                <button
                  onClick={() => setModal({
                    title: `Use of Funds: ${fund.name}`,
                    body: USE_OF_FUNDS_DETAILS[fund.name] || '',
                    link: { href: '/data-room/view/property/construction-budget', label: 'View Construction Budget' },
                  })}
                  className="card p-5 text-center w-full hover:shadow-lg hover:border-primary-200 transition-all duration-300 cursor-pointer group"
                >
                  <div className="font-display text-3xl font-bold mb-1" style={{ color: fund.color }}>
                    {fund.percentage}%
                  </div>
                  <h3 className="font-accent text-sm font-semibold text-neutral-900 mb-1">
                    {fund.name}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    ${(fund.value / 1_000_000).toFixed(2)}M
                  </p>
                  <span className="inline-flex items-center gap-1 mt-2 font-accent text-[10px] font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    View breakdown <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ WATERFALL DISTRIBUTION ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                Investor Returns
              </span>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-4">
                Waterfall Distribution
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                LP-favorable structure with 8% preferred return and progressive profit sharing. Investors recover their capital first.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-2xl mx-auto space-y-3">
              {WATERFALL.map((tier) => (
                <button
                  key={tier.tier}
                  onClick={() => setModal({
                    title: `Waterfall: ${tier.tier}`,
                    body: WATERFALL_DETAILS[tier.tier] || '',
                    link: { href: '/data-room/view/investment/operating-agreement', label: 'View Operating Agreement' },
                  })}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 w-full text-left hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-accent text-sm font-semibold text-white">{tier.tier}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-accent text-xs text-white/50">{tier.threshold}</span>
                      <ArrowRight className="w-3 h-3 text-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="flex h-6 rounded-full overflow-hidden">
                    <div
                      className="bg-secondary-500 flex items-center justify-center transition-all duration-500"
                      style={{ width: `${tier.lpSplit}%` }}
                    >
                      <span className="font-accent text-xs font-semibold text-white">
                        LP {tier.lpSplit}%
                      </span>
                    </div>
                    {tier.gpSplit > 0 && (
                      <div
                        className="bg-primary-600 flex items-center justify-center transition-all duration-500"
                        style={{ width: `${tier.gpSplit}%` }}
                      >
                        <span className="font-accent text-xs font-semibold text-white">
                          GP {tier.gpSplit}%
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-primary-800 py-20 md:py-28">
        <div className="section-container text-center">
          <FadeIn>
            <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-4 block">
              Take the Next Step
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-white mb-6">
              Join the $12.5M Capital Raise
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Accredited investors are invited to participate in a generational opportunity — regenerative development with institutional-grade returns.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/invest/apply" className="btn-accent btn-lg rounded-2xl text-base">
                Join Investor Waitlist
              </Link>
              <Link href="/expansion" className="btn-secondary-light btn-lg rounded-2xl text-base group">
                View Development Phases
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
