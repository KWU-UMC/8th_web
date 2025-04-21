import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AuthContextI {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextI | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
