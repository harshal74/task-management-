import { type ReactNode } from 'react';
import { type TaskStatus } from '../../utils/constants';

type BadgeVariant = 'pending' | 'completed' | 'neutral';

const styles: Record<BadgeVariant, string> = {
  pending:
    'bg-warning-100 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400',
  completed:
    'bg-success-100 text-success-700 dark:bg-success-500/15 dark:text-success-400',
  neutral:
    'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
};

export const statusToVariant = (status: TaskStatus): BadgeVariant =>
  status === 'Completed' ? 'completed' : 'pending';

export function Badge({
  variant = 'neutral',
  children,
}: {
  variant?: BadgeVariant;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
