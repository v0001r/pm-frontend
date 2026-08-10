import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PageHeader, p as TableSkeleton, u as SectionCard } from "./primitives-rWqtcPGP.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { nt as fetchCustomer, s as Route$5, ut as updateCustomer } from "./router-DLFu5c1a.mjs";
import { S as RequireRole } from "./guard-Da2hUi3G.mjs";
import { t as CustomerForm } from "./customer-form-5jWli_Dl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers._customerId.edit-CcBIfblN.js
var import_jsx_runtime = require_jsx_runtime();
function EditCustomerPage() {
	const { customerId } = Route$5.useParams();
	const navigate = useNavigate();
	const { data, isLoading } = useQuery({
		queryKey: ["customer", customerId],
		queryFn: () => fetchCustomer(customerId)
	});
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Edit customer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
		rows: 8,
		cols: 2
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: `Edit ${data.companyName}`,
		description: data.customerId
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerForm, {
			isEdit: true,
			initial: data,
			submitLabel: "Save changes",
			onCancel: () => navigate({
				to: "/admin/customers/$customerId",
				params: { customerId }
			}),
			onSubmit: async (payload) => {
				try {
					await updateCustomer(customerId, payload);
					toast.success("Customer updated.");
					navigate({
						to: "/admin/customers/$customerId",
						params: { customerId }
					});
				} catch (error) {
					toast.error(getApiErrorMessage(error, "Failed to update customer"));
					throw error;
				}
			}
		})
	}) })] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditCustomerPage, {})
});
//#endregion
export { SplitComponent as component };
