/**
 * Currency Formatter Utility
 * Provides functions to format numerical values as currency
 */

/**
 * Formats a number as USD currency
 * @param {number} value - The value to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Formats a number with commas and decimals
 * @param {number} value - The value to format
 * @returns {string} - Formatted number string
 */
export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Formats a number as currency with custom locale
 * @param {number} value - The value to format
 * @param {string} locale - The locale (e.g., 'en-US', 'de-DE')
 * @param {string} currency - The currency code (e.g., 'USD', 'EUR')
 * @returns {string} - Formatted currency string
 */
export const formatCurrencyCustom = (value, locale = 'en-US', currency = 'USD') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};
