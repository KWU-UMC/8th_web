import React from "react";

const Login: React.FC = () => {
  const handleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "v1/auth/google/login";
  };

  return (
    <div>
      <h1>Login with Google</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
