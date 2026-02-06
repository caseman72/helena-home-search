# Wissenschaftliche Immobilienanalyse -- Helena, MT -- February 5, 2026

## Complete Composite Scoring Report

### Generated: 2026-02-05

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Properties Analyzed | 28 |
| Cash Flow Positive (RentDelta > $0) | 2 (7.1%) |
| Fair Value or Better (ZestDelta >= $0) | 5 (17.9%) |
| Ideal Distance (5-20 mi) | 14 (50.0%) |
| Close Distance (<5 mi) | 14 (50.0%) |
| Data Anomalies Flagged | 2 |
| Missing Zillow Data ($0/$0) | 3 |
| Price Range | $339,000 - $799,000 |
| Median Price | $599,450 |

### Top 3 Recommendations

| Rank | Property | Composite | Investment Thesis |
|:----:|----------|:---------:|-------------------|
| 1 | 1344 Beaverhead Rd | 69.3 | Fair-value Zestimate + strong $/sqft ($187) + extreme DOM (185) negotiation leverage |
| 2 | 809 E Groschell St | 66.0 | Best cash flow (+$455/mo) + near-fair Zestimate + lowest price tier ($425K) |
| 3 | 7626 Roughsawn Dr | 64.5 | Balanced profile: good cash flow proximity (-$65), solid $/sqft ($189), 138 DOM leverage |

---

## 1. Data Integrity Check

### Completeness Verification

- **Total properties in dataset**: 28
- **All required fields present**: Yes (Price, Monthly, $/sqft, Sqft, Lot, B/B, Miles, Drive, DOM, ZestDelta, RentDelta, TaxDelta)
- **Price range**: $339,000 (1655 Joslyn St) to $799,000 (three properties tied)
- **Geographic coverage**: Helena (20), East Helena (3), Clancy (3), plus 2 bordering

### Anomalies Flagged

#### Critical Anomaly #1: 22 Meadow Ln, Clancy -- ZestDelta of -$351,500

- **Severity**: CRITICAL
- **ZestDelta**: -$351,500 (Zestimate is $273,500 vs. asking price $625,000)
- **Context**: The next-most-negative ZestDelta is -$25,606 (6870 Scratchgravel Dr). This value is **13.7x larger** than the next worst.
- **Possible causes**: Zillow algorithm error, land-only valuation, unreported structural defects, or recent major renovation not yet captured
- **Impact on analysis**: EXCLUDED from ZestDelta normalization. ZestDelta score set to 0.

#### Critical Anomaly #2: 5260 Echo Dr, Helena -- 240 sqft at $1,079/sqft

- **Severity**: CRITICAL
- **Details**: 240 sqft, 1 bed/1 bath, priced at $429,000 = $1,079/sqft
- **Context**: This is almost certainly a cabin/tiny home on 7.3 acres. The land ($429K / 7.3 ac = $58,767/ac) is the real asset; the $/sqft metric is meaningless here.
- **Impact on analysis**: EXCLUDED from $/sqft normalization. $/sqft score set to 0.

### Missing Zillow Data ($0 ZestDelta AND $0 RentDelta)

These 3 properties have no Zestimate or Rent Zestimate data from Zillow, suggesting newly listed or data-sparse properties:

| Property | Price | DOM | Notes |
|----------|------:|----:|-------|
| 5 Crazy Mountain Rd, Clancy | $799,000 | 2 | Brand new listing, no Zillow data yet |
| 1115 Saddle Dr, Helena | $799,000 | 105 | Long DOM but no Zillow data -- unusual |
| 1344 Beaverhead Rd, Helena | $599,000 | 185 | Very long DOM, no Zillow data -- concerning |

**Note**: These properties receive a perfect 100.0 ZestDelta score (since $0 is the maximum) and a 75.6 RentDelta score ($0 is neutral, not positive). This inflates their composite scores. Interpret rankings for these properties with caution.

### Additional $0 ZestDelta Properties (with RentDelta data)

| Property | Price | ZestDelta | RentDelta | DOM |
|----------|------:|----------:|----------:|----:|
| 3562 Strandberg Dr | $559,000 | $0 | -$562 | 46 |
| 2315 Cattle Dr | $649,000 | $0 | -$1,209 | 270 |

