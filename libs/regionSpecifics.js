
const calculatePropertyTaxesHelena = (taxAssessedValue) => {
  const PROPERTY_TAX_RATE = 0.68; // of taxAssessedValue
  return Math.round(PROPERTY_TAX_RATE * taxAssessedValue / 100.0);
};

const distanceRatingHelena = (miles) => {
  if (miles < 5) {
    return "Close";
  }
  if (miles < 15) {
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

const costOfLotHelena = (acres) => {
  let cost = 7500;  // default for 60+ acres

  if (acres < 5) {
    cost = 40000;
  }
  else if (acres < 20) {
    cost = 25000;
  }
  else if (acres < 40) {
    cost = 15000;
  }
  else if (acres < 60) {
    cost = 10000;
  }

  return Math.max(0, acres - 0.5) * cost;
};

const calculatePropertyTaxesBend = (taxAssessedValue) => {
  const PROPERTY_TAX_RATE = 1.64; // of taxAssessedValue
  return Math.round(PROPERTY_TAX_RATE * taxAssessedValue / 100.0);
};

const distanceRatingBend = (miles) => {
  if (miles < 5) {
    return "Close";
  }
  if (miles < 10) {
    return "Ideal";
  }
  if (miles < 15) {
    return "OK";
  }
  if (miles < 20) {
    return "Far";
  }
  return "Extreme";
};

const costOfLotBend = (acres) => {
  let cost = 10000;  // default for 60+ acres

  if (acres < 5) {
    cost = 100000;
  }
  else if (acres < 20) {
    cost = 50000;
  }
  else if (acres < 40) {
    cost = 30000;
  }
  else if (acres < 60) {
    cost = 20000;
  }

  return Math.max(0, acres - 0.5) * cost;
};


// Export the function for use in other modules
module.exports = {
  calculatePropertyTaxesHelena,
  distanceRatingHelena,
  costOfLotHelena,
  calculatePropertyTaxesBend,
  distanceRatingBend,
  costOfLotBend
};
