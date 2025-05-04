import {Dispatch, SetStateAction, useState} from "react";

export default function useLocalStorage<T>(key: string, defaultValue: T | (() => T)): [T, Dispatch<SetStateAction<T | undefined>>] {
    const unwrapDefaultValue = () => defaultValue instanceof Function ? defaultValue() : defaultValue

    const [value, setValue] = useState<T>(() => {
        const item = localStorage.getItem(key)
        if (item === null) {
            return unwrapDefaultValue()
        } else {
            return JSON.parse(item) as T
        }
    })

    const setLocalStorage: Dispatch<SetStateAction<T | undefined>> = (valueOrFunction: SetStateAction<T | undefined>) => {
        const newValue = valueOrFunction instanceof Function ? valueOrFunction(value) : valueOrFunction

        if (newValue === undefined) {
            localStorage.removeItem(key)
            setValue(unwrapDefaultValue())
        } else {
            setValue(newValue)
            localStorage.setItem(key, JSON.stringify(newValue))
        }
    }

    return [value, setLocalStorage] as const
}
