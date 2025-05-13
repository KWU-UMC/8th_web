import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { FaBars } from "react-icons/fa";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { accessToken, logout } = useAuth();
  const [user, setUser] = useState<ResponseMyInfoDto["data"] | null>(null);

  useEffect(() => {
    if (accessToken) {
      getMyInfo()
        .then((res) => setUser(res.data))
        .catch(console.error);
    }
  }, [accessToken]);

  return (
    <nav className="bg-gray-900 text-white shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <FaBars onClick={toggleSidebar} className="text-xl cursor-pointer" />
          <Link to="/" className="text-2xl font-bold text-pink-500">
            돌려돌려LP판
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {accessToken ? (
            <>
              <span>{user?.name}님 반갑습니다.</span>
              <Link to="/my" className="hover:text-pink-400">
                마이페이지
              </Link>
              <button onClick={logout} className="hover:text-pink-400">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-pink-400">
                로그인
              </Link>
              <Link
                to="/signup"
                className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
