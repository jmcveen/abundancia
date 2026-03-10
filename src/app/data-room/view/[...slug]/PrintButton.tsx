'use client'

import { Printer } from 'lucide-react'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 font-accent font-semibold uppercase text-xs tracking-wider px-4 py-2 rounded-lg bg-primary-800 text-white hover:bg-primary-900 transition-colors duration-200"
    >
      <Printer className="w-4 h-4" />
      Print
    </button>
  )
}
