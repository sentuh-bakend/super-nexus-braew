import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -top-12 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>New: Lovable Cloud integration is live</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            The operating system{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              for modern teams
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-base text-muted-foreground md:text-lg">
            NexusOS unifies access management, observability, and workflows in one elegant
            dashboard. Ship faster with batteries-included primitives.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-md transition-all hover:bg-primary-hover hover:shadow-lg"
            >
              Start free trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#features"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              See features
            </a>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-col items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-warning text-warning" />
              ))}
              <span className="ml-2 text-sm font-medium text-foreground">4.9</span>
              <span className="text-sm text-muted-foreground">from 2,000+ teams</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Trusted by engineering teams at fast-growing startups
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}