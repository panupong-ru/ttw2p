import { format, formatDistanceToNow, parseISO, isValid, parse } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

/**
 * Default timezone for the application
 */
const DEFAULT_TIMEZONE = 'Asia/Bangkok';

/**
 * Get current date/time in Thailand timezone
 * @returns Date object adjusted to Thailand timezone
 */
export const getThaiDate = (): Date => {
  return toZonedTime(new Date(), DEFAULT_TIMEZONE);
};

/**
 * Convert any date to Thailand timezone
 * @param date - Date to convert
 * @returns Date object adjusted to Thailand timezone
 */
export const toThaiDate = (date: Date | string | null | undefined): Date | null => {
  if (!date) return null;
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return null;
    return toZonedTime(dateObj, DEFAULT_TIMEZONE);
  } catch {
    return null;
  }
};

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
 * Get current date/time in specified format (Thailand timezone)
 * @param pattern - Format pattern (default: ISO datetime)
 * @returns Current date/time string in Thailand timezone
 */
export const getCurrentDateTime = (pattern: string = DATE_FORMATS.ISO_DATETIME): string => {
  return format(getThaiDate(), pattern);
};

/**
 * Get current date in specified format (Thailand timezone)
 * @param pattern - Format pattern (default: ISO date)
 * @returns Current date string in Thailand timezone
 */
export const getCurrentDate = (pattern: string = DATE_FORMATS.ISO_DATE): string => {
  return format(getThaiDate(), pattern);
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
 * Create file-safe filename with timestamp (Thailand timezone)
 * @param prefix - Filename prefix (default: 'file')
 * @param extension - File extension (default: '')
 * @returns Filename with timestamp in Thailand timezone
 */
export const createTimestampedFilename = (prefix: string = 'file', extension: string = ''): string => {
  const timestamp = format(getThaiDate(), DATE_FORMATS.FILE_NAME);
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

/**
 * Convert Date to local datetime string for API transmission
 * Format: YYYY-MM-DD HH:mm:ss (without timezone)
 * Example: Date(2025-10-30 15:28:54) -> "2025-10-30 15:28:54"
 * @param date - Date object to convert
 * @returns Local datetime string
 */
export const dateToLocalString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Convert any value to FormData-safe string
 * Handles Date objects, null, undefined, and other types
 * @param value - Value to convert
 * @returns String representation for FormData or null
 */
export const toFormDataValue = (value: unknown): string | null => {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return dateToLocalString(value);
  return String(value);
};

/**
 * Convert object to FormData with proper Date handling
 * Automatically converts Date objects to local datetime strings
 * @param data - Object to convert
 * @returns FormData object
 */
export const objectToFormData = (data: Record<string, unknown>): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    const formValue = toFormDataValue(value);
    if (formValue !== null) {
      formData.append(key, formValue);
    }
  });

  return formData;
};

/**
 * Convert Date fields in object to local datetime strings for JSON response
 * Prevents automatic UTC conversion during JSON serialization
 * @param data - Object that may contain Date fields
 * @returns Object with Date fields converted to local datetime strings
 */
export const serializeDatesForJSON = <T extends Record<string, unknown>>(data: T): T => {
  const result: Record<string, unknown> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof Date) {
      result[key] = dateToLocalString(value);
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively handle nested objects
      result[key] = serializeDatesForJSON(value as Record<string, unknown>);
    } else if (Array.isArray(value)) {
      // Handle arrays
      result[key] = value.map((item) =>
        item && typeof item === 'object' && !Array.isArray(item)
          ? serializeDatesForJSON(item as Record<string, unknown>)
          : item
      );
    } else {
      result[key] = value;
    }
  });

  return result as T;
};

/**
 * Parse date string/object to Date for database storage
 * With @db.Timestamp(0), Prisma will store as local time without UTC conversion
 * @param value - Date value to parse
 * @returns Date object or null
 */
export const parseDate = (value: unknown): Date | null => {
  if (!value) return null;
  try {
    if (typeof value === 'string') {
      // Try local datetime format first (YYYY-MM-DD HH:mm:ss)
      const localDatePattern = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
      const match = value.match(localDatePattern);

      if (match) {
        const [, year, month, day, hours, minutes, seconds] = match;
        return new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          parseInt(hours),
          parseInt(minutes),
          parseInt(seconds)
        );
      }

      // Try ISO format
      const dateObj = parseISO(value);
      return isValid(dateObj) ? dateObj : null;
    } else if (value instanceof Date) {
      return value;
    }

    return null;
  } catch {
    return null;
  }
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
