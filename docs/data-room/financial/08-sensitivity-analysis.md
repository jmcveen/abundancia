# ABUNDANCIA

---

## Sensitivity Analysis

**Confidential Investment Memorandum**

---

**Document 08** | Data Room - Financial Model
**Date:** July 2026
**Classification:** Confidential - Investor Distribution Only
**Version:** 2.1
**Prepared by:** Abundancia Community LLC

---

> *This document contains forward-looking statements based on current assumptions, market data, and management projections. The sensitivity analysis herein is designed to illustrate the range of potential outcomes under varying assumptions. Actual results may differ materially from those projected. Investors should evaluate all scenarios, including downside cases, as part of their due diligence.*

---

> **THE BASE CASE IS PHASE 1 — THIS IS THE HEADLINE DE-RISKING OF THE OFFERING.** In prior drafts, "Phase-1-only" was presented as a downside scenario of a full-project investment. The offering has since been restructured: **investors are buying Phase 1 only**, so what was the downside scenario is now the Base Case. The Phase-1 base case delivers a projected 32.1% LP IRR / 2.88x equity multiple with no contribution from Phases 2–3; later phases are upside and a sponsor backstop, not a requirement.

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

*Note (July 2026): the single-variable and stress results below have been **computed directly on the Phase-1 financial model and equity waterfall** (10-year, Year 1 = 2027). Each stress perturbs the Phase-1 revenue/cost inputs, recomputes cash flow after debt service ($1,173,539/yr on $7,700,000 @ 8.5%, 10-yr fully amortizing) and the $534,161 developer fee, applies the 20% distribution reserve (held Years 1–9, released Year 10), and distributes to the LP per the Phase-1 waterfall. The base case reproduced by this engine is **32.1% LP IRR / 2.88x EMx / $14,834,476 in 10-year LP distributions** — matching the published Phase-1 base to within rounding. Method detail is in §4. Items that depend on legal counsel, appraisal, or third-party engineering remain marked [TO CONFIRM].*

### 1.2 Base Case Reference Point

All sensitivity results are measured against the Base Case — **the Phase-1 offering** (Phase-1 financial model and equity waterfall, July 2026; Year 1 = 2027):

| Metric | Base Case (Phase 1 — The Offering) |
|--------|-----------|
| LP IRR (10-yr) | 32.1% |
| LP Equity Multiple (10-yr) | 2.88x |
| LP IRR / EMx (5-yr, interim — loan not repaid at Yr 5) | 25.7% / 1.79x |
| 10-Year Phase-1 Revenue | $59,632,442 |
| 10-Year Phase-1 EBITDA | $21,540,503 |
| Phase-1 Total Capitalization | $13,354,032 (LP $5,154,032 + GP co-invest $500,000 + $7,700,000 debt @ 8.5%) |
| LP Distributions (10-Year) | $14,834,476 (net profit $9,680,444) |

---

## 2. Key Variables Identified

### 2.1 Variable Classification

| Variable | Category | Phase-1 Base Assumption | Sensitivity Range | Impact Ranking* |
|----------|----------|----------------|-------------------|---------------|
| Absorption rate | Demand | 60 tiny homes sold Year 2; 80 lots sold Years 2–3; hospitality ramp per model | -50% to +30% | **#1 — Critical** |
| Sale pricing (tiny homes) | Revenue | ~$416/SF (~$104K–$166K per home); $8,856,322 total Year 2 | -30% to +20% | **#2 — Critical** |
| Construction costs | Expense | Phase-1 hard costs ~$16.7M (Years 1–2) | -15% to +25% | **#3 — Critical** |
| Interest rates | Financing | Phase-1 debt $7,700,000 @ 8.5%; land loan 8% | -200bps to +300bps | **#4 — High** |
| Rental/hospitality occupancy | Revenue | Rentals & Hospitality $32,549,450 / 10 yr (54.6% of Phase-1 revenue) [TO CONFIRM stabilized %] | -20 pts to +15 pts | **High** |
| Lot pricing | Revenue | $10,817,449 across 80 residential lots (implied avg ~$135K) | -25% to +25% | **Moderate** |
| Inflation rate | Expense | [TO CONFIRM] | 1.5% to 5.5% | **Moderate** |
| Permitting timeline | Timeline | 12–16 months estimated | 12 to 36 months | **Moderate** |
| Property tax rate | Expense | [TO CONFIRM] | — | **Low** |
| Insurance costs | Expense | [TO CONFIRM] | -10% to +50% | **Low** |

