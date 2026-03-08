import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { NexusButton } from "@/components/ui/nexus-button";
import { NexusBadge } from "@/components/ui/nexus-badge";
import { NexusInput } from "@/components/ui/nexus-input";
import { NexusTextarea } from "@/components/ui/nexus-textarea";
import { NexusCard, NexusCardHeader, NexusCardTitle, NexusCardDescription, NexusCardContent, NexusCardFooter } from "@/components/ui/nexus-card";
import { StatCard } from "@/components/patterns/stat-card";
import { FormGroup } from "@/components/patterns/form-group";
import { Spinner } from "@/components/ui/spinner";
import { Divider } from "@/components/ui/divider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, ShieldCheck, Activity, TrendingUp, Info, Folder, File, FileText, Settings, User, Mail, Bell, Code, GitBranch } from "lucide-react";

// Navigation
import { SidebarGroup, SidebarItem, SidebarCollapsible } from "@/components/navigation/sidebar-nav";
import { MegaDropdown } from "@/components/navigation/mega-dropdown";

// Forms
import { FormSection, FieldGroup } from "@/components/forms/form-section";
import { DatePicker } from "@/components/forms/date-picker";
import { TimePicker } from "@/components/forms/time-picker";
import { FileUpload } from "@/components/forms/file-upload";
import { MultiSelect, TagInput } from "@/components/forms/multi-select";
import { StepperForm } from "@/components/forms/stepper-form";

// Feedback
import { InlineAlert, StatusIndicator, ProgressBar, SkeletonLoader, NotificationCenter, type Notification } from "@/components/ui/feedback";

// Data Display
import { DataTableAdvanced, type ColumnDef } from "@/components/data/data-table-advanced";
import { TreeView, KeyValueList, CodeBlock, Timeline, ActivityFeed, type TreeNode, type TimelineItem, type ActivityItem } from "@/components/data/data-display";

// Overlays
import { ConfirmationDialog } from "@/components/ui/overlays";

// Charts
import { NexusLineChart, NexusAreaChart, NexusBarChart, NexusPieChart, NexusDonutChart, NexusHeatmap, Sparkline } from "@/components/charts/charts";

// --- Sample Data ---
const sampleUsers = Array.from({ length: 25 }, (_, i) => ({
  id: `u${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@nexus.dev`,
  role: ["Admin", "Editor", "Viewer"][i % 3],
  status: ["Active", "Inactive"][i % 2],
}));

const userColumns: ColumnDef<typeof sampleUsers[0]>[] = [
  { id: "name", header: "Name", accessorKey: "name", sortable: true },
  { id: "email", header: "Email", accessorKey: "email", sortable: true },
  { id: "role", header: "Role", accessorKey: "role", sortable: true, cell: (row) => <NexusBadge variant="info">{row.role}</NexusBadge> },
  { id: "status", header: "Status", accessorKey: "status", cell: (row) => <NexusBadge variant={row.status === "Active" ? "success" : "neutral"}>{row.status}</NexusBadge> },
];

