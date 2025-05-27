import { useCallback, useRef } from "react";

function useThrottleFn<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): T {
  const lastExecuted = useRef(0);

  const throttled = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastExecuted.current >= delay) {
        lastExecuted.current = now;
        fn(...args);
      }
    },
    [fn, delay]
  );

  return throttled as T;
}

export default useThrottleFn;