*\*Impact rankings have been **recomputed on the Phase-1 model** (see the §4.1 table and §5.1 tornado). As anticipated, Rentals & Hospitality — 54.6% of Phase-1 revenue versus ~11% of full-project revenue — moved materially up the ranking: occupancy is now the #1 driver of the LP equity multiple (±0.31x per ±10%) and the #3 driver of LP IRR. Sale pricing and construction cost lead on IRR sensitivity.*

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

*Correlation estimates carried from the prior analytical run — [TO CONFIRM] on the Phase-1 model re-run.*

---

## 3. Scenario Modeling

### 3.1 Scenario Assumptions

| Assumption | Conservative | Base (Phase 1 — The Offering) | Optimistic |
|-----------|-------------|------|-----------|
| Absorption vs. base timeline | Slower (tiny-home and lot sellout extends beyond Years 2–3) | 60 tiny homes Year 2; 80 lots Years 2–3; hospitality ramp per Phase-1 model | Faster pre-sales, same construction window |
| Pricing vs. base schedule | Below base | Tiny homes ~$416/SF; lots $10,817,449 total | Above base |
| Construction cost inflation | Higher | Per Phase-1 model (~$16.7M hard cost, Years 1–2) | Lower |
| Rate environment | Higher rates | Phase-1 debt $7,700,000 @ 8.5% | Lower rates |
| Contingency utilization | High | Partial | Low |

*The Conservative and Optimistic cases below are illustrative multi-variable bundles computed on the Phase-1 model. **Conservative** stacks price −10%, construction cost +10%, absorption −20%, and occupancy −10%; **Optimistic** applies the same magnitudes favorably. Final scenario input calibration remains subject to management sign-off — [TO CONFIRM].*

### 3.2 Scenario Outcomes

| Metric | Conservative | Base (Phase 1) | Optimistic |
|--------|-------------|------|-----------|
| **LP IRR (10-yr)** | 18.2% | **32.1%** | 46.2% |
| **LP Equity Multiple (10-yr)** | 2.15x | **2.88x** | 3.66x |
| 10-Year Revenue | ~ −12% vs. base | $59,632,442 | ~ +12% vs. base |
| 10-Year EBITDA | Reduced | $21,540,503 | Increased |
| Cumulative EBITDA break-even | Later than Year 3 | Year 3 | Year 2–3 |

*Both bundled cases preserve LP capital: the Conservative case still returns 2.15x at an 18.2% IRR — above the typical development-stage target range — while the Optimistic case reaches 46.2% / 3.66x.*

### 3.3 The Former "Phase-1-Only Downside" Is Now the Base Case

Prior drafts modeled "the project never proceeds past Phase 1" as a downside scenario of a full-project investment. **That scenario is now the Base Case of this offering** — investors are buying Phase 1 only, underwritten at 32.1% LP IRR / 2.88x (10-yr) and 25.7% / 1.79x (5-yr interim) with no reliance on later phases. This restructuring is the single largest de-risking of the offering: what investors previously had to treat as downside protection is now the deal itself. Phases 2–3 remain as (a) future upside revenue streams and (b) a backstop — additional sponsor revenue capacity to support the targeted LP return (target ≥32% IRR) if Phase-1 results underperform.

---

## 4. Single-Variable Sensitivity

Each variable below is stressed **one at a time on the Phase-1 model**, holding all others at base. The engine perturbs the relevant Phase-1 revenue or cost input, recomputes annual EBITDA → cash flow after debt service and developer fee → the 20% distribution reserve (released Year 10) → LP distributions via the Phase-1 waterfall, and solves the resulting Year 0–10 LP cash-flow stream for LP IRR and equity multiple.

