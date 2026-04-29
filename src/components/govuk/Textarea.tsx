import { TextareaHTMLAttributes } from "react";

interface GovukTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function GovukTextarea({ error, className = "", ...props }: GovukTextareaProps) {
  return (
    <textarea
      className={`govuk-textarea ${error ? "govuk-textarea--error" : ""} ${className}`.trim()}
      {...props}
    />
  );
}
