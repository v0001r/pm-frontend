import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as useAuth, n as Button, s as getApiErrorMessage } from "./button-Cc9Bh2Gp.mjs";
import { F as Lock, gt as Bell, r as User } from "../_libs/lucide-react.mjs";
import { a as PageHeader, d as SectionCard, g as fullName, h as UserAvatar } from "./primitives-BneTjl1i.mjs";
import { d as formatDate } from "./store-CZmg1Lwb.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-Cku46GUo.mjs";
import { t as Label } from "./label-BZKlnMd2.mjs";
import { _ as RequireRole } from "./guard-BAnzMztv.mjs";
import { i as TabsPanelTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-5bUW-pkO.mjs";
import { p as updateOwnProfile, s as fetchOwnProfile } from "./internal-users-BgPtnBI9.mjs";
import { n as PasswordStrength, t as PasswordField } from "./password-DB11OHyl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-DuRPpT5Q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { user, changePassword } = useAuth();
	const queryClient = useQueryClient();
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [current, setCurrent] = (0, import_react.useState)("");
	const [changing, setChanging] = (0, import_react.useState)(false);
	const [phone, setPhone] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const profileQuery = useQuery({
		queryKey: ["own-profile"],
		queryFn: fetchOwnProfile,
		enabled: user?.role === "Admin" || user?.role === "Staff"
	});
	const profileMutation = useMutation({
		mutationFn: () => updateOwnProfile({
			phone,
			address
		}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["own-profile"] });
			toast.success("Profile updated.");
		},
		onError: (err) => toast.error(getApiErrorMessage(err, "Failed to update profile"))
	});
	if (!user) return null;
	const displayUser = profileQuery.data ?? user;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Profile & settings",
		description: "Your account details and preferences."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "details",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
					value: "details",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {}),
					title: "Details",
					description: "Personal information"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
					value: "security",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {}),
					title: "Security",
					description: "Password and login"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsPanelTrigger, {
					value: "notifications",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {}),
					title: "Notifications",
					description: "Email preferences"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "details",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Personal information",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid gap-4 p-4 sm:grid-cols-2",
						onSubmit: (e) => {
							e.preventDefault();
							if (user.role === "Client") {
								toast.info("Client profile updates are managed by your organization.");
								return;
							}
							profileMutation.mutate();
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
									name: fullName(displayUser),
									hue: displayUser.avatarHue,
									size: 48
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: fullName(displayUser)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: ["Member since ", formatDate(displayUser.createdAt)]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "First name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: displayUser.firstName ?? "",
									disabled: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Last name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: displayUser.lastName ?? "",
									disabled: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: displayUser.email,
									disabled: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "phone",
									children: "Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "phone",
									value: phone || displayUser.phone,
									onChange: (e) => setPhone(e.target.value),
									disabled: user.role === "Client"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "address",
									children: "Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "address",
									value: address || displayUser.address || "",
									onChange: (e) => setAddress(e.target.value),
									disabled: user.role === "Client"
								})]
							}),
							user.role !== "Client" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end gap-2 sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									type: "submit",
									disabled: profileMutation.isPending,
									children: profileMutation.isPending ? "Saving..." : "Save changes"
								})
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "security",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Change password",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid max-w-md gap-4 p-4",
						onSubmit: async (e) => {
							e.preventDefault();
							if (password !== confirm) {
								toast.error("Passwords do not match.");
								return;
							}
							if (password.length < 8) {
								toast.error("Password must be at least 8 characters.");
								return;
							}
							setChanging(true);
							try {
								await changePassword(current, password);
								setCurrent("");
								setPassword("");
								setConfirm("");
								toast.success("Password updated.");
							} catch (err) {
								toast.error(err instanceof Error ? err.message : "Unable to change password.");
							} finally {
								setChanging(false);
							}
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
								id: "current",
								label: "Current password",
								value: current,
								onChange: setCurrent,
								autoComplete: "current-password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
									id: "new",
									label: "New password",
									value: password,
									onChange: setPassword,
									autoComplete: "new-password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordStrength, { value: password })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
								id: "confirm",
								label: "Confirm new password",
								value: confirm,
								onChange: setConfirm,
								autoComplete: "new-password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									type: "submit",
									disabled: changing,
									children: changing ? "Updating…" : "Update password"
								})
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "notifications",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Email preferences",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-4 text-sm text-muted-foreground",
						children: "Notification preferences will be available in a future update."
					})
				})
			})
		]
	})] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
	roles: [
		"Admin",
		"Staff",
		"Client"
	],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilePage, {})
});
//#endregion
export { SplitComponent as component };
