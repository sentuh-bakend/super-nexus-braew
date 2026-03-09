import { Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NexusButton } from "@/components/ui/nexus-button";
import { ExternalLink, Layout, Sparkles, Moon, LogIn, UserPlus } from "lucide-react";

const loginVariants = [
  {
    id: "v1",
    title: "Split Screen",
    description: "Layout dua kolom dengan branding panel animasi di kiri dan form login di kanan. Cocok untuk enterprise apps.",
    tags: ["Split Layout", "Animated Shapes", "Feature List"],
    path: "/auth/login-v1",
    badge: { icon: Layout, label: "Split", className: "bg-primary text-primary-foreground" },
  },
  {
    id: "v2",
    title: "Glassmorphism Card",
    description: "Card transparan dengan efek blur di atas background gradient animasi. Modern dan elegan untuk SaaS products.",
    tags: ["Centered Card", "Glassmorphism", "Gradient BG"],
    path: "/auth/login-v2",
    badge: { icon: Sparkles, label: "Glass", className: "bg-accent text-accent-foreground" },
  },
  {
    id: "v3",
    title: "Dark Immersive",
    description: "Full-screen dark theme dengan grid pattern, neon glow, testimonial, dan stats. Ideal untuk developer tools.",
    tags: ["Dark Theme", "Grid Pattern", "Testimonial"],
    path: "/auth/login-v3",
    badge: { icon: Moon, label: "Dark", className: "bg-foreground text-background" },
  },
];

const registerVariants = [
  {
    id: "rv1",
    title: "Split Screen",
    description: "Register form di kanan dengan branding panel animasi di kiri. Termasuk password strength indicator.",
    tags: ["Split Layout", "Password Strength", "Animated Shapes"],
    path: "/auth/register-v1",
    badge: { icon: Layout, label: "Split", className: "bg-primary text-primary-foreground" },
  },
  {
    id: "rv2",
    title: "Glassmorphism Card",
    description: "Register card transparan dengan glassmorphism effect di atas animated gradient background.",
    tags: ["Centered Card", "Glassmorphism", "Gradient BG"],
    path: "/auth/register-v2",
    badge: { icon: Sparkles, label: "Glass", className: "bg-accent text-accent-foreground" },
  },
  {
    id: "rv3",
    title: "Dark Immersive",
    description: "Full-screen dark register dengan grid pattern, neon glow, stats, dan testimonial.",
    tags: ["Dark Theme", "Grid Pattern", "Neon Glow"],
    path: "/auth/register-v3",
    badge: { icon: Moon, label: "Dark", className: "bg-foreground text-background" },
  },
];

function VariantCard({ variant, index }: { variant: typeof loginVariants[0]; index: number }) {
  const BadgeIcon = variant.badge.icon;
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">Variant {index + 1}</Badge>
          <Badge className={`${variant.badge.className} text-xs gap-1`}>
            <BadgeIcon className="h-3 w-3" /> {variant.badge.label}
          </Badge>
        </div>
        <CardTitle className="text-lg">{variant.title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">{variant.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {variant.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">{tag}</Badge>
          ))}
        </div>
        <Link to={variant.path}>
          <NexusButton variant="outline" className="w-full gap-2">
            <ExternalLink className="h-4 w-4" /> Lihat Preview
          </NexusButton>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function AuthShowcasePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Auth Page Variations"
        description="Koleksi variasi halaman login & register dengan layout dan style yang berbeda"
      />

      {/* Login section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <LogIn className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Login Pages</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loginVariants.map((v, i) => <VariantCard key={v.id} variant={v} index={i} />)}
        </div>
      </div>

      {/* Register section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Register Pages</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {registerVariants.map((v, i) => <VariantCard key={v.id} variant={v} index={i} />)}
        </div>
      </div>
    </div>
  );
}
