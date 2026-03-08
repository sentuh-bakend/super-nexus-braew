import { Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import {
  MousePointerClick, Tag, FormInput, CreditCard, MessageSquare,
  Table2, Layers, Navigation, BarChart3, Wifi,
} from "lucide-react";

const categories = [
  { label: "Buttons", description: "All variants, sizes, and states", path: "/components/buttons", icon: MousePointerClick },
  { label: "Badges", description: "Semantic status indicators", path: "/components/badges", icon: Tag },
  { label: "Form Controls", description: "Inputs, pickers, selects, tags, stepper", path: "/components/forms", icon: FormInput },
  { label: "Cards", description: "NexusCard, StatCard variants", path: "/components/cards", icon: CreditCard },
  { label: "Feedback", description: "Alerts, progress, skeleton, notifications", path: "/components/feedback", icon: MessageSquare },
  { label: "Data Display", description: "DataTable, TreeView, Timeline, CodeBlock", path: "/components/data-display", icon: Table2 },
  { label: "Overlays", description: "Dialogs, tooltips, and popovers", path: "/components/overlays", icon: Layers },
  { label: "Navigation", description: "Sidebar, mega dropdown, breadcrumb", path: "/components/navigation", icon: Navigation },
  { label: "Charts", description: "Line, Area, Bar, Pie, Heatmap, Sparkline", path: "/components/charts", icon: BarChart3 },
  { label: "Realtime", description: "SSE, WebSocket, presence, live feed", path: "/components/realtime", icon: Wifi },
];

export default function ComponentsIndexPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <PageHeader title="Component Library" description="NexusOS UI components — pilih kategori untuk melihat showcase." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.path}
            to={cat.path}
            className="group flex items-start gap-4 p-card-pad rounded-lg border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-normal"
          >
            <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/20 transition-colors">
              <cat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-h4 font-semibold text-foreground group-hover:text-primary transition-colors">{cat.label}</h3>
              <p className="text-small text-muted-foreground mt-0.5">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
