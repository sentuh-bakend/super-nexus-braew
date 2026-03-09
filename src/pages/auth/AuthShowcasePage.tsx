import { Link, useLocation } from "react-router-dom";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NexusButton } from "@/components/ui/nexus-button";
import { ExternalLink, Layout, Sparkles, Moon } from "lucide-react";

const variants = [
  {
    id: "v1",
    title: "Split Screen",
    description: "Layout dua kolom dengan branding panel animasi di kiri dan form login di kanan. Cocok untuk enterprise apps.",
    tags: ["Split Layout", "Animated Shapes", "Feature List"],
    path: "/auth/login-v1",
  },
  {
    id: "v2",
    title: "Glassmorphism Card",
    description: "Card transparan dengan efek blur di atas background gradient animasi. Modern dan elegan untuk SaaS products.",
    tags: ["Centered Card", "Glassmorphism", "Gradient BG"],
    path: "/auth/login-v2",
  },
  {
    id: "v3",
    title: "Dark Immersive",
    description: "Full-screen dark theme dengan grid pattern, neon glow, testimonial, dan stats. Ideal untuk developer tools.",
    tags: ["Dark Theme", "Grid Pattern", "Testimonial"],
    path: "/auth/login-v3",
  },
];

export default function AuthShowcasePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Auth Page Variations"
        description="Koleksi variasi halaman login dengan layout dan style yang berbeda"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {variants.map((v, i) => (
          <Card key={v.id} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  Variant {i + 1}
                </Badge>
                {v.id === "v3" && (
                  <Badge className="bg-foreground text-background text-xs gap-1">
                    <Moon className="h-3 w-3" /> Dark
                  </Badge>
                )}
                {v.id === "v2" && (
                  <Badge className="bg-accent text-accent-foreground text-xs gap-1">
                    <Sparkles className="h-3 w-3" /> Glass
                  </Badge>
                )}
                {v.id === "v1" && (
                  <Badge className="bg-primary text-primary-foreground text-xs gap-1">
                    <Layout className="h-3 w-3" /> Split
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg">{v.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">{v.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {v.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Link to={v.path}>
                <NexusButton variant="outline" className="w-full gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Lihat Preview
                </NexusButton>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
