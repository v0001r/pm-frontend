import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn } from "./button-DTh0UNAt.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide whitespace-nowrap transition-colors duration-150", {
	variants: { variant: {
		default: "border-primary/20 bg-primary/10 text-primary",
		secondary: "border-border bg-muted text-muted-foreground",
		destructive: "border-destructive/20 bg-destructive/10 text-destructive",
		success: "border-success/25 bg-success/10 text-success",
		warning: "border-warning/25 bg-warning/10 text-warning",
		info: "border-info/20 bg-info/10 text-info",
		outline: "border-border bg-transparent text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
