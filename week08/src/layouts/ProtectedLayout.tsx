import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { accessToken }: { accessToken: string | null } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
