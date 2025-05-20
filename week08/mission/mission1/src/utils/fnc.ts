import { useEffect, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const timeoutRef = useRef<number | null>(null);

  const debouncedFunction = (...args: Parameters<T>) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
}

export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const lastCalled = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const throttledFunction = (...args: Parameters<T>) => {
    const now = Date.now();

    const remaining = delay - (now - lastCalled.current);

    if (remaining <= 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      lastCalled.current = now;
      callback(...args);
    } else if (!timeoutRef.current) {
      timeoutRef.current = window.setTimeout(() => {
        lastCalled.current = Date.now();
        timeoutRef.current = null;
        callback(...args);
      }, remaining);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledFunction;
}