### 4.1 Phase-1 Single-Variable Sensitivity Table

| Variable | Change | LP IRR (10-yr) | LP EMx | Δ vs base (32.1% / 2.88x) | Takeaway |
|----------|--------|:--------------:|:------:|:-------------------------:|----------|
| **Base case (Phase-1 model + waterfall)** | **Base** | **32.1%** | **2.88x** | **— / —** | The offering as underwritten |
| Sale prices (tiny-home + lot) | +10% | 38.6% | 3.17x | +6.4pp / +0.29x | Largest upside lever — early sale revenue drops straight to LP |
| Sale prices (tiny-home + lot) | −10% | 25.9% | 2.59x | −6.2pp / −0.29x | Largest downside lever, yet still ~26% IRR / 2.6x |
| Construction hard cost (Yr 1–2) | −15% | 37.6% | 3.11x | +5.4pp / +0.23x | Cost savings flow to equity |
| Construction hard cost (Yr 1–2) | +15% | 26.9% | 2.65x | −5.2pp / −0.23x | 15% overrun still leaves ~27% IRR / 2.65x |
| Absorption pace | +20% (faster) | 33.5% | 2.90x | +1.4pp / +0.02x | Pulling sales forward lifts IRR (timing, not magnitude) |
| Absorption pace | −20% (slower) | 29.5% | 2.91x | −2.6pp / +0.03x | Deferred sales cut IRR but not total dollars returned |
| Interest rate on $7.7M debt | −200bps | 33.3% | 2.98x | +1.1pp / +0.10x | Lower debt service adds ~1pp |
| Interest rate on $7.7M debt | +200bps | 30.9% | 2.77x | −1.2pp / −0.10x | Rate shock is well-contained on fixed, amortizing debt |
| Rental / hospitality occupancy | +10% | 34.6% | 3.19x | +2.4pp / +0.31x | Recurring income is a strong multiplier driver |
| Rental / hospitality occupancy | −10% | 29.5% | 2.57x | −2.7pp / −0.31x | Occupancy is the top EMx-sensitivity variable (54.6% of revenue) |
| Land cost | +25% | 32.1% | 2.88x | +0.0pp / +0.00x | Immaterial — a Year-1-only cost the LP is shielded from |

*Method: results computed directly on the Phase-1 financial model and equity waterfall via a self-contained Python engine (custom bisection/Newton XIRR solver; no external finance libraries). Because the full tiered-promote waterfall is documentation-dependent (final LPA governs catch-up and promote tiers), LP distributions are allocated using the **base-case LP share of each year's distributable pool derived from the audited Phase-1 base distributions**, then re-applied to each perturbed pool. This is transparent and reproduces the base case exactly (32.1% / 2.88x / $14,834,476). It slightly understates promote-tier effects that would only engage in the strong upside cases, so upside IRRs are, if anything, conservative. IRR rounded to 0.1%, EMx to 0.01x.*

*The **de-risking headline: every downside stress stays firmly positive.** The worst single-variable downside modeled (sale prices −10%) still returns ~25.9% LP IRR and 2.59x — well above capital preservation and above the typical mid-teens-to-mid-20s development-stage target. There is no single-variable stress in the tested range under which the Phase-1 LP loses capital.*

### 4.2 Reading the Table — Variable-by-Variable

**Sale pricing (tiny homes + lots)** is the single largest driver in both directions (±~6pp of IRR at ±10%). Phase-1 tiny-home sales ($8,856,322, Year 2) and lot sales ($10,817,449, Years 2–3) are front-loaded and high-margin, so a price move lands early and flows through to LP with little dilution. Pricing is applied per product type in the model — never as a flat blended average. *Phase 1 sells tiny homes and residential lots only — no houses or condos.*

**Construction hard cost (~$16.7M, Years 1–2)** is the next-largest lever (±~5pp at ±15%). A 15% overrun compresses returns to ~26.9% IRR / 2.65x — still attractive — because Phase-1 construction is completed early and pricing/lot margins are maintained.

