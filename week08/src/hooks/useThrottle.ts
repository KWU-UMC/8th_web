import {useEffect, useRef, useState} from "react";

export function useThrottle<T>(value: T, timeout: number): T {
    const [state, setState] = useState<T>(value)
    const lastUpdateRef = useRef<number>(0)

    useEffect(() => {
        const now = Date.now()

        let taskId = -1

        if (now - lastUpdateRef.current >= timeout) {
            setState(value)
            lastUpdateRef.current = now
        } else {
            taskId = setTimeout(() => setState(value), timeout - (now - lastUpdateRef.current))
        }

        return () => {
            if (taskId !== -1) {
                clearTimeout(taskId)
            }
        }
    }, [value, timeout])

    return state
}
