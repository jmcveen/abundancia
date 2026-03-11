// ═══════════════════════════════════════════════════════════════════════════
// Financial Data — Abundancia Austin
// Source: Financial Model Spreadsheet (3. Financial Model) + Investor Deck
// Capital Raise: $12.5M | IRR: 37.12% | EMx: 4.42x
// Updated: 2026-03-11 from Simple Pro Forma & Main Inputs tabs
// ═══════════════════════════════════════════════════════════════════════════

export const SCENARIOS = ['conservative', 'base', 'optimistic'] as const
export type Scenario = (typeof SCENARIOS)[number]

export const SCENARIO_LABELS: Record<Scenario, string> = {
  conservative: 'Conservative',
  base: 'Base Case',
  optimistic: 'Optimistic',
}

// ─── Key Metrics ─────────────────────────────────────────────────────────
// Base case from Simple Pro Forma 10-Year Totals
// Conservative/Optimistic are modeled at ±15-20% adjustments

export const KEY_METRICS: Record<Scenario, {
  irr: number
  emx: number
  revenue10yr: number
  ebitda10yr: number
}> = {
  conservative: { irr: 24, emx: 3.0, revenue10yr: 350_000_000, ebitda10yr: 70_000_000 },
  base: { irr: 37.12, emx: 4.42, revenue10yr: 428_935_061, ebitda10yr: 100_673_704 },
  optimistic: { irr: 45, emx: 5.5, revenue10yr: 520_000_000, ebitda10yr: 140_000_000 },
}

// ─── Unit Mix ────────────────────────────────────────────────────────────
// Source: Financial Model Main Inputs → Summary table
// 665 total structures across the 376-acre development

export const UNIT_MIX = [
  { type: 'Single-Family Homes', count: 100, avgPrice: 450_000, avgSF: 2_475, avgNightly: 0, revenue10yr: 0 },
  { type: 'Multifamily', count: 350, avgPrice: 443_571, avgSF: 986, avgNightly: 0, revenue10yr: 0 },
  { type: 'Special Residential', count: 60, avgPrice: 141_520, avgSF: 324, avgNightly: 0, revenue10yr: 0 },
  { type: 'Rental Multifamily', count: 75, avgPrice: 0, avgSF: 997, avgNightly: 421, revenue10yr: 11_525_116 },
  { type: 'Special Rental', count: 50, avgPrice: 0, avgSF: 236, avgNightly: 1_000, revenue10yr: 23_097_055 },
  { type: 'Lots', count: 100, avgPrice: 250_000, avgSF: 0, avgNightly: 0, revenue10yr: 0 },
]

// ─── Revenue Streams (10-Year Cumulative) ────────────────────────────────
// Source: Simple Pro Forma 10-Year Totals
// Base case: $428.9M total revenue

export const REVENUE_STREAMS: Record<Scenario, { name: string; value: number; color: string }[]> = {
  conservative: [
    { name: 'Residential Sales', value: 289_698_000, color: '#1E4528' },
    { name: 'Rental Income', value: 34_871_000, color: '#2D6B3F' },
    { name: 'Lot Sales', value: 12_309_000, color: '#4A8C5C' },
    { name: 'Commercial Leasing', value: 6_270_000, color: '#C4956A' },
  ],
  base: [
    { name: 'Residential Sales', value: 362_122_434, color: '#1E4528' },
    { name: 'Rental Income', value: 43_588_444, color: '#2D6B3F' },
    { name: 'Lot Sales', value: 15_386_709, color: '#4A8C5C' },
    { name: 'Commercial Leasing', value: 7_837_474, color: '#C4956A' },
  ],
  optimistic: [
    { name: 'Residential Sales', value: 434_547_000, color: '#1E4528' },
    { name: 'Rental Income', value: 52_306_000, color: '#2D6B3F' },
    { name: 'Lot Sales', value: 18_464_000, color: '#4A8C5C' },
    { name: 'Commercial Leasing', value: 9_405_000, color: '#C4956A' },
  ],
}

// ─── Revenue by Year ─────────────────────────────────────────────────────
// Base case from Simple Pro Forma sheet (exact values)
// Conservative/Optimistic modeled at ±20% adjustment

