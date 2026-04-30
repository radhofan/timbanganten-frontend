import { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";

export function GovukTable({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="govuk-table">
        {caption && (
          <caption className="govuk-table__caption govuk-table__caption--s">{caption}</caption>
        )}
        {children}
      </table>
    </div>
  );
}

export function GovukTableHead({ children }: { children: ReactNode }) {
  return <thead className="govuk-table__head">{children}</thead>;
}

export function GovukTableBody({ children }: { children: ReactNode }) {
  return <tbody className="govuk-table__body">{children}</tbody>;
}

export function GovukTableRow({ children, striped: _ }: { children: ReactNode; striped?: boolean }) {
  return <tr className="govuk-table__row">{children}</tr>;
}

export function GovukTableHeader({
  children,
  numeric,
  last: _,
  sortKey,
  currentSort,
  sortDir,
  onSort,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & {
  numeric?: boolean;
  last?: boolean;
  sortKey?: string;
  currentSort?: string;
  sortDir?: "asc" | "desc";
  onSort?: (key: string) => void;
}) {
  const className = ["govuk-table__header", numeric ? "govuk-table__header--numeric" : ""]
    .filter(Boolean)
    .join(" ");

  const content =
    sortKey && onSort ? (
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: "inherit",
          color: "inherit",
          padding: 0,
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          whiteSpace: "nowrap",
          textTransform: "inherit",
          letterSpacing: "inherit",
        }}
      >
        {children}
        <span style={{ color: "#505a5f", fontSize: "0.6875rem" }}>
          {currentSort === sortKey ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
        </span>
      </button>
    ) : (
      children
    );

  return (
    <th scope="col" className={className} {...props}>
      {content}
    </th>
  );
}

export function GovukTableCell({
  children,
  numeric,
  header,
  last: _,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & {
  numeric?: boolean;
  header?: boolean;
  last?: boolean;
}) {
  if (header) {
    return (
      <th
        scope="row"
        className="govuk-table__header"
        {...(props as ThHTMLAttributes<HTMLTableCellElement>)}
      >
        {children}
      </th>
    );
  }

  const className = ["govuk-table__cell", numeric ? "govuk-table__cell--numeric" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <td className={className} {...props}>
      {children}
    </td>
  );
}
