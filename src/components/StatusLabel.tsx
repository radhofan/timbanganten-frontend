import React from "react";

interface StatusLabelProps {
  label: string;
  id: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
  size?: "big" | "small";
}

const STATUS_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  PAID:          { bg: "#e3f4eb", color: "#00703c", border: "#00703c" },
  UNPAID:        { bg: "#fde8e6", color: "#d4351c", border: "#d4351c" },
  UNKNOWN:       { bg: "#f3f2f1", color: "#505a5f", border: "#b1b4b6" },
  DIPESAN:       { bg: "#fef7e0", color: "#a05a00", border: "#f47738" },
  DIKUBURKAN:    { bg: "#fde8e6", color: "#d4351c", border: "#d4351c" },
  APPROVED:      { bg: "#e3f4eb", color: "#00703c", border: "#00703c" },
  KOSONG:        { bg: "#e3f4eb", color: "#00703c", border: "#00703c" },
  "DIGUNAKAN-1": { bg: "#fef7e0", color: "#a05a00", border: "#f47738" },
  "DIGUNAKAN-2": { bg: "#fef7e0", color: "#a05a00", border: "#f47738" },
  "DIGUNAKAN-3": { bg: "#fef7e0", color: "#a05a00", border: "#f47738" },
  "DIGUNAKAN-4": { bg: "#fde8e6", color: "#d4351c", border: "#d4351c" },
};

export const StatusLabel: React.FC<StatusLabelProps> = ({
  label,
  id,
  value,
  onChange,
  readOnly,
  disabled,
  size = "big",
}) => {
  const isInactive = readOnly || disabled;
  const style = STATUS_STYLES[value];

  const sizePad = size === "small" ? "2px 6px" : "4px 10px";
  const sizeFontSize = size === "small" ? "0.6875rem" : "0.8125rem";

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: "block",
            fontSize: "0.8125rem",
            fontWeight: 700,
            color: "#0b0c0c",
            marginBottom: 4,
          }}
        >
          {label}
        </label>
      )}
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        style={{
          display: "block",
          width: "100%",
          padding: sizePad,
          fontSize: sizeFontSize,
          fontWeight: 700,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          border: `1px solid ${style?.border || "#b1b4b6"}`,
          background: isInactive ? (style?.bg || "#f3f2f1") : "#fff",
          color: isInactive ? (style?.color || "#505a5f") : "#0b0c0c",
          cursor: isInactive ? "default" : "text",
          outline: "none",
          borderRadius: 0,
        }}
      />
    </div>
  );
};
