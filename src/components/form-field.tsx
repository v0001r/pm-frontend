import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function fieldInputClass(error?: string) {
  return error ? "border-destructive focus-visible:ring-destructive/20" : "";
}

export function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

interface FieldLabelProps extends ComponentPropsWithoutRef<typeof Label> {
  required?: boolean;
}

export function FieldLabel({ required, children, className, ...props }: FieldLabelProps) {
  return (
    <Label className={className} {...props}>
      {children}
      {required ? <RequiredMark /> : null}
    </Label>
  );
}

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string | undefined;
  children: ReactNode;
  className?: string;
  hint?: string | undefined;
  required?: boolean;
}

export function FormField({ label, htmlFor, error, children, className, hint, required = false }: FormFieldProps) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <FieldLabel htmlFor={htmlFor} className={error ? "text-destructive" : undefined} required={required}>
        {label}
      </FieldLabel>
      {children}
      {error ? <p className="text-[0.8125rem] font-medium text-destructive">{error}</p> : null}
      {!error && hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
