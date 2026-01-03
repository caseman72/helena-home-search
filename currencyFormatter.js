/**
 * Formats a number as a dollar amount.
 *
 * @param {number} value The number to format.
 * @param {boolean} [showCents=true] Whether to display cents (decimal places). Defaults to true.
 * @returns {string} The formatted dollar string (e.g., "$1,234.56" or "$1,234").
 */
function formatToDollars(value, showCents = true) {
  if (typeof value !== "number") {
    throw new Error("Input value must be a number.");
  }

  const options = {
    style: "currency",
    currency: "USD",
  };

  if (!showCents) {
    options.minimumFractionDigits = 0;
    options.maximumFractionDigits = 0;
  } else {
    options.minimumFractionDigits = 2;
    options.maximumFractionDigits = 2;
  }

  return new Intl.NumberFormat("en-US", options).format(value);
}

// Export the function for use in other modules
module.exports = {
  formatToDollars
};
