import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn, c as homeFor, d as useAuth, i as buttonVariants, n as Button } from "./button-Cc9Bh2Gp.mjs";
import { d as useRouterState, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Plus, D as PanelLeftClose, E as PanelLeftOpen, H as FolderKanban, L as LifeBuoy, O as Moon, P as LogOut, R as LayoutDashboard, S as Search, V as Inbox, Y as Circle, a as UserRound, b as Settings, et as ChevronRight, f as Ticket, it as ChartColumn, j as Menu, lt as Bell, n as Users, nt as ChevronDown, p as Sun, rt as Check, s as UserCog, t as X, v as ShieldCheck, z as KeyRound } from "../_libs/lucide-react.mjs";
import { h as fullName, m as UserAvatar } from "./primitives-rWqtcPGP.mjs";
import { _ as DialogTrigger, a as Overlay2, c as Title2, d as DialogClose, f as DialogContent, g as DialogTitle, h as DialogPortal, i as Description2, l as Trigger2, m as DialogOverlay, n as Cancel, o as Portal2, p as DialogDescription, r as Content2, s as Root2, t as Action, u as Dialog } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as Label2, c as Root2$1, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2$1, o as Portal2$1, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { c as useStore, i as findUser, n as actions, o as relativeTime, r as categoryName } from "./store-rjYLW1Ml.mjs";
import { t as Input } from "./input-Cku46GUo.mjs";
import { i as Trigger$1, n as Portal, r as Root2$2, t as Content2$2 } from "../_libs/radix-ui__react-popover.mjs";
import { a as Trigger$2, i as Root3, n as Portal$1, r as Provider, t as Content2$3 } from "../_libs/radix-ui__react-tooltip.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guard-Da2hUi3G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var Popover = Root2$2;
var PopoverTrigger = Trigger$1;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2$2.displayName;
var TooltipProvider = Provider;
var Tooltip = Root3;
var TooltipTrigger = Trigger$2;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$3, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)", className),
	...props
}) }));
TooltipContent.displayName = Content2$3.displayName;
var DropdownMenu = Root2$1;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2$1.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
var adminNav = [
	{
		label: "Dashboard",
		to: "/admin/dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		label: "Projects",
		to: "/admin/projects",
		icon: FolderKanban
	},
	{
		label: "Tickets",
		to: "/admin/tickets",
		icon: Ticket
	},
	{
		label: "Create Ticket",
		to: "/admin/tickets/new",
		icon: Plus
	},
	{
		label: "Customers",
		to: "/admin/customers",
		icon: Users
	},
	{
		label: "Users",
		to: "/admin/users",
		icon: UserCog
	},
	{
		label: "Reports",
		to: "/admin/reports",
		icon: ChartColumn
	},
	{
		label: "Settings",
		to: "/admin/settings",
		icon: Settings
	}
];
var agentNav = [
	{
		label: "Dashboard",
		to: "/staff/dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		label: "Projects",
		to: "/admin/projects",
		icon: FolderKanban
	},
	{
		label: "Tickets",
		to: "/admin/tickets",
		icon: Ticket
	},
	{
		label: "Create Ticket",
		to: "/admin/tickets/new",
		icon: Plus
	},
	{
		label: "Customers",
		to: "/admin/customers",
		icon: Users
	}
];
var clientNav = [
	{
		label: "Dashboard",
		to: "/client/dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		label: "My Projects",
		to: "/portal/projects",
		icon: FolderKanban
	},
	{
		label: "My Tickets",
		to: "/portal/tickets",
		icon: Ticket
	},
	{
		label: "Create Ticket",
		to: "/portal/tickets/new",
		icon: Plus
	}
];
function navItemClasses(active, collapsed) {
	return cn("relative flex items-center gap-2.5 rounded-md text-[13px] font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sidebar-ring/40 focus-visible:outline-none", collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5", active ? "bg-primary text-primary-foreground shadow-sm" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-active-foreground");
}
function NavIcon({ icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		className: "size-[18px] shrink-0 stroke-[1.75]",
		"aria-hidden": true
	});
}
function NavList({ items, onNavigate, collapsed = false }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: cn("flex flex-col gap-0.5", collapsed ? "px-2" : "px-1"),
		"aria-label": "Main",
		children: items.map((item) => {
			const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
			const link = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				"aria-current": active ? "page" : void 0,
				"aria-label": collapsed ? item.label : void 0,
				className: navItemClasses(active, collapsed),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavIcon, { icon: item.icon }),
					!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: item.label
					}),
					!collapsed && active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto size-4 shrink-0 opacity-90" }) : null
				]
			}, item.to);
			if (!collapsed) return link;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
				asChild: true,
				children: link
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
				side: "right",
				children: item.label
			})] }, item.to);
		})
	});
}
function Brand({ collapsed = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex h-14 items-center gap-2.5 border-b border-sidebar-border", collapsed ? "justify-center px-2" : "px-4"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-8 shrink-0 place-items-center rounded-md bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, {
				className: "size-4",
				strokeWidth: 2
			})
		}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-sm font-bold tracking-tight text-sidebar-active-foreground",
				children: "Helpdesk"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-[10px] font-medium text-sidebar-section-foreground",
				children: "Enterprise"
			})]
		})]
	});
}
function useTheme() {
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem("helpdesk-theme");
		const isDark = stored ? stored === "dark" : false;
		setDark(isDark);
		document.documentElement.classList.toggle("dark", isDark);
	}, []);
	const toggle = () => {
		setDark((prev) => {
			const next = !prev;
			document.documentElement.classList.toggle("dark", next);
			localStorage.setItem("helpdesk-theme", next ? "dark" : "light");
			return next;
		});
	};
	return {
		dark,
		toggle
	};
}
function ThemeToggle() {
	const { dark, toggle } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			className: "rounded-lg",
			onClick: toggle,
			"aria-label": dark ? "Switch to light theme" : "Switch to dark theme",
			children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4.5" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: dark ? "Light mode" : "Dark mode" })] });
}
var crumbLabels = {
	admin: "Admin",
	portal: "Portal",
	tickets: "Tickets",
	projects: "Projects",
	members: "Members",
	edit: "Edit",
	clients: "Clients",
	customers: "Customers",
	team: "Support Team",
	reports: "Reports",
	audit: "Audit Logs",
	notifications: "Notifications",
	settings: "Settings",
	profile: "Profile",
	help: "Help",
	new: "New ticket"
};
function Breadcrumbs() {
	const parts = useRouterState({ select: (s) => s.location.pathname }).split("/").filter(Boolean);
	if (parts.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Breadcrumb",
		className: "hidden min-w-0 items-center gap-1.5 text-[13px] md:flex",
		children: parts.map((part, i) => {
			const href = `/${parts.slice(0, i + 1).join("/")}`;
			const label = crumbLabels[part] ?? (part.length > 14 ? `${part.slice(0, 10)}…` : part);
			const last = i === parts.length - 1;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5 shrink-0 text-muted-foreground" }), last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate font-medium text-foreground",
					children: label
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: href,
					className: "truncate text-muted-foreground transition-colors hover:text-foreground",
					children: label
				})]
			}, href);
		})
	});
}
function GlobalSearch() {
	const { user } = useAuth();
	const [q, setQ] = (0, import_react.useState)("");
	const store = useStore((s) => s);
	const results = (0, import_react.useMemo)(() => {
		const term = q.trim().toLowerCase();
		if (!term) return [];
		return (user?.role === "Client" ? store.tickets.filter((t) => t.clientId === user.id) : store.tickets).filter((t) => {
			const client = findUser(store, t.clientId);
			const agent = findUser(store, t.assignedTo);
			return [
				t.number,
				t.subject,
				client ? fullName(client) : "",
				client?.email ?? "",
				categoryName(store, t.categoryId),
				agent ? fullName(agent) : ""
			].join(" ").toLowerCase().includes(term);
		}).slice(0, 6);
	}, [
		q,
		store,
		user
	]);
	const base = user?.role === "Client" ? "/portal/tickets" : "/admin/tickets";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full max-w-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search tickets, clients, agents…",
				"aria-label": "Global search",
				className: "h-10 rounded-xl border-border/60 bg-muted/40 pl-9 shadow-none focus-visible:bg-surface"
			}),
			results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel absolute top-12 z-50 w-full overflow-hidden p-1.5 shadow-raised",
				children: results.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: `${base}/$ticketId`,
					params: { ticketId: t.id },
					onClick: () => setQ(""),
					className: "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-hover",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular text-xs text-muted-foreground",
						children: t.number
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2",
						children: t.subject
					})]
				}, t.id))
			})
		]
	});
}
function NotificationBell() {
	const { user } = useAuth();
	const all = useStore((s) => s.notifications);
	const notifications = (0, import_react.useMemo)(() => all.filter((n) => n.userId === user?.id), [all, user?.id]);
	const unread = notifications.filter((n) => !n.read).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon",
			className: "relative size-10 rounded-xl",
			"aria-label": "Notifications",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4.5" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-1 right-1 grid size-4 place-items-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground",
				children: unread
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
		align: "end",
		className: "w-88 rounded-2xl border-border/60 p-0 shadow-raised",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				children: "Notifications"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => user && actions.markNotificationsRead(user.id),
				children: "Mark all read"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-80 overflow-y-auto",
			children: [notifications.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-10 text-center text-sm text-muted-foreground",
				children: "You have no notifications."
			}), notifications.slice(0, 8).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("border-b px-4 py-3 transition-colors last:border-0 hover:bg-hover", !n.read && "bg-primary-soft"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "mt-0.5 size-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: n.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: n.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: relativeTime(n.createdAt)
							})
						]
					})]
				})
			}, n.id))]
		})]
	})] });
}
function ProfileMenu() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	if (!user) return null;
	const name = fullName(user);
	const items = [
		{
			label: "My Profile",
			icon: UserRound,
			tab: "profile"
		},
		{
			label: "Account Settings",
			icon: Settings,
			tab: "account"
		},
		{
			label: "Security",
			icon: ShieldCheck,
			tab: "security"
		},
		{
			label: "Notifications",
			icon: Bell,
			tab: "notifications"
		},
		{
			label: "Change Password",
			icon: KeyRound,
			tab: "security"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "flex items-center gap-2.5 rounded-xl border border-transparent px-2 py-1.5 transition-all hover:border-border/60 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, {
					name,
					hue: user.avatarHue,
					size: 32
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "hidden text-left sm:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-medium leading-tight",
						children: name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs text-muted-foreground",
						children: user.role
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5 text-muted-foreground" })
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		className: "w-56 rounded-2xl border-border/60 p-1.5 shadow-raised",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				children: name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-normal text-muted-foreground",
				children: user.email
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onSelect: () => navigate({
					to: "/profile",
					search: { tab: item.tab }
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
			}, item.label)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onSelect: () => navigate({ to: "/help" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, { className: "size-4" }), "Help & Support"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				className: "text-destructive focus:text-destructive",
				onSelect: () => setConfirm(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), "Logout"]
			})
		]
	})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open: confirm,
		onOpenChange: setConfirm,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Are you sure you want to log out?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Your current session will be ended and you will be returned to the login page." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
			onClick: async () => {
				await logout();
				navigate({
					to: "/",
					replace: true
				});
			},
			children: "Logout"
		})] })] })
	})] });
}
function AppShell({ children }) {
	const { user } = useAuth();
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const items = user?.role === "Client" ? clientNav : user?.role === "Staff" ? agentNav : adminNav;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
		delayDuration: 200,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-dvh w-full canvas",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cn("sticky top-0 z-30 hidden h-dvh shrink-0 flex-col border-r border-sidebar-border/80 bg-sidebar shadow-[4px_0_24px_-12px_rgb(15_23_42/0.08)] transition-[width] duration-300 ease-out lg:flex", collapsed ? "w-[68px]" : "w-[210px]"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { collapsed }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-1 flex-col overflow-y-auto py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, {
							items,
							collapsed
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-sidebar-border p-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setCollapsed((c) => !c),
							"aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
							className: cn("h-8 w-full justify-start gap-2 rounded-md px-2.5 text-xs font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-active-foreground", collapsed && "justify-center px-0"),
							children: [collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "size-4 stroke-[1.75]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "size-4 stroke-[1.75]" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Collapse" })]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "glass sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border/50 px-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open: mobileOpen,
							onOpenChange: setMobileOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "rounded-lg lg:hidden",
									"aria-label": "Open menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
								side: "left",
								className: "w-72 border-sidebar-border bg-sidebar p-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
										className: "sr-only",
										children: "Navigation"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "py-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, {
											items,
											onNavigate: () => setMobileOpen(false)
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ml-auto hidden flex-1 justify-end sm:flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalSearch, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-1 sm:ml-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "sm",
									className: "hidden h-10 rounded-lg sm:inline-flex",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: user?.role === "Client" ? "/portal/tickets/new" : "/admin/tickets/new",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New ticket"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBell, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileMenu, {})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1 p-4 sm:p-6 lg:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex max-w-[1400px] flex-col gap-7",
						children
					})
				})]
			})]
		})
	});
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
function AuthLoading() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col gap-4 p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-56" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 w-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full" })
		]
	});
}
function RequireRole({ roles, children }) {
	const { user, ready } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		if (!user) {
			navigate({
				to: "/",
				replace: true
			});
			return;
		}
		if (!roles.includes(user.role)) navigate({
			to: "/unauthorized",
			replace: true
		});
	}, [
		ready,
		user,
		roles,
		navigate
	]);
	if (!ready || !user || !roles.includes(user.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLoading, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children });
}
function GuestRoute({ children }) {
	const { user, ready } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!ready || !user) return;
		navigate({
			to: homeFor(user.role),
			replace: true
		});
	}, [
		ready,
		user,
		navigate
	]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLoading, {});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLoading, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function AdminRoute({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		roles: ["Admin"],
		children
	});
}
function StaffRoute({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		roles: ["Staff"],
		children
	});
}
function ClientRoute({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		roles: ["Client"],
		children
	});
}
function AdminOrStaffRoute({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
		roles: ["Admin", "Staff"],
		children
	});
}
//#endregion
export { StaffRoute as C, RequireRole as S, DropdownMenuTrigger as _, AlertDialogCancel as a, PopoverContent as b, AlertDialogFooter as c, AlertDialogTrigger as d, ClientRoute as f, DropdownMenuSeparator as g, DropdownMenuItem as h, AlertDialogAction as i, AlertDialogHeader as l, DropdownMenuContent as m, AdminRoute as n, AlertDialogContent as o, DropdownMenu as p, AlertDialog as r, AlertDialogDescription as s, AdminOrStaffRoute as t, AlertDialogTitle as u, GuestRoute as v, TooltipProvider as w, PopoverTrigger as x, Popover as y };
