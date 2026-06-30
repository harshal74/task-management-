import { useEffect, useState } from 'react';
import { DEBOUNCE_MS } from '../utils/constants';

export function useDebounce<T>(value: T, delay: number = DEBOUNCE_MS): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
