import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button, r as api, s as getApiErrorMessage } from "./button-vnqCGuCs.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Mail, j as MailWarning, ot as ChevronRight } from "../_libs/lucide-react.mjs";
import { i as PRIORITIES, n as Input } from "./primitives-BAq0jd4Y.mjs";
import { u as TICKET_CATEGORIES } from "./store-C1539MgZ.mjs";
import { C as SelectTrigger, S as SelectItem, _ as TableHead, b as Select, g as TableCell, h as TableBody, m as Table, v as TableHeader, w as SelectValue, x as SelectContent, y as TableRow } from "./data-table-CCefV4l1.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as SettingsUploadBox, S as SettingsShell, b as SettingsField, v as Route$29, w as settingsSectionMeta, x as SettingsPageHeader, y as SettingsCard } from "./router-CZIJBryQ.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./alert-dhmSbzq7.mjs";
import { h as RequireRole } from "./guard-BbFIUcOG.mjs";
import { t as Badge } from "./badge-D6z9ibdi.mjs";
import { t as Switch } from "./switch-CaC8bHjs.mjs";
import { t as Textarea } from "./textarea-uxyrlvLH.mjs";
import { a as fetchSlaSettings, d as updateSlaSettings, l as snapSlaHours, n as SLA_MINUTE_OPTIONS, r as combineSlaMinutes, s as fromSlaMinuteOption, t as SLA_HOUR_OPTIONS, u as toSlaMinuteOption } from "./sla-CJCI0zB3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-Bd6ITB1U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function fetchCompanySettings() {
	const { data } = await api.get("/settings/company");
	return data.data;
}
async function updateCompanySettings(payload) {
	const { updatedAt: _updatedAt, ...body } = payload;
	const { data } = await api.patch("/settings/company", body);
	return data.data;
}
async function fetchNotificationSettings() {
	const { data } = await api.get("/settings/notifications");
	return data.data;
}
async function updateNotificationSettings(payload) {
	const { data } = await api.patch("/settings/notifications", payload);
	return data.data;
}
function policiesToFormRows(policies) {
	const byPriority = new Map(policies.map((policy) => [policy.priority, policy]));
	return PRIORITIES.map((priority) => {
		const policy = byPriority.get(priority);
		const assignmentMinutes = policy?.assignmentSlaMinutes ?? 0;
		const resolutionMinutes = policy?.resolutionSlaMinutes ?? 0;
		return {
			priority,
			responseHours: String(snapSlaHours(Math.floor(assignmentMinutes / 60))),
			responseMinutes: toSlaMinuteOption(assignmentMinutes % 60),
			resolutionHours: String(snapSlaHours(Math.floor(resolutionMinutes / 60))),
			resolutionMinutes: toSlaMinuteOption(resolutionMinutes % 60)
		};
	});
}
function SettingsPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { section = "company" } = Route$29.useSearch();
	const meta = settingsSectionMeta[section];
	const companyQuery = useQuery({
		queryKey: ["company-settings"],
		queryFn: fetchCompanySettings,
		enabled: section === "company"
	});
	const [companyForm, setCompanyForm] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (companyQuery.data) setCompanyForm(companyQuery.data);
	}, [companyQuery.data]);
	(0, import_react.useEffect)(() => {
		if (companyQuery.isError) toast.error(getApiErrorMessage(companyQuery.error, "Failed to load company settings"));
	}, [companyQuery.isError, companyQuery.error]);
	const saveMutation = useMutation({
		mutationFn: updateCompanySettings,
		onSuccess: (data) => {
			queryClient.setQueryData(["company-settings"], data);
			setCompanyForm(data);
			toast.success("Settings saved.");
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to save settings"))
	});
	function setSection(next) {
		navigate({
			to: "/admin/settings",
			search: { section: next },
			replace: true
		});
	}
	function updateCompany(key, value) {
		setCompanyForm((current) => current ? {
			...current,
			[key]: value
		} : current);
	}
	function saveChanges() {
		if (!companyForm) return;
		saveMutation.mutate(companyForm);
	}
	function resetCompanyForm() {
		if (companyQuery.data) {
			setCompanyForm(companyQuery.data);
			toast.message("Changes discarded.");
		}
	}
	const companyLoading = section === "company" && (companyQuery.isLoading || !companyForm);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Breadcrumb",
		className: "mb-4 flex items-center gap-1.5 text-[13px] text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin",
				className: "transition-colors hover:text-foreground",
				children: "Admin"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/settings",
				search: { section: "company" },
				className: "transition-colors hover:text-foreground",
				children: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-foreground",
				children: meta.breadcrumb
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SettingsShell, {
		section,
		onSectionChange: setSection,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPageHeader, {
				title: meta.title,
				description: meta.description,
				actions: section === "company" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: resetCompanyForm,
					disabled: companyLoading || saveMutation.isPending,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					onClick: saveChanges,
					disabled: companyLoading || saveMutation.isPending,
					children: saveMutation.isPending ? "Saving…" : "Save changes"
				})] }) : null
			}),
			section === "company" ? companyLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsCard, {
				title: "Organization Details",
				description: "Loading company settings…",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Please wait."
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanySettings, {
				form: companyForm,
				onChange: updateCompany
			}) : null,
			section === "tickets-sla" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketsSlaSettings, {}) : null,
			section === "ticket-categories" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketCategoriesSettings, {}) : null,
			section === "notifications" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsSettings, {}) : null,
			section === "users-roles" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRolesSettings, {}) : null
		]
	})] });
}
function CompanySettings({ form, onChange }) {
	const logoPreview = form.logoUrl || "/miraki-logo.png";
	const faviconPreview = form.faviconUrl || void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsCard, {
		title: "Organization Details",
		description: "Basic company information visible across the platform.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
					label: "Company name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.companyName,
						onChange: (e) => onChange("companyName", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
					label: "Support email",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "email",
						value: form.supportEmail,
						onChange: (e) => onChange("supportEmail", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
					label: "Contact number",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.contactNumber,
						onChange: (e) => onChange("contactNumber", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
					label: "Website",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.website,
						onChange: (e) => onChange("website", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsUploadBox, {
					label: "Logo",
					previewSrc: logoPreview,
					context: "settings-logo",
					onUploaded: (url) => onChange("logoUrl", url)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsUploadBox, {
					label: "Favicon",
					hint: "Click to upload",
					previewSrc: faviconPreview,
					context: "settings-favicon",
					accept: "image/png,image/x-icon,image/vnd.microsoft.icon,image/jpeg,image/webp",
					onUploaded: (url) => onChange("faviconUrl", url)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
					label: "Company address",
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 3,
						value: form.address,
						onChange: (e) => onChange("address", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
					label: "Timezone",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: form.timezone,
						onValueChange: (value) => onChange("timezone", value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "America/Los_Angeles",
								children: "Pacific Time (PT)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "America/New_York",
								children: "Eastern Time (ET)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Europe/London",
								children: "Greenwich Mean Time (GMT)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Asia/Kolkata",
								children: "India Standard Time (IST)"
							})
						] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
					label: "Date format",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: form.dateFormat,
						onValueChange: (value) => onChange("dateFormat", value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "MM/DD/YYYY",
								children: "MM/DD/YYYY"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "DD/MM/YYYY",
								children: "DD/MM/YYYY"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "YYYY-MM-DD",
								children: "YYYY-MM-DD"
							})
						] })]
					})
				})
			]
		})
	});
}
function TicketsSlaSettings() {
	const queryClient = useQueryClient();
	const policiesQuery = useQuery({
		queryKey: ["sla-settings"],
		queryFn: fetchSlaSettings
	});
	const [formRows, setFormRows] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (policiesQuery.data) setFormRows(policiesToFormRows(policiesQuery.data));
	}, [policiesQuery.data]);
	(0, import_react.useEffect)(() => {
		if (policiesQuery.isError) toast.error(getApiErrorMessage(policiesQuery.error, "Failed to load SLA settings"));
	}, [policiesQuery.isError, policiesQuery.error]);
	const saveMutation = useMutation({
		mutationFn: updateSlaSettings,
		onSuccess: (data) => {
			queryClient.setQueryData(["sla-settings"], data);
			queryClient.setQueryData(["sla-policies"], data);
			setFormRows(policiesToFormRows(data));
			toast.success("SLA settings saved.");
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to save SLA settings"))
	});
	function updateRow(priority, patch) {
		setFormRows((current) => current?.map((row) => row.priority === priority ? {
			...row,
			...patch
		} : row) ?? current);
	}
	function resetForm() {
		if (policiesQuery.data) {
			setFormRows(policiesToFormRows(policiesQuery.data));
			toast.message("Changes discarded.");
		}
	}
	function saveChanges() {
		if (!formRows) return;
		const policies = [];
		for (const row of formRows) {
			const assignmentSlaMinutes = combineSlaMinutes(Number(row.responseHours), fromSlaMinuteOption(row.responseMinutes));
			const resolutionSlaMinutes = combineSlaMinutes(Number(row.resolutionHours), fromSlaMinuteOption(row.resolutionMinutes));
			if (assignmentSlaMinutes === null || resolutionSlaMinutes === null) {
				toast.error(`${row.priority}: select a valid duration (at least 1 minute total).`);
				return;
			}
			policies.push({
				priority: row.priority,
				assignmentSlaMinutes,
				resolutionSlaMinutes
			});
		}
		saveMutation.mutate({ policies });
	}
	const loading = policiesQuery.isLoading || !formRows;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsCard, {
		title: "Priority-based SLA targets",
		description: "Set response and resolution targets in hours and minutes, then save to apply for new SLA cycles.",
		children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading SLA settings…"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
			className: "hover:bg-transparent",
			children: [
				"Priority",
				"Response time",
				"Resolution time"
			].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: heading }, heading))
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: formRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-semibold",
				children: row.priority
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaDurationFields, {
				hours: row.responseHours,
				minutes: row.responseMinutes,
				disabled: saveMutation.isPending,
				labelPrefix: `${row.priority} response`,
				onHoursChange: (value) => updateRow(row.priority, { responseHours: value }),
				onMinutesChange: (value) => updateRow(row.priority, { responseMinutes: value })
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlaDurationFields, {
				hours: row.resolutionHours,
				minutes: row.resolutionMinutes,
				disabled: saveMutation.isPending,
				labelPrefix: `${row.priority} resolution`,
				onHoursChange: (value) => updateRow(row.priority, { resolutionHours: value }),
				onMinutesChange: (value) => updateRow(row.priority, { resolutionMinutes: value })
			}) })
		] }, row.priority)) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex justify-end gap-2 border-t border-border/60 pt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				variant: "outline",
				onClick: resetForm,
				disabled: saveMutation.isPending,
				children: "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "sm",
				onClick: saveChanges,
				disabled: saveMutation.isPending,
				children: saveMutation.isPending ? "Saving…" : "Save changes"
			})]
		})] })
	});
}
function SlaDurationFields({ hours, minutes, disabled, labelPrefix, onHoursChange, onMinutesChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			value: hours,
			onValueChange: onHoursChange,
			disabled,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
				className: "h-8 w-[5.5rem]",
				"aria-label": `${labelPrefix} hours`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SLA_HOUR_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
				value: String(option),
				children: [
					option,
					" ",
					option === 1 ? "hr" : "hrs"
				]
			}, option)) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			value: minutes,
			onValueChange: onMinutesChange,
			disabled,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
				className: "h-8 w-[5.5rem]",
				"aria-label": `${labelPrefix} minutes`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SLA_MINUTE_OPTIONS.map((option) => {
				const value = toSlaMinuteOption(option);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
					value,
					children: [value, " mins"]
				}, value);
			}) })]
		})]
	});
}
function TicketCategoriesSettings() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsCard, {
		title: "Ticket categories",
		description: "Fixed categories used when logging support requests.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y rounded-md border",
			children: TICKET_CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-3 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: category.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-subtle",
					children: category.description
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					children: "Active"
				})]
			}, category.id))
		})
	});
}
function NotificationsSettings() {
	const queryClient = useQueryClient();
	const settingsQuery = useQuery({
		queryKey: ["notification-settings"],
		queryFn: fetchNotificationSettings
	});
	const [form, setForm] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (settingsQuery.data) setForm(settingsQuery.data);
	}, [settingsQuery.data]);
	(0, import_react.useEffect)(() => {
		if (settingsQuery.isError) toast.error(getApiErrorMessage(settingsQuery.error, "Failed to load notification settings"));
	}, [settingsQuery.isError, settingsQuery.error]);
	const saveMutation = useMutation({
		mutationFn: updateNotificationSettings,
		onSuccess: (data) => {
			queryClient.setQueryData(["notification-settings"], data);
			setForm(data);
			toast.success("Notification settings saved.");
		},
		onError: (error) => toast.error(getApiErrorMessage(error, "Failed to save notification settings"))
	});
	function updateEvent(key, email) {
		setForm((current) => current ? {
			...current,
			events: current.events.map((event) => event.key === key ? {
				...event,
				email
			} : event)
		} : current);
	}
	function resetForm() {
		if (settingsQuery.data) {
			setForm(settingsQuery.data);
			toast.message("Changes discarded.");
		}
	}
	function saveChanges() {
		if (!form) return;
		saveMutation.mutate({ events: form.events });
	}
	const loading = settingsQuery.isLoading || !form;
	const delivery = form?.emailDelivery;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsCard, {
		title: "Notification channels",
		description: "Configure which ticket events send email notifications.",
		children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading notification settings…"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				variant: delivery?.available ? "default" : "destructive",
				className: "mb-5",
				children: [
					delivery?.available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailWarning, { className: "size-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertTitle, {
						className: "flex items-center gap-2",
						children: ["Email delivery", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: delivery?.available ? "secondary" : "destructive",
							children: delivery?.available ? "Available" : "Unavailable"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: delivery?.message })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y",
				children: form.events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: event.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: event.email,
							disabled: saveMutation.isPending,
							onCheckedChange: (checked) => updateEvent(event.key, checked)
						})]
					})]
				}, event.key))
			}),
			!delivery?.available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: "Email delivery is not active yet. You can still save preferences; notifications will send once email is configured."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex justify-end gap-2 border-t border-border/60 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: resetForm,
					disabled: saveMutation.isPending,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					onClick: saveChanges,
					disabled: saveMutation.isPending,
					children: saveMutation.isPending ? "Saving…" : "Save changes"
				})]
			})
		] })
	});
}
function UsersRolesSettings() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsCard, {
		title: "Roles and permissions",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3",
			children: [
				["Admin", "Full access to tickets, customers, users, reports, audit logs and settings."],
				["Staff", "Access to assigned projects, ticket triage, replies and internal notes."],
				["Client", "Access limited to their organization tickets, projects and profile."]
			].map(([role, description]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-md border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: role
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-subtle",
					children: description
				})]
			}, role))
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: ["Admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPage, {})
});
//#endregion
export { SplitComponent as component };
