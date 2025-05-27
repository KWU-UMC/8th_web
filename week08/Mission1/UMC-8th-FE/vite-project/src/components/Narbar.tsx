import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth";
import { useQuery } from "@tanstack/react-query";
import { useLogout } from "../hooks/mutations/useLogout";
import { useState, useEffect } from "react";// ✅ throttling hook 사용
import useThrottle from "../hooks/useTrottle";

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ onToggleSidebar, isSearchOpen }: NavbarProps) => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ Throttle 적용
  const throttledKeyword = useThrottle(searchKeyword, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled: !!accessToken,
  });

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: async () => {
        await logout();
        navigate("/");
      },
      onError: () => {
        alert("로그아웃 실패");
      },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
  };

  // ✅ throttle된 검색어를 쿼리 파라미터로 반영
  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (throttledKeyword.trim()) {
        newParams.set("keyword", throttledKeyword);
      } else {
        newParams.delete("keyword");
      }
      return newParams;
    });
  }, [throttledKeyword, setSearchParams]);

  return (
    <nav className="bg-[#121210] shadow-md text-pink-500 font-bold p-5 text-lg flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <button className="text-white p-2" onClick={onToggleSidebar}>
          ☰
        </button>
        <NavLink to="/" className="text-pink-500">
          돌려돌려LP판
        </NavLink>
      </div>

      <div className="flex items-center space-x-3">
        {isSearchOpen && (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-64 p-2 border border-gray-300 rounded text-sm"
              value={searchKeyword}
              onChange={handleInputChange}
            />
          </div>
        )}

        {!accessToken ? (
          <>
            <NavLink
              to="/login"
              className="bg-black text-white py-1 px-3 rounded-md hover:bg-pink-600 text-sm"
            >
              로그인
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-black text-white py-1 px-3 rounded-md hover:bg-pink-600 text-sm"
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
                : `🌟${data?.data.name}님 반갑습니다.`}
            </span>

            <button
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="bg-black text-white py-1 px-3 rounded-md hover:bg-pink-600 text-sm"
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
