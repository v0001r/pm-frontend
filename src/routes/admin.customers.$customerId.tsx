import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/customers/$customerId")({
  ssr: false,
  component: () => <Outlet />,
});
