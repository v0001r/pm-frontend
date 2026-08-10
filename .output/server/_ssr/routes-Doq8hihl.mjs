import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as cn, c as homeFor, f as useAuth, n as Button, s as getApiErrorMessage } from "./button-DTh0UNAt.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as LoaderCircle, J as EyeOff, _ as ShieldCheck, ft as Check, q as Eye } from "../_libs/lucide-react.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Input } from "./input-DantDJEY.mjs";
import { a as fieldInputClass, n as FormField } from "./password-CG809Zkb.mjs";
import { n as AlertDescription, t as Alert } from "./alert-RArkaWol.mjs";
import { f as BrandLogo, m as GuestRoute } from "./guard-BUVsJOD-.mjs";
import { f as validateForm, l as loginSchema } from "./form-validation-n0pRSGP6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Doq8hihl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var demoAccounts = [
	{
		label: "Admin",
		email: "admin@helpdesk.io"
	},
	{
		label: "Staff",
		email: "elena@helpdesk.io"
	},
	{
		label: "Client",
		email: "client@acme.com"
	}
];
function LoginPage() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [remember, setRemember] = (0, import_react.useState)(true);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [apiError, setApiError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	function clearError(field) {
		setErrors((current) => {
			if (!current[field]) return current;
			const next = { ...current };
			delete next[field];
			return next;
		});
	}
	async function onSubmit(e) {
		e.preventDefault();
		setApiError("");
		const validation = validateForm(loginSchema, {
			email,
			password
		});
		if (!validation.success) {
			setErrors(validation.errors);
			return;
		}
		setErrors({});
		setLoading(true);
		try {
			const user = await login(email, password, remember);
			if (user.mustChangePassword) navigate({
				to: "/change-password",
				replace: true
			});
			else navigate({
				to: homeFor(user.role),
				replace: true
			});
		} catch (err) {
			setApiError(getApiErrorMessage(err, "Unable to sign in."));
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen lg:grid-cols-[1.1fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden flex-col justify-between overflow-hidden bg-[#0f172a] p-12 lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgb(79_70_229/0.35),transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_100%,rgb(14_165_233/0.15),transparent_50%)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "h-10 max-w-[220px]" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[2rem] leading-tight font-bold tracking-tight text-white",
							children: "One support desk for every client conversation."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-[15px] leading-relaxed text-slate-300",
							children: "Track tickets from intake to resolution with SLA timers, assignment workflows, internal notes and complete audit history — with strict separation between client and support access."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8",
							children: [
								["98.6%", "SLA adherence"],
								["4m 12s", "First response"],
								["24/7", "Coverage"]
							].map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-2xl font-bold tracking-tight text-white",
								children: v
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-xs font-medium text-slate-400",
								children: l
							})] }, l))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "relative text-xs text-slate-500",
					children: "© 2026 Miraki Technologies. All rights reserved."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "canvas flex items-center justify-center px-5 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-8 inline-flex rounded-lg bg-[#0f172a] px-4 py-3 lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "h-8 max-w-[200px]" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-[1.75rem] font-bold tracking-tight",
						children: "Sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[15px] text-muted-foreground",
						children: "Access your support workspace."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "panel mt-8 flex flex-col gap-5 p-6",
						noValidate: true,
						children: [
							apiError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
								variant: "destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: apiError })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Email address",
								htmlFor: "email",
								error: errors.email,
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									autoComplete: "email",
									value: email,
									onChange: (e) => {
										setEmail(e.target.value);
										clearError("email");
									},
									placeholder: "you@company.com",
									className: fieldInputClass(errors.email)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Password",
								htmlFor: "password",
								error: errors.password,
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "password",
										type: show ? "text" : "password",
										autoComplete: "current-password",
										value: password,
										onChange: (e) => {
											setPassword(e.target.value);
											clearError("password");
										},
										placeholder: "••••••••",
										className: cn("pr-10", fieldInputClass(errors.password))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShow((s) => !s),
										"aria-label": show ? "Hide password" : "Show password",
										className: "absolute top-1/2 right-2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground",
										children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked: remember,
										onCheckedChange: (v) => setRemember(v === true)
									}), "Remember me"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/forgot-password",
									className: "text-sm font-medium text-primary hover:underline",
									children: "Forgot password?"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: loading,
								className: "mt-1 h-11 w-full",
								children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), loading ? "Signing in…" : "Sign in"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel mt-6 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1.5 text-xs font-semibold text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-primary" }), " Demo accounts — password Password@123"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-col gap-1",
							children: demoAccounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setEmail(a.email);
									setPassword("Password@123");
								},
								className: "flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: a.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: a.email
								})]
							}, a.email))
						})]
					})
				]
			})
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginPage, {}) });
//#endregion
export { SplitComponent as component };
