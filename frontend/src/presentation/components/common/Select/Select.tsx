import React, { forwardRef, type SelectHTMLAttributes } from 'react';
import '../Input/Input.css';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, required, id, className = '', ...props }, ref) => {
    const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const selectClasses = [
      'form-input',
      error ? 'form-input-error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="form-field">
        {label && (
          <label htmlFor={selectId} className="form-label">
            {label}
            {required && <span className="form-label-required" aria-hidden="true">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={selectClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          required={required}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${selectId}-error`} className="form-error-msg" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${selectId}-helper`} className="form-helper-text">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
