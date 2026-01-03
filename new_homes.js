import { listResults } from "./new_homes.json";
import { distanceFromTarget } from "./haversine";
import { calculateMonthlyPayment } from "./mortgageCalculator";
import { formatToDollars } from "./currencyFormatter";

const INTEREST_RATE = 5.88;
const DOWN_PAYMENT = 20;

const distanceRating = (miles) => {
  if (miles < 5) {
    return "Close";
  }
  if (miles < 20) {
    return "Ideal";
  }
  if (miles < 25) {
    return "OK";
  }
  if (miles < 35) {
    return "Far";
  }
  return "Extreme";
};

const calcPricePerSqFt = (area, price) => {
  return area ? Math.round(price / area) : 0;
};

// | Property | Link | Price | $/sqft | Sqft | Acres | Beds | Baths | Miles | Distance Rating | DOM |

const newHomes = listResults.map( home => {
  const price = home.unformattedPrice || +home.price.replace(/[^0-9.]/g, "");
  const miles = distanceFromTarget(home.latLong.latitude, home.latLong.longitude);
  const homeInfo = home.hdpData.homeInfo;
  const zestimate = homeInfo.zestimate || price;
  const propertyTaxesEst = Math.round(price * 0.80 / 100.0);
  const montlyInsurance = price * 0.4 / 100.0 / 12.0;
  const downPayment = DOWN_PAYMENT < 1E3 ? price * DOWN_PAYMENT / 100.0 : DOWN_PAYMENT;
  const montlyEst = calculateMonthlyPayment(price, INTEREST_RATE, downPayment, propertyTaxesEst, montlyInsurance);
  const rentZestimate =  homeInfo.rentZestimate || montlyEst;

  return {
    property : home.address,
    link: /^http/.test(home.detailUrl) ? home.detailUrl : `https://www.zillow.com${home.detailUrl}`,
    price,
    priceString: home.price,
    pricePerSqFt: calcPricePerSqFt(home.area, price),
    sqft: home.area,
    beds: home.beds,
    baths: home.baths,
    miles,
    travelTime: miles + 5.0,
    distanceRating: distanceRating(miles),
    dom: homeInfo.daysOnZillow > 1 ? homeInfo.daysOnZillow :  Math.round(home.timeOnZillow / 864E5),
    underContract: /contract/i.test(home.statusText),
    acres: homeInfo.lotAreaUnit === "acres" ? homeInfo.lotAreaValue.toFixed(1) : 0,
    taxAssessedValue: homeInfo.taxAssessedValue,
    rentZestimate: homeInfo.rentZestimate,
    zestimate,
    zestimateDelta: price - zestimate,
    rentZestimate,
    rentDelta: rentZestimate - montlyEst,
    priceChange: homeInfo.priceChange || 0,
    datePriceChanged: homeInfo.datePriceChanged || 0,
    propertyTaxesEst,
    montlyEst
  }
});

const headers = [
  "Property",
  "Price",
  "Monthly",
  "$/sqft",
  "Sqft",
  "Lot",
  "Beds",
  "Baths",
  "Miles",
  "Drive",
  "DOM",
  "ZestDelta",
  "RentDelta"
];

const mdHeader = [""].concat(headers, "").join(" | ").trim();

console.log(mdHeader);
console.log(`|----------|------:|--------:|-------:|-----:|----:|------|-------|------:|:-----:|----:|----------:|----------:|`);
// console.log(mdHeader.replace(/[^|]/g, "-"));

newHomes.forEach(h => {
  console.log([
    "",
    `[${h.property}](${h.link})`,
    h.priceString,
    formatToDollars(h.montlyEst, false),
    formatToDollars(h.pricePerSqFt, false),
    h.sqft,
    h.acres,
    h.beds,
    h.baths,
    h.miles,
    h.distanceRating,
    h.dom,
    formatToDollars(h.zestimateDelta, false),
    formatToDollars(h.rentDelta, false),
    ""
  ].join(" | ").trim());
});
