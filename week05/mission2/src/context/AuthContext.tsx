import React, { createContext, useState, useEffect, ReactNode } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  login: async () => {},
  logout: () => {},
});

let globalToken: string | null = null;
export const setAccessToken = (token: string) => {
  globalToken = token;
};
export const logout = () => {
  globalToken = null;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    const { data } = await axiosInstance.post("/auth/signin", {
      username,
      password,
    });
    setAccessTokenState(data.accessToken);
    setAccessToken(data.accessToken);
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.accessToken}`;
    navigate("/");
  };

  const handleLogout = () => {
    setAccessTokenState(null);
    logout();
    delete axiosInstance.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const refreshToken = async () => {
    try {
      const { data } = await axiosInstance.post("/auth/refresh");
      setAccessTokenState(data.accessToken);
      setAccessToken(data.accessToken);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;
    } catch {
      handleLogout();
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, login, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
