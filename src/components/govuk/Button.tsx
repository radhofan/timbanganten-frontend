import { ButtonHTMLAttributes, ReactNode } from "react";

interface GovukButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "warning" | "start";
  isLoading?: boolean;
  children: ReactNode;
}

export function GovukButton({
  variant = "primary",
  isLoading,
  children,
  className = "",
  disabled,
  ...props
}: GovukButtonProps) {
  const variantClass =
    variant === "secondary"
      ? "govuk-button--secondary"
      : variant === "warning"
      ? "govuk-button--warning"
      : variant === "start"
      ? "govuk-button--start"
      : "";

  return (
    <button
      className={`govuk-button ${variantClass} ${className}`.trim()}
      data-module="govuk-button"
      disabled={isLoading || disabled}
      aria-disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? "Memuat..." : children}
    </button>
  );
}
