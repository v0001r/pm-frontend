import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as Button } from "./button-DTh0UNAt.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { lt as ChevronRight, u as TriangleAlert } from "../_libs/lucide-react.mjs";
import { l as SLA_MATRIX, r as PRIORITIES } from "./primitives-CPmujTLD.mjs";
import { s as TICKET_CATEGORIES } from "./store-Daxm1pxW.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as SettingsToggleRow, O as Switch, S as SettingsShell, T as settingsSectionMeta, b as SettingsField, ct as SelectItem, dt as Table, ft as TableBody, gt as TableRow, ht as TableHeader, lt as SelectTrigger, mt as TableHead, ot as Select, pt as TableCell, st as SelectContent, ut as SelectValue, v as Route$29, w as SettingsUploadBox, x as SettingsPageHeader, y as SettingsCard } from "./router-CtVrCs4M.mjs";
import { t as Input } from "./input-DantDJEY.mjs";
import { h as MIRAKI_LOGO_SRC, y as RequireRole } from "./guard-BUVsJOD-.mjs";
import { t as Badge } from "./badge-CkMT0WTd.mjs";
import { t as Textarea } from "./textarea-DFS1bTE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-BNpLjHIo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var defaultCompanyForm = {
	companyName: "Miraki Technologies",
	supportEmail: "support@miraki.io",
	contactNumber: "+1 800 555 0110",
	website: "https://miraki.io",
	address: "1200 Enterprise Blvd, Suite 400\nSan Francisco, CA 94105",
	timezone: "America/Los_Angeles",
	dateFormat: "MM/DD/YYYY",
	language: "en-US",
	currency: "USD",
	numberFormat: "1,234.56"
};
function SettingsPage() {
	const navigate = useNavigate();
	const { section = "company" } = Route$29.useSearch();
	const meta = settingsSectionMeta[section];
	const [companyForm, setCompanyForm] = (0, import_react.useState)(defaultCompanyForm);
	const [prefs, setPrefs] = (0, import_react.useState)({
		agentSignup: true,
		emailVerification: true,
		timeTracking: true,
		publicPortal: true,
		attachments: true,
		dataExport: true,
		twoFactor: false
	});
	function setSection(next) {
		navigate({
			to: "/admin/settings",
			search: { section: next },
			replace: true
		});
	}
	function updateCompany(key, value) {
		setCompanyForm((current) => ({
			...current,
			[key]: value
		}));
	}
	function saveChanges() {
		toast.success("Settings saved.");
	}
	function resetCompanyForm() {
		setCompanyForm(defaultCompanyForm);
		toast.message("Changes discarded.");
	}
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
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					onClick: saveChanges,
					children: "Save changes"
				})] }) : null
			}),
			section === "company" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanySettings, {
				form: companyForm,
				prefs,
				onChange: updateCompany,
				onPrefChange: setPrefs
			}) : null,
			section === "tickets-sla" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketsSlaSettings, {}) : null,
			section === "ticket-categories" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketCategoriesSettings, {}) : null,
			section === "notifications" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsSettings, {}) : null,
			section === "users-roles" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRolesSettings, {}) : null
		]
	})] });
}
function CompanySettings({ form, prefs, onChange, onPrefChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsCard, {
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
							previewSrc: MIRAKI_LOGO_SRC
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsUploadBox, {
							label: "Favicon",
							hint: "Click to upload"
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
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsCard, {
				title: "Regional Settings",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
							label: "Language",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.language,
								onValueChange: (value) => onChange("language", value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "en-US",
										children: "English (US)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "en-GB",
										children: "English (UK)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "es-ES",
										children: "Spanish"
									})
								] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
							label: "Currency",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.currency,
								onValueChange: (value) => onChange("currency", value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "USD",
										children: "USD — US Dollar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "EUR",
										children: "EUR — Euro"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "GBP",
										children: "GBP — British Pound"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "INR",
										children: "INR — Indian Rupee"
									})
								] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsField, {
							label: "Number format",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.numberFormat,
								onValueChange: (value) => onChange("numberFormat", value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "1,234.56",
										children: "1,234.56"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "1.234,56",
										children: "1.234,56"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "1 234,56",
										children: "1 234,56"
									})
								] })]
							})
						})
					]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsCard, {
				title: "System Preferences",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsToggleRow, {
							title: "Allow agent sign up",
							description: "Let support agents self-register with an invite link.",
							checked: prefs.agentSignup,
							onCheckedChange: (checked) => onPrefChange((current) => ({
								...current,
								agentSignup: checked
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsToggleRow, {
							title: "Require email verification",
							description: "Users must verify email before accessing the portal.",
							checked: prefs.emailVerification,
							onCheckedChange: (checked) => onPrefChange((current) => ({
								...current,
								emailVerification: checked
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsToggleRow, {
							title: "Enable time tracking",
							description: "Track hours logged against projects and tickets.",
							checked: prefs.timeTracking,
							onCheckedChange: (checked) => onPrefChange((current) => ({
								...current,
								timeTracking: checked
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsToggleRow, {
							title: "Enable public ticket portal",
							description: "Allow clients to submit and track tickets online.",
							checked: prefs.publicPortal,
							onCheckedChange: (checked) => onPrefChange((current) => ({
								...current,
								publicPortal: checked
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsToggleRow, {
							title: "Allow file attachments",
							description: "Clients and agents can attach files to tickets.",
							checked: prefs.attachments,
							onCheckedChange: (checked) => onPrefChange((current) => ({
								...current,
								attachments: checked
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsToggleRow, {
							title: "Data export",
							description: "Allow admins to export ticket and customer data.",
							checked: prefs.dataExport,
							onCheckedChange: (checked) => onPrefChange((current) => ({
								...current,
								dataExport: checked
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsToggleRow, {
							title: "Enable two-factor authentication",
							description: "Require 2FA for all admin and staff accounts.",
							checked: prefs.twoFactor,
							onCheckedChange: (checked) => onPrefChange((current) => ({
								...current,
								twoFactor: checked
							}))
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-md border border-destructive/30 bg-destructive/5 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-destructive/20 px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold",
							children: "Danger Zone"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-subtle",
						children: "Irreversible actions that affect your entire organization."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Permanently delete your organization and all associated data."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						className: "border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive",
						onClick: () => toast.error("Account deletion is disabled in this demo."),
						children: "Delete account"
					})]
				})]
			})]
		})]
	});
}
function TicketsSlaSettings() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsCard, {
		title: "Priority-based SLA targets",
		description: "Response and resolution targets by priority level.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
			className: "hover:bg-transparent",
			children: [
				"Priority",
				"Response time",
				"Resolution time"
			].map((heading) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: heading }, heading))
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: PRIORITIES.map((priority) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-semibold",
				children: priority
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: SLA_MATRIX[priority].response }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: SLA_MATRIX[priority].resolution })
		] }, priority)) })] })
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsCard, {
		title: "Notification channels",
		description: "Email delivery connects to a provider in production.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y",
			children: [
				"New ticket",
				"Ticket reply",
				"Status change",
				"Ticket assignment",
				"Ticket resolution",
				"SLA breach"
			].map((name, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: ["Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: index !== 5 })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: ["In-app ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: true })]
					})]
				})]
			}, name))
		})
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
