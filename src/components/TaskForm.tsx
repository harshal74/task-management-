import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Input, Textarea } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { isTaskFormValid, validateTaskForm, type TaskFormErrors, type TaskFormValues } from '../utils/validators';
import type { User } from '../services/userService';
import type { Task } from '../hooks/useTasks';

type Props = {
  users: User[];
  usersLoading: boolean;
  initialTask?: Task | null;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
};

const emptyValues: TaskFormValues = { title: '', description: '', assignee: '' };

export function TaskForm({ users, usersLoading, initialTask, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<TaskFormValues>(emptyValues);
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setValues({
        title: initialTask.title,
        description: initialTask.description,
        assignee: initialTask.assignee,
      });
    } else {
      setValues(emptyValues);
    }
    setErrors({});
    setTouched(false);
  }, [initialTask]);

  const liveErrors = useMemo(() => validateTaskForm(values), [values]);
  const isValid = useMemo(() => isTaskFormValid(values), [values]);

  const handleChange = (field: keyof TaskFormValues, val: string) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (touched) setErrors(liveErrors);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setErrors(liveErrors);
    if (!isValid) return;
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Input
        id="title"
        label="Title"
        placeholder="e.g. Prepare quarterly report"
        value={values.title}
        onChange={(e) => handleChange('title', e.target.value)}
        error={touched ? errors.title : undefined}
        autoFocus
      />
      <Textarea
        id="description"
        label="Description"
        placeholder="Add a few details about this task…"
        value={values.description}
        onChange={(e) => handleChange('description', e.target.value)}
        error={touched ? errors.description : undefined}
      />
      <Select
        id="assignee"
        label="Assignee"
        placeholder={usersLoading ? 'Loading users…' : 'Select a user'}
        value={values.assignee}
        onChange={(e) => handleChange('assignee', e.target.value)}
        error={touched ? errors.assignee : undefined}
        disabled={usersLoading}
      >
        {users.map((u) => (
          <option key={u.id} value={u.name}>
            {u.name}
          </option>
        ))}
      </Select>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!isValid || usersLoading}>
          {initialTask ? 'Save Changes' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
}
