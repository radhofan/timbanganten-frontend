type TagColor =
  | "grey"
  | "green"
  | "turquoise"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow";

interface GovukTagProps {
  color?: TagColor;
  children: string;
  className?: string;
}

export function GovukTag({ color, children, className = "" }: GovukTagProps) {
  return (
    <strong className={`govuk-tag ${color ? `govuk-tag--${color}` : ""} ${className}`.trim()}>
      {children}
    </strong>
  );
}

export function statusToTag(value: string): { color?: TagColor; label: string } {
  const map: Record<string, { color?: TagColor; label: string }> = {
    PAID:          { color: "green",  label: "PAID" },
    UNPAID:        { color: "red",    label: "UNPAID" },
    UNKNOWN:       { color: "grey",   label: "UNKNOWN" },
    DIPESAN:       { color: "orange", label: "DIPESAN" },
    DIKUBURKAN:    { color: "red",    label: "DIKUBURKAN" },
    APPROVED:      { color: "green",  label: "APPROVED" },
    KOSONG:        { color: "green",  label: "KOSONG" },
    "DIGUNAKAN-1": { color: "yellow", label: "DIGUNAKAN-1" },
    "DIGUNAKAN-2": { color: "yellow", label: "DIGUNAKAN-2" },
    "DIGUNAKAN-3": { color: "yellow", label: "DIGUNAKAN-3" },
    "DIGUNAKAN-4": { color: "red",    label: "DIGUNAKAN-4" },
  };
  return map[value] ?? { color: "grey", label: value };
}
