// API Response types based on swagger
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
