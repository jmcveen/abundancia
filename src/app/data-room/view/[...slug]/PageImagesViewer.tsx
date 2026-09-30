'use client'

import { useState } from 'react'
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'

export interface PageImage {
  src: string
  width: number
  height: number
}

const ZOOM_STEPS = [1, 1.5, 2, 3, 4]

/**
 * Shows a document as a stack of page images inside the data room, with zoom
 * controls (pinch-to-zoom also works). Used for spreadsheet exports so investors
 * read them in place instead of downloading a file.
 */
export function PageImagesViewer({ title, pages }: { title: string; pages: PageImage[] }) {
  const [step, setStep] = useState(0)
  const zoom = ZOOM_STEPS[step]
  const btn =
    'inline-flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 bg-white text-primary-800 hover:bg-primary-50 disabled:opacity-40 disabled:hover:bg-white transition-colors'

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="font-display text-2xl sm:text-3xl text-primary-800 leading-tight">{title}</h1>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" className={btn} onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} aria-label="Zoom out">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-accent text-xs text-neutral-500 w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button type="button" className={btn} onClick={() => setStep(s => Math.min(ZOOM_STEPS.length - 1, s + 1))} disabled={step === ZOOM_STEPS.length - 1} aria-label="Zoom in">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button type="button" className={btn} onClick={() => setStep(0)} disabled={step === 0} aria-label="Fit to width">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl" onContextMenu={e => e.preventDefault()}>
        <div className="space-y-4 sm:space-y-6" style={{ width: `${zoom * 100}%` }}>
          {pages.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.src}
              src={p.src}
              width={p.width}
              height={p.height}
              alt={`${title}, page ${i + 1} of ${pages.length}`}
              loading={i < 2 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              className="block w-full h-auto bg-white rounded-xl shadow-lg border border-neutral-100 select-none"
            />
          ))}
        </div>
      </div>
      <p className="mt-4 text-center font-accent text-xs text-neutral-400">{pages.length} pages</p>
    </div>
  )
}
