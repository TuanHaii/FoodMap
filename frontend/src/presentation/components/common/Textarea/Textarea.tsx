import React, { forwardRef, type TextareaHTMLAttributes } from 'react';
import '../Input/Input.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, required, id, className = '', ...props }, ref) => {
    const inputId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const inputClasses = [
      'form-input',
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
        <textarea
          ref={ref}
          id={inputId}
          className={inputClasses}
          style={{ minHeight: '100px', resize: 'vertical' }}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          required={required}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
