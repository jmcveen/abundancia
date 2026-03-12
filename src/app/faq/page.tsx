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
        a: 'Abundancia is a 376-acre regenerative community in Cedar Creek, Bastrop County — 30 minutes from downtown Austin, Texas. It integrates hempcrete homes, food forests, renewable energy, sacred spaces, and commercial amenities into a complete ecosystem designed for regenerative living.',
        links: [
          { text: 'Explore the Land', href: '/story/land' },
          { text: 'Regenerative Vision', href: '/story/regeneration' },
        ],
      },
      {
        q: 'Where exactly is it?',
        a: 'Cedar Creek, TX 78612 — along the SH 71 corridor in Bastrop County. The property is approximately 30 minutes from downtown Austin, with direct access via SH 71 and SH 130. The location sits in Austin\'s southeastern growth corridor, benefiting from the city\'s rapid expansion while maintaining the natural beauty and regulatory advantages of Bastrop County.',
        links: [
          { text: 'View Site Assessment', href: '/data-room/view/property/site-assessment' },
          { text: 'Learn About the Land', href: '/story/land' },
        ],
      },
      {
        q: 'What stage is the project in?',
        a: 'We are currently in the due diligence and capital raise phase. The land has been identified, the team is assembled, and the $12.5M capital raise is in progress. Land acquisition and Phase 1 construction will begin upon closing. The retreat center will activate revenue within the first 12 months.',
        links: [
          { text: 'View Full Timeline', href: '/timeline' },
          { text: 'Meet the Team', href: '/team' },
        ],
      },
      {
        q: 'How many homes will there be?',
        a: 'The full buildout includes approximately 420+ units: ~100 single-family hempcrete homes, ~30 tiny homes, ~30 domes, ~260 multifamily units, plus custom lots and rental units. All residential construction uses hempcrete — a carbon-negative, fire-resistant building material with a 500+ year lifespan.',
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
        a: 'The $12.5M capital raise is structured for accredited investors under Reg D 506(c). Contact our capital markets team for minimum investment details and terms. The offering is designed to attract both institutional and individual accredited investors.',
        links: [
          { text: 'View Investment Details', href: '/invest' },
          { text: 'Apply to Invest', href: '/invest/apply' },
        ],
      },
      {
        q: 'What are the projected returns?',
        a: 'Base case projections: 37.1% IRR with a 4.42x equity multiple over a 10-year hold. Conservative scenario: 24% IRR / 3.0x. Optimistic: 45% IRR / 5.5x. These are projections, not guarantees. Returns are driven by five diversified revenue streams across residential sales, rentals, lot sales, commercial leasing, and retreat operations.',
        links: [
          { text: 'Explore the Financial Model', href: '/model' },
          { text: 'View Financial Projections', href: '/data-room/view/financial/financial-projections' },
          { text: 'Sensitivity Analysis', href: '/data-room/view/financial/sensitivity-analysis' },
        ],
      },
      {
        q: 'How is the entity structured?',
        a: 'Texas Series LLC with LP/GP structure. LPs receive an 8% annual preferred return with a 4-tier waterfall: 80/20 → 70/30 → 60/40 → 50/50 at progressive IRR hurdles. LPs recover their full capital before any GP promote. The Series LLC structure provides liability isolation between phases while maintaining unified management.',
        links: [
          { text: 'View Operating Agreement', href: '/data-room/view/investment/operating-agreement' },
          { text: 'Investment Overview', href: '/invest' },
        ],
      },
      {
        q: 'When do investors receive distributions?',
        a: 'Distributions begin when Phase 1 operations generate sufficient cash flow — projected within 12-18 months. Quarterly reporting with annual K-1s. The retreat center and initial home sales drive early cash flow, with distributions increasing as later phases come online.',
        links: [
          { text: 'View Timeline', href: '/timeline' },
          { text: 'Financial Projections', href: '/data-room/view/financial/financial-projections' },
        ],
      },
      {
        q: 'What does the $12.5M fund?',
        a: 'Land acquisition (32%), hard costs (14%), site work (14%), master planning (11%), staffing & operations (6%), marketing (5%), and contingency (18%). This funds the complete vision through Phase 1 revenue generation. The 18% contingency is well above industry standard, providing a substantial buffer against cost overruns.',
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
        a: 'Single-family hempcrete homes (~1,900 SF), tiny homes (~600 SF), geodesic domes (~600 SF), multifamily condos (~1,100 SF), and custom lots. Pricing ranges from ~$200K for tiny homes to ~$625K for single-family. All structures use hempcrete construction for fire resistance, energy efficiency, and carbon sequestration.',
        links: [
          { text: 'Unit Economics', href: '/data-room/view/financial/unit-economics' },
          { text: 'Hempcrete Details', href: '/data-room/view/regenerative/hempcrete-construction' },
        ],
      },
      {
        q: 'Can I design my own home?',
        a: 'Custom lots are available for buyers who want to build their own hempcrete home within Abundancia\'s design guidelines. Our architects at Inphinity Design and builders provide support throughout the process, ensuring your home meets Living Building Challenge standards while reflecting your vision.',
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
        a: 'Hempcrete is a bio-composite building material made from hemp hurds and a lime binder. It provides R-30+ insulation, 2+ hour fire resistance, is naturally pest-resistant, non-toxic, and carbon-negative — each home sequesters 20-40 tons of CO2. Buildings last 500+ years. Texas adopted hempcrete building codes in 2023, providing clear regulatory pathways.',
        links: [
          { text: 'Hempcrete Construction Guide', href: '/data-room/view/regenerative/hempcrete-construction' },
          { text: 'Regenerative Vision', href: '/story/regeneration' },
        ],
      },
      {
        q: 'Why is fire resistance important here?',
        a: 'The 2011 Bastrop Complex Fire burned 34,000 acres and destroyed 1,673 homes — the most destructive wildfire in Texas history. Hempcrete\'s 2+ hour fire rating provides critical protection that no other development in the Lost Pines region offers. This is not just a feature — it is a fundamental safety advantage for families and a key factor in reduced insurance costs.',
        links: [
          { text: 'Property & Land Details', href: '/story/land' },
          { text: 'Site Assessment', href: '/data-room/view/property/site-assessment' },
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
        a: 'The Lost Pines ecoregion is home to the endangered Houston toad. Abundancia\'s conservation-forward design preserves 70-75% of the land, actively enhancing habitat through native planting, water feature management, and corridor connectivity — aligned with the Bastrop County LPHCP. Our approach transforms regulatory compliance into ecological enhancement.',
        links: [
          { text: 'Environmental Compliance', href: '/data-room/view/property/site-assessment' },
          { text: 'Land Story', href: '/story/land' },
        ],
      },
    ] as FAQItem[],
  },
  {
    id: 'about-austin-bastrop',
    title: 'About Austin & Bastrop County',
    faqs: [
      {
        q: 'Why Austin?',
        a: 'Austin is one of the fastest-growing metros in the US — 2.4M+ MSA population, 50-60K new residents/year, $86K median income, major tech employers (Tesla, Apple, Google, Oracle), and the strongest sustainability culture in Texas. The demand for sustainable living options far exceeds current supply.',
        links: [
          { text: 'Market Research Report', href: '/data-room/view/research/market-research-report' },
        ],
      },
      {
        q: 'What are the advantages of Bastrop County?',
        a: 'No zoning restrictions (build by right), 6-12 month permitting (vs 18-24 months in Austin), agricultural exemption reducing holding costs, MUD bond financing available, and location in the Austin growth corridor. These regulatory advantages translate directly to faster development timelines and lower costs.',
        links: [
          { text: 'Site Assessment', href: '/data-room/view/property/site-assessment' },
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
              Everything you need to know about Abundancia — the project, the investment, the community, and the regenerative systems.
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
              Get in touch with our team — we&apos;re happy to discuss any aspect of the project.
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
