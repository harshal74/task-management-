import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { AlertTriangle } from 'lucide-react';

type Props = {
  open: boolean;
  taskTitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({ open, taskTitle, onConfirm, onCancel }: Props) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="Delete task?"
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-error-50 text-error-600 dark:bg-error-500/10">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Are you sure you want to delete
          {taskTitle ? (
            <span className="font-medium text-slate-900 dark:text-slate-100"> “{taskTitle}”</span>
          ) : null}
          ? This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
}
