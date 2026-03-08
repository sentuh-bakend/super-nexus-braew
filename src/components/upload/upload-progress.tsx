import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { NexusButton } from "@/components/ui/nexus-button";
import { Badge } from "@/components/ui/badge";
import type { UploadItem } from "@/lib/upload/tus-client";
import {
  Pause, Play, X, RotateCcw, CheckCircle2, AlertCircle, Clock, Loader2,
} from "lucide-react";

interface UploadProgressProps {
  item: UploadItem;
  onPause?: () => void;
  onResume?: () => void;
  onCancel?: () => void;
  onRetry?: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

const statusConfig = {
  queued: { icon: Clock, label: "Queued", color: "text-muted-foreground" },
  uploading: { icon: Loader2, label: "Uploading", color: "text-primary" },
  paused: { icon: Pause, label: "Paused", color: "text-amber-500" },
  complete: { icon: CheckCircle2, label: "Complete", color: "text-emerald-500" },
  error: { icon: AlertCircle, label: "Error", color: "text-destructive" },
};

export function UploadProgress({ item, onPause, onResume, onCancel, onRetry }: UploadProgressProps) {
  const config = statusConfig[item.status];
  const StatusIcon = config.icon;

  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-muted/30 group hover:bg-muted/50 transition-colors">
      {/* File icon / status */}
      <StatusIcon
        className={cn(
          "h-4.5 w-4.5 shrink-0",
          config.color,
          item.status === "uploading" && "animate-spin"
        )}
      />

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-foreground truncate">{item.file.name}</p>
          <span className="text-[11px] text-muted-foreground shrink-0">
            {formatFileSize(item.file.size)}
          </span>
        </div>

        {(item.status === "uploading" || item.status === "paused") && (
          <div className="flex items-center gap-2">
            <Progress value={item.progress} className="h-1.5 flex-1" />
            <span className="text-[11px] font-medium text-muted-foreground w-8 text-right">
              {item.progress}%
            </span>
          </div>
        )}

        {item.status === "error" && item.error && (
          <p className="text-[11px] text-destructive truncate">{item.error}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        {item.status === "uploading" && onPause && (
          <NexusButton variant="ghost" size="icon" className="h-7 w-7" onClick={onPause}>
            <Pause className="h-3.5 w-3.5" />
          </NexusButton>
        )}
        {item.status === "paused" && onResume && (
          <NexusButton variant="ghost" size="icon" className="h-7 w-7" onClick={onResume}>
            <Play className="h-3.5 w-3.5" />
          </NexusButton>
        )}
        {item.status === "error" && onRetry && (
          <NexusButton variant="ghost" size="icon" className="h-7 w-7" onClick={onRetry}>
            <RotateCcw className="h-3.5 w-3.5" />
          </NexusButton>
        )}
        {item.status !== "complete" && onCancel && (
          <NexusButton variant="ghost" size="icon" className="h-7 w-7" onClick={onCancel}>
            <X className="h-3.5 w-3.5 text-destructive" />
          </NexusButton>
        )}
      </div>
    </div>
  );
}
