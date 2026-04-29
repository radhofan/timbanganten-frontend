import { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";

export function GovukTable({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <table className="govuk-table">
      {caption && <caption className="govuk-table__caption govuk-table__caption--m">{caption}</caption>}
      {children}
    </table>
  );
}

export function GovukTableHead({ children }: { children: ReactNode }) {
  return <thead className="govuk-table__head">{children}</thead>;
}

export function GovukTableBody({ children }: { children: ReactNode }) {
  return <tbody className="govuk-table__body">{children}</tbody>;
}

export function GovukTableRow({ children }: { children: ReactNode }) {
  return <tr className="govuk-table__row">{children}</tr>;
}

export function GovukTableHeader({
  children,
  numeric,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean }) {
  return (
    <th
      scope="col"
      className={`govuk-table__header ${numeric ? "govuk-table__header--numeric" : ""}`.trim()}
      {...props}
    >
      {children}
    </th>
  );
}

export function GovukTableCell({
  children,
  numeric,
  header,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean; header?: boolean }) {
  if (header) {
    return (
      <th scope="row" className="govuk-table__header" {...(props as ThHTMLAttributes<HTMLTableCellElement>)}>
        {children}
      </th>
    );
  }
  return (
    <td
      className={`govuk-table__cell ${numeric ? "govuk-table__cell--numeric" : ""}`.trim()}
      {...props}
    >
      {children}
    </td>
  );
}
