import { PageHeader } from "@/components/layout/page-header";
import { DashboardGrid } from "@/components/layout/dashboard-grid";
import { StatCard } from "@/components/patterns/stat-card";
import { NexusCard, NexusCardHeader, NexusCardTitle, NexusCardContent } from "@/components/ui/nexus-card";
import { Users, Shield, Building2, FileText, Activity } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

const activityData = [
  { date: "Mon", logins: 45, audits: 22 },
  { date: "Tue", logins: 52, audits: 31 },
  { date: "Wed", logins: 49, audits: 28 },
  { date: "Thu", logins: 63, audits: 35 },
  { date: "Fri", logins: 58, audits: 40 },
  { date: "Sat", logins: 30, audits: 18 },
  { date: "Sun", logins: 25, audits: 12 },
];

const insightsData = [
  { metric: "Avg Latency", value: "42ms", status: "good" },
  { metric: "Error Rate", value: "0.12%", status: "good" },
  { metric: "Uptime", value: "99.98%", status: "good" },
  { metric: "Most Active Role", value: "Admin", status: "neutral" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your workspace activity and system health."
      />

      <DashboardGrid columns={4}>
        <StatCard title="Total Users" value="1,284" trend={{ value: 12.5, label: "vs last month" }} icon={Users} />
        <StatCard title="Total Roles" value="8" trend={{ value: 0, label: "no change" }} icon={Shield} />
        <StatCard title="Org Members" value="342" trend={{ value: 8.2, label: "vs last month" }} icon={Building2} />
        <StatCard title="Audit Logs" value="15,432" trend={{ value: -2.1, label: "vs last month" }} icon={FileText} />
      </DashboardGrid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gap">
        <NexusCard className="lg:col-span-2">
          <NexusCardHeader>
            <NexusCardTitle>Activity Overview</NexusCardTitle>
          </NexusCardHeader>
          <NexusCardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="loginGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(239, 84%, 67%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(239, 84%, 67%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="auditGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(168, 76%, 42%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(168, 76%, 42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" className="text-caption" tick={{ fill: 'hsl(215, 16%, 47%)' }} />
                <YAxis className="text-caption" tick={{ fill: 'hsl(215, 16%, 47%)' }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(214, 32%, 91%)', fontSize: 13 }} />
                <Area type="monotone" dataKey="logins" stroke="hsl(239, 84%, 67%)" fill="url(#loginGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="audits" stroke="hsl(168, 76%, 42%)" fill="url(#auditGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </NexusCardContent>
        </NexusCard>

        <NexusCard>
          <NexusCardHeader>
            <NexusCardTitle>System Insights</NexusCardTitle>
          </NexusCardHeader>
          <NexusCardContent className="space-y-4">
            {insightsData.map((item) => (
              <div key={item.metric} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-small text-muted-foreground">{item.metric}</span>
                <span className="text-body font-semibold">{item.value}</span>
              </div>
            ))}
          </NexusCardContent>
        </NexusCard>
      </div>
    </div>
  );
}