export const REVENUE_BY_YEAR: Record<Scenario, { year: number; revenue: number; expenses: number; ebitda: number }[]> = {
  conservative: [
    { year: 1, revenue: 0, expenses: 9_016_000, ebitda: -9_016_000 },
    { year: 2, revenue: 14_315_000, expenses: 12_487_000, ebitda: 1_828_000 },
    { year: 3, revenue: 67_255_000, expenses: 53_945_000, ebitda: 13_310_000 },
    { year: 4, revenue: 75_064_000, expenses: 63_518_000, ebitda: 11_546_000 },
    { year: 5, revenue: 157_598_000, expenses: 113_793_000, ebitda: 43_805_000 },
    { year: 6, revenue: 5_401_000, expenses: 1_959_000, ebitda: 3_442_000 },
    { year: 7, revenue: 5_592_000, expenses: 1_964_000, ebitda: 3_628_000 },
    { year: 8, revenue: 5_783_000, expenses: 1_970_000, ebitda: 3_813_000 },
    { year: 9, revenue: 5_974_000, expenses: 1_975_000, ebitda: 3_999_000 },
    { year: 10, revenue: 6_165_000, expenses: 1_981_000, ebitda: 4_184_000 },
  ],
  base: [
    { year: 1, revenue: 0, expenses: 11_270_594, ebitda: -11_270_594 },
    { year: 2, revenue: 17_893_422, expenses: 15_608_568, ebitda: 2_284_854 },
    { year: 3, revenue: 84_069_242, expenses: 67_431_485, ebitda: 16_637_757 },
    { year: 4, revenue: 93_830_634, expenses: 79_397_658, ebitda: 14_432_976 },
    { year: 5, revenue: 196_997_442, expenses: 142_241_798, ebitda: 54_755_644 },
    { year: 6, revenue: 6_751_015, expenses: 2_448_391, ebitda: 4_302_624 },
    { year: 7, revenue: 6_989_939, expenses: 2_455_321, ebitda: 4_534_619 },
    { year: 8, revenue: 7_228_864, expenses: 2_462_251, ebitda: 4_766_613 },
    { year: 9, revenue: 7_467_789, expenses: 2_469_181, ebitda: 4_998_608 },
    { year: 10, revenue: 7_706_714, expenses: 2_476_111, ebitda: 5_230_603 },
  ],
  optimistic: [
    { year: 1, revenue: 0, expenses: 13_525_000, ebitda: -13_525_000 },
    { year: 2, revenue: 21_472_000, expenses: 18_730_000, ebitda: 2_742_000 },
    { year: 3, revenue: 100_883_000, expenses: 80_918_000, ebitda: 19_965_000 },
    { year: 4, revenue: 112_597_000, expenses: 95_277_000, ebitda: 17_320_000 },
    { year: 5, revenue: 236_397_000, expenses: 170_690_000, ebitda: 65_707_000 },
    { year: 6, revenue: 8_101_000, expenses: 2_938_000, ebitda: 5_163_000 },
    { year: 7, revenue: 8_388_000, expenses: 2_946_000, ebitda: 5_442_000 },
    { year: 8, revenue: 8_675_000, expenses: 2_955_000, ebitda: 5_720_000 },
    { year: 9, revenue: 8_961_000, expenses: 2_963_000, ebitda: 5_998_000 },
    { year: 10, revenue: 9_248_000, expenses: 2_971_000, ebitda: 6_277_000 },
  ],
}

// ─── Use of Funds ($12.5M Capital Raise) ─────────────────────────────────
// Source: Investor Deck slide 31
// Total: $12,473,002

export const USE_OF_FUNDS = [
  { name: 'Land Acquisition', value: 3_945_000, percentage: 32, color: '#1E4528' },
  { name: 'Hard Costs', value: 1_798_304, percentage: 14, color: '#2D6B3F' },
  { name: 'Site Work', value: 1_761_323, percentage: 14, color: '#4A8C5C' },
  { name: 'Master Planning & Architecture', value: 1_340_596, percentage: 11, color: '#6DAF7B' },
  { name: 'Staffing, Ops & Marketing', value: 1_400_771, percentage: 11, color: '#C4956A' },
  { name: 'Contingency & Carry Costs', value: 2_227_007, percentage: 18, color: '#A67C52' },
]

// ─── Waterfall Distribution ──────────────────────────────────────────────
// Source: Investor Deck slide 30 — Investment Opportunity Terms
// LP-favorable structure with IRR-based tier progression

export const WATERFALL = [
  { tier: 'Tier 1 — Return of Capital', lpSplit: 80, gpSplit: 20, threshold: 'Until principal repaid' },
  { tier: 'Tier 2 — 12% IRR', lpSplit: 70, gpSplit: 30, threshold: '12% IRR to LP' },
  { tier: 'Tier 3 — 15% IRR', lpSplit: 60, gpSplit: 40, threshold: '15% IRR to LP' },
  { tier: 'Tier 4 — 18% IRR', lpSplit: 50, gpSplit: 50, threshold: '18% IRR to LP' },
]
