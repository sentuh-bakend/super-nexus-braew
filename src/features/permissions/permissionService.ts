import apiClient from '@/lib/api/client';
import type { Permission, PaginatedResponse } from '@/lib/api/types';

export const permissionService = {
  list: (params?: { page?: number; limit?: number; role_id?: string }) =>
    apiClient.get<PaginatedResponse<Permission>>('/permissions', { params }).then((r) => r.data),
  create: (data: { role_id: string; access_right_id: string; granted: boolean }) =>
    apiClient.post<Permission>('/permissions', data).then((r) => r.data),
  update: (id: string, data: Partial<Permission>) =>
    apiClient.put<Permission>(`/permissions/${id}`, data).then((r) => r.data),
  delete: (id: string) =>
    apiClient.delete(`/permissions/${id}`),
};
