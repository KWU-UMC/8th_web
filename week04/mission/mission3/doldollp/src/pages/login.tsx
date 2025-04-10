import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { signin } from "../../apis/auth";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const navigate = useNavigate();

  const checkValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
  const checkValidPassword = (value: string) => {
    return value.length >= 8 ? true : false;
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(checkValidEmail(e.target.value));
    }

    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(checkValidPassword(e.target.value));
    }

    setPassword(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const signinResponse = await signin({ email, password });
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-6 w-100">
      <div className="relative w-full flex justify-center items-center">
        <button onClick={() => navigate("/")} className="absolute left-0">
          ←
        </button>
        <h2 className="text-2xl font-bold">로그인</h2>
      </div>
      <div className="relative w-full flex justify-center items-center border border-white rounded-md">
        <FcGoogle className="absolute left-4 w-6 h-6" />
        <button className="w-full">구글 로그인</button>
      </div>
      <div className="flex justify-around items-center">
        <hr className="solid flex-4" />
        <span className="flex-3">OR</span>
        <hr className="solid flex-4" />
      </div>
      <div>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <input
            onChange={handleEmailChange}
            className="w-full p-2 bg-black border border-white rounded-xl"
            placeholder="이메일을 입력해주세요!"
          />
          {isValidEmail || (
            <span className="text-md text-red-600">
              올바른 이메일 형식을 입력해주세요.
            </span>
          )}
          <input
            type="password"
            onChange={handlePasswordChange}
            className="w-full p-2 bg-black border border-white rounded-xl"
            placeholder="비밀번호를 입력해주세요!"
          />
          {isValidPassword || (
            <span className="text-md text-red-600">
              비밀번호는 8자 이상이어야 합니다.
            </span>
          )}
          <button
            className={`w-full bg-black rounded-xl ${
              isValidEmail &&
              isValidPassword &&
              email &&
              password &&
              "bg-pink-300"
            }`}
            type="submit"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
