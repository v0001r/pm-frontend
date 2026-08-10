import { Button } from "@/components/ui/button";

interface FormActionsProps {
  submitLabel: string;
  submitting?: boolean;
  submittingLabel?: string;
  onCancel?: () => void;
  cancelLabel?: string;
  disabled?: boolean;
}

export function FormActions({
  submitLabel,
  submitting = false,
  submittingLabel = "Saving...",
  onCancel,
  cancelLabel = "Cancel",
  disabled = false,
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      {onCancel ? (
        <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={submitting || disabled}>
          {cancelLabel}
        </Button>
      ) : null}
      <Button type="submit" size="sm" disabled={submitting || disabled}>
        {submitting ? submittingLabel : submitLabel}
      </Button>
    </div>
  );
}
