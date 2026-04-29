import { InputHTMLAttributes } from "react";

interface DateInputValue {
  day?: string;
  month?: string;
  year?: string;
}

interface GovukDateInputProps {
  id: string;
  value?: DateInputValue;
  onChange?: (value: DateInputValue) => void;
  error?: boolean;
  dayProps?: InputHTMLAttributes<HTMLInputElement>;
  monthProps?: InputHTMLAttributes<HTMLInputElement>;
  yearProps?: InputHTMLAttributes<HTMLInputElement>;
}

export function GovukDateInput({
  id,
  value = {},
  onChange,
  error,
  dayProps = {},
  monthProps = {},
  yearProps = {},
}: GovukDateInputProps) {
  const handleChange = (field: keyof DateInputValue, val: string) => {
    if (onChange) {
      onChange({ ...value, [field]: val });
    }
  };

  return (
    <div className="govuk-date-input" id={id}>
      <div className="govuk-date-input__item">
        <div className="govuk-form-group">
          <label className="govuk-label govuk-date-input__label" htmlFor={`${id}-day`}>
            Hari
          </label>
          <input
            className={`govuk-input govuk-date-input__input govuk-input--width-2 ${error ? "govuk-input--error" : ""}`.trim()}
            id={`${id}-day`}
            name={`${id}-day`}
            type="text"
            inputMode="numeric"
            value={value.day || ""}
            onChange={(e) => handleChange("day", e.target.value)}
            {...dayProps}
          />
        </div>
      </div>
      <div className="govuk-date-input__item">
        <div className="govuk-form-group">
          <label className="govuk-label govuk-date-input__label" htmlFor={`${id}-month`}>
            Bulan
          </label>
          <input
            className={`govuk-input govuk-date-input__input govuk-input--width-2 ${error ? "govuk-input--error" : ""}`.trim()}
            id={`${id}-month`}
            name={`${id}-month`}
            type="text"
            inputMode="numeric"
            value={value.month || ""}
            onChange={(e) => handleChange("month", e.target.value)}
            {...monthProps}
          />
        </div>
      </div>
      <div className="govuk-date-input__item">
        <div className="govuk-form-group">
          <label className="govuk-label govuk-date-input__label" htmlFor={`${id}-year`}>
            Tahun
          </label>
          <input
            className={`govuk-input govuk-date-input__input govuk-input--width-4 ${error ? "govuk-input--error" : ""}`.trim()}
            id={`${id}-year`}
            name={`${id}-year`}
            type="text"
            inputMode="numeric"
            value={value.year || ""}
            onChange={(e) => handleChange("year", e.target.value)}
            {...yearProps}
          />
        </div>
      </div>
    </div>
  );
}
