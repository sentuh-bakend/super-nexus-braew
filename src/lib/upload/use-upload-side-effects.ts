import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useUploadStore } from "./upload-store";

/**
 * Registers global, app-level upload behaviors:
 * - beforeunload warning while uploads are active
 * - batch completion toasts (success / partial failure)
 * Mounted once in the app layout.
 */
export function useUploadSideEffects() {
  const items = useUploadStore((s) => s.items);
  const lastBatchRef = useRef<{ active: number; failed: number; done: number } | null>(null);

  // Before-unload protection while uploads are in flight.
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      const { items: current } = useUploadStore.getState();
      const inFlight = current.some(
        (i) => i.status === "uploading" || i.status === "preparing" || i.status === "queued",
      );
      if (!inFlight) return;
      e.preventDefault();
      e.returnValue = "Upload masih berjalan. Yakin ingin keluar?";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // Batch completion notifications: fire when the queue drains.
  useEffect(() => {
    const active = items.filter((i) => i.status === "uploading" || i.status === "preparing" || i.status === "queued").length;
    const failed = items.filter((i) => i.status === "error").length;
    const done = items.filter((i) => i.status === "success").length;
    const prev = lastBatchRef.current;

    // Detect: was active, now zero active, has at least one finished item.
    if (prev && prev.active > 0 && active === 0 && (done > 0 || failed > 0)) {
      if (failed === 0) {
        toast.success(`${done} file${done > 1 ? "s" : ""} uploaded successfully`);
      } else if (done === 0) {
        toast.error(`${failed} upload${failed > 1 ? "s" : ""} failed`);
      } else {
        toast.warning(`Upload completed with ${failed} error${failed > 1 ? "s" : ""}`);
      }
    }
    lastBatchRef.current = { active, failed, done };
  }, [items]);
}
