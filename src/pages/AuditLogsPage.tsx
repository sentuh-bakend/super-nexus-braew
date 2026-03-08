import { PageHeader } from "@/components/layout/page-header";
import { NexusCard } from "@/components/ui/nexus-card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

const mockLogs = [
  { id: "1", action: "user.created", actor: "admin@nexus.io", target: "john@example.com", timestamp: "2024-03-08 14:23:01", severity: "info" as const },
  { id: "2", action: "role.updated", actor: "admin@nexus.io", target: "Editor", timestamp: "2024-03-08 13:45:22", severity: "warning" as const },
  { id: "3", action: "permission.deleted", actor: "admin@nexus.io", target: "write:reports", timestamp: "2024-03-08 12:10:45", severity: "destructive" as const },
  { id: "4", action: "user.login", actor: "jane@example.com", target: "-", timestamp: "2024-03-08 11:30:00", severity: "info" as const },
  { id: "5", action: "org.settings_changed", actor: "admin@nexus.io", target: "Acme Corp", timestamp: "2024-03-08 10:05:33", severity: "warning" as const },
];

const severityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  info: "secondary",
  warning: "outline",
  destructive: "destructive",
};

export default function AuditLogsPage() {
  return (
    <div>
      <PageHeader
        title="Audit Logs"
        description="System activity and change history"
        icon={<FileText className="h-6 w-6" />}
      />
      <NexusCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Action</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actor</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Target</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Severity</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {mockLogs.map((log) => (
                <tr key={log.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{log.action}</td>
                  <td className="px-4 py-3">{log.actor}</td>
                  <td className="px-4 py-3">{log.target}</td>
                  <td className="px-4 py-3">
                    <Badge variant={severityVariant[log.severity] ?? "default"}>{log.severity}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NexusCard>
    </div>
  );
}
