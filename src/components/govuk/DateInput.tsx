import { InputHTMLAttributes } from "react";

interface GovukDateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  id: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
}

export function GovukDateInput({ id, value, onChange, error, style, ...props }: GovukDateInputProps) {
  return (
    <input
      className={`govuk-input ${error ? "govuk-input--error" : ""}`.trim()}
      type="date"
      id={id}
      name={id}
      value={value || ""}
      onChange={(e) => onChange?.(e.target.value)}
      style={{ width: "100%", ...style }}
      {...props}
    />
  );
}
