import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function fieldInputClass(error?: string) {
  return error ? "border-destructive focus-visible:ring-destructive/20" : "";
}

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string | undefined;
  children: ReactNode;
  className?: string;
  hint?: string | undefined;
}

export function FormField({ label, htmlFor, error, children, className, hint }: FormFieldProps) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <Label htmlFor={htmlFor} className={error ? "text-destructive" : undefined}>
        {label}
      </Label>
      {children}
      {error ? <p className="text-[0.8125rem] font-medium text-destructive">{error}</p> : null}
      {!error && hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
