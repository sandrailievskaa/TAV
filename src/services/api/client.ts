import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

/**
 * API Client Configuration
 * Ова е централизиран API клиент со вградена error handling
 */
export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
  details?: unknown;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL?: string) {
    // Во development, користиме proxy од Vite (/api)
    // Во production, користиме full URL од env variable
    const apiBaseURL = baseURL || 
      (import.meta.env.DEV 
        ? '/api'  // Vite proxy
        : import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api');
    
    this.client = axios.create({
      baseURL: apiBaseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   * Овде се фаќаат сите errors и се трансформираат во унифициран формат
   */
  private setupInterceptors() {
    // Request interceptor - додавање на auth token
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError = this.transformError(error);
        this.handleError(apiError);
        return Promise.reject(apiError);
      }
    );
  }

  /**
   * Transform Axios errors into unified ApiError format
   */
  private transformError(error: AxiosError): ApiError {
    if (error.response) {
      // Server responded with error status
      const response = error.response;
      const data = response.data as any;

      return {
        message: data?.message || data?.title || `HTTP ${response.status}: ${response.statusText}`,
        statusCode: response.status,
        errors: data?.errors || undefined,
        details: data,
      };
    } else if (error.request) {
      // Request made but no response received
      return {
        message: 'Нема конекција со серверот. Проверете ја вашата интернет врска.',
        details: error.request,
      };
    } else {
      // Error in request setup
      return {
        message: error.message || 'Неочекувана грешка',
        details: error,
      };
    }
  }

  /**
   * Global error handler - прикажува toast notifications
   * Може да се промени за да се интегрира со вашето error handling решение
   */
  private handleError(error: ApiError) {
    // Статус кодови кои не треба да покажуваат toast (на пр. 401 за redirect на login)
    const silentStatusCodes = [401, 403];
    
    if (error.statusCode && silentStatusCodes.includes(error.statusCode)) {
      return;
    }

    // Прикажување на грешка во toast
    const errorMessage = this.formatErrorMessage(error);
    
    toast.error('Грешка', {
      description: errorMessage,
      duration: 5000,
    });

    // Овде може да додадете логика за логгирање на errors во систем
    console.error('API Error:', error);
  }

  /**
   * Format error message for display
   */
  private formatErrorMessage(error: ApiError): string {
    if (error.errors) {
      // Ако има валидациони errors, прикажи ги првите
      const firstError = Object.values(error.errors)[0];
      if (Array.isArray(firstError) && firstError.length > 0) {
        return firstError[0];
      }
    }
    return error.message || 'Неочекувана грешка';
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  /**
   * Get the underlying axios instance for advanced use cases
   */
  getInstance(): AxiosInstance {
    return this.client;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for creating custom instances if needed
export default ApiClient;
