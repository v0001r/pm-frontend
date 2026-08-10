import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as Slot, y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-Cc9Bh2Gp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var API_URL = "http://localhost:3001/api";
var ACCESS_KEY = "helpdesk.accessToken";
var REFRESH_KEY = "helpdesk.refreshToken";
var REMEMBER_KEY = "helpdesk.remember";
function getStorage(kind) {
	return kind === "session" ? sessionStorage : localStorage;
}
function resolveStorage() {
	try {
		if (localStorage.getItem(ACCESS_KEY)) return localStorage;
		if (sessionStorage.getItem(ACCESS_KEY)) return sessionStorage;
		return localStorage.getItem(REMEMBER_KEY) === "true" ? localStorage : sessionStorage;
	} catch {
		return localStorage;
	}
}
function getAccessToken() {
	try {
		return localStorage.getItem(ACCESS_KEY) ?? sessionStorage.getItem(ACCESS_KEY);
	} catch {
		return null;
	}
}
function getRefreshToken() {
	try {
		return localStorage.getItem(REFRESH_KEY) ?? sessionStorage.getItem(REFRESH_KEY);
	} catch {
		return null;
	}
}
function setTokens(tokens, remember) {
	const storage = getStorage(remember ? "local" : "session");
	const other = getStorage(remember ? "session" : "local");
	storage.setItem(ACCESS_KEY, tokens.accessToken);
	storage.setItem(REFRESH_KEY, tokens.refreshToken);
	storage.setItem(REMEMBER_KEY, String(remember));
	other.removeItem(ACCESS_KEY);
	other.removeItem(REFRESH_KEY);
	other.removeItem(REMEMBER_KEY);
}
function clearTokens() {
	localStorage.removeItem(ACCESS_KEY);
	localStorage.removeItem(REFRESH_KEY);
	localStorage.removeItem(REMEMBER_KEY);
	sessionStorage.removeItem(ACCESS_KEY);
	sessionStorage.removeItem(REFRESH_KEY);
	sessionStorage.removeItem(REMEMBER_KEY);
}
var api = axios.create({
	baseURL: API_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: false
});
api.interceptors.request.use((config) => {
	const token = getAccessToken();
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});
var refreshPromise = null;
async function refreshAccessToken() {
	const refreshToken = getRefreshToken();
	if (!refreshToken) return null;
	try {
		const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
		const payload = data.data;
		const remember = resolveStorage() === localStorage;
		setTokens({
			accessToken: payload.accessToken,
			refreshToken: payload.refreshToken,
			expiresIn: payload.expiresIn
		}, remember);
		return payload.accessToken;
	} catch {
		clearTokens();
		return null;
	}
}
api.interceptors.response.use((response) => response, async (error) => {
	const original = error.config;
	if (error.response?.status !== 401 || !original || original._retry) return Promise.reject(error);
	if (original.url?.includes("/auth/login") || original.url?.includes("/auth/refresh")) return Promise.reject(error);
	original._retry = true;
	if (!refreshPromise) refreshPromise = refreshAccessToken().finally(() => {
		refreshPromise = null;
	});
	const newToken = await refreshPromise;
	if (!newToken) {
		clearTokens();
		window.dispatchEvent(new Event("auth:logout"));
		return Promise.reject(error);
	}
	original.headers.Authorization = `Bearer ${newToken}`;
	return api(original);
});
function getApiErrorMessage(error, fallback = "Something went wrong") {
	if (axios.isAxiosError(error)) {
		const data = error.response?.data;
		if (data?.errors?.length) return data.errors.join(", ");
		if (data?.message) return data.message;
	}
	if (error instanceof Error) return error.message;
	return fallback;
}
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	const hydrate = (0, import_react.useCallback)(async () => {
		if (!getAccessToken()) {
			setUser(null);
			setReady(true);
			return;
		}
		try {
			const { data } = await api.get("/auth/me");
			setUser(data.data);
		} catch {
			clearTokens();
			setUser(null);
		} finally {
			setReady(true);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		const onLogout = () => {
			setUser(null);
		};
		window.addEventListener("auth:logout", onLogout);
		return () => window.removeEventListener("auth:logout", onLogout);
	}, []);
	const login = (0, import_react.useCallback)(async (email, password, remember) => {
		const { data } = await api.post("/auth/login", {
			email,
			password
		});
		const payload = data.data;
		setTokens({
			accessToken: payload.accessToken,
			refreshToken: payload.refreshToken,
			expiresIn: payload.expiresIn
		}, remember);
		const userWithFlags = {
			...payload.user,
			mustChangePassword: payload.mustChangePassword
		};
		setUser(userWithFlags);
		return userWithFlags;
	}, []);
	const logout = (0, import_react.useCallback)(async () => {
		const refreshToken = getRefreshToken();
		try {
			if (getAccessToken()) await api.post("/auth/logout", { refreshToken });
		} catch {} finally {
			clearTokens();
			setUser(null);
		}
	}, []);
	const refresh = (0, import_react.useCallback)(async () => {
		await hydrate();
	}, [hydrate]);
	const changePassword = (0, import_react.useCallback)(async (currentPassword, newPassword) => {
		try {
			await api.post("/auth/change-password", {
				currentPassword,
				newPassword
			});
		} catch (error) {
			throw new Error(getApiErrorMessage(error, "Unable to change password"));
		}
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		user,
		ready,
		login,
		logout,
		refresh,
		changePassword
	}), [
		user,
		ready,
		login,
		logout,
		refresh,
		changePassword
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
var homeFor = (role) => {
	switch (role) {
		case "Admin": return "/admin/dashboard";
		case "Staff": return "/staff/dashboard";
		case "Client": return "/client/dashboard";
	}
};
var isAdmin = (role) => role === "Admin";
async function forgotPassword(email) {
	const { data } = await api.post("/auth/forgot-password", { email });
	return data.data.message;
}
async function resetPassword(token, password) {
	const { data } = await api.post("/auth/reset-password", {
		token,
		password
	});
	return data.data.message;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-[0_1px_2px_rgb(79_70_229/0.2),0_4px_12px_-2px_rgb(79_70_229/0.35)] hover:bg-primary/92 hover:shadow-[0_2px_4px_rgb(79_70_229/0.2),0_8px_20px_-4px_rgb(79_70_229/0.4)] active:scale-[0.98]",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:scale-[0.98]",
			outline: "border border-border/80 bg-surface text-foreground shadow-sm hover:bg-accent hover:border-border active:scale-[0.98]",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:scale-[0.98]",
			ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
			link: "text-primary underline-offset-4 hover:underline font-medium"
		},
		size: {
			default: "h-10 px-4 py-2",
			sm: "h-9 rounded-md px-3 text-[13px]",
			lg: "h-11 rounded-md px-8",
			icon: "h-10 w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { cn as a, homeFor as c, useAuth as d, buttonVariants as i, isAdmin as l, Button as n, forgotPassword as o, api as r, getApiErrorMessage as s, AuthProvider as t, resetPassword as u };
