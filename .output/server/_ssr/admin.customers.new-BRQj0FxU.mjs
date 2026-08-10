import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { s as getApiErrorMessage } from "./button-DTh0UNAt.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHeader, d as SectionCard } from "./primitives-CPmujTLD.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { ot as createCustomer } from "./router-FFtXCDLz.mjs";
import { v as RequireRole } from "./guard-BCYPieem.mjs";
import { t as CustomerForm } from "./customer-form-BomHIj5d.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers.new-BRQj0FxU.js
var import_jsx_runtime = require_jsx_runtime();
function NewCustomerPage() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "New customer",
		description: "Create an organization and primary contact."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerForm, {
			submitLabel: "Create customer",
			onCancel: () => navigate({ to: "/admin/customers" }),
			onSubmit: async (payload) => {
				try {
					const customer = await createCustomer(payload);
					toast.success(`${customer.companyName} created.`);
					navigate({
						to: "/admin/customers/$customerId",
						params: { customerId: customer._id }
					});
				} catch (error) {
					toast.error(getApiErrorMessage(error, "Failed to create customer"));
					throw error;
				}
			}
		})
	}) })] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin", "Staff"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewCustomerPage, {})
});
//#endregion
export { SplitComponent as component };
