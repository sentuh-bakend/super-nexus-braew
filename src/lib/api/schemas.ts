import { z } from 'zod';

// ── Primitives ──
export const idSchema = z.string().uuid();
export const emailSchema = z.string().trim().email().max(255);
export const timestampSchema = z.number().optional();

// ── User ──
export const userSchema = z.object({
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

export type User = z.infer<typeof userSchema>;

// ── Role ──
export const roleSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1).max(100),
  description: z.string().max(500).optional(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
});

export type Role = z.infer<typeof roleSchema>;

// ── Organization ──
export const organizationSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1).max(200),
  slug: z.string(),
  owner_id: z.string(),
  status: z.string(),
  settings: z.record(z.unknown()).optional(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
});

export type Organization = z.infer<typeof organizationSchema>;

// ── OrgMember ──
export const orgMemberSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  organization_id: z.string(),
  role_id: z.string(),
  status: z.string(),
  joined_at: timestampSchema,
  user: userSchema.optional(),
});

export type OrgMember = z.infer<typeof orgMemberSchema>;

// ── Project ──
export const projectSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1).max(200),
  slug: z.string(),
  description: z.string().max(1000).optional(),
  status: z.string(),
  organization_id: z.string(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
});

export type Project = z.infer<typeof projectSchema>;

// ── AccessRight ──
export const accessRightSchema = z.object({
  id: z.string(),
  name: z.string(),
  resource: z.string(),
  action: z.string(),
  conditions: z.record(z.unknown()).optional(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
});

export type AccessRight = z.infer<typeof accessRightSchema>;

// ── Permission ──
export const permissionSchema = z.object({
  id: z.string(),
  role_id: z.string(),
  access_right_id: z.string(),
  granted: z.boolean(),
  role_name: z.string().optional(),
  access_right_name: z.string().optional(),
  created_at: timestampSchema,
  updated_at: timestampSchema,
});

export type Permission = z.infer<typeof permissionSchema>;

// ── Auth ──
export const loginRequestSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const registerRequestSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: emailSchema,
  username: z.string().trim().min(3, 'Min 3 characters').max(50),
  password: z.string().min(8, 'Min 8 characters'),
});

export type RegisterRequest = z.infer<typeof registerRequestSchema>;

export const loginResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_at: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
  user: userSchema,
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const tokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_at: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
});

export type TokenResponse = z.infer<typeof tokenResponseSchema>;

// ── Paginated ──
export function paginatedSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    data: z.array(itemSchema),
    meta: z.object({ total: z.number() }),
  });
}

export type PaginatedResponse<T> = {
  data: T[];
  meta: { total: number };
};

// ── Dashboard Stats ──
export const dashboardStatsSchema = z.object({
  total_users: z.number(),
  total_roles: z.number(),
  total_org_members: z.number(),
  total_audit_logs: z.number(),
});

export type DashboardStats = z.infer<typeof dashboardStatsSchema>;

export const activityMetricSchema = z.object({
  date: z.string(),
  logins: z.number(),
  audits: z.number(),
});

export type ActivityMetric = z.infer<typeof activityMetricSchema>;

export const systemInsightSchema = z.object({
  avg_latency_ms: z.number(),
  error_rate: z.number(),
  uptime_percent: z.number(),
  most_active_role: z.string(),
});

export type SystemInsight = z.infer<typeof systemInsightSchema>;
