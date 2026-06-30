import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  id: string;
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, placeholder, className = '', children, ...props }, ref) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <div className="relative">
        <select
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full appearance-none rounded-xl border bg-white px-4 pr-10 text-sm text-slate-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-800 dark:text-slate-100 h-11 ${
            error ? 'border-error-400' : 'border-slate-200 dark:border-slate-700'
          } ${className}`}
          {...props}
        >
          {placeholder !== undefined && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-error-600 dark:text-error-400">
          {error}
        </p>
      )}
    </div>
  ),
);
Select.displayName = 'Select';
