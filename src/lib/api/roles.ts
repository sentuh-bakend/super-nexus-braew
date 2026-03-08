import apiClient from './client';
import type { Role, PaginatedResponse } from './types';

export const rolesApi = {
  list: (params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<Role>>('/roles', { params }),

  create: (data: { name: string; description?: string }) =>
    apiClient.post<Role>('/roles', data),

  update: (id: string, data: { name?: string; description?: string }) =>
    apiClient.put<Role>(`/roles/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/roles/${id}`),
};
