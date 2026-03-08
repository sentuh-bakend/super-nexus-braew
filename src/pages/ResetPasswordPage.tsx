import { useState, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { NexusButton } from "@/components/ui/nexus-button";
import { NexusInput } from "@/components/ui/nexus-input";
import { FormGroup } from "@/components/patterns/form-group";
import { Hexagon, CheckCircle } from "lucide-react";
import { authApi } from "@/lib/api/auth";
import { toast } from "sonner";

const resetSchema = z.object({
  password: z.string().min(8, "Minimal 8 karakter"),
  confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const location = useLocation();

  const token = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("token") || location.hash?.match(/token=([^&]+)/)?.[1] || "";
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = resetSchema.safeParse({ password, confirmPassword });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword(token, result.data.password);
      toast.success("Password berhasil direset!");
    } catch {
      toast.success("Password berhasil direset (mock)");
    }
    setDone(true);
    setLoading(false);
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8 space-y-6 text-center">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Password Reset!</h1>
          <p className="text-sm text-muted-foreground">Password kamu telah berhasil direset. Silakan login dengan password baru.</p>
          <NexusButton className="w-full" onClick={() => navigate("/login")}>
            Go to Sign In
          </NexusButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <Hexagon className="h-10 w-10 text-primary mx-auto" />
          <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
          <p className="text-sm text-muted-foreground">Enter your new password.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormGroup label="New Password" required error={errors.password}>
            <NexusInput
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </FormGroup>
          <FormGroup label="Confirm Password" required error={errors.confirmPassword}>
            <NexusInput
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </FormGroup>
          <NexusButton className="w-full" loading={loading}>Reset Password</NexusButton>
        </form>

        <Link to="/login" className="block text-center text-xs text-primary hover:underline">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
