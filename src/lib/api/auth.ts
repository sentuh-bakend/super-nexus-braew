import apiClient from './client';
import type { LoginRequest, RegisterRequest, LoginResponse, TokenResponse, User } from './types';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<LoginResponse>('/auth/login', data),

  register: (data: RegisterRequest) =>
    apiClient.post<LoginResponse>('/auth/register', data),

  logout: () =>
    apiClient.post('/auth/logout'),

  refreshToken: (refreshToken: string) =>
    apiClient.post<TokenResponse>('/auth/refresh', { refresh_token: refreshToken }),

  getCurrentUser: () =>
    apiClient.get<User>('/auth/me'),

  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, newPassword: string) =>
    apiClient.post('/auth/reset-password', { token, new_password: newPassword }),
};
