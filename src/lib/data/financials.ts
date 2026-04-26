// ═══════════════════════════════════════════════════════════════════════════
// Financial Data - Abundancia Austin
// Source: Financial Model Spreadsheet (Simple Pro Forma & Main Inputs tabs)
// Capital Raise: $12.5M | LP IRR: 34.19% | LP EMx: 3.83x
// Updated: 2026-04-16 — aligned to current model (Simple Pro Forma)
// ═══════════════════════════════════════════════════════════════════════════

export const SCENARIOS = ['conservative', 'base', 'optimistic'] as const
export type Scenario = (typeof SCENARIOS)[number]

export const SCENARIO_LABELS: Record<Scenario, string> = {
  conservative: 'Conservative',
  base: 'Base Case',
  optimistic: 'Optimistic',
}

// ─── Key Metrics ─────────────────────────────────────────────────────────
// Base case from Simple Pro Forma (LP IRR at Year 10 = 34.19%, EMx = 3.83x)
// Conservative/Optimistic scaled at ±18% of base revenue
//
// IRR source: Simple Pro Forma row 49 "Cumulative LP IRR" at Year 10
// EMx source: Simple Pro Forma row 50 "Equity Multiple" at Year 10
// Revenue source: Simple Pro Forma row 8 "Total Revenue" 10-year sum = $387.7M
// EBITDA source: Simple Pro Forma row 22 "EBITDA" 10-year sum = $86.9M

export const KEY_METRICS: Record<Scenario, {
  irr: number
  emx: number
  revenue10yr: number
  ebitda10yr: number
}> = {
  conservative: { irr: 26, emx: 2.6, revenue10yr: 316_900_000, ebitda10yr: 60_900_000 },
  base: { irr: 34, emx: 3.83, revenue10yr: 387_699_699, ebitda10yr: 86_894_342 },
  optimistic: { irr: 47, emx: 4.6, revenue10yr: 469_900_000, ebitda10yr: 121_700_000 },
}

export const INVESTMENT_DISCLAIMER =
  'For verified accredited investors only. Projected returns are forward-looking and not guaranteed.'

// ─── Unit Mix ────────────────────────────────────────────────────────────
// Source: Financial Model Main Inputs → Summary table
// 665 total structures across the 376-acre development
//
// SFH avgPrice = weighted avg of 100 units at $450–$600/SF per model:
//   10×1,000 + 20×1,500 + 20×2,000 + 20×2,500 + 20×3,500 + 5×4,500 + 5×5,000
//   = 247,500 SF total → $118.5M total sale → $1,185,000/unit avg
// MF avgPrice = $155,250,000 / 350 = $443,571/unit (direct from model)
// Special Residential avgPrice = $8,491,200 / 60 = $141,520/unit (direct from model)
// Lots avgPrice = $250,000 (model Summary table input)

export const UNIT_MIX = [
  { type: 'Single-Family Homes', count: 100, avgPrice: 1_185_000, avgSF: 2_475, avgNightly: 0, revenue10yr: 0 },
  { type: 'Multifamily', count: 350, avgPrice: 443_571, avgSF: 986, avgNightly: 0, revenue10yr: 0 },
  { type: 'Special Residential', count: 60, avgPrice: 141_520, avgSF: 324, avgNightly: 0, revenue10yr: 0 },
  { type: 'Rental Multifamily', count: 75, avgPrice: 0, avgSF: 997, avgNightly: 90, revenue10yr: 11_000_000 },
  { type: 'Special Rental', count: 50, avgPrice: 0, avgSF: 236, avgNightly: 200, revenue10yr: 23_000_000 },
  { type: 'Event Center', count: 1, avgPrice: 0, avgSF: 6_000, avgNightly: 4_000, revenue10yr: 9_000_000 },
  { type: 'Lots', count: 100, avgPrice: 250_000, avgSF: 0, avgNightly: 0, revenue10yr: 0 },
]

// ─── Revenue Streams (10-Year Cumulative) ────────────────────────────────
// Source: Simple Pro Forma 10-Year Totals (base case exact values)
//
// Base case breakdown:
//   Residential Sales row 6 sum:  $320,887,072
//   Rental Income row 4 sum:       $43,588,445
//   Lot Sales row 7 sum:           $15,386,709
//   Commercial Leasing row 5 sum:   $7,837,474
//   Total:                        $387,699,700
//
// Conservative / Optimistic: scaled at 81.7% / 121.2% of base

export const REVENUE_STREAMS: Record<Scenario, { name: string; value: number; color: string }[]> = {
  conservative: [
    { name: 'Residential Sales', value: 262_185_000, color: '#1E4528' },
    { name: 'Rental Income', value: 35_611_000, color: '#2D6B3F' },
    { name: 'Lot Sales', value: 12_571_000, color: '#4A8C5C' },
    { name: 'Commercial Leasing', value: 6_403_000, color: '#C4956A' },
  ],
  base: [
    { name: 'Residential Sales', value: 320_887_072, color: '#1E4528' },
    { name: 'Rental Income', value: 43_588_445, color: '#2D6B3F' },
    { name: 'Lot Sales', value: 15_386_709, color: '#4A8C5C' },
    { name: 'Commercial Leasing', value: 7_837_474, color: '#C4956A' },
  ],
  optimistic: [
    { name: 'Residential Sales', value: 388_915_000, color: '#1E4528' },
    { name: 'Rental Income', value: 52_829_000, color: '#2D6B3F' },
    { name: 'Lot Sales', value: 18_649_000, color: '#4A8C5C' },
    { name: 'Commercial Leasing', value: 9_499_000, color: '#C4956A' },
  ],
}

