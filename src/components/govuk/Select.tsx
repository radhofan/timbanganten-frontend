import { SelectHTMLAttributes, ReactNode } from "react";

interface GovukSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  children: ReactNode;
}

export function GovukSelect({ error, className = "", children, ...props }: GovukSelectProps) {
  return (
    <select
      className={`govuk-select ${error ? "govuk-select--error" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </select>
  );
}
