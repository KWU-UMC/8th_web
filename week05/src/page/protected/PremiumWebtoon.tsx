import useLocalStorage from "../../hooks/useLocalStorage.ts";
import {useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useProduceState from "../../hooks/useProduceState.ts";
import delay from "../../util/delay.ts";
import client from "../../util/client.ts";

export const PremiumWebtoon = () => {
    const navigate = useNavigate()
    const [accessToken] = useLocalStorage<string | null>('accessToken', null)
    const isUnauthorized = accessToken === null;

    useEffect(() => {
        if (isUnauthorized) {
            setTimeout(() => navigate('/login', { replace: true }), 3000)
        }
    })

    const dots = useProduceState('', useCallback(async (emit) => {
        if (!isUnauthorized) return

        let v = ''

        // noinspection InfiniteLoopJS
        while (true) {
            await delay(200)
            v = v.length < 3 ? v + '.' : ''
            emit(v)
        }
    }, [isUnauthorized]))

    const protectedAuth = useProduceState<string | null>(null, useCallback(async (emit) => {
        const res = await client.get('/v1/auth/protected')

        emit(JSON.stringify(res.data))
    }, []))

    if (isUnauthorized) {
        return <div className="px-36">
            Si tu veux vraiment passer le pont faut payer l'addition.<br/><br/>
            Redirecting you to the login page in 3 seconds{dots}
        </div>
    }

    return <div className="px-36">/v1/auth/protected result: {protectedAuth}</div>
}
