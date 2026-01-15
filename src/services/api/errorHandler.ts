import { ApiError } from './client';

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  onError?: (error: ApiError) => void;
}

export const handleApiError = (error: unknown, options: ErrorHandlerOptions = {}) => {
  const {
    showToast = true,
    logError = true,
    onError,
  } = options;

  const apiError = error as ApiError;

  if (onError) {
    onError(apiError);
  }

  if (logError) {
    console.error('API Error:', {
      message: apiError.message,
      statusCode: apiError.statusCode,
      errors: apiError.errors,
      timestamp: new Date().toISOString(),
    });
  }

  return apiError;
};

export const isErrorCode = (error: unknown, statusCode: number): boolean => {
  const apiError = error as ApiError;
  return apiError.statusCode === statusCode;
};

export const getValidationErrors = (error: unknown): Record<string, string[]> | null => {
  const apiError = error as ApiError;
  return apiError.errors || null;
};

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
