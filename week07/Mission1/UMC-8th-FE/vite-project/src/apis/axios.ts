import axios, { InternalAxiosRequestConfig } from "axios"
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

//이렇게 하면 기존 토큰만 가능해지기때문에 x
// export const axiostInstance = axios.create({
//     baseURL: import.meta.env.VITE_SERVER_API_URL,
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
//     },
// });

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig{
    //token들이 유효하지 않을 때 401 에러가 재귀적으로 떠서 해결할 수 없는 굴레에 빠지는 것을 방지하기 위함
    _retry?: boolean; //요청 재시도 여부를 나타내는 플래그
}

//전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지하는 방법법
let refreshPromise: Promise<string> | null = null;

export const axiostInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});

//요청 인터셉터 : 모든 요청 전에 accessToen 을 authorizatoin 헤더에 추가하는 방식식
axiostInstance.interceptors.request.use((config) => {
    const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem(); //localStorage에서 accessToken을 가져옴옴

    //accessToken이 존재하면 Authoization 헤더에 Bearer 토큰 형식을 추가한다는 거임
    if(accessToken){
        config.headers = config.headers|| {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    //수정된 요청 설정을 반환
    return config;
    }, 

    //요청 인터셉터가 실패하면 에러 반환
    (error) => Promise.reject(error),
);

//응답 인터셉터 : 401 에러 발생 => refresh 토큰을 통한 토큰 갱신을 처리함
axiostInstance.interceptors.response.use(
    //정상적 응답 그대로 반환
    (response) => response,
    //error 발생 시,
    async(error) => {
        const originalRequest: CustomInternalAxiosRequestConfig = error.config;

        //401 에러면서 아직 재시도 하지 않은 요청의 경우 처리
        if(
            error.response && 
            error.response.status === 401 && 
            !originalRequest._retry
        ){
            //refesh endpoint 401 에러가 발생한 경우(Unauthorized), 중복 재시도 방지를 위해 로그아웃 처리.
            if(originalRequest.url === "/v1/auth/refresh"){
                const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                
                removeAccessToken();
                removeRefreshToken();

                window.location.href="/login";
                return Promise.reject(error);
            }

            originalRequest._retry=true;

            //이미 리프레쉬 요청이 진행중이면, 그 promise를 재사용
            if(!refreshPromise){
                //refesh 요청 실행후, 프라미스를 전역 변수에 할당.
                //즉시 실행함수
                refreshPromise = (async() => {
                    const{getItem: getRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    
                    const refreshToken = getRefreshToken();

                    const{data} = await axiostInstance.post("/v1/auth/refresh", {
                        refresh:refreshToken,
                    });

                    //새 토큰 반환
                    const {setItem: setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                    const {setItem: setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

                    setAccessToken(data.data.accessToken);
                    setRefreshToken(data.data.refreshToken);
                    
                    //새 accessToken을 반환하여 달느 요청들이 이것을 사용할 수 있게 함.
                    return data.data.accessToken;
                }
            )()
                .catch((error)=> {
                    const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                    const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                        
                    removeAccessToken();
                    removeRefreshToken();
                })
                .finally(() => {
                    refreshPromise = null;
                });
            }
            
            //진행 쥔 refreshPromsie 가 비동개 => 해결될 때까지 기다림림
            return refreshPromise.then((newAccessToken) => {
                //원본 요처의 authorization 헤더를 갱싱된 토큰으로 업뎃
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return axiostInstance.request(originalRequest);
            });
        }
        //401 에러가 아닌 경우에 그댈 오류를 반환
        return Promise.reject(error);
    },
);

