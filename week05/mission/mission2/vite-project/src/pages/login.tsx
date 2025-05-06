import { useNavigate } from "react-router-dom";
import { auth } from "../apis/auth";
import { useState } from "react";
import { useAuth } from "../context/auth_context";

export default function Login() {
  const { setIsLoggedIn, setAccessToken, setRefreshToken } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await auth.login({ email, password });
      setIsLoggedIn(true);
      setAccessToken(response?.data.accessToken as string);
      setRefreshToken(response?.data.refreshToken as string);
      navigate("/");
    } catch (error) {
      console.error("form submit error: ", error);
    }
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="w-full h-full flex justify-center items-center mt-10">
      <form onSubmit={onSubmit} className="flex flex-col gap-7 w-[300px]">
        <input
          className="p-4 border border-amber-400 rounded-2xl"
          onChange={onEmailChange}
          placeholder="이메일을 입력해주세요."
        />
        <input
          className="p-4 border border-amber-400 rounded-2xl"
          onChange={onPasswordChange}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <button className="cursor-pointer" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
}
