import React, { forwardRef, type InputHTMLAttributes } from 'react';
import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, required, id, className = '', ...props }, ref) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const inputClasses = [
      'form-input',
      leftIcon ? 'form-input-has-left-icon' : '',
      rightIcon ? 'form-input-has-right-icon' : '',
      error ? 'form-input-error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="form-field">
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
            {required && <span className="form-label-required" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="input-wrapper">
          {leftIcon && <span className="input-icon-left">{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            required={required}
            {...props}
          />
          {rightIcon && <span className="input-icon-right">{rightIcon}</span>}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="form-error-msg" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="form-helper-text">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
