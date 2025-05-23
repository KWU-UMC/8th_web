import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
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
    const avatar = urlParams.get("avatar");

    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      if (avatar) {
        localStorage.setItem("avatar", avatar);
      }
      window.location.href = "/my"; // 로그인 후 마이페이지로 리다이렉트
    }
  }, [setAccessToken, setRefreshToken]);

  return <div>구글 로그인 리다이렉 화면</div>;
};

export default GoogleLoginRedirectPage;
