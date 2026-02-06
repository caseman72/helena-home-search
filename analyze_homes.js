import { cat1 } from "./async-create-search-page-state.json";
import { calculateHaversineDistance } from "./libs/haversine";
import { calculateMonthlyPayment } from "./libs/mortgageCalculator";
import { formatToDollars } from "./libs/currencyFormatter";
import {
  distanceRatingHelena as distanceRating,
  costOfLotHelena as costOfLot,
  calculatePropertyTaxesHelena as calculatePropertyTaxes
} from "./libs/regionSpecifics";

// ── Financial Parameters ──────────────────────────────────────────────
const DOWN_PAYMENT = 20;
const INTEREST_RATE = 5.88;
const PROPERTY_TAX_RATE = 0.68;
const MONTHLY_INSURANCE_RATE = 0.40;

// ── Scoring Weights (must sum to 100) ─────────────────────────────────
const WEIGHTS = {
  rentDelta: 25,
  zestDelta: 20,
  pricePerSqFt: 20,
  lot: 15,
  distance: 10,
  dom: 10
};

// ── Anomaly Thresholds ────────────────────────────────────────────────
const SQFT_ANOMALY_THRESHOLD = 500;
const ZESTDELTA_ANOMALY_THRESHOLD = -100000;
const LOT_CAP_ACRES = 15;

// ── Distance Score Mapping ────────────────────────────────────────────
const DISTANCE_SCORES = {
  Ideal: 100,
  Close: 70,
  OK: 60,
  Far: 40,
  Extreme: 20
};

// ── Data Parsing (identical to new_homes.js) ──────────────────────────
const TARGET_LATITUDE = +cat1.searchList.adsConfig.targets.mlat || 46.591533;
const TARGET_LONGITUDE = +cat1.searchList.adsConfig.targets.mlong || -111.965250;

const calcPricePerSqFt = (area, price, acres) => {
  return area ? Math.round((price - costOfLot(acres)) / area) : 0;
};

const mapResults = cat1.searchResults.mapResults;
const listResults = cat1.searchResults.listResults;

const allHomes = (listResults.length > mapResults.length ? listResults : mapResults).map(home => {
  const homeInfo = home.hdpData?.homeInfo || {};
  const price = home.unformattedPrice || +home.price.replace(/[^0-9.]/g, "");
  const miles = calculateHaversineDistance(home.latLong.latitude, home.latLong.longitude, TARGET_LATITUDE, TARGET_LONGITUDE);
  const zestimate = homeInfo.zestimate || price;

  const taxAssessedValue = homeInfo.taxAssessedValue || price;
  const propertyTaxesEst = calculatePropertyTaxes(taxAssessedValue);

  const montlyInsurance = price / 12 * MONTHLY_INSURANCE_RATE / 100.0;
  const downPayment = DOWN_PAYMENT < 100 ? price * DOWN_PAYMENT / 100.0 : DOWN_PAYMENT;
  const montlyEst = calculateMonthlyPayment(price, INTEREST_RATE, downPayment, propertyTaxesEst, montlyInsurance);
  const rentZestimate = homeInfo.rentZestimate || montlyEst;
  const acres = homeInfo.lotAreaUnit === "acres" ? homeInfo.lotAreaValue.toFixed(1) : 0;

  return {
    property: home.address,
    link: /^http/.test(home.detailUrl) ? home.detailUrl : `https://www.zillow.com${home.detailUrl}`,
    image: home.imgSrc,
    price,
    priceString: home.price,
    pricePerSqFt: calcPricePerSqFt(home.area, price, acres),
    sqft: home.area,
    beds: home.beds,
    baths: home.baths,
    miles,
    travelTime: miles + 5.0,
    distanceRating: distanceRating(miles),
    dom: homeInfo.daysOnZillow > 1 ? homeInfo.daysOnZillow : Math.round(home.timeOnZillow / 864E5),
    underContract: /contract/i.test(home.statusText),
    acres: +acres,
    rentZestimate: homeInfo.rentZestimate,
    zestimate,
    zestimateDelta: zestimate - price,
    rentDelta: rentZestimate - montlyEst,
    taxAssessedValue,
    taxDelta: taxAssessedValue - price,
    priceChange: homeInfo.priceChange || 0,
    datePriceChanged: homeInfo.datePriceChanged || 0,
    propertyTaxesEst,
    montlyEst
  };
});

