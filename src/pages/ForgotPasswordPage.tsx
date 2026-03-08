import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { NexusButton } from "@/components/ui/nexus-button";
import { NexusInput } from "@/components/ui/nexus-input";
import { FormGroup } from "@/components/patterns/form-group";
import { Hexagon, ArrowLeft, Mail } from "lucide-react";
import { authApi } from "@/lib/api/auth";
import { toast } from "sonner";

const emailSchema = z.object({
  email: z.string().trim().email("Email tidak valid"),
});

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Email tidak valid");
      return;
    }

    setLoading(true);
    try {
      await authApi.forgotPassword(result.data.email);
    } catch {
      // Always show success to prevent email enumeration
    }
    toast.success("Link reset password telah dikirim ke email kamu");
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <Hexagon className="h-10 w-10 text-primary mx-auto" />
          <h1 className="text-2xl font-bold text-foreground">Forgot Password</h1>
          <p className="text-sm text-muted-foreground">
            {sent ? "Check your email for a reset link." : "Enter your email to receive a reset link."}
          </p>
        </div>

        {!sent ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FormGroup label="Email" required error={error}>
              <NexusInput
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </FormGroup>
            <NexusButton className="w-full" loading={loading}>Send Reset Link</NexusButton>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
                <Mail className="h-8 w-8 text-success" />
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Kami telah mengirim link reset ke <strong className="text-foreground">{email}</strong>.
              Cek inbox atau folder spam.
            </p>
            <NexusButton variant="outline" className="w-full" onClick={() => { setSent(false); setLoading(false); }}>
              Send Again
            </NexusButton>
          </div>
        )}

        <Link to="/login" className="flex items-center justify-center gap-1 text-xs text-primary hover:underline">
          <ArrowLeft className="h-3 w-3" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
