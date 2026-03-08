import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { z } from 'zod';

// ── API Error ──
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromAxios(error: AxiosError<{ message?: string; error?: string; code?: string }>): ApiError {
    const status = error.response?.status ?? 0;
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message;
    const code = error.response?.data?.code;
    return new ApiError(message, status, code, error.response?.data);
  }

  get isUnauthorized() { return this.status === 401; }
  get isForbidden() { return this.status === 403; }
  get isNotFound() { return this.status === 404; }
  get isValidation() { return this.status === 422; }
  get isServer() { return this.status >= 500; }
}

// ── Axios instance ──
const axiosInstance = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('nexus_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('nexus_token');
      window.location.href = '/login';
    }
    return Promise.reject(ApiError.fromAxios(error as AxiosError<{ message?: string; error?: string; code?: string }>));
  }
);

// ── Type-safe request helpers ──

/** Validates response data against a Zod schema in development, passes through in production. */
function validate<T>(schema: z.ZodType<T>, data: unknown): T {
  if (import.meta.env.DEV) {
    const result = schema.safeParse(data);
    if (!result.success) {
      console.warn('[API] Response validation warning:', result.error.flatten());
    }
  }
  return data as T;
}

export const apiClient = {
  async get<T>(url: string, schema?: z.ZodType<T>, config?: AxiosRequestConfig): Promise<T> {
    const res = await axiosInstance.get(url, config);
    return schema ? validate(schema, res.data) : res.data;
  },

  async post<T>(url: string, data?: unknown, schema?: z.ZodType<T>, config?: AxiosRequestConfig): Promise<T> {
    const res = await axiosInstance.post(url, data, config);
    return schema ? validate(schema, res.data) : res.data;
  },

  async put<T>(url: string, data?: unknown, schema?: z.ZodType<T>, config?: AxiosRequestConfig): Promise<T> {
    const res = await axiosInstance.put(url, data, config);
    return schema ? validate(schema, res.data) : res.data;
  },

  async patch<T>(url: string, data?: unknown, schema?: z.ZodType<T>, config?: AxiosRequestConfig): Promise<T> {
    const res = await axiosInstance.patch(url, data, config);
    return schema ? validate(schema, res.data) : res.data;
  },

  async delete<T = void>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await axiosInstance.delete(url, config);
    return res.data;
  },
};

export default apiClient;
