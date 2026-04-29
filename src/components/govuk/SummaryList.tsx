import { ReactNode } from "react";

export function GovukSummaryList({ children }: { children: ReactNode }) {
  return <dl className="govuk-summary-list">{children}</dl>;
}

export function GovukSummaryListRow({
  key: _key,
  label,
  value,
  action,
}: {
  key?: string;
  label: string;
  value: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">{label}</dt>
      <dd className="govuk-summary-list__value">{value}</dd>
      {action && <dd className="govuk-summary-list__actions">{action}</dd>}
    </div>
  );
}
