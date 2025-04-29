import {useEffect, useState} from "react";

export class CancellationError extends Error {
    constructor(message: string = 'Cancelled') {
        super(message)
    }
}

export default function useProduceState<T>(
    initialValue: T,
    asyncFn: (emit: (value: T) => never | void, isActive: () => boolean) => Promise<void>
) {
    const [state, setState] = useState(initialValue)

    useEffect(() => {
        let mounted = true

        const setStateCancellable = (value: T) => {
            if (!mounted) throw new CancellationError('useProduceState: asyncFn is cancelled')

            setState(value)
        }

        asyncFn(setStateCancellable, () => mounted)
            .catch(e => {
                if (!(e instanceof CancellationError)) {
                    throw e
                }
            })

        return () => {
            mounted = false
        }
    }, [asyncFn])

    return state
}