These have rent estimates but no Zestimates. The $0 ZestDelta may indicate fair pricing or simply missing data.

---

## 2. Tiered Analysis

### Tier A: Cash Flow Leaders (RentDelta > $0)

Only **2 out of 28 properties** (7.1%) show positive rental cash flow -- a stark indicator of the Helena market's current pricing tension.

```
 809 E Groschell St, East Helena
   RentDelta: +$455 | Monthly: $2,346
   $/sqft: $216 | Sqft: 1,970 | Lot: 0.3 ac
   Distance: 4.7 mi (Close) | DOM: 9
   ZestDelta: -$1,200 | TaxDelta: -$86,300
   B/B: 5/2 | Price: $425,000

   ASSESSMENT: The strongest cash flow property in the dataset. At $425K
   with +$455/mo positive cash flow, this is a legitimate rental investment
   candidate. The -$1,200 ZestDelta is negligible (essentially fair value).
   Low DOM (9) means the market agrees on value -- move quickly.
   Tax assessment $86K below asking is typical for East Helena.
```

```
 1010 Motsiff Rd, Helena
   RentDelta: +$248 | Monthly: $2,879
   $/sqft: $150 | Sqft: 3,431 | Lot: 0.5 ac
   Distance: 2.1 mi (Close) | DOM: 63
   ZestDelta: -$10,400 | TaxDelta: -$41,200
   B/B: 4/3 | Price: $515,000

   ASSESSMENT: Second-best cash flow with the second-lowest $/sqft ($150)
   in the entire dataset (excluding Echo Dr anomaly). At 3,431 sqft for
   $515K, this is exceptional space-per-dollar. The -$10,400 ZestDelta
   suggests slight overpricing (~2%), but the rental math works.
   63 DOM provides moderate negotiation leverage.
```

**Combined monthly positive cash flow potential: $703/mo = $8,436/year**

### Tier B: Value Efficiency Leaders (Top 5 Lowest $/sqft, Excluding Echo Dr)

| Rank | Property | $/sqft | Price | Sqft | Lot | B/B | RentDelta | Composite |
|:----:|----------|-------:|------:|-----:|----:|:---:|----------:|:---------:|
| 1 | 610 Timber Ridge Rd | **$134** | $799,000 | 3,256 | 15.0 ac | 5/4 | -$882 | 53.7 |
| 2 | 1010 Motsiff Rd | **$150** | $515,000 | 3,431 | 0.5 ac | 4/3 | +$248 | 62.5 |
| 3 | 22 Meadow Ln, Clancy | **$165** | $625,000 | 2,764 | 7.3 ac | 3/3 | -$507 | 49.5 |
| 4 | 5 Crazy Mtn Cul De Sac | **$166** | $645,000 | 3,699 | 1.3 ac | 3/3 | -$399 | 52.9 |
| 5 | 920 Sierra Rd W | **$185** | $425,000 | 2,184 | 1.0 ac | 3/2 | -$332 | 48.2 |

**Analysis**: 610 Timber Ridge Rd leads at $134/sqft with 15 acres -- a Montana dream property on paper. However, its -$882 RentDelta and -$24,400 ZestDelta dampen the investment case. 1010 Motsiff Rd at $150/sqft with POSITIVE cash flow is the clear value-efficiency winner when accounting for investment viability.

### Tier C: Equity Play Candidates (Best ZestDelta, Excluding Meadow Ln)

Properties at or nearest to fair Zestimate value (ZestDelta closest to $0 or positive):

| Rank | Property | ZestDelta | Price | DOM | RentDelta | Notes |
|:----:|----------|----------:|------:|----:|----------:|-------|
| 1 | 5 Crazy Mountain Rd | $0 | $799,000 | 2 | $0 | Missing data -- not a true equity signal |
| 2 | 3562 Strandberg Dr | $0 | $559,000 | 46 | -$562 | Possibly missing data |
| 3 | 1115 Saddle Dr | $0 | $799,000 | 105 | $0 | Missing data -- 105 DOM is concerning |
| 4 | 2315 Cattle Dr | $0 | $649,000 | 270 | -$1,209 | Likely missing data; 270 DOM is a red flag |
| 5 | 1344 Beaverhead Rd | $0 | $599,000 | 185 | $0 | Missing data; 185 DOM raises questions |

