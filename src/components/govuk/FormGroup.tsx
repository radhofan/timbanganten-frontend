import { ReactNode } from "react";

interface FormGroupProps {
  id?: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function GovukFormGroup({ id, label, hint, error, children, className = "" }: FormGroupProps) {
  return (
    <div className={`govuk-form-group ${error ? "govuk-form-group--error" : ""} ${className}`.trim()}>
      <label className="govuk-label" htmlFor={id}>
        {label}
      </label>
      {hint && <div className="govuk-hint" id={id ? `${id}-hint` : undefined}>{hint}</div>}
      {error && (
        <p className="govuk-error-message" id={id ? `${id}-error` : undefined}>
          <span className="govuk-visually-hidden">Error:</span> {error}
        </p>
      )}
      {children}
    </div>
  );
}
