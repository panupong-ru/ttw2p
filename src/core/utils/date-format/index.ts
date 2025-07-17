import { format, formatDistanceToNow, parseISO, isValid, parse } from 'date-fns';

/**
 * Predefined date format patterns
 */
export const DATE_FORMATS = {
  // Basic formats
  DATE_ONLY: 'dd/MM/yyyy',
  DATE_ONLY_DASH: 'dd-MM-yyyy',
  DATE_ONLY_DOT: 'dd.MM.yyyy',

  // Time formats
  TIME_ONLY: 'HH:mm',
  TIME_WITH_SECONDS: 'HH:mm:ss',
  TIME_12H: 'h:mm a',
  TIME_12H_SECONDS: 'h:mm:ss a',

  // Date with time
  DATETIME: 'dd/MM/yyyy HH:mm',
  DATETIME_SECONDS: 'dd/MM/yyyy HH:mm:ss',
  DATETIME_12H: 'dd/MM/yyyy h:mm a',

  // International formats
  ISO_DATE: 'yyyy-MM-dd',
  ISO_DATETIME: "yyyy-MM-dd'T'HH:mm:ss",

  // Display formats
  DISPLAY_DATE: 'EEEE, dd MMMM yyyy',
  DISPLAY_DATE_SHORT: 'EEE, dd MMM yyyy',
  MONTH_YEAR: 'MMMM yyyy',

  // System formats
  FILE_NAME: 'yyyyMMdd_HHmmss',
  TIMESTAMP: 'yyyyMMddHHmmss',
} as const;

/**
 * Format date with dynamic pattern
 * @param date - Date to format (Date, string, or null/undefined)
 * @param pattern - Format pattern (use DATE_FORMATS constants or custom pattern)
 * @param fallback - Fallback value when date is invalid (default: '-')
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string | null | undefined,
  pattern: string = DATE_FORMATS.DATETIME,
  fallback: string = '-'
): string => {
  if (!date) {
    return fallback;
  }

  try {
    let dateObj: Date;

    if (typeof date === 'string') {
      // Try to parse ISO string first
      dateObj = parseISO(date);

      // If parseISO fails, try other common formats
      if (!isValid(dateObj)) {
        // Try parsing common formats
        const commonFormats = ['dd/MM/yyyy', 'dd-MM-yyyy', 'yyyy-MM-dd', 'dd/MM/yyyy HH:mm', 'dd/MM/yyyy HH:mm:ss'];

        for (const fmt of commonFormats) {
          try {
            dateObj = parse(date, fmt, new Date());
            if (isValid(dateObj)) break;
          } catch {
            continue;
          }
        }
      }
    } else {
      dateObj = date;
    }

    if (!isValid(dateObj)) {
      return fallback;
    }

    return format(dateObj, pattern);
  } catch (error) {
    console.warn('Date formatting error:', error);
    return fallback;
  }
};

/**
 * Format date for display (user-friendly format)
 * @param date - Date to format
 * @param includeTime - Whether to include time (default: false)
 * @returns Formatted date string
 */
export const formatDisplayDate = (date: Date | string | null | undefined, includeTime: boolean = false): string => {
  const pattern = includeTime ? DATE_FORMATS.DATETIME : DATE_FORMATS.DATE_ONLY;
  return formatDate(date, pattern);
};

/**
 * Format date for input fields (ISO format)
 * @param date - Date to format
 * @returns ISO date string for input fields
 */
export const formatInputDate = (date: Date | string | null | undefined): string => {
  return formatDate(date, DATE_FORMATS.ISO_DATE, '');
};

/**
 * Format datetime for input fields
 * @param date - Date to format
 * @returns ISO datetime string for input fields
 */
export const formatInputDateTime = (date: Date | string | null | undefined): string => {
  if (!date) return '';

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';

    // Format for datetime-local input (yyyy-MM-ddTHH:mm)
    return format(dateObj, "yyyy-MM-dd'T'HH:mm");
  } catch {
    return '';
  }
};

