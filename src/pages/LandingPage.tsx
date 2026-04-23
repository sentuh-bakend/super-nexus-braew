import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingProducts } from "@/components/landing/landing-products";
import { LandingBanner } from "@/components/landing/landing-banner";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingTestimonials } from "@/components/landing/landing-testimonials";
import { LandingNewsletter } from "@/components/landing/landing-newsletter";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingProducts />
        <LandingBanner />
        <LandingFeatures />
        <LandingTestimonials />
        <LandingNewsletter />
      </main>
      <LandingFooter />
    </div>
  );
}