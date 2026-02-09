/**
 * Currency Formatter Utility
 * Provides functions to format numerical values as currency
 * Used in the Personal Finance Tracker application
 */

/**
 * Formats a number as USD currency
 * @param {number} value - The value to format
 * @returns {string} - Formatted currency string (e.g., "$1,234.56")
 */
export const formatCurrency = (value) => {
  if (typeof value !== 'number') {
    return '$0.00';
  }

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
  if (typeof value !== 'number') {
    return '0.00';
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Formats a number as currency with custom locale and currency
 * @param {number} value - The value to format
 * @param {string} locale - The locale code (e.g., 'en-US', 'de-DE')
 * @param {string} currency - The currency code (e.g., 'USD', 'EUR')
 * @returns {string} - Formatted currency string
 */
export const formatCurrencyCustom = (value, locale = 'en-US', currency = 'USD') => {
  if (typeof value !== 'number') {
    return '0.00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Gets the balance class for styling
 * @param {number} balance - The balance value
 * @returns {string} - CSS class ('positive' or 'negative')
 */
export const getBalanceClass = (balance) => {
  return balance >= 0 ? 'positive' : 'negative';
};

/**
 * Calculates balance from income and expenses
 * @param {number} income - Total income
 * @param {number} expenses - Total expenses
 * @returns {number} - Calculated balance
 */
export const calculateBalance = (income, expenses) => {
  if (typeof income !== 'number' || typeof expenses !== 'number') {
    return 0;
  }
  return income - expenses;
};
