import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Arrow from '../images/Arrow.svg';
import GoogleLoginButton from "../components/GoogleLoginBtn";
import InputField from "../components/InputField";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-start pt-20">
      <div className="w-full max-w-sm p-4">
        <div className="relative mb-6">
            <Link to="/" className="absolute left-0 top-1/2 -translate-y-[45%]">
                <img
                src={Arrow}
                alt="Back"
                className="w-5 h-5 invert rotate-180"
                />
            </Link>
            <h2 className="text-center text-2xl font-bold">로그인</h2>
        </div>
                
        <GoogleLoginButton />
        <div className="flex items-center justify-center mb-4">
          <hr className="flex-grow border-t border-white-600" />
          <span className="mx-13 text-sm text-white-400">OR</span>
          <hr className="flex-grow border-t border-white-600" />
        </div>

        <InputField
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일을 입력해주세요!"
        />
        <InputField
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력해주세요!"
        />

        <button className="w-full bg-neutral-800 py-2 rounded-md text-white hover:bg-[#E91E63] transition">
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;