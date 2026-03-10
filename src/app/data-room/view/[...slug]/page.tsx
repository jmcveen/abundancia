import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MarkdownViewer } from './MarkdownViewer'
import { PrintButton } from './PrintButton'

const DOCS_DIR = join(process.cwd(), 'docs/data-room')

interface DocumentEntry {
  file: string
  category: string
}

const DOCUMENT_MAP: Record<string, DocumentEntry> = {
  // Investment Documents
  'investment/executive-summary': { file: 'investment/01-executive-summary.md', category: 'Investment Documents' },
  'investment/investor-presentation': { file: 'investment/02-investor-presentation.md', category: 'Investment Documents' },
  'investment/private-placement-memorandum': { file: 'investment/03-private-placement-memorandum.md', category: 'Investment Documents' },
  'investment/subscription-agreement': { file: 'investment/04-subscription-agreement.md', category: 'Investment Documents' },
  'investment/operating-agreement': { file: 'investment/05-operating-agreement.md', category: 'Investment Documents' },
  // Financial Model
  'financial/financial-projections': { file: 'financial/06-financial-projections.md', category: 'Financial Model' },
  'financial/unit-economics': { file: 'financial/07-unit-economics.md', category: 'Financial Model' },
  'financial/sensitivity-analysis': { file: 'financial/08-sensitivity-analysis.md', category: 'Financial Model' },
  'financial/cap-table': { file: 'financial/09-cap-table.md', category: 'Financial Model' },
  'financial/valuation-report': { file: 'financial/21-valuation-report.md', category: 'Financial Model' },
  // Property Documents
  'property/site-assessment': { file: 'property/10-site-assessment.md', category: 'Property Documents' },
  'property/master-plan': { file: 'property/11-master-plan.md', category: 'Property Documents' },
  'property/environmental-compliance': { file: 'property/12-environmental-compliance.md', category: 'Property Documents' },
  'property/comparable-market-analysis': { file: 'property/13-comparable-market-analysis.md', category: 'Property Documents' },
  'property/construction-budget': { file: 'property/29-construction-budget.md', category: 'Property Documents' },
  // Legal & Compliance
  'legal/corporate-structure': { file: 'legal/14-corporate-structure.md', category: 'Legal & Compliance' },
  'legal/mud-bond-framework': { file: 'legal/15-mud-bond-framework.md', category: 'Legal & Compliance' },
  'legal/risk-disclosure': { file: 'legal/16-risk-disclosure.md', category: 'Legal & Compliance' },
  // Regenerative Systems
  'regenerative/hempcrete-construction': { file: 'regenerative/17-hempcrete-construction.md', category: 'Regenerative Systems' },
  'regenerative/permaculture-design': { file: 'regenerative/18-permaculture-design.md', category: 'Regenerative Systems' },
  'regenerative/energy-independence': { file: 'regenerative/19-energy-independence.md', category: 'Regenerative Systems' },
  'regenerative/water-systems': { file: 'regenerative/20-water-systems.md', category: 'Regenerative Systems' },
  // Research & Market
  'research/market-research-report': { file: 'research/22-market-research-report.md', category: 'Research & Market' },
  'research/competitive-landscape': { file: 'research/23-competitive-landscape.md', category: 'Research & Market' },
  // Regulatory Compliance
  'compliance/bad-actor-certification': { file: 'compliance/24-bad-actor-certification.md', category: 'Regulatory Compliance' },
  'compliance/aml-kyc-procedures': { file: 'compliance/25-aml-kyc-procedures.md', category: 'Regulatory Compliance' },
  'compliance/escrow-agreement': { file: 'compliance/26-escrow-agreement.md', category: 'Regulatory Compliance' },
  'compliance/blue-sky-memorandum': { file: 'compliance/27-blue-sky-memorandum.md', category: 'Regulatory Compliance' },
  'compliance/ongoing-reporting': { file: 'compliance/28-ongoing-reporting.md', category: 'Regulatory Compliance' },
}

export function generateStaticParams() {
  return Object.keys(DOCUMENT_MAP).map(key => ({
    slug: key.split('/'),
  }))
}

export default async function DocumentViewerPage({
  params,
}: {
  params: { slug: string[] }
}) {
  const slugPath = params.slug.join('/')
  const doc = DOCUMENT_MAP[slugPath]

  if (!doc) notFound()

  let content: string
  try {
    content = await readFile(join(DOCS_DIR, doc.file), 'utf-8')
  } catch {
    notFound()
  }

  return (
    <div className="min-h-screen bg-canvas print:bg-white relative pt-0 print:pt-0">
      {/* Sticky bar below main nav */}
      <div className="sticky top-24 z-30 bg-canvas/90 backdrop-blur-xl border-b border-neutral-200 shadow-sm print:hidden">
        <div className="w-full sm:w-[70vw] mx-auto flex items-center justify-between py-3 px-4 sm:px-6">
          <Link
            href="/data-room"
            className="group inline-flex items-center gap-2 text-neutral-600 hover:text-primary-800 transition-colors font-accent text-sm uppercase tracking-wide"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Data Room
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block font-accent text-xs uppercase tracking-widest text-neutral-500">
              {doc.category}
            </span>
            <PrintButton />
          </div>
        </div>
      </div>

      {/* Document content */}
      <article className="w-full sm:w-[70vw] mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-12 sm:pb-16 print:py-0 print:w-full print:px-0">
        <div className="max-w-4xl mx-auto print:max-w-none">
          <div className="bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden print:shadow-none print:border-0 print:rounded-none">
            <div className="px-6 sm:px-10 lg:px-12 py-8 sm:py-10 lg:py-12 print:px-0 print:py-0">
              <MarkdownViewer content={content} />
            </div>
          </div>
        </div>
      </article>

      {/* Bottom navigation */}
      <div className="w-full sm:w-[70vw] mx-auto px-4 sm:px-6 pb-12 print:hidden">
        <div className="max-w-4xl mx-auto flex justify-between items-center pt-8 border-t border-neutral-200">
          <Link
            href="/data-room"
            className="group flex items-center gap-2 text-neutral-600 hover:text-primary-800 transition-colors font-accent text-sm uppercase tracking-wide"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Data Room
          </Link>
        </div>
      </div>
    </div>
  )
}
