import { memo } from 'react';
import { Pencil, Trash2, Check, RotateCcw, User as UserIcon, Calendar } from 'lucide-react';
import { Card } from './ui/Card';
import { Badge, statusToVariant } from './ui/Badge';
import { Button } from './ui/Button';
import { TASK_STATUS, type TaskStatus } from '../utils/constants';
import type { Task } from '../hooks/useTasks';

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggleStatus: (task: Task) => void;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

function TaskCardBase({ task, onEdit, onDelete, onToggleStatus }: Props) {
  const isCompleted = task.status === TASK_STATUS.COMPLETED;
  const nextStatus: TaskStatus = isCompleted ? TASK_STATUS.PENDING : TASK_STATUS.COMPLETED;

  return (
    <Card className="group flex flex-col gap-3 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3
            className={`text-base font-semibold text-slate-900 dark:text-slate-100 ${
              isCompleted ? 'line-through opacity-60' : ''
            }`}
          >
            {task.title}
          </h3>
          <p
            className={`mt-1 text-sm text-slate-600 dark:text-slate-300 ${
              isCompleted ? 'line-through opacity-60' : ''
            }`}
          >
            {task.description}
          </p>
        </div>
        <Badge variant={statusToVariant(task.status)}>{task.status}</Badge>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <UserIcon className="h-3.5 w-3.5" />
          {task.assignee}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(task.createdAt)}
        </span>
      </div>

      <div className="mt-1 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
        <Button
          variant="success"
          size="sm"
          onClick={() => onToggleStatus(task)}
          icon={isCompleted ? <RotateCcw className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
          aria-label={`Mark as ${nextStatus}`}
        >
          {isCompleted ? 'Undo' : 'Complete'}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(task)}
          icon={<Pencil className="h-3.5 w-3.5" />}
          aria-label="Edit task"
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task)}
          icon={<Trash2 className="h-3.5 w-3.5" />}
          className="ml-auto text-error-600 hover:bg-error-50 dark:hover:bg-error-500/10"
          aria-label="Delete task"
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}

export const TaskCard = memo(TaskCardBase);
