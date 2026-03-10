'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { VaultGate } from '@/components/auth/VaultGate'
import { Modal } from '@/components/ui/Modal'
import {
  ArrowRight, TrendingUp, Shield, Leaf, Building2,
  Scale, AlertTriangle, CheckCircle2, ExternalLink, FolderOpen
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const THESIS_POINTS = [
  {
    icon: TrendingUp,
    title: 'Institutional-Grade Returns',
    description: '37% projected IRR with 4.42x equity multiple. LP-favorable waterfall with 8% preferred return and capital return priority.',
    detail: 'Abundancia is structured as a Texas Series LLC with an LP-favorable waterfall designed to attract sophisticated institutional and accredited investors. The 37.1% base-case IRR is driven by five distinct revenue streams — residential sales, lot sales, rental income, commercial leasing, and retreat operations — with Phase 1 generating cash flow within 12-18 months.\n\nThe 4.42x equity multiple reflects the compounding effect of phased development: early phases fund later phases, MUD bond reimbursements return infrastructure capital, and appreciation over the 10-year hold drives outsized returns. The 8% preferred return ensures investors are compensated from day one before any GP promote kicks in.\n\nComparable eco-community projects (Whisper Valley, Serenbe, Babcock Ranch) have demonstrated that sustainability premiums and community-driven design command pricing power that conventional developments cannot match.',
    dataRoomLink: '/data-room/view/financial/financial-projections',
  },
  {
    icon: Leaf,
    title: 'Regenerative Premium',
    description: 'Sustainability features command 10-25% pricing premiums. Hempcrete reduces insurance, energy, and maintenance costs. Conservation easements provide tax benefits.',
    detail: 'Research from the National Association of Realtors and multiple market studies shows that green-certified homes sell for 10-25% premiums over conventional construction. In Austin specifically, sustainability features are among the top buyer priorities — 68% of homebuyers report willingness to pay more for sustainable features.\n\nHempcrete construction delivers measurable cost advantages: R-30+ insulation dramatically reduces HVAC costs, 2+ hour fire ratings can reduce insurance premiums by 15-25%, and the 500+ year material lifespan means virtually zero structural maintenance. These benefits translate directly to higher resale values.\n\nConservation easements on the 70-75% preserved land provide significant tax benefits to the entity, further enhancing investor returns while ensuring permanent ecological protection.',
    dataRoomLink: '/data-room/view/financial/valuation-report',
  },
  {
    icon: Building2,
    title: 'Proven Market Demand',
    description: 'Austin\'s population doubles every 20 years. Whisper Valley sold out multiple phases. 68% of buyers pay more for sustainable features.',
    detail: 'The Austin-Round Rock MSA has grown to 2.4M+ people, adding 50-60K new residents per year. This growth is driven by major employer relocations (Tesla, Apple, Google, Oracle, Samsung) and a quality of life that consistently ranks among the best in America.\n\nWhisper Valley — Austin\'s only comparable eco-community — has sold out every released phase, demonstrating that the market for sustainable living communities far exceeds supply. Abundancia differentiates further with hempcrete construction, food forests, and a fully regenerative design that Whisper Valley does not offer.\n\nBastrop County specifically is in the path of Austin\'s southeastern growth corridor, with SH 130 and SH 71 providing direct access. The county\'s no-zoning, fast-permitting environment allows development timelines of 6-12 months vs. 18-24 months in Austin proper.',
    dataRoomLink: '/data-room/view/research/market-research-report',
  },
  {
    icon: Shield,
    title: 'Regulatory De-Risk',
    description: 'No zoning in Bastrop County. Texas hempcrete building codes adopted. MUD bond financing available. 6-12 month timeline vs 18-24 months in Austin.',
    detail: 'Bastrop County operates with no zoning, meaning development rights are established by right rather than through discretionary approvals. This eliminates the single largest risk in conventional real estate development — rezoning denial or delay.\n\nTexas adopted hempcrete building codes in 2023, providing clear regulatory pathways for construction. The Municipal Utility District (MUD) framework allows infrastructure costs to be financed through tax-exempt bonds, which are reimbursed to the developer — dramatically improving project economics.\n\nThe Houston toad habitat compliance (LPHCP) is well-established in Bastrop County with clear requirements. Abundancia\'s 70-75% conservation design exceeds LPHCP requirements, creating a positive relationship with regulators rather than an adversarial one.',
    dataRoomLink: '/data-room/view/property/site-assessment',
  },
  {
    icon: Scale,
    title: 'Diversified Revenue',
    description: 'Five revenue streams — residential sales, rental income, lot sales, commercial leasing, and retreat center. No single-source dependency.',
    detail: 'Unlike single-product developments that depend entirely on home sales, Abundancia generates revenue from five distinct streams that activate at different phases and serve different market segments:\n\n1. Residential Sales — Single-family hempcrete homes, tiny homes, domes, and multifamily condos across a range of price points ($200K-$625K)\n2. Lot Sales — Custom lots for buyers who want to build their own homes within Abundancia\'s design guidelines\n3. Rental Income — Long-term rental units and short-term vacation rentals generating recurring cash flow\n4. Commercial Leasing — Grocery, restaurants, retail, health center, spa, and co-working spaces\n5. Retreat Center — Phase 1 revenue engine using existing structures for events, workshops, and wellness retreats\n\nThis diversification means no single market downturn can eliminate all revenue. The retreat center provides cash flow from month one, while residential and commercial revenues build through phased development.',
    dataRoomLink: '/data-room/view/financial/unit-economics',
  },
]

const CAPITAL_STRUCTURE = [
  {
    label: 'Vehicle',
    detail: 'Texas Series LLC — LP/GP structure',
    modalDetail: 'The Texas Series LLC is a flexible entity structure that allows the creation of separate "series" for different phases or asset classes within a single LLC. This means each phase of Abundancia can be isolated for liability purposes while maintaining unified management. The LP/GP structure gives limited partners (investors) liability protection and preferred economic terms, while the general partner manages day-to-day operations and development execution.',
  },
  {
    label: 'Minimum Investment',
    detail: 'Accredited investors only (Reg D 506(c))',
    modalDetail: 'The offering is structured under SEC Regulation D, Rule 506(c), which allows general solicitation but requires all investors to be verified accredited investors. Accredited investor status is defined as individuals with $200K+ annual income ($300K joint) or $1M+ net worth excluding primary residence. This structure provides regulatory clarity and investor protection while allowing broader marketing of the opportunity. Contact our capital markets team for specific minimum investment amounts.',
  },
  {
    label: 'Preferred Return',
    detail: '8% annual preferred return to LPs',
    modalDetail: 'The 8% annual preferred return means that limited partners receive the first 8% of distributable cash flow before the general partner receives any promote or carried interest. This is a cumulative, compounding preferred return — if distributions are insufficient in any given year, the shortfall accrues and must be made up before any GP participation. This structure ensures that investors are compensated for their capital deployment from the earliest stages of the project.',
  },
  {
    label: 'Waterfall',
    detail: '80/20 → 70/30 → 60/40 → 50/50 at IRR hurdles',
    modalDetail: 'The distribution waterfall determines how profits are split between LPs and GP at progressive IRR hurdles:\n\nTier 1 (0-15% IRR): 80% to LPs / 20% to GP — investors receive the vast majority of returns at base-case performance\nTier 2 (15-25% IRR): 70% to LPs / 30% to GP — as returns exceed expectations, the GP earns a larger share\nTier 3 (25-35% IRR): 60% to LPs / 40% to GP — strong outperformance rewards the development team\nTier 4 (35%+ IRR): 50% to LPs / 50% to GP — exceptional returns are shared equally\n\nThis structure is LP-favorable because the GP only earns meaningful promote at above-market returns. The 8% preferred return must be satisfied before any waterfall distribution.',
    dataRoomLink: '/data-room/view/investment/operating-agreement',
  },
  {
    label: 'Hold Period',
    detail: '10-year target with extensions available',
    modalDetail: 'The target hold period is 10 years, aligned with the full four-phase development timeline. Extensions are available by LP vote if market conditions or development timing warrant additional time. The phased nature of the project means investors begin receiving distributions well before the 10-year mark — Phase 1 operations generate cash flow within 12-18 months, and home sales begin in Year 1-2. The 10-year horizon allows the project to capture the full appreciation of the completed community rather than selling individual phases at a discount.',
  },
  {
    label: 'Capital Return',
    detail: 'LPs receive full capital back before any GP promote',
    modalDetail: 'In the distribution priority, LP capital return comes before any GP promote payment. This means investors receive their entire initial investment back before the general partner participates in profits beyond the base management fee. This is a key investor protection — it ensures the development team is incentivized to return investor capital as quickly as possible. Combined with the 8% preferred return, this structure aligns GP and LP interests toward efficient capital deployment and early revenue generation.',
  },
  {
    label: 'Reporting',
    detail: 'Quarterly investor reports, annual K-1s',
    modalDetail: 'Investors receive quarterly reports including financial statements, development progress updates, milestone tracking, and capital deployment summaries. Annual K-1 tax documents are provided for pass-through tax treatment — investors report their pro-rata share of income, deductions, and credits on their personal returns. The Series LLC structure provides tax efficiency while maintaining full transparency on project economics.',
  },
]

const RETURN_SCENARIOS = [
  {
    scenario: 'Conservative',
    irr: '24%',
    emx: '3.0x',
    detail: 'The conservative scenario assumes slower absorption rates (15-20% below base case), 5-10% lower pricing across all product types, 6-month delays on each phase transition, and higher construction costs (+10%). Even under these stressed assumptions, the project delivers a strong 24% IRR and 3.0x equity multiple, reflecting the fundamental strength of the location, product, and market dynamics.',
    assumptions: [
      'Absorption rates 15-20% below base case',
      'Pricing 5-10% below market projections',
      '6-month delay on each phase transition',
      'Construction costs +10% over budget',
      'No MUD bond reimbursement acceleration',
    ],
  },
  {
    scenario: 'Base Case',
    irr: '37.1%',
    emx: '4.42x',
    detail: 'The base case reflects our best estimate of market conditions based on comparable projects (Whisper Valley, Serenbe), current Austin market dynamics, and conservative growth assumptions. Pricing reflects current market comparables with a 10-15% sustainability premium. Absorption rates are benchmarked against Whisper Valley\'s actual performance. Timeline assumes standard construction and permitting durations for Bastrop County.',
    assumptions: [
      'Absorption rates benchmarked to Whisper Valley actuals',
      'Pricing at market with 10-15% sustainability premium',
      'Standard construction timelines for Bastrop County',
      'MUD bond reimbursement at expected schedule',
      '3% annual appreciation on unsold inventory',
    ],
  },
  {
    scenario: 'Optimistic',
    irr: '45%',
    emx: '5.5x',
    detail: 'The optimistic scenario reflects accelerated demand driven by Austin\'s continued population growth, sustainability premiums at the high end of the range (20-25%), faster Phase 1 retreat center ramp-up, and potential for Phase 2 acceleration. This scenario also assumes favorable interest rate environment for MUD bond pricing and strong commercial tenant demand.',
    assumptions: [
      'Absorption rates 15-20% above base case',
      'Sustainability premiums at 20-25%',
      'Phase 1 retreat revenue exceeds projections by 25%',
      'Accelerated Phase 2 start by 6 months',
      'Favorable MUD bond pricing and reimbursement timing',
    ],
  },
]

const RISKS = [
  {
    risk: 'Construction Cost Overruns',
    mitigation: '18% contingency reserve. Fixed-price hempcrete contracts. Phased construction allows scope adjustment between phases.',
    detail: 'Construction cost overruns are the most common risk in ground-up development. Our mitigation strategy is three-layered: First, an 18% contingency reserve — well above the industry standard 10-12% — provides a substantial buffer. Second, hempcrete construction contracts are fixed-price with established local contractors, eliminating material cost volatility. Third, the phased development model means each phase is scoped and budgeted independently — if Phase 1 costs come in high, Phase 2 scope can be adjusted before commitment. Additionally, MUD bond reimbursements for infrastructure costs provide a capital recapture mechanism that further de-risks the construction budget.',
  },
  {
    risk: 'Market/Absorption Risk',
    mitigation: 'Austin population growth provides sustained demand. Multiple product types at varied price points. Retreat center generates Phase 1 revenue immediately.',
    detail: 'Market absorption risk — the possibility that homes sell more slowly than projected — is mitigated by Austin\'s extraordinary population growth (50-60K new residents/year), the scarcity of comparable eco-community product in the market, and Abundancia\'s diverse product mix. With price points ranging from ~$200K tiny homes to ~$625K single-family hempcrete homes, the project serves multiple buyer segments. The retreat center operates independently of home sales, generating revenue from Phase 1 and providing cash flow even in a slow absorption environment. Comparable projects like Whisper Valley have sold out every released phase, suggesting demand significantly exceeds supply.',
  },
  {
    risk: 'Regulatory Changes',
    mitigation: 'No zoning means no rezoning risk. Hempcrete is now code-compliant in Texas. Conservation-forward design exceeds environmental requirements.',
    detail: 'Regulatory risk is minimized by Bastrop County\'s no-zoning framework — there is no discretionary approval to be revoked or modified. Texas hempcrete building codes were adopted in 2023 with broad industry support, making reversal extremely unlikely. Our LPHCP compliance and 70-75% land conservation actually exceed regulatory requirements, meaning even if environmental regulations tighten, Abundancia is already ahead of any foreseeable standard. The MUD framework is well-established in Texas law with decades of precedent.',
  },
  {
    risk: 'Environmental (Houston Toad)',
    mitigation: 'LPHCP compliance built into design. 70-75% land conservation exceeds requirements. Habitat enhancement creates positive relationship with regulators.',
    detail: 'The Houston toad is an endangered species native to the Lost Pines ecoregion. The Bastrop County Local Permit Habitat Conservation Plan (LPHCP) provides a clear compliance pathway that Abundancia follows. Our design conserves 70-75% of the land — significantly exceeding the LPHCP minimum — and actively enhances habitat through native planting, water feature management, and ecological corridor connectivity. This conservation-forward approach means regulators view Abundancia as a net positive for the species rather than a threat. Environmental consultants have been engaged from project inception to ensure full compliance.',
  },
  {
    risk: 'Capital Call Risk',
    mitigation: 'Phased development model. Phase 1 is revenue-generating. No capital calls beyond initial commitment. MUD bonds reimburse infrastructure costs.',
    detail: 'Capital call risk — the possibility of needing to request additional capital from investors — is structurally eliminated. The $12.5M raise is sized to fund the project through Phase 1 revenue generation. There are no planned or permitted capital calls beyond the initial commitment. Phase 1 retreat center operations generate cash flow within 12-18 months, and MUD bond reimbursements return infrastructure capital to the project. The phased development model means later phases are funded by earlier phase revenues, not additional investor capital.',
  },
  {
    risk: 'Interest Rate / Financing Risk',
    mitigation: 'Conservative leverage assumptions. MUD bonds provide below-market infrastructure financing. Phase 1 cash flow reduces refinancing dependency.',
    detail: 'Interest rate risk is mitigated through conservative leverage assumptions in the financial model, the availability of MUD bonds (tax-exempt municipal bonds that provide below-market rates for infrastructure financing), and the project\'s early cash flow generation. Phase 1 retreat revenue and initial home sales reduce dependency on debt markets for ongoing operations. The financial model stress-tests scenarios with rates 200-300 basis points above current levels and maintains positive returns even under those conditions.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Page Content
// ═══════════════════════════════════════════════════════════════════════════

function InvestContent() {
  const [activeThesis, setActiveThesis] = useState<typeof THESIS_POINTS[number] | null>(null)
  const [activeCapital, setActiveCapital] = useState<typeof CAPITAL_STRUCTURE[number] | null>(null)
  const [activeReturn, setActiveReturn] = useState<typeof RETURN_SCENARIOS[number] | null>(null)
  const [activeRisk, setActiveRisk] = useState<typeof RISKS[number] | null>(null)

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">The Investment</span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-neutral-900 mb-6 max-w-4xl">
              $12.5M Capital Raise
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
              Accredited investors are invited to participate in a generational opportunity — the first institutional-grade regenerative community in the Austin metro. The full vision, one raise.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
              {[
                { value: '$12.5M', label: 'Raise Amount' },
                { value: '37.1%', label: 'Projected IRR' },
                { value: '4.42x', label: 'Equity Multiple' },
                { value: '10 Year', label: 'Hold Period' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-display text-2xl font-bold text-primary-800">{item.value}</div>
                  <div className="font-accent text-xs text-neutral-500 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ INVESTMENT THESIS ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">Investment Thesis</span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Why This. Why Now. Why Us.
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {THESIS_POINTS.map((point) => (
              <StaggerItem key={point.title}>
                <button
                  onClick={() => setActiveThesis(point)}
                  className="card p-6 h-full text-left w-full cursor-pointer hover:shadow-lg hover:border-primary-200 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                    <point.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-accent text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {point.description}
                  </p>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ CAPITAL STRUCTURE ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <FadeIn>
              <div>
                <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                  Capital Structure
                </span>
                <h2 className="font-display text-4xl md:text-5xl mb-6">
                  How It Works
                </h2>
                <div className="space-y-4">
                  {CAPITAL_STRUCTURE.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveCapital(item)}
                      className="w-full flex items-start gap-3 text-left cursor-pointer group hover:bg-white/5 rounded-lg px-3 py-2 -mx-3 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-secondary-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-accent text-sm font-semibold text-white group-hover:text-secondary-400 transition-colors">{item.label}</span>
                        <span className="text-sm text-white/60"> — {item.detail}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="font-accent text-lg font-semibold text-white mb-6">
                  Return Projections
                </h3>
                <div className="space-y-6">
                  {RETURN_SCENARIOS.map((item) => (
                    <button
                      key={item.scenario}
                      onClick={() => setActiveReturn(item)}
                      className="w-full text-left cursor-pointer group hover:bg-white/5 rounded-lg px-3 py-2 -mx-3 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-accent text-sm text-white/70 group-hover:text-white transition-colors">{item.scenario}</span>
                        <div className="flex items-center gap-4">
                          <span className="font-accent text-sm font-semibold text-secondary-400">{item.irr} IRR</span>
                          <span className="font-accent text-sm text-white/50">{item.emx} EMx</span>
                        </div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-secondary-400 to-secondary-500 h-2 rounded-full"
                          style={{ width: `${(parseFloat(item.irr) / 50) * 100}%` }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ RISK MITIGATION ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">
                <AlertTriangle className="w-4 h-4 inline mr-2 -mt-0.5" />
                Risk Mitigation
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Key Risks & How We Address Them
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-3xl mx-auto space-y-4">
              {RISKS.map((item) => (
                <button
                  key={item.risk}
                  onClick={() => setActiveRisk(item)}
                  className="card p-5 w-full text-left cursor-pointer hover:shadow-lg hover:border-primary-200 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-accent text-base font-semibold text-neutral-900 mb-1 group-hover:text-primary-700 transition-colors">
                        {item.risk}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        <span className="font-semibold text-primary-700">Mitigation: </span>
                        {item.mitigation}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ DATA ROOM BANNER ═══ */}
      <section className="bg-primary-50 py-12 md:py-16 border-y border-primary-100">
        <div className="section-container">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <FolderOpen className="w-6 h-6 text-primary-700" />
                </div>
                <div>
                  <h3 className="font-accent text-lg font-semibold text-neutral-900">Access the Full Data Room</h3>
                  <p className="text-sm text-neutral-600">29 documents across investment, financial, property, legal, regenerative, research, and compliance categories.</p>
                </div>
              </div>
              <Link
                href="/data-room"
                className="btn-accent btn-lg rounded-2xl text-base whitespace-nowrap group"
              >
                Open Data Room
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-primary-800 py-20 md:py-28">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
              Take the Next Step
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Schedule a conversation with our capital markets team or request access to the full data room.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/invest/apply" className="btn-accent btn-lg rounded-2xl text-base">
                Apply to Invest
              </Link>
              <Link href="/financials" className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 btn-lg rounded-2xl text-base group">
                View Full Financials
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ MODALS ═══ */}

      {/* Thesis Point Modal */}
      <Modal
        open={!!activeThesis}
        onClose={() => setActiveThesis(null)}
        title={activeThesis?.title}
        size="lg"
      >
        {activeThesis && (
          <div>
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
              <activeThesis.icon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="space-y-4 mb-6">
              {activeThesis.detail.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-neutral-600 leading-relaxed">{paragraph}</p>
              ))}
            </div>
            <Link
              href={activeThesis.dataRoomLink}
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              onClick={() => setActiveThesis(null)}
            >
              <ExternalLink className="w-4 h-4" />
              View in Data Room
            </Link>
          </div>
        )}
      </Modal>

      {/* Capital Structure Modal */}
      <Modal
        open={!!activeCapital}
        onClose={() => setActiveCapital(null)}
        title={activeCapital?.label}
        size="md"
      >
        {activeCapital && (
          <div>
            <p className="font-accent text-sm text-primary-600 font-semibold mb-4">{activeCapital.detail}</p>
            <div className="space-y-4 mb-6">
              {activeCapital.modalDetail.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-neutral-600 leading-relaxed">{paragraph}</p>
              ))}
            </div>
            {activeCapital.dataRoomLink && (
              <Link
                href={activeCapital.dataRoomLink}
                className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
                onClick={() => setActiveCapital(null)}
              >
                <ExternalLink className="w-4 h-4" />
                View Operating Agreement
              </Link>
            )}
          </div>
        )}
      </Modal>

      {/* Return Scenario Modal */}
      <Modal
        open={!!activeReturn}
        onClose={() => setActiveReturn(null)}
        title={activeReturn ? `${activeReturn.scenario} Scenario — ${activeReturn.irr} IRR / ${activeReturn.emx} EMx` : ''}
        size="md"
      >
        {activeReturn && (
          <div>
            <p className="text-neutral-600 leading-relaxed mb-6">{activeReturn.detail}</p>
            <div className="mb-6">
              <h4 className="font-accent text-sm font-semibold text-neutral-900 mb-3">Key Assumptions</h4>
              <ul className="space-y-2">
                {activeReturn.assumptions.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-500 mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-600">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/data-room/view/financial/sensitivity-analysis"
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              onClick={() => setActiveReturn(null)}
            >
              <ExternalLink className="w-4 h-4" />
              View Full Sensitivity Analysis
            </Link>
          </div>
        )}
      </Modal>

      {/* Risk Modal */}
      <Modal
        open={!!activeRisk}
        onClose={() => setActiveRisk(null)}
        title={activeRisk?.risk}
        size="md"
      >
        {activeRisk && (
          <div>
            <div className="bg-amber-50 rounded-xl p-4 mb-6">
              <h4 className="font-accent text-sm font-semibold text-amber-800 mb-1">Summary Mitigation</h4>
              <p className="text-sm text-amber-700">{activeRisk.mitigation}</p>
            </div>
            <div className="space-y-4 mb-6">
              {activeRisk.detail.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-neutral-600 leading-relaxed">{paragraph}</p>
              ))}
            </div>
            <Link
              href="/data-room/view/legal/risk-disclosure"
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              onClick={() => setActiveRisk(null)}
            >
              <ExternalLink className="w-4 h-4" />
              View Full Risk Disclosure
            </Link>
          </div>
        )}
      </Modal>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page (Vault-Gated)
// ═══════════════════════════════════════════════════════════════════════════

export default function InvestPage() {
  return (
    <VaultGate>
      <InvestContent />
    </VaultGate>
  )
}
