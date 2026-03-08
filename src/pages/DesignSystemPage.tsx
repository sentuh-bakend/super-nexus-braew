import { PageHeader } from "@/components/layout/page-header";

const ColorSwatch = ({ name, variable, className }: { name: string; variable: string; className: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-16 h-16 rounded-lg border border-border shadow-sm ${className}`} />
    <span className="text-caption font-medium text-foreground">{name}</span>
    <span className="text-caption text-muted-foreground">{variable}</span>
  </div>
);

const TokenRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-surface-hover transition-colors">
    <span className="text-body font-medium text-foreground">{label}</span>
    <code className="text-caption font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">{value}</code>
  </div>
);

export default function DesignSystemPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <PageHeader title="Design System" description="NexusOS design tokens — colors, spacing, typography, shadows, and radii." />

      {/* Colors */}
      <section className="space-y-4">
        <h2 className="text-h2 text-foreground">Colors</h2>

        <div className="space-y-3">
          <h3 className="text-h4 text-muted-foreground">Core</h3>
          <div className="flex flex-wrap gap-4">
            <ColorSwatch name="Background" variable="--background" className="bg-background" />
            <ColorSwatch name="Foreground" variable="--foreground" className="bg-foreground" />
            <ColorSwatch name="Surface" variable="--surface" className="bg-surface" />
            <ColorSwatch name="Muted" variable="--muted" className="bg-muted" />
            <ColorSwatch name="Border" variable="--border" className="bg-border" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-h4 text-muted-foreground">Brand</h3>
          <div className="flex flex-wrap gap-4">
            <ColorSwatch name="Primary" variable="--primary" className="bg-primary" />
            <ColorSwatch name="Secondary" variable="--secondary" className="bg-secondary" />
            <ColorSwatch name="Accent" variable="--accent" className="bg-accent" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-h4 text-muted-foreground">Semantic</h3>
          <div className="flex flex-wrap gap-4">
            <ColorSwatch name="Info" variable="--info" className="bg-info" />
            <ColorSwatch name="Success" variable="--success" className="bg-success" />
            <ColorSwatch name="Warning" variable="--warning" className="bg-warning" />
            <ColorSwatch name="Danger" variable="--danger" className="bg-danger" />
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-h2 text-foreground">Typography</h2>
        <div className="bg-card border border-border rounded-lg p-card-pad space-y-4">
          <p className="text-display">Display — 36px bold</p>
          <p className="text-h1">Heading 1 — 24px bold</p>
          <p className="text-h2">Heading 2 — 20px semibold</p>
          <p className="text-h3">Heading 3 — 18px semibold</p>
          <p className="text-h4">Heading 4 — 16px semibold</p>
          <p className="text-body-lg">Body Large — 16px</p>
          <p className="text-body">Body — 14px</p>
          <p className="text-body-compact">Body Compact — 13px</p>
          <p className="text-small">Small — 13px</p>
          <p className="text-caption text-muted-foreground">Caption — 12px</p>
        </div>
      </section>

      {/* Spacing */}
      <section className="space-y-4">
        <h2 className="text-h2 text-foreground">Spacing Tokens</h2>
        <div className="bg-card border border-border rounded-lg divide-y divide-border">
          <TokenRow label="Layout Padding" value="var(--layout-padding) — 32px" />
          <TokenRow label="Card Padding" value="var(--card-padding) — 24px" />
          <TokenRow label="Component Gap" value="var(--component-gap) — 16px" />
          <TokenRow label="Button Padding X" value="var(--button-padding-x) — 20px" />
          <TokenRow label="Input Padding X" value="var(--input-padding-x) — 16px" />
          <TokenRow label="Table Cell Padding" value="var(--table-cell-padding) — 16px" />
        </div>
      </section>

      {/* Sizing */}
      <section className="space-y-4">
        <h2 className="text-h2 text-foreground">Sizing Tokens</h2>
        <div className="bg-card border border-border rounded-lg divide-y divide-border">
          <TokenRow label="Button Height" value="var(--button-height) — 44px" />
          <TokenRow label="Input Height" value="var(--input-height) — 44px" />
          <TokenRow label="Table Row Height" value="var(--table-row-height) — 64px" />
          <TokenRow label="Navbar Height" value="var(--navbar-height) — 80px" />
          <TokenRow label="Sidebar Width" value="var(--sidebar-width) — 280px" />
          <TokenRow label="Icon Size" value="var(--icon-size) — 20px" />
        </div>
      </section>

      {/* Radius */}
      <section className="space-y-4">
        <h2 className="text-h2 text-foreground">Border Radius</h2>
        <div className="flex flex-wrap gap-6 items-end">
          {[
            { label: "sm", cls: "rounded-sm" },
            { label: "md", cls: "rounded-md" },
            { label: "lg", cls: "rounded-lg" },
            { label: "xl", cls: "rounded-xl" },
            { label: "full", cls: "rounded-full" },
          ].map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-2">
              <div className={`w-16 h-16 bg-primary ${r.cls}`} />
              <span className="text-caption text-muted-foreground">{r.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section className="space-y-4">
        <h2 className="text-h2 text-foreground">Shadows</h2>
        <div className="flex flex-wrap gap-6 items-end">
          {["xs", "sm", "md", "lg", "xl"].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-20 h-20 bg-card border border-border rounded-lg shadow-${s}`} />
              <span className="text-caption text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
