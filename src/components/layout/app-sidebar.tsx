import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores";
import {
  LayoutDashboard,
  Users,
  Shield,
  Building2,
  FolderKanban,
  Settings,
  ChevronLeft,
  ChevronRight,
  Hexagon,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Users", path: "/users", icon: Users },
  { label: "Roles", path: "/roles", icon: Shield },
  { label: "Organizations", path: "/organizations", icon: Building2 },
  { label: "Projects", path: "/projects", icon: FolderKanban },
  { label: "Settings", path: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebarCollapse } = useUIStore();

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border h-screen sticky top-0 transition-all duration-slow z-20",
        sidebarCollapsed ? "w-sidebar-collapsed" : "w-sidebar"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-navbar border-b border-sidebar-border">
        <Hexagon className="h-8 w-8 text-primary shrink-0" />
        {!sidebarCollapsed && (
          <span className="text-h3 font-bold text-sidebar-foreground whitespace-nowrap">NexusOS</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-body font-medium transition-colors duration-normal",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-sidebar-border">
        <button
          onClick={toggleSidebarCollapse}
          className="flex items-center justify-center w-full py-2 rounded-md hover:bg-sidebar-accent text-muted-foreground transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}
