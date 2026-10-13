'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FadeIn } from '@/components/animation'
import { ArrowRight, ChevronDown, FolderOpen, Mail } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

interface FAQLink {
  text: string
  href: string
}

interface FAQItem {
  q: string
  a: string
  links?: FAQLink[]
}

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const FAQ_SECTIONS = [
  {
    id: 'about-the-project',
    title: 'About the Project',
    faqs: [
      {
        q: 'What is Abundancia?',
        a: 'Abundancia is a 380-acre regenerative community in the greater Austin, Texas area. It integrates hempcrete homes, food forests, renewable energy, sacred spaces, and commercial amenities into a complete ecosystem designed for regenerative living.',
        links: [
          { text: 'Explore the Land', href: '/story/land' },
          { text: 'Regenerative Vision', href: '/story/regeneration' },
        ],
      },
      {
        q: 'Where exactly is it?',
        a: 'Bastrop County, approximately 30 minutes from downtown Austin. Exact property address and parcel details are available to qualified investors in our data room.',
        links: [
          { text: 'Learn About the Land', href: '/story/land' },
        ],
      },
      {
        q: 'What stage is the project in?',
        a: 'We are currently in the due diligence and capital raise phase. The land has been identified, the team is assembled, and the $15.9M capital raise is in progress. Land acquisition and Phase 1 construction will begin upon closing. The retreat center will activate revenue within the first 12 months.',
        links: [
          { text: 'View Full Timeline', href: '/timeline' },
          { text: 'Meet the Team', href: '/team' },
        ],
      },
      {
        q: 'How many homes will there be?',
        a: 'The full master plan includes 100 single-family homes (90 standard and 10 luxury estates), 275 condominiums (200 for sale and 75 kept as rentals), 60 micro villas, 60 nature-stay units (glamping tents, domes, creekside camping and 10 Regen Villas), 100 estate lots, a retreat and event residence, and 12 commercial spaces. Phase 1, the current offering, builds the micro villas, the nature stays, 80 of the lots and the event residence. All residential construction uses hempcrete or other approved regenerative materials - carbon-negative, fire-resistant building materials with a 500+ year lifespan.',
        links: [
          { text: 'Hempcrete Construction Details', href: '/data-room/view/regenerative/hempcrete-construction' },
          { text: 'View Unit Economics', href: '/data-room/view/financial/unit-economics' },
        ],
      },
    ] as FAQItem[],
  },
  {
    id: 'about-the-investment',
    title: 'About the Investment',
    faqs: [
      {
        q: 'What is the minimum investment?',
        a: 'The minimum investment is $50,000. Phase 1 is a $15.9M total capitalization: $7.74M from investors, a $500K co-investment from the managing partner, and $7.7M of construction debt. Investors choose Election A (LP equity) or Election B (LP equity plus $4M of secured notes). Open to accredited investors only, under Reg D 506(c).',
        links: [
          { text: 'View Investment Details', href: '/invest' },
          { text: 'Apply to Invest', href: '/invest/apply' },
        ],
      },
      {
        q: 'What are the projected returns?',
        a: 'Phase 1 base case over a 10-year hold: Election A (LP equity) projects a 26.0% LP IRR and a 2.45x equity multiple. Election B (LP equity plus secured notes) projects a 34.8% LP IRR and 3.65x. Over 5 years the figures are 20.1% / 1.65x and 28.0% / 2.10x. Election B is higher because the notes take a fixed 10% interest with no share of the upside and rank behind the construction lender, so the same profit is shared across a smaller equity base. Projected returns are forward-looking and not guaranteed. Accredited investors only.',
        links: [
          { text: 'Explore the Financial Model', href: '/financials' },
          { text: 'View Financial Projections', href: '/data-room/view/financial/financial-projections' },
          { text: 'Sensitivity Analysis', href: '/data-room/view/financial/sensitivity-analysis' },
        ],
      },
      {
        q: 'How is the entity structured?',
        a: 'Delaware LLC with LP/GP structure. LPs receive a 10% annual preferred return with a 4-tier promote structure: 10% → 20% → 30% → 40% to the GP as LP IRR hurdles of 12%, 15% and 18% are cleared at progressive IRR hurdles. LPs recover their full capital before any GP promote. The Delaware LLC structure provides liability isolation between phases while maintaining unified management.',
        links: [
          { text: 'View Operating Agreement', href: '/data-room/view/investment/operating-agreement' },
          { text: 'Investment Overview', href: '/invest' },
        ],
      },
      {
        q: 'When do investors receive distributions?',
        a: 'Distributions are projected to begin in Year 2, when the micro villas and lots are selling and the nature stays are open, and LP capital is projected to be fully returned by Year 3. A 20% reserve is held back from cash flow each year and released in Year 10. Investors receive quarterly reporting and annual K-1s.',
        links: [
          { text: 'View Timeline', href: '/timeline' },
          { text: 'Financial Projections', href: '/data-room/view/financial/financial-projections' },
        ],
      },
      {
        q: 'What does the $15.9M fund?',
        a: 'The $15.9M covers Phase 1 through Year 1: land acquisition (22%), amenities and commercial spaces (20%), the nature-stay and rental build (14%), site work and infrastructure (10%), staffing, operations and marketing (8%), a 10% contingency (8%), soft costs such as design, permits and due diligence (7%), the first year of construction-loan payments (7%), and a reserve of about $656K carried into Year 2 (4%).',
        links: [
          { text: 'View Construction Budget', href: '/data-room/view/property/construction-budget' },
          { text: 'Executive Summary', href: '/data-room/view/investment/executive-summary' },
        ],
      },
    ] as FAQItem[],
  },
  {
    id: 'about-the-community',
    title: 'About the Community',
    faqs: [
      {
        q: 'What housing types are available?',
        a: 'Single-family homes (1-7 bedrooms, up to 5,000 SF), multifamily condos (~1,000 SF), special residential units including tiny homes and domes (~324 SF avg), and custom lots (.25-1 acre). All structures use hempcrete or other approved regenerative materials such as rammed earth for fire resistance, energy efficiency, and carbon sequestration.',
        links: [
          { text: 'Unit Economics', href: '/data-room/view/financial/unit-economics' },
          { text: 'Hempcrete Details', href: '/data-room/view/regenerative/hempcrete-construction' },
        ],
      },
      {
        q: 'Can I design my own home?',
        a: 'Custom lots are available for buyers who want to build their own home using hempcrete or other approved regenerative materials (such as rammed earth) within Abundancia\'s design guidelines. Our architects at Inphinity Design and builders provide support throughout the process, ensuring your home meets Living Building Challenge standards while reflecting your vision.',
        links: [
          { text: 'Meet the Team', href: '/team' },
        ],
      },
      {
        q: 'What amenities are included?',
        a: 'Community spaces (yoga shala, ceremony spaces, gyms, libraries, research center, food forests), Creation Hub (co-working, artist studios, recording studio, makerspace), public spaces (restaurants, grocery, retail, amphitheater, health center, spa), and a retreat/event center. These amenities activate in phases, with the retreat center and community spaces coming first.',
        links: [
          { text: 'View Development Timeline', href: '/timeline' },
          { text: 'Explore the Vision', href: '/story' },
        ],
      },
      {
        q: 'How does governance work?',
        a: 'Sociocratic decision-making where every resident has voice and vote. Structured onboarding ensures inclusive participation. The community is self-governing within the framework established by the development. This governance model has been tested and refined across dozens of intentional communities worldwide.',
      },
    ] as FAQItem[],
  },
  {
    id: 'about-regenerative-systems',
    title: 'About Regenerative Systems',
    faqs: [
      {
        q: 'What is hempcrete?',
        a: 'Hempcrete is a bio-composite building material made from hemp hurds and a lime binder. It provides R-30+ insulation, 2+ hour fire resistance, is naturally pest-resistant, non-toxic, and carbon-negative - each home sequesters 20-40 tons of CO2. Buildings last 500+ years. Texas adopted hempcrete building codes in 2023, providing clear regulatory pathways.',
        links: [
          { text: 'Hempcrete Construction Guide', href: '/data-room/view/regenerative/hempcrete-construction' },
          { text: 'Regenerative Vision', href: '/story/regeneration' },
        ],
      },
      {
        q: 'Why is fire resistance important here?',
        a: 'The 2011 Bastrop Complex Fire burned 34,000 acres and destroyed 1,673 homes - the most destructive wildfire in Texas history. Hempcrete\'s 2+ hour fire rating provides critical protection that no other development in the Lost Pines region offers. This is not just a feature - it is a fundamental safety advantage for families and a key factor in reduced insurance costs.',
        links: [
          { text: 'Property & Land Details', href: '/story/land' },
        ],
      },
      {
        q: 'How does food self-sufficiency work?',
        a: 'Permaculture food forests, community gardens, and orchards are integrated throughout the community. USDA Zone 8b provides a 250+ day growing season. The target is 80-100% food self-sufficiency for residents. Food forests are planted in Phase 1 and reach productive maturity by Phase 3, providing decades of abundant food production.',
        links: [
          { text: 'Regenerative Systems', href: '/story/regeneration' },
        ],
      },
      {
        q: 'What about the Houston toad?',
        a: 'The Lost Pines ecoregion is home to the endangered Houston toad. Abundancia\'s conservation-forward design preserves over 90% of the land, actively enhancing habitat through native planting, water feature management, and corridor connectivity - aligned with local habitat conservation plans. Our approach transforms regulatory compliance into ecological enhancement.',
        links: [
          { text: 'Land Story', href: '/story/land' },
        ],
      },
    ] as FAQItem[],
  },
  {
    id: 'about-austin-bastrop',
    title: 'About Austin & the Region',
    faqs: [
      {
        q: 'Why Austin?',
        a: 'Austin is one of the fastest-growing metros in the US - 2.4M+ MSA population, 50-60K new residents/year, $86K median income, major tech employers (Tesla, Apple, Google, Oracle), and the strongest sustainability culture in Texas. The demand for sustainable living options far exceeds current supply.',
        links: [
          { text: 'Market Research Report', href: '/data-room/view/research/market-research-report' },
        ],
      },
      {
        q: 'What are the advantages of the location?',
        a: 'No zoning restrictions (build by right), 6-12 month permitting (vs 18-24 months in Austin), agricultural exemption reducing holding costs, MUD bond financing available, and location in the Austin growth corridor. These regulatory advantages translate directly to faster development timelines and lower costs.',
        links: [
          { text: 'View Investment Thesis', href: '/invest' },
        ],
      },
      {
        q: 'Is the area prone to natural disasters?',
        a: 'Central Texas faces wildfire and drought risks. Abundancia directly addresses both: hempcrete provides 2+ hour fire ratings (the strongest in the region), and 7 retention ponds plus rainwater harvesting create water security. Solar + battery storage provides grid independence after Winter Storm Uri showed the importance of energy resilience.',
        links: [
          { text: 'Hempcrete Fire Resistance', href: '/data-room/view/regenerative/hempcrete-construction' },
          { text: 'Risk Disclosure', href: '/data-room/view/legal/risk-disclosure' },
        ],
      },
    ] as FAQItem[],
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Accordion Component
// ═══════════════════════════════════════════════════════════════════════════

function Accordion({ question, answer, links }: { question: string; answer: string; links?: FAQLink[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-accent text-base font-semibold text-neutral-900 pr-4 group-hover:text-primary-700 transition-colors">
          {question}
        </span>
        <ChevronDown className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-[500px] pb-5' : 'max-h-0'
      }`}>
        <p className="text-sm text-neutral-600 leading-relaxed">
          {answer}
        </p>
        {links && links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 font-accent text-xs font-semibold text-primary-700 hover:text-primary-800 bg-primary-50 hover:bg-primary-100 px-3 py-2 rounded-full transition-colors"
              >
                {link.text}
                <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function FAQPage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Resources</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-6xl text-neutral-900 mb-6 max-w-4xl">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
              Everything you need to know about Abundancia - the project, the investment, the community, and the regenerative systems.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FAQ SECTIONS ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {FAQ_SECTIONS.map((section, sectionIndex) => (
              <FadeIn key={section.title} delay={sectionIndex * 0.1}>
                <div id={section.id} className="mb-12 last:mb-0 scroll-mt-24">
                  <h2 className="font-display text-2xl text-neutral-900 mb-6">
                    {section.title}
                  </h2>
                  <div className="card">
                    <div className="px-6">
                      {section.faqs.map((faq) => (
                        <Accordion
                          key={faq.q}
                          question={faq.q}
                          answer={faq.a}
                          links={faq.links}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STILL HAVE QUESTIONS ═══ */}
      <section className="bg-primary-50 py-12 md:py-16 border-y border-primary-100">
        <div className="section-container">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl text-neutral-900 mb-4">
                Still have questions?
              </h2>
              <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
                Browse the full investor data room for detailed documentation, or reach out to our team directly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/data-room"
                  className="inline-flex items-center gap-2 font-accent text-sm font-semibold px-6 py-3 rounded-2xl bg-primary-800 text-white hover:bg-primary-900 transition-colors"
                >
                  <FolderOpen className="w-4 h-4" />
                  Browse the Full Data Room
                </Link>
                <a
                  href="mailto:invest@abundancia.community"
                  className="inline-flex items-center gap-2 font-accent text-sm font-semibold px-6 py-3 rounded-2xl bg-white text-primary-800 border border-primary-200 hover:bg-primary-50 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email Our Team
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-primary-800 py-20 md:py-28">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-white mb-6">
              Ready to Take the Next Step?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Get in touch with our team - we&apos;re happy to discuss any aspect of the project.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/invest/apply" className="btn-accent btn-lg rounded-2xl text-base">
                Join Investor Waitlist
              </Link>
              <Link href="/waitlist" className="btn-primary-light btn-lg rounded-2xl text-base group">
                Join Resident Waitlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
