import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface DataI {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}
interface AuthContextI {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
  accessToken: string;
  setAccessToken: React.Dispatch<SetStateAction<string>>;
  data: DataI | undefined;
  setData: React.Dispatch<SetStateAction<DataI | undefined>>;
}

const AuthContext = createContext<AuthContextI | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [data, setData] = useState<DataI | undefined>(undefined);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        accessToken,
        setAccessToken,
        data,
        setData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextI => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
