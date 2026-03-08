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
import { Users, ShieldCheck, Activity, TrendingUp, Info } from "lucide-react";

export default function ComponentShowcasePage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-10 max-w-5xl">
      <PageHeader title="Component Showcase" description="All NexusOS reusable components in one place." />

      {/* Buttons */}
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
        </div>
        <div className="flex flex-wrap gap-3 items-center mt-4">
          <NexusButton disabled>Disabled</NexusButton>
          <NexusButton loading={true}>Loading</NexusButton>
        </div>
      </Section>

      <Divider />

      {/* Badges */}
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

      {/* Inputs */}
      <Section title="Inputs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <FormGroup label="Email" description="Your work email" required>
            <NexusInput type="email" placeholder="you@company.com" />
          </FormGroup>
          <FormGroup label="Password" required>
            <NexusInput type="password" placeholder="••••••••" />
          </FormGroup>
          <FormGroup label="Disabled Input">
            <NexusInput disabled placeholder="Cannot edit" />
          </FormGroup>
          <FormGroup label="With Error" error="This field is required">
            <NexusInput placeholder="Oops" className="border-danger focus-visible:ring-danger" />
          </FormGroup>
        </div>
      </Section>

      <Divider />

      {/* Textarea */}
      <Section title="Textarea">
        <div className="max-w-lg">
          <FormGroup label="Description" description="Write a brief description">
            <NexusTextarea placeholder="Enter details here..." rows={4} />
          </FormGroup>
        </div>
      </Section>

      <Divider />

      {/* Cards */}
      <Section title="Cards">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NexusCard>
            <NexusCardHeader>
              <NexusCardTitle>Basic Card</NexusCardTitle>
              <NexusCardDescription>A simple card with header, content, and footer.</NexusCardDescription>
            </NexusCardHeader>
            <NexusCardContent>
              <p className="text-body text-muted-foreground">Card body content goes here. Use cards to group related information.</p>
            </NexusCardContent>
            <NexusCardFooter className="justify-end gap-2">
              <NexusButton variant="outline" size="sm">Cancel</NexusButton>
              <NexusButton size="sm">Save</NexusButton>
            </NexusCardFooter>
          </NexusCard>

          <NexusCard>
            <NexusCardHeader>
              <NexusCardTitle>Interactive Card</NexusCardTitle>
              <NexusCardDescription>With toggle and checkbox controls.</NexusCardDescription>
            </NexusCardHeader>
            <NexusCardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-body">Enable notifications</span>
                <Switch />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-body text-muted-foreground">Accept terms</label>
              </div>
            </NexusCardContent>
          </NexusCard>
        </div>
      </Section>

      <Divider />

      {/* Stat Cards */}
      <Section title="Stat Cards">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value="2,847" trend={{ value: 12.5, positive: true }} icon={Users} />
          <StatCard title="Active Roles" value="18" trend={{ value: 2, positive: true }} icon={ShieldCheck} />
          <StatCard title="Activity" value="94.2%" trend={{ value: -1.3, positive: false }} icon={Activity} />
          <StatCard title="Growth" value="+340" trend={{ value: 8.1, positive: true }} icon={TrendingUp} />
        </div>
      </Section>

      <Divider />

      {/* Spinner */}
      <Section title="Spinner">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="sm" />
            <span className="text-caption text-muted-foreground">Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" />
            <span className="text-caption text-muted-foreground">Medium</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" />
            <span className="text-caption text-muted-foreground">Large</span>
          </div>
        </div>
      </Section>

      <Divider />

      {/* Tooltip */}
      <Section title="Tooltip">
        <div className="flex gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <NexusButton variant="outline">Hover me</NexusButton>
            </TooltipTrigger>
            <TooltipContent>This is a tooltip</TooltipContent>
          </Tooltip>
        </div>
      </Section>

      <Divider />

      {/* Divider */}
      <Section title="Divider">
        <div className="space-y-3 max-w-md">
          <p className="text-body text-muted-foreground">Content above</p>
          <Divider />
          <p className="text-body text-muted-foreground">Content below</p>
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