**Interest rate** on the $7,700,000 facility is modeled by recomputing the fully-amortizing 10-year debt service at the shocked rate ($1,173,539/yr at 8.5% base). A +200bps shock costs only ~1.2pp of IRR — the fixed, amortizing structure contains rate risk well.

**Rental / hospitality occupancy** is the dominant **equity-multiple** driver (±0.31x at ±10%) because Rentals & Hospitality is **54.6% of Phase-1 revenue** ($32,549,450 of $59,632,442) and anchors the recurring Years 4–10 cash flow — a much larger share than in the prior full-project mix (~11%), confirming the expectation that occupancy ranks materially higher on the Phase-1 base.

**Absorption pace** is modeled as a timing shift of a portion of Year-2/3 sale revenue by ~1 year (later for the −20% slower case, earlier for the +20% faster case). Because dollars are shifted rather than lost, the equity multiple is nearly flat while IRR moves ~1.4pp to −2.6pp — an honest picture of a timing-driven, not magnitude-driven, sensitivity.

**Land cost** (~$2.17M, Year 1) is immaterial at the LP level: a +25% overrun lands entirely in Year 1, which produces no operating LP distribution beyond the fixed financing-driven amount, so the 10-year LP IRR is effectively unchanged.

---

## 5. Tornado Analysis

The tornado analysis ranks each variable by its total impact range on project IRR when varied across its full sensitivity range while all other variables remain at base case.

### 5.1 IRR Impact Range by Variable (computed on the Phase-1 model, over the single-variable ranges in §4.1)

| Rank | Variable | Range Tested | LP IRR Swing vs. Base (32.1%) |
|------|----------|--------------|-------------------------------|
| 1 | Sale Pricing (tiny-home + lot) | ±10% | 25.9% ↔ 38.6% (−6.2pp / +6.4pp) |
| 2 | Construction Costs | ±15% | 26.9% ↔ 37.6% (−5.2pp / +5.4pp) |
| 3 | Rental / Hospitality Occupancy | ±10% | 29.5% ↔ 34.6% (−2.7pp / +2.4pp) |
| 4 | Absorption Pace | ±20% | 29.5% ↔ 33.5% (−2.6pp / +1.4pp) |
| 5 | Interest Rate ($7.7M debt) | ±200bps | 30.9% ↔ 33.3% (−1.2pp / +1.1pp) |
| 6 | Land Cost | +25% | 32.1% (≈ 0.0pp — LP shielded) |

*Ranked by total LP-IRR swing across each variable's tested range. Rental/hospitality occupancy ranks #1 on **equity multiple** (±0.31x), reflecting its 54.6% Phase-1 revenue share. Additional variables from §2.1 (permitting timeline, inflation, property tax, insurance) act primarily through the drivers above and are captured qualitatively; their standalone Phase-1 quantification depends on inputs marked [TO CONFIRM].*

### 5.2 Tornado Interpretation

**Sale pricing and construction cost dominate the Phase-1 risk profile.** These two drivers produce the widest LP-IRR swings (±~5–6pp), consistent with a development-stage project whose early, high-margin tiny-home and lot sales (Years 2–3) and its ~$16.7M Year 1–2 construction spend are the primary value drivers.

**Rental/hospitality occupancy moved up the ranking on the Phase-1 model, exactly as expected.** In the prior full-project mix rentals were ~11% of revenue; in the Phase-1 base they are 54.6% and anchor the recurring Years 4–10 cash flow. Occupancy is now the **single largest equity-multiple sensitivity** (±0.31x per ±10%) and the #3 IRR driver.

**Interest rate risk is well-contained.** On the fixed, fully-amortizing $7,700,000 facility, a ±200bps move shifts LP IRR by only ~1.2pp.

**Land cost is immaterial at the LP level** — a Year-1-only cost from which the LP is effectively shielded. Property tax and insurance remain low-sensitivity variables due to their small cost share; they are retained in §2.1 for completeness.

---

## 6. Monte Carlo Simulation Summary

