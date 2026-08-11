import { createFileRoute } from "@tanstack/react-router";
import { RequireRole } from "@/components/guard";
import { PageHeader, SectionCard } from "@/components/primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/help")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Help & Support — Helpdesk" },
      { name: "description", content: "Guidance on raising tickets, SLA targets and account security in Helpdesk." },
      { property: "og:title", content: "Help & Support — Helpdesk" },
      { property: "og:description", content: "Guidance on tickets, SLA targets and account security." },
    ],
  }),
  component: () => (
    <RequireRole roles={["Admin", "Staff", "Client"]}>
      <HelpPage />
    </RequireRole>
  ),
});

const faqs = [
  ["How do I raise a support ticket?", "Open Create Ticket, describe the issue, choose a category and priority, attach any evidence and submit. You'll receive a unique ticket number such as TKT-125."],
  ["What do the SLA states mean?", "On Track means the resolution deadline is comfortably ahead, Approaching means under four hours remain and Breached means the deadline has passed."],
  ["Who can see internal notes?", "Internal notes are visible only to support agents and administrators. Clients never see them in the ticket conversation."],
  ["How do I reopen a resolved ticket?", "Open the ticket and choose Reopen. The ticket returns to Open and the assigned agent is notified."],
  ["How do I change my password?", "Go to Profile → Security → Change Password. You'll need your current password and a new password meeting all listed requirements."],
];

function HelpPage() {
  return (
    <>
      <PageHeader title="Help & Support" description="Answers to the most common questions about the support portal." />
      <SectionCard>
        <Accordion type="single" collapsible className="px-4">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q!}>
              <AccordionTrigger className="text-sm">{q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionCard>
      <SectionCard title="Contact the support desk">
        <div className="grid gap-4 p-4 sm:grid-cols-3">
          {[
            ["Email", "support@helpdesk.io"],
            ["Phone", "+1 800 555 0110"],
            ["Hours", "24/7 for Critical issues"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-xs text-muted-foreground uppercase">{k}</p>
              <p className="mt-1 text-sm font-medium">{v}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
