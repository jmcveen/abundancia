# ABUNDANCIA

---

## Sensitivity Analysis

**Confidential Investment Memorandum**

---

**Document 08** | Data Room - Financial Model
**Date:** September 2026
**Classification:** Confidential - Investor Distribution Only
**Version:** 3.0
**Prepared by:** Abundancia Community LLC

---

> *This document contains forward-looking statements based on current assumptions, market data, and management projections. The sensitivity analysis herein is designed to illustrate the range of potential outcomes under varying assumptions. Actual results may differ materially from those projected. Investors should evaluate all scenarios, including downside cases, as part of their due diligence.*

---

> **THE BASE CASE IS PHASE 1, UNDER TWO ELECTIONS — THIS IS THE HEADLINE DE-RISKING OF THE OFFERING.** Investors are buying Phase 1 only, choosing between Election A (all-equity, 26.02% LP IRR / 2.449x, 10-yr) and Election B (secured notes, 34.81% LP IRR / 3.655x, 10-yr), with no contribution from Phases 2–3 required. Later phases are upside and a sponsor backstop, not a requirement.

---

> **NOTE ON THIS REVISION (September 2026):** The base-case reference figures below reflect the current two-election Phase-1 structure and the revised unit-mix model. The detailed single-variable, tornado, Monte Carlo, and stress-test **quantitative outputs** (§4–§7, §9) were computed against the prior single-structure base case ($13,354,032 capitalization / 32.1% IRR) and are being re-run against both current Elections. Directional findings and methodology are retained below and are expected to persist in direction and rough magnitude, but the specific percentages and dollar deltas in those sections are **[TO CONFIRM — pending re-run on the two-election Phase-1 models]** and should not be relied upon as current. Investors should request the updated sensitivity re-run before relying on any specific stressed figure.

---

## Table of Contents

