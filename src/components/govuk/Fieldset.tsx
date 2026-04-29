import { ReactNode } from "react";

interface GovukFieldsetProps {
  legend: string;
  legendSize?: "s" | "m" | "l" | "xl";
  legendIsPageHeading?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function GovukFieldset({
  legend,
  legendSize = "m",
  legendIsPageHeading = false,
  hint,
  children,
  className = "",
}: GovukFieldsetProps) {
  const legendClass = `govuk-fieldset__legend govuk-fieldset__legend--${legendSize}`;

  const legendContent = legendIsPageHeading ? (
    <h1 className="govuk-fieldset__heading">{legend}</h1>
  ) : (
    legend
  );

  return (
    <fieldset className={`govuk-fieldset ${className}`.trim()}>
      <legend className={legendClass}>{legendContent}</legend>
      {hint && <div className="govuk-hint">{hint}</div>}
      {children}
    </fieldset>
  );
}
