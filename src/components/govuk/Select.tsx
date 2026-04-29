import { SelectHTMLAttributes, ReactNode, CSSProperties } from "react";

interface GovukSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  children?: ReactNode;
  options?: { value: string; label: string }[];
}

const selectStyle: CSSProperties = {
  border: "2px solid #0b0c0c",
  padding: "0 10px",
  fontSize: "0.875rem",
  lineHeight: "1.25",
  color: "#0b0c0c",
  background: "#fff",
  height: 38,
  boxSizing: "border-box",
  display: "block",
  cursor: "pointer",
};

export function GovukSelect({ error, children, options, style, ...props }: GovukSelectProps) {
  return (
    <select
      style={{
        ...selectStyle,
        ...(error ? { borderColor: "#d4351c" } : {}),
        ...style,
      }}
      {...props}
    >
      {options
        ? options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))
        : children}
    </select>
  );
}
