import { useNavigate } from "react-router-dom";
import { signin } from "../apis/authapi";
import { useState } from "react";
import { useAuth } from "../contexts/authcontext";

export default function Singin() {
  const navigate = useNavigate();
  const { setAccessToken, setIsLoggedIn, setData } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signin({ email, password });
      setAccessToken(response.data.accessToken);
      setIsLoggedIn(true);
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/");
    }
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="이메일"
          className=""
          onChange={onEmailChange}
        ></input>
        <input
          placeholder="비밀번호"
          className=""
          type="password"
          onChange={onPasswordChange}
        ></input>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
