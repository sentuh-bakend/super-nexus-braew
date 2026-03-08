import { apiClient } from '@/lib/api/client';
import type { User, PaginatedResponse } from '@/lib/api/schemas';

export const userService = {
  list: (params?: { page?: number; limit?: number; search?: string }) =>
    apiClient.get<PaginatedResponse<User>>('/users', undefined, { params }),

  get: (id: string) =>
    apiClient.get<User>(`/users/${id}`),

  create: (data: { name: string; email: string; username: string; password: string; role?: string }) =>
    apiClient.post<User>('/users', data),

  update: (id: string, data: Partial<User>) =>
    apiClient.put<User>(`/users/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/users/${id}`),
};
