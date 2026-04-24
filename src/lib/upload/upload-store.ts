import { create } from "zustand";
import type { UploadItem, UploadStatus, TusUploaderOptions } from "./tus-client";
import { createTusUpload } from "./tus-client";
import { toast } from "sonner";

interface AddFilesOptions {
  targetFolderId?: string;
  targetFolderName?: string;
}

interface UploadState {
  items: UploadItem[];
  uploadQueue: UploadItem[];
  endpoint: string;
  maxConcurrent: number;
  managerOpen: boolean;
  setEndpoint: (endpoint: string) => void;
  setMaxConcurrent: (value: number) => void;
  setManagerOpen: (open: boolean) => void;
  addFiles: (files: File[], options?: AddFilesOptions) => void;
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
const MANAGER_OPEN_KEY = "nexus-upload-manager-open";

function getStoredManagerOpen() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(MANAGER_OPEN_KEY) === "true";
}

function getRelativePath(file: File) {
  return (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name;
}

export const useUploadStore = create<UploadState>()((set, get) => {
  const getOptions = (): TusUploaderOptions => ({
    endpoint: get().endpoint,
    onProgress: (id, progress) => get()._updateItem(id, { progress, status: "uploading" }),
    onSuccess: (id, url) => {
      const item = get().items.find((i) => i.id === id);
      get()._updateItem(id, { progress: 100, status: "success", url, uploadedFileId: url, responseData: { url }, completedAt: Date.now() });
      get().startAll();
      if (item) {
        window.dispatchEvent(new CustomEvent("nexus:upload-complete", { detail: { item: { ...item, url } } }));
      }
    },
    onError: (id, error) => {
      get()._updateItem(id, { status: "error", error: error.message, errorMessage: error.message });
      get().startAll();
    },
  });

  return {
    items: [],
    uploadQueue: [],
    endpoint: "/api/v1/uploads",
    maxConcurrent: 3,
    managerOpen: getStoredManagerOpen(),

    setEndpoint: (endpoint) => set({ endpoint }),

    setMaxConcurrent: (value) => set({ maxConcurrent: Math.max(1, Math.min(6, value)) }),

    setManagerOpen: (open) => {
      if (typeof window !== "undefined") window.localStorage.setItem(MANAGER_OPEN_KEY, String(open));
      set({ managerOpen: open });
    },

    addFiles: (files, options) => {
      const newItems: UploadItem[] = files.map((file) => ({
        id: `upload-${++counter}-${Date.now()}`,
        file,
        fileName: file.name,
        fileSize: file.size,
        progress: 0,
        status: "queued" as UploadStatus,
        targetFolderId: options?.targetFolderId,
        targetFolderName: options?.targetFolderName,
        relativePath: getRelativePath(file),
        createdAt: Date.now(),
      }));
      set((s) => ({ items: [...s.items, ...newItems], uploadQueue: [...s.uploadQueue, ...newItems] }));
      get().setManagerOpen(true);
      toast.success(`${newItems.length} upload${newItems.length > 1 ? "s" : ""} added to queue`);
      get().startAll();
    },

    startUpload: (id) => {
      const item = get().items.find((i) => i.id === id);
      if (!item || item.status === "uploading" || item.status === "success") return;

      const upload = createTusUpload(item, getOptions());
      get()._updateItem(id, { upload, status: "preparing", error: undefined });
      upload.start();
    },

    startAll: () => {
      const { items, maxConcurrent, startUpload } = get();
      const queued = items.filter((i) => i.status === "queued");
      const active = items.filter((i) => i.status === "preparing" || i.status === "uploading").length;
      const toStart = queued.slice(0, maxConcurrent - active);
      toStart.forEach((i) => startUpload(i.id));
    },

    pauseUpload: (id) => {
      const item = get().items.find((i) => i.id === id);
      if (item?.upload && item.status === "uploading") {
        item.upload.abort();
        get()._updateItem(id, { status: "paused" });
        get().startAll();
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
      get()._updateItem(id, { status: "canceled", error: undefined, upload: undefined });
      get().startAll();
    },

    retryUpload: (id) => {
      const item = get().items.find((i) => i.id === id);
      if (!item) return;

      const upload = createTusUpload(item, getOptions());
      get()._updateItem(id, { upload, status: "preparing", progress: 0, error: undefined });
      upload.start();
    },

    removeItem: (id) => {
      const item = get().items.find((i) => i.id === id);
      if (item?.upload && item.status === "uploading") item.upload.abort();
      set((s) => ({ items: s.items.filter((i) => i.id !== id) }));
    },

    clearCompleted: () => {
      set((s) => {
        const uploadQueue = s.uploadQueue.filter((i) => i.status !== "success");
        return { items: uploadQueue, uploadQueue };
      });
    },

    _updateItem: (id, patch) => {
      set((s) => ({
        items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
        uploadQueue: s.uploadQueue.map((i) => (i.id === id ? { ...i, ...patch } : i)),
      }));
    },
  };
});
