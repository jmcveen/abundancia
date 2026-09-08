// ═══════════════════════════════════════════════════════════════════════════
// Financial Data — Abundancia Austin
//
// SCOPE: every figure on this page describes PHASE 1 — the scope funded by the
// current offering. Phase 1 stands on its own; it does not depend on Phases 2-3
// proceeding. Full-project figures are context only and live in the data room,
// deliberately NOT mixed in here.
//
// Source: Phase-1 financial model (Simple Pro Forma + Main Inputs) and the two
// Phase-1 waterfall workbooks (all-equity / with-notes), September 2026.
// Phase-1 capitalization $15,939,072 · 10-yr revenue $63,557,464 · EBITDA $23,413,145
// ═══════════════════════════════════════════════════════════════════════════

export const SCENARIOS = ['conservative', 'base', 'optimistic'] as const
export type Scenario = (typeof SCENARIOS)[number]

export const SCENARIO_LABELS: Record<Scenario, string> = {
  conservative: 'Conservative',
  base: 'Base Case',
  optimistic: 'Optimistic',
}

// Base Case is the Phase-1 model exactly. Conservative and Optimistic are
// SENSITIVITIES applied to it, not separate model runs:
//   conservative — revenue x0.85, expenses x0.96 (only selling costs flex down)
//   optimistic   — revenue x1.15, expenses x1.02
export const SCENARIO_BASIS: Record<Scenario, string> = {
  conservative: 'Base case with revenue 15% lower; costs flex down only 4%.',
  base: 'The Phase-1 financial model exactly, as filed in the data room.',
  optimistic: 'Base case with revenue 15% higher and costs 2% higher.',
}

// NOTE ON RETURNS. The scenario toggle is a sensitivity on the OPERATING pro
// forma (revenue, expenses, EBITDA). It does not re-run the distribution
// waterfall, so there is no modeled conservative or optimistic IRR — inventing
// one would be a guess dressed as an output. `irr` and `emx` therefore carry
// the BASE-CASE ELECTION A figures on every scenario: the lower of the two
// structures, so no page overstates. Election B reaches 34.81% / 3.655x and is
// presented in full in the Election section of /financials.
export const KEY_METRICS: Record<Scenario, {
  irr: number
  emx: number
  revenue10yr: number
  ebitda10yr: number
  capitalization: number
  capitalReturnedByYear: number
}> = {
  conservative: { irr: 26.02, emx: 2.449, revenue10yr: 54_023_844, ebitda10yr: 15_485_300, capitalization: 15_939_072, capitalReturnedByYear: 3 },
  base: { irr: 26.02, emx: 2.449, revenue10yr: 63_557_465, ebitda10yr: 23_413_148, capitalization: 15_939_072, capitalReturnedByYear: 3 },
  optimistic: { irr: 26.02, emx: 2.449, revenue10yr: 73_091_086, ebitda10yr: 32_143_883, capitalization: 15_939_072, capitalReturnedByYear: 3 },
}

// The full picture, for any page that wants to state the range honestly.
export const RETURNS_RANGE = {
  label: 'Base case · Election A to Election B',
  irrLow: 26.02,
  irrHigh: 34.81,
  emxLow: 2.449,
  emxHigh: 3.655,
}

export const INVESTMENT_DISCLAIMER =
  'For verified accredited investors only. Projected returns are forward-looking and not guaranteed. Nothing here is an offer of securities.'

// ─── Phase-1 Revenue Streams (10-Year Cumulative) ────────────────────────
export const REVENUE_STREAMS: Record<Scenario, { name: string; value: number; color: string }[]> = {
  conservative: [
    { name: 'Residential Sales', value: 7_527_874, color: '#1E4528' },
    { name: 'Rental & Hospitality', value: 35_265_590, color: '#2D6B3F' },
    { name: 'Lot Sales', value: 9_194_832, color: '#4A8C5C' },
    { name: 'Commercial Leasing', value: 2_035_550, color: '#C4956A' },
  ],
  base: [
    { name: 'Residential Sales', value: 8_856_322, color: '#1E4528' },
    { name: 'Rental & Hospitality', value: 41_488_929, color: '#2D6B3F' },
    { name: 'Lot Sales', value: 10_817_449, color: '#4A8C5C' },
    { name: 'Commercial Leasing', value: 2_394_765, color: '#C4956A' },
  ],
  optimistic: [
    { name: 'Residential Sales', value: 10_184_770, color: '#1E4528' },
    { name: 'Rental & Hospitality', value: 47_712_268, color: '#2D6B3F' },
    { name: 'Lot Sales', value: 12_440_066, color: '#4A8C5C' },
    { name: 'Commercial Leasing', value: 2_753_980, color: '#C4956A' },
  ],
}

