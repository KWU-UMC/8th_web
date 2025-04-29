import useLocalStorage from "../../hooks/useLocalStorage.ts";
import {useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useProduceState from "../../hooks/useProduceState.ts";
import delay from "../../util/delay.ts";

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
        let v = ''

        // noinspection InfiniteLoopJS
        while (true) {
            await delay(200)
            v = v.length < 3 ? v + '.' : ''
            emit(v)
        }
    }, []))

    if (isUnauthorized) {
        return <div className="px-36">
            Si tu veux vraiment passer le pont faut payer l'addition.<br/><br/>
            Redirecting you to the login page in 3 seconds{dots}
        </div>
    }

    return <></>
}