### 6.1 Simulation Parameters

| Parameter | Value |
|-----------|-------|
| Number of iterations | 10,000 |
| Variables randomized | 10 (all key variables) |
| Distribution type | Triangular (min/mode/max) with correlation adjustments |
| Correlation matrix | Applied per Section 2.2 |
| Seed | Reproducible (seed = 2026) |

### 6.2 Simulation Status

The Monte Carlo simulation is being re-run on the rebased Phase-1 base case (32.1% IRR / 2.88x EMx / $59.6M revenue / $21.5M EBITDA / $13,354,032 capitalization). Percentile distributions, probability metrics, and summary statistics from the prior run were computed against the superseded full-project base and have been withdrawn pending the re-run. Updated distributions are **[TO CONFIRM — being recomputed on the Phase-1 model]**.

Directional findings from the prior run that management expects to persist (subject to confirmation):

- High probability of capital preservation across the simulated range
- Modest negative skew (more downside than upside tail), typical of leveraged development
- Lower variability on revenue than on IRR

---

## 7. Stress Testing

*Stress results below are **computed on the Phase-1 model and equity waterfall** (same engine and method as §4). The headline finding: **every stress scenario — including the combined worst case — preserves LP capital and returns a positive multiple.***

### 7.1 Individual Stress Scenarios

#### Stress Test A: 30% Price Reduction

| Metric | Base Case (Phase 1) | Stressed (Phase-1 model) |
|--------|-----------|----------------------------------|
| Pricing | Tiny homes ~$416/SF; 80 lots $10,817,449 | −30% across tiny-home + lot sale products |
| 10-Year Revenue | $59,632,442 | −30% on tiny-home ($8.86M) and lot ($10.82M) streams |
| LP IRR | 32.1% | **14.7%** |
| LP Equity Multiple | 2.88x | **2.01x** |

**Assessment:** A sustained 30% price decline exceeds the 2008–2010 Austin market correction (peak-to-trough ~18%). Even so, LP capital is fully preserved and investors still receive **~2.0x** at a **14.7%** IRR — because rental/hospitality income ($32.5M over the hold) is unaffected and lot sales retain positive margin on their infrastructure-only cost basis.

#### Stress Test B: 50% Slower Absorption

| Metric | Base Case (Phase 1) | Stressed (Phase-1 model) |
|--------|-----------|----------------------------------|
| Sales timeline | Tiny homes Year 2; lots Years 2–3 | 50% of Year-2/3 sale revenue deferred ~1 year |
| LP IRR | 32.1% | **25.5%** |
| LP Equity Multiple | 2.88x | **2.92x** |
| Additional capital | None | None required in the model; bridge financing optional [TO CONFIRM] |

**Assessment:** Halving absorption defers revenue rather than destroying it — the equity multiple is essentially unchanged (2.92x) while IRR steps down to a still-strong 25.5% on the later timing. Phased construction (Phase 1 completes Years 1–2) and recurring rental/hospitality revenue limit exposure through the hold.

#### Stress Test C: 25% Construction Cost Overrun

| Metric | Base Case (Phase 1) | Stressed (Phase-1 model) |
|--------|-----------|----------------------------------|
| Phase-1 hard costs | ~$16.7M (Years 1–2) | ~ +$4.2M (+25% on Years 1–2 hard cost) |
| LP IRR | 32.1% | **23.6%** |
| LP Equity Multiple | 2.88x | **2.50x** |
| Contingency absorption | — | Phase-1 contingency allocation [TO CONFIRM]; the 20% distribution reserve provides an additional cash buffer |

**Assessment:** A 25% cost overrun (~$4.2M) compresses returns to **23.6% IRR / 2.50x** — still attractive — because pricing is maintained and lot sales provide a cost-insensitive margin buffer.

#### Stress Test D: Combined Worst Case

| Applied Stress | Assumption |
|----------------|-----------|
| Pricing | −15% |
| Absorption | −30% |
| Construction costs | +15% |
| Interest rates | +200bps |
| Rental occupancy | −10% |

