import React, { useEffect, useState } from "react";

const OAuthCallback: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");

    if (token) {
      localStorage.setItem("google_access_token", token);
      setAccessToken(token);
    }
  }, []);

  return (
    <div>
      <h2>OAuth Callback</h2>
      {accessToken ? (
        <p>Access Token: {accessToken}</p>
      ) : (
        <p>No access token found in URL.</p>
      )}
    </div>
  );
};

export default OAuthCallback;
