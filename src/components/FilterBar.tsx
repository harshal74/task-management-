import { memo } from 'react';
import { FILTERS, SORT_ORDERS, type FilterType, type SortOrder } from '../utils/constants';

type Props = {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  sort: SortOrder;
  onSortChange: (s: SortOrder) => void;
};

const filterOptions: { value: FilterType; label: string }[] = [
  { value: FILTERS.ALL, label: 'All' },
  { value: FILTERS.PENDING, label: 'Pending' },
  { value: FILTERS.COMPLETED, label: 'Completed' },
];

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: SORT_ORDERS.LATEST, label: 'Latest First' },
  { value: SORT_ORDERS.OLDEST, label: 'Oldest First' },
];

const pill = (active: boolean) =>
  `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200 focus-ring ${
    active
      ? 'bg-primary-600 text-white shadow-sm'
      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
  }`;

function FilterBarBase({ filter, onFilterChange, sort, onSortChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div role="group" aria-label="Filter tasks" className="flex items-center gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onFilterChange(opt.value)}
            aria-pressed={filter === opt.value}
            className={pill(filter === opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm text-slate-500 dark:text-slate-400">
          Sort
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOrder)}
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export const FilterBar = memo(FilterBarBase);
