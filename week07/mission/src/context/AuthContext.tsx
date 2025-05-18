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
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  signIn: async () => {},
  signOut: async () => {},
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

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  const signInMutation = useMutation({
    mutationFn: ({ email, password }: TUserValues) =>
      postSignin(email, password),
    onSuccess: (response) => {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data.data;

      setAccessTokenInStorage(newAccessToken);
      setRefreshTokenInStorage(newRefreshToken);

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

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

      setAccessToken(null);
      setRefreshToken(null);

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
      value={{ accessToken, refreshToken, signIn, signOut }}
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
