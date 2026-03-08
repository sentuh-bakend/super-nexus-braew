import { useState } from "react";
import { Link } from "react-router-dom";
import { NexusButton } from "@/components/ui/nexus-button";
import { NexusInput } from "@/components/ui/nexus-input";
import { FormGroup } from "@/components/patterns/form-group";
import { Hexagon } from "lucide-react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <Hexagon className="h-10 w-10 text-primary mx-auto" />
          <h1 className="text-h1 font-bold">Create Account</h1>
          <p className="text-body text-muted-foreground">Get started with NexusOS Admin</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setLoading(true); }}>
          <FormGroup label="Full Name" required>
            <NexusInput placeholder="John Doe" />
          </FormGroup>
          <FormGroup label="Email" required>
            <NexusInput type="email" placeholder="john@example.com" />
          </FormGroup>
          <FormGroup label="Username" required>
            <NexusInput placeholder="johndoe" />
          </FormGroup>
          <FormGroup label="Password" required>
            <NexusInput type="password" placeholder="Minimum 8 characters" />
          </FormGroup>
          <NexusButton className="w-full" loading={loading}>Create Account</NexusButton>
        </form>

        <p className="text-center text-small text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