**WARNING**: All five "best" ZestDelta properties show $0, which likely indicates **missing Zillow data** rather than perfect fair-value pricing. The first truly data-backed equity candidates are:

| Rank | Property | ZestDelta | Price | DOM | RentDelta |
|:----:|----------|----------:|------:|----:|----------:|
| 6 | 809 E Groschell St | -$1,200 | $425,000 | 9 | +$455 |
| 7 | 3875 Saint Marys Rd | -$2,800 | $579,000 | 16 | -$277 |
| 8 | 7626 Roughsawn Dr | -$6,700 | $680,000 | 138 | -$65 |
| 9 | 1250 Angus Rd | -$8,900 | $515,000 | 8 | -$295 |
| 10 | 674 Jeanne Rd | -$9,900 | $595,000 | 41 | -$453 |

**809 E Groschell St** is the clear equity play winner with real data: only -$1,200 below Zestimate (essentially fair value) combined with the best cash flow in the dataset.

---

## 3. Composite Scoring Matrix

### Scoring Methodology

#### Weighted Formula (100 points maximum)

| Component | Weight | Normalization Method | Best = 100 |
|-----------|:------:|----------------------|------------|
| RentDelta | 25% | (Value - Min) / Range | +$455 (809 E Groschell St) |
| ZestDelta | 20% | (Value - Min) / Range | $0 (multiple; excl. Meadow Ln) |
| $/sqft | 20% | INVERTED: (Max - Value) / Range | $134 (610 Timber Ridge; excl. Echo Dr) |
| Lot Size | 15% | (Value - Min) / Range | 15.0 ac (610 Timber Ridge) |
| Distance | 10% | Categorical: Ideal=100, Close=70 | Ideal (5-20 mi) |
| DOM | 10% | (Value - Min) / Range | 270 days (2315 Cattle Dr) |

#### Data Ranges Used for Normalization

| Metric | Minimum | Maximum | Range | Exclusions |
|--------|--------:|--------:|------:|------------|
| RentDelta | -$1,410 | +$455 | $1,865 | None |
| ZestDelta | -$25,606 | $0 | $25,606 | 22 Meadow Ln (-$351,500) |
| $/sqft | $134 | $442 | $308 | 5260 Echo Dr ($1,079) |
| Lot Size | 0.3 ac | 15.0 ac | 14.7 ac | None |
| DOM | 2 days | 270 days | 268 days | None |

### Full Ranked Scoring Table (All 28 Properties)

