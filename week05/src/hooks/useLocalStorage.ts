import {Dispatch, SetStateAction, useState} from "react";

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        const item = localStorage.getItem(key)
        if (item === null) {
            return defaultValue instanceof Function ? defaultValue() : defaultValue
        } else {
            return JSON.parse(item) as T
        }
    })

    const setLocalStorage: Dispatch<SetStateAction<T>> = (valueOrFunction: SetStateAction<T>) => {
        const newValue = valueOrFunction instanceof Function ?
            valueOrFunction(value)
            : valueOrFunction

        setValue(newValue)
        localStorage.setItem(key, JSON.stringify(newValue))
    }

    return [value, setLocalStorage]
}
