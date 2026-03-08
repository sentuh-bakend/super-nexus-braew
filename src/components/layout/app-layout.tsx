import { Outlet } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import { AppNavbar } from "./app-navbar";
import { useRealtimeInit } from "@/hooks/use-realtime";

export function AppLayout() {
  // Initialize realtime connections (SSE + WebSocket)
  useRealtimeInit();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AppNavbar />
        <main className="flex-1 p-layout overflow-auto animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
