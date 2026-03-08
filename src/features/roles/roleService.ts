import apiClient from '@/lib/api/client';
import type { Role, PaginatedResponse } from '@/lib/api/types';

export const roleService = {
  list: (params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<Role>>('/roles', { params }).then((r) => r.data),
  create: (data: { name: string; description?: string }) =>
    apiClient.post<Role>('/roles', data).then((r) => r.data),
  update: (id: string, data: Partial<Role>) =>
    apiClient.put<Role>(`/roles/${id}`, data).then((r) => r.data),
  delete: (id: string) =>
    apiClient.delete(`/roles/${id}`),
};
