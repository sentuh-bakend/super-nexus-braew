import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores";
import {
  LayoutDashboard, Users, Shield, Building2, FolderKanban, Settings,
  ChevronLeft, ChevronRight, Hexagon, Palette, Component, KeyRound, Lock,
  ChevronDown, FileText, UserCheck, ShieldCheck, Upload, HeartPulse, BarChart3,
} from "lucide-react";
import { useState } from "react";
import { OrganizationSwitcher } from "@/features/organizations/organization-switcher";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

interface NavSection {
  label: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

const navSections: NavSection[] = [
  {
    label: "Dashboard",
    defaultOpen: true,
    items: [
      { label: "Overview", path: "/", icon: LayoutDashboard },
    ],
  },
  {
    label: "Users",
    defaultOpen: true,
    items: [
      { label: "Users", path: "/users", icon: Users },
      { label: "Roles", path: "/roles", icon: Shield },
      { label: "Permissions", path: "/permissions", icon: Lock },
      { label: "Access Rights", path: "/access-rights", icon: KeyRound },
      { label: "Role Permissions", path: "/roles-permissions", icon: ShieldCheck },
    ],
  },
  {
    label: "Organization",
    defaultOpen: true,
    items: [
      { label: "Workspace", path: "/workspace", icon: Building2 },
      { label: "Organizations", path: "/organizations", icon: Building2 },
      { label: "Members", path: "/workspace", icon: UserCheck },
      { label: "Projects", path: "/projects", icon: FolderKanban },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Audit Logs", path: "/audit-logs", icon: FileText },
      { label: "Uploads", path: "/uploads", icon: Upload },
      { label: "Settings", path: "/settings", icon: Settings },
      { label: "Design System", path: "/design-system", icon: Palette },
      { label: "Components", path: "/components", icon: Component },
    ],
  },
];

function SidebarSection({
  section,
  collapsed,
  currentPath,
}: {
  section: NavSection;
  collapsed: boolean;
  currentPath: string;
}) {
  const hasActiveChild = section.items.some((i) => i.path === currentPath);
  const [open, setOpen] = useState(section.defaultOpen ?? hasActiveChild);

  if (collapsed) {
    return (
      <div className="space-y-0.5">
        {section.items.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Tooltip key={item.path + item.label} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center justify-center h-10 w-10 mx-auto rounded-md transition-colors duration-150",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 hover:text-muted-foreground transition-colors"
      >
        <span>{section.label}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="mt-0.5 space-y-0.5">
          {section.items.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path + item.label}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function AppSidebar() {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebarCollapse } = useUIStore();

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border h-screen sticky top-0 transition-all duration-300 z-20",
        sidebarCollapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-sidebar-border shrink-0">
        <Hexagon className="h-7 w-7 text-primary shrink-0" />
        {!sidebarCollapsed && (
          <span className="text-lg font-bold text-sidebar-foreground whitespace-nowrap">NexusOS</span>
        )}
      </div>

      {/* Org Switcher */}
      <div className="px-2 py-2 border-b border-sidebar-border">
        <OrganizationSwitcher collapsed={sidebarCollapsed} />
      </div>

      {/* Nav sections */}
      <nav className="flex-1 py-3 px-2 space-y-4 overflow-y-auto">
        {navSections.map((section) => (
          <SidebarSection
            key={section.label}
            section={section}
            collapsed={sidebarCollapsed}
            currentPath={location.pathname}
          />
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-sidebar-border shrink-0">
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
