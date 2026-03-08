import { useState } from "react";
import { Link } from "react-router-dom";
import { NexusButton } from "@/components/ui/nexus-button";
import { NexusInput } from "@/components/ui/nexus-input";
import { FormGroup } from "@/components/patterns/form-group";
import { Hexagon } from "lucide-react";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <Hexagon className="h-10 w-10 text-primary mx-auto" />
          <h1 className="text-h1 font-bold">Reset Password</h1>
          <p className="text-body text-muted-foreground">Enter your new password.</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setLoading(true); }}>
          <FormGroup label="New Password" required>
            <NexusInput type="password" placeholder="Minimum 8 characters" />
          </FormGroup>
          <FormGroup label="Confirm Password" required>
            <NexusInput type="password" placeholder="Confirm your password" />
          </FormGroup>
          <NexusButton className="w-full" loading={loading}>Reset Password</NexusButton>
        </form>

        <Link to="/login" className="block text-center text-small text-primary hover:underline">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
