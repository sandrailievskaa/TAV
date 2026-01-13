/**
 * API Client Base Configuration
 * Handles HTTP requests to the ABP backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:44300';

/**
 * Validation error interface
 */
export interface ValidationError {
  message: string;
  members: string[];
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public code?: string,
    message?: string,
    public details?: any,
    public validationErrors?: ValidationError[]
  ) {
    super(message || `API Error: ${status}`);
    this.name = 'ApiError';
  }
}

/**
 * Get authentication token (implement based on your auth system)
 */
const getAuthToken = (): string | null => {
  // Example: Retrieve token from localStorage, cookie, or context
  return localStorage.getItem('auth_token');
};

/**
 * Build query string from parameters
 */
const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorCode: string | undefined;
      let errorDetails: any;
      let validationErrors: ValidationError[] | undefined;

      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || errorMessage;
        errorCode = errorData.error?.code;
        errorDetails = errorData.error?.details || errorData;
        validationErrors = errorData.error?.validationErrors || [];
      } catch {
        // If error response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }

      throw new ApiError(response.status, errorCode, errorMessage, errorDetails, validationErrors);
    }

    // Handle empty responses (like DELETE requests)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, undefined, 'Network error or request failed', String(error));
  }
}

/**
 * API Client with common HTTP methods
 */
export const apiClient = {
  /**
   * GET request
   */
  get: <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    const queryString = params ? buildQueryString(params) : '';
    return fetchApi<T>(`${endpoint}${queryString}`, {
      method: 'GET',
    });
  },

  /**
   * POST request
   */
  post: <T>(endpoint: string, data?: any): Promise<T> => {
    return fetchApi<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * PUT request
   */
  put: <T>(endpoint: string, data?: any): Promise<T> => {
    return fetchApi<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * DELETE request
   */
  delete: <T>(endpoint: string): Promise<T> => {
    return fetchApi<T>(endpoint, {
      method: 'DELETE',
    });
  },
};

export default apiClient;

