import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
});

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

axiosInstance.interceptors.request.use(
  (config) => {
    const rawtoken = localStorage.getItem("accessToken");
    const token = rawtoken?.replace(/^"|"$/g, "");

    if (token && token !== "undefined") {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // refresh 요청이 실패한 경우: 강제 로그아웃
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest.url === "/v1/auth/refresh"
    ) {
      const { removeItem: removeAccessToken } = useLocalStorage(
        LOCAL_STORAGE_KEY.accessToken
      );
      const { removeItem: removeRefreshToken } = useLocalStorage(
        LOCAL_STORAGE_KEY.refreshToken
      );
      removeAccessToken();
      removeRefreshToken();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // accessToken 만료로 401이 떴고, 재시도 안 했던 경우
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // refreshToken 없으면 리프레시 시도도 하지 않음
      const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
      const refreshToken = getItem();
      if (!refreshToken) {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(new Error("No refresh token"));
      }

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });

          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );

          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          return data.data.accessToken;
        })()
          .catch((error) => {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken();
            removeRefreshToken();
            window.location.href = "/login";
            return Promise.reject(error);
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      return refreshPromise.then((newAccessToken) => {
        if (newAccessToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      });
    }

    return Promise.reject(error);
  }
);
