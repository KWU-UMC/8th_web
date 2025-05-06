import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-neutral-900 px-5 py-5">
      <Link to="/" className="px-2 text-2xl font-bold text-[#E91E63] hover:opacity-70">
        홈
      </Link>
      <div className="flex gap-4">
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
      </div>
    </nav>
  );
};

export default Navbar;