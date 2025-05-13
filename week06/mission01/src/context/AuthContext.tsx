import { createContext, PropsWithChildren, useContext, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  //localStorage에서 accessToken을 가져오고(getItem), 저장하고(setItem), 지우는(removeItem) 기능을 제공함.
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
  //localStorage에서 refreshToken을 가져오고(getItem), 저장하고(setItem), 지우는(removeItem) 기능을 제공함.
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );
  //useState 훅을 사용하여 accessToken을 state에 저장한다.
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData);
      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken; // 서버에서 받은 accessToken과 refreshToken을 저장한다.
        setAccessTokenInStorage(newAccessToken); // accessToken을 localStorage에 저장한다.
        setRefreshTokenInStorage(newRefreshToken); // refreshToken을 localStorage에 저장한다.
        setAccessToken(newAccessToken); // accessToken을 state에 저장한다.
        setRefreshToken(newRefreshToken); // refreshToken을 state에 저장한다.
        alert("로그인 성공");
        window.location.href = "/my"; // 로그인 성공 시 /my 페이지로 이동한다.
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      setAccessToken(null);
      setRefreshToken(null);
      alert("로그아웃 성공");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };
  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
  //useAuth 훅을 사용하여 AuthContext에 접근한다.
};