// ─── Revenue by Year ─────────────────────────────────────────────────────
// Base case: exact values from Simple Pro Forma rows 8 / 20 / 22
// Conservative: base × 0.817 | Optimistic: base × 1.212
//
// Key: residential sellout concentrates in Years 2–5; recurring revenue
// (rental + commercial) dominates Years 6–10.

export const REVENUE_BY_YEAR: Record<Scenario, { year: number; revenue: number; expenses: number; ebitda: number }[]> = {
  conservative: [
    { year: 1, revenue: 0, expenses: 9_208_000, ebitda: -9_208_000 },
    { year: 2, revenue: 14_973_000, expenses: 12_762_000, ebitda: 2_221_000 },
    { year: 3, revenue: 76_134_000, expenses: 55_091_000, ebitda: 21_134_000 },
    { year: 4, revenue: 53_139_000, expenses: 52_520_000, ebitda: 618_000 },
    { year: 5, revenue: 143_043_000, expenses: 106_159_000, ebitda: 36_905_000 },
    { year: 6, revenue: 5_516_000, expenses: 2_001_000, ebitda: 3_516_000 },
    { year: 7, revenue: 5_712_000, expenses: 2_006_000, ebitda: 3_708_000 },
    { year: 8, revenue: 5_908_000, expenses: 2_011_000, ebitda: 3_901_000 },
    { year: 9, revenue: 6_101_000, expenses: 2_017_000, ebitda: 4_085_000 },
    { year: 10, revenue: 6_297_000, expenses: 2_023_000, ebitda: 4_274_000 },
  ],
  base: [
    { year: 1, revenue: 0, expenses: 11_270_594, ebitda: -11_270_594 },
    { year: 2, revenue: 18_327_310, expenses: 15_608_568, ebitda: 2_718_742 },
    { year: 3, revenue: 93_164_492, expenses: 67_431_485, ebitda: 25_733_007 },
    { year: 4, revenue: 65_041_134, expenses: 64_283_658, ebitda: 757_476 },
    { year: 5, revenue: 175_022_442, expenses: 129_899_798, ebitda: 45_122_644 },
    { year: 6, revenue: 6_751_015, expenses: 2_448_391, ebitda: 4_302_624 },
    { year: 7, revenue: 6_989_939, expenses: 2_455_321, ebitda: 4_534_619 },
    { year: 8, revenue: 7_228_864, expenses: 2_462_251, ebitda: 4_766_613 },
    { year: 9, revenue: 7_467_789, expenses: 2_469_181, ebitda: 4_998_608 },
    { year: 10, revenue: 7_706_714, expenses: 2_476_111, ebitda: 5_230_603 },
  ],
  optimistic: [
    { year: 1, revenue: 0, expenses: 13_660_000, ebitda: -13_660_000 },
    { year: 2, revenue: 22_213_000, expenses: 18_918_000, ebitda: 3_296_000 },
    { year: 3, revenue: 112_915_000, expenses: 81_707_000, ebitda: 31_188_000 },
    { year: 4, revenue: 78_830_000, expenses: 77_920_000, ebitda: 917_000 },
    { year: 5, revenue: 212_127_000, expenses: 157_358_000, ebitda: 54_689_000 },
    { year: 6, revenue: 8_182_000, expenses: 2_968_000, ebitda: 5_215_000 },
    { year: 7, revenue: 8_471_000, expenses: 2_975_000, ebitda: 5_497_000 },
    { year: 8, revenue: 8_761_000, expenses: 2_985_000, ebitda: 5_778_000 },
    { year: 9, revenue: 9_050_000, expenses: 2_993_000, ebitda: 6_055_000 },
    { year: 10, revenue: 9_340_000, expenses: 3_001_000, ebitda: 6_340_000 },
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
//
// Tier 1: Principal repaid first (80% LP / 20% GP)
// Tier 2: After principal, until LP achieves 12% IRR (70% LP / 30% GP)
// Tier 3: After 12% IRR, until LP achieves 15% IRR (60% LP / 40% GP)
// Tier 4: After 15% IRR, until LP achieves 18% IRR (50% LP / 50% GP)

export const WATERFALL = [
  { tier: 'Tier 1 - Return of Capital', lpSplit: 80, gpSplit: 20, threshold: 'Until principal repaid' },
  { tier: 'Tier 2 - 12% IRR', lpSplit: 70, gpSplit: 30, threshold: '12% IRR to LP' },
  { tier: 'Tier 3 - 15% IRR', lpSplit: 60, gpSplit: 40, threshold: '15% IRR to LP' },
  { tier: 'Tier 4 - 18% IRR', lpSplit: 50, gpSplit: 50, threshold: '18% IRR to LP' },
]
