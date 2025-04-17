import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../apis/auth";
import { setNewRefreshToken } from "../apis/token";

interface AuthContextI {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
  isAccessTokenValid: () => Promise<boolean>;
  accessToken: string;
  setAccessToken: React.Dispatch<SetStateAction<string>>;
  refreshToken: string;
  setRefreshToken: React.Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextI | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  useEffect(() => {
    setNewRefreshToken(refreshToken);
  }, [refreshToken]);

  const isAccessTokenValid = async () => {
    try {
      const response = await auth.checkAccessTokenValid(accessToken);
      const newAccessToken =
        response.config.headers.Authorization.split(" ")[1];
      setAccessToken(newAccessToken);

      if (response) return true;
      return false;
    } catch (error) {
      console.error("api request error: ", error);
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isAccessTokenValid,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
      }}
    >
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
};