| Rank | Property | Composite | RentD (25%) | ZestD (20%) | $/sqft (20%) | Lot (15%) | Dist (10%) | DOM (10%) |
|:----:|----------|:---------:|:-----------:|:-----------:|:------------:|:---------:|:----------:|:---------:|
| 1 | 1344 Beaverhead Rd, Helena | **69.3** | 75.6 | 100.0 | 82.8 | 0.0 | 70.0 | 68.3 |
| 2 | 809 E Groschell St, East Helena | **66.0** | 100.0 | 95.3 | 73.4 | 0.0 | 70.0 | 2.6 |
| 3 | 7626 Roughsawn Dr, Helena | **64.5** | 72.1 | 73.8 | 82.1 | 1.4 | 100.0 | 50.7 |
| 4 | 1010 Motsiff Rd, Helena | **62.5** | 88.9 | 59.4 | 94.8 | 1.4 | 70.0 | 22.8 |
| 5 | 5 Crazy Mountain Rd, Clancy | **62.3** | 75.6 | 100.0 | 63.3 | 4.8 | 100.0 | 0.0 |
| 6 | 1115 Saddle Dr, Helena | **61.1** | 75.6 | 100.0 | 56.5 | 0.7 | 70.0 | 38.4 |
| 7 | 2315 Cattle Dr, East Helena | **58.3** | 10.8 | 100.0 | 53.9 | 32.0 | 100.0 | 100.0 |
| 8 | 3562 Strandberg Dr, Helena | **53.8** | 45.5 | 100.0 | 65.3 | 4.8 | 70.0 | 16.4 |
| 9 | 610 Timber Ridge Rd, Helena | **53.7** | 28.3 | 4.7 | 100.0 | 100.0 | 100.0 | 7.1 |
| 10 | 5 Crazy Mtn Cul De Sac, Clancy | **52.9** | 54.2 | 28.5 | 89.6 | 6.8 | 100.0 | 47.4 |
| 11 | 674 Jeanne Rd, Helena | **50.6** | 51.3 | 61.3 | 66.2 | 5.4 | 100.0 | 14.6 |
| 12 | 3875 Saint Marys Rd, East Helena | **50.3** | 60.8 | 89.1 | 47.7 | 1.4 | 70.0 | 5.2 |
| 13 | 1250 Angus Rd, Helena | **49.7** | 59.8 | 65.2 | 56.2 | 1.4 | 100.0 | 2.2 |
| 14 | 22 Meadow Ln, Clancy | **49.5** | 48.4 | 0.0 | 89.9 | 47.6 | 100.0 | 22.4 |
| 15 | 3259 Snaffle Bit Ct, Helena | **49.5** | 54.4 | 43.0 | 80.8 | 9.5 | 70.0 | 27.6 |
| 16 | 4540 Lake Helena Dr, Helena | **48.7** | 40.8 | 43.0 | 79.2 | 11.6 | 100.0 | 23.5 |
| 17 | 920 Sierra Rd W, Helena | **48.2** | 57.8 | 45.3 | 83.4 | 4.8 | 70.0 | 3.0 |
| 18 | 6325 Blackfoot Dr, Helena | **47.8** | 62.1 | 49.6 | 71.4 | 1.4 | 70.0 | 8.6 |
| 19 | 5530 N Montana Ave, Helena | **44.8** | 46.4 | 32.0 | 70.1 | 2.0 | 70.0 | 54.9 |
| 20 | 1655 Joslyn St, Helena | **39.4** | 71.3 | 0.0 | 49.7 | 1.4 | 70.0 | 44.4 |
| 21 | 6299 N Montana Ave, Helena | **39.3** | 46.4 | 21.1 | 63.6 | 4.1 | 70.0 | 31.7 |
| 22 | 4747 Shore View Rd, Helena | **37.0** | 37.3 | 39.5 | 39.0 | 11.6 | 100.0 | 3.0 |
| 23 | 1701 Cannon St, Helena | **35.2** | 34.5 | 14.5 | 81.2 | 0.0 | 70.0 | 4.1 |
| 24 | 3231 Quarter Horse Ct, Helena | **32.2** | 30.8 | 14.9 | 48.1 | 11.6 | 100.0 | 1.9 |
| 25 | 6870 Scratchgravel Dr, Helena | **30.0** | 27.1 | 0.0 | 68.8 | 5.4 | 70.0 | 16.0 |
| 26 | 5260 Echo Dr, Helena | **29.9** | 22.4 | 34.4 | 0.0 | 47.6 | 100.0 | 2.6 |
| 27 | 835 Vallejo Rd, Helena | **21.0** | 19.6 | 1.2 | 41.9 | 2.7 | 70.0 | 0.7 |
| 28 | 1325 Cambray Loop, Helena | **15.7** | 0.0 | 26.2 | 0.0 | 1.4 | 70.0 | 32.5 |

### Score Distribution

| Tier | Range | Count | Properties |
|------|:-----:|:-----:|------------|
| A-Tier: Strong Buy | 60+ | 6 | Beaverhead, Groschell, Roughsawn, Motsiff, Crazy Mtn Rd, Saddle |
| B-Tier: Buy | 50-59.9 | 5 | Cattle Dr, Strandberg, Timber Ridge, Crazy Mtn CDS, Jeanne |
| C-Tier: Consider | 40-59.9 | 7 | Saint Marys, Angus, Meadow Ln, Snaffle Bit, Lake Helena, Sierra, Blackfoot |
| D-Tier: Negotiate Hard | 30-39.9 | 5 | N Montana (x2), Joslyn, Shore View, Cannon |
| F-Tier: Avoid | <30 | 5 | Quarter Horse, Scratchgravel, Echo, Vallejo, Cambray |

---

## 4. Final Recommendations

### Overall Winner (Hochste Gesamtwertung)

