import {useLocalStorage} from "./hooks/useLocalStorage.ts";

export const PremiumWebtoon = () => {
    const accessToken = useLocalStorage<string | null>('accessToken', null)

    return <></>
}
