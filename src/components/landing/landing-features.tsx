import { Zap, Lock, Globe, Code2, GitBranch, Gauge } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning fast",
    description: "Optimized bundle, smart caching, and instant navigation.",
  },
  {
    icon: Lock,
    title: "Secure by default",
    description: "Row-level security, RBAC, and audit logs out of the box.",
  },
  {
    icon: Globe,
    title: "Multi-tenant ready",
    description: "Organizations, workspaces, and projects with isolation.",
  },
  {
    icon: Code2,
    title: "Developer first",
    description: "Type-safe APIs, Zod validation, and clean architecture.",
  },
  {
    icon: GitBranch,
    title: "Real-time sync",
    description: "WebSockets and SSE for live presence and notifications.",
  },
  {
    icon: Gauge,
    title: "Observability",
    description: "Built-in metrics, health checks, and system insights.",
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="border-b border-border bg-surface/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Built for teams that ship
          </h2>
          <p className="mt-4 text-muted-foreground">
            Production-grade primitives so you can focus on your product.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-1.5 font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}