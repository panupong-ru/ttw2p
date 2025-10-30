/**
 * Format number with comma separators
 * @param value - Number or string to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string with commas
 */
export const formatNumber = (value: number | string | null | undefined, decimals: number = 2): string => {
  if (value === null || value === undefined || value === '') {
    return '0.00';
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return '0.00';
  }

  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format number for display in input fields
 * @param value - Number or string to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string for input display
 */
export const formatInputNumber = (value: number | string | null | undefined, decimals: number = 2): string => {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return '';
  }

  return formatNumber(num, decimals);
};

/**
 * Safely parse any input to number or null
 * - Returns null for null/undefined/''/0 to align with DB nullable numeric fields
 */
export const parseNumber = (value: unknown): number | null => {
  if (value === null || value === undefined || value === '' || value === 0) return null;
  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? null : parsed;
};
