import { ReactNode } from "react";

interface GovukDetailsProps {
  summary: string;
  children: ReactNode;
  className?: string;
}

export function GovukDetails({ summary, children, className = "" }: GovukDetailsProps) {
  return (
    <details className={`govuk-details ${className}`.trim()} data-module="govuk-details">
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{summary}</span>
      </summary>
      <div className="govuk-details__text">{children}</div>
    </details>
  );
}
