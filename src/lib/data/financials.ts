// ═══════════════════════════════════════════════════════════════════════════
// Financial Data — Abundancia Austin
// Source: Financial Model Spreadsheet + Investor Decks
// Capital Raise: $12.5M | IRR: 37.1% | EMx: 4.42x
// ═══════════════════════════════════════════════════════════════════════════

export const SCENARIOS = ['conservative', 'base', 'optimistic'] as const
export type Scenario = (typeof SCENARIOS)[number]

export const SCENARIO_LABELS: Record<Scenario, string> = {
  conservative: 'Conservative',
  base: 'Base Case',
  optimistic: 'Optimistic',
}

// ─── Key Metrics ─────────────────────────────────────────────────────────

export const KEY_METRICS: Record<Scenario, {
  irr: number
  emx: number
  revenue10yr: number
  ebitda10yr: number
}> = {
  conservative: { irr: 24, emx: 3.0, revenue10yr: 350_000_000, ebitda10yr: 70_000_000 },
  base: { irr: 37.1, emx: 4.42, revenue10yr: 435_000_000, ebitda10yr: 104_000_000 },
  optimistic: { irr: 45, emx: 5.5, revenue10yr: 520_000_000, ebitda10yr: 140_000_000 },
}

// ─── Unit Mix ────────────────────────────────────────────────────────────

export const UNIT_MIX = [
  { type: 'Single-Family Homes', count: 100, avgPrice: 625_000, avgSF: 1_900 },
  { type: 'Tiny Homes', count: 30, avgPrice: 200_000, avgSF: 600 },
  { type: 'Domes', count: 30, avgPrice: 225_000, avgSF: 600 },
  { type: 'Multifamily', count: 260, avgPrice: 408_000, avgSF: 1_100 },
  { type: 'Lots', count: 200, avgPrice: 350_000, avgSF: 0 },
  { type: 'Rental Units', count: 60, avgPrice: 0, avgSF: 800, avgNightly: 233 },
]

// ─── Revenue Streams (10-Year Cumulative) ────────────────────────────────

export const REVENUE_STREAMS: Record<Scenario, { name: string; value: number; color: string }[]> = {
  conservative: [
    { name: 'Residential Sales', value: 290_000_000, color: '#1E4528' },
    { name: 'Rental Income', value: 34_800_000, color: '#2D6B3F' },
    { name: 'Lot Sales', value: 12_300_000, color: '#4A8C5C' },
    { name: 'Commercial Leasing', value: 6_200_000, color: '#C4956A' },
    { name: 'Retreat Center', value: 4_700_000, color: '#C9A227' },
  ],
  base: [
    { name: 'Residential Sales', value: 362_000_000, color: '#1E4528' },
    { name: 'Rental Income', value: 43_600_000, color: '#2D6B3F' },
    { name: 'Lot Sales', value: 15_400_000, color: '#4A8C5C' },
    { name: 'Commercial Leasing', value: 7_800_000, color: '#C4956A' },
    { name: 'Retreat Center', value: 6_300_000, color: '#C9A227' },
  ],
  optimistic: [
    { name: 'Residential Sales', value: 434_000_000, color: '#1E4528' },
    { name: 'Rental Income', value: 52_300_000, color: '#2D6B3F' },
    { name: 'Lot Sales', value: 18_500_000, color: '#4A8C5C' },
    { name: 'Commercial Leasing', value: 9_400_000, color: '#C4956A' },
    { name: 'Retreat Center', value: 7_800_000, color: '#C9A227' },
  ],
}

// ─── Revenue by Year (Base Case) ─────────────────────────────────────────

