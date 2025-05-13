import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ResponseMyInfoDto } from "../types/auth";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { useSidebar } from "../context/SidebarContext"; // ✅ 추가

export const Navbar = () => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<ResponseMyInfoDto>();
  const { toggleSidebar } = useSidebar(); // ✅ 사이드바 토글 함수

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-30">
      <div className="flex items-center justify-between p-4">
        {/* 사이드바 토글 버튼 */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-800 dark:text-white text-2xl font-bold mr-2 mx-3"
            aria-label="사이드바 토글"
          >
            ≡
          </button>
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white mx-3"
          >
            SpinningSpinning Dolimpan
          </Link>
        </div>

        {/* 우측 유저 상태 */}
        <div className="space-x-6">
          {!accessToken ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                회원가입
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div>{data?.data?.name}님 환영합니다</div>
              <button
                onClick={handleLogout}
                className="bg-red-400 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-lg transition duration-200 transform hover:scale-105"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