**809 E Groschell St, East Helena -- Composite: 66.0**

| Metric | Value | Score |
|--------|------:|------:|
| Price | $425,000 | -- |
| Monthly Payment | $2,346 | -- |
| RentDelta | **+$455** | 100.0 |
| ZestDelta | -$1,200 | 95.3 |
| $/sqft | $216 | 73.4 |
| Lot | 0.3 ac | 0.0 |
| Distance | 4.7 mi (Close) | 70.0 |
| DOM | 9 | 2.6 |
| B/B | 5/2 | -- |
| TaxDelta | -$86,300 | -- |

**Investment thesis**: This is the only property in the dataset that simultaneously delivers: (1) the highest positive cash flow at +$455/mo, (2) near-fair Zestimate pricing at only -$1,200, and (3) a sub-$450K entry point. The 5-bed/2-bath configuration at 1,970 sqft offers strong rental appeal. The -$86,300 TaxDelta (assessed $86K below asking) is moderate for the area. The only weakness is the tiny 0.3-acre lot and low DOM (9 days) which limits negotiation leverage -- this property will not last.

**Recommended action**: Submit offer immediately at asking price or within 2-3% below.

---

### Runner-Up

**1010 Motsiff Rd, Helena -- Composite: 62.5**

| Metric | Value | Score |
|--------|------:|------:|
| Price | $515,000 | -- |
| Monthly Payment | $2,879 | -- |
| RentDelta | **+$248** | 88.9 |
| ZestDelta | -$10,400 | 59.4 |
| $/sqft | **$150** | 94.8 |
| Lot | 0.5 ac | 1.4 |
| Distance | 2.1 mi (Close) | 70.0 |
| DOM | 63 | 22.8 |
| B/B | 4/3 | -- |
| TaxDelta | -$41,200 | -- |

**Investment thesis**: The second-lowest $/sqft in the dataset ($150) combined with the second-best cash flow (+$248/mo) makes this a compelling value play. At 3,431 sqft, this is a massive home for $515K. The 63 DOM provides enough leverage to negotiate 3-5% off asking. The -$10,400 ZestDelta (~2% overpriced) is within normal negotiation range. Close to downtown Helena at 2.1 miles.

**Recommended action**: Offer $495,000-$500,000 (3-4% below asking), citing 63 DOM.

---

### Honorable Mention: 7626 Roughsawn Dr -- Composite: 64.5

This property earns third place with the most balanced scorecard in the dataset: no score below 1.4 (lot) and four scores above 50. At $189/sqft for 3,592 sqft with 6-bed/3-bath, the space is enormous. The -$65 RentDelta means it is essentially break-even on cash flow. With 138 DOM, there is significant negotiation leverage. The -$6,700 ZestDelta is modest. This is the best "large family home" option in the dataset.

---

### Category Winners

#### Best Cash Flow
**809 E Groschell St, East Helena**: +$455/mo

The only property generating meaningful positive cash flow. At $455/mo above estimated costs, this yields $5,460/year in positive cash flow -- a 1.28% annual cash-on-cash return on the $425K purchase price (not counting the 20% down payment leverage, which pushes actual cash-on-cash to 6.4% on the $85K down payment).

Runner-up: 1010 Motsiff Rd at +$248/mo ($2,976/year).

#### Best Value (Lowest $/sqft)
**610 Timber Ridge Rd, Helena**: $134/sqft

At $134/sqft with 15 acres and 3,256 sqft (5-bed/4-bath), this is the dataset's premier space-and-land value. However, the -$882 RentDelta and -$24,400 ZestDelta mean you are paying a premium the market does not fully support. This is a lifestyle purchase, not an investment play.

Runner-up: 1010 Motsiff Rd at $150/sqft (which IS also an investment play).

#### Best Equity Play
**809 E Groschell St, East Helena**: ZestDelta -$1,200

Among properties with verified Zillow data (excluding $0 ZestDelta properties with likely missing data), 809 E Groschell St has the smallest gap between asking price and Zestimate. At -$1,200 (0.28% below Zestimate), this is essentially fair market pricing.

Runner-up: 3875 Saint Marys Rd at -$2,800 (0.48% below Zestimate).