export const REVENUE_BY_YEAR: Record<Scenario, { year: number; revenue: number; expenses: number; ebitda: number }[]> = {
  conservative: [
    { year: 1, revenue: 2_000_000, expenses: 5_000_000, ebitda: -3_000_000 },
    { year: 2, revenue: 12_000_000, expenses: 14_000_000, ebitda: -2_000_000 },
    { year: 3, revenue: 28_000_000, expenses: 24_000_000, ebitda: 4_000_000 },
    { year: 4, revenue: 38_000_000, expenses: 30_000_000, ebitda: 8_000_000 },
    { year: 5, revenue: 42_000_000, expenses: 32_000_000, ebitda: 10_000_000 },
    { year: 6, revenue: 44_000_000, expenses: 33_000_000, ebitda: 11_000_000 },
    { year: 7, revenue: 46_000_000, expenses: 34_000_000, ebitda: 12_000_000 },
    { year: 8, revenue: 46_000_000, expenses: 34_000_000, ebitda: 12_000_000 },
    { year: 9, revenue: 46_000_000, expenses: 34_000_000, ebitda: 12_000_000 },
    { year: 10, revenue: 46_000_000, expenses: 34_000_000, ebitda: 12_000_000 },
  ],
  base: [
    { year: 1, revenue: 3_000_000, expenses: 5_500_000, ebitda: -2_500_000 },
    { year: 2, revenue: 18_000_000, expenses: 16_000_000, ebitda: 2_000_000 },
    { year: 3, revenue: 38_000_000, expenses: 28_000_000, ebitda: 10_000_000 },
    { year: 4, revenue: 50_000_000, expenses: 34_000_000, ebitda: 16_000_000 },
    { year: 5, revenue: 55_000_000, expenses: 36_000_000, ebitda: 19_000_000 },
    { year: 6, revenue: 56_000_000, expenses: 37_000_000, ebitda: 19_000_000 },
    { year: 7, revenue: 57_000_000, expenses: 37_000_000, ebitda: 20_000_000 },
    { year: 8, revenue: 55_000_000, expenses: 36_000_000, ebitda: 19_000_000 },
    { year: 9, revenue: 52_000_000, expenses: 35_000_000, ebitda: 17_000_000 },
    { year: 10, revenue: 51_000_000, expenses: 36_000_000, ebitda: 15_000_000 },
  ],
  optimistic: [
    { year: 1, revenue: 4_000_000, expenses: 6_000_000, ebitda: -2_000_000 },
    { year: 2, revenue: 24_000_000, expenses: 18_000_000, ebitda: 6_000_000 },
    { year: 3, revenue: 48_000_000, expenses: 32_000_000, ebitda: 16_000_000 },
    { year: 4, revenue: 62_000_000, expenses: 38_000_000, ebitda: 24_000_000 },
    { year: 5, revenue: 68_000_000, expenses: 40_000_000, ebitda: 28_000_000 },
    { year: 6, revenue: 70_000_000, expenses: 41_000_000, ebitda: 29_000_000 },
    { year: 7, revenue: 68_000_000, expenses: 40_000_000, ebitda: 28_000_000 },
    { year: 8, revenue: 65_000_000, expenses: 39_000_000, ebitda: 26_000_000 },
    { year: 9, revenue: 60_000_000, expenses: 38_000_000, ebitda: 22_000_000 },
    { year: 10, revenue: 51_000_000, expenses: 37_000_000, ebitda: 14_000_000 },
  ],
}

// ─── Use of Funds ($12.5M Capital Raise) ─────────────────────────────────

export const USE_OF_FUNDS = [
  { name: 'Land Acquisition', value: 4_000_000, percentage: 32, color: '#1E4528' },
  { name: 'Hard Costs', value: 1_750_000, percentage: 14, color: '#2D6B3F' },
  { name: 'Site Work', value: 1_750_000, percentage: 14, color: '#4A8C5C' },
  { name: 'Master Planning', value: 1_375_000, percentage: 11, color: '#6DAF7B' },
  { name: 'Staffing & Operations', value: 750_000, percentage: 6, color: '#C4956A' },
  { name: 'Marketing', value: 625_000, percentage: 5, color: '#C9A227' },
  { name: 'Contingency', value: 2_250_000, percentage: 18, color: '#A67C52' },
]

// ─── Waterfall Distribution ──────────────────────────────────────────────

export const WATERFALL = [
  { tier: 'Return of Capital', lpSplit: 100, gpSplit: 0, threshold: 'First $12.5M' },
  { tier: 'Preferred Return', lpSplit: 80, gpSplit: 20, threshold: '8% Preferred' },
  { tier: 'Tier 2', lpSplit: 70, gpSplit: 30, threshold: '1.5x-2.0x' },
  { tier: 'Tier 3', lpSplit: 60, gpSplit: 40, threshold: '2.0x-3.0x' },
  { tier: 'Tier 4', lpSplit: 50, gpSplit: 50, threshold: '3.0x+' },
]
