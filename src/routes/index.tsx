import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GuestRoute } from "@/components/guard";
import { fieldInputClass, FormField } from "@/components/form-field";
import { PasswordInput } from "@/components/password";
import { useAuth, homeFor } from "@/lib/auth";
import { getApiErrorMessage } from "@/lib/api";
import { sanitizeReturnTo, SESSION_EXPIRED_MESSAGE } from "@/lib/session-expiry";
import { FIELD_LIMITS, loginSchema } from "@/lib/form-validation";
import { useZodForm } from "@/lib/use-zod-form";

export const Route = createFileRoute("/")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
    expired: search.expired === "1" || search.expired === "true",
  }),
  head: () => ({
    meta: [
      { title: "Sign in — Helpdesk Support Portal" },
      { name: "description", content: "Sign in to the Helpdesk support portal to raise and manage support tickets." },
      { property: "og:title", content: "Sign in — Helpdesk Support Portal" },
      { property: "og:description", content: "Secure sign-in for clients, support agents and administrators." },
    ],
  }),
  component: () => (
    <GuestRoute>
      <LoginPage />
    </GuestRoute>
  ),
});

const demoAccounts = [
  { label: "Admin", email: "admin@helpdesk.io" },
  { label: "Staff", email: "elena@helpdesk.io" },
  { label: "Client", email: "client@acme.com" },
];

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { redirect, expired } = Route.useSearch();
  const { errors, handleBlur, handleChange, validateAll } = useZodForm(loginSchema);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  function fieldHandlers(field: "email" | "password", setter: (value: string) => void) {
    return {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value;
        setter(next);
        handleChange(field, next);
        setApiError("");
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        handleBlur(field, e.target.value);
      },
    };
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError("");
    const validation = validateAll({ email, password });
    if (!validation.success) return;

    const { email: validEmail, password: validPassword } = validation.data;
    setLoading(true);
    try {
      const user = await login(validEmail, validPassword, remember);
      const destination = sanitizeReturnTo(redirect) ?? homeFor(user.role);
      navigate({ to: destination, replace: true });
    } catch (err) {
      setApiError(getApiErrorMessage(err, "Unable to sign in."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0f172a] p-12 lg:flex">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgb(79_70_229/0.35),transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_100%,rgb(14_165_233/0.15),transparent_50%)]" />
        <div className="relative">
          <BrandLogo className="h-10 max-w-[220px]" />
        </div>
        <div className="relative max-w-md">
          <h2 className="text-[2rem] leading-tight font-bold tracking-tight text-white">
            One support desk for every client conversation.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-300">
            Track tickets from intake to resolution with SLA timers, assignment workflows, internal notes and
            complete audit history — with strict separation between client and support access.
          </p>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              ["98.6%", "SLA adherence"],
              ["4m 12s", "First response"],
              ["24/7", "Coverage"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="text-2xl font-bold tracking-tight text-white">{v}</dt>
                <dd className="mt-1 text-xs font-medium text-slate-400">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="relative text-xs text-slate-500">© 2026 Miraki Technologies. All rights reserved.</p>
      </div>

      <div className="canvas flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 inline-flex rounded-lg bg-[#0f172a] px-4 py-3 lg:hidden">
            <BrandLogo className="h-8 max-w-[200px]" />
          </div>
          <h1 className="text-[1.75rem] font-bold tracking-tight">Sign in</h1>
          <p className="mt-2 text-[15px] text-muted-foreground">Access your support workspace.</p>

          <form onSubmit={onSubmit} className="panel mt-8 flex flex-col gap-5 p-6" noValidate>
            {expired && (
              <Alert variant="destructive">
                <AlertDescription>{SESSION_EXPIRED_MESSAGE}</AlertDescription>
              </Alert>
            )}
            {apiError && (
              <Alert variant="destructive">
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}
            <FormField label="Email address" htmlFor="email" error={errors.email} required>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                maxLength={FIELD_LIMITS.EMAIL_MAX}
                value={email}
                {...fieldHandlers("email", setEmail)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                placeholder="you@company.com"
                className={fieldInputClass(errors.email)}
              />
            </FormField>
            <FormField label="Password" htmlFor="password" error={errors.password} required>
              <PasswordInput
                id="password"
                autoComplete="current-password"
                value={password}
                {...fieldHandlers("password", setPassword)}
                placeholder="••••••••"
                className={fieldInputClass(errors.password)}
              />
            </FormField>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={remember} onCheckedChange={(v) => setRemember(v === true)} />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" disabled={loading} className="mt-1 h-11 w-full">
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <div className="panel mt-6 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <ShieldCheck className="size-3.5 text-primary" /> Demo accounts — password Password@123
            </p>
            <div className="mt-3 flex flex-col gap-1">
              {demoAccounts.map((a) => (
                <button
                  key={a.email}
                  type="button"
                  onClick={() => {
                    setEmail(a.email);
                    setPassword("Password@123");
                    handleBlur("email", a.email);
                    handleBlur("password", "Password@123");
                  }}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-accent"
                >
                  <span className="font-medium">{a.label}</span>
                  <span className="text-muted-foreground">{a.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
