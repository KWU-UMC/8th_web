import axios, { AxiosError } from "axios";

const getAccessToken = (): string | null => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) return null

    return JSON.parse(accessToken)
}

const getRefreshToken = (): string | null => {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) return null

    return JSON.parse(refreshToken)
}

const setAccessToken = (accessToken: string): void => {
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
}

const setRefreshToken = (refreshToken: string): void => {
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
}

const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

client.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken) {
            config.headers.Authorization = `Bearer ${getAccessToken()}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);

let isRefreshing = false
const failedQueue: {
    resolve: () => void,
    reject: (reason?: unknown) => void,
}[] = []

const processQueue = (error: unknown) => {
    failedQueue.forEach(item => {
        if (error) {
            item.reject(error)
        } else {
            item.resolve()
        }
    })
}

client.interceptors.response.use(
    (response) => {
        return response
    },
    async (error: AxiosError) => {
        if (error.response) {
            if (error.response.status !== 401) return Promise.reject(error);

            const refreshToken = getRefreshToken()
            if (!refreshToken) return Promise.reject(error);

            const originalReq = error.config
            if (!originalReq || originalReq._retry) return Promise.reject(error);
            originalReq._retry = true

            if (isRefreshing) {
                return new Promise<void>((resolve, reject) => {
                    failedQueue.push({resolve, reject})
                }).then(() => client(originalReq))
                    .catch(e => Promise.reject(e))
            }

            isRefreshing = true

            try {
                const res = await client.post('/v1/auth/refresh', {
                    refresh: refreshToken
                })

                if (res.data.data.accessToken && res.data.data.refreshToken) {
                    setAccessToken(res.data.data.accessToken)
                    setRefreshToken(res.data.data.refreshToken)

                    processQueue(null)

                    return client(originalReq)
                }

                processQueue(new Error('Refresh token is invalid'))
            } catch (e) {
                processQueue(e)
            } finally {
                console.log('refreshed token')
                isRefreshing = false
            }
        }

        return Promise.reject(error);
    }
);

export default client;
