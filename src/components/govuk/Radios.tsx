import { InputHTMLAttributes, ReactNode } from "react";

interface GovukRadiosProps {
  name: string;
  children: ReactNode;
  inline?: boolean;
  small?: boolean;
  className?: string;
}

export function GovukRadios({ name, children, inline, small, className = "" }: GovukRadiosProps) {
  return (
    <div
      className={`govuk-radios ${inline ? "govuk-radios--inline" : ""} ${small ? "govuk-radios--small" : ""} ${className}`.trim()}
      data-module="govuk-radios"
    >
      {children}
    </div>
  );
}

interface GovukRadioItemProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  hint?: string;
  conditional?: ReactNode;
}

export function GovukRadioItem({ label, hint, conditional, id, ...props }: GovukRadioItemProps) {
  const inputId = id || `radio-${props.value}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const conditionalId = conditional ? `conditional-${inputId}` : undefined;

  return (
    <div className="govuk-radios__item">
      <input
        className="govuk-radios__input"
        type="radio"
        id={inputId}
        aria-describedby={hintId}
        aria-controls={conditionalId}
        aria-expanded={conditional ? "false" : undefined}
        {...props}
      />
      <label className="govuk-label govuk-radios__label" htmlFor={inputId}>
        {label}
      </label>
      {hint && (
        <div id={hintId} className="govuk-hint govuk-radios__hint">
          {hint}
        </div>
      )}
      {conditional && (
        <div
          className="govuk-radios__conditional govuk-radios__conditional--hidden"
          id={conditionalId}
        >
          {conditional}
        </div>
      )}
    </div>
  );
}
