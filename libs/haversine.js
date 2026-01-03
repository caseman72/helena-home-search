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

// Export the function for use in other modules
module.exports = {
  calculateHaversineDistance
};
