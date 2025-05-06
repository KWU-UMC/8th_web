import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useNavigate } from "react-router-dom";

const GoogleLoginRedirectPage = () => {
  const navigate = useNavigate(); // 추가
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      navigate("/my", { replace: true });
    }
  }, [setAccessToken, setRefreshToken, navigate]);

  return <div>구글 로그인 리다이렉 화면</div>;
};

export default GoogleLoginRedirectPage;
