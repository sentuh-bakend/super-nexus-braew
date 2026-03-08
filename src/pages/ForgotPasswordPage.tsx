import { useState } from "react";
import { Link } from "react-router-dom";
import { NexusButton } from "@/components/ui/nexus-button";
import { NexusInput } from "@/components/ui/nexus-input";
import { FormGroup } from "@/components/patterns/form-group";
import { Hexagon, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <Hexagon className="h-10 w-10 text-primary mx-auto" />
          <h1 className="text-h1 font-bold">Forgot Password</h1>
          <p className="text-body text-muted-foreground">
            {sent ? "Check your email for a reset link." : "Enter your email to receive a reset link."}
          </p>
        </div>

        {!sent ? (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => setSent(true), 1000); }}>
            <FormGroup label="Email" required>
              <NexusInput type="email" placeholder="your@email.com" />
            </FormGroup>
            <NexusButton className="w-full" loading={loading}>Send Reset Link</NexusButton>
          </form>
        ) : (
          <NexusButton variant="outline" className="w-full" onClick={() => { setSent(false); setLoading(false); }}>
            Send Again
          </NexusButton>
        )}

        <Link to="/login" className="flex items-center justify-center gap-1 text-small text-primary hover:underline">
          <ArrowLeft className="h-3 w-3" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
