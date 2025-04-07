import {Headers} from "../utils/auth.ts";
import {useEffect, useState} from "react";

export function useTmdbFetch<T>(path: string): {
    data: T | null;
    isLoading: boolean;
    isError: boolean;
} {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        (async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const response = await fetch(`https://api.themoviedb.org/3${path}`, {
                    headers: Headers
                });
                console.log(response);
                if (!response.ok) {
                    setIsError(true);
                } else {
                    setData(await response.json());
                }
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [path]);

    return { data, isLoading, isError };
}
