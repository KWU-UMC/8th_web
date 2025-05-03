import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { logout, setAccessToken } from "../context/AuthContext";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: AxiosError) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else if (token) promise.resolve(token);
  });
  failedQueue = [];
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: any) => response,
  (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          };
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        axiosInstance
          .post("/auth/refresh")
          .then(({ data }: { data: { accessToken: string } }) => {
            setAccessToken(data.accessToken);
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${data.accessToken}`;
            processQueue(null, data.accessToken);
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${data.accessToken}`,
            };
            resolve(axiosInstance(originalRequest));
          })
          .catch((err: any) => {
            processQueue(err as AxiosError, null);
            logout();
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
