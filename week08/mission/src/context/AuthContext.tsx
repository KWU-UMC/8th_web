import {
  createContext,
  type PropsWithChildren,
  useState,
  useContext,
} from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import type { TUserValues } from "../types/TUser"; //
import { postLogout, postSignin } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (signinData: TUserValues) => Promise<void>;
  signOut: () => Promise<void>;
  userName: string | null;
  setUserName: (name: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  signIn: async () => {},
  signOut: async () => {},
  userName: null,
  setUserName: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
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

  const {
    getItem: getUserNameFromStorage,
    setItem: setUserNameInStorage,
    removeItem: removeUserNameFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.userName);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );
  const [userName, setUserNameState] = useState<string | null>(
    getUserNameFromStorage()
  );

  const setUserName = (name: string | null) => {
    if (name === null) {
      removeUserNameFromStorage();
    } else {
      setUserNameInStorage(name);
    }
    setUserNameState(name);
  };

  const signInMutation = useMutation({
    mutationFn: ({ email, password }: TUserValues) =>
      postSignin(email, password),
    onSuccess: (response) => {
      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        name,
      } = response.data.data;

      setAccessTokenInStorage(newAccessToken);
      setRefreshTokenInStorage(newRefreshToken);
      removeUserNameFromStorage();

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      setUserName(response.data.data.name);

      alert("로그인 성공");
      window.location.href = "/my";
    },
    onError: (error) => {
      console.error("로그인 에러 발생", error);
      alert("로그인 실패");
    },
  });

  const signOutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      removeUserNameFromStorage();

      setAccessToken(null);
      setRefreshToken(null);
      setUserName(null);

      alert("로그아웃 성공");
      window.location.href = "/";
    },
    onError: (error) => {
      console.error("로그아웃 에러 발생", error);
      alert("로그아웃 실패");
    },
  });

  const signIn = async (signinData: TUserValues) => {
    signInMutation.mutate(signinData);
  };

  const signOut = async () => {
    signOutMutation.mutate();
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        signIn,
        signOut,
        userName,
        setUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없음");
  }

  return context;
};
