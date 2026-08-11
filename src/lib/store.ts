import { useSyncExternalStore } from "react";
import { TICKET_CATEGORIES } from "./ticket-categories";
import type {
  AuditLog,
  Category,
  Notification,
  Priority,
  Ticket,
  TicketEvent,
  TicketMessage,
  TicketStatus,
  User,
} from "./types";
import { fullName } from "./types";

/* ------------------------------------------------------------------ */
/* Seed data — replaced by real API/database calls when backend lands. */
/* ------------------------------------------------------------------ */

const DAY = 86400000;
const HOUR = 3600000;
const BASE = new Date("2026-08-04T09:00:00Z").getTime();
const iso = (msAgo: number) => new Date(BASE - msAgo).toISOString();

export const categories: Category[] = TICKET_CATEGORIES.map((category) => ({ ...category }));

export const users: User[] = [
  {
    id: "u1",
    firstName: "Bhushan",
    lastName: "Yadav",
    email: "admin@helpdesk.io",
    role: "Admin",
    status: "Active",
    phone: "+91 98200 41122",
    designation: "Head of Support",
    department: "Customer Success",
    timeZone: "Asia/Kolkata",
    avatarHue: 265,
    lastLogin: iso(2 * HOUR),
    createdAt: iso(700 * DAY),
  },
  {
    id: "u2",
    firstName: "Elena",
    lastName: "Rossi",
    email: "elena@helpdesk.io",
    role: "Staff",
    status: "Active",
    phone: "+39 331 552 8890",
    designation: "Senior Support Engineer",
    department: "Tier 2",
    timeZone: "Europe/Rome",
    avatarHue: 155,
    lastLogin: iso(5 * HOUR),
    createdAt: iso(420 * DAY),
  },
  {
    id: "u3",
    firstName: "Marcus",
    lastName: "Bell",
    email: "marcus@helpdesk.io",
    role: "Staff",
    status: "Active",
    phone: "+1 415 220 7781",
    designation: "Support Engineer",
    department: "Tier 1",
    timeZone: "America/Los_Angeles",
    avatarHue: 62,
    lastLogin: iso(28 * HOUR),
    createdAt: iso(260 * DAY),
  },
  {
    id: "u4",
    firstName: "Priya",
    lastName: "Nair",
    email: "priya@helpdesk.io",
    role: "Staff",
    status: "Inactive",
    phone: "+91 90040 11923",
    designation: "Billing Specialist",
    department: "Finance Support",
    timeZone: "Asia/Kolkata",
    avatarHue: 25,
    lastLogin: iso(19 * DAY),
    createdAt: iso(180 * DAY),
  },
  {
    id: "u10",
    firstName: "Brooklyn",
    lastName: "Zoe",
    email: "client@acme.com",
    role: "Client",
    status: "Active",
    phone: "+1 212 771 0192",
    designation: "IT Manager",
    company: "Acme Industries",
    timeZone: "America/New_York",
    avatarHue: 235,
    lastLogin: iso(3 * HOUR),
    createdAt: iso(310 * DAY),
  },
  {
    id: "u11",
    firstName: "John",
    lastName: "McCormick",
    email: "john@northwind.com",
    role: "Client",
    status: "Active",
    phone: "+1 646 118 2233",
    designation: "Operations Lead",
    company: "Northwind Trading",
    timeZone: "America/Chicago",
    avatarHue: 200,
    lastLogin: iso(30 * HOUR),
    createdAt: iso(240 * DAY),
  },
  {
    id: "u12",
    firstName: "Sandra",
    lastName: "Pugh",
    email: "sandra@vertexlabs.io",
    role: "Client",
    status: "Active",
    phone: "+44 7700 900211",
    designation: "Product Owner",
    company: "Vertex Labs",
    timeZone: "Europe/London",
    avatarHue: 320,
    lastLogin: iso(9 * HOUR),
    createdAt: iso(150 * DAY),
  },
  {
    id: "u13",
    firstName: "Mark",
    lastName: "Clark",
    email: "mark@bluepeak.co",
    role: "Client",
    status: "Inactive",
    phone: "+1 917 442 6610",
    designation: "Finance Director",
    company: "BluePeak Co",
    timeZone: "America/New_York",
    avatarHue: 110,
    lastLogin: iso(45 * DAY),
    createdAt: iso(95 * DAY),
  },
  {
    id: "u14",
    firstName: "Rebekah",
    lastName: "Foster",
    email: "rebekah@lumen.dev",
    role: "Client",
    status: "Active",
    phone: "+1 503 887 4410",
    designation: "Engineering Manager",
    company: "Lumen Dev",
    timeZone: "America/Los_Angeles",
    avatarHue: 15,
    lastLogin: iso(6 * HOUR),
    createdAt: iso(60 * DAY),
  },
];

