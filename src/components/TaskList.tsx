import { memo } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, SearchX } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { Card } from './ui/Card';
import type { Task } from '../hooks/useTasks';

type Props = {
  tasks: Task[];
  loading: boolean;
  hasSearch: boolean;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggleStatus: (task: Task) => void;
};

function SkeletonCard() {
  return (
    <Card className="space-y-3 p-5">
      <div className="flex justify-between">
        <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-5 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      <div className="flex gap-2 pt-2">
        <div className="h-8 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="h-8 w-20 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
      </div>
    </Card>
  );
}

function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <Card className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
        {hasSearch ? <SearchX className="h-8 w-8" /> : <ClipboardList className="h-8 w-8" />}
      </span>
      <div>
        <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">
          {hasSearch ? 'No matching tasks' : 'No tasks yet'}
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {hasSearch
            ? 'Try a different search term or clear the filters.'
            : 'Click "Add Task" to create your first task.'}
        </p>
      </div>
    </Card>
  );
}

function TaskListBase({ tasks, loading, hasSearch, onEdit, onDelete, onToggleStatus }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) return <EmptyState hasSearch={hasSearch} />;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          layout
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <TaskCard
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        </motion.div>
      ))}
    </div>
  );
}

export const TaskList = memo(TaskListBase);