// Filter out under-contract properties
const newHomes = allHomes.filter(h => !h.underContract);

// ── Anomaly Detection ─────────────────────────────────────────────────
const anomalies = [];
const missingData = [];

for (const h of newHomes) {
  if (h.sqft && h.sqft < SQFT_ANOMALY_THRESHOLD) {
    anomalies.push({ property: h.property, type: "sqft", detail: `${h.sqft} sqft at ${formatToDollars(h.pricePerSqFt, false)}/sqft` });
    h._excludeSqft = true;
  }
  if (h.zestimateDelta < ZESTDELTA_ANOMALY_THRESHOLD) {
    anomalies.push({ property: h.property, type: "zestDelta", detail: `ZestDelta of ${formatToDollars(h.zestimateDelta, false)}` });
    h._excludeZestDelta = true;
  }
  if (h.zestimateDelta === 0 && h.rentDelta === 0) {
    missingData.push(h);
    h._missingData = true;
  }
}

// ── Normalization Helpers ─────────────────────────────────────────────
const normalize = (value, min, max) => {
  if (max === min) return 50;
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
};

const normalizeInverted = (value, min, max) => {
  return 100 - normalize(value, min, max);
};

// Compute ranges excluding anomalies
const rentDeltas = newHomes.map(h => h.rentDelta);
const rentMin = Math.min(...rentDeltas);
const rentMax = Math.max(...rentDeltas);

const zestDeltas = newHomes.filter(h => !h._excludeZestDelta).map(h => h.zestimateDelta);
const zestMin = Math.min(...zestDeltas);
const zestMax = Math.max(...zestDeltas);

const sqftPrices = newHomes.filter(h => !h._excludeSqft && h.pricePerSqFt > 0).map(h => h.pricePerSqFt);
const sqftMin = Math.min(...sqftPrices);
const sqftMax = Math.max(...sqftPrices);

const lots = newHomes.map(h => Math.min(h.acres, LOT_CAP_ACRES));
const lotMin = Math.min(...lots);
const lotMax = Math.max(...lots);

const doms = newHomes.map(h => h.dom);
const domMin = Math.min(...doms);
const domMax = Math.max(...doms);

// ── Score Each Property ───────────────────────────────────────────────
for (const h of newHomes) {
  h.scores = {
    rentDelta: +(normalize(h.rentDelta, rentMin, rentMax).toFixed(1)),
    zestDelta: h._excludeZestDelta ? 0 : +(normalize(h.zestimateDelta, zestMin, zestMax).toFixed(1)),
    pricePerSqFt: h._excludeSqft ? 0 : +(normalizeInverted(h.pricePerSqFt, sqftMin, sqftMax).toFixed(1)),
    lot: +(normalize(Math.min(h.acres, LOT_CAP_ACRES), lotMin, lotMax).toFixed(1)),
    distance: DISTANCE_SCORES[h.distanceRating] || 20,
    dom: +(normalize(h.dom, domMin, domMax).toFixed(1))
  };

  h.composite = +(
    (h.scores.rentDelta * WEIGHTS.rentDelta +
     h.scores.zestDelta * WEIGHTS.zestDelta +
     h.scores.pricePerSqFt * WEIGHTS.pricePerSqFt +
     h.scores.lot * WEIGHTS.lot +
     h.scores.distance * WEIGHTS.distance +
     h.scores.dom * WEIGHTS.dom) / 100
  ).toFixed(1);
}

// Sort by composite descending
newHomes.sort((a, b) => b.composite - a.composite);

