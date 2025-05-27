import { useEffect, useRef, useState } from "react";

// ✅ value와 delay를 받아서 특정 주기로 값을 반환하는 Throttle Hook
function useThrottle<T>(value: T, delay: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecuted.current;

    if (timeSinceLastExecution >= delay) {
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay - timeSinceLastExecution);

      return () => clearTimeout(timerId); // 💡 clean-up!
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;
