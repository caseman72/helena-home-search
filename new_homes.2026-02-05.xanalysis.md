# Wissenschaftliche Immobilienanalyse -- Helena, MT -- 2026-02-06

## Complete Composite Scoring Report

### Generated: 2026-02-06

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Properties Analyzed | 28 |
| Cash Flow Positive (RentDelta > $0) | 2 (7.1%) |
| Fair Value or Better (ZestDelta >= $0) | 5 (17.9%) |
| Ideal Distance (5-20 mi) | 12 (42.9%) |
| Close Distance (<5 mi) | 16 (57.1%) |
| Data Anomalies Flagged | 2 |
| Missing Zillow Data ($0/$0) | 3 |
| Price Range | $339,000 - $799,000 |
| Median Price | $599,450 |

### Top 3 Recommendations

| Rank | Property | Composite | Key Strengths |
|:----:|----------|:---------:|---------------|
| 1 | 1344 Beaverhead Rd, Helena, MT 59602 | 69.3 | Missing Zillow data; Strong $/sqft ($187); 185 DOM negotiation leverage |
| 2 | 809 E Groschell St, East Helena, MT 59635 | 66 | +$455/mo cash flow; Near-fair Zestimate (-$1,200); Strong $/sqft ($216) |
| 3 | 7626 Roughsawn Dr, Helena, MT 59602 | 64.5 | Strong $/sqft ($189); 138 DOM negotiation leverage |

---

## 1. Data Integrity Check

### Anomalies Flagged

- **22 Meadow Ln, Clancy, MT 59634**: ZestDelta of -$351,500 — EXCLUDED from ZestDelta normalization (score set to 0)
- **5260 Echo Dr, Helena, MT 59602**: 240 sqft at $1,079/sqft — EXCLUDED from $/sqft normalization (score set to 0)

### Missing Zillow Data ($0 ZestDelta AND $0 RentDelta)

| Property | Price | DOM | Notes |
|----------|------:|----:|-------|
| 5 Crazy Mountain Rd, Clancy, MT 59634 | $799,000 | 2 | New listing, data pending |
| 1115 Saddle Dr, Helena, MT 59601 | $799,000 | 105 | Long DOM without data — concerning |
| 1344 Beaverhead Rd, Helena, MT 59602 | $599,000 | 185 | Long DOM without data — concerning |

**Note**: These properties receive inflated ZestDelta scores (100.0) and neutral RentDelta scores. Interpret rankings with caution.

---

## 2. Cash Flow Leaders (RentDelta > $0)

**2 of 28** properties (7.1%) show positive rental cash flow.

```
 809 E Groschell St, East Helena, MT 59635
   RentDelta: +$455 | Monthly: $2,346
   $/sqft: $216 | Sqft: 1970 | Lot: 0.3 ac
   Distance: 4.7 mi (Close) | DOM: 9
   ZestDelta: -$1,200 | TaxDelta: -$86,300
   B/B: 5/2 | Price: $425,000
```

```
 1010 Motsiff Rd, Helena, MT 59602
   RentDelta: +$248 | Monthly: $2,879
   $/sqft: $150 | Sqft: 3431 | Lot: 0.5 ac
   Distance: 2.1 mi (Close) | DOM: 63
   ZestDelta: -$10,400 | TaxDelta: -$41,200
   B/B: 4/3 | Price: $515,000
```

**Combined monthly positive cash flow potential: $703/mo = $8,436/year**

---

## 3. Value Efficiency Leaders (Top 5 Lowest $/sqft)

| Rank | Property | $/sqft | Price | Sqft | Lot | B/B | RentDelta | Composite |
|:----:|----------|-------:|------:|-----:|----:|:---:|----------:|:---------:|
| 1 | 610 Timber Ridge Rd, Helena, MT 59602 | **$134** | $799,000 | 3256 | 15 ac | 5/4 | -$882 | 53.7 |
| 2 | 1010 Motsiff Rd, Helena, MT 59602 | **$150** | $515,000 | 3431 | 0.5 ac | 4/3 | $248 | 62.6 |
| 3 | 22 Meadow Ln, Clancy, MT 59634 | **$165** | $625,000 | 2764 | 7.3 ac | 3/3 | -$507 | 49.5 |
| 4 | 5 Crazy Mountain Cul De Sac, Clancy, MT 59634 | **$166** | $645,000 | 3699 | 1.3 ac | 3/3 | -$399 | 52.9 |
| 5 | 920 Sierra Rd W, Helena, MT 59602 | **$185** | $425,000 | 2184 | 1 ac | 3/2 | -$332 | 48.2 |

