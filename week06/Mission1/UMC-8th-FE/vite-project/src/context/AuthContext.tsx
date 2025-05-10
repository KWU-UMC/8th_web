//1. 타입을 만들어주기 위한 interface 적용
//-> context api 할 때도 해당하는 타입을 먼저 만들어주고 시작했었음
//login과 logout 함수를 context 파일 내에서 관리할거임
//why? 로그인할 때 setAccessToken 등의 함수를 통해 token 관리 작업을 해야하기 때문

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignin, postLogout } from "../apis/auth";

//api/auth.ts 에서 signin의 body를 requestSingindto를 서버로 던져줌
//logout은 body가 없으니깐 빈 문자열 타입임임
interface AuthContextType{
    accessToken: string|null;
    refreshToken: string|null;
    login:(signInData: RequestSigninDto) => Promise<void>;
    logout:() => Promise<void>;
}

//초기 상태를 저장하기 위함
export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async() => {},
    logout: async() => {},
});

//provider
export const AuthProvider =({children}: PropsWithChildren)=> {
    const{
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenInStorage, 
        removeItem: removeAccessTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const{
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenInStorage, 
        removeItem: removeRefreshTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
    
    //상태 만들기 -> accessToken 있으면 로그인 된 놈이다.
    //accessToken이 string 또는 null이 들어올 수 있다고 했으므로
    const[accessToken, setAccessToken] = useState<string|null>(
        //지연 초기화 : 상태가 변화하면 랜더링이 지속적으로 일어남
        getAccessTokenFromStorage(),
    );

    const[refreshToken, setRefreshToken] = useState<string|null>(
        getRefreshTokenFromStorage(),
    );

    //login function
    const login = async(signinData: RequestSigninDto) => {
        //비동기로 로그인이 성공했을 때의 로직처리
        try{
            const {data} = await postSignin(signinData);

            if (data){
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;
    
                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);
    
                //상태도 관리하기 때문에 lazy initialization으로 햇음
                // 이런 경우 상태도 따로 바꿔주지 않는 이상 리랜더링이 안되기 때문에 반영이 안됨
                
                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);

                alert("로그인 성공");
            }
        }catch(error){
            //toast ui -> 알림 문구들들
            console.log("로그인 오류", error);
            alert("로그인 실패");
        }
    };

    //logout function
    const logout = async() =>{
        try{
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            //localStorage.clear() => 다른 정보가 있을 경우 오류나기 때문

            setAccessToken(null);
            setRefreshToken(null);

            alert("로그아웃 성공");
        }catch(error){
            console.log("로그아웃 실패", error);
            alert("로그아웃 실패");
        }
    };

    return(
        <AuthContext.Provider value={{accessToken, refreshToken, login, logout}}>
            {children}
        </AuthContext.Provider>     
    )  
};

//const context = useContext(AuthContext) 로 하면 4번 다 사용해야해서 hook을 이용하기로 함
export const useAuth = () => {
    const context = useContext(AuthContext);
    
    //만약 context 없이 provider 사용했을 때의 에러 처리를 위해
    if(!context){
        throw new Error("AuthContext를 찾을 수 없습니다.");
    }

    return context;
}