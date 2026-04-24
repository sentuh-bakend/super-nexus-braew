import { useMemo } from "react";
import { ChevronDown, ChevronUp, UploadCloud, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { NexusButton } from "@/components/ui/nexus-button";
import { NexusCard } from "@/components/ui/nexus-card";
import { useUploadStore } from "@/lib/upload/upload-store";
import { UploadProgress } from "./upload-progress";

export function UploadManager() {
  const items = useUploadStore((s) => s.items);
  const open = useUploadStore((s) => s.managerOpen);
  const setOpen = useUploadStore((s) => s.setManagerOpen);
  const clearCompleted = useUploadStore((s) => s.clearCompleted);
  const pauseUpload = useUploadStore((s) => s.pauseUpload);
  const resumeUpload = useUploadStore((s) => s.resumeUpload);
  const cancelUpload = useUploadStore((s) => s.cancelUpload);
  const retryUpload = useUploadStore((s) => s.retryUpload);

  const summary = useMemo(() => {
    const active = items.filter((i) => i.status === "preparing" || i.status === "uploading").length;
    const done = items.filter((i) => i.status === "complete").length;
    const failed = items.filter((i) => i.status === "error").length;
    const canceled = items.filter((i) => i.status === "canceled").length;
    const progress = items.length ? Math.round(items.reduce((sum, item) => sum + item.progress, 0) / items.length) : 0;
    return { active, done, failed, canceled, progress };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-md" aria-label="Upload manager" aria-live="polite">
      <NexusCard className="overflow-hidden p-0 shadow-lg">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <button type="button" onClick={() => setOpen(!open)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <UploadCloud className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-sm font-semibold text-foreground">Uploads</h3>
                <Badge variant="secondary" className="text-[10px]">{items.length}</Badge>
              </div>
              <p className="truncate text-[11px] text-muted-foreground">
                {summary.active > 0 ? `${summary.active} active` : "No active uploads"}
                {summary.done > 0 ? ` · ${summary.done} done` : ""}
                {summary.failed > 0 ? ` · ${summary.failed} failed` : ""}
                {summary.canceled > 0 ? ` · ${summary.canceled} canceled` : ""}
              </p>
            </div>
          </button>
          <div className="flex items-center gap-1">
            <NexusButton variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(!open)} aria-label={open ? "Collapse uploads" : "Expand uploads"}>
              {open ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </NexusButton>
            <NexusButton variant="ghost" size="icon" className="h-8 w-8" onClick={clearCompleted} aria-label="Clear completed uploads">
              <X className="h-4 w-4" />
            </NexusButton>
          </div>
        </div>

        {!open && <Progress value={summary.progress} className="h-1 rounded-none" />}

        {open && (
          <div className="max-h-[420px] overflow-y-auto p-2">
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
        )}
      </NexusCard>
    </aside>
  );
}