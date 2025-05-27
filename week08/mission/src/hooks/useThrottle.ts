import { useRef, useCallback } from "react";

const useThrottle = (callback: () => void, delay: number) => {
  const lastCall = useRef(0);

  const throttledFn = useCallback(() => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback();
    }
  }, [callback, delay]);

  return throttledFn;
};

export default useThrottle;