const treeData: TreeNode[] = [
  { id: "1", label: "src", icon: <Folder className="h-4 w-4 text-primary" />, children: [
    { id: "2", label: "components", icon: <Folder className="h-4 w-4 text-primary" />, children: [
      { id: "3", label: "Button.tsx", icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
      { id: "4", label: "Card.tsx", icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
    ]},
    { id: "5", label: "App.tsx", icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
  ]},
  { id: "6", label: "package.json", icon: <File className="h-4 w-4 text-muted-foreground" /> },
];

const timelineItems: TimelineItem[] = [
  { id: "1", title: "Project created", description: "NexusOS initialized", time: "2 hours ago", variant: "success" },
  { id: "2", title: "Team invited", description: "3 members added", time: "1 hour ago", variant: "info" },
  { id: "3", title: "First deployment", time: "30 min ago", variant: "default" },
  { id: "4", title: "Error detected", description: "Build failed on staging", time: "10 min ago", variant: "danger" },
];

const activityItems: ActivityItem[] = [
  { id: "1", user: { name: "Alice" }, action: "created project", target: "NexusOS", time: "5 min ago" },
  { id: "2", user: { name: "Bob" }, action: "updated role", target: "Admin", time: "12 min ago" },
  { id: "3", user: { name: "Carol" }, action: "deleted user", target: "test@demo.com", time: "1 hour ago" },
];

const chartData = [
  { month: "Jan", users: 120, revenue: 4200, sessions: 800 },
  { month: "Feb", users: 180, revenue: 5100, sessions: 1200 },
  { month: "Mar", users: 250, revenue: 6800, sessions: 1800 },
  { month: "Apr", users: 310, revenue: 8200, sessions: 2400 },
  { month: "May", users: 420, revenue: 9100, sessions: 3100 },
  { month: "Jun", users: 530, revenue: 11200, sessions: 3800 },
];

const pieData = [
  { name: "Admin", value: 12 },
  { name: "Editor", value: 35 },
  { name: "Viewer", value: 53 },
];

const heatmapData = (() => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm"];
  return days.flatMap((y) => hours.map((x) => ({ x, y, value: Math.floor(Math.random() * 50) })));
})();

const notifications: Notification[] = [
  { id: "1", title: "New user registered", description: "alice@nexus.dev signed up", time: "2m", icon: <User className="h-4 w-4 text-primary" /> },
  { id: "2", title: "Deployment complete", description: "v2.1.0 live", time: "15m", read: true, icon: <Code className="h-4 w-4 text-success" /> },
  { id: "3", title: "Security alert", description: "Unusual login detected", time: "1h", icon: <ShieldCheck className="h-4 w-4 text-danger" /> },
];

export default function ComponentShowcasePage() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("09:00");
  const [multiVal, setMultiVal] = useState<string[]>(["react"]);
  const [tags, setTags] = useState(["typescript", "react"]);
  const [step, setStep] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="space-y-12 max-w-6xl">
      <PageHeader title="Component Showcase" description="Complete NexusOS UI library — all components in one place." />

      {/* ═══════ BUTTONS ═══════ */}
      <Section title="Buttons">
        <div className="flex flex-wrap gap-3 items-center">
          <NexusButton variant="primary">Primary</NexusButton>
          <NexusButton variant="secondary">Secondary</NexusButton>
          <NexusButton variant="outline">Outline</NexusButton>
          <NexusButton variant="ghost">Ghost</NexusButton>
          <NexusButton variant="danger">Danger</NexusButton>
          <NexusButton variant="link">Link</NexusButton>
        </div>
        <div className="flex flex-wrap gap-3 items-center mt-4">
          <NexusButton size="sm">Small</NexusButton>
          <NexusButton size="default">Default</NexusButton>
          <NexusButton size="lg">Large</NexusButton>
          <NexusButton size="icon"><Info className="h-4 w-4" /></NexusButton>
          <NexusButton disabled>Disabled</NexusButton>
          <NexusButton loading>Loading</NexusButton>
        </div>
      </Section>

      <Divider />

      {/* ═══════ BADGES ═══════ */}
      <Section title="Badges">
        <div className="flex flex-wrap gap-3">
          <NexusBadge variant="success">Success</NexusBadge>
          <NexusBadge variant="warning">Warning</NexusBadge>
          <NexusBadge variant="danger">Danger</NexusBadge>
          <NexusBadge variant="info">Info</NexusBadge>
          <NexusBadge variant="neutral">Neutral</NexusBadge>
        </div>
      </Section>

      <Divider />

      {/* ═══════ INPUTS & FORMS ═══════ */}
      <Section title="Form Controls">
        <FormSection title="Basic Inputs" description="Standard form elements">
          <FieldGroup layout="horizontal">
            <FormGroup label="Email" required><NexusInput type="email" placeholder="you@company.com" /></FormGroup>
            <FormGroup label="Password" required><NexusInput type="password" placeholder="••••••••" /></FormGroup>
          </FieldGroup>
          <FieldGroup layout="horizontal">
            <FormGroup label="Disabled"><NexusInput disabled placeholder="Cannot edit" /></FormGroup>
            <FormGroup label="With Error" error="This field is required">
              <NexusInput placeholder="Oops" className="border-danger focus-visible:ring-danger" />
            </FormGroup>
          </FieldGroup>
        </FormSection>

        <FormSection title="Textarea" description="Multi-line text input">
          <div className="max-w-lg">
            <FormGroup label="Description"><NexusTextarea placeholder="Enter details…" rows={3} /></FormGroup>
          </div>
        </FormSection>

        <FormSection title="Date & Time Pickers">
          <FieldGroup layout="horizontal">
            <FormGroup label="Date"><DatePicker value={date} onChange={setDate} /></FormGroup>
            <FormGroup label="Time"><TimePicker value={time} onChange={setTime} /></FormGroup>
          </FieldGroup>
        </FormSection>

        <FormSection title="MultiSelect & Tags">
          <FieldGroup layout="horizontal">
            <FormGroup label="Technologies">
              <MultiSelect
                options={[
                  { value: "react", label: "React" },
                  { value: "vue", label: "Vue" },
                  { value: "svelte", label: "Svelte" },
                  { value: "angular", label: "Angular" },
                  { value: "solid", label: "Solid" },
                ]}
                value={multiVal}
                onChange={setMultiVal}
              />
            </FormGroup>
            <FormGroup label="Tags"><TagInput value={tags} onChange={setTags} /></FormGroup>
          </FieldGroup>
        </FormSection>

        <FormSection title="File Upload">
          <FileUpload accept="image/*,.pdf" multiple />
        </FormSection>
      </Section>

      <Divider />

      {/* ═══════ STEPPER ═══════ */}
      <Section title="Stepper Form">
        <StepperForm
          steps={[
            { label: "Account", description: "Basic info" },
            { label: "Profile", description: "Details" },
            { label: "Review", description: "Confirm" },
          ]}
          currentStep={step}
        >
          <NexusCard>
            <NexusCardContent className="py-8 text-center text-muted-foreground">
              Step {step + 1} content goes here
            </NexusCardContent>
            <NexusCardFooter className="justify-end gap-2">
              <NexusButton variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>Back</NexusButton>
              <NexusButton onClick={() => setStep(Math.min(2, step + 1))} disabled={step === 2}>Next</NexusButton>
            </NexusCardFooter>
          </NexusCard>
        </StepperForm>
      </Section>

      <Divider />

      {/* ═══════ CARDS & STATS ═══════ */}
      <Section title="Cards">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NexusCard>
            <NexusCardHeader>
              <NexusCardTitle>Basic Card</NexusCardTitle>
              <NexusCardDescription>With header, content, and footer.</NexusCardDescription>
            </NexusCardHeader>
            <NexusCardContent><p className="text-body text-muted-foreground">Card body content here.</p></NexusCardContent>
            <NexusCardFooter className="justify-end gap-2">
              <NexusButton variant="outline" size="sm">Cancel</NexusButton>
              <NexusButton size="sm">Save</NexusButton>
            </NexusCardFooter>
          </NexusCard>
          <NexusCard>
            <NexusCardHeader>
              <NexusCardTitle>Interactive</NexusCardTitle>
              <NexusCardDescription>With controls.</NexusCardDescription>
            </NexusCardHeader>
            <NexusCardContent className="space-y-4">
              <div className="flex items-center justify-between"><span className="text-body">Notifications</span><Switch /></div>
              <div className="flex items-center gap-2"><Checkbox id="terms2" /><label htmlFor="terms2" className="text-body text-muted-foreground">Accept terms</label></div>
            </NexusCardContent>
          </NexusCard>
        </div>
      </Section>

      <Section title="Stat Cards">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value="2,847" trend={{ value: 12.5, label: "vs last month" }} icon={Users} />
          <StatCard title="Active Roles" value="18" trend={{ value: 2, label: "new" }} icon={ShieldCheck} />
          <StatCard title="Activity" value="94.2%" trend={{ value: -1.3, label: "vs last week" }} icon={Activity} />
          <StatCard title="Growth" value="+340" trend={{ value: 8.1, label: "this quarter" }} icon={TrendingUp} />
        </div>
      </Section>

      <Divider />

      {/* ═══════ FEEDBACK ═══════ */}
      <Section title="Feedback">
        <div className="space-y-4">
          <h3 className="text-h4 text-muted-foreground">Inline Alerts</h3>
          <div className="space-y-3">
            <InlineAlert variant="info" title="Info">This is an informational message.</InlineAlert>
            <InlineAlert variant="success" title="Success">Operation completed successfully.</InlineAlert>
            <InlineAlert variant="warning" title="Warning" dismissible>This can be dismissed.</InlineAlert>
            <InlineAlert variant="danger" title="Error">Something went wrong.</InlineAlert>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-h4 text-muted-foreground">Status Indicators</h3>
          <div className="flex flex-wrap gap-6">
            <StatusIndicator status="online" label="Online" />
            <StatusIndicator status="away" label="Away" />
            <StatusIndicator status="busy" label="Busy" />
            <StatusIndicator status="offline" label="Offline" />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-h4 text-muted-foreground">Progress Bars</h3>
          <div className="space-y-4 max-w-lg">
            <ProgressBar value={75} label="Upload" showValue variant="primary" />
            <ProgressBar value={45} label="Processing" showValue variant="info" size="sm" />
            <ProgressBar value={90} label="Complete" showValue variant="success" size="lg" />
            <ProgressBar value={30} variant="warning" showValue />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-h4 text-muted-foreground">Skeleton Loaders</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><p className="text-caption text-muted-foreground mb-2">Text</p><SkeletonLoader variant="text" /></div>
            <div><p className="text-caption text-muted-foreground mb-2">Card</p><SkeletonLoader variant="card" /></div>
            <div><p className="text-caption text-muted-foreground mb-2">Table</p><SkeletonLoader variant="table" rows={3} /></div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-h4 text-muted-foreground">Notification Center</h3>
          <NotificationCenter notifications={notifications} />
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-h4 text-muted-foreground">Spinner</h3>
          <div className="flex items-center gap-6">
            <Spinner size="sm" /><Spinner size="md" /><Spinner size="lg" />
          </div>
        </div>
      </Section>

      <Divider />

      {/* ═══════ DATA TABLE ADVANCED ═══════ */}
      <Section title="Advanced Data Table">
        <DataTableAdvanced
          columns={userColumns}
          data={sampleUsers}
          pageSize={5}
          selectable
          searchable
          bulkActions={[
            { label: "Delete", onClick: (ids) => console.log("Delete:", ids) },
            { label: "Export", onClick: (ids) => console.log("Export:", ids) },
          ]}
        />
      </Section>

      <Divider />

      {/* ═══════ DATA DISPLAY ═══════ */}
      <Section title="Data Display">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-h4 text-muted-foreground mb-3">Tree View</h3>
            <div className="border border-border rounded-lg p-3">
              <TreeView nodes={treeData} onSelect={(n) => console.log("Selected:", n.label)} />
            </div>
          </div>

          <div>
            <h3 className="text-h4 text-muted-foreground mb-3">Key-Value List</h3>
            <KeyValueList
              striped
              items={[
                { key: "Name", value: "NexusOS" },
                { key: "Version", value: "2.1.0" },
                { key: "Status", value: <NexusBadge variant="success">Active</NexusBadge> },
                { key: "License", value: "MIT" },
                { key: "Build", value: <Sparkline data={[3, 7, 4, 8, 5, 9, 6]} /> },
              ]}
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-h4 text-muted-foreground mb-3">Code Block</h3>
          <CodeBlock
            language="typescript"
            code={`import { NexusButton } from "@/components/ui/nexus-button";

export function MyComponent() {
  return <NexusButton variant="primary">Click me</NexusButton>;
}`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-h4 text-muted-foreground mb-3">Timeline</h3>
            <Timeline items={timelineItems} />
          </div>
          <div>
            <h3 className="text-h4 text-muted-foreground mb-3">Activity Feed</h3>
            <ActivityFeed items={activityItems} />
          </div>
        </div>
      </Section>

      <Divider />

      {/* ═══════ OVERLAYS ═══════ */}
      <Section title="Overlays">
        <div className="flex flex-wrap gap-3">
          <NexusButton variant="danger" onClick={() => setConfirmOpen(true)}>Delete Item</NexusButton>
          <Tooltip><TooltipTrigger asChild><NexusButton variant="outline">Hover Tooltip</NexusButton></TooltipTrigger><TooltipContent>Tooltip content</TooltipContent></Tooltip>
        </div>
        <ConfirmationDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Delete this item?"
          description="This action cannot be undone."
          variant="danger"
          confirmLabel="Delete"
          onConfirm={() => setConfirmOpen(false)}
        />
      </Section>

      <Divider />

      {/* ═══════ NAVIGATION ═══════ */}
      <Section title="Navigation Components">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-h4 text-muted-foreground mb-3">Sidebar Navigation</h3>
            <div className="border border-border rounded-lg p-3 max-w-[240px]">
              <SidebarGroup label="Main">
                <SidebarItem label="Dashboard" href="/" icon={<Activity className="h-5 w-5" />} />
                <SidebarItem label="Users" href="/users" icon={<Users className="h-5 w-5" />} />
              </SidebarGroup>
              <div className="mt-2">
                <SidebarCollapsible label="Settings" icon={<Settings className="h-5 w-5" />} defaultOpen>
                  <SidebarItem label="General" href="/settings" />
                  <SidebarItem label="Security" href="/settings" />
                </SidebarCollapsible>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-h4 text-muted-foreground mb-3">Mega Dropdown</h3>
            <MegaDropdown
              trigger={<NexusButton variant="outline">Products ▾</NexusButton>}
              sections={[
                {
                  title: "Platform",
                  items: [
                    { label: "Analytics", description: "Track metrics", icon: <Activity className="h-4 w-4" /> },
                    { label: "Automation", description: "Workflows", icon: <GitBranch className="h-4 w-4" /> },
                  ],
                },
                {
                  title: "Resources",
                  items: [
                    { label: "Documentation", description: "Guides & API", icon: <FileText className="h-4 w-4" /> },
                    { label: "Support", description: "Get help", icon: <Mail className="h-4 w-4" /> },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </Section>

      <Divider />

      {/* ═══════ CHARTS ═══════ */}
      <Section title="Charts">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NexusLineChart
            title="User Growth"
            description="Monthly active users"
            data={chartData}
            xKey="month"
            lines={[{ dataKey: "users", name: "Users" }]}
          />
          <NexusAreaChart
            title="Revenue"
            description="Monthly revenue trend"
            data={chartData}
            xKey="month"
            areas={[{ dataKey: "revenue", name: "Revenue" }]}
          />
          <NexusBarChart
            title="Sessions vs Users"
            description="Monthly comparison"
            data={chartData}
            xKey="month"
            bars={[
              { dataKey: "sessions", name: "Sessions" },
              { dataKey: "users", name: "Users" },
            ]}
          />
          <NexusPieChart title="Role Distribution" data={pieData} />
          <NexusDonutChart title="Role Distribution (Donut)" data={pieData} />
          <NexusHeatmap
            title="Activity Heatmap"
            description="Commits by day and hour"
            data={heatmapData}
            xLabels={["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm"]}
            yLabels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
          />
        </div>
        <div className="mt-6">
          <h3 className="text-h4 text-muted-foreground mb-3">Sparklines</h3>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="text-body text-foreground">Revenue</span>
              <Sparkline data={[10, 25, 18, 30, 22, 40, 35]} color="hsl(160, 84%, 39%)" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-body text-foreground">Errors</span>
              <Sparkline data={[5, 12, 8, 15, 20, 10, 3]} color="hsl(0, 72%, 51%)" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-body text-foreground">Users</span>
              <Sparkline data={[20, 30, 45, 55, 60, 72, 80]} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-h2 text-foreground">{title}</h2>
      {children}
    </section>
  );
}