const subjects: [string, string, Priority, TicketStatus, string][] = [
  ["SSO login fails for the finance group", "c3", "Critical", "In Progress", "u10"],
  ["Invoice #INV-8823 charged twice", "c2", "High", "Assigned", "u11"],
  ["Export to CSV times out over 50k rows", "c3", "High", "In Progress", "u12"],
  ["Request access to the staging environment", "c1", "Low", "Resolved", "u10"],
  ["Dashboard widgets render blank on Safari", "c3", "Medium", "New", "u14"],
  ["Add bulk reassignment for tickets", "c1", "Low", "Assigned", "u12"],
  ["Password reset email never arrives", "c2", "High", "Resolved", "u11"],
  ["API returns 500 on /v2/orders", "c3", "Critical", "In Progress", "u14"],
  ["Clarify annual plan proration", "c2", "Low", "Closed", "u13"],
  ["Webhook signature mismatch after key rotation", "c3", "High", "Assigned", "u12"],
  ["Two seats missing after upgrade", "c2", "Medium", "In Progress", "u10"],
  ["Mobile app crashes on ticket attachment", "c3", "Critical", "Assigned", "u14"],
  ["Enable audit log export", "c1", "Medium", "New", "u11"],
  ["User cannot be deactivated", "c3", "Medium", "Resolved", "u12"],
  ["Update billing contact details", "c2", "Low", "Closed", "u10"],
  ["Rate limit reached unexpectedly", "c3", "High", "In Progress", "u11"],
  ["Request read-only analytics role", "c1", "Low", "Assigned", "u14"],
  ["Attachments over 10 MB are rejected", "c3", "Medium", "In Progress", "u12"],
  ["Timezone shown incorrectly in reports", "c3", "Low", "Resolved", "u10"],
  ["Ticket notifications duplicated", "c3", "Medium", "Assigned", "u11"],
  ["Onboarding walkthrough for new agents", "c2", "Low", "Closed", "u12"],
  ["Refund not reflected on statement", "c2", "High", "In Progress", "u14"],
  ["SAML metadata refresh required", "c1", "Medium", "New", "u10"],
  ["Search returns stale ticket titles", "c3", "Medium", "Assigned", "u11"],
];

const agents = ["u2", "u3", "u4"];

function makeTickets(): Ticket[] {
  return subjects.map(([subject, categoryId, priority, status, clientId], i) => {
    const createdAgo = (i * 7 + 3) * HOUR;
    const updatedAgo = Math.max(1, createdAgo - (i % 5) * HOUR - HOUR);
    const slaHours = priority === "Critical" ? 4 : priority === "High" ? 12 : priority === "Medium" ? 24 : 72;
    const resolved = status === "Resolved" || status === "Closed";
    return {
      id: `t${i + 1}`,
      number: `TKT-${String(101 + i).padStart(3, "0")}`,
      subject,
      description:
        "Detailed reproduction steps and environment information were supplied by the client at submission time. Support has full context on the affected workspace, plan tier and impacted users.",
      clientId,
      categoryId,
      priority,
      status,
      assignedTo: status === "New" ? null : agents[i % agents.length]!,
      tags: i % 3 === 0 ? ["escalated"] : i % 4 === 0 ? ["billing", "vip"] : [],
      createdAt: iso(createdAgo),
      updatedAt: iso(updatedAgo),
      dueAt: new Date(BASE - createdAgo + slaHours * HOUR).toISOString(),
      resolvedAt: resolved ? iso(updatedAgo) : null,
      closedAt: status === "Closed" ? iso(updatedAgo) : null,
    } satisfies Ticket;
  });
}

function makeMessages(tickets: Ticket[]): TicketMessage[] {
  const out: TicketMessage[] = [];
  tickets.forEach((t, i) => {
    out.push({
      id: `${t.id}-m1`,
      ticketId: t.id,
      authorId: t.clientId,
      body: t.description,
      isInternal: false,
      createdAt: t.createdAt,
      attachments: i % 4 === 0 ? [{ name: "console-log.txt", size: "48 KB" }] : [],
    });
    if (t.assignedTo) {
      out.push({
        id: `${t.id}-m2`,
        ticketId: t.id,
        authorId: t.assignedTo,
        body: "Thanks for the detailed report — I've reproduced this on our side and raised it with engineering. I'll keep you posted here as we progress.",
        isInternal: false,
        attachments: [],
        createdAt: new Date(new Date(t.createdAt).getTime() + 2 * HOUR).toISOString(),
      });
      out.push({
        id: `${t.id}-m3`,
        ticketId: t.id,
        authorId: t.assignedTo,
        body: "Internal: linked to ENG-4471. Customer is on the Enterprise plan — keep SLA visibility high.",
        isInternal: true,
        attachments: [],
        createdAt: new Date(new Date(t.createdAt).getTime() + 3 * HOUR).toISOString(),
      });
    }
  });
  return out;
}

