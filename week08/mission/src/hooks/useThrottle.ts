import { useState, useEffect, useRef } from "react";

export default function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRun = useRef(0);

  useEffect(() => {
    const now = Date.now();

    if (now - lastRun.current >= delay) {
      setThrottledValue(value);
      lastRun.current = now;
    } else {
      const timeout = setTimeout(() => {
        setThrottledValue(value);
        lastRun.current = Date.now();
      }, delay - (now - lastRun.current));

      return () => clearTimeout(timeout);
    }
  }, [value, delay]);

  return throttledValue;
}
