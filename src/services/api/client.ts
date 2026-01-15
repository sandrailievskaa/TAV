import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

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
    const apiBaseURL = baseURL || 
      (import.meta.env.DEV 
        ? '/api'
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

  private setupInterceptors() {
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

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError = this.transformError(error);
        this.handleError(apiError);
        return Promise.reject(apiError);
      }
    );
  }

  private transformError(error: AxiosError): ApiError {
    if (error.response) {
      const response = error.response;
      const data = response.data as any;

      return {
        message: data?.message || data?.title || `HTTP ${response.status}: ${response.statusText}`,
        statusCode: response.status,
        errors: data?.errors || undefined,
        details: data,
      };
    } else if (error.request) {
      return {
        message: 'Нема конекција со серверот. Проверете ја вашата интернет врска.',
        details: error.request,
      };
    } else {
      return {
        message: error.message || 'Неочекувана грешка',
        details: error,
      };
    }
  }

  private handleError(error: ApiError) {
    const silentStatusCodes = [401, 403];
    
    if (error.statusCode && silentStatusCodes.includes(error.statusCode)) {
      return;
    }

    const errorMessage = this.formatErrorMessage(error);
    
    toast.error('Грешка', {
      description: errorMessage,
      duration: 5000,
    });

    console.error('API Error:', error);
  }

  private formatErrorMessage(error: ApiError): string {
    if (error.errors) {
      const firstError = Object.values(error.errors)[0];
      if (Array.isArray(firstError) && firstError.length > 0) {
        return firstError[0];
      }
    }
    return error.message || 'Неочекувана грешка';
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  getInstance(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient();
export default ApiClient;
