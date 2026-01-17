import React from "react";

interface StatusLabelProps {
  label: string;
  id: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
  size?: "big" | "small"; // new prop
}

// Define all statuses and their Tailwind styles
const STATUS_STYLES: Record<string, string> = {
  PAID: "border-green-400 text-green-700 bg-green-50",
  UNPAID: "border-red-400 text-red-700 bg-red-50",
  UNKNOWN: "border-gray-300 text-gray-500 bg-gray-100",
  DIPESAN: "border-yellow-400 text-yellow-700 bg-yellow-50",
  DIKUBURKAN: "border-red-400 text-red-700 bg-red-50",
  APPROVED: "border-green-400 text-green-700 bg-green-50",
  KOSONG: "border-green-400 text-green-700 bg-green-50",
  "DIGUNAKAN-1": "border-yellow-400 text-yellow-700 bg-yellow-50",
  "DIGUNAKAN-2": "border-yellow-400 text-yellow-700 bg-yellow-50",
  "DIGUNAKAN-3": "border-yellow-400 text-yellow-700 bg-yellow-50",
  "DIGUNAKAN-4": "border-red-400 text-red-700 bg-red-50",
};

export const StatusLabel: React.FC<StatusLabelProps> = ({
  label,
  id,
  value,
  onChange,
  readOnly,
  disabled,
  size = "big", // default to big
}) => {
  const isInactive = readOnly || disabled;
  const statusStyle = STATUS_STYLES[value] || "";

  // Adjust classes based on size
  const sizeClasses =
    size === "small" ? "px-2 py-1 text-xs rounded-md" : "px-3 py-2 text-sm rounded-lg";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        className={`w-full ${sizeClasses} text-center font-medium border focus:outline-none focus:ring-2
          ${
            isInactive
              ? statusStyle || "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
              : "border-gray-300 focus:ring-blue-500"
          }`}
      />
    </div>
  );
};