Note: Multiple properties show $0 ZestDelta (5 Crazy Mountain Rd, 3562 Strandberg Dr, 1115 Saddle Dr, 2315 Cattle Dr, 1344 Beaverhead Rd), but these likely reflect missing Zillow data rather than perfect pricing.

#### Best Location
**1344 Beaverhead Rd, Helena**: 1.4 mi from center (Close)

The closest property to downtown Helena at just 1.4 miles. A 5-bed/3-bath, 3,200 sqft home at $599,000 ($187/sqft). The 185 DOM is concerning but also provides maximum negotiation leverage for an in-town property.

Runner-up: 1325 Cambray Loop at 1.2 mi, but its $442/sqft and -$1,410 RentDelta make it the worst-scoring property in the dataset (15.7 composite).

#### Best Negotiation Target (Highest DOM)
**2315 Cattle Dr, East Helena**: 270 days on market

At 270 DOM, this seller has been waiting nearly 9 months. The $649,000 asking price on a 3-bed/2-bath, 1,946 sqft home on 5 acres suggests significant overpricing (the $276/sqft is well above market for the area). The -$1,209 RentDelta confirms this. Offer 10-15% below asking ($550K-$585K) and expect a counter.

Runner-up: 1344 Beaverhead Rd at 185 DOM, and 5530 N Montana Ave at 149 DOM.

---

## 5. Warnungen (Warnings)

### Data Anomalies

| Property | Anomaly | Severity | Impact |
|----------|---------|:--------:|--------|
| 22 Meadow Ln, Clancy | ZestDelta of -$351,500 (Zestimate ~$273,500 vs. $625,000 ask) | CRITICAL | Excluded from ZestDelta normalization; score set to 0 |
| 5260 Echo Dr, Helena | 240 sqft at $1,079/sqft (cabin/tiny home on 7.3 acres) | CRITICAL | Excluded from $/sqft normalization; score set to 0 |
| 6870 Scratchgravel Dr | ZestDelta of -$25,606 (worst in dataset after exclusion) | HIGH | Zestimate suggests $751,800 vs. $777,406 ask -- 3.3% overpriced |
| 1325 Cambray Loop | RentDelta of -$1,410 (worst in dataset) and $442/sqft | HIGH | Severely overpriced for rental investment; $/sqft 3.3x the best value |

### Missing Zillow Data Properties

Three properties show $0 for BOTH ZestDelta and RentDelta, indicating Zillow has no valuation data:

| Property | Price | DOM | Risk Assessment |
|----------|------:|----:|-----------------|
| 5 Crazy Mountain Rd, Clancy | $799,000 | 2 | LOW -- brand new listing, data will populate |
| 1115 Saddle Dr, Helena | $799,000 | 105 | MEDIUM -- 105 DOM without Zillow data is unusual |
| 1344 Beaverhead Rd, Helena | $599,000 | 185 | HIGH -- 185 DOM without Zillow data suggests possible delisting/relisting or data issues |