- [1. Methodology](#1-methodology)
- [2. Key Variables Identified](#2-key-variables-identified)
- [3. Scenario Modeling](#3-scenario-modeling)
- [4. Single-Variable Sensitivity](#4-single-variable-sensitivity)
- [5. Tornado Analysis](#5-tornado-analysis)
- [6. Monte Carlo Simulation Summary](#6-monte-carlo-simulation-summary)
- [7. Stress Testing](#7-stress-testing)
- [8. Break-Even Sensitivity](#8-break-even-sensitivity)
- [9. Risk-Adjusted Returns](#9-risk-adjusted-returns)
- [10. Mitigation Strategies](#10-mitigation-strategies)

---

## 1. Methodology

### 1.1 Analytical Framework

The sensitivity analysis employs four complementary approaches to evaluate risk and return variability:

| Method | Purpose | Output |
|--------|---------|--------|
| **Scenario Modeling** | Discrete cases (Conservative, Base, Optimistic) with internally consistent assumptions | Full 10-year pro formas |
| **Single-Variable Sensitivity** | Isolate impact of each key variable while holding others constant | Relative IRR/EMx swing tables |
| **Monte Carlo Simulation** | Randomized iterations across all variables simultaneously | Probability distributions |
| **Stress Testing** | Extreme adverse scenarios to identify breaking points | Minimum viable returns |

*The single-variable and stress results in §4–§7 were previously computed directly on the Phase-1 financial model and equity waterfall (single-structure base, 10-year, Year 1 = 2027). That engine perturbed Phase-1 revenue/cost inputs, recomputed cash flow after debt service and developer fee, applied the 20% distribution reserve, and distributed to the LP per the Phase-1 waterfall. **This engine run is being repeated against both current Elections (A and B) and is not yet complete** — see the note at the top of this document. Items that depend on legal counsel, appraisal, or third-party engineering remain marked [TO CONFIRM].*

### 1.2 Base Case Reference Point

All sensitivity results are measured against the Base Case — **the Phase-1 offering**, under both Elections (Document 33, Key Figures Sheet):

| Metric | Election A — All-Equity | Election B — Secured Notes |
|--------|--------------------------|------------------------------|
| LP IRR (10-yr) | 26.02% | 34.81% |
| LP Equity Multiple (10-yr) | 2.449x | 3.655x |
| LP IRR / EMx (5-yr, interim) | 20.07% / 1.6515x | 28.04% / 2.104x |
| 10-Year Phase-1 Revenue | $63,557,464 | $63,557,464 |
| 10-Year Phase-1 EBITDA | $23,413,145 | $23,413,145 |
| Phase-1 Total Capitalization | $15,939,072 (LP $7,739,072 + GP $500,000 + $7,700,000 debt @ 8.5%) | $15,939,072 (LP $3,739,072 + Notes $4,000,000 + GP $500,000 + $7,700,000 debt @ 8.5%) |
| LP Distributions (10-Year) | $18,955,089 (net profit $11,216,017) | $13,664,480 (net profit $9,925,408) |

---

## 2. Key Variables Identified

### 2.1 Variable Classification

| Variable | Category | Phase-1 Base Assumption | Sensitivity Range | Impact Ranking* |
|----------|----------|----------------|-------------------|---------------|
| Absorption rate | Demand | 60 micro-villas sold Year 2; 80 lots sold Years 2–3; hospitality ramp per model | -50% to +30% | **#1 — Critical** |
| Sale pricing (micro-villas) | Revenue | ~$437/SF (avg $141,520 per unit); $8,491,200 total Year 2 | -30% to +20% | **#2 — Critical** |
| Construction costs | Expense | Phase-1 hard costs ~$16.7M (Years 1–2) | -15% to +25% | **#3 — Critical** |
| Interest rates | Financing | Phase-1 debt $7,700,000 @ 8.5%; Election B notes 10% | -200bps to +300bps | **#4 — High** |
| Rental/hospitality/commercial occupancy | Revenue | $44,248,815 / 10 yr combined (69.6% of Phase-1 revenue) [TO CONFIRM stabilized %] | -20 pts to +15 pts | **High** |
| Lot pricing | Revenue | $10,817,449 across 80 residential lots (implied avg ~$135K) | -25% to +25% | **Moderate** |
| Note repayment timing (Election B only) | Financing | Year-2 balloon; Year-4 extension contingency | On-time vs. extended | **High (Election B only)** |
| Inflation rate | Expense | [TO CONFIRM] | 1.5% to 5.5% | **Moderate** |
| Permitting timeline | Timeline | 12–16 months estimated | 12 to 36 months | **Moderate** |
| Property tax rate | Expense | [TO CONFIRM] | — | **Low** |
| Insurance costs | Expense | [TO CONFIRM] | -10% to +50% | **Low** |

*\*Impact rankings are carried forward from the prior single-structure model run and are being reconfirmed on both current Elections [TO CONFIRM]. Rentals/Hospitality/Commercial — 69.6% of Phase-1 revenue — is expected to remain the dominant recurring-revenue driver of the LP equity multiple. Election B introduces a new variable (note repayment timing) not present under Election A.*

### 2.2 Variable Correlation Matrix

Key variables are not independent. The model accounts for the following correlations:

| Variable Pair | Correlation | Rationale |
|--------------|-------------|-----------|
| Absorption rate ↔ Pricing | -0.45 | Higher prices slow absorption |
| Interest rates ↔ Absorption | -0.55 | Higher rates reduce buyer pool |
| Construction costs ↔ Inflation | +0.80 | Costs track inflation closely |
| Occupancy ↔ Pricing (rental) | -0.35 | Higher rates reduce occupancy |
| Interest rates ↔ Cap rates | +0.70 | Rates drive capitalization rates |
| Absorption ↔ Permitting timeline | -0.40 | Delays suppress early sales |

*Correlation estimates carried from the prior analytical run — [TO CONFIRM] on the two-election Phase-1 model re-run.*

---

## 3. Scenario Modeling

### 3.1 Scenario Assumptions

| Assumption | Conservative | Base (Phase 1 — The Offering) | Optimistic |
|-----------|-------------|------|-----------|
| Absorption vs. base timeline | Slower (micro-villa and lot sellout extends beyond Years 2–3) | 60 micro-villas Year 2; 80 lots Years 2–3; hospitality ramp per Phase-1 model | Faster pre-sales, same construction window |
| Pricing vs. base schedule | Below base | Micro-villas ~$437/SF; lots $10,817,449 total | Above base |
| Construction cost inflation | Higher | Per Phase-1 model (~$16.7M hard cost, Years 1–2) | Lower |
| Rate environment | Higher rates | Phase-1 debt $7,700,000 @ 8.5%; Election B notes @ 10% | Lower rates |
| Contingency utilization | High | Partial | Low |

*Conservative/Optimistic bundled multi-variable cases, previously computed on the single-structure model, are being re-run against both current Elections — [TO CONFIRM]. Final scenario input calibration remains subject to management sign-off.*

### 3.2 Scenario Outcomes

| Metric | Conservative | Base — Election A | Base — Election B | Optimistic |
|--------|-------------|:---:|:---:|-----------|
| **LP IRR (10-yr)** | [TO CONFIRM — re-run] | **26.02%** | **34.81%** | [TO CONFIRM — re-run] |
| **LP Equity Multiple (10-yr)** | [TO CONFIRM — re-run] | **2.449x** | **3.655x** | [TO CONFIRM — re-run] |
| 10-Year Revenue | ~ −12% vs. base [TO CONFIRM] | $63,557,464 | $63,557,464 | ~ +12% vs. base [TO CONFIRM] |
| 10-Year EBITDA | Reduced | $23,413,145 | $23,413,145 | Increased |
| Cumulative EBITDA break-even (turns positive) | Later than Year 2 | Year 2 | Year 2 | Year 1–2 |

*Site-level "KEY_METRICS" scenario bands published elsewhere in investor materials (conservative/base/optimistic IRR and EMx by scenario) trace to `src/lib/data/financials.ts` on the public site and to Document 33; the Conservative/Optimistic bundled sensitivity re-run above is separate and pending completion.*

### 3.3 The Former "Phase-1-Only Downside" Is Now the Base Case

Prior drafts modeled "the project never proceeds past Phase 1" as a downside scenario of a full-project investment. **That scenario is now the Base Case of this offering** — investors are buying Phase 1 only, underwritten at 26.02% LP IRR / 2.449x (Election A, 10-yr) or 34.81% LP IRR / 3.655x (Election B, 10-yr), with no reliance on later phases. This restructuring is the single largest de-risking of the offering: what investors previously had to treat as downside protection is now the deal itself. Phases 2–3 remain as (a) future upside revenue streams and (b) a backstop — additional sponsor revenue capacity to support the targeted LP return if Phase-1 results underperform.

---

## 4. Single-Variable Sensitivity

**[TO CONFIRM — this section's quantitative outputs are pending re-run against both current Elections.]** The table and commentary below are carried forward from the prior single-structure run (base case then: 32.1% IRR / 2.88x, $13,354,032 capitalization) for methodology reference only. Do not rely on the specific percentages below.

### 4.1 Phase-1 Single-Variable Sensitivity Table (prior run — pending re-run)

| Variable | Change | Prior LP IRR (10-yr) | Prior LP EMx | Takeaway (directional, expected to persist) |
|----------|--------|:--------------:|:------:|----------|
| Sale prices (micro-villa + lot) | ±10% | ~±6pp | ~±0.29x | Largest single-variable lever — early sale revenue drops straight to LP |
| Construction hard cost (Yr 1–2) | ±15% | ~±5pp | ~±0.23x | Second-largest lever |
| Absorption pace | ±20% | ~±1.4 to −2.6pp | ~±0.02–0.03x | Timing-driven, not magnitude-driven |
| Interest rate on construction debt | ±200bps | ~±1.1–1.2pp | ~±0.10x | Well-contained on fixed, amortizing debt |
| Rental/Hospitality/Commercial occupancy | ±10% | ~±2.4 to −2.7pp | ~±0.31x | Dominant equity-multiple driver given its 69.6% Phase-1 revenue share |
| Land cost | +25% | ~0.0pp | ~0.00x | Immaterial — a Year-1-only cost the LP is shielded from |

*Method (prior run): results computed directly on the Phase-1 financial model and equity waterfall via a self-contained Python engine (bisection/Newton XIRR solver). LP distributions were allocated using the base-case LP share of each year's distributable pool, re-applied to each perturbed pool. This reproduced the base case exactly and is expected to be re-applied identically to both current Elections once the re-run completes.*

### 4.2 Reading the Table — Variable-by-Variable (directional, pending re-run)

**Sale pricing (micro-villas + lots)** is expected to remain the single largest driver in both directions. Phase-1 micro-villa sales ($8,491,200, Year 2) and lot sales ($10,817,449, Years 2–3) are front-loaded and high-margin, so a price move lands early and flows through to LP with little dilution. Pricing is applied per product type in the model — never as a flat blended average. *Phase 1 sells micro-villas and residential lots only — no houses, luxury estates, or condos.*

**Construction hard cost (~$16.7M, Years 1–2)** is expected to remain the next-largest lever.

**Interest rate** on the $7,700,000 construction facility is modeled by recomputing the fully-amortizing 10-year debt service at the shocked rate ($1,173,539/yr at 8.5% base). Under Election B, note repayment timing (Year-2 vs. Year-4 extension) is an additional rate/timing-sensitive variable not present under Election A.

**Rental/Hospitality/Commercial occupancy** is expected to remain the dominant **equity-multiple** driver because this combined stream is **69.6% of Phase-1 revenue** ($44,248,815 of $63,557,464) and anchors recurring cash flow through the hold.

**Absorption pace** is modeled as a timing shift of sale revenue; because dollars are shifted rather than lost, the equity multiple is expected to remain nearly flat while IRR moves.

**Land cost** (~$2.17M, Year 1) is expected to remain immaterial at the LP level.

---

## 5. Tornado Analysis

**[TO CONFIRM — pending re-run against both current Elections.]** The ranking below is carried forward from the prior single-structure run for directional reference.

### 5.1 IRR Impact Range by Variable (prior run, directional only)

| Rank | Variable | Range Tested | Expected to Remain Top Driver? |
|------|----------|--------------|-------------------------------|
| 1 | Sale Pricing (micro-villa + lot) | ±10% | Yes |
| 2 | Construction Costs | ±15% | Yes |
| 3 | Rental/Hospitality/Commercial Occupancy | ±10% | Yes (dominant equity-multiple driver) |
| 4 | Absorption Pace | ±20% | Yes |
| 5 | Interest Rate (construction debt) | ±200bps | Yes |
| — | Note Repayment Timing (Election B only) | On-time vs. Year-4 extension | New variable, not previously modeled |
| 6 | Land Cost | +25% | Yes (immaterial) |

### 5.2 Tornado Interpretation

**Sale pricing and construction cost are expected to continue to dominate the Phase-1 risk profile**, consistent with a development-stage project whose early, high-margin micro-villa and lot sales (Years 2–3) and ~$16.7M Year 1–2 construction spend are the primary value drivers.

**Rental/Hospitality/Commercial occupancy** is expected to remain the **single largest equity-multiple sensitivity**, reflecting its 69.6% Phase-1 revenue share (combined stream).

**Interest rate risk is expected to remain well-contained** on the fixed, fully-amortizing $7,700,000 construction facility. **Election B introduces a new sensitivity** — note repayment timing — not present under Election A; the Year-4 extension scenario (balance growing to ~$5.6M, Years 2-3 LP distributions suspended) is a materially adverse case for Election B investors specifically and should be modeled explicitly in the pending re-run.

**Land cost is expected to remain immaterial** at the LP level.

---

## 6. Monte Carlo Simulation Summary

### 6.1 Simulation Parameters

| Parameter | Value |
|-----------|-------|
| Number of iterations | 10,000 |
| Variables randomized | 11 (all key variables, incl. Election B note timing) |
| Distribution type | Triangular (min/mode/max) with correlation adjustments |
| Correlation matrix | Applied per Section 2.2 |
| Seed | Reproducible (seed = 2026) |

### 6.2 Simulation Status

The Monte Carlo simulation is being re-run on the current two-election Phase-1 base cases (Election A: 26.02% IRR / 2.449x / $63.6M revenue / $23.4M EBITDA; Election B: 34.81% IRR / 3.655x / same revenue and EBITDA; $15,939,072 capitalization under both). Percentile distributions, probability metrics, and summary statistics from prior runs were computed against superseded bases and have been withdrawn pending the re-run. Updated distributions are **[TO CONFIRM — being recomputed on both current Election models]**.

Directional findings from prior runs that management expects to persist (subject to confirmation):

- High probability of capital preservation across the simulated range, under both Elections
- Modest negative skew (more downside than upside tail), typical of leveraged development
- Lower variability on revenue than on IRR
- Election B's variance is expected to be wider than Election A's, given the added note-timing variable

---

## 7. Stress Testing

**[TO CONFIRM — this section's quantitative outputs are pending re-run against both current Elections.]** The scenarios and prior results below are carried forward from the single-structure run for methodology reference only. Do not rely on the specific stressed IRR/EMx figures below.

### 7.1 Individual Stress Scenarios (prior run, methodology reference)

#### Stress Test A: 30% Price Reduction

| Metric | Prior Base Case (single-structure) | Prior Stressed Result |
|--------|-----------|----------------------------------|
| Pricing | Micro-villas / lots | −30% across micro-villa + lot sale products |
| LP IRR | 32.1% | ~14.7% (prior run) |
| LP Equity Multiple | 2.88x | ~2.01x (prior run) |

**Assessment (directional):** A sustained 30% price decline exceeds the 2008–2010 Austin market correction (peak-to-trough ~18%). The prior run showed LP capital fully preserved even under this stress, because rental/hospitality/commercial income is unaffected and lot sales retain positive margin on their infrastructure-only cost basis. Re-run against both current Elections pending.

#### Stress Test B: 50% Slower Absorption

**Assessment (directional):** Halving absorption is expected to defer revenue rather than destroy it — in the prior run, the equity multiple was essentially unchanged while IRR stepped down on the later timing. Re-run pending.

#### Stress Test C: 25% Construction Cost Overrun

**Assessment (directional):** A 25% cost overrun is expected to compress but not eliminate returns, because pricing is maintained and lot sales provide a cost-insensitive margin buffer. Re-run pending.

#### Stress Test D: Combined Worst Case

| Applied Stress | Assumption |
|----------------|-----------|
| Pricing | −15% |
| Absorption | −30% |
| Construction costs | +15% |
| Interest rates | +200bps |
| Occupancy | −10% |

**Assessment (directional):** The prior run showed the combined worst case (five adverse moves simultaneously, estimated probability <1%) still preserving LP capital with a positive multiple under the single-structure base. **For Election B specifically, a sixth stress — Year-4 note extension — should be added to this combined case in the re-run**, since it is a Phase-1-specific risk not present under Election A. Re-run pending for both Elections.

### 7.2 Stress Test Summary Matrix

| Scenario | Election A (pending re-run) | Election B (pending re-run) | Outcome (directional) |
|----------|:---:|:---:|-------------------------|
| **Base Case** | **26.02% / 2.449x** | **34.81% / 3.655x** | The offering as underwritten |
| A: −30% Pricing | [TO CONFIRM] | [TO CONFIRM] | Expected: capital preserved |
| B: −50% Absorption | [TO CONFIRM] | [TO CONFIRM] | Expected: timing shift only |
| C: +25% Cost Overrun | [TO CONFIRM] | [TO CONFIRM] | Expected: attractive return retained |
| D: Combined Worst (<1% est. probability) | [TO CONFIRM] | [TO CONFIRM, incl. note-extension stress] | Expected: capital preserved |
| Phases 2–3 proceed | — | — | Upside beyond the base case (context — not required) |

---

## 8. Break-Even Sensitivity

### 8.1 Break-Even Under Base Conditions (Phase 1, both Elections)

| Condition | Outcome |
|-----------|---------|
| Cumulative EBITDA turns positive | Year 2 (2028) |
| LP capital fully returned | Year 3 (both Elections) |
| Break-even under stressed conditions | Extends beyond Year 2/3 by roughly the severity of the applied stress [TO CONFIRM exact years on the pending re-run] |

### 8.2 Early Revenue Support

Break-even resilience is supported by early, high-margin revenue: residential lot sales of $10,817,449 concentrated in Years 2–3 ($5,299,483 + $5,517,966 across 80 lots), micro-villa sales of $8,491,200 in Year 2 (60 units), plus hospitality/nature-stay revenue ramping from Year 1.

### 8.3 Pricing Floor Analysis

Per-type pricing floors (price at which unit-level margin reaches zero) are maintained in the financial model and are [TO CONFIRM] for publication. Directionally, residential lots retain positive margin under all tested price stresses given their infrastructure-only cost basis.

---

## 9. Risk-Adjusted Returns

### 9.1 Probability-Weighted Expected Return

Scenario-specific IRR/EMx values from the prior single-structure run (Conservative 18.2% / 2.15x, Base 32.1% / 2.88x, Optimistic 46.2% / 3.66x) are **[TO CONFIRM — superseded, pending re-run on both current Election models]**. The published current base-case figures are the Phase-1 offering economics: **Election A — LP IRR 26.02% / EMx 2.449x / total distributions $18,955,089 (10-yr)**; **Election B — LP IRR 34.81% / EMx 3.655x / total distributions $13,664,480 (10-yr)**. Formal probability weights for a blended expected return remain subject to management sign-off — **[TO CONFIRM]**.

### 9.2 Context vs. Alternatives

Development-stage community projects typically target mid-teens to mid-20s IRRs; stabilized Austin multifamily typically prices at low-double-digit IRRs. Abundancia's Phase-1 base-case 26.02% (Election A) to 34.81% (Election B) 10-year LP IRR reflects development-stage risk, the diversified Phase-1 revenue mix, and the early micro-villa/lot/hospitality revenue profile. Comparative benchmark figures are estimates and [TO CONFIRM].

### 9.3 Downside Protection Summary

| Protection | Detail |
|-----------|--------|
| **Phase-1 underwriting (the headline)** | The former "Phase-1-only downside scenario" is now the Base Case — the offering does not rely on Phases 2–3 |
| Phases 2–3 backstop | Later phases give the sponsor additional revenue capacity to support the targeted LP return under either Election |
| 20% distribution reserve | Withheld annually from positive cash flows as a safety buffer; released Year 10 (subject to final documentation) |
| Early lot + micro-villa revenue | $10.82M of lot sales (Years 2–3) and $8.49M of micro-villa sales (Year 2) |
| Recurring hospitality/commercial income | $44.2M over 10 years anchors recurring cash flow |
| Election A avoids note risk entirely | Investors uncomfortable with subordination risk may elect Election A, forgoing Election B's higher target return for full equity upside and no note exposure |

---

## 10. Mitigation Strategies

### 10.1 Risk Mitigation by Variable

| Risk | Mitigation Strategy | Residual Risk |
|------|-------------------|---------------|
| **Absorption slowdown** | Phased construction (build against demonstrated demand); 10,000-person interest list + 100+ investors/buyers/collaborators with zero paid marketing; conversion flexibility between for-sale and rental product | Moderate: market risk cannot be fully eliminated |
| **Price decline** | Per-type pricing; product mix flexibility (shift toward higher-margin lots); value engineering | Moderate: pricing is ultimately market-driven |
| **Construction cost overrun** | Fixed-price GC contracts where possible; contingency reserves (Phase-1 allocation [TO CONFIRM]); phased procurement; hempcrete supply-chain development | Low-to-Moderate: contracts transfer most risk |
| **Interest rate increase** | Rate management on the 8.5% Phase-1 construction facility ($7,700,000, 10-yr fully amortizing); pre-sale requirements before phase starts; adjustable phase timing | Moderate: macro risk with limited hedge options |
| **Note extension risk (Election B only)** | Notes targeted for repayment from Year-2 sale proceeds, the contractual first use of that revenue; Election A available as a note-free alternative | Moderate: extension suspends Years 2-3 LP distributions if triggered |
| **Occupancy shortfall** | Multi-platform distribution; corporate retreat partnerships (retreat market $31.8B → $73.7B by 2034); flexible stay formats (glamping/domes/camping) | Moderate: this combined stream is 69.6% of Phase-1 revenue — the dominant recurring driver |
| **Permitting delay** | No county zoning (mixed use by right); 12–16-month permitting estimate; experienced civil lead (Fred Haas, PE); MUD engineering underway; early TCEQ/OSSF and county floodplain coordination; conservation subdivision pathway for Houston toad / Lost Pines HCP | Low-to-Moderate |
| **Water availability** | Layered supply: Aqua WSC service; 7 existing ponds (+ more to be created); 6 wells + 13 storage tanks + filtration; rainwater capture on every building (~9–11M gal/yr at build-out); 11 atmospheric water generators; low-flow + greywater demand reduction; full watershed analysis by Symbiosis TX commissioned immediately upon entering due diligence | Low-to-Moderate: hydrology verification is first predevelopment spend |
| **Inflation spike** | Real asset hedge; escalation embedded in model; indexed contracts | Low: inflation benefits asset values |

### 10.2 Structural Protections

| Protection | Mechanism |
|-----------|-----------|
| 10% LP Preferred Return | Cumulative preferred return to Class A LP capital before GP promote; return of capital LP-class first (subject to final documentation) |
| 20% Distribution Reserve | Withheld annually from positive cash flows as a safety buffer; released Year 10 |
| Phase-1 Underwriting | The offering is underwritten on Phase 1 alone; Phases 2–3 are upside and a sponsor backstop |
| Election Choice | Investors select the risk/return profile that fits them — full-equity (Election A) or higher-target-return with note subordination risk, plainly disclosed (Election B) |
| Phased Capital Deployment | Capital deployed in tranches tied to milestones |
| Phase-Gating | Construction phases proceed against demonstrated demand |
| GP Co-Investment | $500,000 GP co-invest (pari passu) aligning incentives with LP returns |
| Independent Cost Review | Third-party construction cost verification at phase gates |
| Quarterly Reporting | Financial transparency with investor reporting cadence |

---

*This sensitivity analysis should be evaluated in conjunction with Document 06 (10-Year Financial Projections), Document 07 (Unit Economics), Document 09 (Cap Table & Distribution Waterfall), and Document 33 (Key Figures Sheet). All projections are estimates and actual results may vary materially. Items marked [TO CONFIRM] are pending the full scenario re-run on both current Election models.*

---

**End of Document 08**