// ─── Phase-1 Revenue by Year (Year 1 = 2027) ─────────────────────────────
export const REVENUE_BY_YEAR: Record<Scenario, { year: number; revenue: number; expenses: number; ebitda: number }[]> = {
  conservative: [
    { year: 1, revenue: 0, expenses: 13_545_537, ebitda: -13_545_537 },
    { year: 2, revenue: 14_863_347, expenses: 9_058_506, ebitda: 5_804_841 },
    { year: 3, revenue: 8_474_609, expenses: 2_281_921, ebitda: 6_192_688 },
    { year: 4, revenue: 3_934_177, expenses: 2_182_367, ebitda: 1_751_810 },
    { year: 5, revenue: 4_084_018, expenses: 2_018_490, ebitda: 2_065_528 },
    { year: 6, revenue: 4_233_858, expenses: 1_865_951, ebitda: 2_367_907 },
    { year: 7, revenue: 4_383_698, expenses: 1_878_148, ebitda: 2_505_550 },
    { year: 8, revenue: 4_533_539, expenses: 1_890_345, ebitda: 2_643_194 },
    { year: 9, revenue: 4_683_379, expenses: 1_902_541, ebitda: 2_780_838 },
    { year: 10, revenue: 4_833_219, expenses: 1_914_738, ebitda: 2_918_481 },
  ],
  base: [
    { year: 1, revenue: 0, expenses: 14_109_934, ebitda: -14_109_934 },
    { year: 2, revenue: 17_486_291, expenses: 9_435_944, ebitda: 8_050_347 },
    { year: 3, revenue: 9_970_128, expenses: 2_377_001, ebitda: 7_593_127 },
    { year: 4, revenue: 4_628_444, expenses: 2_273_299, ebitda: 2_355_145 },
    { year: 5, revenue: 4_804_727, expenses: 2_102_594, ebitda: 2_702_133 },
    { year: 6, revenue: 4_981_010, expenses: 1_943_699, ebitda: 3_037_311 },
    { year: 7, revenue: 5_157_292, expenses: 1_956_404, ebitda: 3_200_888 },
    { year: 8, revenue: 5_333_575, expenses: 1_969_109, ebitda: 3_364_466 },
    { year: 9, revenue: 5_509_858, expenses: 1_981_814, ebitda: 3_528_044 },
    { year: 10, revenue: 5_686_140, expenses: 1_994_519, ebitda: 3_691_621 },
  ],
  optimistic: [
    { year: 1, revenue: 0, expenses: 14_392_133, ebitda: -14_392_133 },
    { year: 2, revenue: 20_109_235, expenses: 9_624_663, ebitda: 10_484_572 },
    { year: 3, revenue: 11_465_647, expenses: 2_424_541, ebitda: 9_041_106 },
    { year: 4, revenue: 5_322_711, expenses: 2_318_765, ebitda: 3_003_946 },
    { year: 5, revenue: 5_525_436, expenses: 2_144_646, ebitda: 3_380_790 },
    { year: 6, revenue: 5_728_162, expenses: 1_982_573, ebitda: 3_745_589 },
    { year: 7, revenue: 5_930_886, expenses: 1_995_532, ebitda: 3_935_354 },
    { year: 8, revenue: 6_133_611, expenses: 2_008_491, ebitda: 4_125_120 },
    { year: 9, revenue: 6_336_337, expenses: 2_021_450, ebitda: 4_314_887 },
    { year: 10, revenue: 6_539_061, expenses: 2_034_409, ebitda: 4_504_652 },
  ],
}
// ─── The Election: two capital structures, one Phase-1 offering ──────────
// Both raise an identical $15,939,072 and run on identical Phase-1 operating
// economics. Only the treatment of the $4,000,000 land tranche differs.
// Source: phase1_all_equity_no_notes.xlsx and phase1_waterfall_with_notes_7.xlsx
// Figures are the BASE CASE. The scenario toggle above applies to the operating
// pro forma; it does not re-run the waterfall.

