import type { Metadata } from 'next'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MarkdownViewer } from './MarkdownViewer'
import { PrintButton } from './PrintButton'
import { PageImagesViewer, type PageImage } from './PageImagesViewer'

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
  'investment/key-figures-sheet': { file: 'investment/33-key-figures-sheet.md', category: 'Investment Documents' },
  'investment/election-notice': { file: 'investment/34-election-notice.md', category: 'Investment Documents' },
  'investment/note-offering-term-sheet': { file: 'investment/31-note-offering-term-sheet.md', category: 'Investment Documents' },
  'investment/secured-promissory-note-form': { file: 'investment/30-secured-promissory-note-form.md', category: 'Investment Documents' },
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
  'legal/deed-of-trust': { file: 'legal/32-deed-of-trust-placeholder.md', category: 'Legal & Compliance' },
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


// Documents shown as page images (e.g. a spreadsheet export) instead of markdown.
// The images live under /data-room/ so the middleware password gate protects them,
// and there is deliberately no PDF file to download (Kelly, 2026-09-29).
const PAGE_DOCS: Record<string, { category: string; pages: PageImage[] }> = {
  'financial/phase-1-financial-model': {
    category: 'Financial Model',
    pages: [
      { src: '/data-room/files/phase-1-financial-model/page-01.webp', width: 3602, height: 4429 },
      { src: '/data-room/files/phase-1-financial-model/page-02.webp', width: 4397, height: 3349 },
      { src: '/data-room/files/phase-1-financial-model/page-03.webp', width: 4394, height: 3338 },
      { src: '/data-room/files/phase-1-financial-model/page-04.webp', width: 4390, height: 3338 },
      { src: '/data-room/files/phase-1-financial-model/page-05.webp', width: 3501, height: 4552 },
      { src: '/data-room/files/phase-1-financial-model/page-06.webp', width: 3501, height: 4565 },
      { src: '/data-room/files/phase-1-financial-model/page-07.webp', width: 3435, height: 4641 },
      { src: '/data-room/files/phase-1-financial-model/page-08.webp', width: 3517, height: 4530 },
      { src: '/data-room/files/phase-1-financial-model/page-09.webp', width: 3501, height: 4556 },
      { src: '/data-room/files/phase-1-financial-model/page-10.webp', width: 3501, height: 4556 },
      { src: '/data-room/files/phase-1-financial-model/page-11.webp', width: 4391, height: 3308 },
      { src: '/data-room/files/phase-1-financial-model/page-12.webp', width: 4391, height: 3320 },
      { src: '/data-room/files/phase-1-financial-model/page-13.webp', width: 4398, height: 3350 },
      { src: '/data-room/files/phase-1-financial-model/page-14.webp', width: 4392, height: 3379 },
      { src: '/data-room/files/phase-1-financial-model/page-15.webp', width: 4392, height: 3411 },
    ],
  },
}

export function generateStaticParams() {
  return [...Object.keys(DOCUMENT_MAP), ...Object.keys(PAGE_DOCS)].map(key => ({
    slug: key.split('/'),
  }))
}

// Clean per-document names — used for the browser tab and the print/save filename.
const TITLE_OVERRIDES: Record<string, string> = {
  'legal/mud-bond-framework': 'MUD Bond Framework',
  'compliance/aml-kyc-procedures': 'AML-KYC Procedures',
  'financial/phase-1-financial-model': 'Phase 1 Financial Model',
}

function docTitle(slugPath: string): string {
  if (TITLE_OVERRIDES[slugPath]) return TITLE_OVERRIDES[slugPath]
  const last = slugPath.split('/').pop() || ''
  return last
    .split('-')
    .map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(' ')
}

// Setting an absolute title makes the print-to-PDF filename per-document
// (e.g. "Abundancia - Executive Summary") instead of the site-wide default.
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata> {
  const slugPath = params.slug.join('/')
  const doc = DOCUMENT_MAP[slugPath] ?? PAGE_DOCS[slugPath]
  const name = doc ? `Abundancia - ${docTitle(slugPath)}` : 'Abundancia Data Room'
  return { title: { absolute: name } }
}

export default async function DocumentViewerPage({
  params,
}: {
  params: { slug: string[] }
}) {
  const slugPath = params.slug.join('/')
  const pageDoc = PAGE_DOCS[slugPath]
  const doc = DOCUMENT_MAP[slugPath]

  if (!doc && !pageDoc) notFound()

  let content = ''
  if (doc) {
    try {
      content = await readFile(join(DOCS_DIR, doc.file), 'utf-8')
    } catch {
      notFound()
    }
  }
  const category = doc?.category ?? pageDoc.category

  return (
    <div className="min-h-screen bg-canvas print:bg-white relative -mt-24 print:mt-0 pt-0 print:pt-0">
      {/* Single compact top bar (global nav is hidden on this route) */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-neutral-200 shadow-sm print:hidden">
        <div className="w-full sm:w-[70vw] mx-auto flex items-center justify-between py-2.5 sm:py-3 px-4 sm:px-6">
          <Link
            href="/data-room"
            className="group inline-flex items-center gap-1.5 text-neutral-600 hover:text-primary-800 transition-colors font-accent text-[13px] sm:text-sm uppercase tracking-wide"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Data Room
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:block font-accent text-xs uppercase tracking-widest text-neutral-500">
              {category}
            </span>
            {!pageDoc && <PrintButton />}
          </div>
        </div>
      </div>

      {/* Document content */}
      <article className="w-full sm:w-[70vw] mx-auto px-4 sm:px-6 pt-5 sm:pt-10 pb-12 sm:pb-16 print:py-0 print:w-full print:px-0">
        {pageDoc ? (
          <PageImagesViewer title={docTitle(slugPath)} pages={pageDoc.pages} />
        ) : (
        <div className="max-w-4xl mx-auto print:max-w-none">
          <div className="bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden print:shadow-none print:border-0 print:rounded-none">
            <div className="px-6 sm:px-10 lg:px-12 py-8 sm:py-10 lg:py-12 print:px-0 print:py-0">
              <MarkdownViewer content={content} />
            </div>
          </div>
        </div>
        )}
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
