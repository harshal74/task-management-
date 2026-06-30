import { memo } from 'react';
import { ListTodo, Clock, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/Card';

type Props = { total: number; pending: number; completed: number };

const items = [
  { key: 'total', label: 'Total Tasks', icon: ListTodo, accent: 'text-primary-600 bg-primary-50 dark:bg-primary-500/10' },
  { key: 'pending', label: 'Pending', icon: Clock, accent: 'text-warning-600 bg-warning-50 dark:bg-warning-500/10' },
  { key: 'completed', label: 'Completed', icon: CheckCircle2, accent: 'text-success-600 bg-success-50 dark:bg-success-500/10' },
] as const;

function TaskCounterBase({ total, pending, completed }: Props) {
  const values = { total, pending, completed };
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map(({ key, label, icon: Icon, accent }) => (
        <Card key={key} className="flex items-center gap-4 p-5">
          <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}>
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{values[key]}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

export const TaskCounter = memo(TaskCounterBase);
