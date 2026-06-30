export const TASK_STATUS = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
} as const;

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export const FILTERS = {
  ALL: 'all',
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const;

export type FilterType = (typeof FILTERS)[keyof typeof FILTERS];

export const SORT_ORDERS = {
  LATEST: 'latest',
  OLDEST: 'oldest',
} as const;

export type SortOrder = (typeof SORT_ORDERS)[keyof typeof SORT_ORDERS];

export const STORAGE_KEYS = {
  TASKS: 'task-manager:tasks',
  THEME: 'task-manager:theme',
} as const;

export const API_ENDPOINTS = {
  USERS: 'https://jsonplaceholder.typicode.com/users',
} as const;

export const DEBOUNCE_MS = 300;
