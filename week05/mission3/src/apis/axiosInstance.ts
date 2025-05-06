import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const Accesstoken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

  if (Accesstoken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${Accesstoken.replace(/"/g, '')}`;
  } 

  return config;
  },

  (error) => Promise.reject(error),
);

// 응답 인터셉터 (refresh 토큰을 통해 토큰 갱신 처리)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // 401 에러면서 아직 재시도하지 않은 요청
    if(error.response && error.response.status === 401 && !originalRequest._retry){
      if(originalRequest.url === '/v1/auth/refresh'){
        const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken,);
        const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken,);

        removeAccessToken();
        removeRefreshToken();

        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // 리프레시 요청이 이미 진행중이면, 그 Promise를 재사용
      if(!refreshPromise){
        refreshPromise = (async() => {
          const {getItem: getRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken,);
          const refreshToken = getRefreshToken();

          const {data} = await axiosInstance.post("/v1/auth/refresh", {refresh: refreshToken,});

          // 새 토큰 반환
          const {setItem: setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
          const {setItem: setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          return data.data.accessToken;
        })()
          .catch((error) => {
            const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken,);
            const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken,);

            removeAccessToken();
            removeRefreshToken(); 
          }).finally(() => {
            refreshPromise = null;
          });
      }

      return refreshPromise.then((newAccessToken) => {
        // 갱신된 토큰으로 업데이트 후 업데이트된 원본 요청 재시도
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance.request(originalRequest);
      })
    }

    // 401 에러가 아닌 경우, 그대로 오류 반환
    return Promise.reject(error);
  }
);