function makeEvents(tickets: Ticket[]): TicketEvent[] {
  return tickets.flatMap((t) => [
    {
      id: `${t.id}-e1`,
      ticketId: t.id,
      actorId: t.clientId,
      description: `Ticket ${t.number} created with ${t.priority} priority`,
      createdAt: t.createdAt,
    },
    ...(t.assignedTo
      ? [
          {
            id: `${t.id}-e2`,
            ticketId: t.id,
            actorId: "u1",
            description: `Assigned to ${fullName(users.find((u) => u.id === t.assignedTo)!)}`,
            createdAt: new Date(new Date(t.createdAt).getTime() + HOUR).toISOString(),
          },
          {
            id: `${t.id}-e3`,
            ticketId: t.id,
            actorId: t.assignedTo,
            description: `Status changed to ${t.status}`,
            createdAt: t.updatedAt,
          },
        ]
      : []),
  ]);
}

function makeNotifications(): Notification[] {
  const seed: [string, string, string, Notification["type"]][] = [
    ["u1", "New critical ticket", "TKT-108 was created by Rebekah Foster", "ticket"],
    ["u1", "Client replied", "John McCormick replied on TKT-102", "reply"],
    ["u1", "SLA breach risk", "TKT-101 is approaching its resolution deadline", "status"],
    ["u1", "Ticket reopened", "Mark Clark reopened TKT-109", "status"],
    ["u10", "Ticket created", "Your ticket TKT-101 has been created successfully", "ticket"],
    ["u10", "Support replied", "Elena Rossi replied to TKT-101", "reply"],
    ["u10", "Status updated", "TKT-104 was marked as Resolved", "status"],
    ["u10", "Security", "Your password was changed successfully", "security"],
  ];
  return seed.map(([userId, title, message, type], i) => ({
    id: `n${i + 1}`,
    userId,
    title,
    message,
    type,
    read: i > 5,
    createdAt: iso((i + 1) * 3 * HOUR),
  }));
}

function makeAudit(): AuditLog[] {
  const seed: [string, string, string, string][] = [
    ["u1", "Login", "Authentication", "Signed in from Chrome on macOS"],
    ["u2", "Ticket updated", "Tickets", "Changed status of TKT-101 to In Progress"],
    ["u1", "Ticket assigned", "Tickets", "Assigned TKT-108 to Marcus Bell"],
    ["u1", "Client created", "Clients", "Created client account for Lumen Dev"],
    ["u3", "Priority changed", "Tickets", "Raised TKT-112 to Critical"],
    ["u1", "Client deactivated", "Clients", "Deactivated BluePeak Co"],
    ["u1", "Password reset", "Security", "Triggered password reset for john@northwind.com"],
    ["u2", "Logout", "Authentication", "Session ended"],
    ["u1", "Admin created", "Support Team", "Added agent Priya Nair"],
    ["u3", "Ticket created", "Tickets", "Created TKT-123 on behalf of client"],
  ];
  return seed.map(([userId, action, module, description], i) => ({
    id: `a${i + 1}`,
    userId,
    action,
    module,
    description,
    ip: `10.24.${8 + i}.${40 + i * 3}`,
    createdAt: iso((i + 1) * 5 * HOUR),
  }));
}

/* ------------------------------------------------------------------ */
/* Tiny reactive store (swap for API queries once a backend exists).   */
/* ------------------------------------------------------------------ */

interface State {
  tickets: Ticket[];
  messages: TicketMessage[];
  events: TicketEvent[];
  notifications: Notification[];
  audit: AuditLog[];
  users: User[];
  categories: Category[];
}

const initialTickets = makeTickets();

let state: State = {
  tickets: initialTickets,
  messages: makeMessages(initialTickets),
  events: makeEvents(initialTickets),
  notifications: makeNotifications(),
  audit: makeAudit(),
  users,
  categories,
};

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(state),
  );
}

export const getState = () => state;

function set(patch: Partial<State>) {
  state = { ...state, ...patch };
  emit();
}

const now = () => new Date().toISOString();
const rid = () => Math.random().toString(36).slice(2, 10);

