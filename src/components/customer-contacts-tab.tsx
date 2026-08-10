import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Mail, MoreHorizontal, Pencil, Plus, Star, UserCheck, UserX, Users } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { EmptyState, SectionCard, StatusBadge, TableSkeleton } from "@/components/primitives";
import {
  DataTableActions,
  DataTableIconButton,
  EntityCell,
  LabelPill,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getApiErrorMessage } from "@/lib/api";
import {
  createContact,
  inviteContact,
  setPrimaryContact,
  updateContact,
  updateContactStatus,
} from "@/lib/contacts";
import { fetchCustomerContacts } from "@/lib/customers";
import type { CustomerContact, InvitationStatus } from "@/lib/types";

interface CustomerContactsTabProps {
  customerId: string;
  canManage: boolean;
}

function invitationLabel(status?: InvitationStatus) {
  if (!status || status === "Not Sent") {
    return "Send invite";
  }
  if (status === "Accepted") {
    return "Invitation accepted";
  }
  return "Resend invite";
}

export function CustomerContactsTab({ customerId, canManage }: CustomerContactsTabProps) {
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<CustomerContact | null>(null);

  const contactsQuery = useQuery({
    queryKey: ["customer-contacts", customerId],
    queryFn: () => fetchCustomerContacts(customerId),
  });

  const invalidateContacts = () => {
    queryClient.invalidateQueries({ queryKey: ["customer-contacts", customerId] });
    queryClient.invalidateQueries({ queryKey: ["customer-overview", customerId] });
  };

  const createMutation = useMutation({
    mutationFn: (payload: Parameters<typeof createContact>[1]) => createContact(customerId, payload),
    onSuccess: () => {
      invalidateContacts();
      setCreateOpen(false);
      toast.success("Contact added.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to add contact")),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      contactId,
      payload,
    }: {
      contactId: string;
      payload: Parameters<typeof updateContact>[2];
    }) => updateContact(customerId, contactId, payload),
    onSuccess: () => {
      invalidateContacts();
      setEditingContact(null);
      toast.success("Contact updated.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to update contact")),
  });

  const statusMutation = useMutation({
    mutationFn: ({ contactId, status }: { contactId: string; status: "Active" | "Inactive" }) =>
      updateContactStatus(customerId, contactId, status),
    onSuccess: () => {
      invalidateContacts();
      toast.success("Contact status updated.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to update contact status")),
  });

  const primaryMutation = useMutation({
    mutationFn: (contactId: string) => setPrimaryContact(customerId, contactId),
    onSuccess: () => {
      invalidateContacts();
      toast.success("Primary contact updated.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to set primary contact")),
  });

  const inviteMutation = useMutation({
    mutationFn: (contactId: string) => inviteContact(customerId, contactId),
    onSuccess: () => {
      invalidateContacts();
      toast.success("Invitation sent.");
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Failed to send invitation")),
  });

  const contacts = contactsQuery.data ?? [];

  return (
    <>
      <SectionCard
        title="Contacts"
        actions={
          canManage ? (
            <Button size="sm" onClick={() => setCreateOpen(true)}>
              <Plus className="size-4" /> Add contact
            </Button>
          ) : undefined
        }
      >
        {contactsQuery.isLoading ? (
          <TableSkeleton rows={4} cols={5} />
        ) : contacts.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No contacts"
            description="Add contacts for this customer to manage portal access and invitations."
            action={
              canManage ? (
                <Button size="sm" onClick={() => setCreateOpen(true)}>
                  <Plus className="size-4" /> Add contact
                </Button>
              ) : undefined
            }
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {["Contact", "Email", "Portal", "Invitation", "Status", ...(canManage ? ["Actions"] : [])].map((heading) => (
                  <TableHead key={heading} className={heading === "Actions" ? "text-right" : undefined}>
                    {heading}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell>
                    <div className="flex min-w-0 items-center gap-2">
                      <EntityCell name={contact.name} subtitle={contact.jobTitle} />
                      {contact.isPrimary ? <LabelPill label="Primary" /> : null}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{contact.email}</TableCell>
                  <TableCell>{contact.portalAccess ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {contact.portalAccess ? contact.invitationStatus ?? "Not Sent" : "—"}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={contact.status} />
                  </TableCell>
                  {canManage && (
                    <TableCell>
                      <DataTableActions>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <DataTableIconButton label="More actions">
                              <MoreHorizontal className="size-4" />
                            </DataTableIconButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditingContact(contact)}>
                              <Pencil className="size-4" /> Edit
                            </DropdownMenuItem>
                            {!contact.isPrimary && (
                              <DropdownMenuItem
                                disabled={primaryMutation.isPending}
                                onClick={() => primaryMutation.mutate(contact._id)}
                              >
                                <Star className="size-4" /> Set as primary
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              disabled={statusMutation.isPending}
                              onClick={() =>
                                statusMutation.mutate({
                                  contactId: contact._id,
                                  status: contact.status === "Active" ? "Inactive" : "Active",
                                })
                              }
                            >
                              {contact.status === "Active" ? (
                                <>
                                  <UserX className="size-4" /> Deactivate
                                </>
                              ) : (
                                <>
                                  <UserCheck className="size-4" /> Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            {contact.portalAccess && contact.invitationStatus !== "Accepted" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  disabled={inviteMutation.isPending}
                                  onClick={() => inviteMutation.mutate(contact._id)}
                                >
                                  <Mail className="size-4" /> {invitationLabel(contact.invitationStatus)}
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </DataTableActions>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SectionCard>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add contact</DialogTitle>
            <DialogDescription>Create a new contact for this customer.</DialogDescription>
          </DialogHeader>
          <ContactForm
            mode="create"
            onSubmit={async (payload) => {
              await createMutation.mutateAsync(payload);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(editingContact)} onOpenChange={(open) => !open && setEditingContact(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit contact</DialogTitle>
            <DialogDescription>Update contact details and portal access.</DialogDescription>
          </DialogHeader>
          {editingContact && (
            <ContactForm
              key={editingContact._id}
              mode="edit"
              initial={editingContact}
              onSubmit={async (payload) => {
                await updateMutation.mutateAsync({
                  contactId: editingContact._id,
                  payload,
                });
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
