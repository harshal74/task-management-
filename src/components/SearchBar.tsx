import { memo, type ChangeEvent } from 'react';
import { Search, X } from 'lucide-react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBarBase({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder="Search by title or description…"
        aria-label="Search tasks"
        className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export const SearchBar = memo(SearchBarBase);
