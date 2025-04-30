import { createContext, PropsWithChildren, useState, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { TUserValues } from "../types/TUser";  //
import { postLogout, postSignin } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (signinData: TUserValues) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    signIn: async () => {},
    signOut: async () => {},
});

export const AuthProvider = ({children}: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenInStorage,
        removeItem: removeAccessTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

    const { 
        getItem: getRefreshTokenFromStorage, 
        setItem: setRefreshTokenInStorage, 
        removeItem: removeRefreshTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null>(
        getAccessTokenFromStorage(),
    );

    const [refreshToken, setRefreshToken] = useState<string | null>(
        getRefreshTokenFromStorage(),
    );

    const signIn = async (signinData: TUserValues) => {
        try{
            const { email, password } = signinData; 
            const { data } = await postSignin(email, password);
            console.log("로그인 응답 데이터", data.data); 

            if(data){
                const newAccessToken = data.data.accessToken;
                const newRefreshToken = data.data.refreshToken;
                
                localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, newAccessToken);
                localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, newRefreshToken);

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);

                alert("로그인 성공");
                window.location.href = "/my";  
            }
        } catch (error) {
            console.error("로그인 에러 발생", error);
            alert("로그인 실패");
        }
    }

    const signOut = async () => {
        try{
            await postLogout();
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);

            alert("로그아웃 성공");
            window.location.href = "/";  
        } catch (error) {
            console.error("로그아웃웃 에러 발생", error);
            alert("로그아웃 실패");
        }
    }
    return (
        <AuthContext.Provider value = {{accessToken, refreshToken, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("AuthContext를 찾을 수 없음");
    }

    return context;
}