export type Role = "Admin" | "Staff" | "Client";

export type TicketStatus =
  | "New"
  | "Assigned"
  | "In Progress"
  | "Resolved"
  | "Closed"
  | "Reopened"
  | "Cancelled";

export type Priority = "P1" | "P2" | "P3" | "P4";

export type AccountStatus = "Active" | "Inactive" | "Suspended";

export type ProjectStatus = "Open" | "On Hold" | "Completed" | "Cancelled";

export interface Project {
  _id: string;
  projectId: string;
  name: string;
  customerId: string;
  customerName?: string;
  description?: string;
  label?: string;
  startDate: string;
  endDate?: string | null;
  maxHours: number;
  progressPercentage: number;
  status: ProjectStatus;
  memberCount?: number;
  memberPreview?: { name: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectOverview {
  totalMembers: number;
  totalTickets: number;
  openTickets: number;
  completedTickets: number;
  consumedHours: number;
  pendingHours: number;
  remainingHours: number;
}

export interface ProjectDetail extends Project {
  overview?: ProjectOverview;
  customerEmail?: string;
  creatorName?: string;
}

export interface ProjectMember {
  _id: string;
  employeeId: string;
  employeeName: string;
  designation?: string;
  internalHours: number;
  externalHours: number;
  assignedDate: string;
  status: string;
}

export interface AssignProjectMemberPayload {
  employeeId: string;
  internalHours: number;
  externalHours?: number;
}

export type ProjectActivityAction =
  | "Project Created"
  | "Project Updated"
  | "Project Status Changed"
  | "Member Added"
  | "Member Removed"
  | "Hours Updated";

export interface ProjectActivity {
  _id: string;
  action: ProjectActivityAction;
  oldValue?: Record<string, unknown> | null;
  newValue?: Record<string, unknown> | null;
  createdAt: string;
  performerName?: string;
  performerEmail?: string;
}

export interface Customer {
  _id: string;
  customerId: string;
  companyName: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  website?: string;
  primaryContactName?: string;
  primaryContactEmail?: string;
  primaryContactMobile?: string;
  primaryContactId?: string;
  status: AccountStatus;
  invitationStatus?: InvitationStatus;
  portalEnabled?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type InvitationStatus = "Not Sent" | "Pending" | "Accepted" | "Expired" | "Resent";

export interface CustomerContact {
  _id: string;
  contactId: string;
  customerId: string;
  name: string;
  jobTitle?: string;
  email: string;
  mobile?: string;
  isPrimary: boolean;
  portalAccess: boolean;
  invitationStatus?: InvitationStatus;
  status: AccountStatus;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerOverviewSummary {
  totalProjects: number;
  totalTickets: number;
  openTickets: number;
  closedTickets: number;
}

export interface CreateContactPayload {
  name: string;
  jobTitle?: string;
  email: string;
  mobile?: string;
  isPrimary?: boolean;
  portalAccess?: boolean;
}

export interface UpdateContactPayload {
  name?: string;
  jobTitle?: string;
  email?: string;
  mobile?: string;
  portalAccess?: boolean;
}

export interface CreateCustomerPayload {
  companyName: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  website?: string;
  portalEnabled?: boolean;
  status?: AccountStatus;
  primaryContact: {
    name: string;
    jobTitle?: string;
    email: string;
    mobile?: string;
  };
}

export interface UpdateCustomerPayload {
  companyName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  website?: string;
  portalEnabled?: boolean;
}

export interface CustomerQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: AccountStatus;
  invitationStatus?: InvitationStatus;
  createdFrom?: string;
  createdTo?: string;
  sortBy?: "companyName" | "customerId" | "createdAt" | "status";
  sortOrder?: "asc" | "desc";
}

export interface CreateProjectPayload {
  name: string;
  customerId: string;
  description?: string;
  startDate: string;
  endDate?: string;
  maxHours: number;
  label?: string;
  status: ProjectStatus;
}

export interface UpdateProjectPayload {
  name?: string;
  customerId?: string;
  description?: string;
  startDate?: string;
  endDate?: string | null;
  maxHours?: number;
  label?: string;
  status?: ProjectStatus;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface ProjectQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  customerId?: string;
  status?: ProjectStatus;
  sortBy?: "name" | "startDate" | "endDate" | "createdAt";
  sortOrder?: "asc" | "desc";
  startDateFrom?: string;
  startDateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
  unscoped?: boolean;
}

export interface Category {
  _id: string;
  id?: string;
  name: string;
  description?: string;
  active: boolean;
}

export interface TicketUserRef {
  _id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: Role;
  company?: string;
}

export interface TicketRecord {
  _id: string;
  id?: string;
  number: string;
  ticketId?: string;
  subject: string;
  description: string;
  clientId: string | TicketUserRef;
  projectId?: string | { _id: string; projectId?: string; name?: string; status?: string };
  categoryId: string | { _id: string; name?: string };
  priority: Priority;
  status: TicketStatus;
  assignedTo?: string | TicketUserRef | null;
  tags?: string[];
  dueAt?: string | null;
  resolvedAt?: string | null;
  closedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  sla?: TicketSlaSummary | null;
}

export interface TicketSlaCycleHistory {
  _id: string;
  cycleNumber: number;
  assignmentSlaDueAt?: string | null;
  assignmentSlaMetAt?: string | null;
  assignmentSlaStatus?: string;
  assignmentSlaBreached?: boolean;
  resolutionSlaDueAt?: string | null;
  resolutionSlaMetAt?: string | null;
  resolutionSlaStatus?: string;
  resolutionSlaBreached?: boolean;
  slaResolutionFrozenAt?: string | null;
  startedAt: string;
  endedAt?: string | null;
}

export interface TicketSlaSummary {
  cycleNumber: number;
  assignmentSlaDueAt?: string | null;
  assignmentSlaMetAt?: string | null;
  assignmentSlaStatus?: string;
  resolutionSlaDueAt?: string | null;
  resolutionSlaMetAt?: string | null;
  resolutionSlaStatus?: string;
  slaStatus?: string | null;
  breachStatus?: 0 | 1 | boolean;
  slaResolutionFrozenAt?: string | null;
  pendingApprovalAt?: string | null;
  reopenedCount?: number;
  assignmentSlaMinutes?: number;
  resolutionSlaMinutes?: number;
  serverNowMs?: number;
  history?: TicketSlaCycleHistory[];
}

export interface TicketActivity {
  _id: string;
  ticketId: string;
  actorId: string | TicketUserRef;
  action: string;
  oldValue?: Record<string, unknown> | null;
  newValue?: Record<string, unknown> | null;
  createdAt: string;
}

export interface TicketMessage {
  _id: string;
  ticketId: string;
  authorId: string | TicketUserRef;
  body: string;
  isInternal: boolean;
  attachments?: { name: string; size: string; url?: string; key?: string; contentType?: string }[];
  createdAt: string;
}

export interface TicketEvent {
  _id: string;
  ticketId: string;
  actorId: string | TicketUserRef;
  description: string;
  createdAt: string;
}

export interface CreateTicketPayload {
  number?: string;
  subject: string;
  description: string;
  clientId?: string;
  projectId: string;
  categoryId: string;
  priority?: Priority;
  assignedTo?: string;
  status?: TicketStatus;
  attachments?: { name: string; size: string; url: string; key: string; contentType?: string }[];
}

export interface UpdateTicketPayload {
  subject?: string;
  description?: string;
  categoryId?: string;
  priority?: Priority;
  status?: TicketStatus;
  assignedTo?: string | null;
  tags?: string[];
  dueAt?: string | null;
  resolvedAt?: string | null;
  closedAt?: string | null;
  resolutionSummary?: string;
  closureComment?: string;
}

export interface TransitionTicketPayload {
  status: TicketStatus;
  comment?: string;
  assignedTo?: string;
  requireApproval?: boolean;
}

export interface TicketQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  projectId?: string;
  customerId?: string;
  categoryId?: string;
  priority?: Priority;
  status?: TicketStatus;
  clientId?: string;
  assignedTo?: string;
  unassigned?: boolean;
  tag?: string;
  createdFrom?: string;
  createdTo?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface User {
  id: string;
  _id?: string;
  employeeId?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: Role;
  status: AccountStatus;
  phone: string;
  address?: string;
  gender?: string;
  designation: string;
  designationId?: string;
  department?: string;
  departmentId?: string;
  departmentName?: string;
  teamId?: string;
  teamName?: string;
  reportingManagerId?: string | null;
  reportingManagerName?: string | null;
  dateOfJoining?: string;
  company?: string;
  timeZone: string;
  avatarHue: number;
  profileImage?: string;
  lastLogin?: string;
  mustChangePassword?: boolean;
  firstLoginCompleted?: boolean;
  loginEnabled?: boolean;
  invitationStatus?: InvitationStatus;
  customerId?: string;
  contactId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface InternalUser extends User {
  employeeId?: string;
}

export interface InternalUserOverviewSummary {
  assignedProjects: number;
  openProjects: number;
  completedProjects: number;
  pendingTickets: number;
}

export interface InternalUserOverview {
  user: InternalUser;
  summary: InternalUserOverviewSummary;
}

export interface CreateInternalUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  gender?: string;
  employeeId?: string;
  departmentId?: string;
  designationId?: string;
  teamId?: string;
  reportingManagerId?: string;
  dateOfJoining?: string;
  role: Role;
  status?: AccountStatus;
  temporaryPassword?: string;
  sendInvitation?: boolean;
}

export interface UpdateInternalUserPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string | null;
  gender?: string | null;
  employeeId?: string | null;
  departmentId?: string;
  designationId?: string;
  teamId?: string;
  reportingManagerId?: string | null;
  dateOfJoining?: string | null;
  role?: Role;
  status?: AccountStatus;
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  departmentId?: string;
  teamId?: string;
  role?: Role;
  status?: AccountStatus;
  invitationStatus?: InvitationStatus;
  dateOfJoiningFrom?: string;
  dateOfJoiningTo?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CompanySettings {
  companyName: string;
  supportEmail: string;
  contactNumber: string;
  website: string;
  address: string;
  timezone: string;
  dateFormat: string;
  logoUrl: string;
  faviconUrl: string;
  updatedAt?: string;
}

export const STATUSES: TicketStatus[] = [
  "New",
  "Assigned",
  "In Progress",
  "Resolved",
  "Closed",
  "Reopened",
  "Cancelled",
];

/** Statuses users can pick manually — assignment sets "Assigned" automatically. */
export const SETTABLE_STATUSES = STATUSES.filter((status) => status !== "Assigned");

export const PRIORITIES: Priority[] = ["P1", "P2", "P3", "P4"];

export const PROJECT_STATUSES: ProjectStatus[] = ["Open", "On Hold", "Completed", "Cancelled"];
export const TICKET_ELIGIBLE_PROJECT_STATUSES: ProjectStatus[] = ["Open", "On Hold"];

export const SLA_MATRIX: Record<string, { response: string; resolution: string }> = {
  P1: { response: "15 minutes", resolution: "4 hours" },
  P2: { response: "1 hour", resolution: "12 hours" },
  P3: { response: "8 hours", resolution: "24 hours" },
  P4: { response: "24 hours", resolution: "72 hours" },
  Critical: { response: "1 hour", resolution: "4 hours" },
  High: { response: "4 hours", resolution: "12 hours" },
  Medium: { response: "8 hours", resolution: "24 hours" },
  Low: { response: "24 hours", resolution: "72 hours" },
};

export function fullName(u: { name?: string; firstName?: string; lastName?: string }) {
  if (u.name) return u.name;
  return `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim();
}

export function employeeOptionLabel(employee: {
  employeeId?: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  designation?: string;
}) {
  const name = fullName(employee) || employee.email || "Employee";
  const identifier = employee.employeeId || employee.email;
  return identifier ? `${name} - ${identifier}` : name;
}

export function userRecordIds(user: { id?: string; _id?: string }) {
  return [...new Set([user._id, user.id].filter(Boolean))] as string[];
}

export function extractRecordId(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const record = value as { _id?: string; id?: string };
    return record._id || record.id || "";
  }
  return "";
}

export function memberUserId(member: { employeeId?: unknown; userId?: unknown }) {
  return extractRecordId(member.employeeId) || extractRecordId(member.userId);
}

export function assignedToUserId(user: { id?: string; _id?: string }, allowedMemberIds: Set<string>) {
  if (user._id && allowedMemberIds.has(user._id)) return user._id;
  if (user.id && allowedMemberIds.has(user.id)) return user.id;
  return user._id || user.id || "";
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
