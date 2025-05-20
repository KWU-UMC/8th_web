import {useEffect, useRef} from "react";

const PLACEHOLDER = Symbol('placeholder')

export function useThrottle<T>(value: T, fn: (value: T) => void, timeout: number) {
    const lastValue = useRef<T | typeof PLACEHOLDER>(PLACEHOLDER)
    const timeRef = useRef<number>(0);

    useEffect(() => {
        let mounted = true
        let taskId = -1;

        if (lastValue.current !== value) {
            lastValue.current = value;

            const delta = Date.now() - timeRef.current

            if (delta < timeout) {
                taskId = setTimeout(() => {
                    if (mounted) {
                        timeRef.current = Date.now()
                        fn(value)
                    }
                }, timeout - delta)
            } else {
                timeRef.current = Date.now()
                fn(value)
            }
        }

        return () => {
            mounted = false

            if (taskId !== -1) {
                clearTimeout(taskId)
            }
        }
    }, [fn, timeout, value]);
}
