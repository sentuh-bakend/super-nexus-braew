import { Outlet } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import { AppNavbar } from "./app-navbar";
import { AppBreadcrumb } from "./app-breadcrumb";
import { AppCommandPalette } from "@/components/navigation/app-command-palette";
import { useRealtimeInit } from "@/hooks/use-realtime";
import { UploadManager } from "@/components/upload/upload-manager";

export function AppLayout() {
  useRealtimeInit();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppNavbar />
        <main className="flex-1 p-6 overflow-auto animate-fade-in">
          <AppBreadcrumb />
          <Outlet />
        </main>
      </div>
      <AppCommandPalette />
      <UploadManager />
    </div>
  );
}
