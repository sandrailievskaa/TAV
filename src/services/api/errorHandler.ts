import { ApiError } from './client';

/**
 * Custom error handler utility
 * Ова е место каде може да имплементирате специфична error handling логика
 */

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  onError?: (error: ApiError) => void;
}

/**
 * Default error handler
 * Може да се користи директно или да се extend за специфични случаи
 */
export const handleApiError = (error: unknown, options: ErrorHandlerOptions = {}) => {
  const {
    showToast = true,
    logError = true,
    onError,
  } = options;

  const apiError = error as ApiError;

  // Custom callback
  if (onError) {
    onError(apiError);
  }

  // Logging
  if (logError) {
    console.error('API Error:', {
      message: apiError.message,
      statusCode: apiError.statusCode,
      errors: apiError.errors,
      timestamp: new Date().toISOString(),
    });
  }

  // Toast notification (handled by interceptor by default)
  // Ова е дополнително ако сакате да прикажете грешка на друго место

  return apiError;
};

/**
 * Check if error is a specific status code
 */
export const isErrorCode = (error: unknown, statusCode: number): boolean => {
  const apiError = error as ApiError;
  return apiError.statusCode === statusCode;
};

/**
 * Get validation errors from API error
 */
export const getValidationErrors = (error: unknown): Record<string, string[]> | null => {
  const apiError = error as ApiError;
  return apiError.errors || null;
};

/**
 * Format validation errors for form display
 */
export const formatValidationErrors = (
  error: unknown
): Record<string, { message: string }> => {
  const errors = getValidationErrors(error);
  if (!errors) return {};

  const formatted: Record<string, { message: string }> = {};
  Object.keys(errors).forEach((key) => {
    const fieldName = key.toLowerCase();
    const errorValue = errors[key];
    formatted[fieldName] = {
      message: Array.isArray(errorValue) ? errorValue[0] : String(errorValue),
    };
  });

  return formatted;
};
