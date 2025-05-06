import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { getMyinfo } from "../apis/auth";
import type { TUserInfo } from "../types/TUser";

const Navbar = () => {
  const [data, setData] = useState<TUserInfo | null>(null);
  const { accessToken, signOut } = useAuth();

  // 로그인 여부 판단
  const isLoggedIn = !!accessToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyinfo();
        setData(response);
      } catch (error) {
        setData(null);
      }
    };

    if (isLoggedIn) {
      fetchData();
    } else {
      setData(null); 
    }
  }, [isLoggedIn]);

  const handleSignout = async () => {
    await signOut(); 
    setData(null);
  };

  return (
    <nav className="flex justify-between items-center bg-neutral-900 px-5 py-5">
      <Link to="/" className="px-2 text-2xl font-bold text-[#E91E63] hover:opacity-70">
        홈
      </Link>
      <div className="flex gap-4 items-center">
      <Link to="/search" className="flex items-center text-white rounded hover:bg-gray-600">
        <FaSearch className="mr-1" />
      </Link>
      {data ? (
          <>
            <span className="text-white mr-2">{data?.data?.name}님 반갑습니다.</span>
            <button
              onClick={handleSignout}
              className="text-white mr-2"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="w-[100px] px-4 py-2 text-white text-center rounded-md bg-black hover:opacity-70"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="w-[100px] px-4 py-2 text-white text-center rounded-md bg-[#E91E63] hover:opacity-70"
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
