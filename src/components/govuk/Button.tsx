import { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

interface GovukButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "warning" | "start";
  isLoading?: boolean;
  children: ReactNode;
}

const base: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "inherit",
  fontWeight: 700,
  fontSize: "0.875rem",
  lineHeight: "1.25",
  padding: "0 14px",
  height: 38,
  boxSizing: "border-box",
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
  whiteSpace: "nowrap",
  position: "relative",
  top: 0,
};

const variants: Record<string, CSSProperties> = {
  primary: {
    background: "#00703c",
    color: "#fff",
    boxShadow: "0 2px 0 #004e2a",
  },
  secondary: {
    background: "#f3f2f1",
    color: "#0b0c0c",
    boxShadow: "0 2px 0 #929191",
  },
  warning: {
    background: "#d4351c",
    color: "#fff",
    boxShadow: "0 2px 0 #55130b",
  },
  start: {
    background: "#00703c",
    color: "#fff",
    boxShadow: "0 2px 0 #004e2a",
    fontSize: "1.125rem",
    padding: "0 20px",
    height: 46,
  },
};

const disabledStyle: CSSProperties = {
  opacity: 0.5,
  cursor: "not-allowed",
  pointerEvents: "none",
};

export function GovukButton({
  variant = "primary",
  isLoading,
  children,
  disabled,
  style,
  ...props
}: GovukButtonProps) {
  const combined: CSSProperties = {
    ...base,
    ...variants[variant],
    ...(disabled || isLoading ? disabledStyle : {}),
    ...style,
  };

  return (
    <button
      style={combined}
      disabled={isLoading || disabled}
      aria-disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? "Memuat..." : children}
    </button>
  );
}
