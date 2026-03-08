import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import { useUIStore } from "@/stores";
import { useEffect } from "react";

// Pages
import DashboardPage from "@/pages/DashboardPage";
import SettingsPage from "@/pages/SettingsPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import DesignSystemPage from "@/pages/DesignSystemPage";
import ComponentShowcasePage from "@/pages/ComponentShowcasePage";
import NotFound from "@/pages/NotFound";
import AuditLogsPage from "@/pages/AuditLogsPage";
import SystemHealthPage from "@/pages/SystemHealthPage";
import SystemInsightsPage from "@/pages/SystemInsightsPage";
import RolesPermissionsPage from "@/pages/RolesPermissionsPage";
import WorkspacePage from "@/pages/WorkspacePage";
import UploadsPage from "@/pages/UploadsPage";

// Feature CRUD pages
import UsersPage from "@/features/users/userPage";
import RolesPage from "@/features/roles/rolePage";
import OrganizationsPage from "@/features/organizations/organizationPage";
import ProjectsPage from "@/features/projects/projectPage";
import AccessRightsPage from "@/features/access-rights/accessRightPage";
import PermissionsPage from "@/features/permissions/permissionPage";

// Showcase subpages
import ShowcaseButtons from "@/pages/showcase/ShowcaseButtons";
import ShowcaseBadges from "@/pages/showcase/ShowcaseBadges";
import ShowcaseForms from "@/pages/showcase/ShowcaseForms";
import ShowcaseCards from "@/pages/showcase/ShowcaseCards";
import ShowcaseFeedback from "@/pages/showcase/ShowcaseFeedback";
import ShowcaseDataDisplay from "@/pages/showcase/ShowcaseDataDisplay";
import ShowcaseOverlays from "@/pages/showcase/ShowcaseOverlays";
import ShowcaseNavigation from "@/pages/showcase/ShowcaseNavigation";
import ShowcaseCharts from "@/pages/showcase/ShowcaseCharts";
import ShowcaseRealtime from "@/pages/showcase/ShowcaseRealtime";

const queryClient = new QueryClient();

function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const { theme, density } = useUIStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("density-compact", density === "compact");
  }, [theme, density]);

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeInitializer>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth pages (no layout) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* App pages (with layout) */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/roles" element={<RolesPage />} />
              <Route path="/organizations" element={<OrganizationsPage />} />
              <Route path="/workspace" element={<WorkspacePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/access-rights" element={<AccessRightsPage />} />
              <Route path="/permissions" element={<PermissionsPage />} />
              <Route path="/roles-permissions" element={<RolesPermissionsPage />} />
              <Route path="/audit-logs" element={<AuditLogsPage />} />
              <Route path="/uploads" element={<UploadsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/design-system" element={<DesignSystemPage />} />
              <Route path="/components" element={<ComponentShowcasePage />} />
              <Route path="/components/buttons" element={<ShowcaseButtons />} />
              <Route path="/components/badges" element={<ShowcaseBadges />} />
              <Route path="/components/forms" element={<ShowcaseForms />} />
              <Route path="/components/cards" element={<ShowcaseCards />} />
              <Route path="/components/feedback" element={<ShowcaseFeedback />} />
              <Route path="/components/data-display" element={<ShowcaseDataDisplay />} />
              <Route path="/components/overlays" element={<ShowcaseOverlays />} />
              <Route path="/components/navigation" element={<ShowcaseNavigation />} />
              <Route path="/components/charts" element={<ShowcaseCharts />} />
              <Route path="/components/realtime" element={<ShowcaseRealtime />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeInitializer>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
