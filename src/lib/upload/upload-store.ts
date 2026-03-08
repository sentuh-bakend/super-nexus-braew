import { create } from "zustand";
import type { UploadItem, UploadStatus, TusUploaderOptions } from "./tus-client";
import { createTusUpload } from "./tus-client";

interface UploadState {
  items: UploadItem[];
  endpoint: string;
  maxConcurrent: number;
  setEndpoint: (endpoint: string) => void;
  addFiles: (files: File[]) => void;
  startUpload: (id: string) => void;
  startAll: () => void;
  pauseUpload: (id: string) => void;
  resumeUpload: (id: string) => void;
  cancelUpload: (id: string) => void;
  retryUpload: (id: string) => void;
  removeItem: (id: string) => void;
  clearCompleted: () => void;
  _updateItem: (id: string, patch: Partial<UploadItem>) => void;
}

let counter = 0;

export const useUploadStore = create<UploadState>()((set, get) => {
  const getOptions = (): TusUploaderOptions => ({
    endpoint: get().endpoint,
    onProgress: (id, progress) => get()._updateItem(id, { progress, status: "uploading" }),
    onSuccess: (id, url) => get()._updateItem(id, { progress: 100, status: "complete", url }),
    onError: (id, error) => get()._updateItem(id, { status: "error", error: error.message }),
  });

  return {
    items: [],
    endpoint: "/api/v1/uploads",
    maxConcurrent: 3,

    setEndpoint: (endpoint) => set({ endpoint }),

    addFiles: (files) => {
      const newItems: UploadItem[] = files.map((file) => ({
        id: `upload-${++counter}-${Date.now()}`,
        file,
        progress: 0,
        status: "queued" as UploadStatus,
      }));
      set((s) => ({ items: [...s.items, ...newItems] }));
    },

    startUpload: (id) => {
      const item = get().items.find((i) => i.id === id);
      if (!item || item.status === "uploading") return;

      const upload = createTusUpload(item, getOptions());
      get()._updateItem(id, { upload, status: "uploading" });
      upload.start();
    },

    startAll: () => {
      const { items, maxConcurrent, startUpload } = get();
      const queued = items.filter((i) => i.status === "queued");
      const active = items.filter((i) => i.status === "uploading").length;
      const toStart = queued.slice(0, maxConcurrent - active);
      toStart.forEach((i) => startUpload(i.id));
    },

    pauseUpload: (id) => {
      const item = get().items.find((i) => i.id === id);
      if (item?.upload && item.status === "uploading") {
        item.upload.abort();
        get()._updateItem(id, { status: "paused" });
      }
    },

    resumeUpload: (id) => {
      const item = get().items.find((i) => i.id === id);
      if (item?.upload && item.status === "paused") {
        get()._updateItem(id, { status: "uploading" });
        item.upload.start();
      }
    },

    cancelUpload: (id) => {
      const item = get().items.find((i) => i.id === id);
      if (item?.upload) {
        item.upload.abort();
      }
      set((s) => ({ items: s.items.filter((i) => i.id !== id) }));
    },

    retryUpload: (id) => {
      const item = get().items.find((i) => i.id === id);
      if (!item) return;

      const upload = createTusUpload(item, getOptions());
      get()._updateItem(id, { upload, status: "uploading", progress: 0, error: undefined });
      upload.start();
    },

    removeItem: (id) => {
      const item = get().items.find((i) => i.id === id);
      if (item?.upload && item.status === "uploading") item.upload.abort();
      set((s) => ({ items: s.items.filter((i) => i.id !== id) }));
    },

    clearCompleted: () => {
      set((s) => ({ items: s.items.filter((i) => i.status !== "complete") }));
    },

    _updateItem: (id, patch) => {
      set((s) => ({
        items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
      }));
    },
  };
});
