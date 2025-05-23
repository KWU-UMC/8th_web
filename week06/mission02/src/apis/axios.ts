import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInterceptorAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean; //요청 재시도 여부를 나타내는 플래그
}

//전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지한다.
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

//요청 인터셉터: 모든 요청 전에 accessToken을 Authorization 헤더에 추가한다.
//이 인터셉터는 모든 요청에 대해 실행되며, accessToken이 존재하는 경우 Authorization 헤더에 Bearer 토큰 형식으로 추가한다.
//이렇게 하면 서버에 요청을 보낼 때마다 자동으로 accessToken이 포함된다.
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem(); // localStorage에서 accessToken을 가져온다.

    // accessToken이 존재하는 경우에만 Authorization 헤더를 추가한다.
    if (accessToken) {
      config.headers = config.headers || {}; // config.headers가 undefined인 경우 빈 객체로 초기화한다.
      config.headers.Authorization = `Bearer ${accessToken}`; // Authorization 헤더에 accessToken을 추가한다.
    }
    return config; //수정된 요청 설정을 반환한다.
  },
  (error) => {
    return Promise.reject(error); //요청 인터셉터가 실패하면 에러를 반환한다.
  }
);

//응답 인터셉터: 401 에러가 발생하면 refreshToken을 사용하여 accessToken을 갱신한다.
axiosInstance.interceptors.response.use(
  (response) => response, //응답이 성공하면 그대로 반환한다.
  async (error) => {
    const originalRequest: CustomInterceptorAxiosRequestConfig = error.config; //원래 요청을 가져온다.
    //401 에러이면서 아직 재시도하지 않은 요청인 경우
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      //refresh 엔드포인트 401 에러가 발생한 경우 (unauthorized), 중복 재시도 방지를 위해 로그아웃을 처리한다.
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );
        removeAccessToken(); // accessToken을 localStorage에서 제거한다.
        removeRefreshToken(); // refreshToken을 localStorage에서 제거한다.
        window.location.href = "/login"; // 로그인 페이지로 리다이렉트한다.
        return Promise.reject(error); // 에러를 반환한다.
      }
      //재시도 플래그 설정
      originalRequest._retry = true; //원래 요청에 _retry 플래그를 설정한다.
      //이미 리프레쉬 요청이 진행 중이라면, 그 Promise를 재사용한다.
      if (!refreshPromise) {
        //refresh 요청 실행 후, Promise를 전역 변수에 할당
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken(); // localStorage에서 refreshToken을 가져온다.
          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });
          //새 토큰이 반환
          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          setAccessToken(data.data.accessToken); // accessToken을 localStorage에 저장한다.
          setRefreshToken(data.data.refreshToken); // refreshToken을 localStorage에 저장한다.
          // 새로운 accessToken을 반환하여 다른 요청들이 이것을 사용할 수 있게 함
          return data.data.accessToken;
        })()
          .catch((error) => {
            console.error("Refresh token error:", error);
            // refreshToken이 만료된 경우, localStorage에서 accessToken과 refreshToken을 제거하고 로그아웃 처리
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken(); // accessToken을 localStorage에서 제거한다.
            removeRefreshToken(); // refreshToken을 localStorage에서 제거한다.
          })
          .finally(() => {
            refreshPromise = null; // 요청이 끝나면 Promise를 초기화한다.
          });
      }
      //진행중인 refreshPromise가 해결될때까지 기다림
      return refreshPromise.then((newAccessToken) => {
        //원본 요청의 Authorization 헤더를 갱신된 accessToken으로 업데이트한다.
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // 새로운 accessToken을 Authorization 헤더에 추가한다.
        //업데이트 된 원본 요청을 재시도 한다.
        return axiosInstance(originalRequest); //원래 요청을 다시 보낸다.
      });
    }
    // 401 에러가 아닌 경우, 에러를 그대로 반환한다.
    return Promise.reject(error); //에러를 반환한다.
  }
);