---

## 4. Composite Scoring Matrix

### Scoring Methodology

| Component | Weight | Normalization | Best = 100 |
|-----------|:------:|---------------|------------|
| RentDelta | 25% | (Value - Min) / Range | Highest cash flow |
| ZestDelta | 20% | (Value - Min) / Range | Closest to $0 |
| $/sqft | 20% | INVERTED: (Max - Value) / Range | Lowest $/sqft |
| Lot Size | 15% | (Value - Min) / Range, capped at 15 ac | Largest lot |
| Distance | 10% | Categorical mapping | Ideal (5-20 mi) |
| DOM | 10% | (Value - Min) / Range | Highest DOM |

### Data Ranges Used for Normalization

| Metric | Minimum | Maximum | Range | Exclusions |
|--------|--------:|--------:|------:|------------|
| RentDelta | -$1,410 | $455 | $1,865 | None |
| ZestDelta | -$25,606 | $0 | $25,606 | 22 Meadow Ln, Clancy, MT 59634 |
| $/sqft | $134 | $442 | $308 | 5260 Echo Dr, Helena, MT 59602 |
| Lot Size | 0.3 ac | 15 ac | 14.7 ac | None (capped at 15 ac) |
| DOM | 2 days | 270 days | 268 days | None |

### Full Ranked Scoring Table

| Rank | Property | Composite | RentD (25%) | ZestD (20%) | $/sqft (20%) | Lot (15%) | Dist (10%) | DOM (10%) |
|:----:|----------|:---------:|:-----------:|:-----------:|:------------:|:---------:|:----------:|:---------:|
| 1 | 1344 Beaverhead Rd, Helena, MT 59602 | **69.3** | 75.6 | 100 | 82.8 | 0 | 70 | 68.3 |
| 2 | 809 E Groschell St, East Helena, MT 59635 | **66** | 100 | 95.3 | 73.4 | 0 | 70 | 2.6 |
| 3 | 7626 Roughsawn Dr, Helena, MT 59602 | **64.5** | 72.1 | 73.8 | 82.1 | 1.4 | 100 | 50.7 |
| 4 | 1010 Motsiff Rd, Helena, MT 59602 | **62.6** | 88.9 | 59.4 | 94.8 | 1.4 | 70 | 22.8 |
| 5 | 5 Crazy Mountain Rd, Clancy, MT 59634 | **62.3** | 75.6 | 100 | 63.3 | 4.8 | 100 | 0 |
| 6 | 1115 Saddle Dr, Helena, MT 59601 | **61.1** | 75.6 | 100 | 56.5 | 0.7 | 70 | 38.4 |
| 7 | 2315 Cattle Dr, East Helena, MT 59635 | **58.3** | 10.8 | 100 | 53.9 | 32 | 100 | 100 |
| 8 | 3562 Strandberg Dr, Helena, MT 59602 | **53.8** | 45.5 | 100 | 65.3 | 4.8 | 70 | 16.4 |
| 9 | 610 Timber Ridge Rd, Helena, MT 59602 | **53.7** | 28.3 | 4.7 | 100 | 100 | 100 | 7.1 |
| 10 | 5 Crazy Mountain Cul De Sac, Clancy, MT 59634 | **52.9** | 54.2 | 28.5 | 89.6 | 6.8 | 100 | 47.4 |
| 11 | 674 Jeanne Rd, Helena, MT 59602 | **50.6** | 51.3 | 61.3 | 66.2 | 5.4 | 100 | 14.6 |
| 12 | 3875 Saint Marys Rd, East Helena, MT 59635 | **50.3** | 60.8 | 89.1 | 47.7 | 1.4 | 70 | 5.2 |
| 13 | 1250 Angus Rd, Helena, MT 59602 | **49.7** | 59.8 | 65.2 | 56.2 | 1.4 | 100 | 2.2 |
| 14 | 22 Meadow Ln, Clancy, MT 59634 | **49.5** | 48.4 | 0 | 89.9 | 47.6 | 100 | 22.4 |
| 15 | 3259 Snaffle Bit Ct, Helena, MT 59602 | **49.5** | 54.4 | 43 | 80.8 | 9.5 | 70 | 27.6 |
| 16 | 4540 Lake Helena Dr, Helena, MT 59602 | **48.7** | 40.8 | 43 | 79.2 | 11.6 | 100 | 23.5 |
| 17 | 920 Sierra Rd W, Helena, MT 59602 | **48.2** | 57.8 | 45.3 | 83.4 | 4.8 | 70 | 3 |
| 18 | 6325 Blackfoot Dr, Helena, MT 59602 | **47.8** | 62.1 | 49.6 | 71.4 | 1.4 | 70 | 8.6 |
| 19 | 5530 N Montana Ave, Helena, MT 59602 | **44.8** | 46.4 | 32 | 70.1 | 2 | 70 | 54.9 |
| 20 | 1655 Joslyn St, Helena, MT 59601 | **39.4** | 71.3 | 0 | 49.7 | 1.4 | 70 | 44.4 |
| 21 | 6299 N Montana Ave, Helena, MT 59602 | **39.3** | 46.4 | 21.1 | 63.6 | 4.1 | 70 | 31.7 |
| 22 | 4747 Shore View Rd, Helena, MT 59602 | **37.1** | 37.3 | 39.5 | 39 | 11.6 | 100 | 3 |
| 23 | 1701 Cannon St, Helena, MT 59601 | **35.2** | 34.5 | 14.5 | 81.2 | 0 | 70 | 4.1 |
| 24 | 3231 Quarter Horse Ct, Helena, MT 59602 | **32.2** | 30.8 | 14.9 | 48.1 | 11.6 | 100 | 1.9 |
| 25 | 5260 Echo Dr, Helena, MT 59602 | **29.9** | 22.4 | 34.4 | 0 | 47.6 | 100 | 2.6 |
| 26 | 6870 Scratchgravel Dr, Helena, MT 59602 | **29.9** | 27.1 | 0 | 68.8 | 5.4 | 70 | 16 |
| 27 | 835 Vallejo Rd, Helena, MT 59602 | **21** | 19.6 | 1.2 | 41.9 | 2.7 | 70 | 0.7 |
| 28 | 1325 Cambray Loop, Helena, MT 59602 | **15.7** | 0 | 26.2 | 0 | 1.4 | 70 | 32.5 |

