import { useNavigate } from "@tanstack/react-router";
import { FormSheet } from "@/components/form-sheet";
import { CreateTicketForm } from "@/components/create-ticket-form";

interface TicketFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialProjectId?: string;
  onSaved?: (ticketId: string) => void;
}

export function TicketFormSheet({ open, onOpenChange, initialProjectId, onSaved }: TicketFormSheetProps) {
  const navigate = useNavigate();

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Create ticket"
      description="Log a support request for any project you can access."
    >
      <CreateTicketForm
        embedded
        initialProjectId={initialProjectId}
        onCancel={() => onOpenChange(false)}
        onSuccess={(ticketId) => {
          onOpenChange(false);
          onSaved?.(ticketId);
          navigate({ to: "/admin/tickets/$ticketId", params: { ticketId } });
        }}
      />
    </FormSheet>
  );
}
