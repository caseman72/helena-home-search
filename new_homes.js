import { cat1 } from "./new_homes.json";
import { calculateHaversineDistance } from "./haversine";
import { calculateMonthlyPayment } from "./mortgageCalculator";
import { formatToDollars } from "./currencyFormatter";

const DOWN_PAYMENT = 20; // if under a hundred then a percent otherwise a cash value

const INTEREST_RATE = 5.88;
const PROPERTY_TAX_RATE = 0.80;
const MONTHLY_INSURANCE_RATE = 0.40;


// Pull the data from the JSON - center of map
const TARGET_LATITUDE = +cat1.searchList.adsConfig.targets.mlat || 46.591533;
const TARGET_LONGITUDE = +cat1.searchList.adsConfig.targets.mlong || -111.965250;

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

const newHomes = cat1.searchResults.mapResults.map(home => {
  const price = home.unformattedPrice || +home.price.replace(/[^0-9.]/g, "");
  const miles = calculateHaversineDistance(home.latLong.latitude, home.latLong.longitude, TARGET_LATITUDE, TARGET_LONGITUDE);
  const homeInfo = home.hdpData.homeInfo;
  const zestimate = homeInfo.zestimate || price;
  const propertyTaxesEst = Math.round(price * PROPERTY_TAX_RATE / 100.0);
  const montlyInsurance = price / 12 * MONTHLY_INSURANCE_RATE / 100.0;
  const downPayment = DOWN_PAYMENT < 100 ? price * DOWN_PAYMENT / 100.0 : DOWN_PAYMENT;
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
    zestimateDelta: zestimate - price,
    rentZestimate,
    rentDelta: rentZestimate - montlyEst,
    priceChange: homeInfo.priceChange || 0,
    datePriceChanged: homeInfo.datePriceChanged || 0,
    propertyTaxesEst,
    montlyEst
  }
});

const headers = [
  {
    h: "Property",
    d: "----------"
  },
  {
    h: "Price",
    d: "------:"
  },
  {
    h: "Monthly",
    d: "--------:"
  },
  {
    h: "$/sqft",
    d: "-------:"
  },
  {
    h: "Sqft",
    d: "-----:"
  },
  {
    h: "Lot",
    d: "----:"
  },
  {
    h: "B/B",
    d: ":---:"
  },
  {
    h: "Miles",
    d: "------:"
  },
  {
    h: "Drive",
    d: ":-----:"
  },
  {
    h: "DOM",
    d: "----:"
  },
  {
    h: "ZestDelta",
    d: "----------:"
  },
  {
    h: "RentDelta",
    d: "----------:"
  }
];

const mdHeader = [""].concat(headers.map(h => h.h), "").join(" | ").trim();
const mdDivider = [""].concat(headers.map(h => h.d), "").join("|").trim();

console.log(mdHeader);
console.log(mdDivider);

newHomes.forEach(h => {
  console.log([
    "",
    `[${h.property}](${h.link})`,
    h.priceString,
    formatToDollars(h.montlyEst, false),
    formatToDollars(h.pricePerSqFt, false),
    h.sqft,
    h.acres,
    `${h.beds}/${h.baths}`,
    h.miles.toFixed(1),
    h.distanceRating,
    h.dom,
    formatToDollars(h.zestimateDelta, false),
    formatToDollars(h.rentDelta, false),
    ""
  ].join(" | ").trim());
});
