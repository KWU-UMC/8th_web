import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth_context";

export default function Header() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/login");
  };

  return (
    <div className="w-full p-4 bg-amber-200 flex justify-between">
      <span className="font-bold text-2xl">UMC</span>
      {isLoggedIn ? (
        <button>환영합니다</button>
      ) : (
        <button className="cursor-pointer" onClick={onClick}>
          로그인
        </button>
      )}
    </div>
  );
}
