import apiClient from './client';
import type { DashboardStats, ActivityMetric, SystemInsight } from './types';

export const statsApi = {
  getDashboardSummary: () =>
    apiClient.get<DashboardStats>('/stats/dashboard'),

  getActivityMetrics: (params?: { from?: string; to?: string }) =>
    apiClient.get<ActivityMetric[]>('/stats/activity', { params }),

  getSystemInsights: () =>
    apiClient.get<SystemInsight>('/stats/insights'),
};
