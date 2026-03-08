import apiClient from '@/lib/api/client';
import type { User, PaginatedResponse } from '@/lib/api/types';

export const userService = {
  list: (params?: { page?: number; limit?: number; search?: string }) =>
    apiClient.get<PaginatedResponse<User>>('/users', { params }).then((r) => r.data),

  get: (id: string) =>
    apiClient.get<User>(`/users/${id}`).then((r) => r.data),

  create: (data: { name: string; email: string; username: string; password: string; role?: string }) =>
    apiClient.post<User>('/users', data).then((r) => r.data),

  update: (id: string, data: Partial<User>) =>
    apiClient.put<User>(`/users/${id}`, data).then((r) => r.data),

  delete: (id: string) =>
    apiClient.delete(`/users/${id}`),
};
