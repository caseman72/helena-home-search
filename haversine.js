const EARTH_RADIUS_MILES = 3958.8; // Earth's radius in miles

/**
 * Calculates the great-circle distance between two points on the Earth's surface
 * using the Haversine formula.
 *
 * @param {number} lat1 Latitude of the first point in degrees.
 * @param {number} lon1 Longitude of the first point in degrees.
 * @param {number} lat2 Latitude of the second point in degrees.
 * @param {number} lon2 Longitude of the second point in degrees.
 * @returns {number} The distance between the two points in miles.
 */
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  // Convert degrees to radians
  const toRadians = (deg) => deg * (Math.PI / 180);

  const rLat1 = toRadians(lat1);
  const rLon1 = toRadians(lon1);
  const rLat2 = toRadians(lat2);
  const rLon2 = toRadians(lon2);

  const dLat = rLat2 - rLat1;
  const dLon = rLon2 - rLon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rLat1) * Math.cos(rLat2) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = EARTH_RADIUS_MILES * c; // Distance in miles
  return Math.round(100 * distance) / 100.0;
}

// Fixed target coordinates
const TARGET_LATITUDE = 46.591533;
const TARGET_LONGITUDE = -111.965250; // West longitudes are negative

/**
 * Calculates the straight-line distance in miles from a fixed target coordinate
 * to a given point using the Haversine formula.
 *
 * Fixed target: 46.591533°N, 111.965250°W
 *
 * @param {number} currentLat Latitude of the current point in degrees.
 * @param {number} currentLon Longitude of the current point in degrees.
 * @returns {number} The distance in miles from the target to the current point.
 */
function distanceFromTarget(currentLat, currentLon) {
  return calculateHaversineDistance(
    TARGET_LATITUDE,
    TARGET_LONGITUDE,
    currentLat,
    currentLon
  );
}

// Example usage (optional, for testing)
// const exampleLat = 40.7128; // New York City latitude
// const exampleLon = -74.0060; // New York City longitude
// const distance = distanceFromTarget(exampleLat, exampleLon);
// console.log(`Distance from target to New York City: ${distance.toFixed(2)} miles`);

// Export the function for use in other modules
module.exports = {
  calculateHaversineDistance,
  distanceFromTarget,
  TARGET_LATITUDE,
  TARGET_LONGITUDE
};
