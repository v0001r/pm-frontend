export const SESSION_EXPIRED_MESSAGE = "Your session has expired. Please login again.";
export const SESSION_EXPIRED_EVENT = "auth:session-expired";

const GUEST_AUTH_PATHS = new Set(["/", "/forgot-password", "/reset-password", "/activate"]);

export function isGuestAuthPath(pathname: string) {
  const path = pathname.split("?")[0];
  return GUEST_AUTH_PATHS.has(path);
}

export function sanitizeReturnTo(path: string | undefined | null): string | undefined {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return undefined;
  }

  const pathname = path.split("?")[0];
  if (isGuestAuthPath(pathname)) {
    return undefined;
  }

  return path;
}

export function buildLoginSearch(options?: { expired?: boolean; redirect?: string }) {
  const search: Record<string, string> = {};

  if (options?.expired) {
    search.expired = "1";
  }

  const redirect = sanitizeReturnTo(options?.redirect);
  if (redirect) {
    search.redirect = redirect;
  }

  return search;
}

export function getCurrentReturnTo() {
  if (typeof window === "undefined") {
    return undefined;
  }

  return sanitizeReturnTo(`${window.location.pathname}${window.location.search}`);
}

let sessionExpiryInFlight = false;

export function isSessionExpiryInFlight() {
  return sessionExpiryInFlight;
}

export function notifySessionExpired(returnTo?: string) {
  if (typeof window === "undefined" || sessionExpiryInFlight) {
    return;
  }

  sessionExpiryInFlight = true;

  window.dispatchEvent(
    new CustomEvent(SESSION_EXPIRED_EVENT, {
      detail: { returnTo: sanitizeReturnTo(returnTo) ?? getCurrentReturnTo() },
    }),
  );
  window.dispatchEvent(new Event("auth:logout"));

  window.setTimeout(() => {
    sessionExpiryInFlight = false;
  }, 1000);
}
