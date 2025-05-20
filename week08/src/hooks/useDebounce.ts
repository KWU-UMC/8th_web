import {useEffect, useState} from "react";

export function useDebounce<T>(value: T, timeout: number): T {
    const [result, setResult] = useState<T>(value)

    useEffect(() => {
        let mounted = true;

        const taskId = setTimeout(() => {
            if (mounted) {
                setResult(value)
            }
        }, timeout)

        return () => {
            clearTimeout(taskId)
            mounted = false
        }
    }, [timeout, value])

    return result
}
