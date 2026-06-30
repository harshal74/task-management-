import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  id: string;
};

const baseField =
  'w-full rounded-xl border bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500';

const borderFor = (error?: string) =>
  error
    ? 'border-error-400 focus:ring-error-500 focus:border-error-500'
    : 'border-slate-200 dark:border-slate-700';

type InputProps = InputHTMLAttributes<HTMLInputElement> & FieldProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = '', ...props }, ref) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${baseField} ${borderFor(error)} h-11 ${className}`}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-error-600 dark:text-error-400">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-slate-400">
          {hint}
        </p>
      ) : null}
    </div>
  ),
);
Input.displayName = 'Input';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className = '', rows = 3, ...props }, ref) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${baseField} ${borderFor(error)} py-2.5 ${className}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-error-600 dark:text-error-400">
          {error}
        </p>
      )}
    </div>
  ),
);
Textarea.displayName = 'Textarea';
