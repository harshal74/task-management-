import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';
type Toast = { id: string; type: ToastType; message: string };

type ToastContextValue = { notify: (type: ToastType, message: string) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

const config: Record<ToastType, { icon: ReactNode; accent: string }> = {
  success: { icon: <CheckCircle2 className="h-5 w-5" />, accent: 'text-success-600' },
  error: { icon: <AlertCircle className="h-5 w-5" />, accent: 'text-error-600' },
  info: { icon: <Info className="h-5 w-5" />, accent: 'text-primary-600' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (type: ToastType, message: string) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((prev) => [...prev, { id, type, message }]);
      window.setTimeout(() => remove(id), 3500);
    },
    [remove],
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2">
          <AnimatePresence>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-auto flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-card-hover dark:border-slate-700 dark:bg-slate-800"
                role="status"
              >
                <span className={config[t.type].accent}>{config[t.type].icon}</span>
                <p className="flex-1 text-sm text-slate-700 dark:text-slate-200">{t.message}</p>
                <button
                  onClick={() => remove(t.id)}
                  aria-label="Dismiss notification"
                  className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
