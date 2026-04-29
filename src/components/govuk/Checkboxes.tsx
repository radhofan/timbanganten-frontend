import { InputHTMLAttributes, ReactNode } from "react";

interface GovukCheckboxesProps {
  children: ReactNode;
  small?: boolean;
  className?: string;
}

export function GovukCheckboxes({ children, small, className = "" }: GovukCheckboxesProps) {
  return (
    <div
      className={`govuk-checkboxes ${small ? "govuk-checkboxes--small" : ""} ${className}`.trim()}
      data-module="govuk-checkboxes"
    >
      {children}
    </div>
  );
}

interface GovukCheckboxItemProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  hint?: string;
  conditional?: ReactNode;
}

export function GovukCheckboxItem({ label, hint, conditional, id, ...props }: GovukCheckboxItemProps) {
  const inputId = id || `checkbox-${props.value}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const conditionalId = conditional ? `conditional-${inputId}` : undefined;

  return (
    <div className="govuk-checkboxes__item">
      <input
        className="govuk-checkboxes__input"
        type="checkbox"
        id={inputId}
        aria-describedby={hintId}
        aria-controls={conditionalId}
        aria-expanded={conditional ? "false" : undefined}
        {...props}
      />
      <label className="govuk-label govuk-checkboxes__label" htmlFor={inputId}>
        {label}
      </label>
      {hint && (
        <div id={hintId} className="govuk-hint govuk-checkboxes__hint">
          {hint}
        </div>
      )}
      {conditional && (
        <div
          className="govuk-checkboxes__conditional govuk-checkboxes__conditional--hidden"
          id={conditionalId}
        >
          {conditional}
        </div>
      )}
    </div>
  );
}
