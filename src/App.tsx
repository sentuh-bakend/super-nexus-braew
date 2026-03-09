import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useUIStore } from "@/stores";
import { useEffect } from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary";

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
import ResourcesPage from "@/features/resources/resourcePage";
import EndpointsPage from "@/features/endpoints/endpointPage";

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

// Auth variations
import LoginV1 from "@/pages/auth/LoginV1";
import LoginV2 from "@/pages/auth/LoginV2";
import LoginV3 from "@/pages/auth/LoginV3";
import AuthShowcasePage from "@/pages/auth/AuthShowcasePage";

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
        <ErrorBoundary>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth pages (no layout) */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/auth/login-v1" element={<LoginV1 />} />
              <Route path="/auth/login-v2" element={<LoginV2 />} />
              <Route path="/auth/login-v3" element={<LoginV3 />} />

              {/* App pages (with layout) */}
              <Route element={<AuthGuard><AppLayout /></AuthGuard>}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/roles" element={<RolesPage />} />
                <Route path="/organizations" element={<OrganizationsPage />} />
                <Route path="/workspace" element={<WorkspacePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/access-rights" element={<AccessRightsPage />} />
                <Route path="/permissions" element={<PermissionsPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/endpoints" element={<EndpointsPage />} />
                <Route path="/roles-permissions" element={<RolesPermissionsPage />} />
                <Route path="/audit-logs" element={<AuditLogsPage />} />
                <Route path="/system-health" element={<SystemHealthPage />} />
                <Route path="/system-insights" element={<SystemInsightsPage />} />
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
        </ErrorBoundary>
      </ThemeInitializer>
    </TooltipProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
