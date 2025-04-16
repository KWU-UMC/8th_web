import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { auth } from "../apis/auth";
import { CheckAccessTokenValid } from "../types/auth_type";

interface AuthContextI {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
  isAccessTokenValid: (
    accessToken: string
  ) => Promise<CheckAccessTokenValid | undefined>;
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
  const isAccessTokenValid = async (accessToken: string) => {
    return await auth.checkAccessTokenValid(accessToken);
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
