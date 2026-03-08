import apiClient from '@/lib/api/client';
import type { Organization, PaginatedResponse } from '@/lib/api/types';

export const organizationService = {
  list: (params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<Organization>>('/organizations', { params }).then((r) => r.data),
  create: (data: { name: string; slug?: string }) =>
    apiClient.post<Organization>('/organizations', data).then((r) => r.data),
  update: (id: string, data: Partial<Organization>) =>
    apiClient.put<Organization>(`/organizations/${id}`, data).then((r) => r.data),
  delete: (id: string) =>
    apiClient.delete(`/organizations/${id}`),
};