/**
 * Format time only
 * @param date - Date to format
 * @param use24Hour - Use 24-hour format (default: true)
 * @returns Formatted time string
 */
export const formatTime = (date: Date | string | null | undefined, use24Hour: boolean = true): string => {
  const pattern = use24Hour ? DATE_FORMATS.TIME_ONLY : DATE_FORMATS.TIME_12H;
  return formatDate(date, pattern);
};

/**
 * Format relative time (e.g., "2 hours ago", "in 3 days")
 * @param date - Date to format
 * @returns Relative time string
 */
export const formatRelativeTime = (date: Date | string | null | undefined): string => {
  if (!date) return '-';

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '-';

    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch {
    return '-';
  }
};

/**
 * Get current date/time in specified format
 * @param pattern - Format pattern (default: ISO datetime)
 * @returns Current date/time string
 */
export const getCurrentDateTime = (pattern: string = DATE_FORMATS.ISO_DATETIME): string => {
  return format(new Date(), pattern);
};

/**
 * Get current date in specified format
 * @param pattern - Format pattern (default: ISO date)
 * @returns Current date string
 */
export const getCurrentDate = (pattern: string = DATE_FORMATS.ISO_DATE): string => {
  return format(new Date(), pattern);
};

/**
 * Check if date string is valid
 * @param date - Date string to validate
 * @returns Boolean indicating if date is valid
 */
export const isValidDate = (date: string | Date | null | undefined): boolean => {
  if (!date) return false;

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj);
  } catch {
    return false;
  }
};

/**
 * Convert date to ISO string for API
 * @param date - Date to convert
 * @returns ISO string or null
 */
export const toISOString = (date: Date | string | null | undefined): string | null => {
  if (!date) return null;

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return null;

    return dateObj.toISOString();
  } catch {
    return null;
  }
};

/**
 * Create file-safe filename with timestamp
 * @param prefix - Filename prefix (default: 'file')
 * @param extension - File extension (default: '')
 * @returns Filename with timestamp
 */
export const createTimestampedFilename = (prefix: string = 'file', extension: string = ''): string => {
  const timestamp = format(new Date(), DATE_FORMATS.FILE_NAME);
  const ext = extension ? (extension.startsWith('.') ? extension : `.${extension}`) : '';
  return `${prefix}_${timestamp}${ext}`;
};

/**
 * Format date range
 * @param startDate - Start date
 * @param endDate - End date
 * @param pattern - Format pattern for each date
 * @param separator - Separator between dates (default: ' - ')
 * @returns Formatted date range string
 */
export const formatDateRange = (
  startDate: Date | string | null | undefined,
  endDate: Date | string | null | undefined,
  pattern: string = DATE_FORMATS.DATE_ONLY,
  separator: string = ' - '
): string => {
  const start = formatDate(startDate, pattern, '');
  const end = formatDate(endDate, pattern, '');

  if (!start && !end) return '-';
  if (!start) return `${separator}${end}`;
  if (!end) return `${start}${separator}`;

  return `${start}${separator}${end}`;
};

export const parseDate = (value: unknown): Date | null => {
  if (!value) return null;
  return new Date(value as string | Date);
};

// Export commonly used formats for easy access
export const formatters = {
  date: (date: Date | string | null | undefined) => formatDate(date, DATE_FORMATS.DATE_ONLY),
  dateTime: (date: Date | string | null | undefined) => formatDate(date, DATE_FORMATS.DATETIME),
  time: (date: Date | string | null | undefined) => formatDate(date, DATE_FORMATS.TIME_ONLY),
  display: (date: Date | string | null | undefined) => formatDate(date, DATE_FORMATS.DISPLAY_DATE_SHORT),
  input: (date: Date | string | null | undefined) => formatInputDate(date),
  relative: (date: Date | string | null | undefined) => formatRelativeTime(date),
} as const;
