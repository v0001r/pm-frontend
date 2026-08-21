import { useEffect } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  buildLoginSearch,
  isGuestAuthPath,
  SESSION_EXPIRED_EVENT,
} from "@/lib/session-expiry";

export function SessionExpiryHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onSessionExpired = (event: Event) => {
      const detail = (event as CustomEvent<{ returnTo?: string }>).detail;

      if (location.pathname === "/" && (location.search as { expired?: boolean }).expired) {
        return;
      }

      if (isGuestAuthPath(location.pathname)) {
        return;
      }

      void navigate({
        to: "/",
        replace: true,
        search: buildLoginSearch({
          expired: true,
          redirect: detail?.returnTo,
        }),
      });
    };

    window.addEventListener(SESSION_EXPIRED_EVENT, onSessionExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onSessionExpired);
  }, [location.pathname, navigate]);

  return null;
}
