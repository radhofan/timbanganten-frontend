import { InputHTMLAttributes, CSSProperties } from "react";

interface GovukInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const inputStyle: CSSProperties = {
  border: "2px solid #0b0c0c",
  padding: "0 10px",
  fontSize: "0.875rem",
  lineHeight: "1.25",
  color: "#0b0c0c",
  background: "#fff",
  outline: "none",
  height: 38,
  boxSizing: "border-box",
  display: "block",
};

export function GovukInput({ error, style, ...props }: GovukInputProps) {
  return (
    <input
      style={{
        ...inputStyle,
        ...(error ? { borderColor: "#d4351c" } : {}),
        ...style,
      }}
      {...props}
    />
  );
}
