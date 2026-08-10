import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { ApiResponse, AuthTokens, User } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

const ACCESS_KEY = "helpdesk.accessToken";
const REFRESH_KEY = "helpdesk.refreshToken";
const REMEMBER_KEY = "helpdesk.remember";

type StorageKind = "local" | "session";

function getStorage(kind?: StorageKind): Storage {
  return kind === "session" ? sessionStorage : localStorage;
}

function resolveStorage(): Storage {
  try {
    if (localStorage.getItem(ACCESS_KEY)) return localStorage;
    if (sessionStorage.getItem(ACCESS_KEY)) return sessionStorage;
    return localStorage.getItem(REMEMBER_KEY) === "true" ? localStorage : sessionStorage;
  } catch {
    return localStorage;
  }
}

export function getAccessToken(): string | null {
  try {
    return localStorage.getItem(ACCESS_KEY) ?? sessionStorage.getItem(ACCESS_KEY);
  } catch {
    return null;
  }
}

export function getRefreshToken(): string | null {
  try {
    return localStorage.getItem(REFRESH_KEY) ?? sessionStorage.getItem(REFRESH_KEY);
  } catch {
    return null;
  }
}

export function setTokens(tokens: AuthTokens, remember: boolean) {
  const storage = getStorage(remember ? "local" : "session");
  const other = getStorage(remember ? "session" : "local");

  storage.setItem(ACCESS_KEY, tokens.accessToken);
  storage.setItem(REFRESH_KEY, tokens.refreshToken);
  storage.setItem(REMEMBER_KEY, String(remember));

  other.removeItem(ACCESS_KEY);
  other.removeItem(REFRESH_KEY);
  other.removeItem(REMEMBER_KEY);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(REMEMBER_KEY);
  sessionStorage.removeItem(ACCESS_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
  sessionStorage.removeItem(REMEMBER_KEY);
}

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const { data } = await axios.post<ApiResponse<LoginResponseData>>(
      `${API_URL}/auth/refresh`,
      { refreshToken },
    );

    const payload = data.data;
    const remember = resolveStorage() === localStorage;
    setTokens(
      {
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        expiresIn: payload.expiresIn,
      },
      remember,
    );

    return payload.accessToken;
  } catch {
    clearTokens();
    return null;
  }
}

interface LoginResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  mustChangePassword?: boolean;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401 || !original || original._retry) {
      return Promise.reject(error);
    }

    if (original.url?.includes("/auth/login") || original.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }

    const newToken = await refreshPromise;
    if (!newToken) {
      clearTokens();
      window.dispatchEvent(new Event("auth:logout"));
      return Promise.reject(error);
    }

    original.headers.Authorization = `Bearer ${newToken}`;
    return api(original);
  },
);

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong") {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; errors?: string[] } | undefined;
    if (data?.errors?.length) return data.errors.join(", ");
    if (data?.message) return data.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

export type { LoginResponseData };
