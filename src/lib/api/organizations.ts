import apiClient from './client';
import type { Organization, OrgMember, PaginatedResponse } from './types';

export const organizationsApi = {
  list: (params?: { page?: number; limit?: number }) =>
    apiClient.get<PaginatedResponse<Organization>>('/organizations', { params }),

  create: (data: { name: string; slug?: string }) =>
    apiClient.post<Organization>('/organizations', data),

  update: (id: string, data: Partial<Organization>) =>
    apiClient.put<Organization>(`/organizations/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/organizations/${id}`),

  getMembers: (orgId: string) =>
    apiClient.get<PaginatedResponse<OrgMember>>(`/organizations/${orgId}/members`),

  inviteMember: (orgId: string, data: { email: string; role_id: string }) =>
    apiClient.post(`/organizations/${orgId}/members/invite`, data),

  removeMember: (orgId: string, memberId: string) =>
    apiClient.delete(`/organizations/${orgId}/members/${memberId}`),
};
