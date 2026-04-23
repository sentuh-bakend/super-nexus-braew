import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "NexusOS replaced three separate tools in our stack. The team was up and running in a single afternoon.",
    name: "Sarah Chen",
    role: "VP Engineering",
    company: "Stripe",
    initials: "SC",
  },
  {
    quote:
      "The design system is gorgeous and the developer experience is the best I've used in years. Truly delightful.",
    name: "Marcus Rivera",
    role: "Staff Engineer",
    company: "Vercel",
    initials: "MR",
  },
  {
    quote:
      "Audit logs, RBAC, real-time — all just worked. We shipped to production in our first week.",
    name: "Aisha Patel",
    role: "CTO",
    company: "Linear",
    initials: "AP",
  },
];

export function LandingTestimonials() {
  return (
    <section id="testimonials" className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Loved by engineering teams
          </h2>
          <p className="mt-4 text-muted-foreground">
            Don't just take our word for it — hear from the teams shipping with NexusOS.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <Quote className="mb-4 h-6 w-6 text-primary/40" />
              <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-card-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}