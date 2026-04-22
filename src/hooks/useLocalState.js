import { useEffect, useState } from 'react';

// useState backed by localStorage.
export function useLocalState(key, initial) {
  const [v, setV] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return initial;
      return JSON.parse(raw);
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch {
      /* ignore quota / privacy mode errors */
    }
  }, [key, v]);
  return [v, setV];
}
