import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMyInfo } from "../hooks/queries/useMyInfo";

const Navbar = () => {
  const { accessToken, logout } = useAuth();
  const { data } = useMyInfo();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-pink-600">
          돌림판
        </Link>
        <div className="space-x-6">
          {!accessToken && (
            <>
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="bg-pink-600 rounded-md font-bold text-white hover:bg-pink-900 "
              >
                회원가입
              </Link>
            </>
          )}
          {accessToken && (
            <Link
              to={"/my"}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              {data?.name}님 반갑습니다.
            </Link>
          )}

          {accessToken && (
            <button
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              onClick={logout}
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
