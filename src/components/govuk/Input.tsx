import { InputHTMLAttributes } from "react";

interface GovukInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  width?: "full" | "three-quarters" | "two-thirds" | "one-half" | "one-third" | "one-quarter" | "20" | "10" | "5" | "4" | "3" | "2";
}

export function GovukInput({ error, width, className = "", ...props }: GovukInputProps) {
  const widthClass = width ? `govuk-input--width-${width}` : "";
  return (
    <input
      className={`govuk-input ${error ? "govuk-input--error" : ""} ${widthClass} ${className}`.trim()}
      {...props}
    />
  );
}