// ── Output Helpers ────────────────────────────────────────────────────
const p = (s) => console.log(s);
const today = new Date().toISOString().slice(0, 10);

const cashFlowPositive = newHomes.filter(h => h.rentDelta > 0);
const fairValueOrBetter = newHomes.filter(h => h.zestimateDelta >= 0);
const idealDistance = newHomes.filter(h => h.distanceRating === "Ideal");
const closeDistance = newHomes.filter(h => h.distanceRating === "Close");
const prices = newHomes.map(h => h.price).sort((a, b) => a - b);
const medianPrice = prices.length % 2 === 0
  ? (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2
  : prices[Math.floor(prices.length / 2)];

// ── 1. Executive Summary ──────────────────────────────────────────────
p(`# Wissenschaftliche Immobilienanalyse -- Helena, MT -- ${today}`);
p("");
p("## Complete Composite Scoring Report");
p("");
p(`### Generated: ${today}`);
p("");
p("---");
p("");
p("## Executive Summary");
p("");
p("| Metric | Value |");
p("|--------|-------|");
p(`| Total Properties Analyzed | ${newHomes.length} |`);
p(`| Cash Flow Positive (RentDelta > $0) | ${cashFlowPositive.length} (${(100 * cashFlowPositive.length / newHomes.length).toFixed(1)}%) |`);
p(`| Fair Value or Better (ZestDelta >= $0) | ${fairValueOrBetter.length} (${(100 * fairValueOrBetter.length / newHomes.length).toFixed(1)}%) |`);
p(`| Ideal Distance (5-20 mi) | ${idealDistance.length} (${(100 * idealDistance.length / newHomes.length).toFixed(1)}%) |`);
p(`| Close Distance (<5 mi) | ${closeDistance.length} (${(100 * closeDistance.length / newHomes.length).toFixed(1)}%) |`);
p(`| Data Anomalies Flagged | ${anomalies.length} |`);
p(`| Missing Zillow Data ($0/$0) | ${missingData.length} |`);
p(`| Price Range | ${formatToDollars(prices[0], false)} - ${formatToDollars(prices[prices.length - 1], false)} |`);
p(`| Median Price | ${formatToDollars(medianPrice, false)} |`);
p("");

// Top 3
p("### Top 3 Recommendations");
p("");
p("| Rank | Property | Composite | Key Strengths |");
p("|:----:|----------|:---------:|---------------|");
for (let i = 0; i < Math.min(3, newHomes.length); i++) {
  const h = newHomes[i];
  const strengths = [];
  if (h.rentDelta > 0) strengths.push(`+${formatToDollars(h.rentDelta, false)}/mo cash flow`);
  if (h.zestimateDelta === 0 && h._missingData) strengths.push("Missing Zillow data");
  else if (Math.abs(h.zestimateDelta) < 5000) strengths.push(`Near-fair Zestimate (${formatToDollars(h.zestimateDelta, false)})`);
  if (h.pricePerSqFt > 0 && h.scores.pricePerSqFt >= 70) strengths.push(`Strong $/sqft (${formatToDollars(h.pricePerSqFt, false)})`);
  if (h.dom >= 100) strengths.push(`${h.dom} DOM negotiation leverage`);
  p(`| ${i + 1} | ${h.property} | ${h.composite} | ${strengths.join("; ")} |`);
}

// ── 2. Data Integrity ─────────────────────────────────────────────────
p("");
p("---");
p("");
p("## 1. Data Integrity Check");
p("");
p("### Anomalies Flagged");
p("");
if (anomalies.length === 0) {
  p("No anomalies detected.");
} else {
  for (const a of anomalies) {
    p(`- **${a.property}**: ${a.detail} — EXCLUDED from ${a.type === "sqft" ? "$/sqft" : "ZestDelta"} normalization (score set to 0)`);
  }
}
p("");
p("### Missing Zillow Data ($0 ZestDelta AND $0 RentDelta)");
p("");
if (missingData.length === 0) {
  p("All properties have Zillow valuation data.");
} else {
  p("| Property | Price | DOM | Notes |");
  p("|----------|------:|----:|-------|");
  for (const h of missingData) {
    const note = h.dom <= 7 ? "New listing, data pending" : h.dom > 100 ? "Long DOM without data — concerning" : "No Zillow data";
    p(`| ${h.property} | ${formatToDollars(h.price, false)} | ${h.dom} | ${note} |`);
  }
  p("");
  p("**Note**: These properties receive inflated ZestDelta scores (100.0) and neutral RentDelta scores. Interpret rankings with caution.");
}

// ── 3. Cash Flow Leaders ──────────────────────────────────────────────
p("");
p("---");
p("");
p("## 2. Cash Flow Leaders (RentDelta > $0)");
p("");
if (cashFlowPositive.length === 0) {
  p("No properties with positive rental cash flow in this dataset.");
} else {
  p(`**${cashFlowPositive.length} of ${newHomes.length}** properties (${(100 * cashFlowPositive.length / newHomes.length).toFixed(1)}%) show positive rental cash flow.`);
  p("");
  for (const h of cashFlowPositive.sort((a, b) => b.rentDelta - a.rentDelta)) {
    p("```");
    p(` ${h.property}`);
    p(`   RentDelta: +${formatToDollars(h.rentDelta, false)} | Monthly: ${formatToDollars(h.montlyEst, false)}`);
    p(`   $/sqft: ${formatToDollars(h.pricePerSqFt, false)} | Sqft: ${h.sqft || "N/A"} | Lot: ${h.acres} ac`);
    p(`   Distance: ${h.miles.toFixed(1)} mi (${h.distanceRating}) | DOM: ${h.dom}`);
    p(`   ZestDelta: ${formatToDollars(h.zestimateDelta, false)} | TaxDelta: ${formatToDollars(h.taxDelta, false)}`);
    p(`   B/B: ${h.beds}/${h.baths} | Price: ${formatToDollars(h.price, false)}`);
    p("```");
    p("");
  }
  const totalCF = cashFlowPositive.reduce((s, h) => s + h.rentDelta, 0);
  p(`**Combined monthly positive cash flow potential: ${formatToDollars(totalCF, false)}/mo = ${formatToDollars(totalCF * 12, false)}/year**`);
}

// ── 4. Value Efficiency Leaders ───────────────────────────────────────
p("");
p("---");
p("");
p("## 3. Value Efficiency Leaders (Top 5 Lowest $/sqft)");
p("");
const valueLeaders = newHomes
  .filter(h => !h._excludeSqft && h.pricePerSqFt > 0)
  .sort((a, b) => a.pricePerSqFt - b.pricePerSqFt)
  .slice(0, 5);

p("| Rank | Property | $/sqft | Price | Sqft | Lot | B/B | RentDelta | Composite |");
p("|:----:|----------|-------:|------:|-----:|----:|:---:|----------:|:---------:|");
valueLeaders.forEach((h, i) => {
  p(`| ${i + 1} | ${h.property} | **${formatToDollars(h.pricePerSqFt, false)}** | ${formatToDollars(h.price, false)} | ${h.sqft || "N/A"} | ${h.acres} ac | ${h.beds}/${h.baths} | ${formatToDollars(h.rentDelta, false)} | ${h.composite} |`);
});

// ── 5. Composite Scoring Matrix ───────────────────────────────────────
p("");
p("---");
p("");
p("## 4. Composite Scoring Matrix");
p("");
p("### Scoring Methodology");
p("");
p("| Component | Weight | Normalization | Best = 100 |");
p("|-----------|:------:|---------------|------------|");
p("| RentDelta | 25% | (Value - Min) / Range | Highest cash flow |");
p("| ZestDelta | 20% | (Value - Min) / Range | Closest to $0 |");
p("| $/sqft | 20% | INVERTED: (Max - Value) / Range | Lowest $/sqft |");
p("| Lot Size | 15% | (Value - Min) / Range, capped at 15 ac | Largest lot |");
p("| Distance | 10% | Categorical mapping | Ideal (5-20 mi) |");
p("| DOM | 10% | (Value - Min) / Range | Highest DOM |");
p("");
p("### Data Ranges Used for Normalization");
p("");
p("| Metric | Minimum | Maximum | Range | Exclusions |");
p("|--------|--------:|--------:|------:|------------|");
p(`| RentDelta | ${formatToDollars(rentMin, false)} | ${formatToDollars(rentMax, false)} | ${formatToDollars(rentMax - rentMin, false)} | None |`);
const zestExcl = newHomes.filter(h => h._excludeZestDelta).map(h => h.property).join(", ");
p(`| ZestDelta | ${formatToDollars(zestMin, false)} | ${formatToDollars(zestMax, false)} | ${formatToDollars(zestMax - zestMin, false)} | ${zestExcl || "None"} |`);
const sqftExcl = newHomes.filter(h => h._excludeSqft).map(h => h.property).join(", ");
p(`| $/sqft | ${formatToDollars(sqftMin, false)} | ${formatToDollars(sqftMax, false)} | ${formatToDollars(sqftMax - sqftMin, false)} | ${sqftExcl || "None"} |`);
p(`| Lot Size | ${lotMin} ac | ${lotMax} ac | ${(lotMax - lotMin).toFixed(1)} ac | None (capped at ${LOT_CAP_ACRES} ac) |`);
p(`| DOM | ${domMin} days | ${domMax} days | ${domMax - domMin} days | None |`);

p("");
p("### Full Ranked Scoring Table");
p("");
p("| Rank | Property | Composite | RentD (25%) | ZestD (20%) | $/sqft (20%) | Lot (15%) | Dist (10%) | DOM (10%) |");
p("|:----:|----------|:---------:|:-----------:|:-----------:|:------------:|:---------:|:----------:|:---------:|");
newHomes.forEach((h, i) => {
  p(`| ${i + 1} | ${h.property} | **${h.composite}** | ${h.scores.rentDelta} | ${h.scores.zestDelta} | ${h.scores.pricePerSqFt} | ${h.scores.lot} | ${h.scores.distance} | ${h.scores.dom} |`);
});

// Score distribution
p("");
p("### Score Distribution");
p("");
p("| Tier | Range | Count | Properties |");
p("|------|:-----:|:-----:|------------|");
const tiers = [
  { label: "A-Tier: Strong Buy", min: 60, max: Infinity },
  { label: "B-Tier: Buy", min: 50, max: 59.9 },
  { label: "C-Tier: Consider", min: 40, max: 49.9 },
  { label: "D-Tier: Negotiate Hard", min: 30, max: 39.9 },
  { label: "F-Tier: Avoid", min: -Infinity, max: 29.9 }
];
for (const t of tiers) {
  const inTier = newHomes.filter(h => h.composite >= t.min && h.composite <= t.max);
  const names = inTier.map(h => h.property.replace(/,.*/, "")).join(", ");
  p(`| ${t.label} | ${t.min === -Infinity ? "<30" : t.max === Infinity ? "60+" : `${t.min}-${t.max}`} | ${inTier.length} | ${names} |`);
}

// ── 6. Category Winners ───────────────────────────────────────────────
p("");
p("---");
p("");
p("## 5. Category Winners");
p("");

// Best cash flow
const bestCF = [...newHomes].sort((a, b) => b.rentDelta - a.rentDelta)[0];
p(`### Best Cash Flow`);
p(`**${bestCF.property}**: ${formatToDollars(bestCF.rentDelta, false)}/mo`);
p("");

// Best value (lowest $/sqft excluding anomalies)
const bestValue = newHomes.filter(h => !h._excludeSqft && h.pricePerSqFt > 0).sort((a, b) => a.pricePerSqFt - b.pricePerSqFt)[0];
p(`### Best Value (Lowest $/sqft)`);
p(`**${bestValue.property}**: ${formatToDollars(bestValue.pricePerSqFt, false)}/sqft (${bestValue.sqft || "N/A"} sqft on ${bestValue.acres} ac)`);
p("");

// Best equity play (ZestDelta closest to $0, with real data)
const bestEquity = newHomes
  .filter(h => !h._missingData && !h._excludeZestDelta)
  .sort((a, b) => Math.abs(a.zestimateDelta) - Math.abs(b.zestimateDelta))[0];
p(`### Best Equity Play`);
p(`**${bestEquity.property}**: ZestDelta ${formatToDollars(bestEquity.zestimateDelta, false)} (${(100 * Math.abs(bestEquity.zestimateDelta) / bestEquity.price).toFixed(1)}% from Zestimate)`);
p("");

// Best negotiation target (highest DOM)
const bestDOM = [...newHomes].sort((a, b) => b.dom - a.dom)[0];
p(`### Best Negotiation Target (Highest DOM)`);
p(`**${bestDOM.property}**: ${bestDOM.dom} days on market`);
p("");

// Best location (closest to center)
const bestLocation = [...newHomes].sort((a, b) => a.miles - b.miles)[0];
p(`### Best Location`);
p(`**${bestLocation.property}**: ${bestLocation.miles.toFixed(1)} mi from center (${bestLocation.distanceRating})`);

// ── 7. Warnings ───────────────────────────────────────────────────────
p("");
p("---");
p("");
p("## 6. Warnungen (Warnings)");
p("");

// Anomalies table
if (anomalies.length > 0) {
  p("### Data Anomalies");
  p("");
  p("| Property | Anomaly | Impact |");
  p("|----------|---------|--------|");
  for (const a of anomalies) {
    p(`| ${a.property} | ${a.detail} | Excluded from ${a.type === "sqft" ? "$/sqft" : "ZestDelta"} normalization; score set to 0 |`);
  }
  p("");
}

// Missing data
if (missingData.length > 0) {
  p("### Missing Zillow Data Properties");
  p("");
  p("| Property | Price | DOM | Composite | Risk |");
  p("|----------|------:|----:|:---------:|------|");
  for (const h of missingData) {
    const risk = h.dom <= 7 ? "LOW — new listing" : h.dom > 100 ? "HIGH — long DOM without data" : "MEDIUM";
    p(`| ${h.property} | ${formatToDollars(h.price, false)} | ${h.dom} | ${h.composite} | ${risk} |`);
  }
  p("");
  p("**Impact**: These properties receive inflated ZestDelta scores (100.0). Discount their composite rankings accordingly.");
  p("");
}

// High DOM investigation
const highDOM = newHomes.filter(h => h.dom >= 100);
if (highDOM.length > 0) {
  p("### High DOM Properties (100+ Days)");
  p("");
  p("| Property | DOM | Price | ZestDelta | RentDelta |");
  p("|----------|----:|------:|----------:|----------:|");
  for (const h of highDOM.sort((a, b) => b.dom - a.dom)) {
    p(`| ${h.property} | ${h.dom} | ${formatToDollars(h.price, false)} | ${formatToDollars(h.zestimateDelta, false)} | ${formatToDollars(h.rentDelta, false)} |`);
  }
  p("");
}

// Winter access concerns (Clancy + mountain properties)
const winterConcerns = newHomes.filter(h =>
  /clancy/i.test(h.property) || /timber ridge|mountain|meadow/i.test(h.property)
);
if (winterConcerns.length > 0) {
  p("### Winter Access Concerns");
  p("");
  p("| Property | Miles | Distance Rating |");
  p("|----------|------:|:---------------:|");
  for (const h of winterConcerns) {
    p(`| ${h.property} | ${h.miles.toFixed(1)} | ${h.distanceRating} |`);
  }
  p("");
  p("**Recommendation**: Schedule winter property visits. Budget $2,000-$5,000/year for rural snow removal.");
}

// ── Appendix ──────────────────────────────────────────────────────────
p("");
p("---");
p("");
p("## Appendix: Market Context");
p("");
const meanPrice = prices.reduce((s, v) => s + v, 0) / prices.length;
const monthlyPayments = newHomes.map(h => h.montlyEst);
const meanMonthly = monthlyPayments.reduce((s, v) => s + v, 0) / monthlyPayments.length;
const allDoms = newHomes.map(h => h.dom).sort((a, b) => a - b);
const medianDOM = allDoms.length % 2 === 0
  ? (allDoms[allDoms.length / 2 - 1] + allDoms[allDoms.length / 2]) / 2
  : allDoms[Math.floor(allDoms.length / 2)];
const avgDOM = allDoms.reduce((s, v) => s + v, 0) / allDoms.length;
const sqftValues = newHomes.filter(h => !h._excludeSqft && h.pricePerSqFt > 0).map(h => h.pricePerSqFt).sort((a, b) => a - b);
const medianSqft = sqftValues.length % 2 === 0
  ? (sqftValues[sqftValues.length / 2 - 1] + sqftValues[sqftValues.length / 2]) / 2
  : sqftValues[Math.floor(sqftValues.length / 2)];

p("### Helena Market Snapshot");
p("");
p(`- **Median asking price**: ${formatToDollars(medianPrice, false)}`);
p(`- **Mean asking price**: ${formatToDollars(Math.round(meanPrice), false)}`);
p(`- **Median $/sqft** (excl. anomalies): ${formatToDollars(medianSqft, false)}`);
p(`- **Mean monthly payment**: ${formatToDollars(Math.round(meanMonthly), false)}`);
p(`- **Cash flow positive rate**: ${(100 * cashFlowPositive.length / newHomes.length).toFixed(1)}% (${cashFlowPositive.length} of ${newHomes.length})`);
p(`- **Average DOM**: ${avgDOM.toFixed(1)} days`);
p(`- **Median DOM**: ${medianDOM} days`);
p("");

// Price tier distribution
p("### Price Tier Distribution");
p("");
p("| Price Tier | Count | % |");
p("|-----------|:-----:|:-:|");
const priceTiers = [
  { label: "Under $450K", min: 0, max: 449999 },
  { label: "$450K-$599K", min: 450000, max: 599999 },
  { label: "$600K-$699K", min: 600000, max: 699999 },
  { label: "$700K-$799K", min: 700000, max: 799999 },
  { label: "$800K+", min: 800000, max: Infinity }
];
for (const t of priceTiers) {
  const count = newHomes.filter(h => h.price >= t.min && h.price <= t.max).length;
  if (count > 0) {
    p(`| ${t.label} | ${count} | ${(100 * count / newHomes.length).toFixed(1)}% |`);
  }
}

p("");
p("---");
p("");
p("## Assumptions Used");
p("");
p("| Parameter | Value |");
p("|-----------|-------|");
p(`| Down Payment | ${DOWN_PAYMENT}% |`);
p(`| Interest Rate | ${INTEREST_RATE}% |`);
p("| Monthly Payment | Includes P&I + tax + insurance |");
p(`| Target Coordinates | ${TARGET_LATITUDE}, ${TARGET_LONGITUDE} |`);
p("| Ideal Distance | 5-20 miles |");
p("| Close Distance | <5 miles |");
p(`| Lot Size Cap | ${LOT_CAP_ACRES} acres |`);
p(`| Scoring Weights | RentDelta ${WEIGHTS.rentDelta}%, ZestDelta ${WEIGHTS.zestDelta}%, $/sqft ${WEIGHTS.pricePerSqFt}%, Lot ${WEIGHTS.lot}%, Dist ${WEIGHTS.distance}%, DOM ${WEIGHTS.dom}% |`);
p("");
p("---");
p("");
p("*Bericht erstellt mit deutscher Ingenieursprazision -- Report generated with German-engineering precision*");
