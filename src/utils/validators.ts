export type ValidationResult = { valid: boolean; message?: string };

export const required = (value: unknown, label: string): ValidationResult => {
  const isEmpty =
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '');
  return isEmpty ? { valid: false, message: `${label} is required` } : { valid: true };
};

export type TaskFormValues = {
  title: string;
  description: string;
  assignee: string;
};

export type TaskFormErrors = Partial<Record<keyof TaskFormValues, string>>;

export const validateTaskForm = (values: TaskFormValues): TaskFormErrors => {
  const errors: TaskFormErrors = {};

  const title = required(values.title, 'Title');
  if (!title.valid) errors.title = title.message;

  const description = required(values.description, 'Description');
  if (!description.valid) errors.description = description.message;

  const assignee = required(values.assignee, 'Assignee');
  if (!assignee.valid) errors.assignee = assignee.message;

  return errors;
};

export const isTaskFormValid = (values: TaskFormValues): boolean => {
  const errors = validateTaskForm(values);
  return Object.keys(errors).length === 0;
};
