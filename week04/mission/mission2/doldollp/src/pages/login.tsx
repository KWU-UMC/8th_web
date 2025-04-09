import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

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
        <form className="flex flex-col gap-4 w-full">
          <input
            className="w-full p-2 bg-black border border-white rounded-xl"
            placeholder="이메일을 입력해주세요!"
          />
          <input
            className="w-full p-2 bg-black border border-white rounded-xl"
            placeholder="비밀번호를 입력해주세요!"
          />
          <button className="w-full bg-black rounded-xl" type="submit">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
