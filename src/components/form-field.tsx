import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function getScrollParent(element: HTMLElement): HTMLElement | null {
  let parent = element.parentElement;
  while (parent && parent !== document.body) {
    const overflowY = window.getComputedStyle(parent).overflowY;
    if (
      (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") &&
      parent.scrollHeight > parent.clientHeight
    ) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}

/** Scrolls to and focuses the first field in `fieldOrder` that has a validation error. */
export function focusFirstInvalidField(errors: Record<string, string>, fieldOrder: string[]) {
  const field = fieldOrder.find((key) => errors[key]);
  if (!field) return;

  const el = document.getElementById(field);
  if (!(el instanceof HTMLElement)) return;

  const scrollParent = getScrollParent(el);
  if (scrollParent) {
    const parentRect = scrollParent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const top = scrollParent.scrollTop + (elRect.top - parentRect.top) - 16;
    scrollParent.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }

  requestAnimationFrame(() => {
    el.focus({ preventScroll: true });
  });
}

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
      <FieldLabel htmlFor={htmlFor} required={required} className="text-foreground">
        {label}
      </FieldLabel>
      {children}
      {error ? (
        <p
          id={htmlFor ? `${htmlFor}-error` : undefined}
          role="alert"
          className="text-[0.8125rem] font-medium text-destructive"
        >
          {error}
        </p>
      ) : null}
      {!error && hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
