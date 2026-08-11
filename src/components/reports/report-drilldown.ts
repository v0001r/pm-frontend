export type TicketDrilldownSearch = {
  status?: string;
  priority?: string;
  sla?: string;
  client?: string;
  agent?: string;
  projectId?: string;
  category?: string;
  tag?: string;
  customerId?: string;
  createdFrom?: string;
  createdTo?: string;
};

export function ticketDrilldown(search: TicketDrilldownSearch): TicketDrilldownSearch {
  return search;
}

export function drilldownByStatus(status: string): TicketDrilldownSearch {
  return { status };
}

export function drilldownByPriority(priority: string): TicketDrilldownSearch {
  return { priority };
}

export function drilldownByCategory(categoryId: string): TicketDrilldownSearch {
  return { category: categoryId };
}

export function drilldownByAgent(agentId: string): TicketDrilldownSearch {
  return { agent: agentId };
}

export function drilldownByClient(clientId: string): TicketDrilldownSearch {
  return { client: clientId };
}

export function drilldownByProject(projectId: string): TicketDrilldownSearch {
  return { projectId };
}

export function drilldownBySla(sla: string): TicketDrilldownSearch {
  return { sla };
}

export function drilldownByTag(tag: string): TicketDrilldownSearch {
  return { tag };
}

export function drilldownByCustomer(customerId: string): TicketDrilldownSearch {
  return { customerId };
}

export function drilldownAgingBucket(minHours: number, maxHours: number | null): TicketDrilldownSearch {
  const now = new Date();
  const createdTo = new Date(now.getTime() - minHours * 3600000);
  const search: TicketDrilldownSearch = {
    status: "New",
    createdTo: formatDateInput(createdTo),
  };
  if (maxHours != null) {
    search.createdFrom = formatDateInput(new Date(now.getTime() - maxHours * 3600000));
  }
  return search;
}

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function workloadTone(workload: string) {
  switch (workload) {
    case "Healthy":
      return "success" as const;
    case "Busy":
      return "warning" as const;
    case "Overloaded":
      return "danger" as const;
    default:
      return "default" as const;
  }
}