### Score Distribution

| Tier | Range | Count | Properties |
|------|:-----:|:-----:|------------|
| A-Tier: Strong Buy | 60+ | 6 | 1344 Beaverhead Rd, 809 E Groschell St, 7626 Roughsawn Dr, 1010 Motsiff Rd, 5 Crazy Mountain Rd, 1115 Saddle Dr |
| B-Tier: Buy | 50-59.9 | 6 | 2315 Cattle Dr, 3562 Strandberg Dr, 610 Timber Ridge Rd, 5 Crazy Mountain Cul De Sac, 674 Jeanne Rd, 3875 Saint Marys Rd |
| C-Tier: Consider | 40-49.9 | 7 | 1250 Angus Rd, 22 Meadow Ln, 3259 Snaffle Bit Ct, 4540 Lake Helena Dr, 920 Sierra Rd W, 6325 Blackfoot Dr, 5530 N Montana Ave |
| D-Tier: Negotiate Hard | 30-39.9 | 5 | 1655 Joslyn St, 6299 N Montana Ave, 4747 Shore View Rd, 1701 Cannon St, 3231 Quarter Horse Ct |
| F-Tier: Avoid | <30 | 4 | 5260 Echo Dr, 6870 Scratchgravel Dr, 835 Vallejo Rd, 1325 Cambray Loop |

---

## 5. Category Winners

### Best Cash Flow
**809 E Groschell St, East Helena, MT 59635**: $455/mo

### Best Value (Lowest $/sqft)
**610 Timber Ridge Rd, Helena, MT 59602**: $134/sqft (3256 sqft on 15 ac)

### Best Equity Play
**2315 Cattle Dr, East Helena, MT 59635**: ZestDelta $0 (0.0% from Zestimate)