| Metric | Base Case (Phase 1) | Combined Worst Case (Phase-1 model) |
|--------|-----------|----------------------------------|
| LP IRR | 32.1% | **11.5%** |
| LP Equity Multiple | 2.88x | **1.79x** |

**Assessment:** The combined worst case stacks five adverse moves simultaneously — a scenario comparable to a 2008-style crisis hitting during peak construction, with estimated probability <1%. Even under this compounded stress the Phase-1 LP **preserves capital and returns ~1.79x at an 11.5% IRR**, and the project does not require liquidation in the model. Follow-on capital (mezzanine debt or additional equity) may be prudent to optimize timing but is not required for capital return. Phase-1 investors additionally benefit from the Phases 2–3 backstop: later phases give the sponsor additional revenue capacity to support the targeted LP return.

### 7.2 Stress Test Summary Matrix

| Scenario | LP IRR (10-yr) | LP EMx | Outcome (Phase-1 model) |
|----------|:--------------:|:------:|-------------------------|
| **Base Case (Phase 1 — the offering)** | **32.1%** | **2.88x** | The offering as underwritten |
| A: −30% Pricing | 14.7% | 2.01x | Capital preserved; ~2x returned |
| B: −50% Absorption | 25.5% | 2.92x | Timing shift only; multiple intact |
| C: +25% Cost Overrun | 23.6% | 2.50x | Attractive return retained |
| D: Combined Worst (<1% est. probability) | 11.5% | 1.79x | Capital preserved; positive multiple |
| Phases 2–3 proceed | — | — | Upside beyond the base case (context — not required for the projected return) |

---

## 8. Break-Even Sensitivity

### 8.1 Break-Even Under Base Conditions (Phase 1)

| Condition | Outcome |
|-----------|---------|
| Initial revenue | Year 1 (2027): $85,938 |
| First full revenue year | Year 2 (2028): $16,576,792 |
| Cumulative EBITDA break-even | Year 3 |
| Break-even under stressed conditions | Extends beyond Year 3 by roughly the severity of the applied stress [TO CONFIRM exact years on the Phase-1 re-run] |

### 8.2 Early Revenue Support

Break-even resilience is supported by early, high-margin revenue: residential lot sales of $10,817,449 concentrated in Years 2–3 ($5,299,483 + $5,517,966 across 80 lots), tiny-home sales of $8,856,322 in Year 2 (60 homes), plus hospitality/nature-stay revenue ramping from Year 1.

### 8.3 Pricing Floor Analysis

Per-type pricing floors (price at which unit-level margin reaches zero) are maintained in the financial model and are [TO CONFIRM] for publication. Directionally, residential lots retain positive margin under all tested price stresses given their infrastructure-only cost basis.

---

## 9. Risk-Adjusted Returns

### 9.1 Probability-Weighted Expected Return

Scenario-specific IRR/EMx values have been **computed on the Phase-1 model**: Conservative **18.2% / 2.15x**, Base **32.1% / 2.88x**, Optimistic **46.2% / 3.66x** (§3.2), with every single-variable and stress case in §4 and §7 preserving LP capital. Formal probability weights for a blended expected return remain subject to management sign-off — **[TO CONFIRM]**. The published base-case figures are the Phase-1 offering economics: **LP IRR 32.1% / EMx 2.88x / total distributions $14,834,476 (10-yr)** and **25.7% / 1.79x / $9,217,829 (5-yr, interim — loan not repaid at Year 5)**.

### 9.2 Context vs. Alternatives

Development-stage community projects typically target mid-teens to mid-20s IRRs; stabilized Austin multifamily typically prices at low-double-digit IRRs. Abundancia's Phase-1 base-case 32.1% 10-year LP IRR reflects development-stage risk, the diversified Phase-1 revenue mix, and the early tiny-home/lot/hospitality revenue profile. Comparative benchmark figures are estimates and [TO CONFIRM].

### 9.3 Downside Protection Summary

