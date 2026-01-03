/**
 * Calculates the monthly mortgage payment.
 * This includes principal, interest, and monthly property taxes.
 *
 * @param {number} housePrice The total price of the house.
 * @param {number} downPayment The amount of the down payment.
 * @param {number} yearlyPropertyTaxes The total annual property taxes.
 * @param {number} annualInterestRate The annual interest rate as a percentage (e.g., 4.5 for 4.5%).
 * @param {number} loanTermYears The loan term in years (e.g., 30 for 30 years).
 * @param {number} monthlyHOA The monthly Homeowners Association fee.
 * @returns {number} The total estimated monthly mortgage payment.
 */
function calculateMonthlyPayment(
  housePrice,
  annualInterestRate,
  downPayment = 0, // Default to 0 if not provided
  yearlyPropertyTaxes = 0, // Default to 0 if not provided
  loanTermYears = 30, // Default to 30 years if not provided
  monthlyHOA = 0 // Default to 0 if not provided
) {
  // 1. Calculate the principal loan amount
  const principalAmount = housePrice - downPayment;

  // Check for invalid input
  if (principalAmount <= 0) {
    throw new Error("Principal loan amount must be greater than zero. Ensure house price is greater than down payment.");
  }
  if (annualInterestRate < 0 || loanTermYears <= 0 || monthlyHOA < 0) {
    throw new Error("Annual interest rate, loan term, and monthly HOA must be positive or zero.");
  }

  // 2. Calculate the monthly interest rate
  // Convert annual percentage rate to a monthly decimal rate
  const monthlyInterestRate = (annualInterestRate / 100) / 12;

  // 3. Calculate the total number of payments
  const numberOfPayments = loanTermYears * 12;

  // 4. Calculate the monthly principal and interest (P&I) payment
  let principalAndInterestPayment;

  if (monthlyInterestRate === 0) {
    // If interest rate is 0, the payment is simply principal divided by number of payments
    principalAndInterestPayment = principalAmount / numberOfPayments;
  } else {
    // Mortgage payment formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
    const factor = Math.pow(1 + monthlyInterestRate, numberOfPayments);
    principalAndInterestPayment = principalAmount * (monthlyInterestRate * factor) / (factor - 1);
  }

  // 5. Calculate the monthly property tax
  const monthlyPropertyTax = yearlyPropertyTaxes / 12;

  // 6. Sum all monthly components to get the total monthly payment
  const totalMonthlyPayment = principalAndInterestPayment + monthlyPropertyTax + monthlyHOA;


  return Math.round(totalMonthlyPayment);
}

// Export the function for use in other modules
module.exports = {
  calculateMonthlyPayment
};