### Best Negotiation Target (Highest DOM)
**2315 Cattle Dr, East Helena, MT 59635**: 270 days on market

### Best Location
**1325 Cambray Loop, Helena, MT 59602**: 1.2 mi from center (Close)

---

## 6. Warnungen (Warnings)

### Data Anomalies

| Property | Anomaly | Impact |
|----------|---------|--------|
| 22 Meadow Ln, Clancy, MT 59634 | ZestDelta of -$351,500 | Excluded from ZestDelta normalization; score set to 0 |
| 5260 Echo Dr, Helena, MT 59602 | 240 sqft at $1,079/sqft | Excluded from $/sqft normalization; score set to 0 |

### Missing Zillow Data Properties

| Property | Price | DOM | Composite | Risk |
|----------|------:|----:|:---------:|------|
| 5 Crazy Mountain Rd, Clancy, MT 59634 | $799,000 | 2 | 62.3 | LOW — new listing |
| 1115 Saddle Dr, Helena, MT 59601 | $799,000 | 105 | 61.1 | HIGH — long DOM without data |
| 1344 Beaverhead Rd, Helena, MT 59602 | $599,000 | 185 | 69.3 | HIGH — long DOM without data |

**Impact**: These properties receive inflated ZestDelta scores (100.0). Discount their composite rankings accordingly.

### High DOM Properties (100+ Days)

| Property | DOM | Price | ZestDelta | RentDelta |
|----------|----:|------:|----------:|----------:|
| 2315 Cattle Dr, East Helena, MT 59635 | 270 | $649,000 | $0 | -$1,209 |
| 1344 Beaverhead Rd, Helena, MT 59602 | 185 | $599,000 | $0 | $0 |
| 5530 N Montana Ave, Helena, MT 59602 | 149 | $595,000 | -$17,400 | -$544 |
| 7626 Roughsawn Dr, Helena, MT 59602 | 138 | $680,000 | -$6,700 | -$65 |
| 5 Crazy Mountain Cul De Sac, Clancy, MT 59634 | 129 | $645,000 | -$18,300 | -$399 |
| 1655 Joslyn St, Helena, MT 59601 | 121 | $339,000 | -$25,600 | -$80 |
| 1115 Saddle Dr, Helena, MT 59601 | 105 | $799,000 | $0 | $0 |

### Winter Access Concerns

| Property | Miles | Distance Rating |
|----------|------:|:---------------:|
| 5 Crazy Mountain Rd, Clancy, MT 59634 | 7.8 | Ideal |
| 610 Timber Ridge Rd, Helena, MT 59602 | 8.9 | Ideal |
| 5 Crazy Mountain Cul De Sac, Clancy, MT 59634 | 7.9 | Ideal |
| 22 Meadow Ln, Clancy, MT 59634 | 9.0 | Ideal |

**Recommendation**: Schedule winter property visits. Budget $2,000-$5,000/year for rural snow removal.

---

## Appendix: Market Context

### Helena Market Snapshot

- **Median asking price**: $599,450
- **Mean asking price**: $608,143
- **Median $/sqft** (excl. anomalies): $230
- **Mean monthly payment**: $3,356
- **Cash flow positive rate**: 7.1% (2 of 28)
- **Average DOM**: 64.5 days
- **Median DOM**: 45.5 days

### Price Tier Distribution

| Price Tier | Count | % |
|-----------|:-----:|:-:|
| Under $450K | 4 | 14.3% |
| $450K-$599K | 11 | 39.3% |
| $600K-$699K | 7 | 25.0% |
| $700K-$799K | 6 | 21.4% |

---

## Assumptions Used

| Parameter | Value |
|-----------|-------|
| Down Payment | 20% |
| Interest Rate | 5.88% |
| Monthly Payment | Includes P&I + tax + insurance |
| Target Coordinates | 46.62740234610228, -111.9885849782701 |
| Ideal Distance | 5-20 miles |
| Close Distance | <5 miles |
| Lot Size Cap | 15 acres |
| Scoring Weights | RentDelta 25%, ZestDelta 20%, $/sqft 20%, Lot 15%, Dist 10%, DOM 10% |

---

*Bericht erstellt mit deutscher Ingenieursprazision -- Report generated with German-engineering precision*
