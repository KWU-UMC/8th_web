import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import RootLayout from "./root-layout";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }

  return <RootLayout />;
};

export default ProtectedLayout;
