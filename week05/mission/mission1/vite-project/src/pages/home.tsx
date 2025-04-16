import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth_context";

export default function Home() {
  const { isLoggedIn, setIsLoggedIn, isAccessTokenValid } = useAuth();
  const navigate = useNavigate();

  const onClick = async () => {
    // 로그인 상태 확인
    if (isLoggedIn) {
      // AccessToken이 유효한지 확인
      const response = await isAccessTokenValid();
      if (!response) {
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        navigate("/newlp");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full p-4">
      <button onClick={onClick}>LP 생성</button>
    </div>
  );
}
