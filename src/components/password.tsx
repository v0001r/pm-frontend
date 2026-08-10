import { useMemo, useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { fieldInputClass, FieldLabel } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const passwordRules = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "One number", test: (v: string) => /\d/.test(v) },
  { label: "One special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

export const passwordValid = (v: string) => passwordRules.every((r) => r.test(v));

export function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete = "new-password",
  error,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  error?: string;
  required?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="grid gap-1.5">
      <FieldLabel htmlFor={id} className={error ? "text-destructive" : undefined} required={required}>
        {label}
      </FieldLabel>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn("pr-10", fieldInputClass(error))}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {error ? <p className="text-[0.8125rem] font-medium text-destructive">{error}</p> : null}
    </div>
  );
}

export function PasswordStrength({ value }: { value: string }) {
  const passed = useMemo(() => passwordRules.filter((r) => r.test(value)).length, [value]);
  const label = passed <= 2 ? "Weak" : passed <= 4 ? "Fair" : "Strong";
  const tone = passed <= 2 ? "bg-destructive" : passed <= 4 ? "bg-warning" : "bg-success";

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div className={cn("h-full transition-all", tone)} style={{ width: `${(passed / 5) * 100}%` }} />
        </div>
        <span className="w-12 text-xs text-muted-foreground">{value ? label : ""}</span>
      </div>
      <ul className="grid gap-1 sm:grid-cols-2">
        {passwordRules.map((r) => {
          const ok = r.test(value);
          return (
            <li key={r.label} className={cn("flex items-center gap-1.5 text-xs", ok ? "text-success" : "text-muted-foreground")}>
              {ok ? <Check className="size-3.5" /> : <X className="size-3.5" />}
              {r.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