export type ElectionKey = 'a' | 'b'

export const ELECTIONS: Record<ElectionKey, {
  key: ElectionKey
  name: string
  tagline: string
  lpEquity: number
  gpCoInvest: number
  constructionDebt: number
  landNotes: number
  totalCapital: number
  irr10yr: number
  irr5yr: number
  emx10yr: number
  emx5yr: number
  lpDistributions10yr: number
  lpDistributions5yr: number
  lpNetProfit10yr: number
  roi10yr: number
  roi5yr: number
  lpShareOfDistributions: number
  per100k5yr: number
  per100k10yr: number
  tradeoff: string
}> = {
  a: {
    key: 'a',
    name: 'Election A — All Equity',
    tagline: 'The land money shares in the upside.',
    lpEquity: 7_739_072,
    gpCoInvest: 500_000,
    constructionDebt: 7_700_000,
    landNotes: 0,
    totalCapital: 15_939_072,
    irr10yr: 26.02,
    irr5yr: 20.07,
    emx10yr: 2.449,
    emx5yr: 1.652,
    lpDistributions10yr: 18_955_089,
    lpDistributions5yr: 12_781_189,
    lpNetProfit10yr: 11_216_017,
    roi10yr: 144.9,
    roi5yr: 65.2,
    lpShareOfDistributions: 70.26,
    per100k5yr: 165_151,
    per100k10yr: 244_927,
    tradeoff:
      'The $4,000,000 land tranche is raised as equity. No balloon, no interest clock, no foreclosure risk — and that capital participates in project upside through the same waterfall as the rest of the LP money. A larger equity base spreads the same profit across more dollars, so the multiple is lower than Election B.',
  },
  b: {
    key: 'b',
    name: 'Election B — Secured Notes',
    tagline: 'The land money is lent, not invested.',
    lpEquity: 3_739_072,
    gpCoInvest: 500_000,
    constructionDebt: 7_700_000,
    landNotes: 4_000_000,
    totalCapital: 15_939_072,
    irr10yr: 34.81,
    irr5yr: 28.04,
    emx10yr: 3.655,
    emx5yr: 2.104,
    lpDistributions10yr: 13_664_480,
    lpDistributions5yr: 7_866_963,
    lpNetProfit10yr: 9_925_408,
    roi10yr: 265.5,
    roi5yr: 110.4,
    lpShareOfDistributions: 61.17,
    per100k5yr: 210_399,
    per100k10yr: 365_451,
    tradeoff:
      'The $4,000,000 land tranche is raised as secured promissory notes at 10% interest-only, repaid as a balloon in Year 2 from micro-villa sales. Note holders rank ahead of equity and take no upside, so the same profit is shared across a smaller equity base — which is what lifts the LP return. The note carries repayment risk that equity does not.',
  },
}

// Secured note terms — Election B only. The note is debt, not equity: it is
// repaid ahead of any distribution and participates in no upside.
export const NOTE_TERMS = {
  principal: 4_000_000,
  interestRate: 10,
  structure: 'Interest-only, balloon repayment in Year 2 from micro-villa sale proceeds',
  totalInterest: 800_000,
  totalRepayment: 4_800_000,
  holderIrr: 9.54,
  holderMultiple: 1.2,
  security:
    'Secured by a lien on the Property that is SUBORDINATE to the construction lender’s first-priority lien.',
}

// ─── Unit Mix ────────────────────────────────────────────────────────────
// Phase 1 delivers the micro-villas, the nature-stay portfolio, the event
// house, the first amenities and 80 of the 100 lots. Homes and condominiums
// are Phase 2-3 and are shown for context, with no Phase-1 revenue attributed.
// Source: Total-project model, Hard Cost Variables + Unit Mix Summary.

