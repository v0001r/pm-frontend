import type { InvitationStatus } from "./types";

export function isUserActivationPending(invitationStatus?: InvitationStatus) {
  return invitationStatus !== "Accepted";
}

export function canAdminResetPassword(invitationStatus?: InvitationStatus) {
  return !isUserActivationPending(invitationStatus);
}
