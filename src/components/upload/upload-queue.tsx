import { useUploadStore } from "@/lib/upload/upload-store";
import { UploadProgress } from "./upload-progress";
import { NexusButton } from "@/components/ui/nexus-button";
import { NexusCard } from "@/components/ui/nexus-card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Play } from "lucide-react";

export function UploadQueue() {
  const items = useUploadStore((s) => s.items);
  const startAll = useUploadStore((s) => s.startAll);
  const clearCompleted = useUploadStore((s) => s.clearCompleted);
  const pauseUpload = useUploadStore((s) => s.pauseUpload);
  const resumeUpload = useUploadStore((s) => s.resumeUpload);
  const cancelUpload = useUploadStore((s) => s.cancelUpload);
  const retryUpload = useUploadStore((s) => s.retryUpload);

  const uploading = items.filter((i) => i.status === "uploading").length;
  const queued = items.filter((i) => i.status === "queued").length;
  const completed = items.filter((i) => i.status === "complete").length;
  const errors = items.filter((i) => i.status === "error").length;

  if (items.length === 0) return null;

  return (
    <NexusCard>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">Upload Queue</h3>
          <Badge variant="secondary" className="text-[10px]">{items.length}</Badge>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          {uploading > 0 && (
            <Badge className="bg-primary/10 text-primary border-primary/20">{uploading} uploading</Badge>
          )}
          {queued > 0 && (
            <Badge variant="outline">{queued} queued</Badge>
          )}
          {completed > 0 && (
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
              {completed} done
            </Badge>
          )}
          {errors > 0 && (
            <Badge variant="destructive">{errors} failed</Badge>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="p-2 space-y-1 max-h-[360px] overflow-y-auto">
        {items.map((item) => (
          <UploadProgress
            key={item.id}
            item={item}
            onPause={() => pauseUpload(item.id)}
            onResume={() => resumeUpload(item.id)}
            onCancel={() => cancelUpload(item.id)}
            onRetry={() => retryUpload(item.id)}
          />
        ))}
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-border">
        {queued > 0 && (
          <NexusButton size="sm" variant="outline" onClick={startAll}>
            <Play className="h-3.5 w-3.5 mr-1.5" />
            Start All
          </NexusButton>
        )}
        {completed > 0 && (
          <NexusButton size="sm" variant="ghost" onClick={clearCompleted} className="ml-auto">
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            Clear Completed
          </NexusButton>
        )}
      </div>
    </NexusCard>
  );
}
