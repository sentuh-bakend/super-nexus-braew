import apiClient from './client';
import type { User, PaginatedResponse } from './types';

export const usersApi = {
  list: (params?: { page?: number; limit?: number; search?: string }) =>
    apiClient.get<PaginatedResponse<User>>('/users', { params }),

  get: (id: string) =>
    apiClient.get<User>(`/users/${id}`),

  delete: (id: string) =>
    apiClient.delete(`/users/${id}`),
};
