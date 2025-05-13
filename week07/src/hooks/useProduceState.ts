import {useEffect, useState} from "react";

export class CancellationError extends Error {
    constructor(message: string = 'Cancelled') {
        super(message)
    }
}

export default function useProduceState<T>(
    initialValue: T,
    asyncFn: (emit: (value: T) => never | void, signal: AbortSignal) => Promise<void>
) {
    const [state, setState] = useState(initialValue)

    useEffect(() => {
        const controller = new AbortController()

        const setStateCancellable = (value: T) => {
            if (controller.signal.aborted) throw new CancellationError('useProduceState: asyncFn is cancelled')

            setState(value)
        }

        asyncFn(setStateCancellable, controller.signal)
            .catch(e => {
                if (!(e instanceof CancellationError)) {
                    throw e
                }
            })

        return () => {
            controller.abort(new CancellationError('useProduceState: asyncFn is cancelled'))
        }
    }, [asyncFn])

    return state
}
