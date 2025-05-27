import { useCallback, useRef } from 'react';

export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) => {
  const lastRun = useRef<number>(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (lastRun.current && now < lastRun.current + delay) {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => {
          lastRun.current = now;
          callback(...args);
        }, delay);
        return;
      }

      lastRun.current = now;
      callback(...args);
    },
    [callback, delay]
  );
}; 