import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const name = params.get("name");

    if (accessToken && name) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken || "");
      localStorage.setItem("user_name", decodeURIComponent(name));

      navigate("/");
    }
  }, []);

  return (
    <div>
      <h2>로그인 처리 중...</h2>
    </div>
  );
};

export default OAuthCallback;
