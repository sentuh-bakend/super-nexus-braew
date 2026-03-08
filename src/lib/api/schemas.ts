import { z } from 'zod';

// ── Primitives ──
export const idSchema = z.string().uuid();
export const emailSchema = z.string().trim().email().max(255);
export const timestampSchema = z.number().optional();

// ── Types (explicit interfaces for clean required/optional separation) ──

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar_url?: string;
  role?: string;
  status?: string;
  created_at?: number;
  updated_at?: number;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  created_at?: number;
  updated_at?: number;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  status: string;
  settings?: Record<string, unknown>;
  created_at?: number;
  updated_at?: number;
}

export interface OrgMember {
  id: string;
  user_id: string;
  organization_id: string;
  role_id: string;
  status: string;
  joined_at?: number;
  user?: User;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status: string;
  organization_id: string;
  created_at?: number;
  updated_at?: number;
}

export interface AccessRight {
  id: string;
  name: string;
  resource: string;
  action: string;
  conditions?: Record<string, unknown>;
  created_at?: number;
  updated_at?: number;
}

export interface Permission {
  id: string;
  role_id: string;
  access_right_id: string;
  granted: boolean;
  role_name?: string;
  access_right_name?: string;
  created_at?: number;
  updated_at?: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_at: string;
  expires_in: number;
  token_type: string;
  user: User;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: string;
  expires_in: number;
  token_type: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number };
}

export interface DashboardStats {
  total_users: number;
  total_roles: number;
  total_org_members: number;
  total_audit_logs: number;
}

export interface ActivityMetric {
  date: string;
  logins: number;
  audits: number;
}

export interface SystemInsight {
  avg_latency_ms: number;
  error_rate: number;
  uptime_percent: number;
  most_active_role: string;
}

// ── Zod Schemas (for runtime validation) ──

export const userSchema: z.ZodType<User> = z.object({
  id: z.string(),
  name: z.string().trim().min(1).max(100),
  email: emailSchema,
  username: z.string().trim().min(1).max(50),
  avatar_url: z.string().url().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
});

export const roleSchema: z.ZodType<Role> = z.object({
  id: z.string(),
  name: z.string().trim().min(1).max(100),
  description: z.string().max(500).optional(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
});

export const organizationSchema: z.ZodType<Organization> = z.object({
  id: z.string(),
  name: z.string().trim().min(1).max(200),
  slug: z.string(),
  owner_id: z.string(),
  status: z.string(),
  settings: z.record(z.unknown()).optional(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
});

export const orgMemberSchema: z.ZodType<OrgMember> = z.object({
  id: z.string(),
  user_id: z.string(),
  organization_id: z.string(),
  role_id: z.string(),
  status: z.string(),
  joined_at: timestampSchema,
  user: z.lazy(() => userSchema).optional(),
});

export const projectSchema: z.ZodType<Project> = z.object({
  id: z.string(),
  name: z.string().trim().min(1).max(200),
  slug: z.string(),
  description: z.string().max(1000).optional(),
  status: z.string(),
  organization_id: z.string(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
});

export const accessRightSchema: z.ZodType<AccessRight> = z.object({
  id: z.string(),
  name: z.string(),
  resource: z.string(),
  action: z.string(),
  conditions: z.record(z.unknown()).optional(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
});

export const permissionSchema: z.ZodType<Permission> = z.object({
  id: z.string(),
  role_id: z.string(),
  access_right_id: z.string(),
  granted: z.boolean(),
  role_name: z.string().optional(),
  access_right_name: z.string().optional(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
});

export const loginRequestSchema: z.ZodType<LoginRequest> = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const registerRequestSchema: z.ZodType<RegisterRequest> = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: emailSchema,
  username: z.string().trim().min(3, 'Min 3 characters').max(50),
  password: z.string().min(8, 'Min 8 characters'),
});

export const loginResponseSchema: z.ZodType<LoginResponse> = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_at: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
  user: userSchema,
});

export const tokenResponseSchema: z.ZodType<TokenResponse> = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_at: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
});

export function paginatedSchema<T>(itemSchema: z.ZodType<T>) {
  return z.object({
    data: z.array(itemSchema),
    meta: z.object({ total: z.number() }),
  });
}

export const dashboardStatsSchema: z.ZodType<DashboardStats> = z.object({
  total_users: z.number(),
  total_roles: z.number(),
  total_org_members: z.number(),
  total_audit_logs: z.number(),
});

export const activityMetricSchema: z.ZodType<ActivityMetric> = z.object({
  date: z.string(),
  logins: z.number(),
  audits: z.number(),
});

export const systemInsightSchema: z.ZodType<SystemInsight> = z.object({
  avg_latency_ms: z.number(),
  error_rate: z.number(),
  uptime_percent: z.number(),
  most_active_role: z.string(),
});
