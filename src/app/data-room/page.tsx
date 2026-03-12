'use client'

import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { FileText, Folder, Lock, Eye, Mail, Leaf, TrendingUp, Shield, Search, ClipboardCheck } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const DOCUMENT_CATEGORIES = [
  {
    name: 'Investment Documents',
    icon: TrendingUp,
    documents: [
      { name: 'Executive Summary', slug: 'investment/executive-summary', doc: '01' },
      { name: 'Investor Presentation', slug: 'investment/investor-presentation', doc: '02' },
      { name: 'Private Placement Memorandum', slug: 'investment/private-placement-memorandum', doc: '03' },
      { name: 'Subscription Agreement', slug: 'investment/subscription-agreement', doc: '04' },
      { name: 'Operating Agreement', slug: 'investment/operating-agreement', doc: '05' },
    ],
  },
  {
    name: 'Financial Model',
    icon: FileText,
    documents: [
      { name: 'Financial Projections (10-Year)', slug: 'financial/financial-projections', doc: '06' },
      { name: 'Unit Economics Model', slug: 'financial/unit-economics', doc: '07' },
      { name: 'Sensitivity Analysis', slug: 'financial/sensitivity-analysis', doc: '08' },
      { name: 'Cap Table', slug: 'financial/cap-table', doc: '09' },
      { name: 'Valuation Report', slug: 'financial/valuation-report', doc: '21' },
    ],
  },
  {
    name: 'Property Documents',
    icon: Folder,
    documents: [
      // Site Assessment, Master Plan, and Environmental Compliance - coming soon
      { name: 'Comparable Market Analysis', slug: 'property/comparable-market-analysis', doc: '13' },
      { name: 'Construction Budget & Timeline', slug: 'property/construction-budget', doc: '29' },
    ],
  },
  {
    name: 'Legal & Compliance',
    icon: Shield,
    documents: [
      { name: 'Corporate Structure Overview', slug: 'legal/corporate-structure', doc: '14' },
      { name: 'MUD Bond Framework', slug: 'legal/mud-bond-framework', doc: '15' },
      { name: 'Risk Disclosure Document', slug: 'legal/risk-disclosure', doc: '16' },
    ],
  },
  {
    name: 'Regenerative Systems',
    icon: Leaf,
    documents: [
      { name: 'Hempcrete Construction Specifications', slug: 'regenerative/hempcrete-construction', doc: '17' },
      { name: 'Permaculture & Food Systems Design', slug: 'regenerative/permaculture-design', doc: '18' },
      { name: 'Energy Independence Plan', slug: 'regenerative/energy-independence', doc: '19' },
      { name: 'Water Security Systems', slug: 'regenerative/water-systems', doc: '20' },
    ],
  },
  {
    name: 'Research & Market',
    icon: Search,
    documents: [
      { name: 'Market Research Report', slug: 'research/market-research-report', doc: '22' },
      { name: 'Competitive Landscape Analysis', slug: 'research/competitive-landscape', doc: '23' },
    ],
  },
  {
    name: 'Regulatory Compliance',
    icon: ClipboardCheck,
    documents: [
      { name: 'Bad Actor Certification', slug: 'compliance/bad-actor-certification', doc: '24' },
      { name: 'AML/KYC Procedures', slug: 'compliance/aml-kyc-procedures', doc: '25' },
      { name: 'Escrow Agreement', slug: 'compliance/escrow-agreement', doc: '26' },
      { name: 'Blue Sky Memorandum', slug: 'compliance/blue-sky-memorandum', doc: '27' },
      { name: 'Ongoing Reporting Framework', slug: 'compliance/ongoing-reporting', doc: '28' },
    ],
  },
]

