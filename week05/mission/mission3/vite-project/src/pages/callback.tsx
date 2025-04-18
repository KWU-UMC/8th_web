import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth_context";

export default function Callback() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setAccessToken, setRefreshToken } = useAuth();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  useEffect(() => {
    if (params) {
      // const userID = params.get("userID");
      // const name = params.get("name");
      const accessToken = params.get("accessToken");
      const refreshToken = params.get("refreshToken");

      setIsLoggedIn(true);
      setAccessToken(accessToken as string);
      setRefreshToken(refreshToken as string);
    }
  }, []);

  navigate("/");

  return null;
}