| Protection | Detail |
|-----------|--------|
| **Phase-1 underwriting (the headline)** | The former "Phase-1-only downside scenario" is now the Base Case — the offering does not rely on Phases 2–3 |
| Phases 2–3 backstop | Later phases give the sponsor additional revenue capacity to support the targeted LP return (target ≥32% IRR) |
| 20% distribution reserve | Withheld annually from positive cash flows as a safety buffer; released Year 10 (subject to final documentation) |
| Early lot + tiny-home revenue | $10.82M of lot sales (Years 2–3) and $8.86M of tiny-home sales (Year 2) |
| Recurring hospitality income | Rentals & Hospitality $32.5M over 10 years anchors Years 4–10 cash flow |

---

## 10. Mitigation Strategies

### 10.1 Risk Mitigation by Variable

| Risk | Mitigation Strategy | Residual Risk |
|------|-------------------|---------------|
| **Absorption slowdown** | Phased construction (build against demonstrated demand); 10,000-person interest list + 100+ investors/buyers/collaborators with zero paid marketing; conversion flexibility between for-sale and rental product | Moderate: market risk cannot be fully eliminated |
| **Price decline** | Per-type pricing; product mix flexibility (shift toward higher-margin lots); value engineering | Moderate: pricing is ultimately market-driven |
| **Construction cost overrun** | Fixed-price GC contracts where possible; contingency reserves (Phase-1 allocation [TO CONFIRM]); phased procurement; hempcrete supply-chain development | Low-to-Moderate: contracts transfer most risk |
| **Interest rate increase** | Rate management on the 8.5% Phase-1 facility ($7,700,000, 10-yr fully amortizing); pre-sale requirements before phase starts; adjustable phase timing | Moderate: macro risk with limited hedge options |
| **Occupancy shortfall** | Multi-platform distribution; corporate retreat partnerships (retreat market $31.8B → $73.7B by 2034); flexible stay formats (glamping/domes/camping) | Moderate: hospitality is 54.6% of Phase-1 revenue — the dominant recurring stream |
| **Permitting delay** | No county zoning (mixed use by right); 12–16-month permitting estimate; experienced civil lead (Fred Haas, PE); MUD engineering underway; early TCEQ/OSSF and county floodplain coordination; conservation subdivision pathway for Houston toad / Lost Pines HCP | Low-to-Moderate |
| **Water availability** | Layered supply: Aqua WSC service; 7 existing ponds (+ more to be created); 6 wells + 13 storage tanks + filtration; rainwater capture on every building (~9–11M gal/yr at build-out); 11 atmospheric water generators; low-flow + greywater demand reduction; full watershed analysis by Symbiosis TX commissioned immediately upon entering due diligence | Low-to-Moderate: hydrology verification is first predevelopment spend |
| **Inflation spike** | Real asset hedge; escalation embedded in model; indexed contracts | Low: inflation benefits asset values |

### 10.2 Structural Protections

| Protection | Mechanism |
|-----------|-----------|
| 10% LP Preferred Return | Cumulative preferred return to Class A LP capital before GP promote; return of capital LP-class first (subject to final documentation) |
| 20% Distribution Reserve | Withheld annually from positive cash flows as a safety buffer; released Year 10 |
| Phase-1 Underwriting | The offering is underwritten on Phase 1 alone; Phases 2–3 are upside and a sponsor backstop |
| Phased Capital Deployment | Capital deployed in tranches tied to milestones |
| Phase-Gating | Construction phases proceed against demonstrated demand |
| GP Co-Investment | $500,000 GP co-invest (8.84% of equity, pari passu) aligning incentives with LP returns |
| Independent Cost Review | Third-party construction cost verification at phase gates |
| Quarterly Reporting | Financial transparency with investor reporting cadence |

---

*This sensitivity analysis should be evaluated in conjunction with Document 06 (10-Year Financial Projections), Document 07 (Unit Economics), and Document 09 (Cap Table & Distribution Waterfall). All projections are estimates and actual results may vary materially. Items marked [TO CONFIRM] are pending the full scenario re-run on the Phase-1 financial model.*

---

**End of Document 08**
