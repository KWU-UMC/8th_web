import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?:boolean;
}

let refreshPromise:Promise<string>|null = null;

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    withCredentials:true,
});

axiosInstance.interceptors.request.use((config) => {
    const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
},

    (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest:CustomInternalAxiosRequestConfig = error.config;

        if(
            error.response&&
            error.reponse.status === 401 &&
            error.response.errorCode === "AUTH_001"&&
            !originalRequest._retry
        ){
            if(originalRequest.url === "/v1/auth/refresh"){
                const {removeItem:removeAccessToken} = useLocalStorage(
                    LOCAL_STORAGE_KEY.accessToken,
                );
                const {removeItem:rremoveRefreshToken} = useLocalStorage(
                    LOCAL_STORAGE_KEY.refreshToken,
                );
                removeAccessToken();
                rremoveRefreshToken();

                window.location.href = "/login";
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            if(!refreshPromise) {
                refreshPromise = (async() => {
                    const {getItem:getRefreshToken} = useLocalStorage(
                        LOCAL_STORAGE_KEY.refreshToken,
                    );
                    const refreshToken = getRefreshToken();

                    const {data} = await axiosInstance.post("/v1/auth/refresh", {
                        refresh:refreshToken,
                    });

                    const {setItem:setAccessToken} = useLocalStorage(
                        LOCAL_STORAGE_KEY.accessToken,
                    );

                    const {setItem:setRefreshToken} = useLocalStorage(
                        LOCAL_STORAGE_KEY.refreshToken,
                    );
                    
                    setAccessToken(data.data.accessToken);
                    setRefreshToken(data.data.refreshToekn);

                    return data.data.accessToken;
                })().catch((error) => {
                    const {removeItem:removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                    const {removeItem:removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

                    removeAccessToken();
                    removeRefreshToken();
                }).finally(() => {
                    refreshPromise = null;
                });
            }

            return refreshPromise.then((newAccessToken) => {
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance.request(originalRequest);
            });
        }
        return Promise.reject(error);
    }
)