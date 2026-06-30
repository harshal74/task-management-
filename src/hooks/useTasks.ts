import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, TASK_STATUS, type TaskStatus } from '../utils/constants';

export type Task = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: TaskStatus;
  createdAt: string;
};

export type TaskInput = {
  title: string;
  description: string;
  assignee: string;
};

const createId = () =>
  (typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `task-${Date.now()}-${Math.random().toString(16).slice(2)}`);

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEYS.TASKS, []);

  const addTask = useCallback(
    (input: TaskInput) => {
      const task: Task = {
        id: createId(),
        title: input.title.trim(),
        description: input.description.trim(),
        assignee: input.assignee,
        status: TASK_STATUS.PENDING,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [task, ...prev]);
      return task;
    },
    [setTasks],
  );

  const updateTask = useCallback(
    (id: string, input: TaskInput) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                title: input.title.trim(),
                description: input.description.trim(),
                assignee: input.assignee,
              }
            : t,
        ),
      );
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setTasks],
  );

  const toggleStatus = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                status:
                  t.status === TASK_STATUS.COMPLETED
                    ? TASK_STATUS.PENDING
                    : TASK_STATUS.COMPLETED,
              }
            : t,
        ),
      );
    },
    [setTasks],
  );

  const counts = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter((t) => t.status === TASK_STATUS.PENDING).length,
      completed: tasks.filter((t) => t.status === TASK_STATUS.COMPLETED).length,
    }),
    [tasks],
  );

  return { tasks, addTask, updateTask, deleteTask, toggleStatus, counts };
}
