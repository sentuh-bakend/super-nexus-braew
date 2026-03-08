import { apiClient } from './client';
import {
  loginRequestSchema, registerRequestSchema,
  loginResponseSchema, tokenResponseSchema, userSchema,
  type LoginRequest, type RegisterRequest, type LoginResponse, type TokenResponse, type User,
} from './schemas';

export const authApi = {
  login: (data: LoginRequest) => {
    loginRequestSchema.parse(data);
    return apiClient.post<LoginResponse>('/auth/login', data, loginResponseSchema);
  },

  register: (data: RegisterRequest) => {
    registerRequestSchema.parse(data);
    return apiClient.post<LoginResponse>('/auth/register', data, loginResponseSchema);
  },

  logout: () => apiClient.post('/auth/logout'),

  refreshToken: (refreshToken: string) =>
    apiClient.post<TokenResponse>('/auth/refresh', { refresh_token: refreshToken }, tokenResponseSchema),

  getCurrentUser: () =>
    apiClient.get<User>('/auth/me', userSchema),

  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, newPassword: string) =>
    apiClient.post('/auth/reset-password', { token, new_password: newPassword }),
};