**Impact on scoring**: These properties receive inflated ZestDelta scores (100.0) and neutral RentDelta scores (75.6). Their composite rankings should be discounted accordingly:
- 1344 Beaverhead Rd (Rank #1, 69.3) -- would likely score ~45-55 with real data
- 5 Crazy Mountain Rd (Rank #5, 62.3) -- would likely score ~40-50 with real data
- 1115 Saddle Dr (Rank #6, 61.1) -- would likely score ~40-50 with real data

### Winter Access Concerns (Clancy/Mountain Properties)

| Property | Miles | Elevation Concerns |
|----------|------:|-------------------|
| 5 Crazy Mountain Rd, Clancy | 7.8 | Mountain road access; potential snow/ice issues Nov-Mar |
| 22 Meadow Ln, Clancy | 9.0 | Rural Clancy; road maintenance may be limited |
| 5 Crazy Mtn Cul De Sac, Clancy | 7.9 | Same mountain road corridor as 5 Crazy Mountain Rd |
| 610 Timber Ridge Rd, Helena | 8.9 | 15-acre rural property; driveway maintenance is owner responsibility |

**Recommendation**: Schedule property visits during winter months to assess actual road conditions. Budget for snow removal costs ($2,000-$5,000/year for rural properties).

### High DOM Properties (100+ Days)

Properties with extended market time warrant investigation into WHY they have not sold:

| Property | DOM | Price | Possible Concerns |
|----------|----:|------:|-------------------|
| 2315 Cattle Dr | 270 | $649,000 | Severe overpricing ($276/sqft for East Helena); -$1,209 RentDelta |
| 1344 Beaverhead Rd | 185 | $599,000 | No Zillow data; possible hidden issues |
| 5530 N Montana Ave | 149 | $595,000 | -$17,400 ZestDelta; corridor traffic noise? |
| 7626 Roughsawn Dr | 138 | $680,000 | -$6,700 ZestDelta; may just need price reduction |
| 5 Crazy Mtn Cul De Sac | 129 | $645,000 | Clancy location; -$18,300 ZestDelta; winter access |
| 1655 Joslyn St | 121 | $339,000 | -$25,600 ZestDelta; 2/1 layout limits buyer pool |
| 1115 Saddle Dr | 105 | $799,000 | No Zillow data; $799K is top-of-market |

**Pattern**: The $700K+ price tier and Clancy/mountain locations are the most common factors in extended DOM.

### TaxDelta Observations

Properties where asking price significantly exceeds tax-assessed value:

| Property | TaxDelta | Asking | Implied Tax Assessment |
|----------|--------:|-------:|----------------------:|
| 610 Timber Ridge Rd | -$278,600 | $799,000 | ~$520,400 |
| 3562 Strandberg Dr | -$258,100 | $559,000 | ~$300,900 |
| 5530 N Montana Ave | -$249,102 | $595,000 | ~$345,898 |
| 674 Jeanne Rd | -$245,500 | $595,000 | ~$349,500 |
| 5260 Echo Dr | -$225,700 | $429,000 | ~$203,300 |

Large negative TaxDeltas are common in Montana where assessments lag market values. However, extreme gaps (>$200K) may indicate either rapid appreciation or aggressive pricing by sellers. These properties may face future tax reassessment increases.

**Positive TaxDelta properties** (tax assessment ABOVE asking -- potentially underpriced):

| Property | TaxDelta | Asking | Implied Tax Assessment |
|----------|--------:|-------:|----------------------:|
| 1115 Saddle Dr | +$22,390 | $799,000 | ~$821,390 |
| 3259 Snaffle Bit Ct | +$15,736 | $675,000 | ~$690,736 |

These two properties are assessed ABOVE their asking prices, which could indicate genuine underpricing or recent price reductions.

---

## Appendix: Market Context

### Helena Market Snapshot (Feb 2026)

- **Median asking price in this dataset**: $599,450
- **Mean asking price**: $599,536
- **Median $/sqft (excl. Echo Dr)**: $230
- **Mean monthly payment**: $3,298
- **Cash flow positive rate**: 7.1% (2 of 28) -- indicates a seller's market with limited rental investment opportunity
- **Average DOM**: 62.5 days
- **Median DOM**: 41 days

### Price Tier Distribution

| Price Tier | Count | % |
|-----------|:-----:|:-:|
| Under $450K | 4 | 14.3% |
| $450K-$599K | 8 | 28.6% |
| $600K-$699K | 8 | 28.6% |
| $700K-$799K | 8 | 28.6% |

---

## Assumptions Used

| Parameter | Value | Source |
|-----------|-------|--------|
| Down Payment | 20% | User-defined |
| Interest Rate | 5.88% | User-defined |
| Monthly Payment | Includes P&I + tax + insurance | Pre-calculated |
| Target Coordinates | Helena, MT center | User-defined |
| Ideal Distance | 5-20 miles | User-defined |
| Close Distance | <5 miles | User-defined |

---

## File Information

- **Source Data**: `new_homes.2026-02-05.md`
- **Analysis Date**: 2026-02-05
- **Properties Analyzed**: 28
- **Methodology**: Weighted composite scoring (Wissenschaftliche Methodik)
- **Anomalies Excluded**: 2 (22 Meadow Ln ZestDelta, 5260 Echo Dr $/sqft)
- **Missing Data Properties**: 3 ($0/$0 ZestDelta/RentDelta)

---

*Bericht erstellt mit deutscher Ingenieursprazision -- Report generated with German-engineering precision*
