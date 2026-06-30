import { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, ListChecks, AlertCircle, RefreshCw } from 'lucide-react';
import { fetchUsers, type User } from '../services/userService';
import { useTasks, type Task, type TaskInput } from '../hooks/useTasks';
import { useDebounce } from '../hooks/useDebounce';
import { FILTERS, SORT_ORDERS, TASK_STATUS, type FilterType, type SortOrder } from '../utils/constants';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Spinner } from '../components/ui/Spinner';
import { Modal } from '../components/ui/Modal';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { TaskCounter } from '../components/TaskCounter';
import { ThemeToggle } from '../components/ThemeToggle';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useToast } from '../components/ui/Toast';
import type { TaskFormValues } from '../utils/validators';

export function Home() {
  const { notify } = useToast();
  const { tasks, addTask, updateTask, deleteTask, toggleStatus, counts } = useTasks();

  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(false);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [filter, setFilter] = useState<FilterType>(FILTERS.ALL);
  const [sort, setSort] = useState<SortOrder>(SORT_ORDERS.LATEST);

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const loadUsers = useCallback(async () => {
    setUsersLoading(true);
    setUsersError(false);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setUsersError(true);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredTasks = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    let result = tasks;

    if (q) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q),
      );
    }

    if (filter === FILTERS.PENDING) result = result.filter((t) => t.status === TASK_STATUS.PENDING);
    if (filter === FILTERS.COMPLETED) result = result.filter((t) => t.status === TASK_STATUS.COMPLETED);

    return [...result].sort((a, b) => {
      const cmp = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return sort === SORT_ORDERS.LATEST ? cmp : -cmp;
    });
  }, [tasks, debouncedSearch, filter, sort]);

  const openAddForm = useCallback(() => {
    setEditingTask(null);
    setFormOpen(true);
  }, []);

  const openEditForm = useCallback((task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setFormOpen(false);
    setEditingTask(null);
  }, []);

  const handleSubmit = useCallback(
    (values: TaskFormValues) => {
      const input: TaskInput = {
        title: values.title,
        description: values.description,
        assignee: values.assignee,
      };
      if (editingTask) {
        updateTask(editingTask.id, input);
        notify('success', 'Task updated successfully');
      } else {
        addTask(input);
        notify('success', 'Task added successfully');
      }
      closeForm();
    },
    [editingTask, updateTask, addTask, notify, closeForm],
  );

  const confirmDelete = useCallback(() => {
    if (deletingTask) {
      deleteTask(deletingTask.id);
      notify('success', 'Task deleted');
      setDeletingTask(null);
    }
  }, [deletingTask, deleteTask, notify]);

  const handleToggleStatus = useCallback(
    (task: Task) => {
      toggleStatus(task.id);
      notify(
        'info',
        task.status === TASK_STATUS.COMPLETED ? 'Task marked as pending' : 'Task completed',
      );
    },
    [toggleStatus, notify],
  );

  const hasSearch = debouncedSearch.trim().length > 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
              <ListChecks className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-lg font-bold leading-tight text-slate-900 dark:text-slate-100">
                TaskFlow
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage your tasks</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={openAddForm} icon={<Plus className="h-4 w-4" />}>
              <span className="hidden sm:inline">Add Task</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <TaskCounter total={counts.total} pending={counts.pending} completed={counts.completed} />

        {/* API status banner */}
        {usersError && (
          <Card className="flex flex-col items-start gap-3 border-error-200 bg-error-50 p-4 dark:border-error-500/30 dark:bg-error-500/10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-error-600" />
              <p className="text-sm text-error-700 dark:text-error-400">
                Failed to load users. You can still add tasks, but the assignee list is unavailable.
              </p>
            </div>
            <Button variant="secondary" size="sm" onClick={loadUsers} icon={<RefreshCw className="h-3.5 w-3.5" />}>
              Retry
            </Button>
          </Card>
        )}

        {/* Controls */}
        <div className="space-y-4">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            sort={sort}
            onSortChange={setSort}
          />
        </div>

        {/* Loading hint while debouncing/searching */}
        {search !== debouncedSearch && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Spinner className="h-4 w-4" /> Filtering…
          </div>
        )}

        <TaskList
          tasks={filteredTasks}
          loading={false}
          hasSearch={hasSearch}
          onEdit={openEditForm}
          onDelete={setDeletingTask}
          onToggleStatus={handleToggleStatus}
        />
      </main>

      {/* Add / Edit modal */}
      <Modal
        open={formOpen}
        onClose={closeForm}
        title={editingTask ? 'Edit Task' : 'Add Task'}
      >
        {usersLoading ? (
          <div className="flex items-center gap-2 py-6 text-sm text-slate-500">
            <Spinner /> Loading assignees…
          </div>
        ) : (
          <TaskForm
            users={users}
            usersLoading={usersLoading}
            initialTask={editingTask}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        )}
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deletingTask}
        taskTitle={deletingTask?.title}
        onConfirm={confirmDelete}
        onCancel={() => setDeletingTask(null)}
      />
    </div>
  );
}
