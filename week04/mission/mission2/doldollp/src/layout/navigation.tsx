import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-13 fixed inset-0 bg-black flex justify-between p-4 items-center">
      <h2 className="text-2xl text-pink-300 font-bold">돌려돌려LP판</h2>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="text-white p-2 bg-gray-500"
        >
          로그인
        </button>
        <button
          onClick={() => navigate("/login")}
          className="text-white bg-pink-300"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
