import { ReactNode } from "react";

interface ErrorItem {
  href: string;
  text: string;
}

interface GovukErrorSummaryProps {
  title?: string;
  errors: ErrorItem[];
  className?: string;
}

export function GovukErrorSummary({
  title = "Terjadi masalah",
  errors,
  className = "",
}: GovukErrorSummaryProps) {
  if (errors.length === 0) return null;

  return (
    <div
      className={`govuk-error-summary ${className}`.trim()}
      data-module="govuk-error-summary"
    >
      <div role="alert">
        <h2 className="govuk-error-summary__title">{title}</h2>
        <div className="govuk-error-summary__body">
          <ul className="govuk-list govuk-error-summary__list">
            {errors.map((error, index) => (
              <li key={index}>
                <a href={error.href}>{error.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