export const actions = {
  createTicket(input: {
    subject: string;
    description: string;
    categoryId: string;
    priority: Priority;
    clientId: string;
    attachments: { name: string; size: string }[];
  }) {
    const seq = 101 + state.tickets.length;
    const slaHours =
      input.priority === "Critical" ? 4 : input.priority === "High" ? 12 : input.priority === "Medium" ? 24 : 72;
    const ticket: Ticket = {
      id: `t${rid()}`,
      number: `TKT-${String(seq).padStart(3, "0")}`,
      subject: input.subject,
      description: input.description,
      clientId: input.clientId,
      categoryId: input.categoryId,
      priority: input.priority,
      status: "New",
      assignedTo: null,
      tags: [],
      createdAt: now(),
      updatedAt: now(),
      dueAt: new Date(Date.now() + slaHours * HOUR).toISOString(),
      resolvedAt: null,
      closedAt: null,
    };
    set({
      tickets: [ticket, ...state.tickets],
      messages: [
        ...state.messages,
        {
          id: rid(),
          ticketId: ticket.id,
          authorId: input.clientId,
          body: input.description,
          isInternal: false,
          createdAt: now(),
          attachments: input.attachments,
        },
      ],
      events: [
        ...state.events,
        {
          id: rid(),
          ticketId: ticket.id,
          actorId: input.clientId,
          description: `Ticket ${ticket.number} created with ${ticket.priority} priority`,
          createdAt: now(),
        },
      ],
      notifications: [
        {
          id: rid(),
          userId: input.clientId,
          title: "Ticket created",
          message: `Your ticket ${ticket.number} has been created successfully`,
          type: "ticket",
          read: false,
          createdAt: now(),
        },
        {
          id: rid(),
          userId: "u1",
          title: "New ticket",
          message: `${ticket.number} was created (${ticket.priority} priority)`,
          type: "ticket",
          read: false,
          createdAt: now(),
        },
        ...state.notifications,
      ],
    });
    return ticket;
  },

  addMessage(ticketId: string, authorId: string, body: string, isInternal: boolean, attachments: { name: string; size: string }[] = []) {
    set({
      messages: [
        ...state.messages,
        { id: rid(), ticketId, authorId, body, isInternal, createdAt: now(), attachments },
      ],
      tickets: state.tickets.map((t) => (t.id === ticketId ? { ...t, updatedAt: now() } : t)),
    });
  },

  updateTicket(ticketId: string, patch: Partial<Ticket>, actorId: string, description: string) {
    set({
      tickets: state.tickets.map((t) => (t.id === ticketId ? { ...t, ...patch, updatedAt: now() } : t)),
      events: [...state.events, { id: rid(), ticketId, actorId, description, createdAt: now() }],
      audit: [
        { id: rid(), userId: actorId, action: "Ticket updated", module: "Tickets", description, ip: "10.24.8.44", createdAt: now() },
        ...state.audit,
      ],
    });
  },

  markNotificationsRead(userId: string) {
    set({
      notifications: state.notifications.map((n) => (n.userId === userId ? { ...n, read: true } : n)),
    });
  },

  updateUser(userId: string, patch: Partial<User>) {
    set({ users: state.users.map((u) => (u.id === userId ? { ...u, ...patch } : u)) });
  },

  addUser(user: User) {
    set({ users: [user, ...state.users] });
  },

  upsertCategory(cat: Category) {
    const exists = state.categories.some((c) => c.id === cat.id);
    set({
      categories: exists ? state.categories.map((c) => (c.id === cat.id ? cat : c)) : [...state.categories, cat],
    });
  },

  log(userId: string, action: string, module: string, description: string) {
    set({
      audit: [
        { id: rid(), userId, action, module, description, ip: "10.24.8.44", createdAt: now() },
        ...state.audit,
      ],
    });
  },
};

/* ---------------------------- selectors ---------------------------- */

export const findUser = (s: State, id: string | null) => s.users.find((u) => u.id === id);
export const categoryName = (s: State, id: string) => s.categories.find((c) => c.id === id)?.name ?? "—";

export function slaState(t: Ticket): "On Track" | "Approaching" | "Breached" | "Met" {
  if (t.status === "Resolved" || t.status === "Closed") return "Met";
  const left = new Date(t.dueAt).getTime() - Date.now();
  if (left < 0) return "Breached";
  if (left < 4 * HOUR) return "Approaching";
  return "On Track";
}

export function formatDate(value: string, withTime = false) {
  const d = new Date(value);
  const date = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  return withTime ? `${date}, ${d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}` : date;
}

export function relativeTime(value: string) {
  const diff = Date.now() - new Date(value).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}
