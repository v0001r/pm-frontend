import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  api,
  clearTokens,
  getAccessToken,
  getApiErrorMessage,
  getRefreshToken,
  setTokens,
  type LoginResponseData,
} from "./api";
import type { ApiResponse, Role, User } from "./types";

interface AuthValue {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<User>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const hydrate = useCallback(async () => {
    if (!getAccessToken()) {
      setUser(null);
      setReady(true);
      return;
    }

    try {
      const { data } = await api.get<ApiResponse<User>>("/auth/me");
      setUser(data.data);
    } catch {
      clearTokens();
      setUser(null);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    const onLogout = () => {
      setUser(null);
    };
    window.addEventListener("auth:logout", onLogout);
    return () => window.removeEventListener("auth:logout", onLogout);
  }, []);

  const login = useCallback(async (email: string, password: string, remember: boolean) => {
    const { data } = await api.post<ApiResponse<LoginResponseData>>("/auth/login", {
      email,
      password,
    });

    const payload = data.data;
    setTokens(
      {
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        expiresIn: payload.expiresIn,
      },
      remember,
    );
    const userWithFlags = { ...payload.user, mustChangePassword: payload.mustChangePassword };
    setUser(userWithFlags);
    return userWithFlags;
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken();
    try {
      if (getAccessToken()) {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch {
      /* session already invalid */
    } finally {
      clearTokens();
      setUser(null);
    }
  }, []);

  const refresh = useCallback(async () => {
    await hydrate();
  }, [hydrate]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      await api.post("/auth/change-password", { currentPassword, newPassword });
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to change password"));
    }
  }, []);

  const value = useMemo<AuthValue>(
    () => ({ user, ready, login, logout, refresh, changePassword }),
    [user, ready, login, logout, refresh, changePassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export const homeFor = (role: Role): string => {
  switch (role) {
    case "Admin":
      return "/admin/dashboard";
    case "Staff":
      return "/staff/dashboard";
    case "Client":
      return "/client/dashboard";
  }
};

export const isStaff = (role?: Role) => role === "Admin" || role === "Staff";
export const isAdmin = (role?: Role) => role === "Admin";

export async function forgotPassword(email: string) {
  const { data } = await api.post<ApiResponse<{ message: string }>>("/auth/forgot-password", {
    email,
  });
  return data.data.message;
}

export async function resetPassword(token: string, password: string) {
  const { data } = await api.post<ApiResponse<{ message: string }>>("/auth/reset-password", {
    token,
    password,
  });
  return data.data.message;
}

export interface ActivationTokenValidation {
  valid: boolean;
  status: "valid" | "invalid" | "expired" | "used";
  accountType?: "customer" | "staff";
  expiresAt?: string;
  expiresInHours?: number;
  message?: string;
  errorCode?: string;
}

export async function validateActivationToken(token: string) {
  const { data } = await api.get<ApiResponse<ActivationTokenValidation>>("/auth/activate/validate", {
    params: { token },
  });
  return data.data;
}

export async function activateAccount(token: string, password: string) {
  const { data } = await api.post<ApiResponse<{ message: string }>>("/auth/activate", { token, password });
  return data.data.message;
}
