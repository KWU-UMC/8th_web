import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth";
import { useQuery } from "@tanstack/react-query";
import { useLogout } from "../hooks/mutations/useLogout";

interface NavbarProps {
  onToggleSidebar?: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled: !!accessToken,
  });

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: async () => {
        await logout(); // context 상태 초기화
        navigate("/"); // 홈으로 이동
      },
      onError: () => {
        alert("로그아웃 실패");
      },
    });
  };

  return (
    <nav className="bg-[#121210] shadow-md text-pink-500 font-bold p-5 text-lg flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <button className="text-white p-2" onClick={onToggleSidebar}>
          ☰
        </button>
        <NavLink to="/">돌려돌려LP판</NavLink>
      </div>

      <div className="flex items-center space-x-3">
        {!accessToken ? (
          <>
            <NavLink
              to="/login"
              className="bg-black text-white py-1 px-3 rounded-md hover:bg-pink-600 transition-colors text-sm"
            >
              로그인
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-black text-white py-1 px-3 rounded-md hover:bg-pink-600 transition-colors text-sm"
            >
              회원가입
            </NavLink>
          </>
        ) : (
          <>
            <span className="text-white py-1 px-3 rounded-md text-sm">
              {isLoading
                ? "로딩 중..."
                : isError
                ? "불러오기 실패"
                : `😁${data?.data.name}님 반갑습니다.`}
            </span>

            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="bg-black text-white py-1 px-3 rounded-md hover:bg-pink-600 transition-colors text-sm"
            >
              {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
