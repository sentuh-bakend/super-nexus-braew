import { useUIStore } from "@/stores";
import { NexusButton } from "@/components/ui/nexus-button";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { NexusInput } from "@/components/ui/nexus-input";

export function AppNavbar() {
  const { theme, setTheme, density, setDensity, toggleSidebarCollapse } = useUIStore();

  return (
    <header className="h-navbar border-b border-border bg-background flex items-center justify-between px-layout sticky top-0 z-10">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={toggleSidebarCollapse}
          className="lg:hidden p-2 rounded-md hover:bg-surface-hover text-muted-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <NexusInput
            placeholder="Search..."
            className="pl-10 h-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <NexusButton
          variant="ghost"
          size="icon"
          onClick={() => setDensity(density === "comfort" ? "compact" : "comfort")}
          title={density === "comfort" ? "Switch to compact" : "Switch to comfort"}
        >
          {density === "comfort" ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </NexusButton>
        <NexusButton
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </NexusButton>
        <NexusButton variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </NexusButton>
        <div className="ml-2 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-small font-semibold text-primary">
          A
        </div>
      </div>
    </header>
  );
}