function categoryId(name: string): string {
  return name.toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-')
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function DataRoomPage() {
  const totalDocs = DOCUMENT_CATEGORIES.reduce((sum, cat) => sum + cat.documents.length, 0)

  return (
    <div>
        {/* ═══ HERO ═══ */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
          <div className="relative section-container">
            <FadeIn>
              <div className="text-center">
                <span className="eyebrow mb-4 block">Due Diligence</span>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-neutral-900 mb-6">
                  Investor Data Room
                </h1>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                  Access all investment materials, financial models, property documentation,
                  and research supporting the Abundancia opportunity.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ STATS ═══ */}
        <section className="py-12 md:py-16 bg-canvas">
          <div className="section-container">
            <StaggerContainer className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <StaggerItem>
                <div className="card p-6 text-center">
                  <FileText className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                  <div className="font-display text-3xl text-neutral-900 mb-1">{totalDocs}</div>
                  <div className="font-accent text-sm font-semibold text-neutral-800">Documents Available</div>
                  <div className="text-xs text-neutral-500 mt-1">Full data room access</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="card p-6 text-center">
                  <Folder className="w-10 h-10 text-secondary-600 mx-auto mb-3" />
                  <div className="font-display text-3xl text-neutral-900 mb-1">7</div>
                  <div className="font-accent text-sm font-semibold text-neutral-800">Document Categories</div>
                  <div className="text-xs text-neutral-500 mt-1">Investment, financial, property, legal, regenerative, research, compliance</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="card p-6 text-center">
                  <Lock className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                  <div className="font-display text-3xl text-neutral-900 mb-1">NDA</div>
                  <div className="font-accent text-sm font-semibold text-neutral-800">Protected Access</div>
                  <div className="text-xs text-neutral-500 mt-1">Confidential materials</div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* ═══ CATEGORY JUMP LINKS ═══ */}
        <section className="py-8 bg-canvas">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <FadeIn>
                <nav className="flex flex-wrap gap-2 justify-center">
                  {DOCUMENT_CATEGORIES.map((category) => (
                    <a
                      key={category.name}
                      href={`#${categoryId(category.name)}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 bg-white text-neutral-700 font-accent text-sm font-medium hover:border-primary-400 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                    >
                      <category.icon className="w-4 h-4 text-primary-600" />
                      {category.name}
                    </a>
                  ))}
                </nav>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ═══ DOCUMENT CATEGORIES ═══ */}
        <section className="py-12 md:py-20 bg-canvas">
          <div className="section-container">
            <div className="max-w-4xl mx-auto space-y-8">
              {DOCUMENT_CATEGORIES.map((category, catIdx) => (
                <FadeIn key={category.name} delay={catIdx * 0.1}>
                  <div
                    id={categoryId(category.name)}
                    className="card overflow-hidden scroll-mt-32"
                  >
                    <div className="flex items-center gap-3 px-6 py-5 border-b border-neutral-100 bg-canvas-subtle">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary-50">
                        <category.icon className="w-5 h-5 text-primary-600" />
                      </div>
                      <h2 className="font-display text-xl text-neutral-900">{category.name}</h2>
                      <span className="ml-auto font-accent text-xs text-neutral-400">
                        {category.documents.length} documents
                      </span>
                    </div>
                    <div className="divide-y divide-neutral-100">
                      {category.documents.map((doc) => (
                        <div key={doc.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 hover:bg-primary-50/30 transition-colors">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center bg-primary-50">
                              <FileText className="w-4 h-4 text-primary-600" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-accent text-sm font-semibold text-neutral-900">{doc.name}</p>
                              <p className="text-xs text-neutral-400 mt-0.5">Document {doc.doc}</p>
                            </div>
                          </div>
                          <Link
                            href={`/data-room/view/${doc.slug}`}
                            className="shrink-0 inline-flex items-center justify-center gap-2 font-accent font-semibold uppercase text-xs tracking-wider px-5 py-2.5 rounded-xl bg-transparent text-primary-800 border-2 border-primary-800 hover:bg-primary-800 hover:text-white transition-all duration-300"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CONFIDENTIALITY NOTICE ═══ */}
        <section className="py-20 md:py-28 bg-primary-800">
          <div className="section-container">
            <FadeIn>
              <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
                <div>
                  <h2 className="font-display text-3xl text-white mb-4">Confidential Materials</h2>
                  <p className="text-primary-200 mb-6 leading-relaxed">
                    All documents in this data room are confidential and protected under NDA.
                    By accessing these materials you acknowledge the following obligations.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Materials are for qualified investors and partners only',
                      'Do not distribute without written consent',
                      'Share with legal and financial advisors under NDA only',
                      'Forward-looking statements are subject to risk factors',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-accent-500 text-primary-900 text-sm font-medium flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-primary-100 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-primary-700/50 rounded-2xl p-8 border border-primary-600/30 text-center">
                  <Mail className="w-12 h-12 text-accent-500 mx-auto mb-4" />
                  <p className="text-primary-200 mb-4">
                    Questions about the data room or investment opportunity?
                  </p>
                  <a
                    href="mailto:nicholas@lightbrands.ai"
                    className="btn-accent btn-lg rounded-xl inline-block"
                  >
                    Contact Investor Relations
                  </a>
                  <p className="text-sm text-primary-300 mt-4">
                    nicholas@lightbrands.ai
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
  )
}
