import { ReactNode, TdHTMLAttributes, ThHTMLAttributes, CSSProperties } from "react";

const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "0.8125rem",
  background: "#fff",
  border: "1px solid #b1b4b6",
};

const theadStyle: CSSProperties = {
  background: "#f3f2f1",
  borderBottom: "2px solid #0b0c0c",
};

const thStyle: CSSProperties = {
  padding: "8px 12px",
  textAlign: "left",
  fontWeight: 700,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#0b0c0c",
  whiteSpace: "nowrap",
  borderRight: "1px solid #b1b4b6",
};

const tdStyle: CSSProperties = {
  padding: "8px 12px",
  borderBottom: "1px solid #e4e4e4",
  borderRight: "1px solid #e4e4e4",
  fontSize: "0.8125rem",
  verticalAlign: "middle",
  color: "#0b0c0c",
  lineHeight: 1.4,
};

const sortBtnStyle: CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#0b0c0c",
  padding: 0,
  display: "flex",
  alignItems: "center",
  gap: 4,
};

export function GovukTable({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={tableStyle}>
        {caption && (
          <caption style={{ fontWeight: 700, fontSize: "0.875rem", textAlign: "left", marginBottom: 8, color: "#0b0c0c" }}>
            {caption}
          </caption>
        )}
        {children}
      </table>
    </div>
  );
}

export function GovukTableHead({ children }: { children: ReactNode }) {
  return <thead style={theadStyle}>{children}</thead>;
}

export function GovukTableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function GovukTableRow({ children, striped }: { children: ReactNode; striped?: boolean }) {
  return (
    <tr style={striped ? { background: "#f8f8f8" } : { background: "#fff" }}>
      {children}
    </tr>
  );
}

export function GovukTableHeader({
  children,
  numeric,
  last,
  sortKey,
  currentSort,
  sortDir,
  onSort,
  style: callerStyle,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & {
  numeric?: boolean;
  last?: boolean;
  sortKey?: string;
  currentSort?: string;
  sortDir?: "asc" | "desc";
  onSort?: (key: string) => void;
}) {
  const style: CSSProperties = {
    ...thStyle,
    textAlign: numeric ? "right" : "left",
    borderRight: last ? "none" : "1px solid #b1b4b6",
    ...(callerStyle as CSSProperties),
  };

  const content = sortKey && onSort ? (
    <button onClick={() => onSort(sortKey)} style={sortBtnStyle}>
      {children}
      <span style={{ color: "#505a5f", fontSize: "0.6875rem" }}>
        {currentSort === sortKey ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
      </span>
    </button>
  ) : children;

  return (
    <th scope="col" style={style} {...props}>
      {content}
    </th>
  );
}

export function GovukTableCell({
  children,
  numeric,
  header,
  last,
  style: callerStyle,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & {
  numeric?: boolean;
  header?: boolean;
  last?: boolean;
}) {
  const style: CSSProperties = {
    ...tdStyle,
    textAlign: numeric ? "right" : "left",
    borderRight: last ? "none" : "1px solid #e4e4e4",
    ...(callerStyle as CSSProperties),
  };

  if (header) {
    return (
      <th scope="row" style={{ ...style, fontWeight: 700 }} {...(props as ThHTMLAttributes<HTMLTableCellElement>)}>
        {children}
      </th>
    );
  }
  return (
    <td style={style} {...props}>
      {children}
    </td>
  );
}
