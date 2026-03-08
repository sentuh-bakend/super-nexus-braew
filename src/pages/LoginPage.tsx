import { useState } from "react";
import { Link } from "react-router-dom";
import { NexusButton } from "@/components/ui/nexus-button";
import { NexusInput } from "@/components/ui/nexus-input";
import { FormGroup } from "@/components/patterns/form-group";
import { Hexagon } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <Hexagon className="h-10 w-10 text-primary mx-auto" />
          <h1 className="text-h1 font-bold">Welcome back</h1>
          <p className="text-body text-muted-foreground">Sign in to NexusOS Admin</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setLoading(true); }}>
          <FormGroup label="Username" required>
            <NexusInput placeholder="Enter your username" />
          </FormGroup>
          <FormGroup label="Password" required>
            <NexusInput type="password" placeholder="Enter your password" />
          </FormGroup>
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-small text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <NexusButton className="w-full" loading={loading}>Sign In</NexusButton>
        </form>

        <p className="text-center text-small text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
