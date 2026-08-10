import { cn } from "@/lib/utils";

export const MIRAKI_LOGO_SRC = "/miraki-logo.png";

interface BrandLogoProps {
  variant?: "full" | "mark";
  className?: string;
}

export function BrandLogo({ variant = "full", className }: BrandLogoProps) {
  return (
    <img
      src={MIRAKI_LOGO_SRC}
      alt="Miraki Technologies"
      className={cn(
        "block object-contain object-left",
        variant === "full" ? "h-8 w-auto max-w-full" : "h-9 w-10 object-cover",
        className,
      )}
    />
  );
}