export const UNIT_MIX = [
  { type: 'Single-Family Homes (standard)', phase: 2, count: 90, avgPrice: 950_000, avgSF: 2_111, avgNightly: 0, revenue10yr: 0 },
  { type: 'Luxury Estate Homes', phase: 2, count: 10, avgPrice: 2_520_000, avgSF: 4_200, avgNightly: 0, revenue10yr: 0 },
  { type: 'Condominiums (for sale)', phase: 3, count: 200, avgPrice: 399_375, avgSF: 888, avgNightly: 0, revenue10yr: 0 },
  { type: 'Rental Condominiums', phase: 3, count: 75, avgPrice: 0, avgSF: 997, avgNightly: 90, revenue10yr: 0 },
  { type: 'Micro Villas (for sale)', phase: 1, count: 60, avgPrice: 141_520, avgSF: 324, avgNightly: 0, revenue10yr: 8_856_322 },
  { type: 'Regen Villas, Domes & Glamping', phase: 1, count: 60, avgPrice: 0, avgSF: 249, avgNightly: 200, revenue10yr: 41_488_929 },
  { type: 'Retreat & Event Center', phase: 1, count: 1, avgPrice: 0, avgSF: 6_000, avgNightly: 4_000, revenue10yr: 0 },
  { type: 'Residential Lots', phase: 1, count: 100, avgPrice: 150_000, avgSF: 0, avgNightly: 0, revenue10yr: 10_817_449 },
]

// ─── Use of Funds — Phase-1 Year-1 draw ──────────────────────────────────
// Source: Phase-1 model, Year-1 column. These are the Year-1 construction and
// land uses ($14,109,934). The balance of the $15,939,072 raised covers Year-1
// debt service ($1,173,539) and the developer fee, leaving a working cushion.

export const USE_OF_FUNDS = [
  { name: 'Land Acquisition', value: 3_505_253, percentage: 25, color: '#1E4528' },
  { name: 'Nature-Stay & Rental Build', value: 2_186_574, percentage: 15, color: '#2D6B3F' },
  { name: 'Amenities & Commercial', value: 3_195_000, percentage: 23, color: '#4A8C5C' },
  { name: 'Site Work & Infrastructure', value: 1_621_762, percentage: 11, color: '#6DAF7B' },
  { name: 'Soft Costs (A&E, permits, DD)', value: 1_119_044, percentage: 8, color: '#8FC79B' },
  { name: 'Staffing, Ops & Marketing', value: 1_199_579, percentage: 9, color: '#C4956A' },
  { name: 'Contingency (10%)', value: 1_282_721, percentage: 9, color: '#A67C52' },
]

export const USE_OF_FUNDS_TOTAL = 14_109_933

// ─── Waterfall Distribution ──────────────────────────────────────────────
// Source: both Phase-1 waterfall workbooks (identical terms).
// 10% cumulative preferred return plus return of capital first, then a GP
// catch-up, then the residual splits by the LP IRR band reached.

export const WATERFALL = [
  { tier: 'Preferred Return + Return of Capital', lpSplit: 100, gpSplit: 0, threshold: '10% cumulative pref, then capital returned' },
  { tier: 'Tier 1 — below 12% LP IRR', lpSplit: 90, gpSplit: 10, threshold: 'Residual under the 12% hurdle' },
  { tier: 'Tier 2 — 12% to 15% LP IRR', lpSplit: 80, gpSplit: 20, threshold: '12%-15% band' },
  { tier: 'Tier 3 — 15% to 18% LP IRR', lpSplit: 70, gpSplit: 30, threshold: '15%-18% band' },
  { tier: 'Tier 4 — above 18% LP IRR', lpSplit: 60, gpSplit: 40, threshold: 'Above 18%, uncapped' },
]

export const WATERFALL_NOTES = [
  'A 20% reserve is withheld from cash flow each year as a safety buffer and released in Year 10.',
  'A 4% developer fee applies — $637,563 under Election A, $477,563 under Election B.',
  'The GP co-invests $500,000 pari passu with LP capital.',
  'Under both Elections the LP class retains the majority of total distributions: 70.3% under A, 61.2% under B.',
]
